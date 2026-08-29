# Graph Report - Teenage Space  (2026-08-29)

## Corpus Check
- 235 files · ~69,211 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1585 nodes · 3117 edges · 112 communities (74 shown, 38 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 100 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cc5ce638`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useAuth
- AdminPage.tsx
- TelegramLinkService
- dependencies
- Platform Description (Privacy Policy Section 1)
- CurrentUser
- frontend/package.json
- PostForm.tsx
- events.service.ts
- CreateSubmissionDto
- traffic.service.ts
- news.service.ts
- ratings.controller.ts
- compilerOptions
- compilerOptions
- supabase-auth.guard.ts
- tools.py
- useEducation.ts
- useUI
- app.module.ts
- CreateNewsDto
- AuthPage
- users-admin.service.ts
- App.tsx
- bot.service.ts
- handlers.py
- UserAccountPage.tsx
- UpdateEventDto
- UpdateSubmissionDto
- capacity.controller.ts
- profile.controller.ts
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
- types.ts
- get_settings
- plans.py
- indexer.py
- HealthController
- HomePage.tsx
- SupabaseService
- Supabase
- AdminController
- deploy
- UsersManager.tsx
- constants.ts
- EducationController
- SupabaseAuthGuard
- Changelog
- Changelog
- Writing Guidelines for Postgres References
- agent.py
- ChatQueues
- ApiClient
- ProfilePage.tsx
- Section Definitions
- bot.controller.ts
- AuthController
- BotController
- deploy
- Барс — Telegram-агент Teenage Space
- Supabase Postgres Best Practices
- AdminService
- graph/__init__.py
- bars
- tracking.ts
- useEvents.ts
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
- mappers.ts
- CreateMaterialDto
- SubmissionsController
- BottomNav.tsx

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 67 edges
2. `SupabaseService` - 42 edges
3. `useUI()` - 37 edges
4. `AdminService` - 28 edges
5. `get_settings()` - 28 edges
6. `api` - 28 edges
7. `AdminController` - 25 edges
8. `CurrentUser` - 22 edges
9. `compilerOptions` - 20 edges
10. `TelegramLinkService` - 18 edges

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

## Communities (112 total, 38 thin omitted)

### Community 0 - "useAuth"
Cohesion: 0.18
Nodes (16): BannedGate(), onLogout(), periodText(), PolicyGate(), hasPerm(), useAuth(), plural(), useFavorites() (+8 more)

### Community 1 - "AdminPage.tsx"
Cohesion: 0.10
Nodes (20): TrashIcon(), useAdminAnalytics(), useAdminArchivedEvents(), useAdminSubmissions(), useNews(), AnalyticsTab(), ArchiveTab(), bodyToText() (+12 more)

### Community 2 - "TelegramLinkService"
Cohesion: 0.24
Nodes (4): Delete, HttpCode, TelegramLinkService, Injectable

### Community 3 - "dependencies"
Cohesion: 0.04
Nodes (46): dependencies, cache-manager, class-transformer, class-validator, helmet, @nestjs/cache-manager, @nestjs/common, @nestjs/config (+38 more)

### Community 4 - "Platform Description (Privacy Policy Section 1)"
Cohesion: 0.08
Nodes (33): Auto-Push Working Agreement, Backend Build Job, Build Check Workflow, Frontend Build Job, Check Required Secrets Step, Link Project Step, Migrate Job, Push Migrations Step (+25 more)

### Community 5 - "CurrentUser"
Cohesion: 0.10
Nodes (14): CurrentUser, Get, Param, Post, ProfileController, Body, Controller, Delete (+6 more)

### Community 6 - "frontend/package.json"
Cohesion: 0.07
Nodes (28): dependencies, react, react-dom, react-router-dom, @supabase/supabase-js, devDependencies, @types/react, @types/react-dom (+20 more)

### Community 7 - "PostForm.tsx"
Cohesion: 0.11
Nodes (23): Chip(), ChipProps, EditEventModal(), save(), EditEventModalProps, emptyPostForm(), eventToPostForm(), FORMATS (+15 more)

### Community 8 - "events.service.ts"
Cohesion: 0.10
Nodes (20): mapEvent(), EventsController, CacheTTL, Controller, Get, Header, Param, Query (+12 more)

### Community 9 - "CreateSubmissionDto"
Cohesion: 0.14
Nodes (14): mapSubmission(), CreateSubmissionDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString (+6 more)

### Community 10 - "traffic.service.ts"
Cohesion: 0.06
Nodes (40): DEVICE_TYPES, HeartbeatDto, IsBoolean, IsIn, IsUUID, DEVICE_TYPES, TARGET_TYPES, TrackCardViewDto (+32 more)

### Community 11 - "news.service.ts"
Cohesion: 0.14
Nodes (12): mapNews(), NewsRow, NewsController, CacheTTL, Controller, Get, Header, UseInterceptors (+4 more)

### Community 12 - "ratings.controller.ts"
Cohesion: 0.11
Nodes (15): RateEventDto, IsInt, Max, Min, RatingsController, Body, Controller, Get (+7 more)

### Community 13 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+12 more)

### Community 14 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, isolatedModules, jsx, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch (+12 more)

### Community 15 - "supabase-auth.guard.ts"
Cohesion: 0.12
Nodes (14): SetRoleDto, IsIn, AdminGuard, Injectable, PermissionGuard, Injectable, PERM_KEY, AuthedRequest (+6 more)

### Community 16 - "tools.py"
Cohesion: 0.17
Nodes (20): _ctx(), get_event(), link_hint(), PlanStep, Any, BaseModel, What Барс can actually do. Every tool is read-only against the catalogue or…, Сохранить план подготовки и включить напоминания. Вызывай, только когда… (+12 more)

### Community 17 - "useEducation.ts"
Cohesion: 0.17
Nodes (13): ArticlePage, EducationIndex(), EducationPage, Sidebar(), NAV_CATS, EducationData, useArticle(), useEducation() (+5 more)

### Community 18 - "useUI"
Cohesion: 0.13
Nodes (14): CardSizeSlider(), ImageUploadField(), onPick(), ImageUploadFieldProps, NetTroubleToast(), Toast(), Theme, UIContext (+6 more)

### Community 19 - "app.module.ts"
Cohesion: 0.14
Nodes (16): AdminModule, Module, AppModule, Module, AuthModule, Module, BotModule, Module (+8 more)

### Community 20 - "CreateNewsDto"
Cohesion: 0.40
Nodes (4): CreateNewsDto, IsOptional, IsString, IsUrl

### Community 21 - "AuthPage"
Cohesion: 0.09
Nodes (31): onAccept(), AuthProvider(), checkBanStatus(), refreshProfile(), signOut(), isActiveBan(), AuthPage(), finishSignIn() (+23 more)

### Community 22 - "users-admin.service.ts"
Cohesion: 0.09
Nodes (24): BAN_DURATIONS, BanDuration, BanUserDto, IsIn, IsOptional, IsString, MaxLength, ADMIN_PERM_KEYS (+16 more)

### Community 23 - "App.tsx"
Cohesion: 0.07
Nodes (21): AdminPage, App(), AuthPage, EditAccountPage, HomeGate(), PrivacyPage, ProfilePage, PublishPage (+13 more)

### Community 24 - "bot.service.ts"
Cohesion: 0.19
Nodes (6): EventRow, FavoritesController, Controller, UseGuards, FavoritesService, Injectable

### Community 25 - "handlers.py"
Cohesion: 0.09
Nodes (43): ApiError, chunks(), event_ids(), event_keyboard(), plan_keyboard(), Any, Turning the model's answer into a Telegram message. The model never emits URLs…, Referenced ids, in the order the model mentioned them, deduplicated. (+35 more)

### Community 26 - "UserAccountPage.tsx"
Cohesion: 0.17
Nodes (8): ConfirmDialog(), ConfirmDialogProps, useAdminUser(), banPeriodText(), STATUS_LABEL, UserAccountPage(), ADMIN_PERMS, AdminUserDetail

### Community 27 - "UpdateEventDto"
Cohesion: 0.20
Nodes (10): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUrl, Max (+2 more)

### Community 28 - "UpdateSubmissionDto"
Cohesion: 0.20
Nodes (10): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUrl, Max (+2 more)

### Community 29 - "capacity.controller.ts"
Cohesion: 0.17
Nodes (10): CapacityController, Controller, Get, UseGuards, CapacityModule, Module, CapacityService, StorageStatRow (+2 more)

### Community 30 - "profile.controller.ts"
Cohesion: 0.13
Nodes (13): TelegramLinkRow, mapProfile(), ProfileRow, assertCooldownElapsed(), ProfileService, Injectable, IsBoolean, IsIn (+5 more)

### Community 31 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 32 - "admin.service.ts"
Cohesion: 0.11
Nodes (15): CreateEducationTrackDto, IsOptional, IsString, URL_OPTS, URL_OPTS, IsOptional, IsString, UpdateEducationTrackDto (+7 more)

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
Cohesion: 0.14
Nodes (19): AnalyticsPage, BarChart(), BarChartProps, useCapacity(), useTrafficOnline(), useTrafficSummary(), AnalyticsPage(), BUCKET_LABELS (+11 more)

### Community 41 - "catalog.py"
Cohesion: 0.16
Nodes (26): bishkek_now(), bishkek_today(), deadline_in_days(), embedding_text(), is_open(), matches(), parse_date(), Any (+18 more)

### Community 42 - "CreateEventDto"
Cohesion: 0.15
Nodes (12): deriveAgeLabel(), deriveShortDesc(), CreateEventDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional (+4 more)

### Community 43 - "types.ts"
Cohesion: 0.12
Nodes (26): AuthContext, AuthContextValue, api, authHeader(), reportNetworkTrouble(), request(), anonKey, supabase (+18 more)

### Community 44 - "get_settings"
Cohesion: 0.09
Nodes (34): AsyncIOScheduler, BaseSettings, close_api(), Thin async client for the Teenage Space NestJS API. Public catalogue reads go…, get_settings(), All configuration in one place, loaded from the environment (or bot/.env…, Railway injects RAILWAY_PUBLIC_DOMAIN; a custom domain overrides it via env., Settings (+26 more)

### Community 45 - "plans.py"
Cohesion: 0.14
Nodes (30): execute(), fetch_all(), fetch_one(), Any, _add_reminder(), create_plan(), due_reminders(), _fire_at() (+22 more)

### Community 46 - "indexer.py"
Cohesion: 0.15
Nodes (15): api(), Catalog, pgvector accepts its text form, so no extra type-registration dependency is…, to_vector_literal(), embed_documents(), embed_query(), _embedder(), Gemini embeddings, wrapped so the rest of the code never touches the SDK… (+7 more)

### Community 47 - "HealthController"
Cohesion: 0.22
Nodes (6): HealthController, Controller, Get, SkipThrottle, HealthModule, Module

### Community 48 - "HomePage.tsx"
Cohesion: 0.20
Nodes (10): iconProps, ORBIT_ITEMS, Floater, iconProps, ORBIT_FLOATERS, WANDER_FLOATERS, Nodes, useFloaterRepulsion() (+2 more)

### Community 49 - "SupabaseService"
Cohesion: 0.09
Nodes (13): Inject, Inject, BanStatusGuard, Injectable, SupabaseModule, Module, SupabaseService, Injectable (+5 more)

### Community 50 - "Supabase"
Cohesion: 0.11
Nodes (15): Fix suggestion, Source, What happened, Skill Feedback, Steps, Core Principles, Debugging, Making and Committing Schema Changes (+7 more)

### Community 51 - "AdminController"
Cohesion: 0.13
Nodes (9): AdminController, Body, Controller, Delete, HttpCode, Param, Patch, Post (+1 more)

### Community 52 - "deploy"
Cohesion: 0.29
Nodes (6): deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType, $schema

### Community 53 - "UsersManager.tsx"
Cohesion: 0.13
Nodes (13): BanModal(), BanModalProps, OPTIONS, ROLE_BADGE, UsersManager(), UsersManagerProps, useAdmins(), useAdminUsers() (+5 more)

### Community 54 - "constants.ts"
Cohesion: 0.13
Nodes (24): CardMenu(), EventCard(), EventCardAdminActions, EventCardProps, instagramUrl(), EventModal(), instagramUrl(), telegramUrl() (+16 more)

### Community 55 - "EducationController"
Cohesion: 0.15
Nodes (11): EducationController, CacheTTL, Controller, Get, Header, Param, UseInterceptors, EducationModule (+3 more)

### Community 56 - "SupabaseAuthGuard"
Cohesion: 0.31
Nodes (4): jwtExpiryMs(), SupabaseAuthGuard, Inject, Injectable

### Community 57 - "Changelog"
Cohesion: 0.12
Nodes (16): [1.2.0](https://github.com/supabase/agent-skills/compare/v1.1.1...v1.2.0) (2026-06-02), [1.3.0](https://github.com/supabase/agent-skills/compare/v1.2.0...v1.3.0) (2026-06-05), [1.4.0](https://github.com/supabase/agent-skills/compare/v1.3.0...v1.4.0) (2026-07-10), [1.5.0](https://github.com/supabase/agent-skills/compare/supabase-postgres-best-practices-v1.4.0...supabase-postgres-best-practices-v1.5.0) (2026-07-30), [1.6.0](https://github.com/supabase/agent-skills/compare/supabase-postgres-best-practices-v1.5.0...supabase-postgres-best-practices-v1.6.0) (2026-07-30), Bug Fixes, Bug Fixes, Bug Fixes (+8 more)

### Community 58 - "Changelog"
Cohesion: 0.12
Nodes (15): [0.1.3](https://github.com/supabase/agent-skills/compare/v0.1.2...v0.1.3) (2026-06-02), [0.1.4](https://github.com/supabase/agent-skills/compare/v0.1.3...v0.1.4) (2026-06-05), [0.1.5](https://github.com/supabase/agent-skills/compare/v0.1.4...v0.1.5) (2026-07-10), [0.1.6](https://github.com/supabase/agent-skills/compare/v0.1.5...supabase-v0.1.6) (2026-07-30), [0.1.7](https://github.com/supabase/agent-skills/compare/v0.1.6...supabase-v0.1.7) (2026-08-12), Bug Fixes, Bug Fixes, Bug Fixes (+7 more)

### Community 59 - "Writing Guidelines for Postgres References"
Cohesion: 0.12
Nodes (15): 1. Concrete Transformation Patterns, 2. Error-First Structure, 3. Quantified Impact, 4. Self-Contained Examples, 5. Semantic Naming, Code Example Standards, Comments, Impact Level Guidelines (+7 more)

### Community 60 - "agent.py"
Cohesion: 0.18
Nodes (13): build_graph(), _chat_model(), GuardVerdict, AsyncConnectionPool, BaseModel, The graph itself: guard -> agent -> tools -> agent -> end. Hand-rolled rather…, _router_model(), BarsState (+5 more)

### Community 61 - "ChatQueues"
Cohesion: 0.17
Nodes (7): ChatQueues, Any, Per-chat ordering, cross-chat parallelism. One worker per active chat means a…, Any, Process-wide singletons wired up at boot by main.py. Kept in one small module…, Runtime, Queue

### Community 62 - "ApiClient"
Cohesion: 0.33
Nodes (3): ApiClient, Any, Full snapshot including archived rows — used by the embedding indexer.

### Community 63 - "ProfilePage.tsx"
Cohesion: 0.29
Nodes (5): useSubmissions(), STATUS_LABEL, TelegramLinkStatus, PublishPage(), Submission

### Community 64 - "Section Definitions"
Cohesion: 0.20
Nodes (9): 1. Query Performance (query), 2. Connection Management (conn), 3. Security & RLS (security), 4. Schema Design (schema), 5. Concurrency & Locking (lock), 6. Data Access Patterns (data), 7. Monitoring & Diagnostics (monitor), 8. Advanced Features (advanced) (+1 more)

### Community 65 - "bot.controller.ts"
Cohesion: 0.20
Nodes (11): BotAuthGuard, secretsMatch(), Injectable, ConfirmLinkDto, TelegramIdBodyDto, TelegramIdQueryDto, IsInt, IsOptional (+3 more)

### Community 66 - "AuthController"
Cohesion: 0.25
Nodes (6): AuthController, Controller, Get, Query, Throttle, UseGuards

### Community 67 - "BotController"
Cohesion: 0.13
Nodes (11): BotController, Body, Controller, Get, Param, Post, Query, SkipThrottle (+3 more)

### Community 68 - "deploy"
Cohesion: 0.25
Nodes (7): deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType, startCommand, $schema

### Community 69 - "Барс — Telegram-агент Teenage Space"
Cohesion: 0.25
Nodes (7): Барс — Telegram-агент Teenage Space, Деплой, Запуск локально, Как это соединено с остальным проектом, Переменные окружения, Проверить поиск без Telegram, Структура

### Community 70 - "Supabase Postgres Best Practices"
Cohesion: 0.33
Nodes (5): How to Use, References, Rule Categories by Priority, Supabase Postgres Best Practices, When to Apply

### Community 71 - "AdminService"
Cohesion: 0.20
Nodes (5): Get, Query, AdminService, Injectable, mapSubmissionAdmin()

### Community 74 - "tracking.ts"
Cohesion: 0.24
Nodes (11): AppLayout(), useHeartbeat(), EXCLUDED_PREFIXES, useTrackPageView(), base(), DeviceType, getDeviceType(), getSessionId() (+3 more)

### Community 75 - "useEvents.ts"
Cohesion: 0.29
Nodes (12): buildQuery(), EventFilters, useEvent(), useEvents(), CacheEntry, getCached(), getEntry(), getOrFetch() (+4 more)

### Community 108 - "mappers.ts"
Cohesion: 0.39
Nodes (6): EducationTrackRow, mapEducationTrack(), mapMaterial(), MaterialRow, SubmissionAdminRow, SubmissionRow

### Community 109 - "CreateMaterialDto"
Cohesion: 0.33
Nodes (5): CreateMaterialDto, IsArray, IsInt, IsOptional, IsString

### Community 110 - "SubmissionsController"
Cohesion: 0.29
Nodes (5): SubmissionsController, Body, Controller, Post, UseGuards

## Knowledge Gaps
- **300 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+295 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SupabaseService` connect `SupabaseService` to `admin.service.ts`, `AuthController`, `TelegramLinkService`, `traffic-admin.service.ts`, `events.service.ts`, `CreateSubmissionDto`, `traffic.service.ts`, `news.service.ts`, `mappers.ts`, `ratings.controller.ts`, `supabase-auth.guard.ts`, `HealthController`, `users-admin.service.ts`, `EducationController`, `SupabaseAuthGuard`, `bot.service.ts`, `capacity.controller.ts`, `profile.controller.ts`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `CurrentUser` to `AuthController`, `CreateSubmissionDto`, `ratings.controller.ts`, `SubmissionsController`, `supabase-auth.guard.ts`, `users-admin.service.ts`, `bot.service.ts`, `profile.controller.ts`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `useAuth()` connect `useAuth` to `AdminPage.tsx`, `AnalyticsPage.tsx`, `tracking.ts`, `types.ts`, `BottomNav.tsx`, `useEducation.ts`, `useUI`, `UsersManager.tsx`, `constants.ts`, `App.tsx`, `AuthPage`, `UserAccountPage.tsx`, `ProfilePage.tsx`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _300 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AdminPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09852216748768473 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `Platform Description (Privacy Policy Section 1)` be split into smaller, more focused modules?**
  _Cohesion score 0.08143939393939394 - nodes in this community are weakly interconnected._