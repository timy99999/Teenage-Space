"""The graph itself: guard -> agent -> tools -> agent -> end, with a finalize escape.

Hand-rolled rather than assembled from a prebuilt helper: the loop is fifteen lines,
and writing it out keeps the topic guard as a first-class node instead of a prompt
instruction the model is free to ignore.
"""

from __future__ import annotations

import json
import logging
from typing import Literal

from langchain_core.messages import AIMessage, HumanMessage, SystemMessage, ToolMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.checkpoint.postgres.aio import AsyncPostgresSaver
from langgraph.graph import END, StateGraph
from langgraph.prebuilt import ToolNode
from psycopg_pool import AsyncConnectionPool
from pydantic import BaseModel, Field

from ..catalog import availability_line, bishkek_today, catalog
from ..config import get_settings
from ..persona import GUARD_PROMPT, OFF_TOPIC_REPLY, SMALLTALK_PROMPT, system_prompt
from .state import BarsState
from .tools import TOOLS

logger = logging.getLogger(__name__)

# A ReAct loop that keeps calling tools forever is a bill, not a feature. Three rounds
# is enough for search -> refine -> answer; the transcripts show everything past that
# was the model re-searching the same thing and then repeating an old answer anyway.
MAX_TOOL_ROUNDS = 3

# Per round, on top of the round budget. Gemini will happily emit five searches in one
# message, and each result is ~700 chars x 5 events in the *next* round's prompt.
MAX_TOOL_CALLS_PER_ROUND = 2

# The 3-day memory bounds a conversation by time, not size. Cap what the agent actually
# reads to the last few user turns so a long day of chatting doesn't turn into a growing
# prompt (and a model that just parrots its own history back).
MAX_TURNS_IN_CONTEXT = 3

FINALIZE_INSTRUCTION = (
    "Собери финальный ответ пользователю по данным, которые уже собраны ниже. "
    "Больше ничего не ищи. Если данных не хватает — честно скажи, что нашёл, "
    "и задай один уточняющий вопрос. Никогда не отвечай пустым сообщением."
)



# --- history shaping ---------------------------------------------------------


def _prior_turns(messages: list) -> list:
    """Earlier turns, pruned to what was actually said: the question and the answer.

    Tool traffic is working memory for the turn that fetched it. Feeding old tool
    results and tool-call stubs back in is what let the agent re-answer a stale
    question verbatim -- three different messages once got the same reply about a
    finance olympiad -- and it is most of the per-turn prompt cost.
    """
    human_indices = [i for i, m in enumerate(messages) if isinstance(m, HumanMessage)]
    if not human_indices:
        return []

    current_start = human_indices[-1]
    window_start = (
        human_indices[-MAX_TURNS_IN_CONTEXT] if len(human_indices) >= MAX_TURNS_IN_CONTEXT else 0
    )
    return [
        m
        for m in messages[window_start:current_start]
        if isinstance(m, HumanMessage)
        or (isinstance(m, AIMessage) and not getattr(m, "tool_calls", None) and m.text.strip())
    ]


def _current_turn(messages: list) -> list:
    """From the last HumanMessage onward, verbatim -- a tool_call and its result must
    never be separated, or Gemini rejects the history outright."""
    for index in range(len(messages) - 1, -1, -1):
        if isinstance(messages[index], HumanMessage):
            return messages[index:]
    return list(messages)


def _recent_history(messages: list) -> list:
    return [*_prior_turns(messages), *_current_turn(messages)]


def _collected_tool_output(messages: list) -> str:
    """Everything the tools returned during the current turn, oldest first."""
    collected: list[str] = []
    for message in reversed(messages):
        if isinstance(message, HumanMessage):
            break
        if isinstance(message, ToolMessage):
            collected.append(str(message.content))
    return "\n\n---\n\n".join(reversed(collected))


# --- tool-call discipline ----------------------------------------------------


def _call_signature(call: dict) -> str:
    args = call.get("args") or {}
    return f"{call.get('name', '')}|{json.dumps(args, sort_keys=True, ensure_ascii=False, default=str)}"


def _calls_this_turn(messages: list) -> set[str]:
    seen: set[str] = set()
    for message in reversed(messages):
        if isinstance(message, HumanMessage):
            break
        for call in getattr(message, "tool_calls", None) or []:
            seen.add(_call_signature(call))
    return seen


def filter_tool_calls(messages: list, response: AIMessage) -> AIMessage:
    """Trim what the agent asked for down to what is actually worth running.

    Three rules, each earned from a real transcript:
      * an identical search already run this turn returns identical rows -- one chat
        spent seven searches and 16k prompt tokens to answer "я хочу быть волонтёром",
        then gave up;
      * at most two calls per round, because Gemini sprays;
      * never save a plan in the same breath as a search -- a plan is something the
        user agreed to, and `save_plan` fired unbidden mid-search-spray.
    """
    calls = list(getattr(response, "tool_calls", None) or [])
    if not calls:
        return response

    already = _calls_this_turn(messages)
    searching = any(call.get("name") == "search_events" for call in calls)
    kept: list[dict] = []
    for call in calls:
        if len(kept) >= MAX_TOOL_CALLS_PER_ROUND:
            break
        signature = _call_signature(call)
        if signature in already:
            continue
        if call.get("name") == "save_plan" and searching:
            logger.info("Dropped save_plan issued alongside a search")
            continue
        already.add(signature)
        kept.append(call)

    if len(kept) == len(calls):
        return response
    logger.info("Trimmed tool calls %d -> %d", len(calls), len(kept))
    # Content is cleared alongside: on a tool-calling turn it holds the function-call
    # blocks, and a block for a call we just dropped would reach Gemini next round as a
    # call with no result. Nothing is lost -- this text is never sent to the user, and
    # the agent regenerates it once the tool results are in.
    return response.model_copy(update={"tool_calls": kept, "content": ""})


def tool_rounds_this_turn(messages: list) -> int:
    rounds = 0
    for message in reversed(messages):
        if isinstance(message, HumanMessage):
            break
        if getattr(message, "tool_calls", None):
            rounds += 1
    return rounds


# --- models ------------------------------------------------------------------


class GuardVerdict(BaseModel):
    kind: Literal["events", "smalltalk", "off_topic"] = Field(
        description="events — про мероприятия; smalltalk — приветствие или болтовня; "
        "off_topic — не наша тема"
    )


def _chat_model() -> ChatGoogleGenerativeAI:
    settings = get_settings()
    settings.require("gemini_api_key")
    return ChatGoogleGenerativeAI(
        model=settings.gemini_model,
        google_api_key=settings.gemini_api_key,
        temperature=0.4,
        max_output_tokens=settings.gemini_max_output_tokens,
        # Reading five event cards and listing them back is retrieval, not deliberation.
        # On Gemini 3.x every thinking token is one the answer cannot use, and unbounded
        # thinking is what truncated the answer mid-word at the old 1200 budget.
        reasoning_effort="low",
    )


def _router_model() -> ChatGoogleGenerativeAI:
    settings = get_settings()
    return ChatGoogleGenerativeAI(
        model=settings.gemini_router_model,
        google_api_key=settings.gemini_api_key,
        temperature=0.0,
        max_output_tokens=64,
        # Classification needs no deliberation; thinking here is pure latency. Gemini 3
        # replaced 2.x's thinking_budget with a discrete level -- "minimal" is the one
        # that actually bills zero reasoning tokens.
        reasoning_effort="minimal",
    )


def build_graph(pool: AsyncConnectionPool):
    plain_llm = _chat_model()
    llm = plain_llm.bind_tools(TOOLS)
    guard_llm = _router_model().with_structured_output(GuardVerdict)

    async def guard(state: BarsState) -> dict:
        last = next(
            (m for m in reversed(state["messages"]) if isinstance(m, HumanMessage)),
            None,
        )
        if last is None:
            return {"kind": "events"}
        try:
            verdict: GuardVerdict = await guard_llm.ainvoke(
                [SystemMessage(content=GUARD_PROMPT), HumanMessage(content=last.text)]
            )
            kind = verdict.kind
        except Exception:
            # Failing open matters more than failing safe here: the worst case is one
            # off-topic answer, the alternative is refusing a perfectly good question.
            logger.exception("Guard classification failed; treating as in scope")
            kind = "events"

        if kind == "off_topic":
            return {"kind": kind, "messages": [AIMessage(content=OFF_TOPIC_REPLY)]}
        return {"kind": kind}

    async def chat(state: BarsState) -> dict:
        """Answer a hello or a thank-you and stop there.

        Routing smalltalk through the tool-armed agent is how "Как дела?" once came back
        as a verbatim copy of an earlier answer about a finance olympiad, after nine tool
        calls. One cheap call against one turn of context cannot do that.
        """
        question = next(
            (m for m in reversed(state["messages"]) if isinstance(m, HumanMessage)), None
        )
        parts: list = [SystemMessage(content=SMALLTALK_PROMPT)]
        if question is not None:
            parts.append(question)
        response = await plain_llm.ainvoke(parts)
        return {"messages": [response]}

    async def _system_message() -> SystemMessage:
        """The persona, with the current catalogue census folded in.

        The census comes from the in-process snapshot, so it costs no network call --
        and a failure to build it must not cost the user their answer, hence the guard.
        """
        census = ""
        try:
            census = availability_line(await catalog().snapshot())
        except Exception:
            logger.warning("Could not build the catalogue census", exc_info=True)
        return SystemMessage(content=system_prompt(bishkek_today().isoformat(), census))

    async def agent(state: BarsState) -> dict:
        prompt = await _system_message()
        response = await llm.ainvoke([prompt, *_recent_history(state["messages"])])
        return {"messages": [filter_tool_calls(state["messages"], response)]}

    async def finalize(state: BarsState) -> dict:
        """Answer from what the tools already returned.

        Reached when the tool budget runs out or filtering left nothing to run. The
        alternative -- ending the graph with no text -- is what produced the literal
        "Не смог собрать ответ" on "я хочу быть волонтёром", the single query this bot
        most exists to answer.

        The turn's tool output is flattened into one system message rather than replayed
        as message history, so no tool_call can end up without its result.
        """
        messages = state["messages"]
        question = next((m for m in reversed(messages) if isinstance(m, HumanMessage)), None)

        instruction = FINALIZE_INSTRUCTION
        collected = _collected_tool_output(messages)
        if collected:
            instruction += "\n\nДанные из каталога, собранные для этого вопроса:\n\n" + collected

        parts = [await _system_message(), *_prior_turns(messages)]
        if question is not None:
            parts.append(question)
        parts.append(SystemMessage(content=instruction))

        response = await plain_llm.ainvoke(parts)
        return {"messages": [response]}

    def after_guard(state: BarsState) -> str:
        kind = state.get("kind", "events")
        if kind == "off_topic":
            return END
        return "chat" if kind == "smalltalk" else "agent"

    def after_agent(state: BarsState) -> str:
        last = state["messages"][-1]
        if getattr(last, "tool_calls", None):
            # Count tool rounds in THIS turn only -- since the last human message.
            # Counting the whole checkpointed history would freeze a long conversation:
            # once its lifetime tool-calls pass the budget, every later turn ends here
            # before the agent can answer, and the user gets a stale reply resent.
            if tool_rounds_this_turn(state["messages"]) >= MAX_TOOL_ROUNDS:
                logger.warning("Tool-call budget exhausted; composing an answer from what we have")
                return "finalize"
            return "tools"
        if not last.text.strip():
            # Either the model returned nothing, or filtering removed every call it
            # wanted to make. Compose an answer rather than hand back silence.
            return "finalize"
        return END

    builder = StateGraph(BarsState)
    builder.add_node("guard", guard)
    builder.add_node("chat", chat)
    builder.add_node("agent", agent)
    builder.add_node("tools", ToolNode(TOOLS))
    builder.add_node("finalize", finalize)
    builder.set_entry_point("guard")
    builder.add_conditional_edges("guard", after_guard, {"agent": "agent", "chat": "chat", END: END})
    builder.add_conditional_edges(
        "agent", after_agent, {"tools": "tools", "finalize": "finalize", END: END}
    )
    builder.add_edge("chat", END)
    builder.add_edge("tools", "agent")
    builder.add_edge("finalize", END)

    saver = AsyncPostgresSaver(pool)
    return builder.compile(checkpointer=saver), saver
