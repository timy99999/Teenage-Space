# Graph Report - Teenage Space  (2026-09-27)

## Corpus Check
- 277 files · ~92,156 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2056 nodes · 4059 edges · 148 communities (92 shown, 49 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 104 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c4a6d19e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- types.ts
- useUI
- 20260828103623_traffic_analytics.sql
- dependencies
- Platform Description (Privacy Policy Section 1)
- CurrentUser
- frontend/package.json
- formatting.py
- events.service.ts
- submissions.service.ts
- traffic.service.ts
- test_smalltalk.py
- ratings.controller.ts
- compilerOptions
- compilerOptions
- backend/package.json
- supabase-auth.guard.ts
- PrivacyPage.tsx
- execute
- app.module.ts
- agent.py
- AuthPage
- UsersAdminService
- devDependencies
- conftest.py
- handlers.py
- useEvents.ts
- AdminService
- UpdateSubmissionDto
- CapacityService
- bot.service.ts
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
- filter_tool_calls
- get_settings
- plans.py
- constants.ts
- DateField.tsx
- GridPage.tsx
- EducationController
- Supabase
- AdminController
- deploy
- NewsController
- system_prompt
- AuthController
- TestCannedReply
- Changelog
- Changelog
- Writing Guidelines for Postgres References
- test_grounding.py
- ChatQueues
- ApiClient
- admin.service.ts
- Section Definitions
- mappers.ts
- useAuth
- bot.controller.ts
- deploy
- Барс — Telegram-агент Teenage Space
- Supabase Postgres Best Practices
- Runtime
- _clean_due_date
- bars
- HealthController
- test_agent.py
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
- UpdateEventDto
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
- catalog.py
- SupabaseService
- AdminPage.tsx
- App.tsx
- search
- CreateSubmissionDto
- SubmissionsController
- _prior_turns
- CreateMaterialDto
- BottomNav.tsx
- smalltalk.py
- UserAccountPage.tsx
- deadline.ts
- UpdateMaterialDto
- TestSearchEventsTool
- _recent_history

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 77 edges
2. `SupabaseService` - 46 edges
3. `useUI()` - 39 edges
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

## Communities (148 total, 49 thin omitted)

### Community 0 - "types.ts"
Cohesion: 0.11
Nodes (28): BannedGate(), periodText(), AuthContext, AuthContextValue, api, authHeader(), reportNetworkTrouble(), request() (+20 more)

### Community 1 - "useUI"
Cohesion: 0.08
Nodes (25): ProfilePage, PublishPage, CardSizeSlider(), ImageUploadField(), onPick(), ImageUploadFieldProps, NetTroubleToast(), ShareButton() (+17 more)

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
Cohesion: 0.07
Nodes (25): CurrentProfile, CurrentUser, TelegramLinkRow, TelegramLinkService, Injectable, mapProfile(), ProfileRow, ProfileController (+17 more)

### Community 6 - "frontend/package.json"
Cohesion: 0.06
Nodes (30): dependencies, react, react-dom, react-helmet-async, react-router-dom, @supabase/supabase-js, devDependencies, @types/react (+22 more)

### Community 7 - "formatting.py"
Cohesion: 0.10
Nodes (19): chunks(), event_ids(), event_keyboard(), plan_keyboard(), Any, Turning the model's answer into a Telegram message. The model never emits URLs…, Cut a budget-truncated answer back to its last complete thought. The model…, Split on paragraph boundaries so a long answer never breaks mid-tag. (+11 more)

### Community 8 - "events.service.ts"
Cohesion: 0.08
Nodes (25): EventRow, EventsController, CacheTTL, Controller, Get, Header, Param, Query (+17 more)

### Community 9 - "submissions.service.ts"
Cohesion: 0.23
Nodes (7): mapSubmission(), mapSubmissionAdmin(), KgPhone, normalizeKgPhone(), whatsappLink(), SubmissionsService, Injectable

### Community 10 - "traffic.service.ts"
Cohesion: 0.06
Nodes (40): DEVICE_TYPES, HeartbeatDto, IsBoolean, IsIn, IsUUID, DEVICE_TYPES, TARGET_TYPES, TrackCardViewDto (+32 more)

### Community 11 - "test_smalltalk.py"
Cohesion: 0.17
Nodes (10): availability(), availability_line(), Catalog, Any, How many open events sit in each catalogue category, zeros included. The zeros…, The one-line catalogue census handed to the model on every turn., fixture, Canned answers: what gets intercepted, and — more importantly — what must not.… (+2 more)

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
Cohesion: 0.09
Nodes (21): BAN_DURATIONS, BanDuration, ADMIN_PERM_KEYS, AdminPermKey, SetPermsDto, SetRoleDto, IsIn, BAN_MS (+13 more)

### Community 17 - "PrivacyPage.tsx"
Cohesion: 0.33
Nodes (4): PrivacyPage, Block, Section, SECTIONS

### Community 18 - "execute"
Cohesion: 0.15
Nodes (23): _clip(), log_turn(), Quality-control journal and token accounting for Барс. Two bot-owned tables…, Fold this turn's Gemini token counts into the daily rollup. `usage_by_model` is…, Book a catalogue re-embed against the system chat, for the balance estimate., Drop journalled turns past the retention window. Called from sessions.sweep()., Append one exchange — the user's line and the assistant's — to the journal.…, record_embedding_usage() (+15 more)

### Community 19 - "app.module.ts"
Cohesion: 0.11
Nodes (22): AdminModule, Module, AppModule, Module, AuthModule, Module, BarsModule, Module (+14 more)

### Community 20 - "agent.py"
Cohesion: 0.19
Nodes (13): build_graph(), _call_signature(), _calls_this_turn(), _chat_model(), GuardVerdict, AsyncConnectionPool, BaseModel, The graph itself: guard -> agent -> tools -> agent -> end, with a finalize… (+5 more)

### Community 21 - "AuthPage"
Cohesion: 0.06
Nodes (39): App(), onLogout(), ErrorBoundary, Props, State, onAccept(), AuthProvider(), checkBanStatus() (+31 more)

### Community 22 - "UsersAdminService"
Cohesion: 0.11
Nodes (18): BanUserDto, IsIn, IsOptional, IsString, MaxLength, Body, Controller, Get (+10 more)

### Community 23 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, @nestjs/cli, @types/express, @types/node, typescript, typescript, @nestjs/cli, @types/express (+1 more)

### Community 24 - "conftest.py"
Cohesion: 0.15
Nodes (16): clear_cache(), clear_search_cache(), _event(), events(), fake_catalog(), FakeCatalog, no_vector_search(), Any (+8 more)

### Community 25 - "handlers.py"
Cohesion: 0.11
Nodes (39): api(), ApiError, _age_from(), chat_context(), _finish_reason(), get_usage_metadata_callback(), help_command(), Job (+31 more)

### Community 26 - "useEvents.ts"
Cohesion: 0.19
Nodes (15): buildQuery(), EventFilters, useEvents(), withRetries(), useNews(), useNewsItem(), CacheEntry, getCached() (+7 more)

### Community 27 - "AdminService"
Cohesion: 0.19
Nodes (5): Get, Query, AdminService, Inject, Injectable

### Community 28 - "UpdateSubmissionDto"
Cohesion: 0.20
Nodes (9): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min (+1 more)

### Community 29 - "CapacityService"
Cohesion: 0.22
Nodes (6): CapacityController, Controller, Get, UseGuards, CapacityService, Injectable

### Community 30 - "bot.service.ts"
Cohesion: 0.11
Nodes (10): BotService, Injectable, FavoritesController, Controller, Get, Param, Post, UseGuards (+2 more)

### Community 31 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 32 - "tools.py"
Cohesion: 0.18
Nodes (19): _ctx(), get_event(), link_hint(), PlanStep, BaseModel, What Барс can actually do. Every tool is read-only against the catalogue or…, Показать полную карточку одного мероприятия по его id., Сохранить план подготовки к мероприятию и включить напоминания. Вызывай ТОЛЬКО… (+11 more)

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
Cohesion: 0.08
Nodes (37): AnalyticsPage, BarsPage, BarChart(), BarChartProps, setBarsCredit(), useBarsAnalytics(), useBarsChat(), useBarsChats() (+29 more)

### Community 41 - "SupabaseAuthGuard"
Cohesion: 0.36
Nodes (3): SupabaseAuthGuard, Inject, Injectable

### Community 42 - "CreateEventDto"
Cohesion: 0.14
Nodes (12): deriveAgeLabel(), deriveShortDesc(), CreateEventDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional (+4 more)

### Community 43 - "filter_tool_calls"
Cohesion: 0.31
Nodes (6): filter_tool_calls(), AIMessage, Trim what the agent asked for down to what is actually worth running. Three…, call(), search(), TestFilterToolCalls

### Community 44 - "get_settings"
Cohesion: 0.08
Nodes (45): AsyncIOScheduler, BaseSettings, close_api(), Thin async client for the Teenage Space NestJS API. Public catalogue reads go…, get_settings(), All configuration in one place, loaded from the environment (or bot/.env…, Railway injects RAILWAY_PUBLIC_DOMAIN; a custom domain overrides it via env., Settings (+37 more)

### Community 45 - "plans.py"
Cohesion: 0.17
Nodes (23): fetch_all(), Any, One connection, one atomic unit, for a change that spans several statements.…, transaction(), site_url(), _add_reminder(), create_plan(), due_reminders() (+15 more)

### Community 46 - "constants.ts"
Cohesion: 0.09
Nodes (32): EditEventModalProps, CardMenu(), EventCard(), EventCardAdminActions, EventCardProps, instagramUrl(), EventDetails(), EventDetailsProps (+24 more)

### Community 47 - "DateField.tsx"
Cohesion: 0.36
Nodes (6): DateField(), handleTextChange(), DateFieldProps, displayToIso(), isoToDisplay(), maskDigitsAsDate()

### Community 48 - "GridPage.tsx"
Cohesion: 0.10
Nodes (24): FULL_DOT_COLORS, INLINE_DOT_COLORS, Loader(), Sidebar(), hasPerm(), CATEGORY_SEO, categoryJsonLd(), CategorySeo (+16 more)

### Community 49 - "EducationController"
Cohesion: 0.27
Nodes (7): EducationController, CacheTTL, Controller, Get, Header, Param, UseInterceptors

### Community 50 - "Supabase"
Cohesion: 0.11
Nodes (15): Fix suggestion, Source, What happened, Skill Feedback, Steps, Core Principles, Debugging, Making and Committing Schema Changes (+7 more)

### Community 51 - "AdminController"
Cohesion: 0.15
Nodes (7): AdminController, Controller, Delete, HttpCode, Param, Post, UseGuards

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

### Community 61 - "ChatQueues"
Cohesion: 0.24
Nodes (5): ChatQueues, Any, Per-chat ordering, cross-chat parallelism. One worker per active chat means a…, Process-wide singletons wired up at boot by main.py. Kept in one small module…, Queue

### Community 62 - "ApiClient"
Cohesion: 0.27
Nodes (3): ApiClient, Any, Full snapshot including archived rows — used by the embedding indexer.

### Community 63 - "admin.service.ts"
Cohesion: 0.16
Nodes (11): CreateEducationTrackDto, IsOptional, IsString, CreateNewsDto, IsOptional, IsString, IsOptional, IsString (+3 more)

### Community 64 - "Section Definitions"
Cohesion: 0.20
Nodes (9): 1. Query Performance (query), 2. Connection Management (conn), 3. Security & RLS (security), 4. Schema Design (schema), 5. Concurrency & Locking (lock), 6. Data Access Patterns (data), 7. Monitoring & Diagnostics (monitor), 8. Advanced Features (advanced) (+1 more)

### Community 65 - "mappers.ts"
Cohesion: 0.18
Nodes (11): EducationTrackRow, mapEducationTrack(), mapMaterial(), MaterialRow, SubmissionAdminRow, SubmissionRow, SubmitterInfo, EducationModule (+3 more)

### Community 66 - "useAuth"
Cohesion: 0.15
Nodes (24): AppLayout(), EventPage, NewsPage, EventModal(), NewsDetails(), NewsModal(), PolicyGate(), useAuth() (+16 more)

### Community 67 - "bot.controller.ts"
Cohesion: 0.10
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

### Community 74 - "HealthController"
Cohesion: 0.22
Nodes (6): HealthController, Controller, Get, SkipThrottle, HealthModule, Module

### Community 75 - "test_agent.py"
Cohesion: 0.27
Nodes (6): _collected_tool_output(), Everything the tools returned during the current turn, oldest first., tool_rounds_this_turn(), Graph discipline: what history the agent sees, and what tool calls it gets to…, TestCollectedToolOutput, TestToolRounds

### Community 108 - "bars-admin.service.ts"
Cohesion: 0.05
Nodes (35): BarsAdminController, Body, Controller, Get, Param, Query, UseGuards, BarsAdminService (+27 more)

### Community 109 - "UpdateEventDto"
Cohesion: 0.13
Nodes (11): Body, Patch, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 110 - "public.get_user_capacity_stats"
Cohesion: 0.33
Nodes (5): public.profiles, public.traffic_events, public.traffic_sessions, public.get_user_capacity_stats(), auth.users

### Community 112 - "sitemap.controller.ts"
Cohesion: 0.18
Nodes (10): SeoModule, Module, buildSitemapXml(), CATEGORY_KEYS, escapeXml(), SitemapController, Controller, Get (+2 more)

### Community 115 - "find_by_title"
Cohesion: 0.36
Nodes (4): find_by_title(), _normalise_title(), Resolve a query that names an event, tolerating typos and ignoring the age…, TestFindByTitle

### Community 128 - "retrieval.py"
Cohesion: 0.19
Nodes (16): age_requirement(), embedding_text(), How the event states its age rule, for telling a user why it doesn't fit., What gets embedded. Title and description carry most of the signal; category,…, age_mismatch_note(), describe(), _keyword_rank(), _order() (+8 more)

### Community 132 - "catalog.py"
Cohesion: 0.17
Nodes (15): age_fits(), bishkek_now(), bishkek_today(), deadline_in_days(), is_open(), matches(), parse_date(), date (+7 more)

### Community 133 - "SupabaseService"
Cohesion: 0.11
Nodes (13): BanStatusGuard, Injectable, StorageStatRow, UserStatRow, SupabaseModule, Module, SupabaseService, Injectable (+5 more)

### Community 134 - "AdminPage.tsx"
Cohesion: 0.06
Nodes (40): AdminPage, Chip(), ChipProps, EditEventModal(), save(), emptyPostForm(), eventToPostForm(), FORMATS (+32 more)

### Community 135 - "App.tsx"
Cohesion: 0.07
Nodes (40): ArticlePage, AuthPage, EditAccountPage, EducationIndex(), EducationPage, HomeGate(), NotFoundPage, SettingsPage (+32 more)

### Community 136 - "search"
Cohesion: 0.19
Nodes (8): _cache_key(), date, _ranked_ids(), What the catalogue has to say about one query. `matched` passes every filter.…, Vector ranking, or None when it is unavailable (empty index, API hiccup)., search(), SearchResult, TestSearchSplitsOnAge

### Community 137 - "CreateSubmissionDto"
Cohesion: 0.22
Nodes (9): CreateSubmissionDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max (+1 more)

### Community 138 - "SubmissionsController"
Cohesion: 0.22
Nodes (6): SubmissionsController, Body, Controller, Get, Post, UseGuards

### Community 139 - "_prior_turns"
Cohesion: 0.36
Nodes (5): _prior_turns(), Earlier turns, pruned to what was actually said: the question and the answer.…, a_turn(), One completed exchange, with its tool traffic in the middle., TestPriorTurns

### Community 140 - "CreateMaterialDto"
Cohesion: 0.33
Nodes (5): CreateMaterialDto, IsArray, IsInt, IsOptional, IsString

### Community 142 - "smalltalk.py"
Cohesion: 0.40
Nodes (5): canned_reply(), normalise(), Answers that never need a model. "Спасибо" cost 1086 prompt tokens and five and…, Casefold, drop punctuation and emoji, collapse whitespace. Turns "СПАСИБО!!! 🙏"…, A ready answer when the whole message is a pleasantry, otherwise None.

### Community 143 - "UserAccountPage.tsx"
Cohesion: 0.08
Nodes (22): UserAccountPage, UsersPage, BanModal(), BanModalProps, OPTIONS, ConfirmDialog(), ConfirmDialogProps, ROLE_BADGE (+14 more)

### Community 144 - "deadline.ts"
Cohesion: 1.00
Nodes (3): dateToUTCDay(), deadlineState, todayInBishkekUTCDay()

### Community 145 - "UpdateMaterialDto"
Cohesion: 0.33
Nodes (5): IsArray, IsInt, IsOptional, IsString, UpdateMaterialDto

### Community 147 - "_recent_history"
Cohesion: 0.40
Nodes (4): _current_turn(), From the last HumanMessage onward, verbatim -- a tool_call and its result must…, _recent_history(), TestRecentHistory

## Knowledge Gaps
- **335 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+330 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 806 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **49 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SupabaseService` connect `SupabaseService` to `CurrentUser`, `events.service.ts`, `submissions.service.ts`, `traffic.service.ts`, `ratings.controller.ts`, `supabase-auth.guard.ts`, `UsersAdminService`, `AdminService`, `CapacityService`, `bot.service.ts`, `traffic-admin.service.ts`, `SupabaseAuthGuard`, `NewsController`, `AuthController`, `admin.service.ts`, `mappers.ts`, `HealthController`, `bars-admin.service.ts`, `sitemap.controller.ts`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `CurrentUser` to `SupabaseService`, `submissions.service.ts`, `SubmissionsController`, `ratings.controller.ts`, `supabase-auth.guard.ts`, `UsersAdminService`, `AuthController`, `bot.service.ts`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `useAuth()` connect `useAuth` to `types.ts`, `useUI`, `AdminPage.tsx`, `App.tsx`, `AnalyticsPage.tsx`, `BottomNav.tsx`, `constants.ts`, `UserAccountPage.tsx`, `GridPage.tsx`, `AuthPage`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _335 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `useUI` be split into smaller, more focused modules?**
  _Cohesion score 0.0782051282051282 - nodes in this community are weakly interconnected._
- **Should `20260828103623_traffic_analytics.sql` be split into smaller, more focused modules?**
  _Cohesion score 0.0797979797979798 - nodes in this community are weakly interconnected._