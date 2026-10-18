# Graph Report - Teenage Space  (2026-10-18)

## Corpus Check
- 285 files · ~93,169 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2099 nodes · 4145 edges · 164 communities (99 shown, 54 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 106 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c7fdc205`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- types.ts
- ArticlePage.tsx
- 20260828103623_traffic_analytics.sql
- dependencies
- Platform Description (Privacy Policy Section 1)
- ProfileController
- frontend/package.json
- ImageUploadField.tsx
- events.service.ts
- BarsAdminService
- traffic.service.ts
- truncate_to_last_complete_line
- RatingsService
- compilerOptions
- compilerOptions
- backend/package.json
- FavoritesService
- retrieval.py
- execute
- app.module.ts
- BarsAdminController
- main.tsx
- UsersAdminService
- devDependencies
- conftest.py
- handlers.py
- EducationController
- checkpoint_blobs
- UpdateSubmissionDto
- CapacityService
- bars-admin.service.ts
- nest-cli.json
- tools.py
- tsconfig.build.json
- HTML Entry Point (index.html)
- vite-env.d.ts
- vercel.json
- Graphify Query Workflow
- TrafficAdminService
- AnalyticsPage.tsx
- checkpoint_migrations
- CreateEventDto
- agent.py
- get_settings
- formatting.py
- EventDetails.tsx
- DateField.tsx
- GridPage.tsx
- BarsCreditDto
- Supabase
- AdminController
- deploy
- NewsController
- system_prompt
- plans.py
- TestCannedReply
- Changelog
- Changelog
- Writing Guidelines for Postgres References
- checkpoint_writes
- ChatQueues
- ApiClient
- IsLooseUrl
- Section Definitions
- checkpoints
- tracking.ts
- TelegramLinkService
- deploy
- Барс — Telegram-агент Teenage Space
- Supabase Postgres Best Practices
- Runtime
- _clean_due_date
- bars
- admin.controller.ts
- useAuth
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
- auth.controller.ts
- public.get_user_capacity_stats
- class-transformer
- sitemap.controller.ts
- class-validator
- 20260826150917_super_admin_and_capacity_stats.sql
- 20260828111013_card_unique_views.sql
- compression
- helmet
- @nestjs/cache-manager
- @nestjs/common
- @nestjs/config
- search
- @nestjs/core
- @nestjs/schedule
- rxjs
- test_smalltalk.py
- HealthController
- AdminPage.tsx
- App.tsx
- getOrFetch
- bishkek_today
- AuthContext.tsx
- SubmissionsService
- CreateMaterialDto
- HomePage.tsx
- users-admin.service.ts
- UserAccountPage.tsx
- AdminService
- usePublishInfo.ts
- find_by_title
- SupabaseService
- EventCard.tsx
- ErrorBoundary
- HttpCode
- TestSearchEventsTool
- AuthPage
- UpdateEventDto
- UpdateMaterialDto
- CreateSubmissionDto
- smalltalk.py
- TestGetEventOnAnUnknownId
- traffic-admin.service.ts
- TrafficCleanupService
- Sidebar.tsx

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 79 edges
2. `SupabaseService` - 48 edges
3. `useUI()` - 39 edges
4. `AdminService` - 31 edges
5. `get_settings()` - 30 edges
6. `api` - 30 edges
7. `AdminController` - 27 edges
8. `CurrentUser` - 26 edges
9. `CreateEventDto` - 20 edges
10. `compilerOptions` - 20 edges

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

## Communities (164 total, 54 thin omitted)

### Community 0 - "types.ts"
Cohesion: 0.11
Nodes (24): BarsPage, useBarsChat(), useBarsChats(), useSubmissions(), BarsPage(), chatTitle(), fmtWhen(), STATUS_LABELS (+16 more)

### Community 1 - "ArticlePage.tsx"
Cohesion: 0.67
Nodes (3): ArticlePage, useArticle(), ArticlePage()

### Community 2 - "20260828103623_traffic_analytics.sql"
Cohesion: 0.08
Nodes (39): auth, education_tracks, events, favorites, materials, news, profiles, ratings (+31 more)

### Community 3 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, cache-manager, @nestjs/platform-express, @nestjs/throttler, reflect-metadata, @supabase/supabase-js, @types/compression, @supabase/supabase-js (+5 more)

### Community 4 - "Platform Description (Privacy Policy Section 1)"
Cohesion: 0.08
Nodes (33): Auto-Push Working Agreement, Backend Build Job, Build Check Workflow, Frontend Build Job, Check Required Secrets Step, Link Project Step, Migrate Job, Push Migrations Step (+25 more)

### Community 5 - "ProfileController"
Cohesion: 0.12
Nodes (11): ProfileController, Body, Controller, Delete, Get, HttpCode, Patch, UseGuards (+3 more)

### Community 6 - "frontend/package.json"
Cohesion: 0.06
Nodes (30): dependencies, react, react-dom, react-helmet-async, react-router-dom, @supabase/supabase-js, devDependencies, @types/react (+22 more)

### Community 7 - "ImageUploadField.tsx"
Cohesion: 0.29
Nodes (7): ImageUploadField(), onPick(), ImageUploadFieldProps, CompressedImage, compressImage(), RESIZABLE_TYPES, uploadPostImage()

### Community 8 - "events.service.ts"
Cohesion: 0.09
Nodes (24): EventsController, CacheTTL, Controller, Get, Header, Param, Query, UseInterceptors (+16 more)

### Community 9 - "BarsAdminService"
Cohesion: 0.29
Nodes (3): BarsAdminService, bishkekDayKeys(), Injectable

### Community 10 - "traffic.service.ts"
Cohesion: 0.06
Nodes (40): DEVICE_TYPES, HeartbeatDto, IsBoolean, IsIn, IsUUID, DEVICE_TYPES, TARGET_TYPES, TrackCardViewDto (+32 more)

### Community 11 - "truncate_to_last_complete_line"
Cohesion: 0.13
Nodes (11): chunks(), event_ids(), Cut a budget-truncated answer back to its last complete thought. The model…, Split on paragraph boundaries so a long answer never breaks mid-tag., Referenced ids, in the order the model mentioned them, deduplicated., to_html(), truncate_to_last_complete_line(), Message shaping: recovering a truncated answer, and splitting a long one. (+3 more)

### Community 12 - "RatingsService"
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

### Community 16 - "FavoritesService"
Cohesion: 0.14
Nodes (8): FavoritesController, Controller, Get, Param, Post, UseGuards, FavoritesService, Injectable

### Community 17 - "retrieval.py"
Cohesion: 0.16
Nodes (19): age_requirement(), bishkek_now(), embedding_text(), datetime, In-process snapshot of the event catalogue. The catalogue is small (dozens of…, How the event states its age rule, for telling a user why it doesn't fit., What gets embedded. Title and description carry most of the signal; category,…, age_mismatch_note() (+11 more)

### Community 18 - "execute"
Cohesion: 0.13
Nodes (24): _clip(), log_turn(), Quality-control journal and token accounting for Барс. Two bot-owned tables…, Fold this turn's Gemini token counts into the daily rollup. `usage_by_model` is…, Book a catalogue re-embed against the system chat, for the balance estimate., Drop journalled turns past the retention window. Called from sessions.sweep()., Append one exchange — the user's line and the assistant's — to the journal.…, record_embedding_usage() (+16 more)

### Community 19 - "app.module.ts"
Cohesion: 0.10
Nodes (25): AdminModule, Module, AppModule, Module, AuthModule, Module, BarsModule, Module (+17 more)

### Community 20 - "BarsAdminController"
Cohesion: 0.20
Nodes (6): BarsAdminController, Body, Controller, Param, UseGuards, Put

### Community 21 - "main.tsx"
Cohesion: 0.08
Nodes (25): App(), onLogout(), PolicyGate(), onAccept(), AuthProvider(), checkBanStatus(), hasPerm(), refreshProfile() (+17 more)

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
Cohesion: 0.10
Nodes (36): ApiError, chat_context(), _finish_reason(), get_usage_metadata_callback(), help_command(), Job, _keep_typing(), link_command() (+28 more)

### Community 26 - "EducationController"
Cohesion: 0.15
Nodes (11): EducationController, CacheTTL, Controller, Get, Header, Param, UseInterceptors, EducationModule (+3 more)

### Community 28 - "UpdateSubmissionDto"
Cohesion: 0.17
Nodes (11): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min (+3 more)

### Community 29 - "CapacityService"
Cohesion: 0.16
Nodes (8): CapacityController, Controller, Get, UseGuards, CapacityService, StorageStatRow, Injectable, UserStatRow

### Community 30 - "bars-admin.service.ts"
Cohesion: 0.20
Nodes (9): ChatListRow, CreditRow, DailyUsageRow, MessageRow, ModelPrice, SummaryRow, ToolRow, TopChatRow (+1 more)

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

### Community 36 - "vercel.json"
Cohesion: 0.50
Nodes (3): headers, redirects, rewrites

### Community 39 - "TrafficAdminService"
Cohesion: 0.11
Nodes (13): TrafficQueryDto, IsInt, IsOptional, Max, Min, Type, TrafficAdminController, Controller (+5 more)

### Community 40 - "AnalyticsPage.tsx"
Cohesion: 0.11
Nodes (26): AnalyticsPage, BarChart(), BarChartProps, setBarsCredit(), useBarsAnalytics(), useCapacity(), useTrafficOnline(), useTrafficSummary() (+18 more)

### Community 42 - "CreateEventDto"
Cohesion: 0.17
Nodes (11): CreateEventDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max (+3 more)

### Community 43 - "agent.py"
Cohesion: 0.08
Nodes (34): build_graph(), _call_signature(), _calls_this_turn(), _chat_model(), _collected_tool_output(), _current_turn(), filter_tool_calls(), GuardVerdict (+26 more)

### Community 44 - "get_settings"
Cohesion: 0.08
Nodes (45): AsyncIOScheduler, BaseSettings, api(), close_api(), Thin async client for the Teenage Space NestJS API. Public catalogue reads go…, get_settings(), All configuration in one place, loaded from the environment (or bot/.env…, Railway injects RAILWAY_PUBLIC_DOMAIN; a custom domain overrides it via env. (+37 more)

### Community 45 - "formatting.py"
Cohesion: 0.18
Nodes (17): event_keyboard(), plan_keyboard(), Any, Turning the model's answer into a Telegram message. The model never emits URLs…, Telegram rejects an entire message over one malformed button URL, which would…, render_plan(), site_url(), _usable_url() (+9 more)

### Community 46 - "EventDetails.tsx"
Cohesion: 0.11
Nodes (27): EventDetails(), EventDetailsProps, instagramUrl(), telegramUrl(), EventPhoto(), EventPhotoProps, NewsCard(), NewsCardProps (+19 more)

### Community 47 - "DateField.tsx"
Cohesion: 0.36
Nodes (6): DateField(), handleTextChange(), DateFieldProps, displayToIso(), isoToDisplay(), maskDigitsAsDate()

### Community 48 - "GridPage.tsx"
Cohesion: 0.09
Nodes (27): CardSizeSlider(), NetTroubleToast(), NewsModal(), Toast(), Theme, UIContext, UIContextValue, useUI() (+19 more)

### Community 49 - "BarsCreditDto"
Cohesion: 0.20
Nodes (9): BarsCreditDto, IsOptional, IsString, Max, MaxLength, Min, Type, IsISO8601 (+1 more)

### Community 50 - "Supabase"
Cohesion: 0.11
Nodes (15): Fix suggestion, Source, What happened, Skill Feedback, Steps, Core Principles, Debugging, Making and Committing Schema Changes (+7 more)

### Community 51 - "AdminController"
Cohesion: 0.16
Nodes (9): AdminController, Body, Controller, Get, Param, Patch, Post, Query (+1 more)

### Community 52 - "deploy"
Cohesion: 0.29
Nodes (6): deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType, $schema

### Community 53 - "NewsController"
Cohesion: 0.14
Nodes (12): mapNews(), NewsController, CacheTTL, Controller, Get, Header, Param, UseInterceptors (+4 more)

### Community 54 - "system_prompt"
Cohesion: 0.16
Nodes (6): Барс: who he is, and the hard rules that keep him useful. The persona is…, The agent's system message. The category and theme *vocabularies* used to be…, system_prompt(), The census must inform the model, never licence it to answer without tools., TestCensusWording, TestPrompts

### Community 55 - "plans.py"
Cohesion: 0.24
Nodes (16): fetch_all(), Any, One connection, one atomic unit, for a change that spans several statements.…, transaction(), _add_reminder(), create_plan(), due_reminders(), _fire_at() (+8 more)

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

### Community 61 - "ChatQueues"
Cohesion: 0.24
Nodes (5): ChatQueues, Any, Per-chat ordering, cross-chat parallelism. One worker per active chat means a…, Process-wide singletons wired up at boot by main.py. Kept in one small module…, Queue

### Community 62 - "ApiClient"
Cohesion: 0.33
Nodes (3): ApiClient, Any, Full snapshot including archived rows — used by the embedding indexer.

### Community 63 - "IsLooseUrl"
Cohesion: 0.17
Nodes (14): CreateNewsDto, IsOptional, IsString, ExtraLinkDto, IsOptional, IsString, IsLooseUrl(), normalizeUrl() (+6 more)

### Community 64 - "Section Definitions"
Cohesion: 0.20
Nodes (9): 1. Query Performance (query), 2. Connection Management (conn), 3. Security & RLS (security), 4. Schema Design (schema), 5. Concurrency & Locking (lock), 6. Data Access Patterns (data), 7. Monitoring & Diagnostics (monitor), 8. Advanced Features (advanced) (+1 more)

### Community 66 - "tracking.ts"
Cohesion: 0.18
Nodes (17): EventPage, NewsPage, EventModal(), useEvent(), useFavorites(), useHeartbeat(), useNewsItem(), base() (+9 more)

### Community 67 - "TelegramLinkService"
Cohesion: 0.06
Nodes (27): BotAuthGuard, secretsMatch(), Injectable, BotController, Body, Controller, Delete, Get (+19 more)

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

### Community 74 - "admin.controller.ts"
Cohesion: 0.10
Nodes (18): SetRoleDto, IsIn, AdminGuard, Injectable, PermissionGuard, Injectable, PERM_KEY, AuthedRequest (+10 more)

### Community 75 - "useAuth"
Cohesion: 0.15
Nodes (14): UsersPage, BannedGate(), periodText(), ROLE_BADGE, UsersManager(), UsersManagerProps, useAuth(), useAdmins() (+6 more)

### Community 108 - "BarsQueryDto"
Cohesion: 0.20
Nodes (8): Get, Query, BarsQueryDto, IsInt, IsOptional, Max, Min, Type

### Community 109 - "auth.controller.ts"
Cohesion: 0.15
Nodes (8): AuthController, Controller, Get, Query, Throttle, UseGuards, BanStatusGuard, Injectable

### Community 110 - "public.get_user_capacity_stats"
Cohesion: 0.33
Nodes (5): public.profiles, public.traffic_events, public.traffic_sessions, public.get_user_capacity_stats(), auth.users

### Community 112 - "sitemap.controller.ts"
Cohesion: 0.18
Nodes (10): SeoModule, Module, buildSitemapXml(), CATEGORY_KEYS, escapeXml(), SitemapController, Controller, Get (+2 more)

### Community 128 - "search"
Cohesion: 0.14
Nodes (11): age_fits(), matches(), Whether a participant of this age is inside the event's stated range.…, _cache_key(), date, What the catalogue has to say about one query. `matched` passes every filter.…, search(), SearchResult (+3 more)

### Community 132 - "test_smalltalk.py"
Cohesion: 0.17
Nodes (10): availability(), availability_line(), Catalog, Any, How many open events sit in each catalogue category, zeros included. The zeros…, The one-line catalogue census handed to the model on every turn., fixture, Canned answers: what gets intercepted, and — more importantly — what must not.… (+2 more)

### Community 133 - "HealthController"
Cohesion: 0.14
Nodes (9): HealthController, Controller, Get, SkipThrottle, HealthModule, Module, KeepaliveService, Injectable (+1 more)

### Community 134 - "AdminPage.tsx"
Cohesion: 0.05
Nodes (43): Chip(), ChipProps, EditEventModal(), save(), emptyPostForm(), eventToPostForm(), FORMATS, LEVELS (+35 more)

### Community 135 - "App.tsx"
Cohesion: 0.08
Nodes (20): AdminPage, AppLayout(), AuthPage, EditAccountPage, EducationPage, HomeGate(), PrivacyPage, ProfilePage (+12 more)

### Community 136 - "getOrFetch"
Cohesion: 0.16
Nodes (19): EducationIndex(), EDUCATION_INDEX_DESCRIPTION, EDUCATION_INDEX_TITLE, EDUCATION_TRACK_SEO, educationBreadcrumbJsonLd(), educationCollectionJsonLd(), EducationTrackSeo, useEducation() (+11 more)

### Community 137 - "bishkek_today"
Cohesion: 0.29
Nodes (9): bishkek_today(), deadline_in_days(), is_open(), parse_date(), date, Still worth recommending: not archived, not in the voting stage, not past its…, _age_from(), date (+1 more)

### Community 138 - "AuthContext.tsx"
Cohesion: 0.15
Nodes (18): EditEventModalProps, AuthContext, AuthContextValue, EventFilters, api, authHeader(), reportNetworkTrouble(), request() (+10 more)

### Community 139 - "SubmissionsService"
Cohesion: 0.15
Nodes (9): mapSubmission(), SubmissionsController, Body, Controller, Get, Post, UseGuards, SubmissionsService (+1 more)

### Community 140 - "CreateMaterialDto"
Cohesion: 0.29
Nodes (5): CreateMaterialDto, IsArray, IsInt, IsOptional, IsString

### Community 141 - "HomePage.tsx"
Cohesion: 0.12
Nodes (18): NotFoundPage, Seo(), SeoProps, SITE_URL, HOME_DESCRIPTION, HOME_JSON_LD, HOME_TITLE, Floater (+10 more)

### Community 142 - "users-admin.service.ts"
Cohesion: 0.16
Nodes (12): BAN_DURATIONS, BanDuration, BanUserDto, IsIn, IsOptional, IsString, MaxLength, ADMIN_PERM_KEYS (+4 more)

### Community 143 - "UserAccountPage.tsx"
Cohesion: 0.10
Nodes (17): BanModal(), BanModalProps, OPTIONS, ConfirmDialog(), ConfirmDialogProps, FULL_DOT_COLORS, INLINE_DOT_COLORS, Loader() (+9 more)

### Community 144 - "AdminService"
Cohesion: 0.17
Nodes (6): AdminService, deriveAgeLabel(), deriveShortDesc(), Inject, Injectable, mapEvent()

### Community 145 - "usePublishInfo.ts"
Cohesion: 0.36
Nodes (7): fmtWhen(), PublishInfo(), who(), PATH, PublisherInfo, PublishInfo, usePublishInfo()

### Community 146 - "find_by_title"
Cohesion: 0.36
Nodes (4): find_by_title(), _normalise_title(), Resolve a query that names an event, tolerating typos and ignoring the age…, TestFindByTitle

### Community 147 - "SupabaseService"
Cohesion: 0.09
Nodes (26): CreateEducationTrackDto, IsOptional, IsString, IsOptional, IsString, UpdateEducationTrackDto, Inject, TelegramLinkRow (+18 more)

### Community 148 - "EventCard.tsx"
Cohesion: 0.24
Nodes (10): CardMenu(), EventCard(), EventCardAdminActions, EventCardProps, instagramUrl(), plural(), dateToUTCDay(), deadlineBadge (+2 more)

### Community 149 - "ErrorBoundary"
Cohesion: 0.22
Nodes (3): ErrorBoundary, Props, State

### Community 152 - "AuthPage"
Cohesion: 0.28
Nodes (14): AuthPage(), finishSignIn(), onForgot1(), onForgot2(), onForgot3(), onLogin(), onPrimary(), onReg1() (+6 more)

### Community 153 - "UpdateEventDto"
Cohesion: 0.18
Nodes (11): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min (+3 more)

### Community 155 - "UpdateMaterialDto"
Cohesion: 0.29
Nodes (5): IsArray, IsInt, IsOptional, IsString, UpdateMaterialDto

### Community 156 - "CreateSubmissionDto"
Cohesion: 0.18
Nodes (11): CreateSubmissionDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max (+3 more)

### Community 158 - "smalltalk.py"
Cohesion: 0.40
Nodes (5): canned_reply(), normalise(), Answers that never need a model. "Спасибо" cost 1086 prompt tokens and five and…, Casefold, drop punctuation and emoji, collapse whitespace. Turns "СПАСИБО!!! 🙏"…, A ready answer when the whole message is a pleasantry, otherwise None.

### Community 161 - "traffic-admin.service.ts"
Cohesion: 0.25
Nodes (7): CardUniqueViewsRow, DailyTrendRow, DeviceRow, HourlyRow, LoginSplitRow, TopCardRow, TopLinkRow

### Community 162 - "TrafficCleanupService"
Cohesion: 0.33
Nodes (4): TrafficCleanupService, Cron, Injectable, yesterdayInBishkek()

### Community 163 - "Sidebar.tsx"
Cohesion: 0.60
Nodes (3): Sidebar(), NAV_CATS, carryCatalogSearch()

## Knowledge Gaps
- **339 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+334 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 832 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **54 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SupabaseService` connect `SupabaseService` to `HealthController`, `ProfileController`, `events.service.ts`, `BarsAdminService`, `traffic.service.ts`, `SubmissionsService`, `RatingsService`, `users-admin.service.ts`, `AdminService`, `FavoritesService`, `UsersAdminService`, `EducationController`, `CapacityService`, `bars-admin.service.ts`, `traffic-admin.service.ts`, `TrafficCleanupService`, `TrafficAdminService`, `NewsController`, `TelegramLinkService`, `admin.controller.ts`, `auth.controller.ts`, `sitemap.controller.ts`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `AdminService` connect `AdminService` to `admin.controller.ts`, `CreateEventDto`, `CreateMaterialDto`, `app.module.ts`, `SupabaseService`, `AdminController`, `HttpCode`, `UpdateMaterialDto`, `UpdateSubmissionDto`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `admin.controller.ts` to `TelegramLinkService`, `ProfileController`, `CreateEventDto`, `SubmissionsService`, `RatingsService`, `auth.controller.ts`, `FavoritesService`, `AdminController`, `UsersAdminService`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _339 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1103448275862069 - nodes in this community are weakly interconnected._
- **Should `20260828103623_traffic_analytics.sql` be split into smaller, more focused modules?**
  _Cohesion score 0.0797979797979798 - nodes in this community are weakly interconnected._
- **Should `Platform Description (Privacy Policy Section 1)` be split into smaller, more focused modules?**
  _Cohesion score 0.08143939393939394 - nodes in this community are weakly interconnected._