# Graph Report - Teenage Space  (2026-08-29)

## Corpus Check
- 194 files · ~58,560 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1435 nodes · 2997 edges · 72 communities (67 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 100 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `606bc589`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useAuth
- AdminController
- TelegramLinkService
- dependencies
- Platform Description (Privacy Policy Section 1)
- CurrentUser
- frontend/package.json
- AdminPage.tsx
- events.service.ts
- CreateSubmissionDto
- TrafficService
- news.service.ts
- ratings.controller.ts
- compilerOptions
- compilerOptions
- supabase-auth.guard.ts
- SupabaseService
- useUI
- ProfilePage.tsx
- app.module.ts
- CreateNewsDto
- AuthPage
- UsersAdminController
- App.tsx
- favorites.controller.ts
- handlers.py
- UsersPage.tsx
- UpdateEventDto
- UpdateSubmissionDto
- CapacityService
- CreateMaterialDto
- nest-cli.json
- admin.service.ts
- tsconfig.build.json
- HTML Entry Point (index.html)
- vite-env.d.ts
- vercel.json
- Graphify Query Workflow
- TrafficAdminService
- AnalyticsPage.tsx
- catalog.py
- CreateEventDto
- types.ts
- main.py
- plans.py
- get_settings
- HealthController
- ErrorBoundary
- traffic.module.ts
- AdminService
- deploy
- tools.py
- HomePage.tsx
- mappers.ts
- SupabaseAuthGuard
- PrivacyPage.tsx
- traffic.service.ts
- agent.py
- ChatQueues
- ApiClient
- UsersAdminService
- tracking.ts
- EducationController
- AuthController
- BanUserDto
- deploy
- Барс — Telegram-агент Teenage Space
- set-perms.dto.ts
- AuthProvider
- graph/__init__.py
- bars

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 67 edges
2. `SupabaseService` - 42 edges
3. `useUI()` - 37 edges
4. `AdminService` - 28 edges
5. `api` - 28 edges
6. `get_settings()` - 27 edges
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

## Communities (72 total, 5 thin omitted)

### Community 0 - "useAuth"
Cohesion: 0.10
Nodes (37): Chip(), ChipProps, CardMenu(), EventCard(), EventCardAdminActions, instagramUrl(), EventModal(), instagramUrl() (+29 more)

### Community 1 - "AdminController"
Cohesion: 0.19
Nodes (7): AdminController, Body, Controller, Param, Patch, Post, UseGuards

### Community 2 - "TelegramLinkService"
Cohesion: 0.07
Nodes (26): BotAuthGuard, secretsMatch(), Injectable, BotController, Body, Controller, Delete, Get (+18 more)

### Community 3 - "dependencies"
Cohesion: 0.04
Nodes (46): dependencies, cache-manager, class-transformer, class-validator, helmet, @nestjs/cache-manager, @nestjs/common, @nestjs/config (+38 more)

### Community 4 - "Platform Description (Privacy Policy Section 1)"
Cohesion: 0.08
Nodes (33): Auto-Push Working Agreement, Backend Build Job, Build Check Workflow, Frontend Build Job, Check Required Secrets Step, Link Project Step, Migrate Job, Push Migrations Step (+25 more)

### Community 5 - "CurrentUser"
Cohesion: 0.08
Nodes (21): CurrentUser, ProfileController, Body, Controller, Delete, Get, HttpCode, Patch (+13 more)

### Community 6 - "frontend/package.json"
Cohesion: 0.07
Nodes (28): dependencies, react, react-dom, react-router-dom, @supabase/supabase-js, devDependencies, @types/react, @types/react-dom (+20 more)

### Community 7 - "AdminPage.tsx"
Cohesion: 0.06
Nodes (42): AdminPage, PublishPage, EditEventModal(), save(), EditEventModalProps, EventCardProps, emptyPostForm(), eventToPostForm() (+34 more)

### Community 8 - "events.service.ts"
Cohesion: 0.10
Nodes (20): mapEvent(), EventsController, CacheTTL, Controller, Get, Header, Param, Query (+12 more)

### Community 9 - "CreateSubmissionDto"
Cohesion: 0.10
Nodes (21): mapSubmission(), CreateSubmissionDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString (+13 more)

### Community 10 - "TrafficService"
Cohesion: 0.08
Nodes (28): TrackCardViewDto, IsBoolean, IsIn, IsString, IsUUID, MaxLength, TrackLinkClickDto, IsBoolean (+20 more)

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
Cohesion: 0.12
Nodes (14): SetRoleDto, IsIn, AdminGuard, Injectable, PermissionGuard, Injectable, PERM_KEY, AuthedRequest (+6 more)

### Community 16 - "SupabaseService"
Cohesion: 0.13
Nodes (10): BanStatusGuard, Injectable, TelegramLinkRow, FavoritesService, Injectable, SupabaseModule, Module, SupabaseService (+2 more)

### Community 17 - "useUI"
Cohesion: 0.11
Nodes (14): App(), SettingsPage, CardSizeSlider(), NetTroubleToast(), Toast(), Theme, UIContext, UIContextValue (+6 more)

### Community 18 - "ProfilePage.tsx"
Cohesion: 0.13
Nodes (13): EditAccountPage, ProfilePage, ConfirmDialog(), ConfirmDialogProps, ImageUploadField(), onPick(), ImageUploadFieldProps, anonKey (+5 more)

### Community 19 - "app.module.ts"
Cohesion: 0.14
Nodes (16): AdminModule, Module, AppModule, Module, AuthModule, Module, BotModule, Module (+8 more)

### Community 20 - "CreateNewsDto"
Cohesion: 0.40
Nodes (4): CreateNewsDto, IsOptional, IsString, IsUrl

### Community 21 - "AuthPage"
Cohesion: 0.10
Nodes (28): onAccept(), refreshProfile(), signOut(), AuthPage(), finishSignIn(), onForgot1(), onForgot2(), onForgot3() (+20 more)

### Community 22 - "UsersAdminController"
Cohesion: 0.26
Nodes (9): Body, Controller, Get, Param, Patch, Post, UseGuards, UsersAdminController (+1 more)

### Community 23 - "App.tsx"
Cohesion: 0.11
Nodes (14): EducationIndex(), HomeGate(), BannedGate(), onLogout(), periodText(), BottomNav(), NAV_ITEMS, Loader() (+6 more)

### Community 24 - "favorites.controller.ts"
Cohesion: 0.20
Nodes (6): FavoritesController, Controller, Get, Param, Post, UseGuards

### Community 25 - "handlers.py"
Cohesion: 0.08
Nodes (43): ApiError, chunks(), event_ids(), event_keyboard(), plan_keyboard(), Any, Turning the model's answer into a Telegram message. The model never emits URLs…, Referenced ids, in the order the model mentioned them, deduplicated. (+35 more)

### Community 26 - "UsersPage.tsx"
Cohesion: 0.20
Nodes (7): UsersPage, UsersManager(), useAdmins(), AdminsTab(), TabKey, TABS, UsersPage()

### Community 27 - "UpdateEventDto"
Cohesion: 0.20
Nodes (10): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUrl, Max (+2 more)

### Community 28 - "UpdateSubmissionDto"
Cohesion: 0.18
Nodes (10): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUrl, Max (+2 more)

### Community 29 - "CapacityService"
Cohesion: 0.16
Nodes (8): CapacityController, Controller, Get, UseGuards, CapacityService, StorageStatRow, Injectable, UserStatRow

### Community 30 - "CreateMaterialDto"
Cohesion: 0.15
Nodes (7): CreateMaterialDto, IsArray, IsInt, IsOptional, IsString, mapEducationTrack(), mapMaterial()

### Community 31 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 32 - "admin.service.ts"
Cohesion: 0.13
Nodes (15): CreateEducationTrackDto, IsOptional, IsString, URL_OPTS, URL_OPTS, IsOptional, IsString, UpdateEducationTrackDto (+7 more)

### Community 33 - "tsconfig.build.json"
Cohesion: 0.33
Nodes (5): exclude, extends, dist, node_modules, ./tsconfig.json

### Community 34 - "HTML Entry Point (index.html)"
Cohesion: 0.50
Nodes (5): Google Fonts Integration, HTML Entry Point (index.html), SEO / Open Graph Meta Tags, TS Logo Mark (Favicon), TS Logo Mark (Source Asset)

### Community 39 - "TrafficAdminService"
Cohesion: 0.11
Nodes (13): TrafficQueryDto, IsInt, IsOptional, Max, Min, Type, TrafficAdminController, Controller (+5 more)

### Community 40 - "AnalyticsPage.tsx"
Cohesion: 0.12
Nodes (21): AnalyticsPage, BarChart(), BarChartProps, useCapacity(), useTrafficOnline(), useTrafficSummary(), AnalyticsPage(), BUCKET_LABELS (+13 more)

### Community 41 - "catalog.py"
Cohesion: 0.13
Nodes (28): api(), bishkek_now(), bishkek_today(), Catalog, deadline_in_days(), embedding_text(), is_open(), matches() (+20 more)

### Community 42 - "CreateEventDto"
Cohesion: 0.15
Nodes (12): deriveAgeLabel(), deriveShortDesc(), CreateEventDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional (+4 more)

### Community 43 - "types.ts"
Cohesion: 0.08
Nodes (38): AuthPage, UserAccountPage, BanModal(), BanModalProps, OPTIONS, ROLE_BADGE, UsersManagerProps, AuthContext (+30 more)

### Community 44 - "main.py"
Cohesion: 0.13
Nodes (28): AsyncIOScheduler, close_api(), close_pool(), init_pool(), AsyncConnectionPool, pgvector accepts its text form, so no extra type-registration dependency is…, to_vector_literal(), content_hash() (+20 more)

### Community 45 - "plans.py"
Cohesion: 0.17
Nodes (26): execute(), fetch_all(), fetch_one(), pool(), Any, Postgres access for the bot's own tables. Scope rule (see the plan): the bot…, site_url(), _add_reminder() (+18 more)

### Community 46 - "get_settings"
Cohesion: 0.11
Nodes (20): BaseSettings, Thin async client for the Teenage Space NestJS API. Public catalogue reads go…, get_settings(), All configuration in one place, loaded from the environment (or bot/.env…, Railway injects RAILWAY_PUBLIC_DOMAIN; a custom domain overrides it via env., Settings, embed_documents(), embed_query() (+12 more)

### Community 47 - "HealthController"
Cohesion: 0.22
Nodes (6): HealthController, Controller, Get, SkipThrottle, HealthModule, Module

### Community 48 - "ErrorBoundary"
Cohesion: 0.22
Nodes (3): ErrorBoundary, Props, State

### Community 49 - "traffic.module.ts"
Cohesion: 0.12
Nodes (13): CardUniqueViewsRow, DailyTrendRow, DeviceRow, HourlyRow, LoginSplitRow, TopCardRow, TopLinkRow, TrafficCleanupService (+5 more)

### Community 51 - "AdminService"
Cohesion: 0.11
Nodes (7): Delete, Get, HttpCode, Query, AdminService, Inject, Injectable

### Community 52 - "deploy"
Cohesion: 0.29
Nodes (6): deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType, $schema

### Community 53 - "tools.py"
Cohesion: 0.17
Nodes (20): _ctx(), get_event(), link_hint(), PlanStep, Any, BaseModel, What Барс can actually do. Every tool is read-only against the catalogue or…, Сохранить план подготовки и включить напоминания. Вызывай, только когда… (+12 more)

### Community 54 - "HomePage.tsx"
Cohesion: 0.09
Nodes (31): ArticlePage, EducationPage, iconProps, ORBIT_ITEMS, Floater, iconProps, ORBIT_FLOATERS, WANDER_FLOATERS (+23 more)

### Community 55 - "mappers.ts"
Cohesion: 0.16
Nodes (13): BAN_MS, EducationTrackRow, EventRow, mapProfile(), mapSubmissionAdmin(), MaterialRow, ProfileRow, SubmissionAdminRow (+5 more)

### Community 56 - "SupabaseAuthGuard"
Cohesion: 0.31
Nodes (4): jwtExpiryMs(), SupabaseAuthGuard, Inject, Injectable

### Community 58 - "PrivacyPage.tsx"
Cohesion: 0.33
Nodes (4): PrivacyPage, Block, Section, SECTIONS

### Community 59 - "traffic.service.ts"
Cohesion: 0.15
Nodes (12): DEVICE_TYPES, HeartbeatDto, IsBoolean, IsIn, IsUUID, DEVICE_TYPES, TARGET_TYPES, DEVICE_TYPES (+4 more)

### Community 60 - "agent.py"
Cohesion: 0.18
Nodes (13): build_graph(), _chat_model(), GuardVerdict, AsyncConnectionPool, BaseModel, The graph itself: guard -> agent -> tools -> agent -> end. Hand-rolled rather…, _router_model(), BarsState (+5 more)

### Community 61 - "ChatQueues"
Cohesion: 0.17
Nodes (7): ChatQueues, Any, Per-chat ordering, cross-chat parallelism. One worker per active chat means a…, Any, Process-wide singletons wired up at boot by main.py. Kept in one small module…, Runtime, Queue

### Community 62 - "ApiClient"
Cohesion: 0.27
Nodes (3): ApiClient, Any, Full snapshot including archived rows — used by the embedding indexer.

### Community 63 - "UsersAdminService"
Cohesion: 0.25
Nodes (4): Inject, Injectable, UsersAdminService, mapAdminUser()

### Community 64 - "tracking.ts"
Cohesion: 0.24
Nodes (11): AppLayout(), useHeartbeat(), EXCLUDED_PREFIXES, useTrackPageView(), base(), DeviceType, getDeviceType(), getSessionId() (+3 more)

### Community 65 - "EducationController"
Cohesion: 0.27
Nodes (7): EducationController, CacheTTL, Controller, Get, Header, Param, UseInterceptors

### Community 66 - "AuthController"
Cohesion: 0.25
Nodes (6): AuthController, Controller, Get, Query, Throttle, UseGuards

### Community 67 - "BanUserDto"
Cohesion: 0.25
Nodes (7): BAN_DURATIONS, BanDuration, BanUserDto, IsIn, IsOptional, IsString, MaxLength

### Community 68 - "deploy"
Cohesion: 0.25
Nodes (7): deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType, startCommand, $schema

### Community 69 - "Барс — Telegram-агент Teenage Space"
Cohesion: 0.25
Nodes (7): Барс — Telegram-агент Teenage Space, Деплой, Запуск локально, Как это соединено с остальным проектом, Переменные окружения, Проверить поиск без Telegram, Структура

### Community 70 - "set-perms.dto.ts"
Cohesion: 0.40
Nodes (4): ADMIN_PERM_KEYS, AdminPermKey, SetPermsDto, IsObject

### Community 71 - "AuthProvider"
Cohesion: 0.40
Nodes (5): AuthProvider(), checkBanStatus(), hasPerm(), isActiveBan(), AdminPage()

## Knowledge Gaps
- **213 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+208 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SupabaseService` connect `SupabaseService` to `TelegramLinkService`, `CurrentUser`, `events.service.ts`, `CreateSubmissionDto`, `TrafficService`, `news.service.ts`, `ratings.controller.ts`, `supabase-auth.guard.ts`, `CapacityService`, `admin.service.ts`, `TrafficAdminService`, `HealthController`, `traffic.module.ts`, `AdminService`, `mappers.ts`, `SupabaseAuthGuard`, `traffic.service.ts`, `UsersAdminService`, `AuthController`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `CurrentUser` to `AuthController`, `CreateSubmissionDto`, `ratings.controller.ts`, `supabase-auth.guard.ts`, `SupabaseService`, `UsersAdminController`, `favorites.controller.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `useAuth()` connect `useAuth` to `tracking.ts`, `AdminPage.tsx`, `AnalyticsPage.tsx`, `AuthProvider`, `types.ts`, `useUI`, `ProfilePage.tsx`, `AuthPage`, `App.tsx`, `UsersPage.tsx`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _213 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useAuth` be split into smaller, more focused modules?**
  _Cohesion score 0.09714285714285714 - nodes in this community are weakly interconnected._
- **Should `TelegramLinkService` be split into smaller, more focused modules?**
  _Cohesion score 0.06745098039215686 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._