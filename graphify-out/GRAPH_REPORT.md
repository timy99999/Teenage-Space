# Graph Report - Teenage Space  (2026-09-05)

## Corpus Check
- 258 files · ~85,147 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1954 nodes · 3816 edges · 125 communities (79 shown, 39 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 103 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7b252b61`
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
- EventsService
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
- AuthPage
- users-admin.controller.ts
- PrivacyPage.tsx
- conftest.py
- handlers.py
- useEducation.ts
- get_settings
- UpdateSubmissionDto
- CapacityService
- CurrentUser
- nest-cli.json
- test_grounding.py
- tsconfig.build.json
- HTML Entry Point (index.html)
- vite-env.d.ts
- vercel.json
- Graphify Query Workflow
- traffic-admin.service.ts
- AnalyticsPage.tsx
- tools.py
- CreateEventDto
- truncate_to_last_complete_line
- filter_tool_calls
- plans.py
- constants.ts
- FavoritesController
- GridPage.tsx
- HomePage.tsx
- Supabase
- AdminService
- deploy
- useAuth
- system_prompt
- Body
- TestCannedReply
- Changelog
- Changelog
- Writing Guidelines for Postgres References
- ErrorBoundary
- test_agent.py
- ApiClient
- admin.service.ts
- Section Definitions
- HealthController
- FakeCatalog
- TelegramLinkService
- deploy
- Барс — Telegram-агент Teenage Space
- Supabase Postgres Best Practices
- ChatQueues
- _clean_due_date
- bars
- _prior_turns
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
- TrafficCleanupService
- smalltalk.py
- public.get_user_capacity_stats
- AuthController
- CreateEducationTrackDto
- _recent_history
- 20260826150917_super_admin_and_capacity_stats.sql
- TestSearchEventsTool
- 20260828111013_card_unique_views.sql
- CreateMaterialDto
- catalog.py

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

## Communities (125 total, 39 thin omitted)

### Community 0 - "types.ts"
Cohesion: 0.09
Nodes (35): AuthPage, ProfilePage, SettingsPage, AuthContext, AuthContextValue, useSubmissions(), api, authHeader() (+27 more)

### Community 1 - "bars-admin.service.ts"
Cohesion: 0.05
Nodes (35): BarsAdminController, Body, Controller, Get, Param, Query, UseGuards, BarsAdminService (+27 more)

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
Cohesion: 0.14
Nodes (10): BanStatusGuard, Injectable, TelegramLinkRow, FavoritesService, Injectable, SupabaseModule, Module, SupabaseService (+2 more)

### Community 6 - "frontend/package.json"
Cohesion: 0.07
Nodes (28): dependencies, react, react-dom, react-router-dom, @supabase/supabase-js, devDependencies, @types/react, @types/react-dom (+20 more)

### Community 7 - "news.service.ts"
Cohesion: 0.14
Nodes (12): mapNews(), NewsRow, NewsController, CacheTTL, Controller, Get, Header, UseInterceptors (+4 more)

### Community 8 - "EventsService"
Cohesion: 0.09
Nodes (20): EventsController, CacheTTL, Controller, Get, Header, Param, Query, UseInterceptors (+12 more)

### Community 9 - "mappers.ts"
Cohesion: 0.08
Nodes (26): EventRow, mapSubmission(), mapSubmissionAdmin(), SubmissionAdminRow, SubmissionRow, SubmitterInfo, KgPhone, normalizeKgPhone() (+18 more)

### Community 10 - "traffic.service.ts"
Cohesion: 0.06
Nodes (40): DEVICE_TYPES, HeartbeatDto, IsBoolean, IsIn, IsUUID, DEVICE_TYPES, TARGET_TYPES, TrackCardViewDto (+32 more)

### Community 11 - "AdminPage.tsx"
Cohesion: 0.05
Nodes (48): Chip(), ChipProps, EditEventModal(), save(), EditEventModalProps, EventCardProps, ImageUploadField(), onPick() (+40 more)

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
Cohesion: 0.18
Nodes (9): AdminGuard, Injectable, AuthedRequest, CachedProfile, RequestProfile, CurrentProfile, SuperAdminGuard, Injectable (+1 more)

### Community 17 - "App.tsx"
Cohesion: 0.08
Nodes (19): AdminPage, App(), EducationIndex(), EducationPage, HomeGate(), PublishPage, UsersPage, BannedGate() (+11 more)

### Community 18 - "execute"
Cohesion: 0.12
Nodes (26): _clip(), log_turn(), Quality-control journal and token accounting for Барс. Two bot-owned tables…, Fold this turn's Gemini token counts into the daily rollup. `usage_by_model` is…, Book a catalogue re-embed against the system chat, for the balance estimate., Drop journalled turns past the retention window. Called from sessions.sweep()., Append one exchange — the user's line and the assistant's — to the journal.…, record_embedding_usage() (+18 more)

### Community 19 - "app.module.ts"
Cohesion: 0.12
Nodes (20): AdminModule, Module, AppModule, Module, AuthModule, Module, BarsModule, Module (+12 more)

### Community 20 - "agent.py"
Cohesion: 0.19
Nodes (13): build_graph(), _call_signature(), _calls_this_turn(), _chat_model(), GuardVerdict, AsyncConnectionPool, BaseModel, The graph itself: guard -> agent -> tools -> agent -> end, with a finalize… (+5 more)

### Community 21 - "AuthPage"
Cohesion: 0.09
Nodes (29): onLogout(), onAccept(), checkBanStatus(), refreshProfile(), signOut(), isActiveBan(), AuthPage(), finishSignIn() (+21 more)

### Community 22 - "users-admin.controller.ts"
Cohesion: 0.07
Nodes (31): BAN_DURATIONS, BanDuration, BanUserDto, IsIn, IsOptional, IsString, MaxLength, ADMIN_PERM_KEYS (+23 more)

### Community 23 - "PrivacyPage.tsx"
Cohesion: 0.33
Nodes (4): PrivacyPage, Block, Section, SECTIONS

### Community 24 - "conftest.py"
Cohesion: 0.27
Nodes (9): clear_cache(), clear_search_cache(), fake_catalog(), no_vector_search(), fixture, Shared fixtures. Nothing here touches the network, Postgres or Telegram. The…, Force retrieval down its keyword-ranking fallback. Ranking order is not what…, The retrieval TTL cache is process-global; a stale entry would leak between… (+1 more)

### Community 25 - "handlers.py"
Cohesion: 0.08
Nodes (49): api(), ApiError, event_ids(), event_keyboard(), plan_keyboard(), Any, Turning the model's answer into a Telegram message. The model never emits URLs…, Referenced ids, in the order the model mentioned them, deduplicated. (+41 more)

### Community 26 - "useEducation.ts"
Cohesion: 0.14
Nodes (23): ArticlePage, Sidebar(), NAV_CATS, EducationData, useArticle(), useEducation(), useEducationTracks(), buildQuery() (+15 more)

### Community 27 - "get_settings"
Cohesion: 0.07
Nodes (48): AsyncIOScheduler, BaseSettings, close_api(), Thin async client for the Teenage Space NestJS API. Public catalogue reads go…, get_settings(), All configuration in one place, loaded from the environment (or bot/.env…, Railway injects RAILWAY_PUBLIC_DOMAIN; a custom domain overrides it via env., Settings (+40 more)

### Community 28 - "UpdateSubmissionDto"
Cohesion: 0.20
Nodes (9): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min (+1 more)

### Community 29 - "CapacityService"
Cohesion: 0.16
Nodes (8): CapacityController, Controller, Get, UseGuards, CapacityService, StorageStatRow, Injectable, UserStatRow

### Community 30 - "CurrentUser"
Cohesion: 0.09
Nodes (21): CurrentUser, mapProfile(), ProfileController, Body, Controller, Delete, Get, HttpCode (+13 more)

### Community 31 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 32 - "test_grounding.py"
Cohesion: 0.15
Nodes (5): Барс: who he is, and the hard rules that keep him useful. The persona is…, Guards against the bot naming an event the catalogue does not contain.…, TestGetEventOnAClosedEvent, TestGetEventOnAnUnknownId, TestSearchNeverSurfacesClosedEvents

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

### Community 41 - "tools.py"
Cohesion: 0.07
Nodes (42): age_fits(), embedding_text(), Whether a participant of this age is inside the event's stated range.…, What gets embedded. Title and description carry most of the signal; category,…, _ctx(), get_event(), link_hint(), What Барс can actually do. Every tool is read-only against the catalogue or… (+34 more)

### Community 42 - "CreateEventDto"
Cohesion: 0.14
Nodes (12): deriveAgeLabel(), deriveShortDesc(), CreateEventDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional (+4 more)

### Community 43 - "truncate_to_last_complete_line"
Cohesion: 0.18
Nodes (7): chunks(), Cut a budget-truncated answer back to its last complete thought. The model…, Split on paragraph boundaries so a long answer never breaks mid-tag., truncate_to_last_complete_line(), Message shaping: recovering a truncated answer, and splitting a long one., TestChunks, TestTruncateToLastCompleteLine

### Community 44 - "filter_tool_calls"
Cohesion: 0.31
Nodes (6): filter_tool_calls(), AIMessage, Trim what the agent asked for down to what is actually worth running. Three…, call(), search(), TestFilterToolCalls

### Community 45 - "plans.py"
Cohesion: 0.18
Nodes (21): One connection, one atomic unit, for a change that spans several statements.…, transaction(), site_url(), _add_reminder(), create_plan(), due_reminders(), _fire_at(), get_plan() (+13 more)

### Community 46 - "constants.ts"
Cohesion: 0.10
Nodes (33): AppLayout(), CardMenu(), EventCard(), EventCardAdminActions, instagramUrl(), EventModal(), instagramUrl(), telegramUrl() (+25 more)

### Community 47 - "FavoritesController"
Cohesion: 0.22
Nodes (6): FavoritesController, Controller, Get, Param, Post, UseGuards

### Community 48 - "GridPage.tsx"
Cohesion: 0.12
Nodes (22): EditAccountPage, CardSizeSlider(), ConfirmDialog(), ConfirmDialogProps, NetTroubleToast(), Toast(), Theme, UIContext (+14 more)

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

### Community 53 - "useAuth"
Cohesion: 0.09
Nodes (25): UserAccountPage, BanModal(), BanModalProps, OPTIONS, ROLE_BADGE, UsersManager(), UsersManagerProps, useAuth() (+17 more)

### Community 54 - "system_prompt"
Cohesion: 0.19
Nodes (5): The agent's system message. The category and theme *vocabularies* used to be…, system_prompt(), The census must inform the model, never licence it to answer without tools., TestCensusWording, TestPrompts

### Community 55 - "Body"
Cohesion: 0.17
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

### Community 61 - "test_agent.py"
Cohesion: 0.27
Nodes (6): _collected_tool_output(), Everything the tools returned during the current turn, oldest first., tool_rounds_this_turn(), Graph discipline: what history the agent sees, and what tool calls it gets to…, TestCollectedToolOutput, TestToolRounds

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

### Community 66 - "FakeCatalog"
Cohesion: 0.27
Nodes (7): _event(), events(), FakeCatalog, Any, Stands in for catalog.Catalog without the HTTP round-trip., A catalogue row with the defaults the API actually sends., Six rows covering every branch the hard filters have. Dates are relative to…

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

### Community 71 - "ChatQueues"
Cohesion: 0.12
Nodes (9): ChatQueues, Any, Any, True when this chat just sent these exact words, and records them either way.…, Serialises conversation-state changes for one chat across *every* handler — the…, Drop idle locks so the map does not grow without bound. Called from the sweep., Runtime, Lock (+1 more)

### Community 72 - "_clean_due_date"
Cohesion: 0.09
Nodes (16): The LangGraph agent behind Барс., _clean_due_date(), _plan_horizon(), PlanStep, Any, BaseModel, date, The last day a step can sensibly fall on: registration closes, or failing that,… (+8 more)

### Community 74 - "_prior_turns"
Cohesion: 0.36
Nodes (5): _prior_turns(), Earlier turns, pruned to what was actually said: the question and the answer.…, a_turn(), One completed exchange, with its tool traffic in the middle., TestPriorTurns

### Community 75 - "education.service.ts"
Cohesion: 0.13
Nodes (15): EducationTrackRow, mapEducationTrack(), mapMaterial(), MaterialRow, EducationController, CacheTTL, Controller, Get (+7 more)

### Community 108 - "TrafficCleanupService"
Cohesion: 0.32
Nodes (4): TrafficCleanupService, Cron, Injectable, yesterdayInBishkek()

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

### Community 113 - "_recent_history"
Cohesion: 0.40
Nodes (4): _current_turn(), From the last HumanMessage onward, verbatim -- a tool_call and its result must…, _recent_history(), TestRecentHistory

### Community 118 - "CreateMaterialDto"
Cohesion: 0.33
Nodes (5): CreateMaterialDto, IsArray, IsInt, IsOptional, IsString

### Community 124 - "catalog.py"
Cohesion: 0.11
Nodes (25): age_requirement(), availability(), availability_line(), bishkek_now(), bishkek_today(), Catalog, deadline_in_days(), is_open() (+17 more)

## Knowledge Gaps
- **313 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+308 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 777 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SupabaseService` connect `SupabaseService` to `bars-admin.service.ts`, `news.service.ts`, `EventsService`, `mappers.ts`, `traffic.service.ts`, `ratings.controller.ts`, `SupabaseAuthGuard`, `supabase-auth.guard.ts`, `users-admin.controller.ts`, `CapacityService`, `CurrentUser`, `traffic-admin.service.ts`, `AdminService`, `admin.service.ts`, `HealthController`, `TelegramLinkService`, `education.service.ts`, `TrafficCleanupService`, `AuthController`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `CurrentUser` to `SupabaseService`, `mappers.ts`, `ratings.controller.ts`, `FavoritesController`, `supabase-auth.guard.ts`, `AuthController`, `users-admin.controller.ts`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `useAuth()` connect `useAuth` to `types.ts`, `AnalyticsPage.tsx`, `AdminPage.tsx`, `constants.ts`, `GridPage.tsx`, `App.tsx`, `AuthPage`, `useEducation.ts`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _313 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08705882352941176 - nodes in this community are weakly interconnected._
- **Should `bars-admin.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0517120894479385 - nodes in this community are weakly interconnected._
- **Should `20260828103623_traffic_analytics.sql` be split into smaller, more focused modules?**
  _Cohesion score 0.0797979797979798 - nodes in this community are weakly interconnected._