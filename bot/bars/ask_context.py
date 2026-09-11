"""Parses the `ask_<slug>` deep-link payload sent by the site's "Спросить Барса"
button (P1, spec (d)) into a short context sentence for the opening greeting.

`slug` shape (built by `frontend/src/lib/barsDeepLink.ts` — keep the two in sync):

    opps                          -- root catalog, no preset
    opps-<category>               -- one category, no preset
    opps-p-<preset>               -- root catalog, exactly one active preset
    opps-<category>-p-<preset>    -- one category + one active preset

Category/preset keys and labels mirror `frontend/src/data/constants.ts` (`CATS`)
and `frontend/src/data/presets.ts` (`PRESETS`) — update both sides together.
"""

from __future__ import annotations

import re

# Backtracking handles the ambiguity between "-<category>" and "-p-<preset>" for us:
# for "opps-p-online" the category group first tries to greedily claim "p", then the
# trailing "-p-(preset)" group fails to match what's left and forces a re-try with the
# category group empty — landing on category=None, preset="online", as intended.
_SLUG_RE = re.compile(r"^opps(?:-(?P<category>[a-z]+))?(?:-p-(?P<preset>[a-z]+))?$")

CATEGORY_LABELS: dict[str, str] = {
    "volunteering": "Волонтёрство",
    "social": "Социальные проекты",
    "eduevent": "Образовательные мероприятия",
    "contest": "Конкурсы",
    "hackathon": "Хакатоны",
    "olympiad": "Олимпиады",
    "internship": "Стажировки",
    "other": "Другое",
}

PRESET_LABELS: dict[str, str] = {
    "free": "Бесплатно",
    "online": "Онлайн",
    "intl": "Международные",
    "myclass": "Для моего класса",
}

_ASK_TAIL = " Могу подсказать: как выбрать, что успеть до дедлайна, как подать заявку. Что интересует?"


def _describe(slug: str) -> str:
    """`opps[-<category>][-p-<preset>]` -> "Возможности[ → <label>][ (фильтр «<label>»)]".
    Anything that doesn't match the shape at all, or names an unknown category/preset,
    degrades to plain "Возможности" — a stale/hand-crafted link should still start a
    normal conversation, not error out."""
    match = _SLUG_RE.match(slug)
    where = "Возможности"
    if not match:
        return where

    category_label = CATEGORY_LABELS.get(match.group("category") or "")
    if category_label:
        where += f" → {category_label}"

    preset_label = PRESET_LABELS.get(match.group("preset") or "")
    tail = f" (фильтр «{preset_label}»)" if preset_label else ""
    return where + tail


def ask_greeting(slug: str) -> str:
    """Opening line for a chat that arrived via `/start ask_<slug>`."""
    return f"Ты сейчас в разделе {_describe(slug)} на сайте.{_ASK_TAIL}"
