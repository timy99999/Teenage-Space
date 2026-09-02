"""Hybrid retrieval: pgvector ranks, hard filters decide.

Semantic similarity alone would happily offer a 12-year-old a 18+ hackathon whose
deadline passed last week. So the vector index only ever produces an *ordering*; the
non-negotiable constraints (age, dates, price, level, category, theme, archived) are
applied afterwards against the catalogue snapshot.

Age is the one constraint that does not simply delete a result. Filtering it away
silently is what made Барс tell a 16-year-old there were no olympiads in a catalogue
that held two, twice, until they pasted a direct link. So search() reports age
mismatches separately as `near_miss`, and the agent shows them labelled rather than
pretending the catalogue is empty.
"""

from __future__ import annotations

import difflib
import logging
import re
import time
from dataclasses import dataclass, field
from datetime import date
from typing import Any

from .catalog import (
    age_fits,
    age_requirement,
    bishkek_today,
    catalog,
    deadline_in_days,
    embedding_text,
    matches,
)
from .db import fetch_all, to_vector_literal
from .embeddings import embed_query
from .vocab import category_label, theme_labels

logger = logging.getLogger(__name__)

# Ranked candidates pulled from the index before filtering. Generous, because the hard
# filters can reject most of them and the catalogue is small anyway.
CANDIDATE_POOL = 60

# Repeated identical searches inside one turn used to cost an embedding round-trip and a
# vector query each. Short enough that a freshly published event shows up within a
# minute, long enough to collapse a burst.
CACHE_TTL_SECONDS = 60

# How close a typed name has to be to a catalogue title. 0.72 lets "Fiolimp" reach
# "FinOlimp 2026" without letting it reach the other, differently-named olympiad.
TITLE_MATCH_CUTOFF = 0.72


@dataclass(frozen=True)
class SearchResult:
    """What the catalogue has to say about one query.

    `matched` passes every filter. `near_miss` passes every filter *except* age --
    real, open events the user asked for but is the wrong age for. `reason` explains a
    thin result so the agent can be specific instead of saying "ничего не найдено".
    """

    matched: list[dict[str, Any]] = field(default_factory=list)
    near_miss: list[dict[str, Any]] = field(default_factory=list)
    reason: str = ""

    def __bool__(self) -> bool:
        return bool(self.matched or self.near_miss)


_cache: dict[tuple, tuple[float, SearchResult]] = {}


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


def clear_cache() -> None:
    _cache.clear()


def _cache_key(query: str, filters: tuple) -> tuple:
    return (query.strip().casefold(), *filters)


def _order(ranked_ids: list[str] | None, pool: dict[str, dict[str, Any]], query: str) -> list[dict]:
    order = ranked_ids or _keyword_rank(query, list(pool.values()))
    ranked = [pool[event_id] for event_id in order if event_id in pool]
    # Anything the ranker never saw (just indexed, or index lagging) still deserves a
    # place at the back rather than being invisible.
    seen = {e["id"] for e in ranked}
    ranked.extend(event for event_id, event in pool.items() if event_id not in seen)
    return ranked


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
) -> SearchResult:
    filters = (
        category,
        tuple(sorted(themes)) if themes else None,
        age,
        price,
        level,
        date_from,
        date_to,
        limit,
    )
    key = _cache_key(query, filters)
    cached = _cache.get(key)
    if cached and time.monotonic() - cached[0] < CACHE_TTL_SECONDS:
        return cached[1]

    events = await catalog().snapshot()
    today = bishkek_today()

    # Everything the user asked for *except* the age rule, so an age mismatch can be
    # reported rather than silently deleted.
    without_age = {
        event_id: event
        for event_id, event in events.items()
        if matches(
            event,
            category=category,
            themes=themes,
            age=None,
            price=price,
            level=level,
            date_from=date_from,
            date_to=date_to,
            today=today,
        )
    }

    result: SearchResult
    if not without_age:
        open_events = any(matches(event, today=today) for event in events.values())
        result = SearchResult(reason="filters" if open_events else "empty_catalog")
    else:
        # Rank once over the whole pool so the two lists share a consistent ordering.
        ranked = _order(await _ranked_ids(query) if query.strip() else None, without_age, query)
        matched = [e for e in ranked if age_fits(e, age)]
        near_miss = [e for e in ranked if not age_fits(e, age)]
        result = SearchResult(
            matched=matched[:limit],
            near_miss=near_miss[:limit] if not matched else near_miss[:2],
            reason="age" if not matched and near_miss else "",
        )

    _cache[key] = (time.monotonic(), result)
    return result


def _normalise_title(text: str) -> str:
    return re.sub(r"[^0-9a-zа-яё]+", "", text.casefold())


async def find_by_title(query: str, limit: int = 3) -> list[dict[str, Any]]:
    """Resolve a query that names an event, tolerating typos and ignoring the age rule.

    Someone who types the name of an event they have already seen deserves the card,
    not "нет в каталоге" -- which is what they got for "Fiolimp", and then again for
    the correctly-spelled "FinOlimp", until they pasted a direct link.
    """
    events = await catalog().snapshot()
    if not events:
        return []

    by_key: dict[str, dict[str, Any]] = {}
    for event in events.values():
        key = _normalise_title(event.get("title") or "")
        if key:
            by_key.setdefault(key, event)
    if not by_key:
        return []

    # The whole phrase, plus each substantial word in it: the name is often buried in a
    # sentence ("я хочу на finolimp"), where the phrase as a whole matches nothing.
    needles = [_normalise_title(query)]
    needles.extend(_normalise_title(word) for word in re.split(r"\s+", query))
    needles = [n for n in dict.fromkeys(needles) if len(n) >= 4]

    hits: list[dict[str, Any]] = []
    seen: set[str] = set()
    for needle in needles:
        for key in difflib.get_close_matches(needle, list(by_key), n=limit, cutoff=TITLE_MATCH_CUTOFF):
            event = by_key[key]
            if event["id"] not in seen:
                seen.add(event["id"])
                hits.append(event)
    return hits[:limit]


def describe(event: dict[str, Any], note: str | None = None) -> str:
    """Compact, factual rendering handed to the model. No links: the formatter attaches
    buttons, and a model that never sees a URL cannot invent one."""
    lines = [f"id: {event['id']}", f"Название: {event.get('title')}"]
    if note:
        lines.append(note)

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


def age_mismatch_note(event: dict[str, Any], age: int | None) -> str:
    """The line that stops the model from claiming the catalogue is empty."""
    return f"НЕ ПОДХОДИТ ПО ВОЗРАСТУ: нужно {age_requirement(event)}, пользователю {age}"
