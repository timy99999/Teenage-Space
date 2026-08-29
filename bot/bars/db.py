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
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

from psycopg.rows import dict_row
from psycopg_pool import AsyncConnectionPool

from .config import get_settings

logger = logging.getLogger(__name__)

_pool: AsyncConnectionPool | None = None


# Prisma-only query parameters. Supabase's dashboard hands out the pooler URI with
# ?pgbouncer=true already appended, and libpq rejects the whole DSN over it
# ("invalid URI query parameter"). They mean nothing to Postgres, so dropping them
# turns a cryptic boot crash into a working connection and one log line.
_PRISMA_ONLY_PARAMS = ("pgbouncer", "connection_limit", "pool_timeout")


def clean_dsn(dsn: str) -> str:
    parsed = urlsplit(dsn)
    if not parsed.query:
        return dsn

    kept, dropped = [], []
    for key, value in parse_qsl(parsed.query, keep_blank_values=True):
        (dropped if key in _PRISMA_ONLY_PARAMS else kept).append((key, value))

    if not dropped:
        return dsn
    logger.warning(
        "Ignoring Prisma-only DSN parameter(s): %s", ", ".join(key for key, _ in dropped)
    )
    return urlunsplit(parsed._replace(query=urlencode(kept)))


async def init_pool() -> AsyncConnectionPool:
    global _pool
    if _pool is None:
        settings = get_settings()
        settings.require("database_url")
        _pool = AsyncConnectionPool(
            clean_dsn(settings.database_url),
            min_size=1,
            max_size=8,
            open=False,
            # autocommit + dict_row are what langgraph-checkpoint-postgres expects
            # from a shared pool; our own queries are happy with the same settings.
            #
            # prepare_threshold=None disables prepared statements. psycopg otherwise
            # names one after the fifth execution of a query -- and every query we run
            # is a repeat. Supabase's transaction-mode pooler (:6543) hands out a
            # different backend connection per transaction, so the next execution
            # lands somewhere the statement was never prepared and fails with
            # 'prepared statement "_pg3_0" does not exist'. It would surface only
            # under load, which is the worst time to find out. On a session-mode or
            # direct URL this costs one re-plan per query and nothing else.
            kwargs={
                "autocommit": True,
                "row_factory": dict_row,
                "prepare_threshold": None,
            },
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
