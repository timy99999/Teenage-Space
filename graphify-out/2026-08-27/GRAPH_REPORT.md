# Graph Report - Teenage Space  (2026-08-27)

## Corpus Check
- 121 files · ~36,890 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 837 nodes · 1651 edges · 41 communities (38 shown, 3 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 58 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1316a06a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- constants.ts
- AdminService
- App.tsx
- dependencies
- Platform Description (Privacy Policy Section 1)
- profile.service.ts
- frontend/package.json
- AdminPage.tsx
- events.service.ts
- CreateSubmissionDto
- PostForm.tsx
- EducationController
- CurrentUser
- compilerOptions
- compilerOptions
- supabase-auth.guard.ts
- SupabaseService
- GridPage.tsx
- types.ts
- app.module.ts
- news.service.ts
- AuthPage
- admin.service.ts
- useAuth
- FavoritesService
- admin.controller.ts
- PublishPage.tsx
- UpdateEventDto
- UpdateSubmissionDto
- CapacityService
- CreateMaterialDto
- nest-cli.json
- UpdateMaterialDto
- tsconfig.build.json
- HTML Entry Point (index.html)
- vite-env.d.ts
- vercel.json
- Graphify Query Workflow
- CreateNewsDto
- .lookupEmail

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 42 edges
2. `useUI()` - 32 edges
3. `AdminService` - 30 edges
4. `AdminController` - 28 edges
5. `SupabaseService` - 26 edges
6. `api` - 22 edges
7. `compilerOptions` - 20 edges
8. `CreateEventDto` - 17 edges
9. `AuthPage()` - 17 edges
10. `compilerOptions` - 15 edges

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

## Communities (41 total, 3 thin omitted)

### Community 0 - "constants.ts"
Cohesion: 0.08
Nodes (34): CardMenu(), EventCard(), EventCardAdminActions, EventCardProps, instagramUrl(), EventModal(), instagramUrl(), telegramUrl() (+26 more)

### Community 1 - "AdminService"
Cohesion: 0.06
Nodes (29): AdminController, Body, Controller, Delete, Get, HttpCode, Param, Patch (+21 more)

### Community 2 - "App.tsx"
Cohesion: 0.05
Nodes (41): AdminPage, AnalyticsPage, ArticlePage, AuthPage, EditAccountPage, EducationIndex(), EducationPage, HomeGate() (+33 more)

### Community 3 - "dependencies"
Cohesion: 0.04
Nodes (46): dependencies, cache-manager, class-transformer, class-validator, helmet, @nestjs/cache-manager, @nestjs/common, @nestjs/config (+38 more)

### Community 4 - "Platform Description (Privacy Policy Section 1)"
Cohesion: 0.08
Nodes (33): Auto-Push Working Agreement, Backend Build Job, Build Check Workflow, Frontend Build Job, Check Required Secrets Step, Link Project Step, Migrate Job, Push Migrations Step (+25 more)

### Community 5 - "profile.service.ts"
Cohesion: 0.10
Nodes (20): ProfileController, Body, Controller, Delete, Get, HttpCode, Patch, UseGuards (+12 more)

### Community 6 - "frontend/package.json"
Cohesion: 0.07
Nodes (28): dependencies, react, react-dom, react-router-dom, @supabase/supabase-js, devDependencies, @types/react, @types/react-dom (+20 more)

### Community 7 - "AdminPage.tsx"
Cohesion: 0.09
Nodes (25): emptyPostForm(), postFormPayload(), TrashIcon(), useAdminAnalytics(), useAdminArchivedEvents(), useAdminSubmissions(), AdminPage(), AnalyticsTab() (+17 more)

### Community 8 - "events.service.ts"
Cohesion: 0.10
Nodes (18): EventsController, CacheTTL, Controller, Get, Header, Param, Query, UseInterceptors (+10 more)

### Community 9 - "CreateSubmissionDto"
Cohesion: 0.09
Nodes (20): mapSubmission(), CreateSubmissionDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString (+12 more)

### Community 10 - "PostForm.tsx"
Cohesion: 0.11
Nodes (21): Chip(), ChipProps, EditEventModal(), save(), EditEventModalProps, ImageUploadField(), onPick(), ImageUploadFieldProps (+13 more)

### Community 11 - "EducationController"
Cohesion: 0.15
Nodes (11): EducationController, CacheTTL, Controller, Get, Header, Param, UseInterceptors, EducationModule (+3 more)

### Community 12 - "CurrentUser"
Cohesion: 0.11
Nodes (14): CurrentUser, RateEventDto, IsInt, Max, Min, RatingsController, Body, Controller (+6 more)

### Community 13 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+12 more)

### Community 14 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, isolatedModules, jsx, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch (+12 more)

### Community 15 - "supabase-auth.guard.ts"
Cohesion: 0.16
Nodes (9): AdminGuard, Injectable, AuthedRequest, RequestProfile, SupabaseAuthGuard, Injectable, CurrentProfile, SuperAdminGuard (+1 more)

### Community 16 - "SupabaseService"
Cohesion: 0.15
Nodes (8): AuthController, Controller, StorageStatRow, SupabaseModule, Module, SupabaseService, Injectable, Global

### Community 17 - "GridPage.tsx"
Cohesion: 0.17
Nodes (15): App(), CardSizeSlider(), Toast(), Theme, UIContext, UIContextValue, UIProvider(), useUI() (+7 more)

### Community 18 - "types.ts"
Cohesion: 0.15
Nodes (20): AuthContext, AuthContextValue, api, authHeader(), request(), anonKey, supabase, url (+12 more)

### Community 19 - "app.module.ts"
Cohesion: 0.15
Nodes (14): AdminModule, Module, AppModule, Module, AuthModule, Module, CapacityModule, Module (+6 more)

### Community 20 - "news.service.ts"
Cohesion: 0.15
Nodes (11): NewsRow, NewsController, CacheTTL, Controller, Get, Header, UseInterceptors, NewsModule (+3 more)

### Community 21 - "AuthPage"
Cohesion: 0.11
Nodes (29): onAccept(), AuthProvider(), refreshProfile(), signOut(), AuthPage(), finishSignIn(), onForgot1(), onForgot2() (+21 more)

### Community 22 - "admin.service.ts"
Cohesion: 0.36
Nodes (8): EducationTrackRow, EventRow, mapEducationTrack(), mapMaterial(), MaterialRow, ProfileRow, SubmissionAdminRow, SubmissionRow

### Community 23 - "useAuth"
Cohesion: 0.29
Nodes (9): PolicyGate(), useAuth(), useAdminUsers(), useCapacity(), UsersTab(), AnalyticsPage(), BUCKET_LABELS, formatBytes() (+1 more)

### Community 24 - "FavoritesService"
Cohesion: 0.15
Nodes (8): FavoritesController, Controller, Get, Param, Post, UseGuards, FavoritesService, Injectable

### Community 25 - "admin.controller.ts"
Cohesion: 0.18
Nodes (7): CreateEducationTrackDto, IsOptional, IsString, URL_OPTS, IsOptional, IsString, UpdateEducationTrackDto

### Community 26 - "PublishPage.tsx"
Cohesion: 0.23
Nodes (7): ConfirmDialog(), ConfirmDialogProps, useSubmissions(), ProfilePage(), STATUS_LABEL, PublishPage(), Submission

### Community 27 - "UpdateEventDto"
Cohesion: 0.17
Nodes (11): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUrl, Max (+3 more)

### Community 28 - "UpdateSubmissionDto"
Cohesion: 0.17
Nodes (11): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUrl, Max (+3 more)

### Community 29 - "CapacityService"
Cohesion: 0.22
Nodes (6): CapacityController, Controller, Get, UseGuards, CapacityService, Injectable

### Community 30 - "CreateMaterialDto"
Cohesion: 0.29
Nodes (5): CreateMaterialDto, IsArray, IsInt, IsOptional, IsString

### Community 31 - "nest-cli.json"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 32 - "UpdateMaterialDto"
Cohesion: 0.29
Nodes (5): IsArray, IsInt, IsOptional, IsString, UpdateMaterialDto

### Community 33 - "tsconfig.build.json"
Cohesion: 0.33
Nodes (5): exclude, extends, dist, node_modules, ./tsconfig.json

### Community 34 - "HTML Entry Point (index.html)"
Cohesion: 0.50
Nodes (5): Google Fonts Integration, HTML Entry Point (index.html), SEO / Open Graph Meta Tags, TS Logo Mark (Favicon), TS Logo Mark (Source Asset)

### Community 39 - "CreateNewsDto"
Cohesion: 0.22
Nodes (6): CreateNewsDto, IsOptional, IsString, IsUrl, URL_OPTS, mapNews()

### Community 40 - ".lookupEmail"
Cohesion: 0.50
Nodes (3): Get, Query, Throttle

## Knowledge Gaps
- **157 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+152 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SupabaseService` connect `SupabaseService` to `AdminService`, `profile.service.ts`, `events.service.ts`, `CreateSubmissionDto`, `EducationController`, `CurrentUser`, `supabase-auth.guard.ts`, `news.service.ts`, `admin.service.ts`, `FavoritesService`, `CapacityService`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `AdminController` connect `AdminService` to `admin.controller.ts`, `app.module.ts`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `AdminService` connect `AdminService` to `UpdateMaterialDto`, `CreateNewsDto`, `app.module.ts`, `admin.service.ts`, `admin.controller.ts`, `CreateMaterialDto`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _157 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `constants.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07535460992907801 - nodes in this community are weakly interconnected._
- **Should `AdminService` be split into smaller, more focused modules?**
  _Cohesion score 0.05745814307458143 - nodes in this community are weakly interconnected._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.053939714436805924 - nodes in this community are weakly interconnected._