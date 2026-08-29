"""The three-day memory rule.

Барс keeps a conversation for 72 hours since the *last* message, then forgets it and
starts over. The TTL slides rather than being absolute so an active conversation is
never cut in half mid-preparation.

What is forgotten is the dialogue itself. Saved plans, reminders and the account link
survive on purpose — those are results the user asked for, not chatter.
"""

from __future__ import annotations

import logging
import uuid

from . import analytics
from .config import get_settings
from .db import execute, fetch_one
from .runtime import runtime

logger = logging.getLogger(__name__)

# LangGraph's Postgres checkpointer owns these; all three key on thread_id.
CHECKPOINT_TABLES = ("checkpoint_writes", "checkpoint_blobs", "checkpoints")


def _new_thread_id(chat_id: int) -> str:
    return f"tg:{chat_id}:{uuid.uuid4().hex}"


async def _drop_thread(thread_id: str) -> None:
    """Erase a conversation. Prefers the checkpointer's own delete so we are not
    coupled to its table layout; the direct DELETEs are a fallback for older versions."""
    saver = runtime.saver
    if saver is not None and hasattr(saver, "adelete_thread"):
        try:
            await saver.adelete_thread(thread_id)
            return
        except Exception:
            logger.debug("adelete_thread failed for %s; falling back", thread_id, exc_info=True)

    for table in CHECKPOINT_TABLES:
        try:
            await execute(f"delete from {table} where thread_id = %s", (thread_id,))
        except Exception:
            # The tables only exist after the checkpointer's first setup(); a missing
            # table here is not worth failing a user's message over.
            logger.debug("Could not clear %s for %s", table, thread_id, exc_info=True)


async def touch(chat_id: int) -> tuple[str, bool]:
    """Return (thread_id, started_fresh) and mark the chat as active right now."""
    ttl_hours = get_settings().memory_ttl_hours
    row = await fetch_one(
        """
        select thread_id,
               last_activity_at < now() - make_interval(hours => %s) as expired
        from bot_sessions
        where chat_id = %s
        """,
        (ttl_hours, chat_id),
    )

    if row and not row["expired"]:
        await execute("update bot_sessions set last_activity_at = now() where chat_id = %s", (chat_id,))
        return row["thread_id"], False

    if row:
        await _drop_thread(row["thread_id"])

    thread_id = _new_thread_id(chat_id)
    await execute(
        """
        insert into bot_sessions (chat_id, thread_id, started_at, last_activity_at)
        values (%s, %s, now(), now())
        on conflict (chat_id) do update
          set thread_id = excluded.thread_id,
              started_at = now(),
              last_activity_at = now()
        """,
        (chat_id, thread_id),
    )
    return thread_id, True


async def reset(chat_id: int) -> str:
    """/reset and /start — forget the current conversation and start a clean thread.

    Rotates the thread in place: the bot_sessions row stays, repointed at a fresh
    (empty) thread with the clock reset, and the new thread_id is returned. Deleting
    the row instead would make the very next message look like a brand-new chat and
    trigger a second greeting.
    """
    row = await fetch_one("select thread_id from bot_sessions where chat_id = %s", (chat_id,))
    if row:
        await _drop_thread(row["thread_id"])

    thread_id = _new_thread_id(chat_id)
    await execute(
        """
        insert into bot_sessions (chat_id, thread_id, started_at, last_activity_at)
        values (%s, %s, now(), now())
        on conflict (chat_id) do update
          set thread_id = excluded.thread_id,
              started_at = now(),
              last_activity_at = now()
        """,
        (chat_id, thread_id),
    )
    return thread_id


async def sweep() -> int:
    """Nightly: drop the checkpoints of chats that went quiet and never came back."""
    ttl_hours = get_settings().memory_ttl_hours
    rows = await fetch_one(
        """
        select coalesce(array_agg(thread_id), '{}'::text[]) as threads
        from bot_sessions
        where last_activity_at < now() - make_interval(hours => %s)
        """,
        (ttl_hours,),
    )
    threads: list[str] = (rows or {}).get("threads") or []
    for thread_id in threads:
        await _drop_thread(thread_id)
    if threads:
        await execute("delete from bot_sessions where thread_id = any(%s)", (threads,))
        logger.info("Expired %d conversation(s)", len(threads))

    # The quality-control transcript has its own, longer retention and is not tied
    # to session expiry — it outlives /reset on purpose. Trim it on the same pass.
    purged = await analytics.sweep_transcripts(get_settings().transcript_ttl_days)
    if purged:
        logger.info("Purged %d journalled message(s) past retention", purged)

    runtime.prune_chat_locks()
    return len(threads)
