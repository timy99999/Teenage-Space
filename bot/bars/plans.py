"""Prep plans and the reminders they generate.

A plan is the reason someone opens Барс a second time, so it outlives the 3-day
conversation TTL: the chat is disposable, the checklist the teenager agreed to is not.
"""

from __future__ import annotations

import json
import logging
from datetime import date, datetime, time, timedelta
from typing import Any

from .catalog import BISHKEK_TZ, bishkek_today, parse_date
from .db import execute, fetch_all, fetch_one

logger = logging.getLogger(__name__)

# Nobody wants a push at 3am; 09:00 local is when a reminder is actually actionable.
REMINDER_HOUR = 9

# Days before the registration deadline worth a nudge. 7 to start preparing, 3 to
# finish, 1 because that is when people actually do it.
DEADLINE_OFFSETS = (7, 3, 1)


def _fire_at(day: date) -> datetime:
    return datetime.combine(day, time(hour=REMINDER_HOUR), tzinfo=BISHKEK_TZ)


async def create_plan(
    chat_id: int,
    *,
    title: str,
    items: list[dict[str, Any]],
    event: dict[str, Any] | None,
) -> str:
    event_id = event.get("id") if event else None

    # One plan per chat at a time: a teenager juggling three checklists in a chat window
    # is worse off than one with a clear next step.
    await execute("delete from bot_plans where chat_id = %s", (chat_id,))
    await execute("delete from bot_reminders where chat_id = %s and sent_at is null", (chat_id,))

    row = await fetch_one(
        "insert into bot_plans (chat_id, event_id, title) values (%s, %s, %s) returning id",
        (chat_id, event_id, title),
    )
    plan_id = str(row["id"])

    for index, item in enumerate(items, start=1):
        due = parse_date(item.get("due_date"))
        await execute(
            """
            insert into bot_plan_items (plan_id, step_no, title, detail, due_date)
            values (%s, %s, %s, %s, %s)
            """,
            (plan_id, index, item.get("title", "")[:200], (item.get("detail") or "")[:600], due),
        )
        if due and due >= bishkek_today():
            await _add_reminder(
                chat_id,
                _fire_at(due),
                "plan_step",
                {"plan_id": plan_id, "step_no": index, "title": item.get("title", "")},
            )

    if event:
        await _schedule_event_reminders(chat_id, plan_id, event)

    return plan_id


async def _schedule_event_reminders(chat_id: int, plan_id: str, event: dict[str, Any]) -> None:
    today = bishkek_today()

    deadline = parse_date(event.get("deadlineDate"))
    if deadline:
        for offset in DEADLINE_OFFSETS:
            day = deadline - timedelta(days=offset)
            if day >= today:
                await _add_reminder(
                    chat_id,
                    _fire_at(day),
                    "deadline",
                    {
                        "plan_id": plan_id,
                        "event_id": event["id"],
                        "title": event.get("title", ""),
                        "days_left": offset,
                    },
                )

    starts = parse_date(event.get("eventDate"))
    if starts and starts - timedelta(days=1) >= today:
        await _add_reminder(
            chat_id,
            _fire_at(starts - timedelta(days=1)),
            "event_soon",
            {"plan_id": plan_id, "event_id": event["id"], "title": event.get("title", "")},
        )


async def _add_reminder(chat_id: int, fire_at: datetime, kind: str, payload: dict[str, Any]) -> None:
    await execute(
        "insert into bot_reminders (chat_id, fire_at, kind, payload) values (%s, %s, %s, %s)",
        (chat_id, fire_at, kind, json.dumps(payload, ensure_ascii=False)),
    )


async def get_plan(chat_id: int) -> dict[str, Any] | None:
    plan = await fetch_one(
        "select id, event_id, title, created_at from bot_plans where chat_id = %s"
        " order by created_at desc limit 1",
        (chat_id,),
    )
    if not plan:
        return None
    plan["items"] = await fetch_all(
        "select step_no, title, detail, due_date, done from bot_plan_items"
        " where plan_id = %s order by step_no",
        (plan["id"],),
    )
    return plan


async def mark_done(chat_id: int, step_no: int, done: bool = True) -> bool:
    plan = await fetch_one(
        "select id from bot_plans where chat_id = %s order by created_at desc limit 1", (chat_id,)
    )
    if not plan:
        return False
    await execute(
        "update bot_plan_items set done = %s where plan_id = %s and step_no = %s",
        (done, plan["id"], step_no),
    )
    return True


async def due_reminders(limit: int = 20) -> list[dict[str, Any]]:
    return await fetch_all(
        """
        select id, chat_id, kind, payload
        from bot_reminders
        where sent_at is null and attempts < 3 and fire_at <= now()
        order by fire_at
        limit %s
        """,
        (limit,),
    )


async def mark_sent(reminder_id: str) -> None:
    await execute("update bot_reminders set sent_at = now() where id = %s", (reminder_id,))


async def mark_failed(reminder_id: str, error: str) -> None:
    await execute(
        "update bot_reminders set attempts = attempts + 1, last_error = %s where id = %s",
        (error[:500], reminder_id),
    )
