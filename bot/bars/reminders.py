"""Delivery of scheduled reminders.

The schedule lives in Postgres (bot_reminders), not in the scheduler's memory: Railway
restarts this container on every push to main, and an in-memory jobstore would quietly
drop everything anyone had planned.
"""

from __future__ import annotations

import logging
from typing import Any

from aiogram import Bot
from aiogram.exceptions import TelegramForbiddenError

from .formatting import site_url
from .plans import due_reminders, mark_failed, mark_sent

logger = logging.getLogger(__name__)


def _render(kind: str, payload: dict[str, Any]) -> str:
    title = payload.get("title", "мероприятие")
    if kind == "deadline":
        days = payload.get("days_left")
        if days == 1:
            head = f"Завтра закрывается регистрация: <b>{title}</b>."
            tail = "Если ещё не подал заявку — сейчас самое время."
        elif days == 3:
            head = f"Три дня до дедлайна: <b>{title}</b>."
            tail = "Успеешь спокойно всё дособрать."
        else:
            head = f"Неделя до дедлайна: <b>{title}</b>."
            tail = "Хороший момент начать подготовку — загляни в /plan."
        return f"{head}\n{tail}"

    if kind == "event_soon":
        return f"Завтра — <b>{title}</b>. Проверь, всё ли готово: /plan"

    if kind == "plan_step":
        step = payload.get("title", "шаг плана")
        return f"Напоминание по плану: <b>{step}</b>.\nОтметить выполненное можно в /plan"

    return f"Напоминание: {title}"


def _keyboard_url(payload: dict[str, Any]) -> str | None:
    event_id = payload.get("event_id")
    return site_url(event_id) if event_id else None


async def dispatch(bot: Bot) -> int:
    sent = 0
    for row in await due_reminders():
        payload = row.get("payload") or {}
        text = _render(row["kind"], payload)
        url = _keyboard_url(payload)
        if url:
            text = f"{text}\n\n{url}"
        try:
            await bot.send_message(row["chat_id"], text, parse_mode="HTML")
        except TelegramForbiddenError:
            # Blocked the bot or deleted the chat: retrying forever helps nobody.
            logger.info("Chat %s is unreachable; dropping reminder", row["chat_id"])
            await mark_sent(str(row["id"]))
        except Exception as error:
            logger.warning("Reminder %s failed: %s", row["id"], error)
            await mark_failed(str(row["id"]), str(error))
        else:
            await mark_sent(str(row["id"]))
            sent += 1
    return sent
