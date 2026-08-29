# Graph Report - Teenage Space  (2026-08-29)

## Corpus Check
- 245 files · ~75,014 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1678 nodes · 3301 edges · 111 communities (74 shown, 37 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 104 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c92334fb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- GridPage.tsx
- BarsQueryDto
- get_settings
- dependencies
- Platform Description (Privacy Policy Section 1)
- FavoritesService
- frontend/package.json
- AdminPage.tsx
- EventsService
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
- CreateNewsDto
- AuthPage
- UsersAdminService
- PrivacyPage.tsx
- types.ts
- handlers.py
- AuthContext.tsx
- UpdateEventDto
- UpdateSubmissionDto
- CapacityService
- CurrentUser
- nest-cli.json
- admin.service.ts
- tsconfig.build.json
- HTML Entry Point (index.html)
- vite-env.d.ts
- vercel.json
- Graphify Query Workflow
- traffic-admin.service.ts
- AnalyticsPage.tsx
- catalog.py
- CreateEventDto
- api
- agent.py
- plans.py
- indexer.py
- HealthController
- UserAccountPage.tsx
- SupabaseService
- Supabase
- AdminService
- deploy
- useAuth
- constants.ts
- education.service.ts
- Body
- Changelog
- Changelog
- Writing Guidelines for Postgres References
- ErrorBoundary
- ChatQueues
- ApiClient
- api.ts
- Section Definitions
- SupabaseAuthGuard
- AuthController
- bot.controller.ts
- deploy
- Барс — Telegram-агент Teenage Space
- Supabase Postgres Best Practices
- BarsAdminService
- graph/__init__.py
- bars
- BarsAdminController
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
- CreateMaterialDto
- BarsCreditDto
- TrafficCleanupService

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

## Communities (111 total, 37 thin omitted)

### Community 0 - "GridPage.tsx"
Cohesion: 0.16
Nodes (17): SettingsPage, CardSizeSlider(), Toast(), Theme, UIContext, UIContextValue, useUI(), plural() (+9 more)

### Community 1 - "BarsQueryDto"
Cohesion: 0.20
Nodes (8): Get, Query, BarsQueryDto, IsInt, IsOptional, Max, Min, Type

### Community 2 - "get_settings"
Cohesion: 0.10
Nodes (33): AsyncIOScheduler, BaseSettings, close_api(), Thin async client for the Teenage Space NestJS API. Public catalogue reads go…, get_settings(), All configuration in one place, loaded from the environment (or bot/.env…, Railway injects RAILWAY_PUBLIC_DOMAIN; a custom domain overrides it via env., Settings (+25 more)

### Community 3 - "dependencies"
Cohesion: 0.04
Nodes (46): dependencies, cache-manager, class-transformer, class-validator, helmet, @nestjs/cache-manager, @nestjs/common, @nestjs/config (+38 more)

### Community 4 - "Platform Description (Privacy Policy Section 1)"
Cohesion: 0.08
Nodes (33): Auto-Push Working Agreement, Backend Build Job, Build Check Workflow, Frontend Build Job, Check Required Secrets Step, Link Project Step, Migrate Job, Push Migrations Step (+25 more)

### Community 5 - "FavoritesService"
Cohesion: 0.17
Nodes (7): FavoritesController, Controller, Param, Post, UseGuards, FavoritesService, Injectable

### Community 6 - "frontend/package.json"
Cohesion: 0.07
Nodes (28): dependencies, react, react-dom, react-router-dom, @supabase/supabase-js, devDependencies, @types/react, @types/react-dom (+20 more)

### Community 7 - "AdminPage.tsx"
Cohesion: 0.06
Nodes (44): AdminPage, Chip(), ChipProps, EditEventModal(), save(), EditEventModalProps, emptyPostForm(), eventToPostForm() (+36 more)

### Community 8 - "EventsService"
Cohesion: 0.09
Nodes (19): EventsController, CacheTTL, Controller, Get, Header, Param, Query, UseInterceptors (+11 more)

### Community 9 - "CreateSubmissionDto"
Cohesion: 0.10
Nodes (21): mapSubmission(), CreateSubmissionDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString (+13 more)

### Community 10 - "traffic.service.ts"
Cohesion: 0.06
Nodes (40): DEVICE_TYPES, HeartbeatDto, IsBoolean, IsIn, IsUUID, DEVICE_TYPES, TARGET_TYPES, TrackCardViewDto (+32 more)

### Community 11 - "news.service.ts"
Cohesion: 0.14
Nodes (12): mapNews(), NewsRow, NewsController, CacheTTL, Controller, Get, Header, UseInterceptors (+4 more)

### Community 12 - "ratings.controller.ts"
Cohesion: 0.12
Nodes (14): RateEventDto, IsInt, Max, Min, RatingsController, Body, Controller, Param (+6 more)

### Community 13 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+12 more)

### Community 14 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, isolatedModules, jsx, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch (+12 more)

### Community 15 - "supabase-auth.guard.ts"
Cohesion: 0.11
Nodes (16): ADMIN_PERM_KEYS, AdminPermKey, SetPermsDto, AdminGuard, Injectable, PermissionGuard, Injectable, PERM_KEY (+8 more)

### Community 16 - "tools.py"
Cohesion: 0.17
Nodes (20): _ctx(), get_event(), link_hint(), PlanStep, Any, BaseModel, What Барс can actually do. Every tool is read-only against the catalogue or…, Сохранить план подготовки и включить напоминания. Вызывай, только когда… (+12 more)

### Community 17 - "App.tsx"
Cohesion: 0.12
Nodes (21): AnalyticsPage, AppLayout(), EducationIndex(), EducationPage, HomeGate(), PublishPage, UsersPage, Loader() (+13 more)

### Community 18 - "execute"
Cohesion: 0.13
Nodes (26): _clip(), log_turn(), Quality-control journal and token accounting for Барс. Two bot-owned tables…, Book a catalogue re-embed against the system chat, for the balance estimate., Drop journalled turns past the retention window. Called from sessions.sweep()., Append one exchange — the user's line and the assistant's — to the journal., Fold this turn's Gemini token counts into the daily rollup. `usage_by_model` is…, record_embedding_usage() (+18 more)

### Community 19 - "app.module.ts"
Cohesion: 0.11
Nodes (21): AdminModule, Module, AppModule, Module, AuthModule, Module, BarsModule, Module (+13 more)

### Community 20 - "CreateNewsDto"
Cohesion: 0.40
Nodes (4): CreateNewsDto, IsOptional, IsString, IsUrl

### Community 21 - "AuthPage"
Cohesion: 0.10
Nodes (29): onLogout(), onAccept(), refreshProfile(), signOut(), AuthPage(), finishSignIn(), onForgot1(), onForgot2() (+21 more)

### Community 22 - "UsersAdminService"
Cohesion: 0.10
Nodes (20): BanUserDto, IsIn, IsOptional, IsString, MaxLength, SetRoleDto, IsIn, Body (+12 more)

### Community 23 - "PrivacyPage.tsx"
Cohesion: 0.33
Nodes (4): PrivacyPage, Block, Section, SECTIONS

### Community 24 - "types.ts"
Cohesion: 0.12
Nodes (23): BarsPage, useBarsChat(), useBarsChats(), BarsPage(), chatTitle(), fmtWhen(), STATUS_LABELS, Transcript() (+15 more)

### Community 25 - "handlers.py"
Cohesion: 0.10
Nodes (41): ApiError, chunks(), event_ids(), event_keyboard(), plan_keyboard(), Any, Turning the model's answer into a Telegram message. The model never emits URLs…, Referenced ids, in the order the model mentioned them, deduplicated. (+33 more)

### Community 26 - "AuthContext.tsx"
Cohesion: 0.15
Nodes (14): App(), BannedGate(), periodText(), AuthContext, AuthContextValue, AuthProvider(), checkBanStatus(), hasPerm() (+6 more)

### Community 27 - "UpdateEventDto"
Cohesion: 0.20
Nodes (10): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUrl, Max (+2 more)

### Community 28 - "UpdateSubmissionDto"
Cohesion: 0.18
Nodes (10): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUrl, Max (+2 more)

### Community 29 - "CapacityService"
Cohesion: 0.16
Nodes (8): CapacityController, Controller, Get, UseGuards, CapacityService, StorageStatRow, Injectable, UserStatRow

### Community 30 - "CurrentUser"
Cohesion: 0.06
Nodes (25): CurrentUser, TelegramLinkService, Injectable, Get, ProfileController, Body, Controller, Delete (+17 more)

### Community 31 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 32 - "admin.service.ts"
Cohesion: 0.16
Nodes (10): CreateEducationTrackDto, IsOptional, IsString, URL_OPTS, URL_OPTS, IsOptional, IsString, UpdateEducationTrackDto (+2 more)

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
Cohesion: 0.11
Nodes (24): BarChart(), BarChartProps, setBarsCredit(), useBarsAnalytics(), useCapacity(), useTrafficOnline(), useTrafficSummary(), AnalyticsPage() (+16 more)

### Community 41 - "catalog.py"
Cohesion: 0.16
Nodes (26): bishkek_now(), bishkek_today(), deadline_in_days(), embedding_text(), is_open(), matches(), parse_date(), Any (+18 more)

### Community 42 - "CreateEventDto"
Cohesion: 0.14
Nodes (12): deriveAgeLabel(), deriveShortDesc(), CreateEventDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional (+4 more)

### Community 43 - "api"
Cohesion: 0.18
Nodes (10): EditAccountPage, ProfilePage, ConfirmDialog(), ConfirmDialogProps, useSubmissions(), api, STATUS_LABEL, TelegramLinkStatus (+2 more)

### Community 44 - "agent.py"
Cohesion: 0.16
Nodes (15): build_graph(), _chat_model(), GuardVerdict, AsyncConnectionPool, BaseModel, The graph itself: guard -> agent -> tools -> agent -> end. Hand-rolled rather…, Last MAX_TURNS_IN_CONTEXT user turns, sliced at a HumanMessage so a tool_call…, _recent_history() (+7 more)

### Community 45 - "plans.py"
Cohesion: 0.21
Nodes (18): site_url(), _add_reminder(), create_plan(), due_reminders(), _fire_at(), mark_failed(), mark_sent(), Any (+10 more)

### Community 46 - "indexer.py"
Cohesion: 0.13
Nodes (16): api(), Catalog, pgvector accepts its text form, so no extra type-registration dependency is…, to_vector_literal(), embed_documents(), embed_query(), _embedder(), Gemini embeddings, wrapped so the rest of the code never touches the SDK… (+8 more)

### Community 47 - "HealthController"
Cohesion: 0.22
Nodes (6): HealthController, Controller, Get, SkipThrottle, HealthModule, Module

### Community 48 - "UserAccountPage.tsx"
Cohesion: 0.16
Nodes (10): UserAccountPage, BanModal(), BanModalProps, OPTIONS, useAdminUser(), banPeriodText(), STATUS_LABEL, UserAccountPage() (+2 more)

### Community 49 - "SupabaseService"
Cohesion: 0.12
Nodes (15): BAN_DURATIONS, BanDuration, BAN_MS, BanStatusGuard, Injectable, TelegramLinkRow, EventRow, mapEvent() (+7 more)

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
Cohesion: 0.12
Nodes (14): BottomNav(), NAV_ITEMS, ROLE_BADGE, UsersManager(), UsersManagerProps, useAuth(), useAdmins(), useAdminUsers() (+6 more)

### Community 54 - "constants.ts"
Cohesion: 0.05
Nodes (59): ArticlePage, CardMenu(), EventCard(), EventCardAdminActions, EventCardProps, instagramUrl(), EventModal(), instagramUrl() (+51 more)

### Community 55 - "education.service.ts"
Cohesion: 0.12
Nodes (15): EducationTrackRow, mapEducationTrack(), mapMaterial(), MaterialRow, EducationController, CacheTTL, Controller, Get (+7 more)

### Community 56 - "Body"
Cohesion: 0.19
Nodes (7): Body, Patch, IsArray, IsInt, IsOptional, IsString, UpdateMaterialDto

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
Cohesion: 0.17
Nodes (7): ChatQueues, Any, Per-chat ordering, cross-chat parallelism. One worker per active chat means a…, Any, Process-wide singletons wired up at boot by main.py. Kept in one small module…, Runtime, Queue

### Community 62 - "ApiClient"
Cohesion: 0.27
Nodes (3): ApiClient, Any, Full snapshot including archived rows — used by the embedding indexer.

### Community 63 - "api.ts"
Cohesion: 0.15
Nodes (14): AuthPage, ImageUploadField(), onPick(), ImageUploadFieldProps, NetTroubleToast(), authHeader(), NET_TROUBLE_EVENT, reportNetworkTrouble() (+6 more)

### Community 64 - "Section Definitions"
Cohesion: 0.20
Nodes (9): 1. Query Performance (query), 2. Connection Management (conn), 3. Security & RLS (security), 4. Schema Design (schema), 5. Concurrency & Locking (lock), 6. Data Access Patterns (data), 7. Monitoring & Diagnostics (monitor), 8. Advanced Features (advanced) (+1 more)

### Community 65 - "SupabaseAuthGuard"
Cohesion: 0.31
Nodes (4): jwtExpiryMs(), SupabaseAuthGuard, Inject, Injectable

### Community 66 - "AuthController"
Cohesion: 0.25
Nodes (6): AuthController, Controller, Get, Query, Throttle, UseGuards

### Community 67 - "bot.controller.ts"
Cohesion: 0.08
Nodes (24): BotAuthGuard, secretsMatch(), Injectable, BotController, Body, Controller, Delete, Get (+16 more)

### Community 68 - "deploy"
Cohesion: 0.25
Nodes (7): deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType, startCommand, $schema

### Community 69 - "Барс — Telegram-агент Teenage Space"
Cohesion: 0.25
Nodes (7): Барс — Telegram-агент Teenage Space, Деплой, Запуск локально, Как это соединено с остальным проектом, Переменные окружения, Проверить поиск без Telegram, Структура

### Community 70 - "Supabase Postgres Best Practices"
Cohesion: 0.33
Nodes (5): How to Use, References, Rule Categories by Priority, Supabase Postgres Best Practices, When to Apply

### Community 71 - "BarsAdminService"
Cohesion: 0.29
Nodes (3): BarsAdminService, bishkekDayKeys(), Injectable

### Community 74 - "BarsAdminController"
Cohesion: 0.20
Nodes (6): BarsAdminController, Body, Controller, Param, UseGuards, Put

### Community 108 - "bars-admin.service.ts"
Cohesion: 0.20
Nodes (9): ChatListRow, CreditRow, DailyUsageRow, MessageRow, ModelPrice, SummaryRow, ToolRow, TopChatRow (+1 more)

### Community 109 - "CreateMaterialDto"
Cohesion: 0.33
Nodes (5): CreateMaterialDto, IsArray, IsInt, IsOptional, IsString

### Community 110 - "BarsCreditDto"
Cohesion: 0.20
Nodes (9): BarsCreditDto, IsOptional, IsString, Max, MaxLength, Min, Type, IsISO8601 (+1 more)

### Community 112 - "TrafficCleanupService"
Cohesion: 0.33
Nodes (4): TrafficCleanupService, Cron, Injectable, yesterdayInBishkek()

## Knowledge Gaps
- **310 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+305 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **37 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SupabaseService` connect `SupabaseService` to `FavoritesService`, `EventsService`, `CreateSubmissionDto`, `traffic.service.ts`, `news.service.ts`, `ratings.controller.ts`, `supabase-auth.guard.ts`, `UsersAdminService`, `CapacityService`, `CurrentUser`, `admin.service.ts`, `traffic-admin.service.ts`, `HealthController`, `AdminService`, `education.service.ts`, `SupabaseAuthGuard`, `AuthController`, `BarsAdminService`, `bars-admin.service.ts`, `TrafficCleanupService`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `CurrentUser` to `AuthController`, `FavoritesService`, `CreateSubmissionDto`, `ratings.controller.ts`, `supabase-auth.guard.ts`, `SupabaseService`, `UsersAdminService`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `SupabaseAuthGuard` connect `SupabaseAuthGuard` to `admin.service.ts`, `FavoritesService`, `traffic-admin.service.ts`, `CreateSubmissionDto`, `ratings.controller.ts`, `supabase-auth.guard.ts`, `SupabaseService`, `app.module.ts`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _310 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `get_settings` be split into smaller, more focused modules?**
  _Cohesion score 0.10121951219512196 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `Platform Description (Privacy Policy Section 1)` be split into smaller, more focused modules?**
  _Cohesion score 0.08143939393939394 - nodes in this community are weakly interconnected._