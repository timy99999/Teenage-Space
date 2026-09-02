"""Plan dates and the consent gate on save_plan."""

from __future__ import annotations

from datetime import timedelta

import pytest

from bars.graph import tools as tools_module
from bars.graph.tools import _clean_due_date, _plan_horizon, save_plan

pytestmark = pytest.mark.usefixtures("fake_catalog")


class TestCleanDueDate:
    def test_a_date_in_the_past_is_dropped(self, today):
        assert _clean_due_date((today - timedelta(days=1)).isoformat(), today, None) is None

    def test_today_is_still_allowed(self, today):
        assert _clean_due_date(today.isoformat(), today, None) == today.isoformat()

    def test_a_date_past_the_deadline_is_pulled_back(self, today):
        horizon = today + timedelta(days=10)
        late = (today + timedelta(days=30)).isoformat()

        assert _clean_due_date(late, today, horizon) == horizon.isoformat()

    def test_a_sensible_date_is_left_alone(self, today):
        due = (today + timedelta(days=3)).isoformat()
        assert _clean_due_date(due, today, today + timedelta(days=10)) == due

    def test_unparseable_input_is_dropped_rather_than_raising(self, today):
        assert _clean_due_date("завтра", today, None) is None
        assert _clean_due_date(None, today, None) is None


class TestPlanHorizon:
    def test_prefers_the_registration_deadline(self, events, today):
        assert _plan_horizon(events["finolimp-2026"]) == today + timedelta(days=10)

    def test_falls_back_to_the_event_date(self, events, today):
        assert _plan_horizon(events["mun-kgu"]) == today + timedelta(days=18)

    def test_none_when_the_event_has_no_dates(self, events):
        assert _plan_horizon(events["rolling-help"]) is None


class TestSavePlan:
    async def test_an_unknown_event_is_refused(self):
        result = await save_plan.ainvoke(
            {"title": "План", "steps": [{"title": "Шаг"}], "event_id": "does-not-exist"},
            config={"configurable": {"chat_id": 1}},
        )

        assert "не найдено" in result
        assert "не сохранён" in result

    async def test_dates_are_clamped_before_the_plan_is_written(self, monkeypatch, today):
        written: dict = {}

        async def fake_create_plan(chat_id, *, title, items, event):
            written.update(chat_id=chat_id, title=title, items=items, event=event)
            return "plan-id"

        monkeypatch.setattr(tools_module, "create_plan", fake_create_plan)

        await save_plan.ainvoke(
            {
                "title": "Подготовка к FinOlimp 2026",
                "steps": [
                    # Exactly the two bad shapes from the transcript: a step dated
                    # before today, and one past the event's own deadline.
                    {"title": "Выбрать направление", "due_date": (today - timedelta(days=2)).isoformat()},
                    {"title": "Отправить заявку", "due_date": (today + timedelta(days=99)).isoformat()},
                    {"title": "Повторить теорию", "due_date": (today + timedelta(days=5)).isoformat()},
                ],
                "event_id": "finolimp-2026",
            },
            config={"configurable": {"chat_id": 42}},
        )

        deadline = (today + timedelta(days=10)).isoformat()
        assert [item["due_date"] for item in written["items"]] == [
            None,
            deadline,
            (today + timedelta(days=5)).isoformat(),
        ]
        assert written["event"]["id"] == "finolimp-2026"

    async def test_a_plan_with_no_usable_steps_is_refused(self, monkeypatch):
        async def unreachable(*_args, **_kwargs):
            raise AssertionError("create_plan should not be called for an empty plan")

        monkeypatch.setattr(tools_module, "create_plan", unreachable)

        result = await save_plan.ainvoke(
            {"title": "Пустой", "steps": [{"title": "   "}], "event_id": "finolimp-2026"},
            config={"configurable": {"chat_id": 1}},
        )

        assert "пустой" in result.lower()

    async def test_no_chat_means_no_write(self):
        result = await save_plan.ainvoke(
            {"title": "П", "steps": [{"title": "Шаг"}], "event_id": "finolimp-2026"}
        )
        assert "не определён чат" in result
