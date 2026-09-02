# Graph Report - Teenage Space  (2026-09-02)

## Corpus Check
- 254 files · ~81,986 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1828 nodes · 3624 edges · 123 communities (84 shown, 39 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 104 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `51500cce`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- GridPage.tsx
- bars-admin.service.ts
- main.py
- dependencies
- Platform Description (Privacy Policy Section 1)
- SupabaseService
- frontend/package.json
- AdminPage.tsx
- events.service.ts
- CreateSubmissionDto
- traffic.service.ts
- news.service.ts
- ratings.controller.ts
- compilerOptions
- compilerOptions
- supabase-auth.guard.ts
- tools.py
- App.tsx
- execute
- app.module.ts
- get_settings
- AuthPage
- users-admin.service.ts
- PrivacyPage.tsx
- conftest.py
- handlers.py
- useEvents.ts
- admin.service.ts
- UpdateSubmissionDto
- CapacityService
- profile.service.ts
- nest-cli.json
- retrieval.py
- tsconfig.build.json
- HTML Entry Point (index.html)
- vite-env.d.ts
- vercel.json
- Graphify Query Workflow
- traffic-admin.service.ts
- AnalyticsPage.tsx
- catalog.py
- CreateEventDto
- truncate_to_last_complete_line
- agent.py
- plans.py
- constants.ts
- CurrentUser
- ProfileController
- search
- Supabase
- AdminService
- deploy
- useAuth
- bot.controller.ts
- mappers.ts
- tracking.ts
- Changelog
- Changelog
- Writing Guidelines for Postgres References
- ErrorBoundary
- ChatQueues
- ApiClient
- UpdateEventDto
- Section Definitions
- SupabaseAuthGuard
- TelegramLinkService
- BotController
- deploy
- Барс — Telegram-агент Teenage Space
- Supabase Postgres Best Practices
- Runtime
- _clean_due_date
- bars
- db.py
- BotService
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
- formatting.py
- reminders.py
- HealthController
- AuthController
- TrafficCleanupService
- age_fits
- Settings
- find_by_title
- BotAuthGuard
- .toggleFavorite
- api
- chunks
- process
- TestSearchEventsTool
- CreateNewsDto

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 73 edges
2. `SupabaseService` - 44 edges
3. `useUI()` - 37 edges
4. `get_settings()` - 30 edges
5. `api` - 29 edges
6. `AdminService` - 28 edges
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

## Communities (123 total, 39 thin omitted)

### Community 0 - "GridPage.tsx"
Cohesion: 0.07
Nodes (37): AuthPage, EditAccountPage, ProfilePage, SettingsPage, CardSizeSlider(), ConfirmDialog(), ConfirmDialogProps, ImageUploadField() (+29 more)

### Community 1 - "bars-admin.service.ts"
Cohesion: 0.05
Nodes (35): BarsAdminController, Body, Controller, Get, Param, Query, UseGuards, BarsAdminService (+27 more)

### Community 2 - "main.py"
Cohesion: 0.18
Nodes (18): AsyncIOScheduler, close_api(), Барс — the Teenage Space event agent for Telegram., build_scheduler(), configure_logging(), health(), main(), Bot (+10 more)

### Community 3 - "dependencies"
Cohesion: 0.04
Nodes (46): dependencies, cache-manager, class-transformer, class-validator, helmet, @nestjs/cache-manager, @nestjs/common, @nestjs/config (+38 more)

### Community 4 - "Platform Description (Privacy Policy Section 1)"
Cohesion: 0.08
Nodes (33): Auto-Push Working Agreement, Backend Build Job, Build Check Workflow, Frontend Build Job, Check Required Secrets Step, Link Project Step, Migrate Job, Push Migrations Step (+25 more)

### Community 5 - "SupabaseService"
Cohesion: 0.13
Nodes (10): BanStatusGuard, Injectable, TelegramLinkRow, FavoritesService, Injectable, SupabaseModule, Module, SupabaseService (+2 more)

### Community 6 - "frontend/package.json"
Cohesion: 0.07
Nodes (28): dependencies, react, react-dom, react-router-dom, @supabase/supabase-js, devDependencies, @types/react, @types/react-dom (+20 more)

### Community 7 - "AdminPage.tsx"
Cohesion: 0.05
Nodes (47): PublishPage, Chip(), ChipProps, EditEventModal(), save(), EditEventModalProps, emptyPostForm(), eventToPostForm() (+39 more)

### Community 8 - "events.service.ts"
Cohesion: 0.09
Nodes (20): EventsController, CacheTTL, Controller, Get, Header, Param, Query, UseInterceptors (+12 more)

### Community 9 - "CreateSubmissionDto"
Cohesion: 0.11
Nodes (19): mapSubmission(), CreateSubmissionDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString (+11 more)

### Community 10 - "traffic.service.ts"
Cohesion: 0.06
Nodes (40): DEVICE_TYPES, HeartbeatDto, IsBoolean, IsIn, IsUUID, DEVICE_TYPES, TARGET_TYPES, TrackCardViewDto (+32 more)

### Community 11 - "news.service.ts"
Cohesion: 0.14
Nodes (12): mapNews(), NewsRow, NewsController, CacheTTL, Controller, Get, Header, UseInterceptors (+4 more)

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
Cohesion: 0.13
Nodes (13): SetRoleDto, IsIn, AdminGuard, Injectable, PermissionGuard, Injectable, PERM_KEY, AuthedRequest (+5 more)

### Community 16 - "tools.py"
Cohesion: 0.18
Nodes (19): _ctx(), get_event(), link_hint(), PlanStep, BaseModel, What Барс can actually do. Every tool is read-only against the catalogue or…, Показать полную карточку одного мероприятия по его id., Сохранить план подготовки к мероприятию и включить напоминания. Вызывай ТОЛЬКО… (+11 more)

### Community 17 - "App.tsx"
Cohesion: 0.09
Nodes (22): AdminPage, App(), ArticlePage, EducationIndex(), EducationPage, HomeGate(), UsersPage, BottomNav() (+14 more)

### Community 18 - "execute"
Cohesion: 0.15
Nodes (23): _clip(), log_turn(), Quality-control journal and token accounting for Барс. Two bot-owned tables…, Book a catalogue re-embed against the system chat, for the balance estimate., Drop journalled turns past the retention window. Called from sessions.sweep()., Append one exchange — the user's line and the assistant's — to the journal.…, Fold this turn's Gemini token counts into the daily rollup. `usage_by_model` is…, record_embedding_usage() (+15 more)

### Community 19 - "app.module.ts"
Cohesion: 0.12
Nodes (20): AdminModule, Module, AppModule, Module, AuthModule, Module, BarsModule, Module (+12 more)

### Community 20 - "get_settings"
Cohesion: 0.17
Nodes (16): Thin async client for the Teenage Space NestJS API. Public catalogue reads go…, get_settings(), All configuration in one place, loaded from the environment (or bot/.env…, pgvector accepts its text form, so no extra type-registration dependency is…, to_vector_literal(), embed_documents(), embed_query(), _embedder() (+8 more)

### Community 21 - "AuthPage"
Cohesion: 0.09
Nodes (32): onAccept(), AuthProvider(), checkBanStatus(), hasPerm(), refreshProfile(), signOut(), isActiveBan(), AuthPage() (+24 more)

### Community 22 - "users-admin.service.ts"
Cohesion: 0.08
Nodes (26): BAN_DURATIONS, BanDuration, BanUserDto, IsIn, IsOptional, IsString, MaxLength, ADMIN_PERM_KEYS (+18 more)

### Community 23 - "PrivacyPage.tsx"
Cohesion: 0.33
Nodes (4): PrivacyPage, Block, Section, SECTIONS

### Community 24 - "conftest.py"
Cohesion: 0.15
Nodes (16): clear_cache(), clear_search_cache(), _event(), events(), fake_catalog(), FakeCatalog, no_vector_search(), Any (+8 more)

### Community 25 - "handlers.py"
Cohesion: 0.19
Nodes (20): get_usage_metadata_callback(), help_command(), Job, _NoUsageCallback, on_other(), on_text(), on_unknown_command(), _open_conversation() (+12 more)

### Community 26 - "useEvents.ts"
Cohesion: 0.21
Nodes (13): buildQuery(), EventFilters, useEvents(), useNews(), CacheEntry, getCached(), getEntry(), getOrFetch() (+5 more)

### Community 27 - "admin.service.ts"
Cohesion: 0.12
Nodes (18): CreateEducationTrackDto, IsOptional, IsString, CreateMaterialDto, IsArray, IsInt, IsOptional, IsString (+10 more)

### Community 28 - "UpdateSubmissionDto"
Cohesion: 0.14
Nodes (11): Body, Patch, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 29 - "CapacityService"
Cohesion: 0.16
Nodes (8): CapacityController, Controller, Get, UseGuards, CapacityService, StorageStatRow, Injectable, UserStatRow

### Community 30 - "profile.service.ts"
Cohesion: 0.15
Nodes (12): mapProfile(), Body, Patch, assertCooldownElapsed(), ProfileService, Injectable, IsBoolean, IsIn (+4 more)

### Community 31 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 32 - "retrieval.py"
Cohesion: 0.19
Nodes (16): age_requirement(), embedding_text(), How the event states its age rule, for telling a user why it doesn't fit., What gets embedded. Title and description carry most of the signal; category,…, age_mismatch_note(), describe(), _keyword_rank(), _order() (+8 more)

### Community 33 - "tsconfig.build.json"
Cohesion: 0.33
Nodes (5): exclude, extends, dist, node_modules, ./tsconfig.json

### Community 34 - "HTML Entry Point (index.html)"
Cohesion: 0.50
Nodes (5): Google Fonts Integration, HTML Entry Point (index.html), SEO / Open Graph Meta Tags, TS Logo Mark (Favicon), TS Logo Mark (Source Asset)

### Community 39 - "traffic-admin.service.ts"
Cohesion: 0.08
Nodes (20): TrafficQueryDto, IsInt, IsOptional, Max, Min, Type, TrafficAdminController, Controller (+12 more)

### Community 40 - "AnalyticsPage.tsx"
Cohesion: 0.12
Nodes (24): AnalyticsPage, BarChart(), BarChartProps, setBarsCredit(), useBarsAnalytics(), useCapacity(), useTrafficOnline(), useTrafficSummary() (+16 more)

### Community 41 - "catalog.py"
Cohesion: 0.21
Nodes (13): bishkek_now(), bishkek_today(), Catalog, deadline_in_days(), is_open(), matches(), parse_date(), Any (+5 more)

### Community 42 - "CreateEventDto"
Cohesion: 0.15
Nodes (12): deriveAgeLabel(), deriveShortDesc(), CreateEventDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional (+4 more)

### Community 43 - "truncate_to_last_complete_line"
Cohesion: 0.18
Nodes (8): event_ids(), Cut a budget-truncated answer back to its last complete thought. The model…, Referenced ids, in the order the model mentioned them, deduplicated., to_html(), truncate_to_last_complete_line(), Message shaping: recovering a truncated answer, and splitting a long one., TestEventRefs, TestTruncateToLastCompleteLine

### Community 44 - "agent.py"
Cohesion: 0.07
Nodes (36): build_graph(), _call_signature(), _calls_this_turn(), _chat_model(), _collected_tool_output(), _current_turn(), filter_tool_calls(), GuardVerdict (+28 more)

### Community 45 - "plans.py"
Cohesion: 0.29
Nodes (14): fetch_all(), Any, One connection, one atomic unit, for a change that spans several statements.…, transaction(), _add_reminder(), create_plan(), due_reminders(), _fire_at() (+6 more)

### Community 46 - "constants.ts"
Cohesion: 0.08
Nodes (37): CardMenu(), EventCard(), EventCardAdminActions, EventCardProps, instagramUrl(), EventModal(), instagramUrl(), telegramUrl() (+29 more)

### Community 47 - "CurrentUser"
Cohesion: 0.15
Nodes (9): CurrentProfile, CurrentUser, FavoritesController, Controller, Get, Param, Post, UseGuards (+1 more)

### Community 48 - "ProfileController"
Cohesion: 0.16
Nodes (7): ProfileController, Controller, Delete, Get, HttpCode, Post, UseGuards

### Community 49 - "search"
Cohesion: 0.20
Nodes (7): _cache_key(), date, What the catalogue has to say about one query. `matched` passes every filter.…, search(), SearchResult, Retrieval: what the age filter hides, and how a named event is found anyway.…, TestSearchSplitsOnAge

### Community 50 - "Supabase"
Cohesion: 0.11
Nodes (15): Fix suggestion, Source, What happened, Skill Feedback, Steps, Core Principles, Debugging, Making and Committing Schema Changes (+7 more)

### Community 51 - "AdminService"
Cohesion: 0.09
Nodes (13): AdminController, Controller, Delete, Get, HttpCode, Param, Post, Query (+5 more)

### Community 52 - "deploy"
Cohesion: 0.29
Nodes (6): deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType, $schema

### Community 53 - "useAuth"
Cohesion: 0.06
Nodes (56): BarsPage, UserAccountPage, BanModal(), BanModalProps, OPTIONS, BannedGate(), onLogout(), periodText() (+48 more)

### Community 54 - "bot.controller.ts"
Cohesion: 0.36
Nodes (8): ConfirmLinkDto, TelegramIdBodyDto, TelegramIdQueryDto, IsInt, IsOptional, IsString, MaxLength, Type

### Community 55 - "mappers.ts"
Cohesion: 0.12
Nodes (18): EducationTrackRow, EventRow, mapEducationTrack(), mapMaterial(), MaterialRow, SubmissionAdminRow, SubmissionRow, EducationController (+10 more)

### Community 56 - "tracking.ts"
Cohesion: 0.24
Nodes (11): AppLayout(), useHeartbeat(), EXCLUDED_PREFIXES, useTrackPageView(), base(), DeviceType, getDeviceType(), getSessionId() (+3 more)

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
Cohesion: 0.25
Nodes (4): ApiClient, ApiError, Any, Full snapshot including archived rows — used by the embedding indexer.

### Community 63 - "UpdateEventDto"
Cohesion: 0.22
Nodes (9): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min (+1 more)

### Community 64 - "Section Definitions"
Cohesion: 0.20
Nodes (9): 1. Query Performance (query), 2. Connection Management (conn), 3. Security & RLS (security), 4. Schema Design (schema), 5. Concurrency & Locking (lock), 6. Data Access Patterns (data), 7. Monitoring & Diagnostics (monitor), 8. Advanced Features (advanced) (+1 more)

### Community 65 - "SupabaseAuthGuard"
Cohesion: 0.31
Nodes (4): jwtExpiryMs(), SupabaseAuthGuard, Inject, Injectable

### Community 67 - "BotController"
Cohesion: 0.19
Nodes (8): BotController, Controller, Delete, Get, HttpCode, Query, SkipThrottle, UseGuards

### Community 68 - "deploy"
Cohesion: 0.25
Nodes (7): deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType, startCommand, $schema

### Community 69 - "Барс — Telegram-агент Teenage Space"
Cohesion: 0.25
Nodes (7): Барс — Telegram-агент Teenage Space, Деплой, Запуск локально, Как это соединено с остальным проектом, Переменные окружения, Проверить поиск без Telegram, Структура

### Community 70 - "Supabase Postgres Best Practices"
Cohesion: 0.33
Nodes (5): How to Use, References, Rule Categories by Priority, Supabase Postgres Best Practices, When to Apply

### Community 71 - "Runtime"
Cohesion: 0.18
Nodes (6): Any, True when this chat just sent these exact words, and records them either way.…, Serialises conversation-state changes for one chat across *every* handler — the…, Drop idle locks so the map does not grow without bound. Called from the sweep., Runtime, Lock

### Community 72 - "_clean_due_date"
Cohesion: 0.11
Nodes (11): The LangGraph agent behind Барс., _clean_due_date(), _plan_horizon(), Any, date, The last day a step can sensibly fall on: registration closes, or failing that,…, Keep a step's deadline inside the window the event actually allows. A plan…, Plan dates and the consent gate on save_plan. (+3 more)

### Community 74 - "db.py"
Cohesion: 0.31
Nodes (9): clean_dsn(), close_pool(), init_pool(), pool(), AsyncConnectionPool, Postgres access for the bot's own tables. Scope rule (see the plan): the bot…, main(), Retrieval probe — check the search half without spending a Telegram message.… (+1 more)

### Community 108 - "formatting.py"
Cohesion: 0.33
Nodes (9): event_keyboard(), plan_keyboard(), Any, Turning the model's answer into a Telegram message. The model never emits URLs…, Telegram rejects an entire message over one malformed button URL, which would…, render_plan(), _usable_url(), plan_command() (+1 more)

### Community 109 - "reminders.py"
Cohesion: 0.33
Nodes (9): site_url(), mark_failed(), mark_sent(), dispatch(), _keyboard_url(), Any, Bot, Delivery of scheduled reminders. The schedule lives in Postgres… (+1 more)

### Community 110 - "HealthController"
Cohesion: 0.22
Nodes (6): HealthController, Controller, Get, SkipThrottle, HealthModule, Module

### Community 111 - "AuthController"
Cohesion: 0.25
Nodes (6): AuthController, Controller, Get, Query, Throttle, UseGuards

### Community 112 - "TrafficCleanupService"
Cohesion: 0.32
Nodes (4): TrafficCleanupService, Cron, Injectable, yesterdayInBishkek()

### Community 113 - "age_fits"
Cohesion: 0.39
Nodes (3): age_fits(), Whether a participant of this age is inside the event's stated range.…, TestAgeFits

### Community 114 - "Settings"
Cohesion: 0.29
Nodes (4): BaseSettings, Railway injects RAILWAY_PUBLIC_DOMAIN; a custom domain overrides it via env., Settings, RuntimeError

### Community 115 - "find_by_title"
Cohesion: 0.36
Nodes (4): find_by_title(), _normalise_title(), Resolve a query that names an event, tolerating typos and ignoring the age…, TestFindByTitle

### Community 116 - "BotAuthGuard"
Cohesion: 0.40
Nodes (3): BotAuthGuard, secretsMatch(), Injectable

### Community 117 - ".toggleFavorite"
Cohesion: 0.50
Nodes (3): Body, Param, Post

### Community 118 - "api"
Cohesion: 0.22
Nodes (11): api(), _age_from(), chat_context(), link_command(), on_favorite(), on_step(), Any, date (+3 more)

### Community 119 - "chunks"
Cohesion: 0.43
Nodes (3): chunks(), Split on paragraph boundaries so a long answer never breaks mid-tag., TestChunks

### Community 120 - "process"
Cohesion: 0.40
Nodes (6): _finish_reason(), _keep_typing(), process(), AIMessage, One turn of the conversation. Runs inside the chat's own queue worker., Gemini's stop reason, normalised. Absent on older langchain versions.

### Community 122 - "CreateNewsDto"
Cohesion: 0.50
Nodes (3): CreateNewsDto, IsOptional, IsString

## Knowledge Gaps
- **305 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+300 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SupabaseService` connect `SupabaseService` to `bars-admin.service.ts`, `events.service.ts`, `CreateSubmissionDto`, `traffic.service.ts`, `news.service.ts`, `ratings.controller.ts`, `supabase-auth.guard.ts`, `users-admin.service.ts`, `admin.service.ts`, `CapacityService`, `profile.service.ts`, `traffic-admin.service.ts`, `AdminService`, `mappers.ts`, `SupabaseAuthGuard`, `TelegramLinkService`, `HealthController`, `AuthController`, `TrafficCleanupService`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `CurrentUser` to `SupabaseService`, `CreateSubmissionDto`, `ratings.controller.ts`, `AuthController`, `ProfileController`, `supabase-auth.guard.ts`, `users-admin.service.ts`, `profile.service.ts`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `useAuth()` connect `useAuth` to `GridPage.tsx`, `AdminPage.tsx`, `AnalyticsPage.tsx`, `constants.ts`, `App.tsx`, `AuthPage`, `tracking.ts`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _305 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `GridPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0734006734006734 - nodes in this community are weakly interconnected._
- **Should `bars-admin.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0517120894479385 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._