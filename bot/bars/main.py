"""Entry point.

Two modes:
  python -m bars.main             webhook (production, Railway)
  python -m bars.main --polling   long polling (local development)

Webhook is the default in production because Railway restarts the container on every
push to main, and two overlapping polling loops would answer every message twice.
"""

from __future__ import annotations

import argparse
import asyncio
import contextlib
import logging
import sys

from aiogram import Bot, Dispatcher
from aiohttp import web
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from . import handlers, reminders, sessions
from .api_client import close_api
from .config import get_settings
from .db import close_pool, init_pool
from .graph.agent import build_graph
from .indexer import reindex
from .queue import ChatQueues
from .runtime import runtime

logger = logging.getLogger("bars")

# Sessions expire on a sliding 72h window, so the sweep only has to run often enough
# that dead checkpoints do not pile up — not at any particular hour.
SESSION_SWEEP_HOURS = 6


def configure_logging() -> None:
    logging.basicConfig(
        level=getattr(logging, get_settings().log_level.upper(), logging.INFO),
        format="%(asctime)s %(levelname)-8s %(name)s: %(message)s",
    )
    logging.getLogger("aiogram.event").setLevel(logging.WARNING)
    # The SDK warns about automatic function calling on every tool-bound request.
    # We drive the tool loop ourselves through LangGraph, so it is noise -- and at
    # one line per user message it would be most of the log.
    logging.getLogger("google_genai.models").setLevel(logging.ERROR)


async def _safe(name: str, coro) -> None:
    """Scheduler jobs must never die quietly, and must never take the loop down."""
    try:
        await coro
    except Exception:
        logger.exception("Scheduled job %s failed", name)


def build_scheduler(bot: Bot) -> AsyncIOScheduler:
    settings = get_settings()
    scheduler = AsyncIOScheduler()
    scheduler.add_job(
        lambda: asyncio.create_task(_safe("reindex", reindex())),
        "interval",
        minutes=settings.index_interval_minutes,
        id="reindex",
    )
    scheduler.add_job(
        lambda: asyncio.create_task(_safe("reminders", reminders.dispatch(bot))),
        "interval",
        seconds=settings.reminder_poll_seconds,
        id="reminders",
    )
    scheduler.add_job(
        lambda: asyncio.create_task(_safe("session-sweep", sessions.sweep())),
        "interval",
        hours=SESSION_SWEEP_HOURS,
        id="session-sweep",
    )
    return scheduler


async def startup() -> tuple[Bot, Dispatcher, AsyncIOScheduler]:
    settings = get_settings()
    settings.require("telegram_bot_token", "gemini_api_key", "database_url", "bot_api_secret")

    pool = await init_pool()

    graph, saver = build_graph(pool)
    # Creates LangGraph's own checkpoint tables on first boot; idempotent afterwards.
    await saver.setup()
    runtime.graph = graph
    runtime.saver = saver
    runtime.queues = ChatQueues(handlers.process, settings.max_concurrent_llm)

    bot = Bot(token=settings.telegram_bot_token)
    dispatcher = Dispatcher()
    dispatcher.include_router(handlers.router)

    scheduler = build_scheduler(bot)
    scheduler.start()

    # A deploy should not leave the bot searching against a stale index; do the first
    # pass in the background so startup (and the health check) is not blocked by it.
    asyncio.create_task(_safe("initial-reindex", reindex()))

    return bot, dispatcher, scheduler


async def shutdown(bot: Bot, scheduler: AsyncIOScheduler) -> None:
    scheduler.shutdown(wait=False)
    if runtime.queues:
        await runtime.queues.shutdown()
    await close_api()
    await close_pool()
    await bot.session.close()


async def health(_: web.Request) -> web.Response:
    return web.json_response({"status": "ok"})


async def run_webhook() -> None:
    from aiogram.webhook.aiohttp_server import SimpleRequestHandler, setup_application

    settings = get_settings()
    settings.require("telegram_webhook_secret")
    base_url = settings.public_base_url
    if not base_url:
        raise RuntimeError("WEBHOOK_BASE_URL (or RAILWAY_PUBLIC_DOMAIN) must be set for webhook mode")

    bot, dispatcher, scheduler = await startup()

    app = web.Application()
    app.router.add_get("/health", health)
    SimpleRequestHandler(
        dispatcher=dispatcher,
        bot=bot,
        # Telegram echoes this back; a request without it did not come from Telegram.
        secret_token=settings.telegram_webhook_secret,
    ).register(app, path=settings.webhook_path)
    setup_application(app, dispatcher, bot=bot)

    await bot.set_webhook(
        url=f"{base_url}{settings.webhook_path}",
        secret_token=settings.telegram_webhook_secret,
        drop_pending_updates=True,
        allowed_updates=["message", "callback_query"],
    )
    logger.info("Webhook registered at %s%s", base_url, settings.webhook_path)

    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, host="0.0.0.0", port=settings.port)
    await site.start()
    logger.info("Listening on port %s", settings.port)

    try:
        await asyncio.Event().wait()
    finally:
        await runner.cleanup()
        await shutdown(bot, scheduler)


async def run_polling() -> None:
    bot, dispatcher, scheduler = await startup()
    await bot.delete_webhook(drop_pending_updates=True)
    logger.info("Polling started")
    try:
        await dispatcher.start_polling(bot, allowed_updates=["message", "callback_query"])
    finally:
        await shutdown(bot, scheduler)


def main() -> None:
    parser = argparse.ArgumentParser(prog="bars")
    parser.add_argument("--polling", action="store_true", help="long polling instead of webhook")
    args = parser.parse_args()

    configure_logging()
    runner = run_polling() if args.polling else run_webhook()
    with contextlib.suppress(KeyboardInterrupt, SystemExit):
        asyncio.run(runner)


if __name__ == "__main__":
    sys.exit(main())
