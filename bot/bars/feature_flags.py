"""Temporary kill-switches for still-in-review features.

Flip a flag back to True to restore the feature — nothing else needs to change.
"""

from __future__ import annotations

# P1 "Спросить Барса" deep link (ask_context.py, `_start_ask`/`_require_linked_or_guest`
# in handlers.py). Disabled 2026-09-12 at the owner's request while P1 is parked on the
# `p1/catalog-ux` branch — an `ask_*` deep link now behaves like a plain unlinked /start
# (linking required, no guest bypass), matching pre-P1 behaviour.
P1_ASK_BARS_ENABLED = False
