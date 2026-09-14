# Graph Report - Teenage Space  (2026-09-14)

## Corpus Check
- 270 files · ~89,043 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2010 nodes · 3957 edges · 136 communities (90 shown, 39 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 104 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `903a05cb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AuthContext.tsx
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
- RatingsService
- compilerOptions
- compilerOptions
- useEducation.ts
- supabase-auth.guard.ts
- App.tsx
- execute
- app.module.ts
- test_agent.py
- refreshProfile
- UsersAdminService
- types.ts
- conftest.py
- handlers.py
- UserAccountPage.tsx
- main.py
- UpdateSubmissionDto
- CapacityService
- ProfileController
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
- useEvents.ts
- plans.py
- constants.ts
- FavoritesService
- GridPage.tsx
- AdminService
- Supabase
- Param
- deploy
- useAuth
- system_prompt
- Body
- TestCannedReply
- Changelog
- Changelog
- Writing Guidelines for Postgres References
- ErrorBoundary
- get_settings
- ApiClient
- admin.service.ts
- Section Definitions
- education.service.ts
- HomePage.tsx
- TelegramLinkService
- deploy
- Барс — Telegram-агент Teenage Space
- Supabase Postgres Best Practices
- Runtime
- _clean_due_date
- bars
- AuthPage
- mappers.ts
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
- tracking.ts
- sitemap.controller.ts
- EducationController
- 20260826150917_super_admin_and_capacity_stats.sql
- TestSearchEventsTool
- 20260828111013_card_unique_views.sql
- agent.py
- catalog.py
- NewsPage.tsx
- EventCard.tsx
- search
- test_retrieval.py
- AdminController
- reminders.py
- UpdateEventDto
- Settings
- AuthController
- EventPage.tsx
- truncate_to_last_complete_line

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

## Communities (136 total, 39 thin omitted)

### Community 0 - "AuthContext.tsx"
Cohesion: 0.18
Nodes (14): AuthContext, AuthContextValue, api, authHeader(), reportNetworkTrouble(), request(), anonKey, supabase (+6 more)

### Community 1 - "useUI"
Cohesion: 0.09
Nodes (17): App(), CardSizeSlider(), ImageUploadField(), onPick(), ImageUploadFieldProps, NetTroubleToast(), Toast(), Theme (+9 more)

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
Nodes (20): BanStatusGuard, Injectable, Inject, StorageStatRow, UserStatRow, HealthController, Controller, Get (+12 more)

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
Nodes (15): CreateSubmissionDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max (+7 more)

### Community 10 - "traffic.service.ts"
Cohesion: 0.06
Nodes (40): DEVICE_TYPES, HeartbeatDto, IsBoolean, IsIn, IsUUID, DEVICE_TYPES, TARGET_TYPES, TrackCardViewDto (+32 more)

### Community 11 - "AdminPage.tsx"
Cohesion: 0.07
Nodes (39): EditEventModal(), save(), EditEventModalProps, emptyPostForm(), eventToPostForm(), FORMATS, LEVELS, parseAge() (+31 more)

### Community 12 - "RatingsService"
Cohesion: 0.11
Nodes (13): RateEventDto, IsInt, Max, Min, RatingsController, Body, Controller, Get (+5 more)

### Community 13 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+12 more)

### Community 14 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, isolatedModules, jsx, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch (+12 more)

### Community 15 - "useEducation.ts"
Cohesion: 0.20
Nodes (11): EducationIndex(), EducationPage, Sidebar(), NAV_CATS, EducationData, useEducation(), useEducationTracks(), carryCatalogSearch() (+3 more)

### Community 16 - "supabase-auth.guard.ts"
Cohesion: 0.10
Nodes (18): SetRoleDto, IsIn, AdminGuard, Injectable, PermissionGuard, Injectable, PERM_KEY, AuthedRequest (+10 more)

### Community 17 - "App.tsx"
Cohesion: 0.08
Nodes (18): AdminPage, AuthPage, BarsPage, EditAccountPage, HomeGate(), PrivacyPage, ProfilePage, PublishPage (+10 more)

### Community 18 - "execute"
Cohesion: 0.14
Nodes (24): _clip(), log_turn(), Quality-control journal and token accounting for Барс. Two bot-owned tables…, Fold this turn's Gemini token counts into the daily rollup. `usage_by_model` is…, Book a catalogue re-embed against the system chat, for the balance estimate., Drop journalled turns past the retention window. Called from sessions.sweep()., Append one exchange — the user's line and the assistant's — to the journal.…, record_embedding_usage() (+16 more)

### Community 19 - "app.module.ts"
Cohesion: 0.11
Nodes (22): AdminModule, Module, AppModule, Module, AuthModule, Module, BarsModule, Module (+14 more)

### Community 20 - "test_agent.py"
Cohesion: 0.10
Nodes (23): _call_signature(), _calls_this_turn(), _collected_tool_output(), _current_turn(), filter_tool_calls(), _prior_turns(), AIMessage, Trim what the agent asked for down to what is actually worth running. Three… (+15 more)

### Community 21 - "refreshProfile"
Cohesion: 0.11
Nodes (22): onLogout(), PolicyGate(), onAccept(), AuthProvider(), checkBanStatus(), hasPerm(), refreshProfile(), signOut() (+14 more)

### Community 22 - "UsersAdminService"
Cohesion: 0.11
Nodes (18): BanUserDto, IsIn, IsOptional, IsString, MaxLength, Body, Controller, Get (+10 more)

### Community 23 - "types.ts"
Cohesion: 0.13
Nodes (21): useBarsChat(), useBarsChats(), BarsPage(), chatTitle(), fmtWhen(), STATUS_LABELS, Transcript(), AdminPerms (+13 more)

### Community 24 - "conftest.py"
Cohesion: 0.13
Nodes (17): Барс — the Teenage Space event agent for Telegram., clear_cache(), clear_search_cache(), _event(), events(), fake_catalog(), FakeCatalog, no_vector_search() (+9 more)

### Community 25 - "handlers.py"
Cohesion: 0.11
Nodes (38): ApiError, render_plan(), chat_context(), _finish_reason(), get_usage_metadata_callback(), help_command(), Job, _keep_typing() (+30 more)

### Community 26 - "UserAccountPage.tsx"
Cohesion: 0.09
Nodes (16): BanModal(), BanModalProps, OPTIONS, ConfirmDialog(), ConfirmDialogProps, ROLE_BADGE, UsersManager(), UsersManagerProps (+8 more)

### Community 27 - "main.py"
Cohesion: 0.11
Nodes (23): AsyncIOScheduler, close_api(), Thin async client for the Teenage Space NestJS API. Public catalogue reads go…, build_scheduler(), configure_logging(), health(), main(), Bot (+15 more)

### Community 28 - "UpdateSubmissionDto"
Cohesion: 0.20
Nodes (9): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min (+1 more)

### Community 29 - "CapacityService"
Cohesion: 0.22
Nodes (6): CapacityController, Controller, Get, UseGuards, CapacityService, Injectable

### Community 30 - "ProfileController"
Cohesion: 0.08
Nodes (19): mapProfile(), ProfileController, Body, Controller, Delete, Get, HttpCode, Patch (+11 more)

### Community 31 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 32 - "tools.py"
Cohesion: 0.16
Nodes (21): _ctx(), get_event(), link_hint(), PlanStep, BaseModel, What Барс can actually do. Every tool is read-only against the catalogue or…, Показать полную карточку одного мероприятия по его id., Сохранить план подготовки к мероприятию и включить напоминания. Вызывай ТОЛЬКО… (+13 more)

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
Cohesion: 0.12
Nodes (24): AnalyticsPage, BarChart(), BarChartProps, setBarsCredit(), useBarsAnalytics(), useCapacity(), useTrafficOnline(), useTrafficSummary() (+16 more)

### Community 41 - "retrieval.py"
Cohesion: 0.16
Nodes (16): embedding_text(), What gets embedded. Title and description carry most of the signal; category,…, describe(), find_by_title(), _keyword_rank(), _normalise_title(), _order(), Any (+8 more)

### Community 42 - "CreateEventDto"
Cohesion: 0.15
Nodes (11): deriveAgeLabel(), deriveShortDesc(), CreateEventDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional (+3 more)

### Community 43 - "formatting.py"
Cohesion: 0.13
Nodes (15): chunks(), event_ids(), event_keyboard(), plan_keyboard(), Any, Turning the model's answer into a Telegram message. The model never emits URLs…, Split on paragraph boundaries so a long answer never breaks mid-tag., Referenced ids, in the order the model mentioned them, deduplicated. (+7 more)

### Community 44 - "useEvents.ts"
Cohesion: 0.27
Nodes (13): buildQuery(), EventFilters, useEvents(), useNews(), useNewsItem(), CacheEntry, getCached(), getEntry() (+5 more)

### Community 45 - "plans.py"
Cohesion: 0.25
Nodes (15): parse_date(), One connection, one atomic unit, for a change that spans several statements.…, transaction(), _age_from(), date, _add_reminder(), create_plan(), due_reminders() (+7 more)

### Community 46 - "constants.ts"
Cohesion: 0.14
Nodes (22): EventDetails(), EventDetailsProps, instagramUrl(), telegramUrl(), EventPhoto(), EventPhotoProps, NewsCard(), NewsCardProps (+14 more)

### Community 47 - "FavoritesService"
Cohesion: 0.15
Nodes (8): FavoritesController, Controller, Get, Param, Post, UseGuards, FavoritesService, Injectable

### Community 48 - "GridPage.tsx"
Cohesion: 0.14
Nodes (16): Chip(), ChipProps, useDebouncedValue(), useRatings(), cardViewKey(), useCardViewCounts(), CAT_KEYS, CONFIRM_COPY (+8 more)

### Community 49 - "AdminService"
Cohesion: 0.32
Nodes (3): AdminService, Inject, Injectable

### Community 50 - "Supabase"
Cohesion: 0.11
Nodes (15): Fix suggestion, Source, What happened, Skill Feedback, Steps, Core Principles, Debugging, Making and Committing Schema Changes (+7 more)

### Community 51 - "Param"
Cohesion: 0.16
Nodes (3): Delete, HttpCode, Param

### Community 52 - "deploy"
Cohesion: 0.29
Nodes (6): deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType, $schema

### Community 53 - "useAuth"
Cohesion: 0.16
Nodes (14): UsersPage, BannedGate(), periodText(), useAuth(), useAdmins(), useSubmissions(), STATUS_LABEL, TelegramLinkStatus (+6 more)

### Community 54 - "system_prompt"
Cohesion: 0.09
Nodes (10): Барс: who he is, and the hard rules that keep him useful. The persona is…, The agent's system message. The category and theme *vocabularies* used to be…, system_prompt(), Guards against the bot naming an event the catalogue does not contain.…, The census must inform the model, never licence it to answer without tools., TestCensusWording, TestGetEventOnAClosedEvent, TestGetEventOnAnUnknownId (+2 more)

### Community 55 - "Body"
Cohesion: 0.19
Nodes (3): Body, Patch, Post

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

### Community 61 - "get_settings"
Cohesion: 0.14
Nodes (26): api(), get_settings(), All configuration in one place, loaded from the environment (or bot/.env…, clean_dsn(), close_pool(), fetch_all(), init_pool(), pool() (+18 more)

### Community 62 - "ApiClient"
Cohesion: 0.27
Nodes (3): ApiClient, Any, Full snapshot including archived rows — used by the embedding indexer.

### Community 63 - "admin.service.ts"
Cohesion: 0.11
Nodes (21): CreateEducationTrackDto, IsOptional, IsString, CreateMaterialDto, IsArray, IsInt, IsOptional, IsString (+13 more)

### Community 64 - "Section Definitions"
Cohesion: 0.20
Nodes (9): 1. Query Performance (query), 2. Connection Management (conn), 3. Security & RLS (security), 4. Schema Design (schema), 5. Concurrency & Locking (lock), 6. Data Access Patterns (data), 7. Monitoring & Diagnostics (monitor), 8. Advanced Features (advanced) (+1 more)

### Community 65 - "education.service.ts"
Cohesion: 0.20
Nodes (8): EducationTrackRow, mapEducationTrack(), mapMaterial(), MaterialRow, EducationModule, Module, EducationService, Injectable

### Community 66 - "HomePage.tsx"
Cohesion: 0.20
Nodes (10): iconProps, ORBIT_ITEMS, Floater, iconProps, ORBIT_FLOATERS, WANDER_FLOATERS, Nodes, useFloaterRepulsion() (+2 more)

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

### Community 75 - "mappers.ts"
Cohesion: 0.10
Nodes (22): BAN_DURATIONS, BanDuration, ADMIN_PERM_KEYS, AdminPermKey, SetPermsDto, BAN_MS, TelegramLinkRow, EventRow (+14 more)

### Community 108 - "bars-admin.service.ts"
Cohesion: 0.05
Nodes (35): BarsAdminController, Body, Controller, Get, Param, Query, UseGuards, BarsAdminService (+27 more)

### Community 109 - "smalltalk.py"
Cohesion: 0.40
Nodes (5): canned_reply(), normalise(), Answers that never need a model. "Спасибо" cost 1086 prompt tokens and five and…, Casefold, drop punctuation and emoji, collapse whitespace. Turns "СПАСИБО!!! 🙏"…, A ready answer when the whole message is a pleasantry, otherwise None.

### Community 110 - "public.get_user_capacity_stats"
Cohesion: 0.33
Nodes (5): public.profiles, public.traffic_events, public.traffic_sessions, public.get_user_capacity_stats(), auth.users

### Community 111 - "tracking.ts"
Cohesion: 0.24
Nodes (11): AppLayout(), useHeartbeat(), EXCLUDED_PREFIXES, useTrackPageView(), base(), DeviceType, getDeviceType(), getSessionId() (+3 more)

### Community 112 - "sitemap.controller.ts"
Cohesion: 0.19
Nodes (9): SeoModule, Module, buildSitemapXml(), escapeXml(), SitemapController, Controller, Get, Header (+1 more)

### Community 113 - "EducationController"
Cohesion: 0.27
Nodes (7): EducationController, CacheTTL, Controller, Get, Header, Param, UseInterceptors

### Community 118 - "agent.py"
Cohesion: 0.22
Nodes (11): build_graph(), _chat_model(), GuardVerdict, AsyncConnectionPool, BaseModel, The graph itself: guard -> agent -> tools -> agent -> end, with a finalize…, _router_model(), BarsState (+3 more)

### Community 124 - "catalog.py"
Cohesion: 0.13
Nodes (18): age_requirement(), availability(), availability_line(), bishkek_now(), bishkek_today(), Catalog, deadline_in_days(), Any (+10 more)

### Community 125 - "NewsPage.tsx"
Cohesion: 0.21
Nodes (8): ArticlePage, NewsPage, NotFoundPage, Seo(), SeoProps, useArticle(), ArticlePage(), NewsPage()

### Community 126 - "EventCard.tsx"
Cohesion: 0.24
Nodes (10): CardMenu(), EventCard(), EventCardAdminActions, EventCardProps, instagramUrl(), plural(), dateToUTCDay(), deadlineBadge (+2 more)

### Community 127 - "search"
Cohesion: 0.23
Nodes (6): _cache_key(), date, What the catalogue has to say about one query. `matched` passes every filter.…, search(), SearchResult, TestSearchSplitsOnAge

### Community 128 - "test_retrieval.py"
Cohesion: 0.21
Nodes (8): age_fits(), is_open(), matches(), Whether a participant of this age is inside the event's stated range.…, Still worth recommending: not archived, not in the voting stage, not past its…, Retrieval: what the age filter hides, and how a named event is found anyway.…, TestAgeFits, TestIsOpen

### Community 129 - "AdminController"
Cohesion: 0.24
Nodes (5): AdminController, Controller, Get, Query, UseGuards

### Community 130 - "reminders.py"
Cohesion: 0.33
Nodes (9): site_url(), mark_failed(), mark_sent(), dispatch(), _keyboard_url(), Any, Bot, Delivery of scheduled reminders. The schedule lives in Postgres… (+1 more)

### Community 131 - "UpdateEventDto"
Cohesion: 0.22
Nodes (9): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min (+1 more)

### Community 132 - "Settings"
Cohesion: 0.33
Nodes (3): BaseSettings, Railway injects RAILWAY_PUBLIC_DOMAIN; a custom domain overrides it via env., Settings

### Community 133 - "AuthController"
Cohesion: 0.25
Nodes (6): AuthController, Controller, Get, Query, Throttle, UseGuards

### Community 134 - "EventPage.tsx"
Cohesion: 0.54
Nodes (6): EventPage, EventModal(), useEvent(), useFavorites(), trackCardView(), EventPage()

### Community 135 - "truncate_to_last_complete_line"
Cohesion: 0.39
Nodes (3): Cut a budget-truncated answer back to its last complete thought. The model…, truncate_to_last_complete_line(), TestTruncateToLastCompleteLine

## Knowledge Gaps
- **320 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+315 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 790 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SupabaseService` connect `SupabaseService` to `education.service.ts`, `TelegramLinkService`, `AuthController`, `NewsController`, `events.service.ts`, `traffic-admin.service.ts`, `traffic.service.ts`, `mappers.ts`, `bars-admin.service.ts`, `RatingsService`, `FavoritesService`, `supabase-auth.guard.ts`, `AdminService`, `sitemap.controller.ts`, `UsersAdminService`, `CapacityService`, `ProfileController`, `admin.service.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `supabase-auth.guard.ts` to `SupabaseService`, `AuthController`, `CreateSubmissionDto`, `RatingsService`, `FavoritesService`, `UsersAdminService`, `ProfileController`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `AdminController` connect `AdminController` to `CreateEventDto`, `Param`, `app.module.ts`, `Body`, `UpdateSubmissionDto`, `admin.service.ts`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _320 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useUI` be split into smaller, more focused modules?**
  _Cohesion score 0.09425287356321839 - nodes in this community are weakly interconnected._
- **Should `20260828103623_traffic_analytics.sql` be split into smaller, more focused modules?**
  _Cohesion score 0.0797979797979798 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._