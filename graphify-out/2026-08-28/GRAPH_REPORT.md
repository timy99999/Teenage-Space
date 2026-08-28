# Graph Report - Teenage Space  (2026-08-28)

## Corpus Check
- 161 files · ~46,824 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1115 nodes · 2258 edges · 59 communities (54 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 72 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f4947545`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- constants.ts
- AdminController
- types.ts
- dependencies
- Platform Description (Privacy Policy Section 1)
- profile.service.ts
- frontend/package.json
- AdminPage.tsx
- events.service.ts
- CreateSubmissionDto
- traffic.service.ts
- mappers.ts
- ratings.controller.ts
- compilerOptions
- compilerOptions
- supabase-auth.guard.ts
- SupabaseService
- GridPage.tsx
- useAuth
- app.module.ts
- CreateNewsDto
- AuthPage
- users-admin.controller.ts
- App.tsx
- favorites.controller.ts
- useEducationTracks
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
- traffic-admin.controller.ts
- AnalyticsPage.tsx
- useEducation.ts
- CreateEventDto
- UserAccountPage.tsx
- ImageUploadField.tsx
- PublishNewsTab
- PostForm.tsx
- HealthController
- main.tsx
- traffic-admin.service.ts
- TrafficCleanupService
- AdminService
- deploy
- permission.guard.ts
- useEvents.ts
- BottomNav.tsx
- SupabaseAuthGuard
- UpdateMaterialDto
- PrivacyPage.tsx

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 67 edges
2. `SupabaseService` - 38 edges
3. `useUI()` - 37 edges
4. `AdminService` - 28 edges
5. `api` - 28 edges
6. `AdminController` - 25 edges
7. `compilerOptions` - 20 edges
8. `CurrentUser` - 19 edges
9. `CreateEventDto` - 17 edges
10. `SupabaseAuthGuard` - 17 edges

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

## Communities (59 total, 5 thin omitted)

### Community 0 - "constants.ts"
Cohesion: 0.07
Nodes (46): AppLayout(), CardMenu(), EventCard(), EventCardAdminActions, instagramUrl(), EventModal(), instagramUrl(), telegramUrl() (+38 more)

### Community 1 - "AdminController"
Cohesion: 0.12
Nodes (9): AdminController, Body, Controller, Delete, HttpCode, Param, Patch, Post (+1 more)

### Community 2 - "types.ts"
Cohesion: 0.12
Nodes (18): BannedGate(), onLogout(), periodText(), AuthContextValue, AdminPermKey, AdminPerms, AdminUser, AdminUserDetail (+10 more)

### Community 3 - "dependencies"
Cohesion: 0.04
Nodes (46): dependencies, cache-manager, class-transformer, class-validator, helmet, @nestjs/cache-manager, @nestjs/common, @nestjs/config (+38 more)

### Community 4 - "Platform Description (Privacy Policy Section 1)"
Cohesion: 0.08
Nodes (33): Auto-Push Working Agreement, Backend Build Job, Build Check Workflow, Frontend Build Job, Check Required Secrets Step, Link Project Step, Migrate Job, Push Migrations Step (+25 more)

### Community 5 - "profile.service.ts"
Cohesion: 0.09
Nodes (21): mapProfile(), ProfileController, Body, Controller, Delete, Get, HttpCode, Patch (+13 more)

### Community 6 - "frontend/package.json"
Cohesion: 0.07
Nodes (28): dependencies, react, react-dom, react-router-dom, @supabase/supabase-js, devDependencies, @types/react, @types/react-dom (+20 more)

### Community 7 - "AdminPage.tsx"
Cohesion: 0.08
Nodes (24): Chip(), ChipProps, TrashIcon(), useAdminAnalytics(), useAdminArchivedEvents(), useAdminSubmissions(), AdminPage(), AnalyticsTab() (+16 more)

### Community 8 - "events.service.ts"
Cohesion: 0.09
Nodes (20): EventRow, EventsController, CacheTTL, Controller, Get, Header, Param, Query (+12 more)

### Community 9 - "CreateSubmissionDto"
Cohesion: 0.09
Nodes (22): mapSubmission(), CreateSubmissionDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString (+14 more)

### Community 10 - "traffic.service.ts"
Cohesion: 0.06
Nodes (40): DEVICE_TYPES, HeartbeatDto, IsBoolean, IsIn, IsUUID, DEVICE_TYPES, TARGET_TYPES, TrackCardViewDto (+32 more)

### Community 11 - "mappers.ts"
Cohesion: 0.07
Nodes (29): EducationTrackRow, mapEducationTrack(), mapMaterial(), mapNews(), MaterialRow, NewsRow, SubmissionAdminRow, SubmissionRow (+21 more)

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
Cohesion: 0.21
Nodes (8): AdminGuard, Injectable, AuthedRequest, CachedProfile, RequestProfile, SuperAdminGuard, Injectable, AdminPerms

### Community 16 - "SupabaseService"
Cohesion: 0.14
Nodes (10): Inject, BanStatusGuard, Injectable, StorageStatRow, UserStatRow, SupabaseModule, Module, SupabaseService (+2 more)

### Community 17 - "GridPage.tsx"
Cohesion: 0.13
Nodes (20): CardSizeSlider(), NetTroubleToast(), Toast(), Theme, UIContext, UIContextValue, useUI(), plural() (+12 more)

### Community 18 - "useAuth"
Cohesion: 0.19
Nodes (14): PolicyGate(), AuthContext, useAuth(), useSubmissions(), api, authHeader(), reportNetworkTrouble(), request() (+6 more)

### Community 19 - "app.module.ts"
Cohesion: 0.17
Nodes (12): AdminModule, Module, AppModule, Module, AuthModule, Module, CapacityModule, Module (+4 more)

### Community 20 - "CreateNewsDto"
Cohesion: 0.40
Nodes (4): CreateNewsDto, IsOptional, IsString, IsUrl

### Community 21 - "AuthPage"
Cohesion: 0.10
Nodes (33): onAccept(), AuthProvider(), checkBanStatus(), hasPerm(), refreshProfile(), signOut(), isActiveBan(), AuthPage() (+25 more)

### Community 22 - "users-admin.controller.ts"
Cohesion: 0.06
Nodes (36): BAN_DURATIONS, BanDuration, BanUserDto, IsIn, IsOptional, IsString, MaxLength, ADMIN_PERM_KEYS (+28 more)

### Community 23 - "App.tsx"
Cohesion: 0.16
Nodes (11): AdminPage, AuthPage, EditAccountPage, HomeGate(), ProfilePage, PublishPage, SettingsPage, UserAccountPage (+3 more)

### Community 24 - "favorites.controller.ts"
Cohesion: 0.15
Nodes (8): FavoritesController, Controller, Get, Param, Post, UseGuards, FavoritesService, Injectable

### Community 25 - "useEducationTracks"
Cohesion: 0.19
Nodes (8): EducationIndex(), EducationPage, Sidebar(), useEducation(), useEducationTracks(), EducationTab(), TrackMaterials(), EducationPage()

### Community 26 - "UsersPage.tsx"
Cohesion: 0.18
Nodes (8): UsersPage, UsersManager(), useAdmins(), useAdminUsers(), AdminsTab(), TabKey, TABS, UsersPage()

### Community 27 - "UpdateEventDto"
Cohesion: 0.20
Nodes (10): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUrl, Max (+2 more)

### Community 28 - "UpdateSubmissionDto"
Cohesion: 0.20
Nodes (10): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUrl, Max (+2 more)

### Community 29 - "CapacityService"
Cohesion: 0.22
Nodes (6): CapacityController, Controller, Get, UseGuards, CapacityService, Injectable

### Community 30 - "CreateMaterialDto"
Cohesion: 0.33
Nodes (5): CreateMaterialDto, IsArray, IsInt, IsOptional, IsString

### Community 31 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 32 - "admin.service.ts"
Cohesion: 0.15
Nodes (10): CreateEducationTrackDto, IsOptional, IsString, URL_OPTS, URL_OPTS, IsOptional, IsString, UpdateEducationTrackDto (+2 more)

### Community 33 - "tsconfig.build.json"
Cohesion: 0.33
Nodes (5): exclude, extends, dist, node_modules, ./tsconfig.json

### Community 34 - "HTML Entry Point (index.html)"
Cohesion: 0.50
Nodes (5): Google Fonts Integration, HTML Entry Point (index.html), SEO / Open Graph Meta Tags, TS Logo Mark (Favicon), TS Logo Mark (Source Asset)

### Community 39 - "traffic-admin.controller.ts"
Cohesion: 0.12
Nodes (13): TrafficQueryDto, IsInt, IsOptional, Max, Min, TrafficAdminController, Controller, Get (+5 more)

### Community 40 - "AnalyticsPage.tsx"
Cohesion: 0.14
Nodes (19): AnalyticsPage, BarChart(), BarChartProps, useCapacity(), useTrafficOnline(), useTrafficSummary(), AnalyticsPage(), BUCKET_LABELS (+11 more)

### Community 41 - "useEducation.ts"
Cohesion: 0.43
Nodes (5): ArticlePage, EducationData, useArticle(), ArticlePage(), MaterialItem

### Community 42 - "CreateEventDto"
Cohesion: 0.14
Nodes (13): deriveAgeLabel(), deriveShortDesc(), CreateEventDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional (+5 more)

### Community 43 - "UserAccountPage.tsx"
Cohesion: 0.13
Nodes (13): BanModal(), BanModalProps, OPTIONS, ConfirmDialog(), ConfirmDialogProps, ROLE_BADGE, UsersManagerProps, useAdminUser() (+5 more)

### Community 44 - "ImageUploadField.tsx"
Cohesion: 0.47
Nodes (4): ImageUploadField(), onPick(), ImageUploadFieldProps, uploadPostImage()

### Community 46 - "PostForm.tsx"
Cohesion: 0.15
Nodes (19): EditEventModal(), save(), EditEventModalProps, EventCardProps, emptyPostForm(), eventToPostForm(), FORMATS, LEVELS (+11 more)

### Community 47 - "HealthController"
Cohesion: 0.22
Nodes (6): HealthController, Controller, Get, HealthModule, Module, SkipThrottle

### Community 48 - "main.tsx"
Cohesion: 0.17
Nodes (5): App(), ErrorBoundary, Props, State, UIProvider()

### Community 49 - "traffic-admin.service.ts"
Cohesion: 0.25
Nodes (7): CardUniqueViewsRow, DailyTrendRow, DeviceRow, HourlyRow, LoginSplitRow, TopCardRow, TopLinkRow

### Community 50 - "TrafficCleanupService"
Cohesion: 0.32
Nodes (4): TrafficCleanupService, Cron, Injectable, yesterdayInBishkek()

### Community 51 - "AdminService"
Cohesion: 0.21
Nodes (5): Get, Query, AdminService, Injectable, mapSubmissionAdmin()

### Community 52 - "deploy"
Cohesion: 0.29
Nodes (6): deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType, $schema

### Community 53 - "permission.guard.ts"
Cohesion: 0.33
Nodes (3): PermissionGuard, Injectable, PERM_KEY

### Community 54 - "useEvents.ts"
Cohesion: 0.27
Nodes (13): buildQuery(), EventFilters, useEvent(), useEvents(), useNews(), CacheEntry, getCached(), getEntry() (+5 more)

### Community 56 - "SupabaseAuthGuard"
Cohesion: 0.31
Nodes (4): jwtExpiryMs(), SupabaseAuthGuard, Inject, Injectable

### Community 57 - "UpdateMaterialDto"
Cohesion: 0.33
Nodes (5): IsArray, IsInt, IsOptional, IsString, UpdateMaterialDto

### Community 58 - "PrivacyPage.tsx"
Cohesion: 0.33
Nodes (4): PrivacyPage, Block, Section, SECTIONS

## Knowledge Gaps
- **199 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+194 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SupabaseService` connect `SupabaseService` to `admin.service.ts`, `profile.service.ts`, `traffic-admin.controller.ts`, `events.service.ts`, `CreateSubmissionDto`, `traffic.service.ts`, `mappers.ts`, `ratings.controller.ts`, `supabase-auth.guard.ts`, `HealthController`, `traffic-admin.service.ts`, `TrafficCleanupService`, `users-admin.controller.ts`, `SupabaseAuthGuard`, `favorites.controller.ts`, `CapacityService`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `users-admin.controller.ts` to `favorites.controller.ts`, `CreateSubmissionDto`, `ratings.controller.ts`, `profile.service.ts`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `AdminController` connect `AdminController` to `admin.service.ts`, `CreateEventDto`, `AdminService`, `CreateNewsDto`, `CreateMaterialDto`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _199 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `constants.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06612021857923497 - nodes in this community are weakly interconnected._
- **Should `AdminController` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12105263157894737 - nodes in this community are weakly interconnected._