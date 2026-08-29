"""The graph itself: guard -> agent -> tools -> agent -> end.

Hand-rolled rather than assembled from a prebuilt helper: the loop is fifteen lines,
and writing it out keeps the topic guard as a first-class node instead of a prompt
instruction the model is free to ignore.
"""

from __future__ import annotations

import logging

from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.checkpoint.postgres.aio import AsyncPostgresSaver
from langgraph.graph import END, StateGraph
from langgraph.prebuilt import ToolNode
from psycopg_pool import AsyncConnectionPool
from pydantic import BaseModel, Field

from ..catalog import bishkek_today
from ..config import get_settings
from ..persona import GUARD_PROMPT, OFF_TOPIC_REPLY, system_prompt
from .state import BarsState
from .tools import TOOLS

logger = logging.getLogger(__name__)

# A ReAct loop that keeps calling tools forever is a bill, not a feature.
MAX_TOOL_ROUNDS = 6


class GuardVerdict(BaseModel):
    in_scope: bool = Field(description="true, если запрос про мероприятия и подготовку к ним")


def _chat_model() -> ChatGoogleGenerativeAI:
    settings = get_settings()
    settings.require("gemini_api_key")
    return ChatGoogleGenerativeAI(
        model=settings.gemini_model,
        google_api_key=settings.gemini_api_key,
        temperature=0.4,
        max_output_tokens=1200,
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
    llm = _chat_model().bind_tools(TOOLS)
    guard_llm = _router_model().with_structured_output(GuardVerdict)

    async def guard(state: BarsState) -> dict:
        last = next(
            (m for m in reversed(state["messages"]) if isinstance(m, HumanMessage)),
            None,
        )
        if last is None:
            return {"in_scope": True}
        try:
            verdict: GuardVerdict = await guard_llm.ainvoke(
                [SystemMessage(content=GUARD_PROMPT), HumanMessage(content=last.text)]
            )
            in_scope = bool(verdict.in_scope)
        except Exception:
            # Failing open matters more than failing safe here: the worst case is one
            # off-topic answer, the alternative is refusing a perfectly good question.
            logger.exception("Guard classification failed; treating as in scope")
            in_scope = True

        if in_scope:
            return {"in_scope": True}
        return {"in_scope": False, "messages": [AIMessage(content=OFF_TOPIC_REPLY)]}

    async def agent(state: BarsState) -> dict:
        prompt = SystemMessage(content=system_prompt(bishkek_today().isoformat()))
        response = await llm.ainvoke([prompt, *state["messages"]])
        return {"messages": [response]}

    def after_guard(state: BarsState) -> str:
        return "agent" if state.get("in_scope", True) else END

    def after_agent(state: BarsState) -> str:
        last = state["messages"][-1]
        if not getattr(last, "tool_calls", None):
            return END
        rounds = sum(1 for m in state["messages"] if getattr(m, "tool_calls", None))
        if rounds > MAX_TOOL_ROUNDS:
            logger.warning("Tool-call budget exhausted; answering with what we have")
            return END
        return "tools"

    builder = StateGraph(BarsState)
    builder.add_node("guard", guard)
    builder.add_node("agent", agent)
    builder.add_node("tools", ToolNode(TOOLS))
    builder.set_entry_point("guard")
    builder.add_conditional_edges("guard", after_guard, {"agent": "agent", END: END})
    builder.add_conditional_edges("agent", after_agent, {"tools": "tools", END: END})
    builder.add_edge("tools", "agent")

    saver = AsyncPostgresSaver(pool)
    return builder.compile(checkpointer=saver), saver
