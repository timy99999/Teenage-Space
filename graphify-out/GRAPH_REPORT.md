# Graph Report - Teenage Space  (2026-08-25)

## Corpus Check
- Corpus is ~35,658 words - fits in a single context window. You may not need a graph.

## Summary
- 791 nodes · 1570 edges · 39 communities (36 shown, 3 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 57 edges (avg confidence: 0.82)
- Token cost: 101,908 input · 0 output

## Community Hubs (Navigation)
- Admin Card & Modal UI
- Admin Backend Controller/Service
- App Routing & Pages
- Backend Dependencies
- CI/CD & Deploy Automation
- Profile Backend
- Frontend Dependencies
- Admin Page Hooks & Auth
- Events Backend
- Submissions Backend
- Chip & Edit Event Modal UI
- Education Backend
- Ratings Backend
- Backend TS Config
- Frontend TS Config
- Auth Guards
- Auth & Service Constructors
- Image Upload & Toast UI
- Auth Context & Policy Gate
- NestJS Module Wiring
- News Backend
- Auth Flow Logic
- News Creation DTO
- Auth Page Sign-in Flow
- Favorites Backend
- Education Track DTOs
- Confirm Dialog & Submissions UI
- Update Event DTO Validation
- Update Submission DTO Validation
- Admin Analytics Types
- Material DTO Backend
- NestJS CLI Config
- Update Material DTO Validation
- Build TS Config
- Branding & SEO Assets
- Vite Env Types
- Vercel Config
- Graphify Workflow Doc

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 38 edges
2. `useUI()` - 32 edges
3. `AdminService` - 30 edges
4. `AdminController` - 28 edges
5. `SupabaseService` - 24 edges
6. `api` - 21 edges
7. `compilerOptions` - 20 edges
8. `AuthPage()` - 17 edges
9. `CreateEventDto` - 16 edges
10. `compilerOptions` - 15 edges

## Surprising Connections (you probably didn't know these)
- `Platform Description (Privacy Policy Section 1)` --semantically_similar_to--> `Teenage Space Platform Overview`  [INFERRED] [semantically similar]
  Политика конфедициальности.pdf → README.md
- `Minors Protection Provisions` --conceptually_related_to--> `Teenage Space Platform Overview`  [INFERRED]
  Политика конфедициальности.pdf → README.md
- `Third-Party Authentication (Google)` --conceptually_related_to--> `Supabase Database / Auth`  [INFERRED]
  Политика конфедициальности.pdf → README.md
- `Third-Party Service Providers` --references--> `Supabase Database / Auth`  [EXTRACTED]
  Политика конфедициальности.pdf → README.md
- `Auto-Push Working Agreement` --conceptually_related_to--> `Build Check Workflow`  [INFERRED]
  CLAUDE.md → .github/workflows/ci.yml

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Push-to-Main Auto-Deploy Pipeline** — claude_autopushagreement, github_workflows_ci_buildcheckworkflow, github_workflows_supabase_migrations_migratejob, readme_migrationsautomation [INFERRED 0.85]
- **TS Brand Logo Asset Usage** — frontend_public_favicon_tslogomark, frontend_src_assets_logo_ts_tslogomark, frontend_index_htmlentrypoint, frontend_index_seometatags [INFERRED 0.80]
- **Personal Data Category Taxonomy** — politika_konfedicialnosti_accountdata, politika_konfedicialnosti_profiledata, politika_konfedicialnosti_activitydata, politika_konfedicialnosti_technicaldata [INFERRED 0.75]

## Communities (39 total, 3 thin omitted)

### Community 0 - "Admin Card & Modal UI"
Cohesion: 0.06
Nodes (55): CardSizeSlider(), EditEventModalProps, CardMenu(), EventCard(), EventCardAdminActions, EventCardProps, instagramUrl(), EventModal() (+47 more)

### Community 1 - "Admin Backend Controller/Service"
Cohesion: 0.06
Nodes (26): AdminController, Body, Controller, Delete, Get, HttpCode, Param, Patch (+18 more)

### Community 2 - "App Routing & Pages"
Cohesion: 0.06
Nodes (30): AdminPage, ArticlePage, AuthPage, EditAccountPage, EducationIndex(), EducationPage, HomeGate(), PrivacyPage (+22 more)

### Community 3 - "Backend Dependencies"
Cohesion: 0.04
Nodes (44): dependencies, cache-manager, class-transformer, class-validator, helmet, @nestjs/cache-manager, @nestjs/common, @nestjs/config (+36 more)

### Community 4 - "CI/CD & Deploy Automation"
Cohesion: 0.08
Nodes (33): Auto-Push Working Agreement, Backend Build Job, Build Check Workflow, Frontend Build Job, Check Required Secrets Step, Link Project Step, Migrate Job, Push Migrations Step (+25 more)

### Community 5 - "Profile Backend"
Cohesion: 0.10
Nodes (20): mapProfile(), ProfileController, Body, Controller, Delete, Get, HttpCode, Patch (+12 more)

### Community 6 - "Frontend Dependencies"
Cohesion: 0.07
Nodes (28): dependencies, react, react-dom, react-router-dom, @supabase/supabase-js, devDependencies, @types/react, @types/react-dom (+20 more)

### Community 7 - "Admin Page Hooks & Auth"
Cohesion: 0.12
Nodes (21): TrashIcon(), useAuth(), useAdminAnalytics(), useAdminArchivedEvents(), useAdminSubmissions(), useAdminUsers(), AdminPage(), AnalyticsTab() (+13 more)

### Community 8 - "Events Backend"
Cohesion: 0.12
Nodes (17): mapEvent(), EventsController, CacheTTL, Controller, Get, Header, Param, Query (+9 more)

### Community 9 - "Submissions Backend"
Cohesion: 0.12
Nodes (17): mapSubmission(), CreateSubmissionDto, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString (+9 more)

### Community 10 - "Chip & Edit Event Modal UI"
Cohesion: 0.12
Nodes (20): Chip(), ChipProps, EditEventModal(), save(), emptyPostForm(), eventToPostForm(), FORMATS, LEVELS (+12 more)

### Community 11 - "Education Backend"
Cohesion: 0.15
Nodes (11): EducationController, CacheTTL, Controller, Get, Header, Param, UseInterceptors, EducationModule (+3 more)

### Community 12 - "Ratings Backend"
Cohesion: 0.13
Nodes (12): RateEventDto, IsInt, Max, Min, RatingsController, Body, Controller, Param (+4 more)

### Community 13 - "Backend TS Config"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+12 more)

### Community 14 - "Frontend TS Config"
Cohesion: 0.10
Nodes (20): compilerOptions, isolatedModules, jsx, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch (+12 more)

### Community 15 - "Auth Guards"
Cohesion: 0.13
Nodes (10): AdminGuard, Injectable, AuthedRequest, RequestProfile, SupabaseAuthGuard, Injectable, CurrentProfile, CurrentUser (+2 more)

### Community 16 - "Auth & Service Constructors"
Cohesion: 0.13
Nodes (10): AuthController, Controller, Get, Query, SupabaseModule, Module, SupabaseService, Injectable (+2 more)

### Community 17 - "Image Upload & Toast UI"
Cohesion: 0.16
Nodes (13): App(), ImageUploadField(), onPick(), ImageUploadFieldProps, Toast(), Theme, UIContext, UIContextValue (+5 more)

### Community 18 - "Auth Context & Policy Gate"
Cohesion: 0.26
Nodes (10): AuthContext, AuthContextValue, api, authHeader(), request(), anonKey, supabase, url (+2 more)

### Community 19 - "NestJS Module Wiring"
Cohesion: 0.16
Nodes (12): AdminModule, Module, AppModule, Module, AuthModule, Module, FavoritesModule, Module (+4 more)

### Community 20 - "News Backend"
Cohesion: 0.15
Nodes (11): NewsRow, NewsController, CacheTTL, Controller, Get, Header, UseInterceptors, NewsModule (+3 more)

### Community 21 - "Auth Flow Logic"
Cohesion: 0.15
Nodes (17): PolicyGate(), onAccept(), AuthProvider(), refreshProfile(), signOut(), cooldownHint(), EditAccountPage(), onAvatarPick() (+9 more)

### Community 22 - "News Creation DTO"
Cohesion: 0.22
Nodes (10): CreateNewsDto, IsOptional, IsString, EducationTrackRow, EventRow, mapNews(), MaterialRow, ProfileRow (+2 more)

### Community 23 - "Auth Page Sign-in Flow"
Cohesion: 0.28
Nodes (14): AuthPage(), finishSignIn(), onForgot1(), onForgot2(), onForgot3(), onLogin(), onPrimary(), onReg1() (+6 more)

### Community 24 - "Favorites Backend"
Cohesion: 0.15
Nodes (8): FavoritesController, Controller, Get, Param, Post, UseGuards, FavoritesService, Injectable

### Community 25 - "Education Track DTOs"
Cohesion: 0.19
Nodes (7): CreateEducationTrackDto, IsOptional, IsString, IsOptional, IsString, UpdateEducationTrackDto, mapEducationTrack()

### Community 26 - "Confirm Dialog & Submissions UI"
Cohesion: 0.24
Nodes (6): ConfirmDialog(), ConfirmDialogProps, useSubmissions(), STATUS_LABEL, PublishPage(), Submission

### Community 27 - "Update Event DTO Validation"
Cohesion: 0.20
Nodes (9): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min (+1 more)

### Community 28 - "Update Submission DTO Validation"
Cohesion: 0.20
Nodes (9): IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min (+1 more)

### Community 29 - "Admin Analytics Types"
Cohesion: 0.22
Nodes (8): AdminUser, Analytics, CategoryDef, CreateNewsInput, Format, Level, PriceType, Role

### Community 30 - "Material DTO Backend"
Cohesion: 0.22
Nodes (6): CreateMaterialDto, IsArray, IsInt, IsOptional, IsString, mapMaterial()

### Community 31 - "NestJS CLI Config"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 32 - "Update Material DTO Validation"
Cohesion: 0.33
Nodes (5): IsArray, IsInt, IsOptional, IsString, UpdateMaterialDto

### Community 33 - "Build TS Config"
Cohesion: 0.33
Nodes (5): exclude, extends, dist, node_modules, ./tsconfig.json

### Community 34 - "Branding & SEO Assets"
Cohesion: 0.50
Nodes (5): Google Fonts Integration, HTML Entry Point (index.html), SEO / Open Graph Meta Tags, TS Logo Mark (Favicon), TS Logo Mark (Source Asset)

## Knowledge Gaps
- **149 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+144 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SupabaseService` connect `Auth & Service Constructors` to `Admin Backend Controller/Service`, `Profile Backend`, `Events Backend`, `Submissions Backend`, `Education Backend`, `Ratings Backend`, `Auth Guards`, `News Backend`, `News Creation DTO`, `Favorites Backend`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `AdminController` connect `Admin Backend Controller/Service` to `Education Track DTOs`, `NestJS Module Wiring`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `AdminService` connect `Admin Backend Controller/Service` to `Education Track DTOs`, `NestJS Module Wiring`, `News Creation DTO`, `Material DTO Backend`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _149 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Admin Card & Modal UI` be split into smaller, more focused modules?**
  _Cohesion score 0.05693693693693694 - nodes in this community are weakly interconnected._
- **Should `Admin Backend Controller/Service` be split into smaller, more focused modules?**
  _Cohesion score 0.060041407867494824 - nodes in this community are weakly interconnected._
- **Should `App Routing & Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.05952380952380952 - nodes in this community are weakly interconnected._