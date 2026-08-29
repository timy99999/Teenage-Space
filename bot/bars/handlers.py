"""Telegram surface: commands, free-text messages and inline buttons."""

from __future__ import annotations

import asyncio
import contextlib
import logging
from dataclasses import dataclass
from datetime import date
from typing import Any

from aiogram import F, Router
from aiogram.filters import Command, CommandObject, CommandStart
from aiogram.types import CallbackQuery, Message
from langchain_core.messages import AIMessage, HumanMessage

try:
    from langchain_core.callbacks import get_usage_metadata_callback
except ImportError:  # pragma: no cover - older langchain-core: skip token accounting
    import contextlib as _contextlib

    class _NoUsageCallback:
        usage_metadata: dict = {}

    @_contextlib.contextmanager
    def get_usage_metadata_callback():
        yield _NoUsageCallback()

from . import analytics, plans, sessions
from .api_client import ApiError, api
from .catalog import bishkek_today, catalog, parse_date
from .config import get_settings
from .formatting import chunks, event_ids, event_keyboard, plan_keyboard, render_plan, to_html
from .persona import GREETING, HELP_TEXT, OFF_TOPIC_REPLY
from .runtime import runtime

logger = logging.getLogger(__name__)

router = Router()

TYPING_INTERVAL_SECONDS = 4
FALLBACK_REPLY = "Что-то пошло не так на моей стороне. Попробуй, пожалуйста, ещё раз через минуту."

LINK_INSTRUCTIONS = (
    "Я работаю только с привязанными аккаунтами Teenage Space — так я вижу твой "
    "возраст из профиля и могу сохранять избранное и планы.\n\n"
    "Как привязать:\n"
    '1. Открой <a href="{site}/profile">Профиль</a> на Teenage Space.\n'
    "2. Нажми «Привязать Telegram».\n"
    "3. Перейди по ссылке, которую он покажет — она откроет этот чат.\n\n"
    "После этого пиши мне что угодно — например «хакатон по IT для 15 лет»."
)


@dataclass
class Job:
    message: Message
    text: str


def _age_from(birth_date: str | None, today: date | None = None) -> int | None:
    born = parse_date(birth_date)
    if not born:
        return None
    today = today or bishkek_today()
    return today.year - born.year - ((today.month, today.day) < (born.month, born.day))


async def chat_context(chat_id: int, *, refresh: bool = False) -> dict[str, Any]:
    """Who this chat is, as far as the platform knows. Unlinked is the normal case."""
    if not refresh:
        cached = runtime.cached_context(chat_id)
        if cached is not None:
            return cached
    try:
        me = await api().me(chat_id)
    except ApiError as error:
        logger.warning("Could not load chat context: %s", error)
        return {"linked": False, "user_id": None, "age": None, "favorites": set(), "name": None}

    profile = me.get("profile") or {}
    context = {
        "linked": bool(me.get("linked")),
        "user_id": profile.get("id") or None,
        "age": _age_from(profile.get("birthDate")),
        "favorites": set(me.get("favorites") or []),
        "name": profile.get("name") or None,
    }
    runtime.cache_context(chat_id, context)
    return context


async def _require_linked(message: Message) -> dict[str, Any] | None:
    """Gate: Барс only talks to accounts linked from the Teenage Space site.

    Returns the chat context when linked, None (having already replied with
    instructions) otherwise -- callers just check truthiness and return early.
    """
    context = await chat_context(message.chat.id)
    if context["linked"]:
        return context
    await message.answer(
        LINK_INSTRUCTIONS.format(site=get_settings().site_url.rstrip("/")),
        parse_mode="HTML",
        disable_web_page_preview=True,
    )
    return None


async def _keep_typing(message: Message) -> None:
    while True:
        with contextlib.suppress(Exception):
            await message.bot.send_chat_action(message.chat.id, "typing")
        await asyncio.sleep(TYPING_INTERVAL_SECONDS)


async def process(job: Job) -> None:
    """One turn of the conversation. Runs inside the chat's own queue worker."""
    message = job.message
    chat_id = message.chat.id

    typing = asyncio.create_task(_keep_typing(message))
    user_id: str | None = None
    status = "ok"
    answer_text = ""
    tools_used: list[str] = []
    usage: dict[str, dict] = {}
    try:
        thread_id, fresh = await sessions.touch(chat_id)
        context = await chat_context(chat_id)
        user_id = context.get("user_id")

        if fresh:
            # The 3-day TTL has lapsed (or this is a first message): say hello rather
            # than answering out of nowhere with no shared history.
            await message.answer(GREETING)

        state = {"messages": [HumanMessage(content=job.text)]}
        config = {
            "configurable": {
                "thread_id": thread_id,
                "chat_id": chat_id,
                "linked": context["linked"],
                "age": context["age"],
            }
        }
        # Aggregates token usage across every LLM call in the turn (guard, agent,
        # each tool round), keyed by model. Feeds the admin analytics.
        with get_usage_metadata_callback() as usage_cb:
            result = await runtime.graph.ainvoke(state, config=config)
        usage = dict(usage_cb.usage_metadata)

        answer = next(
            (
                m
                for m in reversed(result["messages"])
                if isinstance(m, AIMessage) and not getattr(m, "tool_calls", None)
            ),
            None,
        )
        # .content is a list of blocks on langchain-core 1.x; .text flattens both
        # that and the plain-string shape, so neither leaks its repr into Telegram.
        text = answer.text.strip() if answer else ""
        if not text:
            text = "Не смог собрать ответ. Попробуй переформулировать?"
            status = "fallback"
        elif text == OFF_TOPIC_REPLY:
            status = "off_topic"
        answer_text = text
        tools_used = [
            call["name"]
            for m in result["messages"]
            if isinstance(m, AIMessage)
            for call in (getattr(m, "tool_calls", None) or [])
        ]

        referenced = event_ids(text)
        events = [e for e in [await catalog().get(eid) for eid in referenced] if e]
        keyboard = event_keyboard(events, linked=context["linked"], favorites=context["favorites"])

        parts = chunks(to_html(text))
        for index, part in enumerate(parts):
            await message.answer(
                part,
                parse_mode="HTML",
                disable_web_page_preview=True,
                reply_markup=keyboard if index == len(parts) - 1 else None,
            )
    except Exception:
        logger.exception("Failed to answer chat %s", chat_id)
        status = "error"
        answer_text = FALLBACK_REPLY
        with contextlib.suppress(Exception):
            await message.answer(FALLBACK_REPLY)
    finally:
        typing.cancel()
        with contextlib.suppress(asyncio.CancelledError):
            await typing
        # Journalling must never take a turn down — the user already has their reply.
        with contextlib.suppress(Exception):
            await analytics.log_turn(
                chat_id, user_id, job.text, answer_text, status=status, tools=tools_used
            )
        if usage:
            with contextlib.suppress(Exception):
                await analytics.record_usage(chat_id, usage)


# --- commands ---------------------------------------------------------------


@router.message(CommandStart(deep_link=True))
async def start_with_token(message: Message, command: CommandObject) -> None:
    token = (command.args or "").strip()
    chat_id = message.chat.id
    try:
        profile = await api().confirm_link(token, chat_id, message.from_user.username)
    except ApiError as error:
        await message.answer(
            f"Не получилось привязать аккаунт: {error.message}\n\n"
            "Попробуй сгенерировать ссылку заново в профиле на сайте."
        )
        return

    runtime.invalidate(chat_id)
    name = (profile or {}).get("name") or (profile or {}).get("username") or "друг"
    await message.answer(
        f"Готово, {name}! Аккаунт привязан — теперь я подбираю по твоему профилю "
        "и могу складывать мероприятия в избранное.\n\n" + GREETING
    )


@router.message(CommandStart())
async def start(message: Message) -> None:
    if not await _require_linked(message):
        return
    await sessions.reset(message.chat.id)
    await message.answer(GREETING)


@router.message(Command("help"))
async def help_command(message: Message) -> None:
    await message.answer(HELP_TEXT)


@router.message(Command("reset"))
async def reset_command(message: Message) -> None:
    await sessions.reset(message.chat.id)
    await message.answer("Забыл наш разговор. Начнём заново — что тебе интересно?")


@router.message(Command("link"))
async def link_command(message: Message) -> None:
    context = await chat_context(message.chat.id, refresh=True)
    if context["linked"]:
        await message.answer("Аккаунт уже привязан. Отвязать можно в профиле на сайте.")
        return
    await message.answer(
        LINK_INSTRUCTIONS.format(site=get_settings().site_url.rstrip("/")),
        parse_mode="HTML",
        disable_web_page_preview=True,
    )


@router.message(Command("plan"))
async def plan_command(message: Message) -> None:
    if not await _require_linked(message):
        return
    plan = await plans.get_plan(message.chat.id)
    if not plan:
        await message.answer(
            "Плана пока нет. Выбери мероприятие и скажи «составь план» — распишу "
            "подготовку по шагам и буду напоминать о дедлайнах."
        )
        return
    await message.answer(
        render_plan(plan), parse_mode="HTML", reply_markup=plan_keyboard(plan["items"])
    )


# --- free text --------------------------------------------------------------


@router.message(F.text & ~F.text.startswith("/"))
async def on_text(message: Message) -> None:
    if not await _require_linked(message):
        return
    if runtime.queues is None:
        return
    await runtime.queues.submit(message.chat.id, Job(message=message, text=message.text or ""))


@router.message(F.text.startswith("/"))
async def on_unknown_command(message: Message) -> None:
    if not await _require_linked(message):
        return
    await message.answer("Такой команды у меня нет.\n\n" + HELP_TEXT)


@router.message()
async def on_other(message: Message) -> None:
    if not await _require_linked(message):
        return
    await message.answer(
        "Я понимаю только текст. Напиши словами, что ищешь — например «хакатон по IT для 15 лет»."
    )


# --- inline buttons ---------------------------------------------------------


@router.callback_query(F.data.startswith("fav:"))
async def on_favorite(callback: CallbackQuery) -> None:
    event_id = (callback.data or "").split(":", 1)[1]
    chat_id = callback.message.chat.id if callback.message else callback.from_user.id
    try:
        result = await api().toggle_favorite(chat_id, event_id)
    except ApiError:
        await callback.answer("Сначала привяжи аккаунт: /link", show_alert=True)
        return
    runtime.invalidate(chat_id)
    await callback.answer("В избранном ★" if result.get("favorited") else "Убрано из избранного")


@router.callback_query(F.data.startswith("step:"))
async def on_step(callback: CallbackQuery) -> None:
    step_no = int((callback.data or "step:0").split(":", 1)[1])
    chat_id = callback.message.chat.id if callback.message else callback.from_user.id

    context = await chat_context(chat_id)
    if not context["linked"]:
        await callback.answer("Сначала привяжи аккаунт: /link", show_alert=True)
        return

    plan = await plans.get_plan(chat_id)
    if not plan:
        await callback.answer("Плана нет")
        return
    current = next((i for i in plan["items"] if i["step_no"] == step_no), None)
    await plans.mark_done(chat_id, step_no, not (current and current["done"]))

    updated = await plans.get_plan(chat_id)
    if updated and callback.message:
        with contextlib.suppress(Exception):
            await callback.message.edit_text(
                render_plan(updated),
                parse_mode="HTML",
                reply_markup=plan_keyboard(updated["items"]),
            )
    await callback.answer("Отмечено")
