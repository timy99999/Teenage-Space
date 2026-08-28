"""Postgres access for the bot's own tables.

Scope rule (see the plan): the bot talks to Postgres *only* for tables it owns —
telegram_links, bot_event_embeddings, bot_sessions, bot_plans, bot_plan_items,
bot_reminders and LangGraph's checkpoints. Everything about the domain (events,
profiles, favourites) goes through the NestJS API so the business rules live in
exactly one place.
"""

from __future__ import annotations

import logging
from typing import Any

from psycopg.rows import dict_row
from psycopg_pool import AsyncConnectionPool

from .config import get_settings

logger = logging.getLogger(__name__)

_pool: AsyncConnectionPool | None = None


async def init_pool() -> AsyncConnectionPool:
    global _pool
    if _pool is None:
        settings = get_settings()
        settings.require("database_url")
        _pool = AsyncConnectionPool(
            settings.database_url,
            min_size=1,
            max_size=8,
            open=False,
            # autocommit + dict_row are what langgraph-checkpoint-postgres expects
            # from a shared pool; our own queries are happy with the same settings.
            kwargs={"autocommit": True, "row_factory": dict_row},
        )
        await _pool.open(wait=True, timeout=30)
        logger.info("Postgres pool ready")
    return _pool


def pool() -> AsyncConnectionPool:
    if _pool is None:
        raise RuntimeError("Postgres pool is not initialised; call init_pool() first")
    return _pool


async def close_pool() -> None:
    global _pool
    if _pool is not None:
        await _pool.close()
        _pool = None


async def fetch_all(sql: str, params: tuple[Any, ...] = ()) -> list[dict[str, Any]]:
    async with pool().connection() as conn, conn.cursor(row_factory=dict_row) as cur:
        await cur.execute(sql, params)
        return await cur.fetchall()


async def fetch_one(sql: str, params: tuple[Any, ...] = ()) -> dict[str, Any] | None:
    rows = await fetch_all(sql, params)
    return rows[0] if rows else None


async def execute(sql: str, params: tuple[Any, ...] = ()) -> None:
    async with pool().connection() as conn, conn.cursor() as cur:
        await cur.execute(sql, params)


def to_vector_literal(values: list[float]) -> str:
    """pgvector accepts its text form, so no extra type-registration dependency is needed."""
    return "[" + ",".join(f"{v:.7f}" for v in values) + "]"
