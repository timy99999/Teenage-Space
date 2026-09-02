"""Guards against the bot naming an event the catalogue does not contain.

Regression cover for a real incident: told the hackathon category was empty, the model
answered with no tool calls at all and invented "Школьная олимпиада по программированию
и робототехнике [id:101]". Asked about it, get_event's not-found message volunteered
"возможно, оно уже в архиве", which the model relayed to the user as fact.
"""

from __future__ import annotations

import pytest

from bars.graph.tools import get_event, search_events
from bars.persona import SYSTEM_PROMPT, system_prompt

pytestmark = pytest.mark.usefixtures("fake_catalog")


class TestGetEventOnAnUnknownId:
    async def test_it_offers_no_explanation(self):
        result = await get_event.ainvoke({"event_id": "101"})

        # The old wording guessed at a reason; for an invented id that guess became a
        # fabricated backstory the user was told as fact.
        assert "архив" not in result.lower()
        assert "возможно" not in result.lower()

    async def test_it_tells_the_model_not_to_mention_the_id(self):
        result = await get_event.ainvoke({"event_id": "101"})

        assert "не называй" in result.lower()
        assert "search_events" in result

    async def test_a_real_event_still_renders(self):
        result = await get_event.ainvoke({"event_id": "finolimp-2026"})
        assert "FinOlimp 2026" in result


class TestGetEventOnAClosedEvent:
    async def test_a_past_event_is_marked_closed(self):
        # closed-hack is past its deadline. catalog.get() still resolves it by id, so
        # describe() has to say so or the model presents it as available.
        result = await get_event.ainvoke({"event_id": "closed-hack"})

        assert "ЗАКРЫТО" in result
        assert "неактуально" in result

    async def test_an_open_event_carries_no_such_marker(self):
        result = await get_event.ainvoke({"event_id": "finolimp-2026"})
        assert "ЗАКРЫТО" not in result


class TestSearchNeverSurfacesClosedEvents:
    async def test_a_past_event_is_absent_from_every_section(self):
        rendered = await search_events.ainvoke({"query": "хакатон"})
        assert "Прошедший хакатон" not in rendered


class TestCensusWording:
    """The census must inform the model, never licence it to answer without tools."""

    def test_it_says_the_counters_carry_no_names(self):
        rendered = system_prompt("2026-09-02", "хакатоны — 0")
        assert "названий мероприятий в них нет" in rendered

    def test_an_empty_category_still_routes_to_a_search(self):
        rendered = system_prompt("2026-09-02", "хакатоны — 0")

        # The regression was the instruction "не ищи ... предложи то, что есть", which
        # left the model naming events it had never looked up.
        assert "search_events" in rendered
        assert "предложи то, что есть" not in rendered

    def test_naming_an_event_without_a_tool_call_is_forbidden(self):
        rendered = system_prompt("2026-09-02", "хакатоны — 0")
        assert "не можешь его назвать" in rendered

    def test_rule_one_binds_to_the_current_turn(self):
        assert "В ЭТОМ ходе" in SYSTEM_PROMPT
        assert "id" in SYSTEM_PROMPT.split("Никогда не придумывай")[1].split("\n")[0]
