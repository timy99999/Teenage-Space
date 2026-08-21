# Teenage Space

Каталог мероприятий и возможностей для подростков Бишкека. Изначально спроектирован как
интерактивный прототип в Claude Design (`Teenage Space.dc.html`); этот репозиторий — его
рабочая реализация в виде полноценного веб-приложения.

## Архитектура

- **Frontend** — React 18 + TypeScript + Vite, React Router для навигации, `@supabase/supabase-js`
  для аутентификации напрямую с клиента.
- **Backend** — Node.js + NestJS, REST API под префиксом `/api`, проверяет Supabase JWT на
  защищённых маршрутах и обращается к Supabase (Postgres) через service-role ключ.
- **База данных / Auth** — Supabase (Postgres + Auth). Схема — в `supabase/migrations/`
  (применяется через Supabase CLI, автоматически на каждый пуш в `main` — см. ниже),
  сид-данные — в `supabase/seed.sql`.

```
frontend/   React SPA (Vite)
backend/    NestJS REST API
supabase/   Миграции схемы и сид-данные для Supabase
```

Функциональность спроектирована так, чтобы легко расширяться: каждая сущность (события,
новости, материалы, избранное, оценки, заявки на публикацию, профиль) — отдельный модуль
в бэкенде с собственным сервисом/контроллером, и отдельная таблица в Supabase.

## Настройка Supabase

1. Создайте проект на [supabase.com](https://supabase.com).
2. Примените схему одним из способов:
   - **Через CLI (рекомендуется, разово или локально):**
     ```bash
     npx supabase login                          # открывает браузер для авторизации
     npx supabase link --project-ref <ваш-project-ref>   # Project Settings → General
     npx supabase db push                         # применяет все supabase/migrations/*.sql
     ```
   - **Вручную:** выполните содержимое `supabase/migrations/*.sql` по порядку файлов в
     **SQL Editor**. Каждый файл написан так, что его безопасно перезапускать (использует
     `if not exists`), поэтому так же можно чинить базу, если она отстала от кода.
   Отдельно выполните `supabase/seed.sql`, чтобы перенести демо-данные (события/новости/материалы).
3. В **Authentication → Providers** включите Email (OTP код на почту используется на шаге
   подтверждения регистрации) и, если нужен вход через Google — включите Google-провайдер.
4. Из **Project Settings → API** возьмите:
   - `Project URL` → `SUPABASE_URL` (backend) и `VITE_SUPABASE_URL` (frontend)
   - `anon public` ключ → `VITE_SUPABASE_ANON_KEY` (frontend)
   - `service_role` ключ → `SUPABASE_SERVICE_ROLE_KEY` (backend, **никогда** не отправлять на клиент)

## Миграции применяются автоматически на каждый пуш

`.github/workflows/supabase-migrations.yml` запускает `supabase db push` на каждый пуш в
`main`, который трогает `supabase/migrations/**` — так живая база данных никогда не отстаёт
от кода (раньше это уже приводило к 500-й ошибке при публикации: код ссылался на колонки,
которых ещё не было в базе). Чтобы это заработало, один раз настройте в GitHub:

1. **Settings → Secrets and variables → Actions** репозитория, добавьте:
   - `SUPABASE_ACCESS_TOKEN` — личный токен: [supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens)
   - `SUPABASE_PROJECT_ID` — project ref из **Project Settings → General**
   - `SUPABASE_DB_PASSWORD` — пароль базы данных, заданный при создании проекта
     (если забыт — сбросить в **Project Settings → Database**)
2. Любая новая миграция (`supabase migration new <название>` создаёт файл с нужным
   именем/таймстампом в `supabase/migrations/`) применится сама при пуше в `main`.

## Backend

```bash
cd backend
cp .env.example .env   # заполните SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY
npm install
npm run start:dev      # http://localhost:3000/api
```

## Frontend

```bash
cd frontend
cp .env.example .env   # заполните VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY
npm install
npm run dev             # http://localhost:5173, /api проксируется на backend :3000
```

## Как устроена аутентификация

Регистрация — трёхшаговая, как в прототипе:

1. Имя, дата рождения, email → `supabase.auth.signInWithOtp` отправляет код на почту.
2. Код подтверждения → `supabase.auth.verifyOtp` создаёт сессию.
3. Username и пароль → `supabase.auth.updateUser` выставляет пароль, backend сохраняет
   username/имя/дату рождения в таблице `profiles`.

Вход по username: backend хранит email в `profiles.email`, эндпоинт
`GET /api/auth/lookup-email?username=...` возвращает email по username, дальше фронтенд
логинится через `supabase.auth.signInWithPassword`.

Все защищённые эндпоинты (`/favorites`, `/ratings`, `/profile`, `/submissions`) ожидают
`Authorization: Bearer <supabase access token>` — фронтенд подставляет его автоматически
(`frontend/src/lib/api.ts`).

## Дальнейшее развитие

Заложено, но не реализовано в этой версии (можно добавлять модуль за модулем, не трогая
остальное):

- Загрузка фото мероприятий (сейчас `image_url` — просто поле в БД, без файлового аплоада).
- Админ-панель для модерации заявок на публикацию (`submissions.status`).
- Полноценные страницы новостей вместо заглушки "появится в следующей версии".
- Push/email-уведомления (переключатель `notif_opt_in` в профиле уже есть).
