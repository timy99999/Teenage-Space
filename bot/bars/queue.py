"""Per-chat ordering, cross-chat parallelism.

One worker per active chat means a person's messages are answered strictly in order;
separate chats run concurrently. A semaphore caps how many Gemini calls are in flight
at once, so a burst of users turns into a short wait rather than a wall of 429s.
"""

from __future__ import annotations

import asyncio
import logging
from collections.abc import Awaitable, Callable
from typing import Any

logger = logging.getLogger(__name__)

# How long a chat's worker sticks around with nothing to do before it is collected.
IDLE_TIMEOUT_SECONDS = 120


class ChatQueues:
    def __init__(self, handler: Callable[[Any], Awaitable[None]], max_concurrent: int) -> None:
        self._handler = handler
        self._queues: dict[int, asyncio.Queue] = {}
        self._workers: dict[int, asyncio.Task] = {}
        self._semaphore = asyncio.Semaphore(max_concurrent)
        self._lock = asyncio.Lock()

    async def submit(self, chat_id: int, job: Any) -> None:
        async with self._lock:
            queue = self._queues.get(chat_id)
            if queue is None:
                queue = asyncio.Queue(maxsize=1)
                self._queues[chat_id] = queue

            # At most one *unstarted* job per chat: if someone rephrases before we have
            # begun, they meant the new question, not both.
            while not queue.empty():
                queue.get_nowait()
                queue.task_done()
            queue.put_nowait(job)

            worker = self._workers.get(chat_id)
            if worker is None or worker.done():
                self._workers[chat_id] = asyncio.create_task(
                    self._run(chat_id, queue), name=f"chat-{chat_id}"
                )

    async def _run(self, chat_id: int, queue: asyncio.Queue) -> None:
        while True:
            try:
                job = await asyncio.wait_for(queue.get(), timeout=IDLE_TIMEOUT_SECONDS)
            except TimeoutError:
                async with self._lock:
                    if queue.empty():
                        self._queues.pop(chat_id, None)
                        self._workers.pop(chat_id, None)
                        return
                continue

            try:
                async with self._semaphore:
                    await self._handler(job)
            except Exception:
                logger.exception("Job failed for chat %s", chat_id)
            finally:
                queue.task_done()

    async def shutdown(self) -> None:
        workers = list(self._workers.values())
        for worker in workers:
            worker.cancel()
        await asyncio.gather(*workers, return_exceptions=True)
        self._workers.clear()
        self._queues.clear()
