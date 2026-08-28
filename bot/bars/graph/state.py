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
    in_scope: bool
