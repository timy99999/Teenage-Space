"""Keeps bot_event_embeddings in step with the catalogue.

Re-embedding is driven by a content hash, not by timestamps: `events` has a created_at
but no updated_at, so an edited row is invisible to any "since" filter. Hashing the
exact text we embed means an unchanged catalogue costs zero Gemini calls.
"""

from __future__ import annotations

import hashlib
import logging

from .api_client import api
from .catalog import catalog, embedding_text
from .db import execute, fetch_all, to_vector_literal
from .embeddings import embed_documents

logger = logging.getLogger(__name__)

# Gemini's embed endpoint takes batches; small enough to stay well inside request limits.
BATCH_SIZE = 32


def content_hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


async def reindex() -> dict[str, int]:
    events = await api().sync_events()
    live = {e["id"]: e for e in events if not e.get("archived")}

    existing = {
        row["event_id"]: row["content_hash"]
        for row in await fetch_all("select event_id, content_hash from bot_event_embeddings")
    }

    stale: list[tuple[str, str, str]] = []
    for event_id, event in live.items():
        text = embedding_text(event)
        digest = content_hash(text)
        if existing.get(event_id) != digest:
            stale.append((event_id, text, digest))

    for start in range(0, len(stale), BATCH_SIZE):
        batch = stale[start : start + BATCH_SIZE]
        vectors = await embed_documents([text for _, text, _ in batch])
        for (event_id, _, digest), vector in zip(batch, vectors, strict=True):
            await execute(
                """
                insert into bot_event_embeddings (event_id, content_hash, embedding, indexed_at)
                values (%s, %s, %s::vector, now())
                on conflict (event_id) do update
                  set content_hash = excluded.content_hash,
                      embedding = excluded.embedding,
                      indexed_at = now()
                """,
                (event_id, digest, to_vector_literal(vector)),
            )

    # Archived or deleted events lose their embedding, so they can never surface again.
    dropped = [event_id for event_id in existing if event_id not in live]
    if dropped:
        await execute("delete from bot_event_embeddings where event_id = any(%s)", (dropped,))

    # A fresh index is only useful next to a fresh catalogue.
    await catalog().snapshot(force=True)

    result = {"total": len(live), "embedded": len(stale), "dropped": len(dropped)}
    logger.info("Reindex done: %s", result)
    return result
