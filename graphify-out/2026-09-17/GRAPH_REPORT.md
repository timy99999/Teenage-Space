# Graph Report - Teenage Space  (2026-09-16)

## Corpus Check
- 271 files · ~89,750 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2021 nodes · 3976 edges · 126 communities (79 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 104 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d4fa058a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useAuth
- useUI
- 20260828103623_traffic_analytics.sql
- dependencies
- Platform Description (Privacy Policy Section 1)
- SupabaseService
- frontend/package.json
- NewsController
- events.service.ts
- CreateSubmissionDto
- traffic.service.ts
- AdminPage.tsx
- ratings.controller.ts
- compilerOptions
- compilerOptions
- main.tsx
- supabase-auth.guard.ts
- App.tsx
- execute
- app.module.ts
- test_agent.py
- refreshProfile
- users-admin.service.ts
- AuthPage
- conftest.py
- handlers.py
- tracking.ts
- ChatQueues
- UpdateSubmissionDto
- CapacityService
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
- SupabaseAuthGuard
- plans.py
- constants.ts
- DateField.tsx
- GridPage.tsx
- CreateMaterialDto
- Supabase
- AdminService
- deploy
- UsersPage.tsx
- agent.py
- UpdateMaterialDto
- TestCannedReply
- Changelog
- Changelog
- Writing Guidelines for Postgres References
- TestGetEventOnAnUnknownId
- get_settings
- ApiClient
- admin.controller.ts
- Section Definitions
- EducationController
- HomePage.tsx
- bot.controller.ts
- deploy
- Барс — Telegram-агент Teenage Space
- Supabase Postgres Best Practices
- Runtime
- _clean_due_date
- bars
- CreateEducationTrackDto
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
- bars-admin.service.ts
- smalltalk.py
- public.get_user_capacity_stats
- sitemap.controller.ts
- 20260826150917_super_admin_and_capacity_stats.sql
- TestSearchEventsTool
- 20260828111013_card_unique_views.sql
- test_smalltalk.py
- search
- catalog.py
- Settings
- AuthController

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

## Communities (126 total, 40 thin omitted)

### Community 0 - "useAuth"
Cohesion: 0.07
Nodes (55): ProfilePage, PublishPage, BanModal(), BanModalProps, OPTIONS, BannedGate(), periodText(), ConfirmDialog() (+47 more)

### Community 1 - "useUI"
Cohesion: 0.09
Nodes (14): CardSizeSlider(), NetTroubleToast(), Toast(), Theme, UIContext, UIContextValue, useUI(), NET_TROUBLE_EVENT (+6 more)

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
Cohesion: 0.07
Nodes (20): BanStatusGuard, Injectable, TelegramLinkRow, StorageStatRow, UserStatRow, FavoritesService, Injectable, HealthController (+12 more)

### Community 6 - "frontend/package.json"
Cohesion: 0.06
Nodes (30): dependencies, react, react-dom, react-helmet-async, react-router-dom, @supabase/supabase-js, devDependencies, @types/react (+22 more)

### Community 7 - "NewsController"
Cohesion: 0.14
Nodes (12): mapNews(), NewsController, CacheTTL, Controller, Get, Header, Param, UseInterceptors (+4 more)

### Community 8 - "events.service.ts"
Cohesion: 0.09
Nodes (24): EventsController, CacheTTL, Controller, Get, Header, Param, Query, UseInterceptors (+16 more)

### Community 9 - "CreateSubmissionDto"
Cohesion: 0.11
Nodes (17): mapSubmission(), CreateSubmissionDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString (+9 more)

### Community 10 - "traffic.service.ts"
Cohesion: 0.06
Nodes (40): DEVICE_TYPES, HeartbeatDto, IsBoolean, IsIn, IsUUID, DEVICE_TYPES, TARGET_TYPES, TrackCardViewDto (+32 more)

### Community 11 - "AdminPage.tsx"
Cohesion: 0.07
Nodes (39): AdminPage, Chip(), ChipProps, EditEventModal(), save(), ImageUploadField(), onPick(), ImageUploadFieldProps (+31 more)

### Community 12 - "ratings.controller.ts"
Cohesion: 0.12
Nodes (14): RateEventDto, IsInt, Max, Min, RatingsController, Body, Controller, Param (+6 more)

### Community 13 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+12 more)

### Community 14 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, isolatedModules, jsx, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch (+12 more)

### Community 15 - "main.tsx"
Cohesion: 0.15
Nodes (6): App(), ErrorBoundary, Props, State, UIProvider(), initExternalAnalytics()

### Community 16 - "supabase-auth.guard.ts"
Cohesion: 0.13
Nodes (14): SetRoleDto, IsIn, AdminGuard, Injectable, PermissionGuard, Injectable, PERM_KEY, AuthedRequest (+6 more)

### Community 17 - "App.tsx"
Cohesion: 0.06
Nodes (50): ArticlePage, AuthPage, EditAccountPage, EducationIndex(), EducationPage, EventPage, HomeGate(), NewsPage (+42 more)

### Community 18 - "execute"
Cohesion: 0.15
Nodes (23): _clip(), log_turn(), Quality-control journal and token accounting for Барс. Two bot-owned tables…, Fold this turn's Gemini token counts into the daily rollup. `usage_by_model` is…, Book a catalogue re-embed against the system chat, for the balance estimate., Drop journalled turns past the retention window. Called from sessions.sweep()., Append one exchange — the user's line and the assistant's — to the journal.…, record_embedding_usage() (+15 more)

### Community 19 - "app.module.ts"
Cohesion: 0.11
Nodes (22): AdminModule, Module, AppModule, Module, AuthModule, Module, BarsModule, Module (+14 more)

### Community 20 - "test_agent.py"
Cohesion: 0.10
Nodes (23): _call_signature(), _calls_this_turn(), _collected_tool_output(), _current_turn(), filter_tool_calls(), _prior_turns(), AIMessage, Trim what the agent asked for down to what is actually worth running. Three… (+15 more)

### Community 21 - "refreshProfile"
Cohesion: 0.11
Nodes (21): onLogout(), onAccept(), AuthProvider(), checkBanStatus(), hasPerm(), refreshProfile(), signOut(), isActiveBan() (+13 more)

### Community 22 - "users-admin.service.ts"
Cohesion: 0.08
Nodes (26): BAN_DURATIONS, BanDuration, BanUserDto, IsIn, IsOptional, IsString, MaxLength, ADMIN_PERM_KEYS (+18 more)

### Community 23 - "AuthPage"
Cohesion: 0.28
Nodes (14): AuthPage(), finishSignIn(), onForgot1(), onForgot2(), onForgot3(), onLogin(), onPrimary(), onReg1() (+6 more)

### Community 24 - "conftest.py"
Cohesion: 0.15
Nodes (16): clear_cache(), clear_search_cache(), _event(), events(), fake_catalog(), FakeCatalog, no_vector_search(), Any (+8 more)

### Community 25 - "handlers.py"
Cohesion: 0.11
Nodes (37): api(), ApiError, chat_context(), _finish_reason(), get_usage_metadata_callback(), help_command(), Job, _keep_typing() (+29 more)

### Community 26 - "tracking.ts"
Cohesion: 0.24
Nodes (11): AppLayout(), useHeartbeat(), EXCLUDED_PREFIXES, useTrackPageView(), base(), DeviceType, getDeviceType(), getSessionId() (+3 more)

### Community 27 - "ChatQueues"
Cohesion: 0.24
Nodes (5): ChatQueues, Any, Per-chat ordering, cross-chat parallelism. One worker per active chat means a…, Process-wide singletons wired up at boot by main.py. Kept in one small module…, Queue

### Community 28 - "UpdateSubmissionDto"
Cohesion: 0.20
Nodes (9): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min (+1 more)

### Community 29 - "CapacityService"
Cohesion: 0.22
Nodes (6): CapacityController, Controller, Get, UseGuards, CapacityService, Injectable

### Community 30 - "CurrentUser"
Cohesion: 0.06
Nodes (28): CurrentUser, TelegramLinkService, Injectable, mapProfile(), FavoritesController, Controller, Get, UseGuards (+20 more)

### Community 31 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 32 - "tools.py"
Cohesion: 0.12
Nodes (24): _ctx(), get_event(), link_hint(), PlanStep, BaseModel, What Барс can actually do. Every tool is read-only against the catalogue or…, Показать полную карточку одного мероприятия по его id., Сохранить план подготовки к мероприятию и включить напоминания. Вызывай ТОЛЬКО… (+16 more)

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
Cohesion: 0.16
Nodes (16): embedding_text(), What gets embedded. Title and description carry most of the signal; category,…, describe(), find_by_title(), _keyword_rank(), _normalise_title(), _order(), Any (+8 more)

### Community 42 - "CreateEventDto"
Cohesion: 0.15
Nodes (12): Body, deriveAgeLabel(), deriveShortDesc(), CreateEventDto, IsArray, IsBoolean, IsIn, IsInt (+4 more)

### Community 43 - "formatting.py"
Cohesion: 0.10
Nodes (19): chunks(), event_ids(), event_keyboard(), plan_keyboard(), Any, Turning the model's answer into a Telegram message. The model never emits URLs…, Cut a budget-truncated answer back to its last complete thought. The model…, Split on paragraph boundaries so a long answer never breaks mid-tag. (+11 more)

### Community 44 - "SupabaseAuthGuard"
Cohesion: 0.31
Nodes (4): jwtExpiryMs(), SupabaseAuthGuard, Inject, Injectable

### Community 45 - "plans.py"
Cohesion: 0.17
Nodes (23): fetch_all(), Any, One connection, one atomic unit, for a change that spans several statements.…, transaction(), site_url(), _add_reminder(), create_plan(), due_reminders() (+15 more)

### Community 46 - "constants.ts"
Cohesion: 0.10
Nodes (33): EditEventModalProps, CardMenu(), EventCard(), EventCardAdminActions, EventCardProps, instagramUrl(), EventDetails(), EventDetailsProps (+25 more)

### Community 47 - "DateField.tsx"
Cohesion: 0.36
Nodes (6): DateField(), handleTextChange(), DateFieldProps, displayToIso(), isoToDisplay(), maskDigitsAsDate()

### Community 48 - "GridPage.tsx"
Cohesion: 0.13
Nodes (17): FULL_DOT_COLORS, INLINE_DOT_COLORS, Loader(), Sidebar(), NAV_CATS, useDebouncedValue(), cardViewKey(), useCardViewCounts() (+9 more)

### Community 49 - "CreateMaterialDto"
Cohesion: 0.29
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

### Community 53 - "UsersPage.tsx"
Cohesion: 0.20
Nodes (7): UsersPage, UsersManager(), useAdmins(), AdminsTab(), TabKey, TABS, UsersPage()

### Community 54 - "agent.py"
Cohesion: 0.10
Nodes (17): build_graph(), _chat_model(), GuardVerdict, AsyncConnectionPool, BaseModel, The graph itself: guard -> agent -> tools -> agent -> end, with a finalize…, _router_model(), BarsState (+9 more)

### Community 55 - "UpdateMaterialDto"
Cohesion: 0.15
Nodes (9): Patch, IsOptional, IsString, UpdateEducationTrackDto, IsArray, IsInt, IsOptional, IsString (+1 more)

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

### Community 61 - "get_settings"
Cohesion: 0.11
Nodes (38): AsyncIOScheduler, close_api(), Thin async client for the Teenage Space NestJS API. Public catalogue reads go…, get_settings(), All configuration in one place, loaded from the environment (or bot/.env…, clean_dsn(), close_pool(), init_pool() (+30 more)

### Community 62 - "ApiClient"
Cohesion: 0.27
Nodes (3): ApiClient, Any, Full snapshot including archived rows — used by the embedding indexer.

### Community 63 - "admin.controller.ts"
Cohesion: 0.15
Nodes (14): CreateNewsDto, IsOptional, IsString, IsArray, IsBoolean, IsIn, IsInt, IsOptional (+6 more)

### Community 64 - "Section Definitions"
Cohesion: 0.20
Nodes (9): 1. Query Performance (query), 2. Connection Management (conn), 3. Security & RLS (security), 4. Schema Design (schema), 5. Concurrency & Locking (lock), 6. Data Access Patterns (data), 7. Monitoring & Diagnostics (monitor), 8. Advanced Features (advanced) (+1 more)

### Community 65 - "EducationController"
Cohesion: 0.15
Nodes (11): EducationController, CacheTTL, Controller, Get, Header, Param, UseInterceptors, EducationModule (+3 more)

### Community 66 - "HomePage.tsx"
Cohesion: 0.18
Nodes (11): CATN, iconProps, ORBIT_ITEMS, Floater, iconProps, ORBIT_FLOATERS, WANDER_FLOATERS, Nodes (+3 more)

### Community 67 - "bot.controller.ts"
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

### Community 74 - "CreateEducationTrackDto"
Cohesion: 0.40
Nodes (3): CreateEducationTrackDto, IsOptional, IsString

### Community 75 - "admin.service.ts"
Cohesion: 0.22
Nodes (14): EducationTrackRow, EventRow, mapEducationTrack(), mapEvent(), mapMaterial(), mapSubmissionAdmin(), MaterialRow, NewsRow (+6 more)

### Community 108 - "bars-admin.service.ts"
Cohesion: 0.05
Nodes (35): BarsAdminController, Body, Controller, Get, Param, Query, UseGuards, BarsAdminService (+27 more)

### Community 109 - "smalltalk.py"
Cohesion: 0.40
Nodes (5): canned_reply(), normalise(), Answers that never need a model. "Спасибо" cost 1086 prompt tokens and five and…, Casefold, drop punctuation and emoji, collapse whitespace. Turns "СПАСИБО!!! 🙏"…, A ready answer when the whole message is a pleasantry, otherwise None.

### Community 110 - "public.get_user_capacity_stats"
Cohesion: 0.33
Nodes (5): public.profiles, public.traffic_events, public.traffic_sessions, public.get_user_capacity_stats(), auth.users

### Community 112 - "sitemap.controller.ts"
Cohesion: 0.19
Nodes (9): SeoModule, Module, buildSitemapXml(), escapeXml(), SitemapController, Controller, Get, Header (+1 more)

### Community 124 - "test_smalltalk.py"
Cohesion: 0.19
Nodes (9): availability(), availability_line(), How many open events sit in each catalogue category, zeros included. The zeros…, The one-line catalogue census handed to the model on every turn., Барс — the Teenage Space event agent for Telegram., fixture, Canned answers: what gets intercepted, and — more importantly — what must not.…, reset_rotation() (+1 more)

### Community 127 - "search"
Cohesion: 0.19
Nodes (8): _cache_key(), date, _ranked_ids(), What the catalogue has to say about one query. `matched` passes every filter.…, Vector ranking, or None when it is unavailable (empty index, API hiccup)., search(), SearchResult, TestSearchSplitsOnAge

### Community 128 - "catalog.py"
Cohesion: 0.12
Nodes (21): age_fits(), age_requirement(), bishkek_now(), bishkek_today(), Catalog, deadline_in_days(), is_open(), matches() (+13 more)

### Community 132 - "Settings"
Cohesion: 0.22
Nodes (6): BaseSettings, Railway injects RAILWAY_PUBLIC_DOMAIN; a custom domain overrides it via env., Settings, pool(), AsyncConnectionPool, RuntimeError

### Community 133 - "AuthController"
Cohesion: 0.25
Nodes (6): AuthController, Controller, Get, Query, Throttle, UseGuards

## Knowledge Gaps
- **323 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+318 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 794 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SupabaseService` connect `SupabaseService` to `EducationController`, `AuthController`, `NewsController`, `events.service.ts`, `CreateSubmissionDto`, `traffic-admin.service.ts`, `admin.service.ts`, `SupabaseAuthGuard`, `bars-admin.service.ts`, `ratings.controller.ts`, `traffic.service.ts`, `supabase-auth.guard.ts`, `sitemap.controller.ts`, `AdminService`, `users-admin.service.ts`, `CapacityService`, `CurrentUser`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `CurrentUser` to `bot.controller.ts`, `SupabaseService`, `AuthController`, `CreateSubmissionDto`, `ratings.controller.ts`, `supabase-auth.guard.ts`, `users-admin.service.ts`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `AdminController` connect `AdminService` to `CreateEducationTrackDto`, `CreateEventDto`, `CreateMaterialDto`, `app.module.ts`, `UpdateMaterialDto`, `UpdateSubmissionDto`, `admin.controller.ts`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _323 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useAuth` be split into smaller, more focused modules?**
  _Cohesion score 0.06569133677567413 - nodes in this community are weakly interconnected._
- **Should `useUI` be split into smaller, more focused modules?**
  _Cohesion score 0.0873015873015873 - nodes in this community are weakly interconnected._
- **Should `20260828103623_traffic_analytics.sql` be split into smaller, more focused modules?**
  _Cohesion score 0.0797979797979798 - nodes in this community are weakly interconnected._