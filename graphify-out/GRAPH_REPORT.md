# Graph Report - Teenage Space  (2026-10-18)

## Corpus Check
- 286 files · ~93,924 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2102 nodes · 4149 edges · 161 communities (96 shown, 54 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 106 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cb4edc8c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useBars.ts
- useUI
- 20260828103623_traffic_analytics.sql
- dependencies
- Platform Description (Privacy Policy Section 1)
- CurrentUser
- frontend/package.json
- PostForm.tsx
- events.service.ts
- BarsAdminService
- traffic.service.ts
- formatting.py
- ratings.controller.ts
- compilerOptions
- compilerOptions
- backend/package.json
- FavoritesController
- retrieval.py
- execute
- app.module.ts
- BarsAdminController
- AuthPage
- UsersAdminService
- devDependencies
- conftest.py
- handlers.py
- useAuth
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
- db.py
- plans.py
- EventDetails.tsx
- DateField.tsx
- GridPage.tsx
- BarsCreditDto
- Supabase
- Param
- deploy
- NewsController
- system_prompt
- get_settings
- TestCannedReply
- Changelog
- Changelog
- Writing Guidelines for Postgres References
- checkpoint_writes
- ChatQueues
- ApiClient
- UpdateEventDto
- Section Definitions
- checkpoints
- useEducation.ts
- TelegramLinkService
- deploy
- Барс — Telegram-агент Teenage Space
- Supabase Postgres Best Practices
- Runtime
- _clean_due_date
- bars
- admin.controller.ts
- HomePage.tsx
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
- Seo.tsx
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
- test_retrieval.py
- @nestjs/core
- @nestjs/schedule
- rxjs
- catalog.py
- SupabaseService
- AdminPage.tsx
- App.tsx
- getOrFetch
- bishkek_today
- types.ts
- CreateSubmissionDto
- CreateMaterialDto
- EventCard.tsx
- users-admin.service.ts
- UserAccountPage.tsx
- AdminService
- tracking.ts
- AdminController
- admin.service.ts
- usePublishInfo.ts
- main.tsx
- HttpCode
- TestSearchEventsTool
- truncate_to_last_complete_line
- Settings
- UpdateMaterialDto
- CreateNewsDto
- smalltalk.py
- TestGetEventOnAnUnknownId

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

## Communities (161 total, 54 thin omitted)

### Community 0 - "useBars.ts"
Cohesion: 0.23
Nodes (12): useBarsChat(), useBarsChats(), BarsPage(), chatTitle(), fmtWhen(), STATUS_LABELS, Transcript(), BarsAnalytics (+4 more)

### Community 1 - "useUI"
Cohesion: 0.07
Nodes (28): CardSizeSlider(), ConfirmDialog(), ConfirmDialogProps, ImageUploadField(), onPick(), ImageUploadFieldProps, FULL_DOT_COLORS, INLINE_DOT_COLORS (+20 more)

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
Cohesion: 0.06
Nodes (30): AuthController, Controller, Get, Query, Throttle, UseGuards, BanStatusGuard, Injectable (+22 more)

### Community 6 - "frontend/package.json"
Cohesion: 0.06
Nodes (30): dependencies, react, react-dom, react-helmet-async, react-router-dom, @supabase/supabase-js, devDependencies, @types/react (+22 more)

### Community 7 - "PostForm.tsx"
Cohesion: 0.11
Nodes (22): EditEventModal(), save(), EditEventModalProps, emptyPostForm(), eventToPostForm(), FORMATS, LEVELS, parseAge() (+14 more)

### Community 8 - "events.service.ts"
Cohesion: 0.09
Nodes (24): EventsController, CacheTTL, Controller, Get, Header, Param, Query, UseInterceptors (+16 more)

### Community 9 - "BarsAdminService"
Cohesion: 0.29
Nodes (3): BarsAdminService, bishkekDayKeys(), Injectable

### Community 10 - "traffic.service.ts"
Cohesion: 0.06
Nodes (40): DEVICE_TYPES, HeartbeatDto, IsBoolean, IsIn, IsUUID, DEVICE_TYPES, TARGET_TYPES, TrackCardViewDto (+32 more)

### Community 11 - "formatting.py"
Cohesion: 0.13
Nodes (15): chunks(), event_ids(), event_keyboard(), plan_keyboard(), Any, Turning the model's answer into a Telegram message. The model never emits URLs…, Split on paragraph boundaries so a long answer never breaks mid-tag., Referenced ids, in the order the model mentioned them, deduplicated. (+7 more)

### Community 12 - "ratings.controller.ts"
Cohesion: 0.11
Nodes (15): RateEventDto, IsInt, Max, Min, RatingsController, Body, Controller, Get (+7 more)

### Community 13 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+12 more)

### Community 14 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, isolatedModules, jsx, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch (+12 more)

### Community 15 - "backend/package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, start, start:dev, start:prod, version

### Community 16 - "FavoritesController"
Cohesion: 0.20
Nodes (6): FavoritesController, Controller, Get, Param, Post, UseGuards

### Community 17 - "retrieval.py"
Cohesion: 0.13
Nodes (17): embedding_text(), What gets embedded. Title and description carry most of the signal; category,…, _cache_key(), _keyword_rank(), _normalise_title(), _order(), Any, date (+9 more)

### Community 18 - "execute"
Cohesion: 0.13
Nodes (25): _clip(), log_turn(), Quality-control journal and token accounting for Барс. Two bot-owned tables…, Fold this turn's Gemini token counts into the daily rollup. `usage_by_model` is…, Book a catalogue re-embed against the system chat, for the balance estimate., Drop journalled turns past the retention window. Called from sessions.sweep()., Append one exchange — the user's line and the assistant's — to the journal.…, record_embedding_usage() (+17 more)

### Community 19 - "app.module.ts"
Cohesion: 0.09
Nodes (23): AdminModule, Module, AppModule, Module, BarsModule, Module, BotModule, Module (+15 more)

### Community 20 - "BarsAdminController"
Cohesion: 0.20
Nodes (6): BarsAdminController, Body, Controller, Param, UseGuards, Put

### Community 21 - "AuthPage"
Cohesion: 0.10
Nodes (29): onLogout(), onAccept(), AuthProvider(), checkBanStatus(), refreshProfile(), signOut(), isActiveBan(), AuthPage() (+21 more)

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
Nodes (38): api(), ApiError, render_plan(), chat_context(), _finish_reason(), get_usage_metadata_callback(), help_command(), Job (+30 more)

### Community 26 - "useAuth"
Cohesion: 0.16
Nodes (18): BannedGate(), periodText(), EventModal(), PolicyGate(), useAuth(), useAdmins(), EventFilters, useEvent() (+10 more)

### Community 28 - "UpdateSubmissionDto"
Cohesion: 0.17
Nodes (11): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min (+3 more)

### Community 29 - "CapacityService"
Cohesion: 0.22
Nodes (6): CapacityController, Controller, Get, UseGuards, CapacityService, Injectable

### Community 30 - "bars-admin.service.ts"
Cohesion: 0.20
Nodes (9): ChatListRow, CreditRow, DailyUsageRow, MessageRow, ModelPrice, SummaryRow, ToolRow, TopChatRow (+1 more)

### Community 31 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 32 - "tools.py"
Cohesion: 0.11
Nodes (27): _ctx(), get_event(), link_hint(), PlanStep, BaseModel, What Барс can actually do. Every tool is read-only against the catalogue or…, Показать полную карточку одного мероприятия по его id., Сохранить план подготовки к мероприятию и включить напоминания. Вызывай ТОЛЬКО… (+19 more)

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
Nodes (25): BarChart(), BarChartProps, setBarsCredit(), useBarsAnalytics(), useCapacity(), useTrafficOnline(), useTrafficSummary(), AnalyticsPage() (+17 more)

### Community 42 - "CreateEventDto"
Cohesion: 0.13
Nodes (14): deriveAgeLabel(), deriveShortDesc(), CreateEventDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional (+6 more)

### Community 43 - "agent.py"
Cohesion: 0.08
Nodes (34): build_graph(), _call_signature(), _calls_this_turn(), _chat_model(), _collected_tool_output(), _current_turn(), filter_tool_calls(), GuardVerdict (+26 more)

### Community 44 - "db.py"
Cohesion: 0.12
Nodes (26): clean_dsn(), close_pool(), fetch_all(), init_pool(), pool(), AsyncConnectionPool, Postgres access for the bot's own tables. Scope rule (see the plan): the bot…, One connection, one atomic unit, for a change that spans several statements.… (+18 more)

### Community 45 - "plans.py"
Cohesion: 0.28
Nodes (11): site_url(), due_reminders(), mark_failed(), mark_sent(), Prep plans and the reminders they generate. A plan is the reason someone opens…, dispatch(), _keyboard_url(), Any (+3 more)

### Community 46 - "EventDetails.tsx"
Cohesion: 0.11
Nodes (25): EventDetails(), EventDetailsProps, instagramUrl(), telegramUrl(), EventPhoto(), EventPhotoProps, NewsCard(), NewsCardProps (+17 more)

### Community 47 - "DateField.tsx"
Cohesion: 0.36
Nodes (6): DateField(), handleTextChange(), DateFieldProps, displayToIso(), isoToDisplay(), maskDigitsAsDate()

### Community 48 - "GridPage.tsx"
Cohesion: 0.13
Nodes (18): Chip(), ChipProps, hasPerm(), categoryJsonLd(), useDebouncedValue(), useRatings(), cardViewKey(), useCardViewCounts() (+10 more)

### Community 49 - "BarsCreditDto"
Cohesion: 0.20
Nodes (9): BarsCreditDto, IsOptional, IsString, Max, MaxLength, Min, Type, IsISO8601 (+1 more)

### Community 50 - "Supabase"
Cohesion: 0.11
Nodes (15): Fix suggestion, Source, What happened, Skill Feedback, Steps, Core Principles, Debugging, Making and Committing Schema Changes (+7 more)

### Community 51 - "Param"
Cohesion: 0.24
Nodes (4): Body, Param, Patch, Post

### Community 52 - "deploy"
Cohesion: 0.29
Nodes (6): deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType, $schema

### Community 53 - "NewsController"
Cohesion: 0.14
Nodes (12): mapNews(), NewsController, CacheTTL, Controller, Get, Header, Param, UseInterceptors (+4 more)

### Community 54 - "system_prompt"
Cohesion: 0.16
Nodes (6): Барс: who he is, and the hard rules that keep him useful. The persona is…, The agent's system message. The category and theme *vocabularies* used to be…, system_prompt(), The census must inform the model, never licence it to answer without tools., TestCensusWording, TestPrompts

### Community 55 - "get_settings"
Cohesion: 0.18
Nodes (20): AsyncIOScheduler, close_api(), Thin async client for the Teenage Space NestJS API. Public catalogue reads go…, get_settings(), All configuration in one place, loaded from the environment (or bot/.env…, build_scheduler(), configure_logging(), health() (+12 more)

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
Cohesion: 0.27
Nodes (3): ApiClient, Any, Full snapshot including archived rows — used by the embedding indexer.

### Community 63 - "UpdateEventDto"
Cohesion: 0.15
Nodes (16): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min (+8 more)

### Community 64 - "Section Definitions"
Cohesion: 0.20
Nodes (9): 1. Query Performance (query), 2. Connection Management (conn), 3. Security & RLS (security), 4. Schema Design (schema), 5. Concurrency & Locking (lock), 6. Data Access Patterns (data), 7. Monitoring & Diagnostics (monitor), 8. Advanced Features (advanced) (+1 more)

### Community 66 - "useEducation.ts"
Cohesion: 0.15
Nodes (17): EducationIndex(), EducationPage, Sidebar(), NAV_CATS, EDUCATION_INDEX_DESCRIPTION, EDUCATION_INDEX_TITLE, EDUCATION_TRACK_SEO, educationBreadcrumbJsonLd() (+9 more)

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

### Community 74 - "admin.controller.ts"
Cohesion: 0.10
Nodes (18): SetRoleDto, IsIn, AdminGuard, Injectable, AuthModule, Module, PermissionGuard, Injectable (+10 more)

### Community 75 - "HomePage.tsx"
Cohesion: 0.16
Nodes (13): iconProps, ORBIT_ITEMS, Floater, iconProps, ORBIT_FLOATERS, WANDER_FLOATERS, buildQuery(), useEvents() (+5 more)

### Community 108 - "BarsQueryDto"
Cohesion: 0.20
Nodes (8): Get, Query, BarsQueryDto, IsInt, IsOptional, Max, Min, Type

### Community 109 - "Seo.tsx"
Cohesion: 0.19
Nodes (9): ArticlePage, NotFoundPage, Seo(), SeoProps, SITE_URL, CATEGORY_SEO, CategorySeo, useArticle() (+1 more)

### Community 110 - "public.get_user_capacity_stats"
Cohesion: 0.33
Nodes (5): public.profiles, public.traffic_events, public.traffic_sessions, public.get_user_capacity_stats(), auth.users

### Community 112 - "sitemap.controller.ts"
Cohesion: 0.18
Nodes (10): SeoModule, Module, buildSitemapXml(), CATEGORY_KEYS, escapeXml(), SitemapController, Controller, Get (+2 more)

### Community 128 - "test_retrieval.py"
Cohesion: 0.18
Nodes (8): age_fits(), matches(), Whether a participant of this age is inside the event's stated range.…, find_by_title(), Resolve a query that names an event, tolerating typos and ignoring the age…, Retrieval: what the age filter hides, and how a named event is found anyway.…, TestAgeFits, TestFindByTitle

### Community 132 - "catalog.py"
Cohesion: 0.13
Nodes (15): age_requirement(), availability(), availability_line(), bishkek_now(), Catalog, Any, datetime, In-process snapshot of the event catalogue. The catalogue is small (dozens of… (+7 more)

### Community 133 - "SupabaseService"
Cohesion: 0.06
Nodes (26): Inject, TelegramLinkRow, StorageStatRow, UserStatRow, FavoritesService, Injectable, HealthController, Controller (+18 more)

### Community 134 - "AdminPage.tsx"
Cohesion: 0.09
Nodes (21): TrashIcon(), useAdminAnalytics(), useAdminArchivedEvents(), useAdminSubmissions(), AnalyticsTab(), ArchiveTab(), bodyToText(), buildFormFromSubmission() (+13 more)

### Community 135 - "App.tsx"
Cohesion: 0.07
Nodes (23): AdminPage, AnalyticsPage, AuthPage, BarsPage, EditAccountPage, EventPage, HomeGate(), PrivacyPage (+15 more)

### Community 136 - "getOrFetch"
Cohesion: 0.24
Nodes (13): NewsPage, NewsDetails(), NewsModal(), useNews(), useNewsItem(), CacheEntry, getCached(), getEntry() (+5 more)

### Community 137 - "bishkek_today"
Cohesion: 0.20
Nodes (16): bishkek_today(), deadline_in_days(), is_open(), parse_date(), date, Still worth recommending: not archived, not in the voting stage, not past its…, _age_from(), date (+8 more)

### Community 138 - "types.ts"
Cohesion: 0.12
Nodes (25): AuthContext, AuthContextValue, api, authHeader(), reportNetworkTrouble(), request(), anonKey, supabase (+17 more)

### Community 139 - "CreateSubmissionDto"
Cohesion: 0.08
Nodes (22): mapSubmission(), CreateSubmissionDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString (+14 more)

### Community 140 - "CreateMaterialDto"
Cohesion: 0.29
Nodes (5): CreateMaterialDto, IsArray, IsInt, IsOptional, IsString

### Community 141 - "EventCard.tsx"
Cohesion: 0.23
Nodes (11): CardMenu(), EventCard(), EventCardAdminActions, EventCardProps, instagramUrl(), plural(), dateToUTCDay(), deadlineBadge (+3 more)

### Community 142 - "users-admin.service.ts"
Cohesion: 0.24
Nodes (7): BAN_DURATIONS, BanDuration, ADMIN_PERM_KEYS, AdminPermKey, SetPermsDto, BAN_MS, IsObject

### Community 143 - "UserAccountPage.tsx"
Cohesion: 0.11
Nodes (13): BanModal(), BanModalProps, OPTIONS, ROLE_BADGE, UsersManager(), UsersManagerProps, useAdminUser(), useAdminUsers() (+5 more)

### Community 144 - "AdminService"
Cohesion: 0.25
Nodes (3): AdminService, Inject, Injectable

### Community 145 - "tracking.ts"
Cohesion: 0.29
Nodes (9): AppLayout(), useHeartbeat(), base(), DeviceType, getDeviceType(), getSessionId(), LinkKind, sendHeartbeat() (+1 more)

### Community 146 - "AdminController"
Cohesion: 0.33
Nodes (5): AdminController, Controller, Get, Query, UseGuards

### Community 147 - "admin.service.ts"
Cohesion: 0.08
Nodes (29): CreateEducationTrackDto, IsOptional, IsString, IsOptional, IsString, UpdateEducationTrackDto, EducationTrackRow, EventRow (+21 more)

### Community 148 - "usePublishInfo.ts"
Cohesion: 0.36
Nodes (7): fmtWhen(), PublishInfo(), who(), PATH, PublisherInfo, PublishInfo, usePublishInfo()

### Community 149 - "main.tsx"
Cohesion: 0.15
Nodes (6): App(), ErrorBoundary, Props, State, UIProvider(), initExternalAnalytics()

### Community 152 - "truncate_to_last_complete_line"
Cohesion: 0.39
Nodes (3): Cut a budget-truncated answer back to its last complete thought. The model…, truncate_to_last_complete_line(), TestTruncateToLastCompleteLine

### Community 153 - "Settings"
Cohesion: 0.33
Nodes (3): BaseSettings, Railway injects RAILWAY_PUBLIC_DOMAIN; a custom domain overrides it via env., Settings

### Community 155 - "UpdateMaterialDto"
Cohesion: 0.29
Nodes (5): IsArray, IsInt, IsOptional, IsString, UpdateMaterialDto

### Community 156 - "CreateNewsDto"
Cohesion: 0.50
Nodes (3): CreateNewsDto, IsOptional, IsString

### Community 158 - "smalltalk.py"
Cohesion: 0.40
Nodes (5): canned_reply(), normalise(), Answers that never need a model. "Спасибо" cost 1086 prompt tokens and five and…, Casefold, drop punctuation and emoji, collapse whitespace. Turns "СПАСИБО!!! 🙏"…, A ready answer when the whole message is a pleasantry, otherwise None.

## Knowledge Gaps
- **340 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+335 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 833 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **54 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SupabaseService` connect `SupabaseService` to `TelegramLinkService`, `CurrentUser`, `TrafficAdminService`, `events.service.ts`, `BarsAdminService`, `admin.controller.ts`, `CreateSubmissionDto`, `ratings.controller.ts`, `traffic.service.ts`, `users-admin.service.ts`, `AdminService`, `sitemap.controller.ts`, `admin.service.ts`, `NewsController`, `UsersAdminService`, `CapacityService`, `bars-admin.service.ts`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `AdminService` connect `AdminService` to `admin.controller.ts`, `CreateEventDto`, `CreateMaterialDto`, `UpdateSubmissionDto`, `admin.service.ts`, `Param`, `HttpCode`, `UpdateMaterialDto`, `CreateNewsDto`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `CurrentUser` to `admin.controller.ts`, `CreateEventDto`, `ratings.controller.ts`, `CreateSubmissionDto`, `FavoritesController`, `Param`, `UsersAdminService`, `CreateNewsDto`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _340 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useUI` be split into smaller, more focused modules?**
  _Cohesion score 0.07188160676532769 - nodes in this community are weakly interconnected._
- **Should `20260828103623_traffic_analytics.sql` be split into smaller, more focused modules?**
  _Cohesion score 0.0797979797979798 - nodes in this community are weakly interconnected._
- **Should `Platform Description (Privacy Policy Section 1)` be split into smaller, more focused modules?**
  _Cohesion score 0.08143939393939394 - nodes in this community are weakly interconnected._