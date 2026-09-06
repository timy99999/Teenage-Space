# Graph Report - Teenage Space  (2026-09-06)

## Corpus Check
- 260 files · ~86,845 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1969 nodes · 3844 edges · 138 communities (92 shown, 39 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 103 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `28528d7a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AuthContext.tsx
- BarsAdminService
- 20260828103623_traffic_analytics.sql
- dependencies
- Platform Description (Privacy Policy Section 1)
- SupabaseService
- frontend/package.json
- NewsController
- events.service.ts
- CurrentUser
- TrafficService
- AdminPage.tsx
- ratings.controller.ts
- compilerOptions
- compilerOptions
- useEducation.ts
- supabase-auth.guard.ts
- useAuth
- execute
- app.module.ts
- agent.py
- AuthPage
- UsersAdminService
- UpdateProfileDto
- conftest.py
- handlers.py
- UserAccountPage.tsx
- main.py
- UpdateSubmissionDto
- CapacityService
- ProfileController
- nest-cli.json
- tools.py
- tsconfig.build.json
- HTML Entry Point (index.html)
- vite-env.d.ts
- vercel.json
- Graphify Query Workflow
- TrafficAdminService
- types.ts
- retrieval.py
- CreateEventDto
- chunks
- BarsCreditDto
- plans.py
- constants.ts
- BotService
- GridPage.tsx
- AdminService
- Supabase
- AdminController
- deploy
- UsersManager.tsx
- system_prompt
- UpdateEducationTrackDto
- TestCannedReply
- Changelog
- Changelog
- Writing Guidelines for Postgres References
- ErrorBoundary
- get_settings
- ApiClient
- admin.controller.ts
- Section Definitions
- profile.controller.ts
- users-admin.service.ts
- TelegramLinkService
- deploy
- Барс — Telegram-агент Teenage Space
- Supabase Postgres Best Practices
- ChatQueues
- _clean_due_date
- bars
- BotController
- admin.service.ts
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
- BarsQueryDto
- smalltalk.py
- public.get_user_capacity_stats
- formatting.py
- CreateEducationTrackDto
- EducationController
- 20260826150917_super_admin_and_capacity_stats.sql
- test_retrieval.py
- 20260828111013_card_unique_views.sql
- CreateMaterialDto
- catalog.py
- BarsAdminController
- bars-admin.service.ts
- bot.controller.ts
- age_fits
- TestGetEventOnAnUnknownId
- traffic.service.ts
- UpdateEventDto
- Settings
- process
- UpdateMaterialDto
- truncate_to_last_complete_line
- BotAuthGuard
- .toggleFavorite

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

## Communities (138 total, 39 thin omitted)

### Community 0 - "AuthContext.tsx"
Cohesion: 0.11
Nodes (23): AuthPage, EditAccountPage, ProfilePage, ConfirmDialog(), ConfirmDialogProps, ImageUploadField(), onPick(), ImageUploadFieldProps (+15 more)

### Community 1 - "BarsAdminService"
Cohesion: 0.29
Nodes (3): BarsAdminService, bishkekDayKeys(), Injectable

### Community 2 - "20260828103623_traffic_analytics.sql"
Cohesion: 0.08
Nodes (39): auth, education_tracks, events, favorites, materials, news, profiles, ratings (+31 more)

### Community 3 - "dependencies"
Cohesion: 0.04
Nodes (46): dependencies, cache-manager, class-transformer, class-validator, helmet, @nestjs/cache-manager, @nestjs/common, @nestjs/config (+38 more)

### Community 4 - "Platform Description (Privacy Policy Section 1)"
Cohesion: 0.08
Nodes (33): Auto-Push Working Agreement, Backend Build Job, Build Check Workflow, Frontend Build Job, Check Required Secrets Step, Link Project Step, Migrate Job, Push Migrations Step (+25 more)

### Community 5 - "SupabaseService"
Cohesion: 0.06
Nodes (27): AuthController, Controller, Get, Query, Throttle, UseGuards, BanStatusGuard, Injectable (+19 more)

### Community 6 - "frontend/package.json"
Cohesion: 0.07
Nodes (28): dependencies, react, react-dom, react-router-dom, @supabase/supabase-js, devDependencies, @types/react, @types/react-dom (+20 more)

### Community 7 - "NewsController"
Cohesion: 0.15
Nodes (10): NewsController, CacheTTL, Controller, Get, Header, UseInterceptors, NewsModule, Module (+2 more)

### Community 8 - "events.service.ts"
Cohesion: 0.09
Nodes (24): EventsController, CacheTTL, Controller, Get, Header, Param, Query, UseInterceptors (+16 more)

### Community 9 - "CurrentUser"
Cohesion: 0.09
Nodes (19): CurrentProfile, CurrentUser, CreateSubmissionDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional (+11 more)

### Community 10 - "TrafficService"
Cohesion: 0.07
Nodes (35): HeartbeatDto, IsBoolean, IsIn, IsUUID, TrackCardViewDto, IsBoolean, IsIn, IsString (+27 more)

### Community 11 - "AdminPage.tsx"
Cohesion: 0.06
Nodes (43): PublishPage, EditEventModal(), save(), EditEventModalProps, emptyPostForm(), eventToPostForm(), FORMATS, LEVELS (+35 more)

### Community 12 - "ratings.controller.ts"
Cohesion: 0.11
Nodes (15): RateEventDto, IsInt, Max, Min, RatingsController, Body, Controller, Get (+7 more)

### Community 13 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+12 more)

### Community 14 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, isolatedModules, jsx, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch (+12 more)

### Community 15 - "useEducation.ts"
Cohesion: 0.16
Nodes (12): EducationIndex(), EducationPage, Sidebar(), NAV_CATS, EducationData, useEducation(), useEducationTracks(), EducationTab() (+4 more)

### Community 16 - "supabase-auth.guard.ts"
Cohesion: 0.11
Nodes (15): AdminGuard, Injectable, PermissionGuard, Injectable, PERM_KEY, AuthedRequest, CachedProfile, jwtExpiryMs() (+7 more)

### Community 17 - "useAuth"
Cohesion: 0.08
Nodes (30): AdminPage, AppLayout(), BarsPage, HomeGate(), PrivacyPage, BannedGate(), onLogout(), periodText() (+22 more)

### Community 18 - "execute"
Cohesion: 0.14
Nodes (24): _clip(), log_turn(), Quality-control journal and token accounting for Барс. Two bot-owned tables…, Fold this turn's Gemini token counts into the daily rollup. `usage_by_model` is…, Book a catalogue re-embed against the system chat, for the balance estimate., Drop journalled turns past the retention window. Called from sessions.sweep()., Append one exchange — the user's line and the assistant's — to the journal.…, record_embedding_usage() (+16 more)

### Community 19 - "app.module.ts"
Cohesion: 0.10
Nodes (21): AdminModule, Module, AppModule, Module, AuthModule, Module, BarsModule, Module (+13 more)

### Community 20 - "agent.py"
Cohesion: 0.08
Nodes (34): build_graph(), _call_signature(), _calls_this_turn(), _chat_model(), _collected_tool_output(), _current_turn(), filter_tool_calls(), GuardVerdict (+26 more)

### Community 21 - "AuthPage"
Cohesion: 0.09
Nodes (32): onAccept(), AuthProvider(), checkBanStatus(), hasPerm(), refreshProfile(), signOut(), isActiveBan(), AuthPage() (+24 more)

### Community 22 - "UsersAdminService"
Cohesion: 0.10
Nodes (20): BanUserDto, IsIn, IsOptional, IsString, MaxLength, SetRoleDto, IsIn, Body (+12 more)

### Community 23 - "UpdateProfileDto"
Cohesion: 0.20
Nodes (9): Body, Patch, assertCooldownElapsed(), IsBoolean, IsIn, IsOptional, IsString, UpdateProfileDto (+1 more)

### Community 24 - "conftest.py"
Cohesion: 0.13
Nodes (17): Барс — the Teenage Space event agent for Telegram., clear_cache(), clear_search_cache(), _event(), events(), fake_catalog(), FakeCatalog, no_vector_search() (+9 more)

### Community 25 - "handlers.py"
Cohesion: 0.17
Nodes (25): api(), ApiError, chat_context(), help_command(), link_command(), on_favorite(), on_other(), on_text() (+17 more)

### Community 26 - "UserAccountPage.tsx"
Cohesion: 0.15
Nodes (11): UserAccountPage, BanModal(), BanModalProps, OPTIONS, useAdminUser(), banPeriodText(), STATUS_LABEL, UserAccountPage() (+3 more)

### Community 27 - "main.py"
Cohesion: 0.18
Nodes (18): AsyncIOScheduler, close_api(), Thin async client for the Teenage Space NestJS API. Public catalogue reads go…, build_scheduler(), configure_logging(), health(), main(), Bot (+10 more)

### Community 28 - "UpdateSubmissionDto"
Cohesion: 0.20
Nodes (9): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min (+1 more)

### Community 29 - "CapacityService"
Cohesion: 0.22
Nodes (6): CapacityController, Controller, Get, UseGuards, CapacityService, Injectable

### Community 30 - "ProfileController"
Cohesion: 0.15
Nodes (8): ProfileController, Controller, Delete, Get, HttpCode, UseGuards, ProfileService, Injectable

### Community 31 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 32 - "tools.py"
Cohesion: 0.11
Nodes (26): _ctx(), get_event(), link_hint(), PlanStep, BaseModel, What Барс can actually do. Every tool is read-only against the catalogue or…, Показать полную карточку одного мероприятия по его id., Сохранить план подготовки к мероприятию и включить напоминания. Вызывай ТОЛЬКО… (+18 more)

### Community 33 - "tsconfig.build.json"
Cohesion: 0.33
Nodes (5): exclude, extends, dist, node_modules, ./tsconfig.json

### Community 34 - "HTML Entry Point (index.html)"
Cohesion: 0.50
Nodes (5): Google Fonts Integration, HTML Entry Point (index.html), SEO / Open Graph Meta Tags, TS Logo Mark (Favicon), TS Logo Mark (Source Asset)

### Community 39 - "TrafficAdminService"
Cohesion: 0.11
Nodes (13): TrafficQueryDto, IsInt, IsOptional, Max, Min, Type, TrafficAdminController, Controller (+5 more)

### Community 40 - "types.ts"
Cohesion: 0.07
Nodes (41): AnalyticsPage, BarChart(), BarChartProps, setBarsCredit(), useBarsAnalytics(), useCapacity(), useTrafficOnline(), useTrafficSummary() (+33 more)

### Community 41 - "retrieval.py"
Cohesion: 0.13
Nodes (17): embedding_text(), What gets embedded. Title and description carry most of the signal; category,…, _cache_key(), _keyword_rank(), _normalise_title(), _order(), Any, date (+9 more)

### Community 42 - "CreateEventDto"
Cohesion: 0.15
Nodes (12): Body, deriveAgeLabel(), deriveShortDesc(), CreateEventDto, IsArray, IsBoolean, IsIn, IsInt (+4 more)

### Community 43 - "chunks"
Cohesion: 0.18
Nodes (8): chunks(), event_ids(), Split on paragraph boundaries so a long answer never breaks mid-tag., Referenced ids, in the order the model mentioned them, deduplicated., to_html(), Message shaping: recovering a truncated answer, and splitting a long one., TestChunks, TestEventRefs

### Community 44 - "BarsCreditDto"
Cohesion: 0.20
Nodes (9): BarsCreditDto, IsOptional, IsString, Max, MaxLength, Min, Type, IsISO8601 (+1 more)

### Community 45 - "plans.py"
Cohesion: 0.18
Nodes (21): One connection, one atomic unit, for a change that spans several statements.…, transaction(), site_url(), _add_reminder(), create_plan(), due_reminders(), _fire_at(), get_plan() (+13 more)

### Community 46 - "constants.ts"
Cohesion: 0.05
Nodes (61): ArticlePage, CardMenu(), EventCard(), EventCardAdminActions, EventCardProps, instagramUrl(), EventModal(), instagramUrl() (+53 more)

### Community 47 - "BotService"
Cohesion: 0.12
Nodes (10): BotService, Injectable, FavoritesController, Controller, Get, Param, Post, UseGuards (+2 more)

### Community 48 - "GridPage.tsx"
Cohesion: 0.09
Nodes (28): App(), SettingsPage, CardSizeSlider(), Chip(), ChipProps, NetTroubleToast(), Toast(), Theme (+20 more)

### Community 49 - "AdminService"
Cohesion: 0.19
Nodes (5): Get, Query, AdminService, Inject, Injectable

### Community 50 - "Supabase"
Cohesion: 0.11
Nodes (15): Fix suggestion, Source, What happened, Skill Feedback, Steps, Core Principles, Debugging, Making and Committing Schema Changes (+7 more)

### Community 51 - "AdminController"
Cohesion: 0.15
Nodes (7): AdminController, Controller, Delete, HttpCode, Param, Post, UseGuards

### Community 52 - "deploy"
Cohesion: 0.29
Nodes (6): deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType, $schema

### Community 53 - "UsersManager.tsx"
Cohesion: 0.15
Nodes (11): UsersPage, ROLE_BADGE, UsersManager(), UsersManagerProps, useAdmins(), useAdminUsers(), AdminsTab(), TabKey (+3 more)

### Community 54 - "system_prompt"
Cohesion: 0.16
Nodes (6): Барс: who he is, and the hard rules that keep him useful. The persona is…, The agent's system message. The category and theme *vocabularies* used to be…, system_prompt(), The census must inform the model, never licence it to answer without tools., TestCensusWording, TestPrompts

### Community 55 - "UpdateEducationTrackDto"
Cohesion: 0.29
Nodes (4): Patch, IsOptional, IsString, UpdateEducationTrackDto

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

### Community 61 - "get_settings"
Cohesion: 0.15
Nodes (23): get_settings(), All configuration in one place, loaded from the environment (or bot/.env…, clean_dsn(), close_pool(), fetch_all(), init_pool(), Postgres access for the bot's own tables. Scope rule (see the plan): the bot…, pgvector accepts its text form, so no extra type-registration dependency is… (+15 more)

### Community 62 - "ApiClient"
Cohesion: 0.27
Nodes (3): ApiClient, Any, Full snapshot including archived rows — used by the embedding indexer.

### Community 63 - "admin.controller.ts"
Cohesion: 0.26
Nodes (5): CreateNewsDto, IsOptional, IsString, IsLooseUrl(), normalizeUrl()

### Community 64 - "Section Definitions"
Cohesion: 0.20
Nodes (9): 1. Query Performance (query), 2. Connection Management (conn), 3. Security & RLS (security), 4. Schema Design (schema), 5. Concurrency & Locking (lock), 6. Data Access Patterns (data), 7. Monitoring & Diagnostics (monitor), 8. Advanced Features (advanced) (+1 more)

### Community 65 - "profile.controller.ts"
Cohesion: 0.20
Nodes (9): BotModule, Module, TelegramLinkRow, mapProfile(), ProfileRow, FavoritesModule, Module, ProfileModule (+1 more)

### Community 66 - "users-admin.service.ts"
Cohesion: 0.24
Nodes (7): BAN_DURATIONS, BanDuration, ADMIN_PERM_KEYS, AdminPermKey, SetPermsDto, BAN_MS, IsObject

### Community 67 - "TelegramLinkService"
Cohesion: 0.17
Nodes (3): TelegramLinkService, Injectable, Post

### Community 68 - "deploy"
Cohesion: 0.25
Nodes (7): deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType, startCommand, $schema

### Community 69 - "Барс — Telegram-агент Teenage Space"
Cohesion: 0.22
Nodes (8): Барс — Telegram-агент Teenage Space, Деплой, Запуск локально, Как это соединено с остальным проектом, Переменные окружения, Проверить поиск без Telegram, Структура, Тесты

### Community 70 - "Supabase Postgres Best Practices"
Cohesion: 0.33
Nodes (5): How to Use, References, Rule Categories by Priority, Supabase Postgres Best Practices, When to Apply

### Community 71 - "ChatQueues"
Cohesion: 0.11
Nodes (11): ChatQueues, Any, Per-chat ordering, cross-chat parallelism. One worker per active chat means a…, Any, Process-wide singletons wired up at boot by main.py. Kept in one small module…, True when this chat just sent these exact words, and records them either way.…, Serialises conversation-state changes for one chat across *every* handler — the…, Drop idle locks so the map does not grow without bound. Called from the sweep. (+3 more)

### Community 72 - "_clean_due_date"
Cohesion: 0.11
Nodes (11): The LangGraph agent behind Барс., _clean_due_date(), _plan_horizon(), Any, date, The last day a step can sensibly fall on: registration closes, or failing that,…, Keep a step's deadline inside the window the event actually allows. A plan…, Plan dates and the consent gate on save_plan. (+3 more)

### Community 74 - "BotController"
Cohesion: 0.21
Nodes (8): BotController, Controller, Delete, Get, HttpCode, Query, SkipThrottle, UseGuards

### Community 75 - "admin.service.ts"
Cohesion: 0.14
Nodes (18): EducationTrackRow, EventRow, mapEducationTrack(), mapEvent(), mapMaterial(), mapNews(), mapSubmission(), mapSubmissionAdmin() (+10 more)

### Community 108 - "BarsQueryDto"
Cohesion: 0.20
Nodes (8): Get, Query, BarsQueryDto, IsInt, IsOptional, Max, Min, Type

### Community 109 - "smalltalk.py"
Cohesion: 0.40
Nodes (5): canned_reply(), normalise(), Answers that never need a model. "Спасибо" cost 1086 prompt tokens and five and…, Casefold, drop punctuation and emoji, collapse whitespace. Turns "СПАСИБО!!! 🙏"…, A ready answer when the whole message is a pleasantry, otherwise None.

### Community 110 - "public.get_user_capacity_stats"
Cohesion: 0.33
Nodes (5): public.profiles, public.traffic_events, public.traffic_sessions, public.get_user_capacity_stats(), auth.users

### Community 111 - "formatting.py"
Cohesion: 0.26
Nodes (11): event_keyboard(), plan_keyboard(), Any, Turning the model's answer into a Telegram message. The model never emits URLs…, Telegram rejects an entire message over one malformed button URL, which would…, render_plan(), _usable_url(), on_step() (+3 more)

### Community 112 - "CreateEducationTrackDto"
Cohesion: 0.40
Nodes (3): CreateEducationTrackDto, IsOptional, IsString

### Community 113 - "EducationController"
Cohesion: 0.27
Nodes (7): EducationController, CacheTTL, Controller, Get, Header, Param, UseInterceptors

### Community 115 - "test_retrieval.py"
Cohesion: 0.14
Nodes (7): find_by_title(), Resolve a query that names an event, tolerating typos and ignoring the age…, Retrieval: what the age filter hides, and how a named event is found anyway.…, The rendered string the model actually reads., TestFindByTitle, TestIsOpen, TestSearchEventsTool

### Community 118 - "CreateMaterialDto"
Cohesion: 0.29
Nodes (5): CreateMaterialDto, IsArray, IsInt, IsOptional, IsString

### Community 124 - "catalog.py"
Cohesion: 0.12
Nodes (24): age_requirement(), availability(), availability_line(), bishkek_now(), bishkek_today(), Catalog, deadline_in_days(), is_open() (+16 more)

### Community 125 - "BarsAdminController"
Cohesion: 0.20
Nodes (6): BarsAdminController, Body, Controller, Param, UseGuards, Put

### Community 126 - "bars-admin.service.ts"
Cohesion: 0.20
Nodes (9): ChatListRow, CreditRow, DailyUsageRow, MessageRow, ModelPrice, SummaryRow, ToolRow, TopChatRow (+1 more)

### Community 127 - "bot.controller.ts"
Cohesion: 0.36
Nodes (8): ConfirmLinkDto, TelegramIdBodyDto, TelegramIdQueryDto, IsInt, IsOptional, IsString, MaxLength, Type

### Community 128 - "age_fits"
Cohesion: 0.39
Nodes (3): age_fits(), Whether a participant of this age is inside the event's stated range.…, TestAgeFits

### Community 130 - "traffic.service.ts"
Cohesion: 0.27
Nodes (5): DEVICE_TYPES, DEVICE_TYPES, TARGET_TYPES, DEVICE_TYPES, TRACK_THROTTLE

### Community 131 - "UpdateEventDto"
Cohesion: 0.22
Nodes (9): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min (+1 more)

### Community 132 - "Settings"
Cohesion: 0.22
Nodes (6): BaseSettings, Railway injects RAILWAY_PUBLIC_DOMAIN; a custom domain overrides it via env., Settings, pool(), AsyncConnectionPool, RuntimeError

### Community 133 - "process"
Cohesion: 0.25
Nodes (9): _finish_reason(), get_usage_metadata_callback(), Job, _keep_typing(), _NoUsageCallback, process(), AIMessage, One turn of the conversation. Runs inside the chat's own queue worker. (+1 more)

### Community 134 - "UpdateMaterialDto"
Cohesion: 0.29
Nodes (5): IsArray, IsInt, IsOptional, IsString, UpdateMaterialDto

### Community 135 - "truncate_to_last_complete_line"
Cohesion: 0.39
Nodes (3): Cut a budget-truncated answer back to its last complete thought. The model…, truncate_to_last_complete_line(), TestTruncateToLastCompleteLine

### Community 136 - "BotAuthGuard"
Cohesion: 0.40
Nodes (3): BotAuthGuard, secretsMatch(), Injectable

### Community 137 - ".toggleFavorite"
Cohesion: 0.50
Nodes (3): Body, Param, Post

## Knowledge Gaps
- **317 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+312 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 783 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SupabaseService` connect `SupabaseService` to `BarsAdminService`, `traffic.service.ts`, `NewsController`, `events.service.ts`, `CurrentUser`, `TrafficService`, `ratings.controller.ts`, `supabase-auth.guard.ts`, `UsersAdminService`, `CapacityService`, `ProfileController`, `TrafficAdminService`, `BotService`, `AdminService`, `profile.controller.ts`, `users-admin.service.ts`, `TelegramLinkService`, `admin.service.ts`, `bars-admin.service.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `CurrentUser` to `profile.controller.ts`, `TelegramLinkService`, `SupabaseService`, `ratings.controller.ts`, `BotService`, `supabase-auth.guard.ts`, `UsersAdminService`, `UpdateProfileDto`, `ProfileController`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `useAuth()` connect `useAuth` to `AuthContext.tsx`, `types.ts`, `AdminPage.tsx`, `constants.ts`, `useEducation.ts`, `GridPage.tsx`, `UsersManager.tsx`, `AuthPage`, `UserAccountPage.tsx`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _317 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AuthContext.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10606060606060606 - nodes in this community are weakly interconnected._
- **Should `20260828103623_traffic_analytics.sql` be split into smaller, more focused modules?**
  _Cohesion score 0.0797979797979798 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._