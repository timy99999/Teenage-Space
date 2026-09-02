"""In-process snapshot of the event catalogue.

The catalogue is small (dozens of rows) and GET /api/events is already cached 60s
server-side, so holding a short-lived snapshot here costs almost nothing and keeps the
per-message latency off the network. Hard filters (age, dates, price, level, category,
theme) are applied against this snapshot; the vector index only ever supplies a ranking.
"""

from __future__ import annotations

import asyncio
import logging
from datetime import date, datetime, timedelta, timezone
from typing import Any

from .api_client import api
from .config import get_settings

logger = logging.getLogger(__name__)

# Kyrgyzstan has no DST, so a fixed UTC+6 offset avoids depending on IANA tz data —
# same trade-off the backend makes in events.service.ts.
BISHKEK_TZ = timezone(timedelta(hours=6))


def bishkek_now() -> datetime:
    return datetime.now(BISHKEK_TZ)


def bishkek_today() -> date:
    return bishkek_now().date()


def parse_date(value: str | None) -> date | None:
    if not value:
        return None
    try:
        return date.fromisoformat(value[:10])
    except ValueError:
        return None


class Catalog:
    def __init__(self) -> None:
        self._events: dict[str, dict[str, Any]] = {}
        self._fetched_at: float = 0.0
        self._lock = asyncio.Lock()

    async def snapshot(self, force: bool = False) -> dict[str, dict[str, Any]]:
        settings = get_settings()
        loop = asyncio.get_running_loop()
        async with self._lock:
            age = loop.time() - self._fetched_at
            if force or not self._events or age > settings.catalog_ttl_seconds:
                try:
                    # scope=all keeps voting-stage ("past") events resolvable by id;
                    # they are filtered out of recommendations further down.
                    events = await api().list_events(scope="all")
                    self._events = {e["id"]: e for e in events}
                    self._fetched_at = loop.time()
                except Exception:
                    # Serving a slightly stale catalogue beats failing the whole reply —
                    # the same stale-while-error stance the site already takes.
                    logger.exception("Catalogue refresh failed; serving the previous snapshot")
                    if not self._events:
                        raise
            return self._events

    async def get(self, event_id: str) -> dict[str, Any] | None:
        events = await self.snapshot()
        if event_id in events:
            return events[event_id]
        try:
            return await api().get_event(event_id)
        except Exception:
            return None


_catalog = Catalog()


def catalog() -> Catalog:
    return _catalog


def is_open(event: dict[str, Any], today: date | None = None) -> bool:
    """Still worth recommending: not archived, not in the voting stage, not past its dates."""
    today = today or bishkek_today()
    if event.get("archived") or event.get("isPast"):
        return False
    deadline = parse_date(event.get("deadlineDate"))
    if deadline and deadline < today:
        return False
    end = parse_date(event.get("eventDateEnd")) or parse_date(event.get("eventDate"))
    if end and end < today:
        return False
    return True


def matches(
    event: dict[str, Any],
    *,
    category: str | None = None,
    themes: list[str] | None = None,
    age: int | None = None,
    price: str | None = None,
    level: str | None = None,
    date_from: date | None = None,
    date_to: date | None = None,
    today: date | None = None,
) -> bool:
    if not is_open(event, today):
        return False
    if category:
        cats = event.get("categories") or ([event["category"]] if event.get("category") else [])
        if category not in cats:
            return False
    if themes and not set(themes) & set(event.get("themes") or []):
        return False
    if price and event.get("price") != price:
        return False
    if level and event.get("level") != level:
        return False
    if age is not None:
        lo, hi = event.get("ageMin"), event.get("ageMax")
        if lo is not None and hi is not None and not (lo <= age <= hi):
            return False
    if date_from or date_to:
        # An event with no date at all (rolling opportunity) stays in: excluding it
        # would hide exactly the kind of thing a teenager can join at any time.
        when = parse_date(event.get("eventDate")) or parse_date(event.get("deadlineDate"))
        if when is not None:
            if date_from and when < date_from:
                return False
            if date_to and when > date_to:
                return False
    return True


def deadline_in_days(event: dict[str, Any], today: date | None = None) -> int | None:
    deadline = parse_date(event.get("deadlineDate"))
    if not deadline:
        return None
    return (deadline - (today or bishkek_today())).days


def embedding_text(event: dict[str, Any]) -> str:
    """What gets embedded. Title and description carry most of the signal; category,
    themes and audience add the vocabulary a teenager actually types."""
    from .vocab import category_label, theme_labels

    parts = [
        event.get("title") or "",
        category_label(event.get("category")),
        theme_labels(event.get("themes")),
        event.get("audience") or "",
        event.get("ageLabel") or "",
        event.get("format") or "",
        event.get("place") or "",
        event.get("short") or "",
        event.get("description") or "",
    ]
    return "\n".join(p.strip() for p in parts if p and p.strip())
