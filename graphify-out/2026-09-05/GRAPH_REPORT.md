# Graph Report - Teenage Space  (2026-09-04)

## Corpus Check
- 258 files · ~85,098 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1890 nodes · 3725 edges · 117 communities (77 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 102 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `daf3cc37`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- types.ts
- bars-admin.service.ts
- main.py
- dependencies
- Platform Description (Privacy Policy Section 1)
- SupabaseService
- frontend/package.json
- PostForm.tsx
- events.service.ts
- mappers.ts
- traffic.service.ts
- AdminPage.tsx
- ratings.controller.ts
- compilerOptions
- compilerOptions
- supabase-auth.guard.ts
- save_plan
- App.tsx
- execute
- app.module.ts
- agent.py
- refreshProfile
- users-admin.controller.ts
- PrivacyPage.tsx
- conftest.py
- handlers.py
- constants.ts
- get_settings
- UpdateSubmissionDto
- super-admin.guard.ts
- TelegramLinkService
- nest-cli.json
- search
- tsconfig.build.json
- HTML Entry Point (index.html)
- vite-env.d.ts
- vercel.json
- Graphify Query Workflow
- traffic-admin.service.ts
- useAuth
- tools.py
- CreateEventDto
- formatting.py
- test_agent.py
- plans.py
- EventModal.tsx
- CurrentUser
- GridPage.tsx
- HomePage.tsx
- Supabase
- AdminService
- deploy
- UsersPage.tsx
- AuthPage
- Body
- TestCannedReply
- Changelog
- Changelog
- Writing Guidelines for Postgres References
- ErrorBoundary
- ChatQueues
- ApiClient
- admin.service.ts
- Section Definitions
- HealthController
- UpdateEventDto
- bot.controller.ts
- deploy
- Барс — Telegram-агент Teenage Space
- Supabase Postgres Best Practices
- Runtime
- _clean_due_date
- bars
- find_by_title
- education.service.ts
- advanced-full-text-search.md
- advanced-jsonb-indexing.md
- conn-idle-timeout.md
- conn-limits.md
- conn-pooling.md
- conn-prepared-statements.md
- data-batch-inserts.md
- data-n-plus-one.md
- data-pagination.md
- data-upsert.md
- lock-advisory.md
- lock-deadlock-prevention.md
- lock-short-transactions.md
- lock-skip-locked.md
- monitor-explain-analyze.md
- monitor-pg-stat-statements.md
- monitor-vacuum-analyze.md
- query-composite-indexes.md
- query-covering-indexes.md
- query-index-types.md
- query-missing-indexes.md
- query-partial-indexes.md
- schema-constraints.md
- schema-data-types.md
- schema-foreign-key-indexes.md
- schema-lowercase-identifiers.md
- schema-partitioning.md
- schema-primary-keys.md
- security-privileges.md
- security-rls-basics.md
- security-rls-performance.md
- _template.md
- BotService
- reminders.py
- UserAccountPage
- AuthController
- .snapshot
- Settings
- TestSearchEventsTool
- CreateMaterialDto
- test_smalltalk.py

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 73 edges
2. `SupabaseService` - 44 edges
3. `useUI()` - 37 edges
4. `get_settings()` - 30 edges
5. `AdminService` - 29 edges
6. `api` - 29 edges
7. `AdminController` - 25 edges
8. `CurrentUser` - 22 edges
9. `compilerOptions` - 20 edges
10. `TelegramLinkService` - 19 edges

## Surprising Connections (you probably didn't know these)
- `Platform Description (Privacy Policy Section 1)` --semantically_similar_to--> `Teenage Space Platform Overview`  [INFERRED] [semantically similar]
  Политика конфедициальности.pdf → README.md
- `Third-Party Authentication (Google)` --conceptually_related_to--> `Supabase Database / Auth`  [INFERRED]
  Политика конфедициальности.pdf → README.md
- `Minors Protection Provisions` --conceptually_related_to--> `Teenage Space Platform Overview`  [INFERRED]
  Политика конфедициальности.pdf → README.md
- `Third-Party Service Providers` --references--> `Supabase Database / Auth`  [EXTRACTED]
  Политика конфедициальности.pdf → README.md
- `Auto-Push Working Agreement` --conceptually_related_to--> `Build Check Workflow`  [INFERRED]
  CLAUDE.md → .github/workflows/ci.yml

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Personal Data Category Taxonomy** — politika_konfedicialnosti_accountdata, politika_konfedicialnosti_profiledata, politika_konfedicialnosti_activitydata, politika_konfedicialnosti_technicaldata [INFERRED 0.75]
- **TS Brand Logo Asset Usage** — frontend_public_favicon_tslogomark, frontend_src_assets_logo_ts_tslogomark, frontend_index_htmlentrypoint, frontend_index_seometatags [INFERRED 0.80]
- **Push-to-Main Auto-Deploy Pipeline** — claude_autopushagreement, github_workflows_ci_buildcheckworkflow, github_workflows_supabase_migrations_migratejob, readme_migrationsautomation [INFERRED 0.85]

## Communities (117 total, 40 thin omitted)

### Community 0 - "types.ts"
Cohesion: 0.07
Nodes (43): AuthPage, EditAccountPage, ProfilePage, BanModal(), BanModalProps, OPTIONS, ConfirmDialog(), ConfirmDialogProps (+35 more)

### Community 1 - "bars-admin.service.ts"
Cohesion: 0.05
Nodes (35): BarsAdminController, Body, Controller, Get, Param, Query, UseGuards, BarsAdminService (+27 more)

### Community 2 - "main.py"
Cohesion: 0.21
Nodes (17): AsyncIOScheduler, close_api(), build_scheduler(), configure_logging(), health(), main(), Bot, Entry point. Two modes: python -m bars.main webhook (production, Railway)… (+9 more)

### Community 3 - "dependencies"
Cohesion: 0.04
Nodes (46): dependencies, cache-manager, class-transformer, class-validator, helmet, @nestjs/cache-manager, @nestjs/common, @nestjs/config (+38 more)

### Community 4 - "Platform Description (Privacy Policy Section 1)"
Cohesion: 0.08
Nodes (33): Auto-Push Working Agreement, Backend Build Job, Build Check Workflow, Frontend Build Job, Check Required Secrets Step, Link Project Step, Migrate Job, Push Migrations Step (+25 more)

### Community 5 - "SupabaseService"
Cohesion: 0.12
Nodes (12): BanStatusGuard, Injectable, TelegramLinkRow, SupabaseModule, Module, SupabaseService, Injectable, TrafficCleanupService (+4 more)

### Community 6 - "frontend/package.json"
Cohesion: 0.07
Nodes (28): dependencies, react, react-dom, react-router-dom, @supabase/supabase-js, devDependencies, @types/react, @types/react-dom (+20 more)

### Community 7 - "PostForm.tsx"
Cohesion: 0.08
Nodes (31): PublishPage, EditEventModal(), save(), EditEventModalProps, CardMenu(), EventCard(), EventCardAdminActions, EventCardProps (+23 more)

### Community 8 - "events.service.ts"
Cohesion: 0.09
Nodes (22): EventRow, mapEvent(), EventsController, CacheTTL, Controller, Get, Header, Param (+14 more)

### Community 9 - "mappers.ts"
Cohesion: 0.06
Nodes (37): mapNews(), mapSubmission(), mapSubmissionAdmin(), NewsRow, SubmissionAdminRow, SubmissionRow, SubmitterInfo, KgPhone (+29 more)

### Community 10 - "traffic.service.ts"
Cohesion: 0.06
Nodes (40): DEVICE_TYPES, HeartbeatDto, IsBoolean, IsIn, IsUUID, DEVICE_TYPES, TARGET_TYPES, TrackCardViewDto (+32 more)

### Community 11 - "AdminPage.tsx"
Cohesion: 0.07
Nodes (23): AdminPage, Chip(), ChipProps, TrashIcon(), useAdminAnalytics(), useAdminArchivedEvents(), useAdminSubmissions(), AnalyticsTab() (+15 more)

### Community 12 - "ratings.controller.ts"
Cohesion: 0.11
Nodes (13): RateEventDto, IsInt, Max, Min, RatingsController, Body, Controller, Get (+5 more)

### Community 13 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+12 more)

### Community 14 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, isolatedModules, jsx, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch (+12 more)

### Community 15 - "supabase-auth.guard.ts"
Cohesion: 0.16
Nodes (10): AdminGuard, Injectable, AuthedRequest, CachedProfile, jwtExpiryMs(), RequestProfile, SupabaseAuthGuard, Inject (+2 more)

### Community 16 - "save_plan"
Cohesion: 0.22
Nodes (14): _ctx(), link_hint(), PlanStep, BaseModel, Сохранить план подготовки к мероприятию и включить напоминания. Вызывай ТОЛЬКО…, Показать текущий сохранённый план подготовки пользователя., Добавить мероприятие в избранное пользователя на сайте (или убрать оттуда).…, Объяснить, как привязать аккаунт Teenage Space, и зачем это нужно. (+6 more)

### Community 17 - "App.tsx"
Cohesion: 0.11
Nodes (12): App(), HomeGate(), SettingsPage, UserAccountPage, BannedGate(), periodText(), BottomNav(), NAV_ITEMS (+4 more)

### Community 18 - "execute"
Cohesion: 0.15
Nodes (23): _clip(), log_turn(), Quality-control journal and token accounting for Барс. Two bot-owned tables…, Fold this turn's Gemini token counts into the daily rollup. `usage_by_model` is…, Book a catalogue re-embed against the system chat, for the balance estimate., Drop journalled turns past the retention window. Called from sessions.sweep()., Append one exchange — the user's line and the assistant's — to the journal.…, record_embedding_usage() (+15 more)

### Community 19 - "app.module.ts"
Cohesion: 0.11
Nodes (22): AdminModule, Module, AppModule, Module, AuthModule, Module, BarsModule, Module (+14 more)

### Community 20 - "agent.py"
Cohesion: 0.07
Nodes (21): build_graph(), _chat_model(), GuardVerdict, AsyncConnectionPool, BaseModel, The graph itself: guard -> agent -> tools -> agent -> end, with a finalize…, _router_model(), BarsState (+13 more)

### Community 21 - "refreshProfile"
Cohesion: 0.11
Nodes (22): onLogout(), PolicyGate(), onAccept(), AuthProvider(), checkBanStatus(), hasPerm(), refreshProfile(), signOut() (+14 more)

### Community 22 - "users-admin.controller.ts"
Cohesion: 0.07
Nodes (31): BAN_DURATIONS, BanDuration, BanUserDto, IsIn, IsOptional, IsString, MaxLength, ADMIN_PERM_KEYS (+23 more)

### Community 23 - "PrivacyPage.tsx"
Cohesion: 0.33
Nodes (4): PrivacyPage, Block, Section, SECTIONS

### Community 24 - "conftest.py"
Cohesion: 0.15
Nodes (16): clear_cache(), clear_search_cache(), _event(), events(), fake_catalog(), FakeCatalog, no_vector_search(), Any (+8 more)

### Community 25 - "handlers.py"
Cohesion: 0.09
Nodes (45): api(), ApiError, Thin async client for the Teenage Space NestJS API. Public catalogue reads go…, event_keyboard(), plan_keyboard(), Any, Telegram rejects an entire message over one malformed button URL, which would…, render_plan() (+37 more)

### Community 26 - "constants.ts"
Cohesion: 0.10
Nodes (30): ArticlePage, EducationIndex(), EducationPage, Sidebar(), AGES, MONTHS, NAV_CATS, TITLES (+22 more)

### Community 27 - "get_settings"
Cohesion: 0.15
Nodes (23): get_settings(), All configuration in one place, loaded from the environment (or bot/.env…, clean_dsn(), close_pool(), init_pool(), AsyncConnectionPool, Postgres access for the bot's own tables. Scope rule (see the plan): the bot…, pgvector accepts its text form, so no extra type-registration dependency is… (+15 more)

### Community 28 - "UpdateSubmissionDto"
Cohesion: 0.20
Nodes (9): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min (+1 more)

### Community 29 - "super-admin.guard.ts"
Cohesion: 0.13
Nodes (10): SuperAdminGuard, Injectable, CapacityController, Controller, Get, UseGuards, CapacityService, StorageStatRow (+2 more)

### Community 30 - "TelegramLinkService"
Cohesion: 0.07
Nodes (21): TelegramLinkService, Injectable, mapProfile(), ProfileController, Body, Controller, Delete, Get (+13 more)

### Community 31 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 32 - "search"
Cohesion: 0.23
Nodes (6): _cache_key(), date, What the catalogue has to say about one query. `matched` passes every filter.…, search(), SearchResult, TestSearchSplitsOnAge

### Community 33 - "tsconfig.build.json"
Cohesion: 0.33
Nodes (5): exclude, extends, dist, node_modules, ./tsconfig.json

### Community 34 - "HTML Entry Point (index.html)"
Cohesion: 0.50
Nodes (5): Google Fonts Integration, HTML Entry Point (index.html), SEO / Open Graph Meta Tags, TS Logo Mark (Favicon), TS Logo Mark (Source Asset)

### Community 39 - "traffic-admin.service.ts"
Cohesion: 0.08
Nodes (20): TrafficQueryDto, IsInt, IsOptional, Max, Min, Type, TrafficAdminController, Controller (+12 more)

### Community 40 - "useAuth"
Cohesion: 0.08
Nodes (40): AnalyticsPage, BarsPage, BarChart(), BarChartProps, useAuth(), setBarsCredit(), useBarsAnalytics(), useBarsChat() (+32 more)

### Community 41 - "tools.py"
Cohesion: 0.09
Nodes (39): age_fits(), age_requirement(), bishkek_now(), bishkek_today(), deadline_in_days(), embedding_text(), is_open(), matches() (+31 more)

### Community 42 - "CreateEventDto"
Cohesion: 0.15
Nodes (11): deriveAgeLabel(), deriveShortDesc(), CreateEventDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional (+3 more)

### Community 43 - "formatting.py"
Cohesion: 0.13
Nodes (12): chunks(), event_ids(), Turning the model's answer into a Telegram message. The model never emits URLs…, Cut a budget-truncated answer back to its last complete thought. The model…, Split on paragraph boundaries so a long answer never breaks mid-tag., Referenced ids, in the order the model mentioned them, deduplicated., to_html(), truncate_to_last_complete_line() (+4 more)

### Community 44 - "test_agent.py"
Cohesion: 0.10
Nodes (23): _call_signature(), _calls_this_turn(), _collected_tool_output(), _current_turn(), filter_tool_calls(), _prior_turns(), AIMessage, Trim what the agent asked for down to what is actually worth running. Three… (+15 more)

### Community 45 - "plans.py"
Cohesion: 0.27
Nodes (15): fetch_all(), pool(), Any, One connection, one atomic unit, for a change that spans several statements.…, transaction(), _add_reminder(), create_plan(), due_reminders() (+7 more)

### Community 46 - "EventModal.tsx"
Cohesion: 0.12
Nodes (26): AppLayout(), EventModal(), instagramUrl(), telegramUrl(), EventPhoto(), EventPhotoProps, NewsCard(), NewsCardProps (+18 more)

### Community 47 - "CurrentUser"
Cohesion: 0.13
Nodes (10): CurrentProfile, CurrentUser, FavoritesController, Controller, Get, Param, Post, UseGuards (+2 more)

### Community 48 - "GridPage.tsx"
Cohesion: 0.13
Nodes (18): CardSizeSlider(), ImageUploadField(), onPick(), ImageUploadFieldProps, NetTroubleToast(), Toast(), Theme, UIContext (+10 more)

### Community 49 - "HomePage.tsx"
Cohesion: 0.18
Nodes (11): CATN, iconProps, ORBIT_ITEMS, Floater, iconProps, ORBIT_FLOATERS, WANDER_FLOATERS, Nodes (+3 more)

### Community 50 - "Supabase"
Cohesion: 0.11
Nodes (15): Fix suggestion, Source, What happened, Skill Feedback, Steps, Core Principles, Debugging, Making and Committing Schema Changes (+7 more)

### Community 51 - "AdminService"
Cohesion: 0.10
Nodes (12): AdminController, Controller, Delete, Get, HttpCode, Param, Post, Query (+4 more)

### Community 52 - "deploy"
Cohesion: 0.29
Nodes (6): deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType, $schema

### Community 53 - "UsersPage.tsx"
Cohesion: 0.20
Nodes (7): UsersPage, UsersManager(), useAdmins(), AdminsTab(), TabKey, TABS, UsersPage()

### Community 54 - "AuthPage"
Cohesion: 0.28
Nodes (14): AuthPage(), finishSignIn(), onForgot1(), onForgot2(), onForgot3(), onLogin(), onPrimary(), onReg1() (+6 more)

### Community 55 - "Body"
Cohesion: 0.24
Nodes (5): Body, Patch, CreateEducationTrackDto, IsOptional, IsString

### Community 56 - "TestCannedReply"
Cohesion: 0.15
Nodes (3): TestCannedReply, TestNormalise, parametrize

### Community 57 - "Changelog"
Cohesion: 0.12
Nodes (16): [1.2.0](https://github.com/supabase/agent-skills/compare/v1.1.1...v1.2.0) (2026-06-02), [1.3.0](https://github.com/supabase/agent-skills/compare/v1.2.0...v1.3.0) (2026-06-05), [1.4.0](https://github.com/supabase/agent-skills/compare/v1.3.0...v1.4.0) (2026-07-10), [1.5.0](https://github.com/supabase/agent-skills/compare/supabase-postgres-best-practices-v1.4.0...supabase-postgres-best-practices-v1.5.0) (2026-07-30), [1.6.0](https://github.com/supabase/agent-skills/compare/supabase-postgres-best-practices-v1.5.0...supabase-postgres-best-practices-v1.6.0) (2026-07-30), Bug Fixes, Bug Fixes, Bug Fixes (+8 more)

### Community 58 - "Changelog"
Cohesion: 0.12
Nodes (15): [0.1.3](https://github.com/supabase/agent-skills/compare/v0.1.2...v0.1.3) (2026-06-02), [0.1.4](https://github.com/supabase/agent-skills/compare/v0.1.3...v0.1.4) (2026-06-05), [0.1.5](https://github.com/supabase/agent-skills/compare/v0.1.4...v0.1.5) (2026-07-10), [0.1.6](https://github.com/supabase/agent-skills/compare/v0.1.5...supabase-v0.1.6) (2026-07-30), [0.1.7](https://github.com/supabase/agent-skills/compare/v0.1.6...supabase-v0.1.7) (2026-08-12), Bug Fixes, Bug Fixes, Bug Fixes (+7 more)

### Community 59 - "Writing Guidelines for Postgres References"
Cohesion: 0.12
Nodes (15): 1. Concrete Transformation Patterns, 2. Error-First Structure, 3. Quantified Impact, 4. Self-Contained Examples, 5. Semantic Naming, Code Example Standards, Comments, Impact Level Guidelines (+7 more)

### Community 60 - "ErrorBoundary"
Cohesion: 0.22
Nodes (3): ErrorBoundary, Props, State

### Community 61 - "ChatQueues"
Cohesion: 0.24
Nodes (5): ChatQueues, Any, Per-chat ordering, cross-chat parallelism. One worker per active chat means a…, Process-wide singletons wired up at boot by main.py. Kept in one small module…, Queue

### Community 62 - "ApiClient"
Cohesion: 0.27
Nodes (3): ApiClient, Any, Full snapshot including archived rows — used by the embedding indexer.

### Community 63 - "admin.service.ts"
Cohesion: 0.15
Nodes (13): CreateNewsDto, IsOptional, IsString, IsOptional, IsString, UpdateEducationTrackDto, IsArray, IsInt (+5 more)

### Community 64 - "Section Definitions"
Cohesion: 0.20
Nodes (9): 1. Query Performance (query), 2. Connection Management (conn), 3. Security & RLS (security), 4. Schema Design (schema), 5. Concurrency & Locking (lock), 6. Data Access Patterns (data), 7. Monitoring & Diagnostics (monitor), 8. Advanced Features (advanced) (+1 more)

### Community 65 - "HealthController"
Cohesion: 0.22
Nodes (6): HealthController, Controller, Get, SkipThrottle, HealthModule, Module

### Community 66 - "UpdateEventDto"
Cohesion: 0.22
Nodes (9): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min (+1 more)

### Community 67 - "bot.controller.ts"
Cohesion: 0.09
Nodes (22): BotAuthGuard, secretsMatch(), Injectable, BotController, Body, Controller, Delete, Get (+14 more)

### Community 68 - "deploy"
Cohesion: 0.25
Nodes (7): deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType, startCommand, $schema

### Community 69 - "Барс — Telegram-агент Teenage Space"
Cohesion: 0.22
Nodes (8): Барс — Telegram-агент Teenage Space, Деплой, Запуск локально, Как это соединено с остальным проектом, Переменные окружения, Проверить поиск без Telegram, Структура, Тесты

### Community 70 - "Supabase Postgres Best Practices"
Cohesion: 0.33
Nodes (5): How to Use, References, Rule Categories by Priority, Supabase Postgres Best Practices, When to Apply

### Community 71 - "Runtime"
Cohesion: 0.18
Nodes (6): Any, True when this chat just sent these exact words, and records them either way.…, Serialises conversation-state changes for one chat across *every* handler — the…, Drop idle locks so the map does not grow without bound. Called from the sweep., Runtime, Lock

### Community 72 - "_clean_due_date"
Cohesion: 0.11
Nodes (11): The LangGraph agent behind Барс., _clean_due_date(), _plan_horizon(), Any, date, The last day a step can sensibly fall on: registration closes, or failing that,…, Keep a step's deadline inside the window the event actually allows. A plan…, Plan dates and the consent gate on save_plan. (+3 more)

### Community 74 - "find_by_title"
Cohesion: 0.36
Nodes (4): find_by_title(), _normalise_title(), Resolve a query that names an event, tolerating typos and ignoring the age…, TestFindByTitle

### Community 75 - "education.service.ts"
Cohesion: 0.12
Nodes (15): EducationTrackRow, mapEducationTrack(), mapMaterial(), MaterialRow, EducationController, CacheTTL, Controller, Get (+7 more)

### Community 109 - "reminders.py"
Cohesion: 0.33
Nodes (9): site_url(), mark_failed(), mark_sent(), dispatch(), _keyboard_url(), Any, Bot, Delivery of scheduled reminders. The schedule lives in Postgres… (+1 more)

### Community 111 - "AuthController"
Cohesion: 0.25
Nodes (6): AuthController, Controller, Get, Query, Throttle, UseGuards

### Community 114 - "Settings"
Cohesion: 0.29
Nodes (4): BaseSettings, Railway injects RAILWAY_PUBLIC_DOMAIN; a custom domain overrides it via env., Settings, RuntimeError

### Community 118 - "CreateMaterialDto"
Cohesion: 0.33
Nodes (5): CreateMaterialDto, IsArray, IsInt, IsOptional, IsString

### Community 124 - "test_smalltalk.py"
Cohesion: 0.13
Nodes (14): availability(), availability_line(), How many open events sit in each catalogue category, zeros included. The zeros…, The one-line catalogue census handed to the model on every turn., Барс — the Teenage Space event agent for Telegram., canned_reply(), normalise(), Answers that never need a model. "Спасибо" cost 1086 prompt tokens and five and… (+6 more)

## Knowledge Gaps
- **308 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+303 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SupabaseService` connect `SupabaseService` to `bars-admin.service.ts`, `HealthController`, `traffic-admin.service.ts`, `events.service.ts`, `mappers.ts`, `traffic.service.ts`, `education.service.ts`, `ratings.controller.ts`, `AuthController`, `supabase-auth.guard.ts`, `CurrentUser`, `AdminService`, `users-admin.controller.ts`, `super-admin.guard.ts`, `TelegramLinkService`, `admin.service.ts`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `CurrentUser` to `SupabaseService`, `mappers.ts`, `ratings.controller.ts`, `AuthController`, `users-admin.controller.ts`, `TelegramLinkService`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `useAuth()` connect `useAuth` to `types.ts`, `PostForm.tsx`, `AdminPage.tsx`, `EventModal.tsx`, `UserAccountPage`, `GridPage.tsx`, `App.tsx`, `refreshProfile`, `UsersPage.tsx`, `AuthPage`, `constants.ts`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _308 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07373271889400922 - nodes in this community are weakly interconnected._
- **Should `bars-admin.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0517120894479385 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._