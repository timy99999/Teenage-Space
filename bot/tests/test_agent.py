"""Graph discipline: what history the agent sees, and what tool calls it gets to run.

Between them these are the fixes for the turn that answered three different questions
with one verbatim reply, and the turn that ran seven searches and then gave up.
"""

from __future__ import annotations

from langchain_core.messages import AIMessage, HumanMessage, ToolMessage

from bars.graph.agent import (
    MAX_TOOL_CALLS_PER_ROUND,
    _collected_tool_output,
    _prior_turns,
    _recent_history,
    filter_tool_calls,
    tool_rounds_this_turn,
)


def call(name: str, **args) -> dict:
    return {"name": name, "args": args, "id": f"{name}-{sorted(args.items())}"}


def search(**args) -> dict:
    return call("search_events", **args)


def a_turn(question: str, answer: str, *, tools: list[dict] | None = None) -> list:
    """One completed exchange, with its tool traffic in the middle."""
    messages: list = [HumanMessage(content=question)]
    for tool_call in tools or []:
        messages.append(AIMessage(content="", tool_calls=[tool_call]))
        messages.append(ToolMessage(content=f"result of {tool_call['name']}", tool_call_id=tool_call["id"]))
    messages.append(AIMessage(content=answer))
    return messages


class TestPriorTurns:
    def test_old_tool_traffic_is_dropped(self):
        history = a_turn("смм?", "вот FinOlimp", tools=[search(query="смм")])
        history.append(HumanMessage(content="как дела?"))

        kept = _prior_turns(history)

        assert [type(m) for m in kept] == [HumanMessage, AIMessage]
        assert not any(isinstance(m, ToolMessage) for m in kept)
        assert kept[-1].text == "вот FinOlimp"

    def test_only_the_last_few_turns_survive(self):
        history: list = []
        for n in range(6):
            history.extend(a_turn(f"вопрос {n}", f"ответ {n}"))
        history.append(HumanMessage(content="свежий вопрос"))

        questions = [m.text for m in _prior_turns(history) if isinstance(m, HumanMessage)]

        # MAX_TURNS_IN_CONTEXT is 3: the current turn plus two before it.
        assert questions == ["вопрос 4", "вопрос 5"]

    def test_an_empty_tool_call_stub_is_not_mistaken_for_an_answer(self):
        history = a_turn("что есть?", "вот список", tools=[search(query="что есть")])
        history.append(HumanMessage(content="ещё"))

        assert all(m.text.strip() for m in _prior_turns(history) if isinstance(m, AIMessage))

    def test_no_history_at_all(self):
        assert _prior_turns([HumanMessage(content="привет")]) == []


class TestRecentHistory:
    def test_the_live_turn_keeps_its_tool_pairing(self):
        messages = a_turn("старый", "старый ответ", tools=[search(query="старый")])
        live_call = search(query="новый")
        messages.extend(
            [
                HumanMessage(content="новый"),
                AIMessage(content="", tool_calls=[live_call]),
                ToolMessage(content="свежие данные", tool_call_id=live_call["id"]),
            ]
        )

        kept = _recent_history(messages)

        # Exactly one ToolMessage — the live one — and its AIMessage stub is still there.
        tool_messages = [m for m in kept if isinstance(m, ToolMessage)]
        assert len(tool_messages) == 1
        assert tool_messages[0].content == "свежие данные"
        assert any(getattr(m, "tool_calls", None) for m in kept)


class TestCollectedToolOutput:
    def test_gathers_this_turn_only_oldest_first(self):
        messages = a_turn("старый", "ответ", tools=[search(query="старый")])
        first, second = search(query="a"), search(query="b")
        messages.extend(
            [
                HumanMessage(content="новый"),
                AIMessage(content="", tool_calls=[first]),
                ToolMessage(content="первое", tool_call_id=first["id"]),
                AIMessage(content="", tool_calls=[second]),
                ToolMessage(content="второе", tool_call_id=second["id"]),
            ]
        )

        collected = _collected_tool_output(messages)

        assert collected.index("первое") < collected.index("второе")
        assert "result of search_events" not in collected


class TestFilterToolCalls:
    def test_a_repeat_of_this_turn_s_search_is_dropped(self):
        repeated = search(query="волонтёрство")
        messages = [
            HumanMessage(content="я хочу быть волонтёром"),
            AIMessage(content="", tool_calls=[repeated]),
            ToolMessage(content="rows", tool_call_id=repeated["id"]),
        ]

        filtered = filter_tool_calls(messages, AIMessage(content="", tool_calls=[dict(repeated)]))

        assert filtered.tool_calls == []

    def test_a_different_search_still_runs(self):
        first = search(query="волонтёрство")
        messages = [
            HumanMessage(content="я хочу быть волонтёром"),
            AIMessage(content="", tool_calls=[first]),
            ToolMessage(content="rows", tool_call_id=first["id"]),
        ]

        filtered = filter_tool_calls(messages, AIMessage(content="", tool_calls=[search(query="экология")]))

        assert len(filtered.tool_calls) == 1

    def test_a_spray_is_capped(self):
        messages = [HumanMessage(content="есть что-то для смм?")]
        sprayed = [search(query=f"смм {n}") for n in range(5)]

        filtered = filter_tool_calls(messages, AIMessage(content="", tool_calls=sprayed))

        assert len(filtered.tool_calls) == MAX_TOOL_CALLS_PER_ROUND

    def test_save_plan_alongside_a_search_is_refused(self):
        # The transcript's unbidden plan: five searches and a save_plan, in one message,
        # for a question that never mentioned a plan.
        messages = [HumanMessage(content="есть что-то для смм?")]
        response = AIMessage(
            content="",
            tool_calls=[search(query="смм"), call("save_plan", title="План", event_id="x")],
        )

        filtered = filter_tool_calls(messages, response)

        assert [c["name"] for c in filtered.tool_calls] == ["search_events"]

    def test_save_plan_on_its_own_is_allowed(self):
        messages = [HumanMessage(content="давай, составь план")]
        response = AIMessage(content="", tool_calls=[call("save_plan", title="План", event_id="x")])

        assert filter_tool_calls(messages, response).tool_calls == response.tool_calls

    def test_a_plain_answer_passes_through_untouched(self):
        response = AIMessage(content="вот что нашёл")
        assert filter_tool_calls([HumanMessage(content="привет")], response) is response

    def test_filtering_everything_away_leaves_no_text_to_send(self):
        # after_agent reads exactly this to decide it must route to finalize.
        repeated = search(query="волонтёрство")
        messages = [
            HumanMessage(content="волонтёрство"),
            AIMessage(content="", tool_calls=[repeated]),
            ToolMessage(content="rows", tool_call_id=repeated["id"]),
        ]

        filtered = filter_tool_calls(messages, AIMessage(content="", tool_calls=[dict(repeated)]))

        assert not filtered.tool_calls
        assert not filtered.text.strip()


class TestToolRounds:
    def test_counts_only_the_current_turn(self):
        messages = a_turn("старый", "ответ", tools=[search(query="a"), search(query="b")])
        live = search(query="c")
        messages.extend(
            [
                HumanMessage(content="новый"),
                AIMessage(content="", tool_calls=[live]),
                ToolMessage(content="rows", tool_call_id=live["id"]),
            ]
        )

        assert tool_rounds_this_turn(messages) == 1

    def test_zero_before_any_tool_runs(self):
        assert tool_rounds_this_turn([HumanMessage(content="привет")]) == 0
