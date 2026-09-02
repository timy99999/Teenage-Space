# Барс — Telegram-агент Teenage Space

RAG-агент в Telegram: находит мероприятия в каталоге Teenage Space, доводит до
регистрации, составляет план подготовки и напоминает о дедлайнах.

- **LLM** — Gemini (`gemini-3.6-flash` для диалога, `gemini-3.5-flash-lite` для
  классификатора темы).
- **Оркестрация** — LangGraph: `guard → agent ⇄ tools`, плюс две короткие ветки —
  `chat` для светских реплик (без инструментов) и `finalize`, который собирает ответ
  из уже полученных данных, когда бюджет вызовов исчерпан.
- **Поиск** — эмбеддинги Gemini в pgvector (таблица `bot_event_embeddings`) ранжируют,
  жёсткие фильтры (даты, цена, уровень, категория, тема) отсеивают. Возраст — особый
  случай: он не удаляет мероприятие, а помечает его, иначе бот отвечает «в каталоге
  ничего нет» там, где всё есть.
- **Память** — 3 суток скользящим окном с последнего сообщения, чекпоинты LangGraph
  в том же Postgres.
- **Telegram** — aiogram 3, webhook в проде, long polling локально.

## Как это соединено с остальным проектом

```
Telegram ──webhook──► bot/ ──HTTP──► backend/ (NestJS)   ← каталог, профиль, избранное
                        └────SQL───► Supabase Postgres    ← только таблицы bot_*
```

Про домен (мероприятия, профиль, избранное) бот спрашивает **только у NestJS API** —
через публичные `/api/events*` и приватные `/api/bot/*` с заголовком `X-Bot-Secret`.
Напрямую в Postgres он ходит только за своими таблицами: `bot_event_embeddings`,
`bot_sessions`, `bot_plans`, `bot_plan_items`, `bot_reminders`, `telegram_links` и
чекпоинты LangGraph. Так бизнес-логика не раздваивается.

## Запуск локально

```bash
cd bot
python -m venv .venv && .venv/Scripts/activate   # Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env                              # заполнить ключи
python -m bars.main --polling
```

Бэкенд при этом должен быть поднят (`cd backend && npm run start:dev`), а
`BOT_API_SECRET` в `bot/.env` — совпадать с `backend/.env`.

### Проверить поиск без Telegram

```bash
python -m bars.probe --reindex                      # построить индекс
python -m bars.probe "волонтёрство осенью" --age 16 # топ-5 с фильтром по возрасту
```

### Тесты

```bash
pip install -r requirements-dev.txt
pytest -q
```

Ни сети, ни базы: каталог подменяется фикстурой, ранжирование — ключевым словам.
Покрыты детерминированные куски, где регрессия молчалива: фильтры поиска и разделение
«подходит / не по возрасту», бюджет вызовов инструментов и обрезка истории, чанкинг
сообщений, валидация дат в плане. CI гоняет их вместе с `ruff check`.

## Деплой

Отдельный сервис на Railway, root directory `bot`, health check `/health`,
автодеплой из `main` — как у бэкенда. Webhook регистрируется на старте по
`WEBHOOK_BASE_URL` (или `RAILWAY_PUBLIC_DOMAIN`).

Миграция схемы (`supabase/migrations/*_bars_bot.sql`) применяется автоматически
workflow'ом `supabase-migrations.yml` при пуше в `main`.

## Переменные окружения

См. `.env.example`. Обязательные для старта: `TELEGRAM_BOT_TOKEN`, `GEMINI_API_KEY`,
`DATABASE_URL`, `BOT_API_SECRET`; для webhook-режима ещё `TELEGRAM_WEBHOOK_SECRET`.

## Структура

| Файл | Что делает |
|---|---|
| `bars/main.py` | старт: пул, граф, планировщик, webhook/polling |
| `bars/graph/agent.py` | сборка графа LangGraph и обе модели Gemini |
| `bars/graph/tools.py` | инструменты агента (поиск, карточка, план, избранное) |
| `bars/retrieval.py` | ранжирование pgvector + жёсткие фильтры |
| `bars/indexer.py` | переиндексация каталога по content-hash |
| `bars/sessions.py` | правило трёх суток |
| `bars/plans.py` | планы подготовки и очередь напоминаний |
| `bars/queue.py` | по очереди внутри чата, параллельно между чатами |
| `bars/persona.py` | характер Барса и границы темы |
| `bars/analytics.py` | журнал диалогов и учёт токенов для админки |
| `tests/` | pytest поверх детерминированной логики, без сети и базы |
