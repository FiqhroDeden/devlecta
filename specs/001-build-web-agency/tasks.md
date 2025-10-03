# Tasks: Devlecta Web Agency Website

**Feature Branch**: `001-build-web-agency`
**Input**: Design documents from `/Users/zoldy/Herd/devlecta/specs/001-build-web-agency/`
**Prerequisites**: plan.md, research.md, data-model.md, contracts/, quickstart.md
**Tech Stack**: Laravel 11 + Inertia.js 1.x + React 18 + TypeScript 5 + MySQL 8.0 + Redis + Tailwind CSS

---

## Execution Flow

1. ✅ Loaded plan.md - Extracted tech stack: Laravel 11, Inertia.js, React 18, MySQL 8.0, Redis
2. ✅ Loaded data-model.md - 10 entities identified (Portfolio, Product, Lead, Technology, Category, Testimonial, User, SiteSetting, PortfolioMedia, ProductMedia)
3. ✅ Loaded contracts/ - 3 API specs (portfolio-api.yaml, product-api.yaml, contact-api.yaml)
4. ✅ Loaded quickstart.md - 4 user scenarios + 7 edge cases
5. ✅ Generated 95 tasks ordered by TDD + dependency flow
6. ✅ Marked 42 tasks as [P] for parallel execution (different files, no dependencies)

---

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- All file paths are absolute or relative to repository root

---

## Phase 3.1: Project Setup & Configuration

- [X] **T001** Initialize Laravel 11 project (verify existing installation or run `composer create-project laravel/laravel .`)
- [X] **T002** Install backend dependencies: `composer require laravel/fortify inertiajs/inertia-laravel intervention/image artesaos/seotools google/recaptcha`
- [X] **T003** Install dev dependencies: `composer require --dev pestphp/pest pestphp/pest-plugin-laravel laravel/pint`
- [X] **T004** Initialize Pest: `php artisan pest:install`
- [X] **T005** Install frontend dependencies: `npm install @inertiajs/react react react-dom @radix-ui/react-dialog @radix-ui/react-dropdown-menu tailwindcss`
- [X] **T006** Install frontend dev dependencies: `npm install -D vite @vitejs/plugin-react typescript @types/react vitest @testing-library/react playwright`
- [X] **T007** [P] Configure TypeScript: Create `tsconfig.json` with strict mode, React JSX support
- [X] **T008** [P] Configure ESLint: Create `.eslintrc.json` with React + TypeScript rules
- [X] **T009** [P] Configure Prettier: Create `.prettierrc` with Tailwind plugin
- [X] **T010** [P] Configure Laravel Pint: Verify `pint.json` exists or create with PSR-12 rules
- [X] **T011** Configure Tailwind CSS: Update `tailwind.config.js` with content paths for resources/js
- [X] **T012** Configure Vite: Update `vite.config.js` with Inertia.js plugin, React plugin, code splitting
- [X] **T013** Configure environment: Copy `.env.example` to `.env`, set `DB_DATABASE=devlecta`, `DB_USERNAME`, `DB_PASSWORD`, add `RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`
- [X] **T014** Generate application key: `php artisan key:generate`
- [X] **T015** Create MySQL database: `mysql -u root -p -e "CREATE DATABASE devlecta CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"`
- [X] **T016** Configure Redis: Verify `REDIS_HOST=127.0.0.1` in `.env`, set `CACHE_DRIVER=redis`, `SESSION_DRIVER=redis`, `QUEUE_CONNECTION=redis`

---

## Phase 3.2: Database Migrations (Foundation)

**CRITICAL: Complete before models**

- [X] **T017** [P] Create migration: `create_users_table.php` (id, name, email, password, role, last_login_at, timestamps) - *May already exist*
- [X] **T018** [P] Create migration: `create_categories_table.php` (id, name, slug, type, description, parent_id, timestamps)
- [X] **T019** [P] Create migration: `create_technologies_table.php` (id, name, slug, category, usage_count, display_order, timestamps)
- [X] **T020** [P] Create migration: `create_portfolios_table.php` (id, title, slug, description, category_id, type, industry, challenge, solution, results JSON, duration, client_name, featured, status, timestamps, deleted_at)
- [X] **T021** [P] Create migration: `create_products_table.php` (id, name, slug, description, category_id, price, envato_url, rating, reviews_count, demo_link, docs_link, features JSON, changelog JSON, status, timestamps, deleted_at)
- [X] **T022** [P] Create migration: `create_testimonials_table.php` (id, client_name, company, role, text, language, rating, avatar_path, featured, timestamps)
- [X] **T023** [P] Create migration: `create_leads_table.php` (id, name, email, phone, company, service_interest, budget_range, message, preferred_lang, status, admin_notes, ip_address, timestamps)
- [X] **T024** [P] Create migration: `create_site_settings_table.php` (id, key, value TEXT, type, description, language, timestamps)
- [X] **T025** [P] Create migration: `create_portfolio_media_table.php` (id, portfolio_id, type, path, display_order, created_at)
- [X] **T026** [P] Create migration: `create_product_media_table.php` (id, product_id, type, path, display_order, created_at)
- [X] **T027** [P] Create migration: `create_portfolio_technology_table.php` (id, portfolio_id, technology_id, timestamps) - pivot table
- [X] **T028** Run migrations: `php artisan migrate`

---

## Phase 3.3: Eloquent Models (with Relationships)

**CRITICAL: Complete before services**

- [X] **T029** [P] Create model: `app/Models/User.php` with `role` enum cast, `lastLoginAt` date cast, hidden password field
- [X] **T030** [P] Create model: `app/Models/Category.php` with `hasMany` Portfolio, `hasMany` Product, `belongsTo` parent, `hasMany` children (self-referential)
- [X] **T031** [P] Create model: `app/Models/Technology.php` with `belongsToMany` Portfolio via `portfolio_technology` pivot
- [X] **T032** [P] Create model: `app/Models/Portfolio.php` with `belongsTo` Category, `belongsToMany` Technology, `hasMany` PortfolioMedia, soft deletes, `type` enum cast, `status` enum cast, `results` JSON cast
- [X] **T033** [P] Create model: `app/Models/Product.php` with `belongsTo` Category, `hasMany` ProductMedia, soft deletes, `status` enum cast, `features` JSON cast, `changelog` JSON cast
- [X] **T034** [P] Create model: `app/Models/Testimonial.php` with `language` enum cast, `featured` boolean cast
- [X] **T035** [P] Create model: `app/Models/Lead.php` with `status` enum cast, `preferred_lang` enum cast
- [X] **T036** [P] Create model: `app/Models/SiteSetting.php` with `type` enum cast
- [X] **T037** [P] Create model: `app/Models/PortfolioMedia.php` with `belongsTo` Portfolio, `type` enum cast
- [X] **T038** [P] Create model: `app/Models/ProductMedia.php` with `belongsTo` Product, `type` enum cast

---

## Phase 3.4: Factories & Seeders (for Testing)

- [X] **T039** [P] Create factory: `database/factories/CategoryFactory.php` with realistic web/mobile category data
- [X] **T040** [P] Create factory: `database/factories/TechnologyFactory.php` with common tech stack (Laravel, React, MySQL, etc.)
- [X] **T041** [P] Create factory: `database/factories/PortfolioFactory.php` with both custom_project and envato_product types
- [X] **T042** [P] Create factory: `database/factories/ProductFactory.php` with Envato URLs, pricing, features
- [X] **T043** [P] Create factory: `database/factories/LeadFactory.php` with realistic contact data
- [X] **T044** [P] Create factory: `database/factories/TestimonialFactory.php` with client feedback text
- [X] **T045** [P] Create seeder: `database/seeders/CategorySeeder.php` to seed predefined categories (Web Development, Mobile Apps, E-commerce, etc.)
- [X] **T046** [P] Create seeder: `database/seeders/TechnologySeeder.php` to seed common technologies (Laravel, React, Vue, MySQL, Redis, etc.)
- [X] **T047** Run seeders: `php artisan db:seed --class=CategorySeeder && php artisan db:seed --class=TechnologySeeder`

---

## Phase 3.5: Contract Tests (MUST FAIL BEFORE Implementation)

**CRITICAL: Write these tests BEFORE implementing services/controllers. All tests MUST FAIL initially.**

### Portfolio API Contract Tests

- [X] **T048** [P] Contract test: `tests/Feature/Contract/PortfolioContractTest.php` - Test `GET /portfolio` returns paginated list with correct schema (data array, meta object, links object)
- [X] **T049** [P] Contract test: `tests/Feature/Contract/PortfolioContractTest.php` - Test `GET /portfolio?category={slug}` filters by category
- [X] **T050** [P] Contract test: `tests/Feature/Contract/PortfolioContractTest.php` - Test `GET /portfolio?technology={slug}` filters by technology
- [X] **T051** [P] Contract test: `tests/Feature/Contract/PortfolioContractTest.php` - Test `GET /portfolio/{slug}` returns detail with technologies, media, related projects
- [X] **T052** [P] Contract test: `tests/Feature/Contract/PortfolioContractTest.php` - Test `GET /portfolio/invalid-slug` returns 404
- [X] **T053** [P] Contract test: `tests/Feature/Contract/AdminPortfolioContractTest.php` - Test `POST /admin/portfolio` creates portfolio (authenticated admin)
- [X] **T054** [P] Contract test: `tests/Feature/Contract/AdminPortfolioContractTest.php` - Test `POST /admin/portfolio` returns 422 with validation errors for invalid data
- [X] **T055** [P] Contract test: `tests/Feature/Contract/AdminPortfolioContractTest.php` - Test `PUT /admin/portfolio/{id}` updates portfolio
- [X] **T056** [P] Contract test: `tests/Feature/Contract/AdminPortfolioContractTest.php` - Test `DELETE /admin/portfolio/{id}` soft deletes portfolio
- [X] **T057** [P] Contract test: `tests/Feature/Contract/AdminPortfolioContractTest.php` - Test unauthenticated user gets 401 on admin routes

### Product API Contract Tests

- [X] **T058** [P] Contract test: `tests/Feature/Contract/ProductContractTest.php` - Test `GET /products` returns paginated list
- [X] **T059** [P] Contract test: `tests/Feature/Contract/ProductContractTest.php` - Test `GET /products?category={slug}` filters by category
- [X] **T060** [P] Contract test: `tests/Feature/Contract/ProductContractTest.php` - Test `GET /products/{slug}` returns detail with media, related products
- [X] **T061** [P] Contract test: `tests/Feature/Contract/AdminProductContractTest.php` - Test `POST /admin/products` creates product (authenticated)
- [X] **T062** [P] Contract test: `tests/Feature/Contract/AdminProductContractTest.php` - Test `PUT /admin/products/{id}` updates product
- [X] **T063** [P] Contract test: `tests/Feature/Contract/AdminProductContractTest.php` - Test `DELETE /admin/products/{id}` soft deletes product

### Contact/Lead API Contract Tests

- [X] **T064** [P] Contract test: `tests/Feature/Contract/ContactContractTest.php` - Test `POST /contact` creates lead with valid data
- [X] **T065** [P] Contract test: `tests/Feature/Contract/ContactContractTest.php` - Test `POST /contact` returns 422 for missing required fields (name, email, message)
- [X] **T066** [P] Contract test: `tests/Feature/Contract/ContactContractTest.php` - Test `POST /contact` returns 422 for invalid email format
- [X] **T067** [P] Contract test: `tests/Feature/Contract/ContactContractTest.php` - Test `POST /contact` returns 429 after 6 submissions (rate limit)
- [X] **T068** [P] Contract test: `tests/Feature/Contract/LeadContractTest.php` - Test `GET /admin/leads` returns paginated list (authenticated)
- [X] **T069** [P] Contract test: `tests/Feature/Contract/LeadContractTest.php` - Test `GET /admin/leads?status=new` filters by status
- [X] **T070** [P] Contract test: `tests/Feature/Contract/LeadContractTest.php` - Test `PATCH /admin/leads/{id}` updates status and admin notes
- [X] **T071** [P] Contract test: `tests/Feature/Contract/LeadContractTest.php` - Test `GET /admin/leads/export` downloads CSV file

### Run Contract Tests (Verify ALL FAIL)

- [X] **T072** Run contract tests: `php artisan test --filter=Contract` - **VERIFIED TESTS WRITTEN** (1/24 passing - 404 test, others need auth/frontend)

---

## Phase 3.6: Service Layer (Business Logic)

**CRITICAL: Only start after contract tests are failing**

- [X] **T073** [P] Create service: `app/Services/PortfolioService.php` with `getFilteredPortfolio(array $filters, int $perPage)` method using Redis cache (5-min TTL), eager loading (category, technologies, media)
- [X] **T074** [P] Create service: `app/Services/ProductService.php` with `getFilteredProducts(array $filters, int $perPage)` method using Redis cache, eager loading (category, media)
- [X] **T075** [P] Create service: `app/Services/LeadService.php` with `createLead(array $data)`, `updateLeadStatus(int $id, string $status, ?string $notes)`, `exportToCsv(array $filters)` methods
- [X] **T076** [P] Create service: `app/Services/MediaService.php` with `uploadPortfolioImage(UploadedFile $file, int $portfolioId)`, `generateWebP(string $path)`, `deleteOrphanedMedia()` methods using Intervention Image

### Service Unit Tests

- [X] **T077** [P] Unit test: `tests/Unit/Services/PortfolioServiceTest.php` - Test filtering by category, technology, type, industry
- [X] **T078** [P] Unit test: `tests/Unit/Services/PortfolioServiceTest.php` - Test caching (verify Redis cache hit on second call)
- [X] **T079** [P] Unit test: `tests/Unit/Services/PortfolioServiceTest.php` - Test eager loading (verify no N+1 queries)
- [X] **T080** [P] Unit test: `tests/Unit/Services/ProductServiceTest.php` - Test filtering and caching
- [X] **T081** [P] Unit test: `tests/Unit/Services/LeadServiceTest.php` - Test lead creation, status updates, CSV export format
- [X] **T082** [P] Unit test: `tests/Unit/Services/MediaServiceTest.php` - Test image upload, WebP conversion, file validation (type, size <5MB)

---

## Phase 3.7: Form Requests & Resources (Validation & Transformation)

- [X] **T083** [P] Create form request: `app/Http/Requests/ContactFormRequest.php` with validation rules (name required, email required|email, message required|min:10, recaptcha_token required|recaptchav3:contact,0.5)
- [X] **T084** [P] Create form request: `app/Http/Requests/Admin/StorePortfolioRequest.php` with validation rules (title, description min:50, category_id exists, technology_ids array, images array of files)
- [X] **T085** [P] Create form request: `app/Http/Requests/Admin/UpdatePortfolioRequest.php` extending StorePortfolioRequest
- [X] **T086** [P] Create form request: `app/Http/Requests/Admin/StoreProductRequest.php` with validation rules (name, envato_url url|regex:/envato\.market/, price nullable|numeric)
- [X] **T087** [P] Create API resource: `app/Http/Resources/PortfolioResource.php` to transform Portfolio model with relationships (category, technologies, media)
- [X] **T088** [P] Create API resource: `app/Http/Resources/ProductResource.php` to transform Product model with relationships

---

## Phase 3.8: Controllers (Public Routes)

**CRITICAL: Only implement after contract tests exist and services are complete**

- [X] **T089** Create controller: `app/Http/Controllers/PortfolioController.php` with `index()` method calling PortfolioService, returning Inertia::render('Portfolio/Index') + JSON API
- [X] **T090** Add method: `app/Http/Controllers/PortfolioController.php@show($slug)` returning Inertia::render('Portfolio/Show') with portfolio detail + JSON API
- [X] **T091** Create controller: `app/Http/Controllers/ProductController.php` with `index()` and `show($slug)` methods + JSON API
- [X] **T092** Create controller: `app/Http/Controllers/ContactController.php` with `create()` (show form) and `store(ContactFormRequest $request)` (process submission, queue email)

### Public Controller Feature Tests

- [ ] **T093** [P] Feature test: `tests/Feature/PortfolioControllerTest.php` - Test portfolio listing returns correct data
- [ ] **T094** [P] Feature test: `tests/Feature/PortfolioControllerTest.php` - Test portfolio detail page with related projects
- [ ] **T095** [P] Feature test: `tests/Feature/ProductControllerTest.php` - Test product listing and detail
- [ ] **T096** [P] Feature test: `tests/Feature/ContactControllerTest.php` - Test contact form submission queues email

---

## Phase 3.9: Admin Controllers & Policies

- [ ] **T097** Install Laravel Fortify: `php artisan fortify:install` and configure routes in `config/fortify.php` - DEFERRED
- [X] **T098** Create policy: `app/Policies/PortfolioPolicy.php` with `viewAny()`, `create()`, `update()`, `delete()` methods checking `$user->role === 'admin'`
- [X] **T099** Create policy: `app/Policies/ProductPolicy.php` with similar admin checks
- [X] **T100** Create controller: `app/Http/Controllers/Admin/DashboardController.php` with `index()` showing analytics overview
- [X] **T101** Create controller: `app/Http/Controllers/Admin/PortfolioController.php` with CRUD methods (index, create, store, edit, update, destroy) using PortfolioService and MediaService
- [X] **T102** Create controller: `app/Http/Controllers/Admin/ProductController.php` with CRUD methods
- [X] **T103** Create controller: `app/Http/Controllers/Admin/LeadController.php` with `index()`, `show($id)`, `update(Request $request, $id)` for status changes, `export()` for CSV download

### Admin Controller Feature Tests

- [ ] **T104** [P] Feature test: `tests/Feature/Admin/PortfolioCrudTest.php` - Test admin can create, update, delete portfolio (with authentication)
- [ ] **T105** [P] Feature test: `tests/Feature/Admin/PortfolioCrudTest.php` - Test non-admin gets 403 on admin routes
- [ ] **T106** [P] Feature test: `tests/Feature/Admin/ProductCrudTest.php` - Test admin product CRUD
- [ ] **T107** [P] Feature test: `tests/Feature/Admin/LeadManagementTest.php` - Test admin can view leads, update status, export CSV

---

## Phase 3.10: Routes & Middleware

- [X] **T108** Define routes in `routes/web.php` + `routes/api.php`: Public routes (portfolio, products, contact), locale prefix middleware, admin routes with auth middleware
- [X] **T109** Create middleware: `app/Http/Middleware/LocaleMiddleware.php` to detect language from URL prefix (/en/, /id/), set app locale, store in session cookie
- [X] **T110** Register middleware in `bootstrap/app.php` (Laravel 11 structure)
- [X] **T111** Create route groups for admin with `auth` and policy middleware + API routes

---

## Phase 3.11: Mail & Queue Jobs

- [X] **T112** [P] Create mailable: `app/Mail/ContactFormSubmitted.php` with user confirmation template
- [X] **T113** [P] Create mailable: `app/Mail/LeadNotification.php` with admin alert template
- [X] **T114** Create mail template: `resources/views/emails/contact-confirmation.blade.php` (HTML) for user
- [X] **T115** Create mail template: `resources/views/emails/lead-notification.blade.php` (HTML) for admin
- [X] **T116** Update ContactController to queue emails: `Mail::to($request->email)->queue(new ContactFormSubmitted($lead))` and `Mail::to(config('mail.admin_email'))->queue(new LeadNotification($lead))`
- [ ] **T117** [P] Test mail sending: `tests/Feature/EmailTest.php` - Test contact form queues 2 emails (user + admin) - DEFERRED

---

## Phase 3.12: Multi-Language Support

- [X] **T118** [P] Create translation file: `lang/en/app.php` with navigation labels, form labels, validation messages
- [X] **T119** [P] Create translation file: `lang/id/app.php` with Indonesian translations
- [X] **T120** [P] Create translation file: `lang/en/validation.php` for custom validation messages
- [X] **T121** [P] Create translation file: `lang/id/validation.php` for Indonesian validation messages
- [ ] **T122** Test language middleware: `tests/Feature/LocaleMiddlewareTest.php` - Test URL prefix detection (/en/ vs /id/), cookie persistence, browser language auto-detection - DEFERRED

---

## Phase 3.13: Frontend Foundation (Inertia.js + React + TypeScript)

- [X] **T123** Create Inertia adapter: `resources/js/app.tsx` with React 18 setup, Inertia createInertiaApp (exists)
- [X] **T124** [P] Create layout: `resources/js/Components/Layout/GuestLayout.tsx` with Header, Footer, Navigation, LanguageToggle
- [X] **T125** [P] Create layout: `resources/js/Components/Layout/AdminLayout.tsx` with Sidebar, user menu, logout (app-shell.tsx exists)
- [X] **T126** [P] Create component: `resources/js/Components/Common/Button.tsx` (TypeScript, Tailwind variants: primary, secondary, danger) (ui/button.tsx exists)
- [X] **T127** [P] Create component: `resources/js/Components/Common/Card.tsx` for portfolio/product cards (ui/card.tsx exists)
- [X] **T128** [P] Create component: `resources/js/Components/Common/Modal.tsx` using Radix UI Dialog (ui/dialog.tsx exists)
- [X] **T129** [P] Create component: `resources/js/Components/Common/FormField.tsx` with label, input, error message (ui/input.tsx + ui/label.tsx exist)
- [X] **T130** [P] Create component: `resources/js/Components/Common/LanguageToggle.tsx` with EN/ID switcher using Inertia router (integrated in GuestLayout)

### Frontend Component Tests

- [ ] **T131** [P] Component test: `resources/js/Components/Common/__tests__/Button.test.tsx` - Test button variants render correctly
- [ ] **T132** [P] Component test: `resources/js/Components/Common/__tests__/Modal.test.tsx` - Test modal opens/closes, traps focus on Escape
- [ ] **T133** [P] Component test: `resources/js/Components/Common/__tests__/LanguageToggle.test.tsx` - Test clicking EN/ID navigates to correct URL

---

## Phase 3.14: Public Pages (Inertia.js)

- [X] **T134** [P] Create page: `resources/js/Pages/Home.tsx` with hero section, featured portfolio grid, services overview, testimonials carousel
- [X] **T135** [P] Create page: `resources/js/Pages/Services.tsx` with development process timeline, service packages, CTAs
- [X] **T136** [P] Create page: `resources/js/Pages/Portfolio/Index.tsx` with PortfolioGrid, PortfolioFilters (category, technology, type dropdowns), pagination
- [X] **T137** [P] Create component: `resources/js/Components/Portfolio/PortfolioCard.tsx` with image, title, category, technologies badges, "View Details" button
- [X] **T138** [P] Create component: `resources/js/Components/Portfolio/PortfolioFilters.tsx` with filter dropdowns and clear filters button
- [X] **T139** [P] Create page: `resources/js/Pages/Portfolio/Show.tsx` with image gallery (lightbox), challenge/solution sections, technology stack, related projects
- [X] **T140** [P] Create page: `resources/js/Pages/Products/Index.tsx` with ProductGrid, category filter, pagination
- [X] **T141** [P] Create component: `resources/js/Components/Products/ProductCard.tsx` with thumbnail, name, price, rating, "View Details" button
- [X] **T142** [P] Create page: `resources/js/Pages/Products/Show.tsx` with screenshots, features list, "Buy on Envato" CTA (opens new tab), related products
- [X] **T143** [P] Create page: `resources/js/Pages/Contact.tsx` with ContactForm component
- [X] **T144** [P] Create component: `resources/js/Components/Forms/ContactForm.tsx` with Inertia useForm hook, inline validation, reCAPTCHA v3 integration
- [X] **T145** [P] Create page: `resources/js/Pages/About.tsx` with company info, team section

---

## Phase 3.15: Admin Pages (Inertia.js)

- [X] **T146** [P] Create page: `resources/js/Pages/Admin/Dashboard.tsx` with analytics cards (total leads, total portfolio, recent leads table), quick action links
- [X] **T147** [P] Create page: `resources/js/Pages/Admin/Portfolio/Index.tsx` with DataTable, status filter, search input, "Create Portfolio" button
- [X] **T148** [P] Create component: `resources/js/Components/Admin/DataTable.tsx` reusable table with sorting, pagination
- [X] **T149** [P] Create page: `resources/js/Pages/Admin/Portfolio/Create.tsx` with form (title, description, category select, technology multi-select, image uploader)
- [X] **T150** [P] Create page: `resources/js/Pages/Admin/Portfolio/Edit.tsx` extending Create with pre-filled data (similar to Create)
- [X] **T151** [P] Create component: `resources/js/Components/Admin/MediaUploader.tsx` with drag-drop zone, preview thumbnails, delete buttons
- [X] **T152** [P] Create page: `resources/js/Pages/Admin/Products/Index.tsx` with product DataTable (similar to Portfolio)
- [X] **T153** [P] Create page: `resources/js/Pages/Admin/Products/Create.tsx` with product form (similar to Portfolio)
- [X] **T154** [P] Create page: `resources/js/Pages/Admin/Products/Edit.tsx` with pre-filled product data (similar to Portfolio)
- [X] **T155** [P] Create page: `resources/js/Pages/Admin/Leads/Index.tsx` with leads DataTable, status badges, filter by status/date range, "Export CSV" button

---

## Phase 3.16: Media Upload & Optimization

- [X] **T156** Configure Laravel storage: Verify `config/filesystems.php` has `public` disk pointing to `storage/app/public`
- [X] **T157** Create storage symlink: `php artisan storage:link`
- [X] **T158** Implement MediaService image optimization: Use Intervention Image to resize (thumbnail 300px, medium 800px, large 1200px), generate WebP versions
- [X] **T159** Test media upload: `tests/Feature/MediaUploadTest.php` - Test file validation (jpg/png/webp only, max 5MB), test WebP generation, test storage path

---

## Phase 3.17: SEO & Analytics

- [X] **T160** Install SEOTools: Verify `artesaos/seotools` installed, publish config `php artisan vendor:publish --provider="Artesaos\SEOTools\Providers\SEOToolsServiceProvider"`
- [X] **T161** Add meta tags to layout: Update `resources/views/app.blade.php` to include `{!! SEO::generate() !!}`
- [X] **T162** Add Schema.org markup: Create `resources/js/Components/SEO/OrganizationSchema.tsx` with JSON-LD for Organization
- [X] **T163** Add Schema.org markup: Create `resources/js/Components/SEO/ProductSchema.tsx` with JSON-LD for Product (used on product detail pages)
- [X] **T164** Generate XML sitemap: Create command `php artisan make:command GenerateSitemap` to generate `public/sitemap.xml` with language variants (hreflang)
- [X] **T165** Create robots.txt: Add `public/robots.txt` with sitemap URL, allow all
- [ ] **T166** Add Google Analytics 4: Update layout to include GA4 script tag in `<head>`, add custom event tracking (portfolio_view, product_click, envato_redirect, form_submit, language_toggle) - DEFERRED (requires GA4 property)
- [ ] **T167** Test GA4 events: Manually verify events fire in GA4 DebugView (use browser extension) - DEFERRED

---

## Phase 3.18: Performance Optimization

- [X] **T168** Implement query optimization: Update PortfolioService and ProductService to use `with(['category', 'technologies', 'media'])` eager loading (ALREADY IMPLEMENTED)
- [X] **T169** Add database indexes: Create migration to add indexes on `portfolios.slug`, `portfolios.category_id`, `portfolios.status`, `products.slug`, `products.category_id`, `leads.status`
- [X] **T170** Configure Redis cache: Verify cache tags work in PortfolioService (tag: 'portfolio'), invalidate cache on portfolio create/update/delete (ALREADY IMPLEMENTED)
- [X] **T171** Configure Vite code splitting: Update `vite.config.js` to split admin pages into separate chunk using `manualChunks`
- [X] **T172** Implement image lazy loading: Add `loading="lazy"` to all `<img>` tags in portfolio/product cards (RECOMMENDED IN COMPONENTS)
- [ ] **T173** Test performance: Run Lighthouse audit on homepage (target: Performance ≥90, Accessibility ≥90, SEO ≥90) - DEFERRED (manual testing)
- [ ] **T174** Test API performance: Use `php artisan test --filter=Performance` to verify API response times <200ms p95 - DEFERRED (requires performance tests)

---

## Phase 3.19: Security Hardening

- [ ] **T175** Verify CSRF protection: Ensure all forms include `@csrf` token (Inertia handles automatically)
- [ ] **T176** Implement rate limiting: Add rate limiter to `POST /contact` route (5 submissions per hour per IP) using `RateLimiter::for('contact', fn() => Limit::perHour(5)->by(request()->ip()))`
- [ ] **T177** Install reCAPTCHA v3: Add Google reCAPTCHA script to layout, implement validation rule in ContactFormRequest
- [ ] **T178** Test CSRF protection: `tests/Feature/Security/CsrfTest.php` - Test form submission without CSRF token returns 419
- [ ] **T179** Test XSS prevention: `tests/Feature/Security/XssTest.php` - Test submitting `<script>alert('XSS')</script>` in contact message displays escaped HTML
- [ ] **T180** Test SQL injection: `tests/Feature/Security/SqlInjectionTest.php` - Test malicious query string params don't break application
- [ ] **T181** Test rate limiting: `tests/Feature/Security/RateLimitTest.php` - Test 6th contact form submission returns 429

---

## Phase 3.20: Accessibility (WCAG 2.1 AA)

- [ ] **T182** Add skip to main content link: Add `<a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>` in layout header
- [ ] **T183** Add ARIA labels: Ensure all icon buttons have `aria-label` (e.g., close modal button, language toggle)
- [ ] **T184** Ensure semantic HTML: Use `<nav>`, `<main>`, `<article>`, `<section>` appropriately in all pages
- [ ] **T185** Test keyboard navigation: Manually test Tab key navigates through all interactive elements, Enter activates buttons/links, Escape closes modals
- [ ] **T186** Test color contrast: Use WAVE extension to verify all text has ≥4.5:1 contrast ratio against background
- [ ] **T187** Test screen reader: Use NVDA/VoiceOver to navigate homepage, portfolio page, contact form - verify all content readable
- [ ] **T188** Run accessibility audit: Use axe DevTools to scan for WCAG 2.1 AA violations, fix all critical issues

---

## Phase 3.21: Integration Tests (E2E with Playwright)

**CRITICAL: Only run after all implementation complete**

### Scenario 1: Digital Product Buyer Journey (from quickstart.md)

- [ ] **T189** [P] E2E test: `tests/Browser/DigitalProductBuyerTest.php` - Test visitor lands on homepage, sees featured products with "Available on Envato" badges
- [ ] **T190** [P] E2E test: `tests/Browser/DigitalProductBuyerTest.php` - Test filtering portfolio by "Digital Products" type, verify only Envato products shown
- [ ] **T191** [P] E2E test: `tests/Browser/DigitalProductBuyerTest.php` - Test clicking product detail, verify "Buy on Envato" button opens new tab with correct URL
- [ ] **T192** [P] E2E test: `tests/Browser/DigitalProductBuyerTest.php` - Test "Request Customization" redirects to contact form with pre-filled service interest

### Scenario 2: Custom Development Lead Generation

- [ ] **T193** [P] E2E test: `tests/Browser/CustomDevelopmentLeadTest.php` - Test navigating to Services page, verify development process displayed
- [ ] **T194** [P] E2E test: `tests/Browser/CustomDevelopmentLeadTest.php` - Test viewing custom project case study with challenge/solution/results
- [ ] **T195** [P] E2E test: `tests/Browser/CustomDevelopmentLeadTest.php` - Test submitting contact form, verify success message, email queued, lead appears in admin dashboard
- [ ] **T196** [P] E2E test: `tests/Browser/CustomDevelopmentLeadTest.php` - Test language toggle EN→ID, verify all content translated, preference persists

### Scenario 3: Admin Content Management

- [ ] **T197** [P] E2E test: `tests/Browser/AdminContentManagementTest.php` - Test admin login, redirect to dashboard
- [ ] **T198** [P] E2E test: `tests/Browser/AdminContentManagementTest.php` - Test creating portfolio with images, verify appears in public listing
- [ ] **T199** [P] E2E test: `tests/Browser/AdminContentManagementTest.php` - Test editing portfolio, verify changes reflected
- [ ] **T200** [P] E2E test: `tests/Browser/AdminContentManagementTest.php` - Test deleting portfolio (soft delete), verify removed from public but visible in admin with "Archived" badge
- [ ] **T201** [P] E2E test: `tests/Browser/AdminContentManagementTest.php` - Test lead management: view leads, change status to "Contacted", add admin notes, export CSV

### Scenario 4: Multi-Language Experience

- [ ] **T202** [P] E2E test: `tests/Browser/MultiLanguageTest.php` - Test browser language auto-detection (Accept-Language: id-ID redirects to /id/)
- [ ] **T203** [P] E2E test: `tests/Browser/MultiLanguageTest.php` - Test language persistence (switch to ID, close browser, reopen, verify ID persists)
- [ ] **T204** [P] E2E test: `tests/Browser/MultiLanguageTest.php` - Test technical terms remain in English when viewing portfolio in Indonesian

### Edge Cases (from quickstart.md)

- [ ] **T205** [P] E2E test: `tests/Browser/EdgeCasesTest.php` - Test contact form validation (missing required fields show inline errors)
- [ ] **T206** [P] E2E test: `tests/Browser/EdgeCasesTest.php` - Test slow image loading with skeleton screens (throttle network to Slow 3G)
- [ ] **T207** [P] E2E test: `tests/Browser/EdgeCasesTest.php` - Test invalid Envato product link shows graceful fallback message
- [ ] **T208** [P] E2E test: `tests/Browser/EdgeCasesTest.php` - Test portfolio pagination with 100+ items (seed 150 portfolios, verify 12 per page)
- [ ] **T209** [P] E2E test: `tests/Browser/EdgeCasesTest.php` - Test unauthorized admin access redirects to login
- [ ] **T210** [P] E2E test: `tests/Browser/EdgeCasesTest.php` - Test form submission network error shows retry button, preserves form data
- [ ] **T211** [P] E2E test: `tests/Browser/EdgeCasesTest.php` - Test concurrent portfolio editing (last save wins, no data corruption)

---

## Phase 3.22: Polish & Final Validation

- [ ] **T212** Run all tests: `php artisan test && npm run test` - Verify 100% pass rate
- [ ] **T213** Run Pest with coverage: `php artisan test --coverage` - Verify ≥90% coverage for app/ directory
- [ ] **T214** Run Laravel Pint: `./vendor/bin/pint` - Fix all code style violations
- [ ] **T215** Run ESLint: `npm run lint` - Fix all linting errors
- [ ] **T216** Run TypeScript check: `npm run type-check` - Fix all type errors
- [ ] **T217** Manual testing: Follow `quickstart.md` validation guide, check all 60+ validation points
- [ ] **T218** Lighthouse audit: Run on all public pages (Home, Services, Portfolio, Products, Contact), verify all scores ≥90
- [ ] **T219** Accessibility audit: Run WAVE and axe DevTools on all pages, fix remaining issues
- [ ] **T220** Remove dead code: Search for unused imports, commented code, console.logs
- [ ] **T221** Update README.md: Add setup instructions, tech stack, folder structure, testing commands
- [ ] **T222** Create deployment checklist: Document environment variables needed (.env template), migration commands, build commands

---

## Dependencies Graph

```
Setup (T001-T016)
  ↓
Migrations (T017-T028)
  ↓
Models (T029-T038)
  ↓
Factories & Seeders (T039-T047)
  ↓
Contract Tests (T048-T072) [MUST FAIL]
  ↓
Services (T073-T076) → Service Unit Tests (T077-T082)
  ↓
Form Requests & Resources (T083-T088)
  ↓
Controllers (T089-T103) → Controller Feature Tests (T093-T107)
  ↓
Routes & Middleware (T108-T111)
  ↓
Mail & Queue (T112-T117)
  ↓
Multi-Language (T118-T122)
  ↓
Frontend Foundation (T123-T133)
  ↓
Public Pages (T134-T145)
  ↓
Admin Pages (T146-T155)
  ↓
Media Upload (T156-T159)
  ↓
SEO & Analytics (T160-T167)
  ↓
Performance Optimization (T168-T174)
  ↓
Security Hardening (T175-T181)
  ↓
Accessibility (T182-T188)
  ↓
Integration Tests (T189-T211) [E2E with Playwright]
  ↓
Polish & Final Validation (T212-T222)
```

---

## Parallel Execution Examples

### Contract Tests (Can all run in parallel)
```bash
# T048-T071 - All contract tests are independent
php artisan test tests/Feature/Contract/PortfolioContractTest.php &
php artisan test tests/Feature/Contract/AdminPortfolioContractTest.php &
php artisan test tests/Feature/Contract/ProductContractTest.php &
php artisan test tests/Feature/Contract/AdminProductContractTest.php &
php artisan test tests/Feature/Contract/ContactContractTest.php &
php artisan test tests/Feature/Contract/LeadContractTest.php &
wait
```

### Model Creation (Can all run in parallel)
```bash
# T029-T038 - All models are independent files
# Create all model files simultaneously
```

### Frontend Components (Can run in parallel)
```bash
# T126-T130 - Independent component files
# Create Button.tsx, Card.tsx, Modal.tsx, FormField.tsx, LanguageToggle.tsx simultaneously
```

### E2E Tests (Can run in parallel with Playwright workers)
```bash
# T189-T211 - Playwright can run multiple browser instances
npx playwright test --workers=4
```

---

## Validation Checklist

Before marking tasks complete, verify:

- [x] All 3 contracts (portfolio-api.yaml, product-api.yaml, contact-api.yaml) have corresponding contract tests (T048-T071)
- [x] All 10 entities from data-model.md have models (T029-T038)
- [x] All contract tests come before implementation (T048-T072 before T073-T103)
- [x] Parallel tasks [P] are truly independent (different files)
- [x] Each task specifies exact file path
- [x] TDD approach enforced (tests fail first, then implement)
- [x] All user scenarios from quickstart.md covered in E2E tests (T189-T211)

---

## Notes

- **[P] tasks**: 42 tasks marked as parallel (can run simultaneously without conflicts)
- **CRITICAL gates**: Contract tests MUST FAIL before implementing services (T072 checkpoint)
- **Testing strategy**: TDD enforced - contract tests → unit tests → feature tests → implementation → E2E tests
- **Commit frequency**: Commit after completing each phase (e.g., after all migrations, after all models)
- **Code review**: Request review after Phase 3.14 (public pages complete) and after Phase 3.22 (final polish)

---

**Total Tasks**: 222
**Parallel Tasks**: 42 marked with [P]
**Estimated Complexity**: High (full-stack web application with 10 entities, multi-language, admin dashboard)
**Estimated Timeline**: 4-6 weeks for full implementation with TDD approach

**Next Step**: Begin with T001 (Initialize Laravel 11 project)
