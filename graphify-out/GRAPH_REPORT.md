# Graph Report - Teenage Space  (2026-09-27)

## Corpus Check
- 274 files · ~91,489 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2044 nodes · 4022 edges · 139 communities (83 shown, 49 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 104 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `757c5894`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- agent.py
- useUI
- 20260828103623_traffic_analytics.sql
- dependencies
- Platform Description (Privacy Policy Section 1)
- CurrentUser
- frontend/package.json
- _prior_turns
- events.service.ts
- mappers.ts
- traffic.service.ts
- users-admin.service.ts
- ratings.controller.ts
- compilerOptions
- compilerOptions
- backend/package.json
- supabase-auth.guard.ts
- PrivacyPage.tsx
- execute
- app.module.ts
- test_agent.py
- AuthPage
- UsersAdminService
- devDependencies
- conftest.py
- handlers.py
- useAuth
- ChatQueues
- UpdateSubmissionDto
- CapacityService
- profile.controller.ts
- nest-cli.json
- tools.py
- tsconfig.build.json
- HTML Entry Point (index.html)
- vite-env.d.ts
- vercel.json
- Graphify Query Workflow
- traffic-admin.service.ts
- AnalyticsPage.tsx
- SupabaseAuthGuard
- CreateEventDto
- test_smalltalk.py
- indexer.py
- plans.py
- HomePage.tsx
- DateField.tsx
- GridPage.tsx
- CreateMaterialDto
- Supabase
- AdminService
- deploy
- NewsController
- system_prompt
- AuthController
- TestCannedReply
- Changelog
- Changelog
- Writing Guidelines for Postgres References
- test_grounding.py
- get_settings
- ApiClient
- admin.service.ts
- Section Definitions
- education.service.ts
- TestSearchEventsTool
- TelegramLinkService
- deploy
- Барс — Telegram-агент Teenage Space
- Supabase Postgres Best Practices
- Runtime
- _clean_due_date
- bars
- UpdateMaterialDto
- types.ts
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
- bars-admin.service.ts
- CreateEducationTrackDto
- public.get_user_capacity_stats
- class-transformer
- sitemap.controller.ts
- class-validator
- 20260826150917_super_admin_and_capacity_stats.sql
- find_by_title
- 20260828111013_card_unique_views.sql
- compression
- helmet
- @nestjs/cache-manager
- @nestjs/common
- @nestjs/config
- retrieval.py
- @nestjs/core
- @nestjs/schedule
- rxjs
- tool_rounds_this_turn
- SupabaseService
- AdminPage.tsx
- App.tsx
- search
- ErrorBoundary
- UserAccountPage.tsx

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 77 edges
2. `SupabaseService` - 46 edges
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

## Communities (139 total, 49 thin omitted)

### Community 0 - "agent.py"
Cohesion: 0.17
Nodes (15): availability_line(), The one-line catalogue census handed to the model on every turn., build_graph(), _call_signature(), _calls_this_turn(), _chat_model(), GuardVerdict, AsyncConnectionPool (+7 more)

### Community 1 - "useUI"
Cohesion: 0.10
Nodes (18): App(), CardSizeSlider(), ImageUploadField(), onPick(), ImageUploadFieldProps, NetTroubleToast(), Toast(), Theme (+10 more)

### Community 2 - "20260828103623_traffic_analytics.sql"
Cohesion: 0.08
Nodes (39): auth, education_tracks, events, favorites, materials, news, profiles, ratings (+31 more)

### Community 3 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, cache-manager, @nestjs/platform-express, @nestjs/throttler, reflect-metadata, @supabase/supabase-js, @types/compression, @supabase/supabase-js (+5 more)

### Community 4 - "Platform Description (Privacy Policy Section 1)"
Cohesion: 0.08
Nodes (33): Auto-Push Working Agreement, Backend Build Job, Build Check Workflow, Frontend Build Job, Check Required Secrets Step, Link Project Step, Migrate Job, Push Migrations Step (+25 more)

### Community 5 - "CurrentUser"
Cohesion: 0.08
Nodes (19): CurrentProfile, CurrentUser, FavoritesController, Controller, Get, Param, Post, UseGuards (+11 more)

### Community 6 - "frontend/package.json"
Cohesion: 0.06
Nodes (30): dependencies, react, react-dom, react-helmet-async, react-router-dom, @supabase/supabase-js, devDependencies, @types/react (+22 more)

### Community 7 - "_prior_turns"
Cohesion: 0.21
Nodes (9): _current_turn(), _prior_turns(), Earlier turns, pruned to what was actually said: the question and the answer.…, From the last HumanMessage onward, verbatim -- a tool_call and its result must…, _recent_history(), a_turn(), One completed exchange, with its tool traffic in the middle., TestPriorTurns (+1 more)

### Community 8 - "events.service.ts"
Cohesion: 0.08
Nodes (26): EventRow, mapEvent(), EventsController, CacheTTL, Controller, Get, Header, Param (+18 more)

### Community 9 - "mappers.ts"
Cohesion: 0.11
Nodes (21): mapSubmission(), mapSubmissionAdmin(), SubmissionAdminRow, SubmissionRow, SubmitterInfo, KgPhone, normalizeKgPhone(), whatsappLink() (+13 more)

### Community 10 - "traffic.service.ts"
Cohesion: 0.06
Nodes (40): DEVICE_TYPES, HeartbeatDto, IsBoolean, IsIn, IsUUID, DEVICE_TYPES, TARGET_TYPES, TrackCardViewDto (+32 more)

### Community 11 - "users-admin.service.ts"
Cohesion: 0.15
Nodes (13): BAN_DURATIONS, BanDuration, BanUserDto, IsIn, IsOptional, IsString, MaxLength, ADMIN_PERM_KEYS (+5 more)

### Community 12 - "ratings.controller.ts"
Cohesion: 0.11
Nodes (13): RateEventDto, IsInt, Max, Min, RatingsController, Body, Controller, Get (+5 more)

### Community 13 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+12 more)

### Community 14 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, isolatedModules, jsx, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch (+12 more)

### Community 15 - "backend/package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, start, start:dev, start:prod, version

### Community 16 - "supabase-auth.guard.ts"
Cohesion: 0.13
Nodes (13): SetRoleDto, IsIn, AdminGuard, Injectable, PermissionGuard, Injectable, PERM_KEY, AuthedRequest (+5 more)

### Community 17 - "PrivacyPage.tsx"
Cohesion: 0.33
Nodes (4): PrivacyPage, Block, Section, SECTIONS

### Community 18 - "execute"
Cohesion: 0.14
Nodes (24): _clip(), log_turn(), Quality-control journal and token accounting for Барс. Two bot-owned tables…, Fold this turn's Gemini token counts into the daily rollup. `usage_by_model` is…, Book a catalogue re-embed against the system chat, for the balance estimate., Drop journalled turns past the retention window. Called from sessions.sweep()., Append one exchange — the user's line and the assistant's — to the journal.…, record_embedding_usage() (+16 more)

### Community 19 - "app.module.ts"
Cohesion: 0.11
Nodes (22): AdminModule, Module, AppModule, Module, AuthModule, Module, BarsModule, Module (+14 more)

### Community 20 - "test_agent.py"
Cohesion: 0.20
Nodes (10): _collected_tool_output(), filter_tool_calls(), AIMessage, Trim what the agent asked for down to what is actually worth running. Three…, Everything the tools returned during the current turn, oldest first., call(), Graph discipline: what history the agent sees, and what tool calls it gets to…, search() (+2 more)

### Community 21 - "AuthPage"
Cohesion: 0.09
Nodes (32): onAccept(), AuthProvider(), checkBanStatus(), refreshProfile(), signOut(), isActiveBan(), AuthPage(), finishSignIn() (+24 more)

### Community 22 - "UsersAdminService"
Cohesion: 0.14
Nodes (13): Body, Controller, Get, Param, Patch, Post, UseGuards, UsersAdminController (+5 more)

### Community 23 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, @nestjs/cli, @types/express, @types/node, typescript, typescript, @nestjs/cli, @types/express (+1 more)

### Community 24 - "conftest.py"
Cohesion: 0.15
Nodes (16): clear_cache(), clear_search_cache(), _event(), events(), fake_catalog(), FakeCatalog, no_vector_search(), Any (+8 more)

### Community 25 - "handlers.py"
Cohesion: 0.05
Nodes (63): ApiError, chunks(), event_ids(), event_keyboard(), plan_keyboard(), Any, Turning the model's answer into a Telegram message. The model never emits URLs…, Cut a budget-truncated answer back to its last complete thought. The model… (+55 more)

### Community 26 - "useAuth"
Cohesion: 0.11
Nodes (35): AppLayout(), NewsPage, EventModal(), NewsDetails(), NewsModal(), useAuth(), buildQuery(), EventFilters (+27 more)

### Community 27 - "ChatQueues"
Cohesion: 0.24
Nodes (5): ChatQueues, Any, Per-chat ordering, cross-chat parallelism. One worker per active chat means a…, Process-wide singletons wired up at boot by main.py. Kept in one small module…, Queue

### Community 28 - "UpdateSubmissionDto"
Cohesion: 0.15
Nodes (11): Body, Patch, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 29 - "CapacityService"
Cohesion: 0.22
Nodes (6): CapacityController, Controller, Get, UseGuards, CapacityService, Injectable

### Community 30 - "profile.controller.ts"
Cohesion: 0.15
Nodes (12): mapProfile(), Body, Patch, assertCooldownElapsed(), ProfileService, Injectable, IsBoolean, IsIn (+4 more)

### Community 31 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 32 - "tools.py"
Cohesion: 0.15
Nodes (23): _ctx(), get_event(), link_hint(), PlanStep, BaseModel, What Барс can actually do. Every tool is read-only against the catalogue or…, Показать полную карточку одного мероприятия по его id., Сохранить план подготовки к мероприятию и включить напоминания. Вызывай ТОЛЬКО… (+15 more)

### Community 33 - "tsconfig.build.json"
Cohesion: 0.33
Nodes (5): exclude, extends, dist, node_modules, ./tsconfig.json

### Community 34 - "HTML Entry Point (index.html)"
Cohesion: 0.50
Nodes (5): Google Fonts Integration, HTML Entry Point (index.html), SEO / Open Graph Meta Tags, TS Logo Mark (Favicon), TS Logo Mark (Source Asset)

### Community 36 - "vercel.json"
Cohesion: 0.50
Nodes (3): headers, redirects, rewrites

### Community 39 - "traffic-admin.service.ts"
Cohesion: 0.08
Nodes (20): TrafficQueryDto, IsInt, IsOptional, Max, Min, Type, TrafficAdminController, Controller (+12 more)

### Community 40 - "AnalyticsPage.tsx"
Cohesion: 0.12
Nodes (24): AnalyticsPage, BarChart(), BarChartProps, setBarsCredit(), useBarsAnalytics(), useCapacity(), useTrafficOnline(), useTrafficSummary() (+16 more)

### Community 41 - "SupabaseAuthGuard"
Cohesion: 0.31
Nodes (4): jwtExpiryMs(), SupabaseAuthGuard, Inject, Injectable

### Community 42 - "CreateEventDto"
Cohesion: 0.15
Nodes (11): deriveAgeLabel(), deriveShortDesc(), CreateEventDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional (+3 more)

### Community 43 - "test_smalltalk.py"
Cohesion: 0.24
Nodes (6): availability(), How many open events sit in each catalogue category, zeros included. The zeros…, fixture, Canned answers: what gets intercepted, and — more importantly — what must not.…, reset_rotation(), TestAvailability

### Community 44 - "indexer.py"
Cohesion: 0.13
Nodes (17): api(), Catalog, fetch_all(), pgvector accepts its text form, so no extra type-registration dependency is…, to_vector_literal(), embed_documents(), embed_query(), _embedder() (+9 more)

### Community 45 - "plans.py"
Cohesion: 0.19
Nodes (20): One connection, one atomic unit, for a change that spans several statements.…, transaction(), _add_reminder(), create_plan(), due_reminders(), _fire_at(), get_plan(), mark_failed() (+12 more)

### Community 46 - "HomePage.tsx"
Cohesion: 0.07
Nodes (42): CardMenu(), EventCard(), EventCardAdminActions, instagramUrl(), EventDetails(), instagramUrl(), telegramUrl(), EventPhoto() (+34 more)

### Community 47 - "DateField.tsx"
Cohesion: 0.36
Nodes (6): DateField(), handleTextChange(), DateFieldProps, displayToIso(), isoToDisplay(), maskDigitsAsDate()

### Community 48 - "GridPage.tsx"
Cohesion: 0.08
Nodes (28): ProfilePage, Chip(), ChipProps, ConfirmDialog(), ConfirmDialogProps, FULL_DOT_COLORS, INLINE_DOT_COLORS, Loader() (+20 more)

### Community 49 - "CreateMaterialDto"
Cohesion: 0.33
Nodes (5): CreateMaterialDto, IsArray, IsInt, IsOptional, IsString

### Community 50 - "Supabase"
Cohesion: 0.11
Nodes (15): Fix suggestion, Source, What happened, Skill Feedback, Steps, Core Principles, Debugging, Making and Committing Schema Changes (+7 more)

### Community 51 - "AdminService"
Cohesion: 0.10
Nodes (12): AdminController, Controller, Delete, Get, HttpCode, Param, Post, Query (+4 more)

### Community 52 - "deploy"
Cohesion: 0.29
Nodes (6): deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType, $schema

### Community 53 - "NewsController"
Cohesion: 0.13
Nodes (13): mapNews(), NewsRow, NewsController, CacheTTL, Controller, Get, Header, Param (+5 more)

### Community 54 - "system_prompt"
Cohesion: 0.19
Nodes (5): The agent's system message. The category and theme *vocabularies* used to be…, system_prompt(), The census must inform the model, never licence it to answer without tools., TestCensusWording, TestPrompts

### Community 55 - "AuthController"
Cohesion: 0.25
Nodes (6): AuthController, Controller, Get, Query, Throttle, UseGuards

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

### Community 60 - "test_grounding.py"
Cohesion: 0.15
Nodes (5): Барс: who he is, and the hard rules that keep him useful. The persona is…, Guards against the bot naming an event the catalogue does not contain.…, TestGetEventOnAClosedEvent, TestGetEventOnAnUnknownId, TestSearchNeverSurfacesClosedEvents

### Community 61 - "get_settings"
Cohesion: 0.10
Nodes (33): AsyncIOScheduler, BaseSettings, close_api(), Thin async client for the Teenage Space NestJS API. Public catalogue reads go…, get_settings(), All configuration in one place, loaded from the environment (or bot/.env…, Railway injects RAILWAY_PUBLIC_DOMAIN; a custom domain overrides it via env., Settings (+25 more)

### Community 62 - "ApiClient"
Cohesion: 0.27
Nodes (3): ApiClient, Any, Full snapshot including archived rows — used by the embedding indexer.

### Community 63 - "admin.service.ts"
Cohesion: 0.12
Nodes (17): CreateNewsDto, IsOptional, IsString, IsOptional, IsString, UpdateEducationTrackDto, IsArray, IsBoolean (+9 more)

### Community 64 - "Section Definitions"
Cohesion: 0.20
Nodes (9): 1. Query Performance (query), 2. Connection Management (conn), 3. Security & RLS (security), 4. Schema Design (schema), 5. Concurrency & Locking (lock), 6. Data Access Patterns (data), 7. Monitoring & Diagnostics (monitor), 8. Advanced Features (advanced) (+1 more)

### Community 65 - "education.service.ts"
Cohesion: 0.13
Nodes (15): EducationTrackRow, mapEducationTrack(), mapMaterial(), MaterialRow, EducationController, CacheTTL, Controller, Get (+7 more)

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

### Community 74 - "UpdateMaterialDto"
Cohesion: 0.33
Nodes (5): IsArray, IsInt, IsOptional, IsString, UpdateMaterialDto

### Community 75 - "types.ts"
Cohesion: 0.09
Nodes (39): BarsPage, AuthContext, AuthContextValue, useBarsChat(), useBarsChats(), api, authHeader(), reportNetworkTrouble() (+31 more)

### Community 108 - "bars-admin.service.ts"
Cohesion: 0.05
Nodes (35): BarsAdminController, Body, Controller, Get, Param, Query, UseGuards, BarsAdminService (+27 more)

### Community 109 - "CreateEducationTrackDto"
Cohesion: 0.50
Nodes (3): CreateEducationTrackDto, IsOptional, IsString

### Community 110 - "public.get_user_capacity_stats"
Cohesion: 0.33
Nodes (5): public.profiles, public.traffic_events, public.traffic_sessions, public.get_user_capacity_stats(), auth.users

### Community 112 - "sitemap.controller.ts"
Cohesion: 0.18
Nodes (10): SeoModule, Module, buildSitemapXml(), CATEGORY_KEYS, escapeXml(), SitemapController, Controller, Get (+2 more)

### Community 115 - "find_by_title"
Cohesion: 0.23
Nodes (8): find_by_title(), _keyword_rank(), _normalise_title(), _order(), Any, Resolve a query that names an event, tolerating typos and ignoring the age…, Fallback used before the first index run and if Gemini is unreachable. Crude on…, TestFindByTitle

### Community 128 - "retrieval.py"
Cohesion: 0.13
Nodes (24): age_fits(), age_requirement(), bishkek_now(), bishkek_today(), deadline_in_days(), embedding_text(), is_open(), matches() (+16 more)

### Community 133 - "SupabaseService"
Cohesion: 0.07
Nodes (22): BanStatusGuard, Injectable, TelegramLinkRow, StorageStatRow, UserStatRow, FavoritesService, Injectable, HealthController (+14 more)

### Community 134 - "AdminPage.tsx"
Cohesion: 0.06
Nodes (45): AdminPage, PublishPage, EditEventModal(), save(), EditEventModalProps, EventCardProps, EventDetailsProps, emptyPostForm() (+37 more)

### Community 135 - "App.tsx"
Cohesion: 0.06
Nodes (36): ArticlePage, AuthPage, EditAccountPage, EducationIndex(), EducationPage, EventPage, HomeGate(), NotFoundPage (+28 more)

### Community 136 - "search"
Cohesion: 0.23
Nodes (6): _cache_key(), date, What the catalogue has to say about one query. `matched` passes every filter.…, search(), SearchResult, TestSearchSplitsOnAge

### Community 137 - "ErrorBoundary"
Cohesion: 0.22
Nodes (3): ErrorBoundary, Props, State

### Community 143 - "UserAccountPage.tsx"
Cohesion: 0.08
Nodes (20): UserAccountPage, UsersPage, BanModal(), BanModalProps, OPTIONS, ROLE_BADGE, UsersManager(), UsersManagerProps (+12 more)

## Knowledge Gaps
- **333 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+328 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 804 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **49 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SupabaseService` connect `SupabaseService` to `events.service.ts`, `mappers.ts`, `traffic.service.ts`, `users-admin.service.ts`, `ratings.controller.ts`, `supabase-auth.guard.ts`, `UsersAdminService`, `CapacityService`, `profile.controller.ts`, `traffic-admin.service.ts`, `SupabaseAuthGuard`, `AdminService`, `NewsController`, `AuthController`, `admin.service.ts`, `education.service.ts`, `TelegramLinkService`, `bars-admin.service.ts`, `sitemap.controller.ts`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `CurrentUser` to `SupabaseService`, `mappers.ts`, `ratings.controller.ts`, `supabase-auth.guard.ts`, `UsersAdminService`, `AuthController`, `profile.controller.ts`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `useAuth()` connect `useAuth` to `useUI`, `AdminPage.tsx`, `App.tsx`, `AnalyticsPage.tsx`, `types.ts`, `HomePage.tsx`, `UserAccountPage.tsx`, `GridPage.tsx`, `AuthPage`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _333 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useUI` be split into smaller, more focused modules?**
  _Cohesion score 0.10098522167487685 - nodes in this community are weakly interconnected._
- **Should `20260828103623_traffic_analytics.sql` be split into smaller, more focused modules?**
  _Cohesion score 0.0797979797979798 - nodes in this community are weakly interconnected._
- **Should `Platform Description (Privacy Policy Section 1)` be split into smaller, more focused modules?**
  _Cohesion score 0.08143939393939394 - nodes in this community are weakly interconnected._