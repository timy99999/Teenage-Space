"""Graph state.

`messages` is the checkpointed conversation — the part that expires after three days.
Everything else is per-request context, re-derived on every turn from the config, so a
restored checkpoint never carries a stale profile or a stale age around.
"""

from __future__ import annotations

from typing import Annotated, TypedDict

from langchain_core.messages import AnyMessage
from langgraph.graph.message import add_messages


class BarsState(TypedDict, total=False):
    messages: Annotated[list[AnyMessage], add_messages]
    # What the guard made of the latest message: "events" (do the real work),
    # "smalltalk" (a hello or a thank-you -- answer briefly, no tools, no catalogue
    # context) or "off_topic" (decline). Re-derived every turn, never restored stale.
    kind: str
