"""Category and theme vocabularies, mirrored from frontend/src/data/constants.ts.

Kept in sync by hand: they are short, they change rarely, and the alternative
(another API round-trip on every prompt build) buys nothing. The model must pick
keys from these lists — it must never invent a category the catalogue has no
filter for.
"""

from __future__ import annotations

CATEGORIES: dict[str, str] = {
    "volunteering": "Волонтёрство",
    "social": "Социальные проекты",
    "eduevent": "Образовательные мероприятия",
    "contest": "Конкурсы",
    "hackathon": "Хакатоны",
    "olympiad": "Олимпиады",
    "other": "Другое",
}

THEMES: dict[str, str] = {
    "sport": "Спорт",
    "it": "IT и AI",
    "eco": "Экология",
    "media": "Медиа",
    "mun": "MUN",
    "other": "Другое",
}

MONTHS_GENITIVE = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
]


def category_label(key: str | None) -> str:
    return CATEGORIES.get(key or "", key or "")


def theme_labels(keys: list[str] | None) -> str:
    return ", ".join(THEMES.get(k, k) for k in (keys or []))
