"""What Барс can actually do.

Every tool is read-only against the catalogue or writes only bot-owned state. Nothing
here can create or edit an event: the bot is a guide, not an editor.

Per-chat context (chat_id, whether the account is linked, the user's age) arrives
through the RunnableConfig rather than the model, so the model cannot act on behalf of
a different chat by making up an id.
"""

from __future__ import annotations

import logging
from datetime import date
from typing import Annotated, Any

from langchain_core.runnables import RunnableConfig
from langchain_core.tools import tool
from pydantic import BaseModel, Field

from ..api_client import ApiError, api
from ..catalog import age_fits, bishkek_today, catalog, is_open, parse_date
from ..plans import create_plan, get_plan
from ..retrieval import age_mismatch_note, describe, find_by_title, search
from ..vocab import CATEGORIES, THEMES

logger = logging.getLogger(__name__)

# What to say when the catalogue genuinely has nothing, keyed by why. Being specific is
# the point: "ничего не найдено" is what let the bot claim an empty catalogue while
# holding two olympiads the user was simply too young for.
NO_RESULTS = {
    "empty_catalog": (
        "В каталоге сейчас нет ни одного открытого мероприятия — всё либо прошло, "
        "либо в архиве. Скажи об этом честно и предложи вернуться позже."
    ),
    "filters": (
        "Ничего не найдено по этим условиям. Стоит расширить поиск: убрать фильтр по "
        "дате, теме или цене."
    ),
}


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

    result = await search(
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
    matched = list(result.matched)
    near_miss = list(result.near_miss)

    # Someone who typed an event's name gets that card even when a filter or the ranker
    # buried it. This is the "Fiolimp" -> "FinOlimp 2026" rescue.
    known = {event["id"] for event in [*matched, *near_miss]}
    for event in await find_by_title(query):
        if event["id"] in known or not is_open(event):
            continue
        known.add(event["id"])
        (matched if age_fits(event, age) else near_miss).insert(0, event)

    blocks: list[str] = []
    if matched:
        blocks.append("ПОДХОДЯЩИЕ:\n\n" + "\n\n---\n\n".join(describe(event) for event in matched))
    if near_miss:
        blocks.append(
            "НЕ ПО ВОЗРАСТУ — покажи их пользователю с пометкой, не скрывай и не говори,"
            " что ничего нет:\n\n"
            + "\n\n---\n\n".join(describe(e, age_mismatch_note(e, age)) for e in near_miss)
        )
    if not blocks:
        return NO_RESULTS.get(result.reason, NO_RESULTS["filters"])
    return "\n\n===\n\n".join(blocks)


@tool
async def get_event(event_id: str) -> str:
    """Показать полную карточку одного мероприятия по его id."""
    event = await catalog().get(event_id)
    if not event:
        return f"Мероприятие {event_id} не найдено — возможно, оно уже в архиве."
    return describe(event)


def _plan_horizon(event: dict[str, Any]) -> date | None:
    """The last day a step can sensibly fall on: registration closes, or failing that,
    the event happens."""
    return parse_date(event.get("deadlineDate")) or parse_date(event.get("eventDate"))


def _clean_due_date(raw: str | None, today: date, horizon: date | None) -> str | None:
    """Keep a step's deadline inside the window the event actually allows.

    A plan written on 29 August once opened with "определиться до 31 августа" for an
    event whose registration ran to 12 September -- the model had confused two similarly
    named olympiads. A date in the past is dropped (the step stays, undated); a date past
    the event's own deadline is pulled back to it.
    """
    due = parse_date(raw)
    if due is None or due < today:
        return None
    if horizon and due > horizon:
        return horizon.isoformat()
    return due.isoformat()


@tool
async def save_plan(
    title: str,
    steps: list[PlanStep],
    event_id: str,
    config: RunnableConfig,
) -> str:
    """Сохранить план подготовки к мероприятию и включить напоминания.

    Вызывай ТОЛЬКО после того, как пользователь прямо согласился на план («да»,
    «давай», «составь»). Не вызывай в том же ходе, где ищешь мероприятия. Один план на
    чат: новый заменяет старый.

    Args:
        title: короткое название плана, например «Подготовка к хакатону DevFest».
        steps: шаги по порядку, каждый с title, detail и (если есть срок) due_date.
            Сроки не раньше сегодня и не позже дедлайна регистрации мероприятия.
        event_id: id мероприятия из каталога, к которому относится план. Обязателен.
    """
    chat_id = _ctx(config).get("chat_id")
    if not chat_id:
        return "Не удалось сохранить план: не определён чат."

    # A plan is always about one event. Requiring it is also the structural guard against
    # the failure seen in the transcripts, where save_plan fired mid-search-spray across
    # five unrelated queries the user had never agreed to a plan for.
    event = await catalog().get(event_id)
    if not event:
        return (
            f"Мероприятие {event_id} не найдено — план не сохранён. Сначала найди "
            "мероприятие через search_events и уточни у пользователя, к чему готовимся."
        )

    today = bishkek_today()
    horizon = _plan_horizon(event)

    # ToolNode hands over whatever the model produced: pydantic objects when the
    # schema validated, plain dicts when it came back as raw JSON.
    normalised = [s if isinstance(s, dict) else s.model_dump() for s in steps]
    clean_steps = [
        {
            "title": str(step.get("title") or "").strip(),
            "detail": str(step.get("detail") or "").strip(),
            "due_date": _clean_due_date(step.get("due_date"), today, horizon),
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
