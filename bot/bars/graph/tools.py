"""What Барс can actually do.

Every tool is read-only against the catalogue or writes only bot-owned state. Nothing
here can create or edit an event: the bot is a guide, not an editor.

Per-chat context (chat_id, whether the account is linked, the user's age) arrives
through the RunnableConfig rather than the model, so the model cannot act on behalf of
a different chat by making up an id.
"""

from __future__ import annotations

import logging
from typing import Annotated, Any

from langchain_core.runnables import RunnableConfig
from langchain_core.tools import tool
from pydantic import BaseModel, Field

from ..api_client import ApiError, api
from ..catalog import catalog, parse_date
from ..plans import create_plan, get_plan
from ..retrieval import describe, search
from ..vocab import CATEGORIES, THEMES

logger = logging.getLogger(__name__)


def _ctx(config: RunnableConfig) -> dict[str, Any]:
    return (config or {}).get("configurable", {})


class PlanStep(BaseModel):
    """One step of a prep plan. Typed rather than a free-form dict so Gemini gets a
    real schema and cannot invent extra fields."""

    title: str = Field(description="Что нужно сделать, коротко")
    detail: str | None = Field(default=None, description="Пояснение: как именно сделать шаг")
    due_date: str | None = Field(default=None, description="Срок шага, ISO YYYY-MM-DD")


@tool
async def search_events(
    query: str,
    config: RunnableConfig,
    category: str | None = None,
    themes: list[str] | None = None,
    age: int | None = None,
    price: str | None = None,
    level: str | None = None,
    date_from: str | None = None,
    date_to: str | None = None,
) -> str:
    """Найти мероприятия в каталоге Teenage Space.

    Args:
        query: свободное описание того, что ищет пользователь, его словами.
        category: одна из категорий каталога (volunteering, social, eduevent, contest,
            hackathon, olympiad, other). Не указывай, если пользователь не сузил тему.
        themes: темы каталога (sport, it, eco, media, mun, other).
        age: возраст участника в годах.
        price: 'free' или 'paid'.
        level: 'local' или 'intl'.
        date_from: не раньше этой даты, ISO YYYY-MM-DD.
        date_to: не позже этой даты, ISO YYYY-MM-DD.
    """
    if category and category not in CATEGORIES:
        category = None
    if themes:
        themes = [t for t in themes if t in THEMES] or None
    if price not in (None, "free", "paid"):
        price = None
    if level not in (None, "local", "intl"):
        level = None
    if age is None:
        age = _ctx(config).get("age")

    events = await search(
        query,
        category=category,
        themes=themes,
        age=age,
        price=price,
        level=level,
        date_from=parse_date(date_from),
        date_to=parse_date(date_to),
        limit=5,
    )
    if not events:
        return (
            "Ничего не найдено по этим условиям. Стоит расширить поиск: убрать фильтр по "
            "дате, теме или цене."
        )
    return "\n\n---\n\n".join(describe(event) for event in events)


@tool
async def get_event(event_id: str) -> str:
    """Показать полную карточку одного мероприятия по его id."""
    event = await catalog().get(event_id)
    if not event:
        return f"Мероприятие {event_id} не найдено — возможно, оно уже в архиве."
    return describe(event)


@tool
async def save_plan(
    title: str,
    steps: list[PlanStep],
    config: RunnableConfig,
    event_id: str | None = None,
) -> str:
    """Сохранить план подготовки и включить напоминания.

    Вызывай, только когда пользователь согласился на план. Один план на чат: новый
    заменяет старый.

    Args:
        title: короткое название плана, например «Подготовка к хакатону DevFest».
        steps: шаги по порядку, каждый с title, detail и (если есть срок) due_date.
            Привязывай сроки к дедлайну регистрации мероприятия.
        event_id: id мероприятия, к которому относится план, если он есть.
    """
    chat_id = _ctx(config).get("chat_id")
    if not chat_id:
        return "Не удалось сохранить план: не определён чат."

    event = await catalog().get(event_id) if event_id else None
    # ToolNode hands over whatever the model produced: pydantic objects when the
    # schema validated, plain dicts when it came back as raw JSON.
    normalised = [s if isinstance(s, dict) else s.model_dump() for s in steps]
    clean_steps = [
        {
            "title": str(step.get("title") or "").strip(),
            "detail": str(step.get("detail") or "").strip(),
            "due_date": step.get("due_date"),
        }
        for step in normalised
        if str(step.get("title") or "").strip()
    ]
    if not clean_steps:
        return "План пустой — нужен хотя бы один шаг."

    await create_plan(chat_id, title=title, items=clean_steps, event=event)
    return (
        f"План «{title}» сохранён, шагов: {len(clean_steps)}. Напоминания о дедлайнах "
        "включены. Пользователь может открыть его командой /plan."
    )


@tool
async def show_plan(config: RunnableConfig) -> str:
    """Показать текущий сохранённый план подготовки пользователя."""
    chat_id = _ctx(config).get("chat_id")
    plan = await get_plan(chat_id) if chat_id else None
    if not plan:
        return "У пользователя пока нет сохранённого плана."

    lines = [f"План: {plan['title']}"]
    for item in plan["items"]:
        mark = "выполнено" if item["done"] else "не выполнено"
        due = f", срок {item['due_date'].isoformat()}" if item.get("due_date") else ""
        lines.append(f"{item['step_no']}. {item['title']} ({mark}{due})")
    return "\n".join(lines)


@tool
async def toggle_favorite(event_id: str, config: RunnableConfig) -> str:
    """Добавить мероприятие в избранное пользователя на сайте (или убрать оттуда).

    Работает только для чатов с привязанным аккаунтом Teenage Space.
    """
    ctx = _ctx(config)
    if not ctx.get("linked"):
        return (
            "Аккаунт не привязан, избранное недоступно. Предложи пользователю команду "
            "/link, чтобы связать Telegram с профилем Teenage Space."
        )
    try:
        result = await api().toggle_favorite(ctx["chat_id"], event_id)
    except ApiError as error:
        logger.warning("toggle_favorite failed: %s", error)
        return "Не получилось изменить избранное, попробуйте позже."
    return "Добавлено в избранное." if result.get("favorited") else "Убрано из избранного."


@tool
async def link_hint(config: RunnableConfig) -> str:
    """Объяснить, как привязать аккаунт Teenage Space, и зачем это нужно."""
    if _ctx(config).get("linked"):
        return "Аккаунт уже привязан: доступны избранное и подбор по профилю."
    return (
        "Аккаунт не привязан. Привязка даёт избранное и подбор по возрасту из профиля. "
        "Скажи пользователю открыть Профиль на сайте Teenage Space, нажать «Привязать "
        "Telegram» и перейти по ссылке. Команда /link показывает ту же инструкцию."
    )


TOOLS: list[Annotated[Any, "langchain tool"]] = [
    search_events,
    get_event,
    save_plan,
    show_plan,
    toggle_favorite,
    link_hint,
]
