"""Process-wide singletons wired up at boot by main.py.

Kept in one small module so handlers can reach the graph and the queue without either
importing main (circular) or building their own copies.
"""

from __future__ import annotations

import asyncio
import time
from dataclasses import dataclass, field
from typing import Any

from .queue import ChatQueues

# Short enough that linking an account is reflected almost immediately, long enough
# that a chatty conversation is not one API call per message.
CONTEXT_TTL_SECONDS = 60


@dataclass
class Runtime:
    graph: Any = None
    saver: Any = None
    queues: ChatQueues | None = None
    _context_cache: dict[int, tuple[float, dict[str, Any]]] = field(default_factory=dict)
    _chat_locks: dict[int, asyncio.Lock] = field(default_factory=dict)

    def chat_lock(self, chat_id: int) -> asyncio.Lock:
        """Serialises conversation-state changes for one chat across *every* handler —
        the free-text queue worker and the command handlers alike. Without it /start
        and the first text message can both decide the chat is new and both greet."""
        lock = self._chat_locks.get(chat_id)
        if lock is None:
            lock = asyncio.Lock()
            self._chat_locks[chat_id] = lock
        return lock

    def prune_chat_locks(self) -> None:
        """Drop idle locks so the map does not grow without bound. Called from the sweep."""
        for chat_id in [cid for cid, lock in self._chat_locks.items() if not lock.locked()]:
            self._chat_locks.pop(chat_id, None)

    def cached_context(self, chat_id: int) -> dict[str, Any] | None:
        entry = self._context_cache.get(chat_id)
        if entry and time.monotonic() - entry[0] < CONTEXT_TTL_SECONDS:
            return entry[1]
        return None

    def cache_context(self, chat_id: int, context: dict[str, Any]) -> None:
        self._context_cache[chat_id] = (time.monotonic(), context)

    def invalidate(self, chat_id: int) -> None:
        self._context_cache.pop(chat_id, None)


runtime = Runtime()
