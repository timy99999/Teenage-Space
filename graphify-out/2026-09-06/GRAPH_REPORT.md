# Graph Report - Teenage Space  (2026-09-06)

## Corpus Check
- 259 files · ~85,535 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1959 nodes · 3829 edges · 130 communities (84 shown, 39 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 103 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8e594e62`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- types.ts
- bars-admin.service.ts
- 20260828103623_traffic_analytics.sql
- dependencies
- Platform Description (Privacy Policy Section 1)
- SupabaseService
- frontend/package.json
- news.service.ts
- events.service.ts
- mappers.ts
- traffic.service.ts
- AdminPage.tsx
- ratings.controller.ts
- compilerOptions
- compilerOptions
- SupabaseAuthGuard
- supabase-auth.guard.ts
- App.tsx
- execute
- app.module.ts
- agent.py
- refreshProfile
- UsersAdminController
- profile.controller.ts
- conftest.py
- handlers.py
- useEvents.ts
- get_settings
- UpdateSubmissionDto
- capacity.controller.ts
- CurrentUser
- nest-cli.json
- tools.py
- tsconfig.build.json
- HTML Entry Point (index.html)
- vite-env.d.ts
- vercel.json
- Graphify Query Workflow
- traffic-admin.service.ts
- AnalyticsPage.tsx
- retrieval.py
- CreateEventDto
- formatting.py
- bars-admin.controller.ts
- plans.py
- constants.ts
- FavoritesService
- useAuth
- AdminService
- Supabase
- AdminController
- deploy
- UserAccountPage.tsx
- system_prompt
- Body
- TestCannedReply
- Changelog
- Changelog
- Writing Guidelines for Postgres References
- ErrorBoundary
- indexer.py
- ApiClient
- admin.service.ts
- Section Definitions
- HealthController
- users-admin.service.ts
- TelegramLinkService
- deploy
- Барс — Telegram-агент Teenage Space
- Supabase Postgres Best Practices
- Runtime
- _clean_due_date
- bars
- AuthPage
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
- UsersAdminService
- smalltalk.py
- public.get_user_capacity_stats
- AuthController
- CreateEducationTrackDto
- tracking.ts
- 20260826150917_super_admin_and_capacity_stats.sql
- test_retrieval.py
- 20260828111013_card_unique_views.sql
- CreateMaterialDto
- catalog.py
- search
- ChatQueues
- SubmissionsController
- age_fits
- TestGetEventOnAnUnknownId

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

## Communities (130 total, 39 thin omitted)

### Community 0 - "types.ts"
Cohesion: 0.10
Nodes (31): ProfilePage, AuthContext, AuthContextValue, api, authHeader(), reportNetworkTrouble(), request(), anonKey (+23 more)

### Community 1 - "bars-admin.service.ts"
Cohesion: 0.08
Nodes (20): BarsAdminController, Body, Controller, Get, Param, Query, UseGuards, BarsAdminService (+12 more)

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
Cohesion: 0.11
Nodes (12): Inject, BanStatusGuard, Injectable, SupabaseModule, Module, SupabaseService, Injectable, TrafficCleanupService (+4 more)

### Community 6 - "frontend/package.json"
Cohesion: 0.07
Nodes (28): dependencies, react, react-dom, react-router-dom, @supabase/supabase-js, devDependencies, @types/react, @types/react-dom (+20 more)

### Community 7 - "news.service.ts"
Cohesion: 0.14
Nodes (12): mapNews(), NewsRow, NewsController, CacheTTL, Controller, Get, Header, UseInterceptors (+4 more)

### Community 8 - "events.service.ts"
Cohesion: 0.09
Nodes (21): EventRow, EventsController, CacheTTL, Controller, Get, Header, Param, Query (+13 more)

### Community 9 - "mappers.ts"
Cohesion: 0.13
Nodes (19): mapSubmission(), mapSubmissionAdmin(), SubmissionAdminRow, SubmissionRow, SubmitterInfo, KgPhone, normalizeKgPhone(), whatsappLink() (+11 more)

### Community 10 - "traffic.service.ts"
Cohesion: 0.06
Nodes (40): DEVICE_TYPES, HeartbeatDto, IsBoolean, IsIn, IsUUID, DEVICE_TYPES, TARGET_TYPES, TrackCardViewDto (+32 more)

### Community 11 - "AdminPage.tsx"
Cohesion: 0.05
Nodes (54): AdminPage, PublishPage, Chip(), ChipProps, ConfirmDialog(), ConfirmDialogProps, EditEventModal(), save() (+46 more)

### Community 12 - "ratings.controller.ts"
Cohesion: 0.12
Nodes (14): RateEventDto, IsInt, Max, Min, RatingsController, Body, Controller, Param (+6 more)

### Community 13 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+12 more)

### Community 14 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, isolatedModules, jsx, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch (+12 more)

### Community 15 - "SupabaseAuthGuard"
Cohesion: 0.31
Nodes (4): jwtExpiryMs(), SupabaseAuthGuard, Inject, Injectable

### Community 16 - "supabase-auth.guard.ts"
Cohesion: 0.14
Nodes (13): AdminGuard, Injectable, PermissionGuard, Injectable, PERM_KEY, RequirePerm(), AuthedRequest, CachedProfile (+5 more)

### Community 17 - "App.tsx"
Cohesion: 0.08
Nodes (26): ArticlePage, AuthPage, EditAccountPage, EducationIndex(), EducationPage, HomeGate(), PrivacyPage, SettingsPage (+18 more)

### Community 18 - "execute"
Cohesion: 0.13
Nodes (25): _clip(), log_turn(), Quality-control journal and token accounting for Барс. Two bot-owned tables…, Fold this turn's Gemini token counts into the daily rollup. `usage_by_model` is…, Book a catalogue re-embed against the system chat, for the balance estimate., Drop journalled turns past the retention window. Called from sessions.sweep()., Append one exchange — the user's line and the assistant's — to the journal.…, record_embedding_usage() (+17 more)

### Community 19 - "app.module.ts"
Cohesion: 0.13
Nodes (18): AdminModule, Module, AppModule, Module, AuthModule, Module, BarsModule, Module (+10 more)

### Community 20 - "agent.py"
Cohesion: 0.08
Nodes (34): build_graph(), _call_signature(), _calls_this_turn(), _chat_model(), _collected_tool_output(), _current_turn(), filter_tool_calls(), GuardVerdict (+26 more)

### Community 21 - "refreshProfile"
Cohesion: 0.12
Nodes (20): onLogout(), PolicyGate(), onAccept(), AuthProvider(), checkBanStatus(), refreshProfile(), signOut(), isActiveBan() (+12 more)

### Community 22 - "UsersAdminController"
Cohesion: 0.20
Nodes (10): SetRoleDto, IsIn, Body, Controller, Get, Param, Patch, Post (+2 more)

### Community 23 - "profile.controller.ts"
Cohesion: 0.14
Nodes (14): TelegramLinkRow, mapProfile(), ProfileRow, Body, Patch, assertCooldownElapsed(), ProfileService, Injectable (+6 more)

### Community 24 - "conftest.py"
Cohesion: 0.15
Nodes (16): clear_cache(), clear_search_cache(), _event(), events(), fake_catalog(), FakeCatalog, no_vector_search(), Any (+8 more)

### Community 25 - "handlers.py"
Cohesion: 0.10
Nodes (40): api(), ApiError, render_plan(), _age_from(), chat_context(), _finish_reason(), get_usage_metadata_callback(), help_command() (+32 more)

### Community 26 - "useEvents.ts"
Cohesion: 0.21
Nodes (13): buildQuery(), EventFilters, useEvents(), useNews(), CacheEntry, getCached(), getEntry(), getOrFetch() (+5 more)

### Community 27 - "get_settings"
Cohesion: 0.09
Nodes (33): AsyncIOScheduler, BaseSettings, close_api(), Thin async client for the Teenage Space NestJS API. Public catalogue reads go…, get_settings(), All configuration in one place, loaded from the environment (or bot/.env…, Railway injects RAILWAY_PUBLIC_DOMAIN; a custom domain overrides it via env., Settings (+25 more)

### Community 28 - "UpdateSubmissionDto"
Cohesion: 0.20
Nodes (9): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min (+1 more)

### Community 29 - "capacity.controller.ts"
Cohesion: 0.16
Nodes (10): CapacityController, Controller, Get, UseGuards, CapacityModule, Module, CapacityService, StorageStatRow (+2 more)

### Community 30 - "CurrentUser"
Cohesion: 0.11
Nodes (12): CurrentUser, Get, Param, Post, ProfileController, Controller, Delete, Get (+4 more)

### Community 31 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 32 - "tools.py"
Cohesion: 0.13
Nodes (22): _ctx(), get_event(), link_hint(), PlanStep, BaseModel, What Барс can actually do. Every tool is read-only against the catalogue or…, Показать полную карточку одного мероприятия по его id., Сохранить план подготовки к мероприятию и включить напоминания. Вызывай ТОЛЬКО… (+14 more)

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
Cohesion: 0.08
Nodes (34): AnalyticsPage, BarsPage, BarChart(), BarChartProps, setBarsCredit(), useBarsAnalytics(), useBarsChat(), useBarsChats() (+26 more)

### Community 41 - "retrieval.py"
Cohesion: 0.19
Nodes (16): age_requirement(), embedding_text(), How the event states its age rule, for telling a user why it doesn't fit., What gets embedded. Title and description carry most of the signal; category,…, age_mismatch_note(), describe(), _keyword_rank(), _order() (+8 more)

### Community 42 - "CreateEventDto"
Cohesion: 0.18
Nodes (9): CreateEventDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max (+1 more)

### Community 43 - "formatting.py"
Cohesion: 0.10
Nodes (18): chunks(), event_ids(), event_keyboard(), plan_keyboard(), Any, Turning the model's answer into a Telegram message. The model never emits URLs…, Cut a budget-truncated answer back to its last complete thought. The model…, Split on paragraph boundaries so a long answer never breaks mid-tag. (+10 more)

### Community 44 - "bars-admin.controller.ts"
Cohesion: 0.12
Nodes (15): BarsCreditDto, IsOptional, IsString, Max, MaxLength, Min, Type, BarsQueryDto (+7 more)

### Community 45 - "plans.py"
Cohesion: 0.18
Nodes (21): One connection, one atomic unit, for a change that spans several statements.…, transaction(), site_url(), _add_reminder(), create_plan(), due_reminders(), _fire_at(), get_plan() (+13 more)

### Community 46 - "constants.ts"
Cohesion: 0.08
Nodes (39): CardMenu(), EventCard(), EventCardAdminActions, instagramUrl(), EventModal(), instagramUrl(), telegramUrl(), EventPhoto() (+31 more)

### Community 47 - "FavoritesService"
Cohesion: 0.25
Nodes (5): FavoritesController, Controller, UseGuards, FavoritesService, Injectable

### Community 48 - "useAuth"
Cohesion: 0.12
Nodes (25): App(), CardSizeSlider(), NetTroubleToast(), Toast(), hasPerm(), useAuth(), Theme, UIContext (+17 more)

### Community 49 - "AdminService"
Cohesion: 0.18
Nodes (7): Get, Query, AdminService, deriveAgeLabel(), deriveShortDesc(), Injectable, mapEvent()

### Community 50 - "Supabase"
Cohesion: 0.11
Nodes (15): Fix suggestion, Source, What happened, Skill Feedback, Steps, Core Principles, Debugging, Making and Committing Schema Changes (+7 more)

### Community 51 - "AdminController"
Cohesion: 0.15
Nodes (7): AdminController, Controller, Delete, HttpCode, Param, Post, UseGuards

### Community 52 - "deploy"
Cohesion: 0.29
Nodes (6): deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType, $schema

### Community 53 - "UserAccountPage.tsx"
Cohesion: 0.08
Nodes (20): UserAccountPage, UsersPage, BanModal(), BanModalProps, OPTIONS, ROLE_BADGE, UsersManager(), UsersManagerProps (+12 more)

### Community 54 - "system_prompt"
Cohesion: 0.16
Nodes (6): Барс: who he is, and the hard rules that keep him useful. The persona is…, The agent's system message. The category and theme *vocabularies* used to be…, system_prompt(), The census must inform the model, never licence it to answer without tools., TestCensusWording, TestPrompts

### Community 55 - "Body"
Cohesion: 0.15
Nodes (10): Body, Patch, IsOptional, IsString, UpdateEducationTrackDto, IsArray, IsInt, IsOptional (+2 more)

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

### Community 61 - "indexer.py"
Cohesion: 0.20
Nodes (14): fetch_all(), pgvector accepts its text form, so no extra type-registration dependency is…, to_vector_literal(), embed_documents(), embed_query(), _embedder(), Gemini embeddings, wrapped so the rest of the code never touches the SDK…, task_type defaults to RETRIEVAL_QUERY here, RETRIEVAL_DOCUMENT below —… (+6 more)

### Community 62 - "ApiClient"
Cohesion: 0.33
Nodes (3): ApiClient, Any, Full snapshot including archived rows — used by the embedding indexer.

### Community 63 - "admin.service.ts"
Cohesion: 0.15
Nodes (14): CreateNewsDto, IsOptional, IsString, IsArray, IsBoolean, IsIn, IsInt, IsOptional (+6 more)

### Community 64 - "Section Definitions"
Cohesion: 0.20
Nodes (9): 1. Query Performance (query), 2. Connection Management (conn), 3. Security & RLS (security), 4. Schema Design (schema), 5. Concurrency & Locking (lock), 6. Data Access Patterns (data), 7. Monitoring & Diagnostics (monitor), 8. Advanced Features (advanced) (+1 more)

### Community 65 - "HealthController"
Cohesion: 0.22
Nodes (6): HealthController, Controller, Get, SkipThrottle, HealthModule, Module

### Community 66 - "users-admin.service.ts"
Cohesion: 0.16
Nodes (12): BAN_DURATIONS, BanDuration, BanUserDto, IsIn, IsOptional, IsString, MaxLength, ADMIN_PERM_KEYS (+4 more)

### Community 67 - "TelegramLinkService"
Cohesion: 0.07
Nodes (26): BotAuthGuard, secretsMatch(), Injectable, BotController, Body, Controller, Delete, Get (+18 more)

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

### Community 74 - "AuthPage"
Cohesion: 0.28
Nodes (14): AuthPage(), finishSignIn(), onForgot1(), onForgot2(), onForgot3(), onLogin(), onPrimary(), onReg1() (+6 more)

### Community 75 - "education.service.ts"
Cohesion: 0.13
Nodes (15): EducationTrackRow, mapEducationTrack(), mapMaterial(), MaterialRow, EducationController, CacheTTL, Controller, Get (+7 more)

### Community 108 - "UsersAdminService"
Cohesion: 0.25
Nodes (4): Inject, Injectable, UsersAdminService, mapAdminUser()

### Community 109 - "smalltalk.py"
Cohesion: 0.40
Nodes (5): canned_reply(), normalise(), Answers that never need a model. "Спасибо" cost 1086 prompt tokens and five and…, Casefold, drop punctuation and emoji, collapse whitespace. Turns "СПАСИБО!!! 🙏"…, A ready answer when the whole message is a pleasantry, otherwise None.

### Community 110 - "public.get_user_capacity_stats"
Cohesion: 0.33
Nodes (5): public.profiles, public.traffic_events, public.traffic_sessions, public.get_user_capacity_stats(), auth.users

### Community 111 - "AuthController"
Cohesion: 0.25
Nodes (6): AuthController, Controller, Get, Query, Throttle, UseGuards

### Community 112 - "CreateEducationTrackDto"
Cohesion: 0.50
Nodes (3): CreateEducationTrackDto, IsOptional, IsString

### Community 113 - "tracking.ts"
Cohesion: 0.24
Nodes (11): AppLayout(), useHeartbeat(), EXCLUDED_PREFIXES, useTrackPageView(), base(), DeviceType, getDeviceType(), getSessionId() (+3 more)

### Community 115 - "test_retrieval.py"
Cohesion: 0.16
Nodes (7): find_by_title(), _normalise_title(), Resolve a query that names an event, tolerating typos and ignoring the age…, Retrieval: what the age filter hides, and how a named event is found anyway.…, The rendered string the model actually reads., TestFindByTitle, TestSearchEventsTool

### Community 118 - "CreateMaterialDto"
Cohesion: 0.33
Nodes (5): CreateMaterialDto, IsArray, IsInt, IsOptional, IsString

### Community 124 - "catalog.py"
Cohesion: 0.13
Nodes (21): availability(), availability_line(), bishkek_now(), bishkek_today(), Catalog, deadline_in_days(), is_open(), matches() (+13 more)

### Community 125 - "search"
Cohesion: 0.23
Nodes (6): _cache_key(), date, What the catalogue has to say about one query. `matched` passes every filter.…, search(), SearchResult, TestSearchSplitsOnAge

### Community 126 - "ChatQueues"
Cohesion: 0.24
Nodes (5): ChatQueues, Any, Per-chat ordering, cross-chat parallelism. One worker per active chat means a…, Process-wide singletons wired up at boot by main.py. Kept in one small module…, Queue

### Community 127 - "SubmissionsController"
Cohesion: 0.22
Nodes (6): SubmissionsController, Body, Controller, Get, Post, UseGuards

### Community 128 - "age_fits"
Cohesion: 0.39
Nodes (3): age_fits(), Whether a participant of this age is inside the event's stated range.…, TestAgeFits

## Knowledge Gaps
- **313 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+308 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 777 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SupabaseService` connect `SupabaseService` to `bars-admin.service.ts`, `news.service.ts`, `events.service.ts`, `mappers.ts`, `traffic.service.ts`, `ratings.controller.ts`, `SupabaseAuthGuard`, `supabase-auth.guard.ts`, `profile.controller.ts`, `capacity.controller.ts`, `traffic-admin.service.ts`, `FavoritesService`, `admin.service.ts`, `HealthController`, `users-admin.service.ts`, `TelegramLinkService`, `education.service.ts`, `UsersAdminService`, `AuthController`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `CurrentUser` to `SupabaseService`, `mappers.ts`, `ratings.controller.ts`, `FavoritesService`, `supabase-auth.guard.ts`, `AuthController`, `UsersAdminController`, `profile.controller.ts`, `SubmissionsController`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `useAuth()` connect `useAuth` to `types.ts`, `AnalyticsPage.tsx`, `AuthPage`, `AdminPage.tsx`, `constants.ts`, `App.tsx`, `tracking.ts`, `UserAccountPage.tsx`, `refreshProfile`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _313 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09929078014184398 - nodes in this community are weakly interconnected._
- **Should `bars-admin.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07777777777777778 - nodes in this community are weakly interconnected._
- **Should `20260828103623_traffic_analytics.sql` be split into smaller, more focused modules?**
  _Cohesion score 0.0797979797979798 - nodes in this community are weakly interconnected._