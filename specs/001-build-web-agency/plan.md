
# Implementation Plan: Devlecta Web Agency Website

**Branch**: `001-build-web-agency` | **Date**: 2025-10-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/Users/zoldy/Herd/devlecta/specs/001-build-web-agency/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from file system structure or context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Build a comprehensive web agency website for Devlecta showcasing digital products (Envato marketplace) and custom development services. The platform requires public-facing portfolio/product pages with multi-language support (EN/ID), contact form with lead management, and an admin dashboard for content management. Primary focus: lead generation for custom development and driving traffic to Envato product listings.

## Technical Context
**Language/Version**: PHP 8.2+ (Laravel 11.x), TypeScript 5.x (React 18.x), Node.js 20.x
**Primary Dependencies**: Laravel 11, Inertia.js 1.x, React 18, MySQL 8.0, Tailwind CSS 3.x, Radix UI, Pest (testing)
**Storage**: MySQL 8.0 (relational data), Redis (cache/sessions/queues), Local filesystem (media uploads with Laravel storage)
**Testing**: Backend: Pest (unit/feature tests), Frontend: Vitest + React Testing Library, E2E: Playwright
**Target Platform**: Web application (responsive mobile/tablet/desktop), deployed on Linux server
**Project Type**: web (Laravel backend + Inertia.js/React frontend)
**Performance Goals**: API <200ms p95, Page load <2s FCP, Core Web Vitals green (LCP <2.5s, FID <100ms, CLS <0.1), 10,000+ concurrent users
**Constraints**: WCAG 2.1 AA compliance, SEO-optimized (Schema.org markup, hreflang tags), HTTPS enforced, reCAPTCHA v3 for forms
**Scale/Scope**: 10+ pages, 8 core entities, 100+ portfolio items scalability, multi-language (EN/ID), admin dashboard with CRUD operations

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Test-Driven Development
- [ ] **TDD Discipline**: All implementation will follow Red-Green-Refactor cycle
- [ ] **Test-First Order**: Contract tests → Unit tests → Feature tests → Implementation
- [ ] **Coverage Target**: ≥90% coverage for business logic, services, and controllers
- **Status**: ✅ PASS - Plan enforces test-first approach in Phase 1 & 2

### Code Quality Standards
- [ ] **Type Safety**: TypeScript strict mode on frontend, PHP 8.2+ type hints on backend
- [ ] **Linting**: ESLint/Prettier (frontend), Laravel Pint (backend) - zero violations
- [ ] **Function Complexity**: <20 lines per function (will monitor during implementation)
- [ ] **Class Complexity**: <200 lines per class (will monitor during implementation)
- [ ] **DRY Principle**: Extract shared business logic to services/utilities
- **Status**: ✅ PASS - Tooling and standards will be enforced

### Test Coverage & Quality
- [ ] **Unit Tests**: All services, utilities, models (≥90% coverage)
- [ ] **Feature Tests**: All API endpoints with request/response validation
- [ ] **Integration Tests**: User workflows (portfolio browsing, form submission, admin CRUD)
- [ ] **Edge Cases**: Error handling, validation failures, permission checks
- [ ] **Performance Tests**: API endpoints <200ms p95, Frontend <100ms TTI
- **Status**: ✅ PASS - Comprehensive test strategy planned

### User Experience Consistency
- [ ] **Accessibility**: WCAG 2.1 AA (semantic HTML, ARIA labels, keyboard nav, color contrast ≥4.5:1)
- [ ] **Responsive Design**: Mobile-first (375px, 768px, 1440px breakpoints)
- [ ] **Loading States**: Skeleton screens for portfolio/products, loading indicators for forms
- [ ] **Error Handling**: User-friendly messages, inline validation, actionable guidance
- [ ] **Performance**: Lighthouse ≥90 mobile, Core Web Vitals green
- **Status**: ✅ PASS - Requirements align with UX standards

### Performance & Scalability
- [ ] **Backend**: API <200ms p95, N+1 query prevention (eager loading), Redis cache, queue for emails
- [ ] **Frontend**: Bundle <200KB gzip, code splitting, lazy loading, memoization, WebP images
- [ ] **Scalability**: Horizontal scaling ready, rate limiting (100 req/min), database indexing
- **Status**: ✅ PASS - Architecture supports performance goals

### Security & Data Protection
- [ ] **Authentication**: Laravel Fortify with secure password hashing
- [ ] **Authorization**: Policy-based access control for admin routes
- [ ] **Input Validation**: Server-side validation, XSS prevention, SQL injection prevention (Eloquent ORM)
- [ ] **CSRF Protection**: Laravel CSRF tokens on all forms
- [ ] **reCAPTCHA**: v3 on contact forms
- [ ] **Secrets**: .env for credentials (gitignored), no hardcoded secrets
- **Status**: ✅ PASS - Security requirements addressed

### Documentation Requirements
- [ ] **Code Documentation**: PHPDoc for public methods, TSDoc for complex utilities
- [ ] **API Documentation**: OpenAPI spec in /contracts/
- [ ] **Feature Specs**: This spec in specs/001-build-web-agency/
- [ ] **README**: Setup instructions, architecture overview
- **Status**: ✅ PASS - Documentation plan in place

**Initial Constitution Check Result**: ✅ **PASS** - No constitutional violations identified. All principles can be satisfied with planned architecture.

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
app/                          # Laravel backend
├── Http/
│   ├── Controllers/
│   │   ├── Admin/           # Admin dashboard controllers
│   │   │   ├── PortfolioController.php
│   │   │   ├── ProductController.php
│   │   │   ├── LeadController.php
│   │   │   └── DashboardController.php
│   │   ├── PortfolioController.php    # Public portfolio
│   │   ├── ProductController.php      # Public products
│   │   └── ContactController.php      # Contact form
│   ├── Middleware/
│   │   └── LocaleMiddleware.php       # Multi-language handling
│   ├── Requests/
│   │   ├── ContactFormRequest.php
│   │   ├── Admin/
│   │   │   ├── StorePortfolioRequest.php
│   │   │   └── StoreProductRequest.php
│   └── Resources/
│       ├── PortfolioResource.php
│       └── ProductResource.php
├── Models/
│   ├── Portfolio.php
│   ├── Product.php
│   ├── Lead.php
│   ├── Testimonial.php
│   ├── Technology.php
│   ├── Category.php
│   └── User.php
├── Services/
│   ├── PortfolioService.php
│   ├── ProductService.php
│   ├── LeadService.php
│   └── MediaService.php
├── Policies/
│   ├── PortfolioPolicy.php
│   └── ProductPolicy.php
└── Mail/
    ├── ContactFormSubmitted.php
    └── LeadNotification.php

resources/js/                 # Inertia.js/React frontend
├── Components/
│   ├── Layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── Portfolio/
│   │   ├── PortfolioCard.tsx
│   │   ├── PortfolioGrid.tsx
│   │   ├── PortfolioFilters.tsx
│   │   └── PortfolioDetail.tsx
│   ├── Products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── ProductDetail.tsx
│   ├── Forms/
│   │   ├── ContactForm.tsx
│   │   └── FormField.tsx
│   ├── Admin/
│   │   ├── Sidebar.tsx
│   │   ├── DataTable.tsx
│   │   └── MediaUploader.tsx
│   └── Common/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       └── LanguageToggle.tsx
├── Pages/
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── Portfolio/
│   │   ├── Index.tsx
│   │   └── Show.tsx
│   ├── Products/
│   │   ├── Index.tsx
│   │   └── Show.tsx
│   ├── Contact.tsx
│   ├── About.tsx
│   └── Admin/
│       ├── Dashboard.tsx
│       ├── Portfolio/
│       │   ├── Index.tsx
│       │   ├── Create.tsx
│       │   └── Edit.tsx
│       ├── Products/
│       │   ├── Index.tsx
│       │   ├── Create.tsx
│       │   └── Edit.tsx
│       └── Leads/
│           └── Index.tsx
├── Hooks/
│   ├── usePortfolio.ts
│   ├── useProducts.ts
│   └── useLanguage.ts
└── Services/
    ├── api.ts
    └── analytics.ts

database/
├── migrations/
│   ├── create_portfolios_table.php
│   ├── create_products_table.php
│   ├── create_leads_table.php
│   ├── create_testimonials_table.php
│   ├── create_technologies_table.php
│   ├── create_categories_table.php
│   └── create_portfolio_technology_table.php
├── factories/
│   ├── PortfolioFactory.php
│   ├── ProductFactory.php
│   └── LeadFactory.php
└── seeders/
    ├── CategorySeeder.php
    └── TechnologySeeder.php

tests/
├── Feature/
│   ├── Portfolio/
│   │   ├── PortfolioListTest.php
│   │   ├── PortfolioDetailTest.php
│   │   └── PortfolioFilterTest.php
│   ├── Products/
│   │   ├── ProductListTest.php
│   │   └── ProductDetailTest.php
│   ├── Contact/
│   │   └── ContactFormTest.php
│   └── Admin/
│       ├── PortfolioCrudTest.php
│       ├── ProductCrudTest.php
│       └── LeadManagementTest.php
├── Unit/
│   ├── Services/
│   │   ├── PortfolioServiceTest.php
│   │   ├── ProductServiceTest.php
│   │   └── MediaServiceTest.php
│   └── Models/
│       ├── PortfolioTest.php
│       └── ProductTest.php
└── Contract/
    └── Api/
        ├── PortfolioContractTest.php
        ├── ProductContractTest.php
        └── ContactContractTest.php

public/
└── media/                    # Uploaded images
    ├── portfolio/
    └── products/
```

**Structure Decision**: Web application architecture using Laravel monolith with Inertia.js for SSR React integration. Backend follows Laravel conventions (app/, routes/, database/), frontend organized by feature (Pages/, Components/). Tests mirror source structure. Media storage uses Laravel's public disk for portfolio/product images.

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh claude`
     **IMPORTANT**: Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:

1. **Database & Models Foundation** (from data-model.md):
   - Task: Create database migrations for all 10 entities (users, categories, technologies, portfolios, products, testimonials, leads, site_settings, portfolio_media, product_media, portfolio_technology pivot)
   - Task: Create Eloquent models with relationships, validation rules, accessors/mutators
   - Task: Create factories for testing (PortfolioFactory, ProductFactory, LeadFactory)
   - Task: Create seeders (CategorySeeder, TechnologySeeder for predefined data)
   - Task: Write unit tests for model relationships and scopes

2. **Contract Tests** (from contracts/*.yaml):
   - Task: Create contract test for Portfolio API (GET /portfolio, GET /portfolio/{slug}, POST /admin/portfolio, PUT /admin/portfolio/{id}, DELETE /admin/portfolio/{id})
   - Task: Create contract test for Product API (GET /products, GET /products/{slug}, CRUD endpoints)
   - Task: Create contract test for Contact/Lead API (POST /contact, GET /admin/leads, PATCH /admin/leads/{id}, GET /admin/leads/export)
   - Each test validates request/response schemas from OpenAPI specs
   - **All contract tests must fail initially** (no implementation yet)

3. **Service Layer & Business Logic**:
   - Task: Implement PortfolioService (filtering, caching, related projects logic)
   - Task: Implement ProductService (catalog logic, related products)
   - Task: Implement LeadService (status management, CSV export)
   - Task: Implement MediaService (image upload, resizing, WebP conversion)
   - Task: Write unit tests for each service (≥90% coverage)

4. **Backend Controllers & Routes**:
   - Task: Create public controllers (PortfolioController, ProductController, ContactController)
   - Task: Create admin controllers (Admin/PortfolioController, Admin/ProductController, Admin/LeadController, Admin/DashboardController)
   - Task: Implement Form Requests (ContactFormRequest, StorePortfolioRequest, StoreProductRequest)
   - Task: Implement API Resources (PortfolioResource, ProductResource)
   - Task: Define routes (web.php, admin routes with auth middleware)
   - Task: Write feature tests for all controller actions

5. **Authentication & Authorization**:
   - Task: Install and configure Laravel Fortify
   - Task: Create Policies (PortfolioPolicy, ProductPolicy)
   - Task: Write tests for authorization (admin-only routes, policy enforcement)

6. **Multi-Language Support**:
   - Task: Create LocaleMiddleware for language detection and URL prefix handling
   - Task: Create translation files (lang/en/*.php, lang/id/*.php)
   - Task: Implement LanguageToggle component (React)
   - Task: Add hreflang tags to layout
   - Task: Write tests for language switching and persistence

7. **Frontend Foundation** (Inertia.js + React):
   - Task: Set up Inertia.js with React adapter
   - Task: Configure TypeScript, ESLint, Prettier
   - Task: Create shared layouts (GuestLayout, AdminLayout)
   - Task: Create common components (Button, Card, Modal, FormField)
   - Task: Write component tests with Vitest + React Testing Library

8. **Public Pages**:
   - Task: Create Home page (hero, featured portfolio, services overview, testimonials)
   - Task: Create Services page (development process, packages, CTAs)
   - Task: Create Portfolio index page (grid, filters, pagination)
   - Task: Create Portfolio detail page (project info, gallery, related projects)
   - Task: Create Products index page (grid, filtering)
   - Task: Create Products detail page (product info, screenshots, Envato CTA)
   - Task: Create Contact page (form with reCAPTCHA)
   - Task: Create About page (company info, team)
   - Task: Write integration tests for each page (Playwright)

9. **Admin Dashboard**:
   - Task: Create Dashboard page (analytics overview, recent leads, quick actions)
   - Task: Create Portfolio management pages (Index, Create, Edit with media uploader)
   - Task: Create Product management pages (Index, Create, Edit)
   - Task: Create Lead management page (table, filters, status update modal, CSV export)
   - Task: Create Settings page (site settings, content management)
   - Task: Write integration tests for admin workflows

10. **Media & Asset Handling**:
    - Task: Configure Laravel storage (public disk for portfolio/product media)
    - Task: Create MediaUploader component (drag-drop, preview, validation)
    - Task: Implement image optimization (Intervention Image, WebP conversion)
    - Task: Implement lazy loading and skeleton screens
    - Task: Write tests for file uploads and validation

11. **Email Notifications**:
    - Task: Create ContactFormSubmitted mailable (user confirmation)
    - Task: Create LeadNotification mailable (admin alert)
    - Task: Configure queue for email sending (Redis driver)
    - Task: Write tests for email sending and queue jobs

12. **SEO & Analytics**:
    - Task: Install artesaos/seotools package
    - Task: Implement meta tags, Open Graph, Twitter Cards
    - Task: Add Schema.org markup (Organization, Product, BreadcrumbList)
    - Task: Generate XML sitemap with language variants
    - Task: Implement Google Analytics 4 tracking (custom events)
    - Task: Add robots.txt and canonical URLs

13. **Performance Optimization**:
    - Task: Implement Redis caching for portfolio/product listings
    - Task: Set up query optimization (eager loading, database indexes)
    - Task: Configure Vite for code splitting and bundle optimization
    - Task: Implement image lazy loading
    - Task: Write performance tests (API response times, Lighthouse scores)

14. **Security Hardening**:
    - Task: Configure CSRF protection (verify on all forms)
    - Task: Implement rate limiting on contact form (5 submissions/hour per IP)
    - Task: Install and configure reCAPTCHA v3
    - Task: Implement input sanitization and validation
    - Task: Write security tests (XSS prevention, SQL injection prevention, CSRF)

15. **Accessibility (WCAG 2.1 AA)**:
    - Task: Implement keyboard navigation
    - Task: Add ARIA labels and semantic HTML
    - Task: Ensure color contrast ≥4.5:1
    - Task: Add skip to main content link
    - Task: Test with screen readers (NVDA/VoiceOver)
    - Task: Run accessibility audits (WAVE, axe DevTools)

16. **Integration Testing** (from quickstart.md scenarios):
    - Task: E2E test for Scenario 1 (Digital Product Buyer Journey)
    - Task: E2E test for Scenario 2 (Custom Development Lead Generation)
    - Task: E2E test for Scenario 3 (Admin Content Management)
    - Task: E2E test for Scenario 4 (Multi-Language Experience)
    - Task: E2E tests for all edge cases (form validation, image loading, rate limiting, etc.)

**Ordering Strategy**:
1. **Foundation First**: Migrations → Models → Seeders → Factories [P - parallel within category]
2. **TDD Approach**: Contract tests → Service unit tests → Controller feature tests → Implementation
3. **Dependency Order**: Backend (models, services, controllers) → Frontend (layouts, components, pages)
4. **Parallel Execution**: Mark [P] for independent tasks (e.g., separate model files, separate pages)
5. **Integration Last**: E2E tests run after all features implemented

**Estimated Output**: ~80-100 numbered, dependency-ordered tasks in tasks.md

**Task Categorization**:
- [P] = Parallel execution possible (independent files)
- [CRITICAL] = Blocking task (required for subsequent tasks)
- [OPTIONAL] = Nice-to-have (can be deferred)

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan. The /tasks command will load the tasks template and generate concrete, actionable tasks following this strategy.

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command) - research.md created
- [x] Phase 1: Design complete (/plan command) - data-model.md, contracts/*.yaml, quickstart.md, CLAUDE.md created
- [x] Phase 2: Task planning complete (/plan command - approach documented above)
- [ ] Phase 3: Tasks generated (/tasks command) - Will create tasks.md
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS (no violations, architecture supports all principles)
- [x] Post-Design Constitution Check: PASS (design reviewed, no new violations)
- [x] All NEEDS CLARIFICATION resolved (all tech stack decisions documented in research.md)
- [x] Complexity deviations documented (none - no constitutional violations)

**Artifacts Generated**:
- ✅ /Users/zoldy/Herd/devlecta/specs/001-build-web-agency/plan.md (this file)
- ✅ /Users/zoldy/Herd/devlecta/specs/001-build-web-agency/research.md (architecture decisions, best practices)
- ✅ /Users/zoldy/Herd/devlecta/specs/001-build-web-agency/data-model.md (10 entities, relationships, validation)
- ✅ /Users/zoldy/Herd/devlecta/specs/001-build-web-agency/contracts/portfolio-api.yaml (OpenAPI spec)
- ✅ /Users/zoldy/Herd/devlecta/specs/001-build-web-agency/contracts/product-api.yaml (OpenAPI spec)
- ✅ /Users/zoldy/Herd/devlecta/specs/001-build-web-agency/contracts/contact-api.yaml (OpenAPI spec)
- ✅ /Users/zoldy/Herd/devlecta/specs/001-build-web-agency/quickstart.md (validation scenarios)
- ✅ /Users/zoldy/Herd/devlecta/CLAUDE.md (agent-specific context file)

**Next Command**: `/tasks` to generate tasks.md with ~80-100 concrete, ordered tasks

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*
