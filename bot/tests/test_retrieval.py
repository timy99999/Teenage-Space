"""Retrieval: what the age filter hides, and how a named event is found anyway.

These guard the incident where a 16-year-old was told twice that the catalogue held no
olympiads while it held two, until they pasted a direct link.
"""

from __future__ import annotations

import pytest

from bars.catalog import age_fits, is_open, matches
from bars.graph.tools import search_events
from bars.retrieval import find_by_title, search

pytestmark = pytest.mark.usefixtures("fake_catalog")


class TestAgeFits:
    def test_inside_the_range(self, events):
        assert age_fits(events["finolimp-2026"], 20)

    def test_outside_the_range(self, events):
        assert not age_fits(events["finolimp-2026"], 16)

    def test_unknown_age_never_excludes(self, events):
        assert age_fits(events["finolimp-2026"], None)

    def test_a_one_sided_bound_excludes_nobody(self, events):
        # teens-club has ageMin=14 and no ageMax. matches() has always ignored a half
        # range, and age_fits() must keep doing so or the split changes behaviour.
        assert age_fits(events["teens-club"], 12)
        assert matches(events["teens-club"], age=12)

    def test_no_bounds_at_all_excludes_nobody(self, events):
        assert age_fits(events["rolling-help"], 11)


class TestSearchSplitsOnAge:
    async def test_an_underage_user_gets_near_misses_not_silence(self):
        result = await search("олимпиада", category="olympiad", age=16)

        assert result.matched == []
        assert {e["id"] for e in result.near_miss} == {"finolimp-2026", "finolimp-republic"}
        assert result.reason == "age"
        # The bot must not be able to conclude "нет олимпиад" from this.
        assert bool(result) is True

    async def test_an_eligible_user_gets_them_as_matches(self):
        result = await search("олимпиада", category="olympiad", age=20)

        assert {e["id"] for e in result.matched} == {"finolimp-2026", "finolimp-republic"}
        assert result.reason == ""

    async def test_matches_and_near_misses_coexist(self):
        result = await search("волонтёрство", age=16)

        assert "new-generation" in {e["id"] for e in result.matched}
        assert result.reason == ""

    async def test_closed_events_never_surface(self):
        result = await search("хакатон", age=16)
        surfaced = {e["id"] for e in [*result.matched, *result.near_miss]}
        assert "closed-hack" not in surfaced

    async def test_impossible_filters_report_why(self):
        result = await search("что угодно", category="olympiad", price="paid", age=16)

        assert not result
        assert result.reason == "filters"


class TestFindByTitle:
    async def test_resolves_a_typo(self):
        # The exact miss from the transcript: "Fiolimp" for "FinOlimp 2026".
        hits = await find_by_title("Fiolimp")
        assert "finolimp-2026" in {e["id"] for e in hits}

    async def test_resolves_a_name_buried_in_a_sentence(self):
        hits = await find_by_title("Я хочу на FinOlimp")
        assert "finolimp-2026" in {e["id"] for e in hits}

    async def test_a_generic_word_does_not_hijack_a_search(self):
        # "олимпиада" is a category word, not a name; matching it to a title would
        # collapse every browse query onto one card.
        assert await find_by_title("олимпиада") == []

    async def test_short_noise_matches_nothing(self):
        assert await find_by_title("ок") == []


class TestSearchEventsTool:
    """The rendered string the model actually reads."""

    async def test_age_mismatches_are_shown_with_the_requirement(self):
        rendered = await search_events.ainvoke({"query": "олимпиада", "category": "olympiad", "age": 16})

        assert "НЕ ПО ВОЗРАСТУ" in rendered
        assert "FinOlimp 2026" in rendered
        assert "пользователю 16" in rendered
        assert "Ничего не найдено" not in rendered

    async def test_a_named_event_is_rescued_even_when_ranking_buries_it(self):
        rendered = await search_events.ainvoke({"query": "Fiolimp", "age": 16})
        assert "FinOlimp 2026" in rendered

    async def test_age_comes_from_the_chat_context_when_unstated(self):
        # The profile age arrives through the RunnableConfig, never from the model.
        rendered = await search_events.ainvoke(
            {"query": "олимпиада", "category": "olympiad"},
            config={"configurable": {"age": 16}},
        )
        assert "НЕ ПО ВОЗРАСТУ" in rendered

    async def test_matching_events_are_labelled_separately(self):
        rendered = await search_events.ainvoke(
            {"query": "волонтёрство", "category": "volunteering", "age": 16}
        )
        assert "ПОДХОДЯЩИЕ:" in rendered
        assert "NEW GENERATION" in rendered


class TestIsOpen:
    def test_past_deadline_closes_an_event(self, events):
        assert not is_open(events["closed-hack"])

    def test_an_event_with_no_dates_stays_open(self, events):
        assert is_open(events["rolling-help"])
