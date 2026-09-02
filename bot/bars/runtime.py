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

# A person who resends the same words this quickly is retrying, not asking twice. The
# queue only ever discarded jobs it had not *started*, so an identical question sent
# 30 seconds later was answered a second time -- at full price.
DUPLICATE_WINDOW_SECONDS = 30


@dataclass
class Runtime:
    graph: Any = None
    saver: Any = None
    queues: ChatQueues | None = None
    _context_cache: dict[int, tuple[float, dict[str, Any]]] = field(default_factory=dict)
    _chat_locks: dict[int, asyncio.Lock] = field(default_factory=dict)
    _last_text: dict[int, tuple[float, str]] = field(default_factory=dict)

    def seen_recently(self, chat_id: int, text: str) -> bool:
        """True when this chat just sent these exact words, and records them either way.

        Guards against the impatient resend: the same question arriving twice inside the
        window is one question, and answering it twice costs a full agent turn and
        leaves two near-identical replies in the chat.
        """
        now = time.monotonic()
        previous = self._last_text.get(chat_id)
        self._last_text[chat_id] = (now, text)
        return bool(previous and previous[1] == text and now - previous[0] < DUPLICATE_WINDOW_SECONDS)

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
        cutoff = time.monotonic() - DUPLICATE_WINDOW_SECONDS
        for chat_id in [cid for cid, (at, _) in self._last_text.items() if at < cutoff]:
            self._last_text.pop(chat_id, None)

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
