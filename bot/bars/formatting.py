"""Turning the model's answer into a Telegram message.

The model never emits URLs (see persona rule 3). Instead it tags each event it mentions
with a [id:<id>] marker; this module strips those markers and turns them into real
inline buttons built from catalogue data. A link the model cannot type is a link it
cannot hallucinate.
"""

from __future__ import annotations

import html
import re
from typing import Any

from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup

from .config import get_settings

EVENT_REF = re.compile(r"\s*\[id:\s*([A-Za-z0-9_\-]+)\s*\]")
BOLD = re.compile(r"\*\*(.+?)\*\*", re.DOTALL)

TELEGRAM_LIMIT = 4096
# Buttons for more than three events turn the message into a wall of taps.
MAX_EVENT_BUTTONS = 3


def event_ids(text: str) -> list[str]:
    """Referenced ids, in the order the model mentioned them, deduplicated."""
    seen: list[str] = []
    for match in EVENT_REF.finditer(text):
        event_id = match.group(1)
        if event_id not in seen:
            seen.append(event_id)
    return seen


def to_html(text: str) -> str:
    body = html.escape(EVENT_REF.sub("", text).strip())
    # Gemini writes markdown bold out of habit; everything else is left as plain text.
    return BOLD.sub(r"<b>\1</b>", body)


def _usable_url(value: Any) -> str | None:
    """Telegram rejects an entire message over one malformed button URL, which would
    cost the user the answer as well as the button."""
    text = str(value or "").strip()
    return text if text.startswith(("http://", "https://")) else None


def site_url(event_id: str) -> str:
    # Matches how the SPA opens a card: EventModal reads ?event=<id>.
    return f"{get_settings().site_url.rstrip('/')}/?event={event_id}"


def event_keyboard(
    events: list[dict[str, Any]], *, linked: bool, favorites: set[str] | None = None
) -> InlineKeyboardMarkup | None:
    rows: list[list[InlineKeyboardButton]] = []
    favorites = favorites or set()

    for event in events[:MAX_EVENT_BUTTONS]:
        row: list[InlineKeyboardButton] = []
        title = (event.get("title") or "")[:24]
        registration = _usable_url(event.get("registrationUrl"))
        if registration:
            row.append(InlineKeyboardButton(text=f"📝 {title}", url=registration))
        else:
            row.append(InlineKeyboardButton(text=f"🔗 {title}", url=site_url(event["id"])))
        if linked:
            starred = event["id"] in favorites
            row.append(
                InlineKeyboardButton(
                    text="★" if starred else "☆",
                    callback_data=f"fav:{event['id']}",
                )
            )
        rows.append(row)

    if not rows:
        return None
    return InlineKeyboardMarkup(inline_keyboard=rows)


def plan_keyboard(items: list[dict[str, Any]]) -> InlineKeyboardMarkup | None:
    rows = [
        [
            InlineKeyboardButton(
                text=("✅ " if item["done"] else "⬜ ") + str(item["title"])[:40],
                callback_data=f"step:{item['step_no']}",
            )
        ]
        for item in items
    ]
    return InlineKeyboardMarkup(inline_keyboard=rows) if rows else None


def chunks(text: str, limit: int = TELEGRAM_LIMIT) -> list[str]:
    """Split on paragraph boundaries so a long answer never breaks mid-tag."""
    if len(text) <= limit:
        return [text]

    parts: list[str] = []
    current = ""
    for paragraph in text.split("\n\n"):
        candidate = f"{current}\n\n{paragraph}" if current else paragraph
        if len(candidate) <= limit:
            current = candidate
            continue
        if current:
            parts.append(current)
        while len(paragraph) > limit:
            parts.append(paragraph[:limit])
            paragraph = paragraph[limit:]
        current = paragraph
    if current:
        parts.append(current)
    return parts


def render_plan(plan: dict[str, Any]) -> str:
    lines = [f"<b>{html.escape(plan['title'])}</b>", ""]
    for item in plan["items"]:
        mark = "✅" if item["done"] else "⬜"
        due = f" — до {item['due_date'].isoformat()}" if item.get("due_date") else ""
        lines.append(f"{mark} {html.escape(str(item['title']))}{due}")
        if item.get("detail"):
            lines.append(f"    <i>{html.escape(str(item['detail']))}</i>")
    return "\n".join(lines)
