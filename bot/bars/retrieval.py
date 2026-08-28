"""Hybrid retrieval: pgvector ranks, hard filters decide.

Semantic similarity alone would happily offer a 12-year-old a 18+ hackathon whose
deadline passed last week. So the vector index only ever produces an *ordering*; the
non-negotiable constraints (age, dates, price, level, category, theme, archived) are
applied afterwards against the catalogue snapshot.
"""

from __future__ import annotations

import logging
import re
from datetime import date
from typing import Any

from .catalog import bishkek_today, catalog, deadline_in_days, embedding_text, matches
from .db import fetch_all, to_vector_literal
from .embeddings import embed_query
from .vocab import category_label, theme_labels

logger = logging.getLogger(__name__)

# Ranked candidates pulled from the index before filtering. Generous, because the hard
# filters can reject most of them and the catalogue is small anyway.
CANDIDATE_POOL = 60


async def _ranked_ids(query: str) -> list[str] | None:
    """Vector ranking, or None when it is unavailable (empty index, API hiccup)."""
    try:
        vector = await embed_query(query)
    except Exception:
        logger.exception("Query embedding failed; falling back to keyword ranking")
        return None

    try:
        rows = await fetch_all(
            "select event_id, similarity from match_events(%s::vector, %s)",
            (to_vector_literal(vector), CANDIDATE_POOL),
        )
    except Exception:
        logger.exception("match_events failed; falling back to keyword ranking")
        return None

    return [row["event_id"] for row in rows] or None


def _keyword_rank(query: str, events: list[dict[str, Any]]) -> list[str]:
    """Fallback used before the first index run and if Gemini is unreachable.

    Crude on purpose: it only has to keep the bot useful, not to be good."""
    terms = [t for t in re.split(r"\W+", query.lower()) if len(t) > 2]
    scored: list[tuple[int, str]] = []
    for event in events:
        haystack = embedding_text(event).lower()
        score = sum(haystack.count(term) for term in terms)
        scored.append((score, event["id"]))
    scored.sort(key=lambda pair: pair[0], reverse=True)
    return [event_id for score, event_id in scored if score > 0] or [e["id"] for e in events]


async def search(
    query: str,
    *,
    category: str | None = None,
    themes: list[str] | None = None,
    age: int | None = None,
    price: str | None = None,
    level: str | None = None,
    date_from: date | None = None,
    date_to: date | None = None,
    limit: int = 5,
) -> list[dict[str, Any]]:
    events = await catalog().snapshot()
    today = bishkek_today()

    eligible = {
        event_id: event
        for event_id, event in events.items()
        if matches(
            event,
            category=category,
            themes=themes,
            age=age,
            price=price,
            level=level,
            date_from=date_from,
            date_to=date_to,
            today=today,
        )
    }
    if not eligible:
        return []

    order = await _ranked_ids(query) if query.strip() else None
    if order is None:
        order = _keyword_rank(query, list(eligible.values()))

    ranked = [eligible[event_id] for event_id in order if event_id in eligible]
    # Anything the ranker never saw (just indexed, or index lagging) still deserves a
    # place at the back rather than being invisible.
    seen = {e["id"] for e in ranked}
    ranked.extend(event for event_id, event in eligible.items() if event_id not in seen)
    return ranked[:limit]


def describe(event: dict[str, Any]) -> str:
    """Compact, factual rendering handed to the model. No links: the formatter attaches
    buttons, and a model that never sees a URL cannot invent one."""
    lines = [f"id: {event['id']}", f"Название: {event.get('title')}"]

    category = category_label(event.get("category"))
    if category:
        lines.append(f"Категория: {category}")
    themes = theme_labels(event.get("themes"))
    if themes:
        lines.append(f"Темы: {themes}")
    if event.get("ageLabel"):
        lines.append(f"Возраст: {event['ageLabel']}")
    if event.get("format"):
        lines.append(f"Формат: {event['format']}")

    price = "Бесплатно" if event.get("price") == "free" else (event.get("cost") or "Платно")
    lines.append(f"Цена: {price}")
    if event.get("charity"):
        lines.append("Благотворительное: да")
    lines.append("Уровень: " + ("международный" if event.get("level") == "intl" else "локальный"))

    if event.get("eventDate"):
        when = event["eventDate"]
        if event.get("eventDateEnd"):
            when += f" — {event['eventDateEnd']}"
        if event.get("eventTime"):
            when += f", {event['eventTime']}"
        lines.append(f"Дата: {when}")
    if event.get("deadlineDate"):
        days = deadline_in_days(event)
        suffix = f" (осталось дней: {days})" if days is not None and days >= 0 else ""
        lines.append(f"Дедлайн регистрации: {event['deadlineDate']}{suffix}")
    if event.get("place"):
        lines.append(f"Место: {event['place']}")
    if event.get("audience"):
        lines.append(f"Для кого: {event['audience']}")
    lines.append(f"Регистрация доступна: {'да' if event.get('registrationUrl') else 'нет'}")

    description = (event.get("description") or "").strip()
    if description:
        lines.append(f"Описание: {description[:700]}")
    return "\n".join(lines)
