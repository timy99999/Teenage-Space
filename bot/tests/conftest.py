"""Shared fixtures.

Nothing here touches the network, Postgres or Telegram. The catalogue is replaced by an
in-memory snapshot modelled on the real Bishkek events that surfaced the bugs these tests
guard against, and vector ranking is stubbed so retrieval falls back to its deterministic
keyword ranker.
"""

from __future__ import annotations

from datetime import timedelta
from typing import Any

import pytest

from bars import catalog as catalog_module
from bars import retrieval
from bars.catalog import bishkek_today


def _event(event_id: str, title: str, **overrides: Any) -> dict[str, Any]:
    """A catalogue row with the defaults the API actually sends."""
    base: dict[str, Any] = {
        "id": event_id,
        "title": title,
        "category": "other",
        "categories": [],
        "themes": [],
        "ageMin": None,
        "ageMax": None,
        "ageLabel": None,
        "price": "free",
        "cost": None,
        "level": "local",
        "format": "офлайн",
        "place": "Бишкек",
        "audience": None,
        "short": None,
        "description": None,
        "eventDate": None,
        "eventDateEnd": None,
        "eventTime": None,
        "deadlineDate": None,
        "registrationUrl": "https://example.org/register",
        "archived": False,
        "isPast": False,
        "charity": False,
    }
    base.update(overrides)
    if not base["categories"] and base["category"]:
        base["categories"] = [base["category"]]
    return base


@pytest.fixture
def today():
    return bishkek_today()


@pytest.fixture
def events(today) -> dict[str, dict[str, Any]]:
    """Six rows covering every branch the hard filters have.

    Dates are relative to today so the fixture never rots.
    """
    day = lambda n: (today + timedelta(days=n)).isoformat()  # noqa: E731

    rows = [
        # The event at the centre of the FinOlimp incident: real, open, and invisible
        # to a 16-year-old because the age filter ran before ranking.
        _event(
            "finolimp-2026",
            "FinOlimp 2026",
            category="olympiad",
            themes=["it"],
            ageMin=18,
            ageMax=25,
            ageLabel="18–25 лет",
            deadlineDate=day(10),
            eventDate=day(38),
            description="Олимпиада по финансам, маркетингу, аудиту и Data Science.",
        ),
        _event(
            "finolimp-republic",
            "Общереспубликанская Олимпиада «FinOlimp»",
            category="olympiad",
            ageMin=18,
            ageMax=25,
            ageLabel="18–25 лет",
            deadlineDate=day(2),
            description="Первые этапы проходят онлайн.",
        ),
        _event(
            "new-generation",
            "Набор волонтеров в NEW GENERATION",
            category="volunteering",
            themes=["media"],
            ageMin=14,
            ageMax=19,
            ageLabel="14–19 лет",
            deadlineDate=day(1),
            description="Набор волонтёров в молодёжную организацию.",
        ),
        _event(
            "mun-kgu",
            "Модель ООН КГУ",
            category="eduevent",
            themes=["mun"],
            ageMin=15,
            ageMax=25,
            ageLabel="15–25 лет",
            price="paid",
            cost="300 сом",
            eventDate=day(18),
            description="Модель ООН на базе КГУ.",
        ),
        # Rolling opportunity: no dates and no age bounds at all. Must survive every
        # filter — this is the shape catalog.matches() is deliberately permissive about.
        _event(
            "rolling-help",
            "Помощь приюту для животных",
            category="volunteering",
            themes=["eco"],
            description="Приходи в любой день, помощь нужна постоянно.",
        ),
        # One-sided age bound: matches() ignores it, and so must age_fits().
        _event(
            "teens-club",
            "Клуб дебатов",
            category="eduevent",
            ageMin=14,
            ageMax=None,
            ageLabel="от 14 лет",
            eventDate=day(7),
        ),
        # Closed: past its deadline. is_open() must drop it everywhere.
        _event(
            "closed-hack",
            "Прошедший хакатон",
            category="hackathon",
            themes=["it"],
            ageMin=14,
            ageMax=18,
            deadlineDate=day(-5),
            eventDate=day(-2),
        ),
    ]
    return {row["id"]: row for row in rows}


class FakeCatalog:
    """Stands in for catalog.Catalog without the HTTP round-trip."""

    def __init__(self, rows: dict[str, dict[str, Any]]) -> None:
        self._events = rows

    async def snapshot(self, force: bool = False) -> dict[str, dict[str, Any]]:
        return self._events

    async def get(self, event_id: str) -> dict[str, Any] | None:
        return self._events.get(event_id)


@pytest.fixture
def fake_catalog(events, monkeypatch) -> FakeCatalog:
    fake = FakeCatalog(events)
    monkeypatch.setattr(catalog_module, "_catalog", fake)
    return fake


@pytest.fixture(autouse=True)
def no_vector_search(monkeypatch):
    """Force retrieval down its keyword-ranking fallback.

    Ranking order is not what these tests are about — filtering and reporting are — and
    the fallback is deterministic and needs neither Gemini nor Postgres.
    """

    async def _no_ranking(_query: str) -> None:
        return None

    monkeypatch.setattr(retrieval, "_ranked_ids", _no_ranking)


@pytest.fixture(autouse=True)
def clear_search_cache():
    """The retrieval TTL cache is process-global; a stale entry would leak between tests."""
    retrieval.clear_cache()
    yield
    retrieval.clear_cache()
