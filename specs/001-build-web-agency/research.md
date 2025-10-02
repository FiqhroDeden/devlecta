# Research & Architecture Decisions

**Feature**: Devlecta Web Agency Website
**Date**: 2025-10-02
**Status**: Complete

## Technology Stack Decisions

### 1. Backend Framework: Laravel 11.x

**Decision**: Use Laravel 11 as the backend framework

**Rationale**:
- Native Inertia.js support for seamless SSR with React
- Built-in authentication (Fortify), authorization (Policies), and validation
- Eloquent ORM prevents SQL injection, supports eager loading for N+1 prevention
- Queue system for async email notifications
- Localization support for multi-language (EN/ID)
- Strong ecosystem: Pest for testing, Pint for linting, excellent documentation

**Alternatives Considered**:
- **Next.js API routes**: Rejected - requires Node.js backend, less mature for traditional CMS patterns
- **Symfony**: Rejected - steeper learning curve, less convention-driven for rapid development

**Best Practices**:
- Use Service classes for business logic (PortfolioService, LeadService) to keep controllers thin
- Implement Form Request classes for validation (ContactFormRequest, StorePortfolioRequest)
- Use Resource classes for API transformations (PortfolioResource, ProductResource)
- Policy-based authorization for admin routes
- Database transactions for multi-step operations (portfolio with images)

### 2. Frontend: Inertia.js + React 18 + TypeScript

**Decision**: Use Inertia.js with React 18 and TypeScript

**Rationale**:
- Inertia.js provides SPA experience without API complexity (no need for separate REST API layer)
- Server-side routing with Laravel, client-side rendering with React
- Built-in CSRF protection, session sharing
- TypeScript ensures type safety, reduces runtime errors
- React 18 concurrent features improve performance (Suspense, startTransition)
- SEO-friendly: Inertia renders on server, sends HTML to client

**Alternatives Considered**:
- **Vue.js**: Rejected - team preference for React, larger ecosystem
- **Livewire**: Rejected - limited interactivity for complex admin dashboard
- **Separate REST API + React SPA**: Rejected - adds complexity, auth challenges, CORS issues

**Best Practices**:
- Use Inertia's `useForm` hook for form handling with validation errors
- Implement shared layouts (GuestLayout, AdminLayout)
- Lazy load admin pages with React.lazy() for code splitting
- Use TypeScript interfaces for Inertia page props
- Implement optimistic UI updates for better UX

### 3. UI Framework: Tailwind CSS + Radix UI

**Decision**: Tailwind CSS for styling, Radix UI for accessible components

**Rationale**:
- Tailwind: Utility-first CSS, small bundle size with PurgeCSS, rapid prototyping
- Radix UI: Unstyled, accessible primitives (Modal, Dropdown, Tabs) - WCAG 2.1 AA compliant
- No heavy component library (Material UI, Chakra) = smaller bundle, full design control
- Headless UI pattern: Radix provides accessibility logic, Tailwind provides styling

**Best Practices**:
- Use `@apply` for reusable component classes
- Implement mobile-first responsive design (sm:, md:, lg: breakpoints)
- Follow WCAG 2.1 AA: color contrast ≥4.5:1, focus indicators, semantic HTML
- Use Radix's `asChild` prop for composition
- Implement skeleton screens for loading states (portfolio grid, product cards)

### 4. Database: MySQL 8.0 + Redis

**Decision**: MySQL 8.0 for relational data, Redis for cache/sessions/queues

**Rationale**:
- MySQL: Robust relational database, ACID compliance, good Laravel support
- Redis: In-memory cache for expensive queries (portfolio listings), session storage, job queues
- MySQL 8.0 supports JSON columns for flexible metadata (product features, portfolio results)

**Best Practices**:
- Index frequently queried columns (slug, category_id, status, featured)
- Use Eloquent relationships (belongsToMany for portfolio_technology pivot table)
- Cache portfolio/product listings with cache tags for selective invalidation
- Use database transactions for data consistency
- Implement soft deletes for portfolio/products (preserves data)

### 5. Testing Strategy: Pest + Vitest + Playwright

**Decision**: Pest (PHP), Vitest (TypeScript), Playwright (E2E)

**Rationale**:
- **Pest**: Modern Laravel testing framework, readable syntax, parallel execution
- **Vitest**: Fast Vite-native test runner, React Testing Library integration, TypeScript support
- **Playwright**: Cross-browser E2E testing, reliable selectors, built-in waits

**Best Practices**:
- TDD approach: Write failing tests first (contract → unit → feature → implementation)
- Backend: `tests/Feature/` for HTTP tests, `tests/Unit/` for service logic
- Frontend: Co-located `*.test.tsx` files, React Testing Library for user-centric tests
- Contract tests validate API schema (portfolio response structure, validation errors)
- E2E tests cover critical user flows (contact form submission, admin portfolio CRUD)

### 6. Multi-Language Implementation

**Decision**: Laravel localization with path prefix (/en/, /id/)

**Rationale**:
- Path prefix better for SEO (hreflang tags, language-specific sitemaps)
- Laravel's `trans()` helper supports JSON translation files
- Middleware detects locale from URL, sets app locale, stores in session
- Inertia shares locale with frontend via shared data

**Best Practices**:
- Store translations in `lang/en/` and `lang/id/` directories
- Use JSON translation files for simple key-value pairs
- Implement LanguageToggle component to switch locales
- Add hreflang tags in layout for SEO
- Allow portfolio titles to remain in original language (case-by-case translation)

### 7. SEO & Performance Optimization

**Decision**: Laravel SEO package + Vite optimization + Redis cache

**SEO Best Practices**:
- Install `artesaos/seotools` package for meta tags, Open Graph, Twitter Cards
- Implement Schema.org markup (Organization, Product, BreadcrumbList)
- Generate XML sitemap with language variants
- Implement canonical URLs to prevent duplicate content
- Add robots.txt for search engine crawling

**Performance Best Practices**:
- **Backend**: Query caching (5-minute TTL for portfolio listings), eager loading relationships, queue emails
- **Frontend**: Code splitting (React.lazy for admin pages), image lazy loading, WebP format, bundle <200KB gzip
- **Server**: Enable Gzip compression, set browser cache headers, HTTP/2
- **Database**: Index slug, category_id, status columns; use EXPLAIN to optimize slow queries

### 8. Security Implementation

**Decision**: Laravel security features + reCAPTCHA v3

**Security Best Practices**:
- **CSRF**: Laravel's built-in CSRF tokens on all forms (Inertia handles automatically)
- **XSS Prevention**: Blade/React escapes output by default; use `htmlspecialchars()` for raw HTML
- **SQL Injection**: Use Eloquent ORM exclusively (parameterized queries)
- **Authentication**: Laravel Fortify with bcrypt password hashing
- **Authorization**: Policy classes (PortfolioPolicy, ProductPolicy) for admin routes
- **Rate Limiting**: Throttle contact form (5 submissions/hour per IP) using Laravel's RateLimiter
- **reCAPTCHA v3**: Invisible CAPTCHA on contact form, validate server-side
- **HTTPS**: Force HTTPS in production (middleware redirect)
- **Secrets**: Store API keys in `.env`, never commit to Git

### 9. Media Management

**Decision**: Laravel Storage with public disk

**Rationale**:
- Laravel Storage abstraction supports local, S3, or CDN
- Public disk for web-accessible images (portfolio, products)
- Intervention Image package for resizing/optimization
- Generate multiple sizes (thumbnail, medium, large) on upload

**Best Practices**:
- Validate file types (jpg, png, webp), max 5MB
- Store original + generate optimized WebP versions
- Use unique filenames (UUID or hash) to prevent overwrites
- Implement MediaService for centralized upload logic
- Clean up orphaned files when portfolio/product deleted

### 10. Analytics & Tracking

**Decision**: Google Analytics 4 + custom event tracking

**Implementation**:
- Install GA4 via `<script>` tag in layout
- Track custom events: portfolio_view, product_click, envato_redirect, form_submit, language_toggle
- Use GTM (Google Tag Manager) for flexibility
- Implement server-side event tracking for form submissions (backup for ad blockers)

**Best Practices**:
- Respect user privacy: cookie consent banner (GDPR/CCPA)
- Anonymize IP addresses in GA4 settings
- Track Core Web Vitals (LCP, FID, CLS) via GA4
- Implement conversion goals (contact form submissions, Envato clicks)

## Architecture Patterns

### Service Layer Pattern

**Purpose**: Separate business logic from controllers

**Implementation**:
```php
// app/Services/PortfolioService.php
class PortfolioService {
    public function getFilteredPortfolio(array $filters, int $perPage = 12): LengthAwarePaginator
    {
        return Cache::tags(['portfolio'])->remember(
            "portfolio:" . md5(json_encode($filters)),
            300, // 5 minutes
            fn() => Portfolio::with(['technologies', 'category'])
                ->when($filters['category'] ?? null, fn($q, $v) => $q->where('category_id', $v))
                ->when($filters['technology'] ?? null, fn($q, $v) => $q->whereHas('technologies', fn($q) => $q->where('slug', $v)))
                ->where('status', 'published')
                ->orderBy('featured', 'desc')
                ->orderBy('created_at', 'desc')
                ->paginate($perPage)
        );
    }
}
```

### Repository Pattern (Not Needed)

**Decision**: Do NOT implement Repository pattern

**Rationale**: Eloquent already provides repository-like abstraction. Adding another layer adds complexity without benefits for this project size. Service classes + Eloquent models are sufficient.

### Policy-Based Authorization

**Implementation**:
```php
// app/Policies/PortfolioPolicy.php
class PortfolioPolicy {
    public function update(User $user, Portfolio $portfolio): bool
    {
        return $user->role === 'admin';
    }
}

// Usage in controller
public function update(Portfolio $portfolio) {
    $this->authorize('update', $portfolio); // Throws 403 if fails
}
```

### Form Request Validation

**Implementation**:
```php
// app/Http/Requests/ContactFormRequest.php
class ContactFormRequest extends FormRequest {
    public function rules(): array {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'message' => ['required', 'string', 'min:10'],
            'recaptcha_token' => ['required', 'recaptchav3:contact,0.5'],
        ];
    }
}
```

## Performance Targets & Monitoring

### Target Metrics
- **Backend**: API response time <200ms p95
- **Frontend**: First Contentful Paint <2s, Time to Interactive <3.5s
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1
- **Lighthouse Score**: ≥90 on mobile

### Monitoring Strategy
- Laravel Telescope (local development) for query debugging
- Laravel Horizon (production) for queue monitoring
- GA4 for real user monitoring (RUM)
- Sentry for error tracking

## Dependencies Summary

### Backend (composer.json)
```json
{
    "require": {
        "laravel/framework": "^11.0",
        "laravel/fortify": "^1.21",
        "inertiajs/inertia-laravel": "^1.0",
        "intervention/image": "^3.0",
        "artesaos/seotools": "^1.2",
        "google/recaptcha": "^1.3"
    },
    "require-dev": {
        "pestphp/pest": "^2.0",
        "pestphp/pest-plugin-laravel": "^2.0",
        "laravel/pint": "^1.0"
    }
}
```

### Frontend (package.json)
```json
{
    "dependencies": {
        "@inertiajs/react": "^1.0",
        "react": "^18.2",
        "react-dom": "^18.2",
        "@radix-ui/react-dialog": "^1.0",
        "@radix-ui/react-dropdown-menu": "^2.0",
        "tailwindcss": "^3.4"
    },
    "devDependencies": {
        "vite": "^5.0",
        "@vitejs/plugin-react": "^4.2",
        "typescript": "^5.3",
        "@types/react": "^18.2",
        "vitest": "^1.0",
        "@testing-library/react": "^14.0",
        "playwright": "^1.40"
    }
}
```

## Database Schema Considerations

### Indexing Strategy
```sql
-- portfolios table
INDEX idx_portfolio_slug (slug)
INDEX idx_portfolio_category (category_id)
INDEX idx_portfolio_status_featured (status, featured, created_at)

-- products table
INDEX idx_product_slug (slug)
INDEX idx_product_category (category_id)
INDEX idx_product_status (status)

-- leads table
INDEX idx_lead_status (status)
INDEX idx_lead_created (created_at)
```

### Data Types
- Use `ENUM` for status fields (draft, published, archived)
- Use `TEXT` for long content (description, message)
- Use `JSON` for flexible fields (features, results, metadata)
- Use `TIMESTAMP` with timezone awareness

## Deployment Considerations

### Environment Requirements
- PHP 8.2+, Composer 2.x
- Node.js 20.x, npm 10.x
- MySQL 8.0+, Redis 7.x
- Nginx or Apache with mod_rewrite
- SSL certificate (Let's Encrypt)

### Build Process
```bash
# Backend
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Frontend
npm ci
npm run build  # Vite production build
```

### Caching Strategy
- **Config cache**: `php artisan config:cache`
- **Route cache**: `php artisan route:cache`
- **Query cache**: Redis with 5-minute TTL for portfolio/product listings
- **View cache**: `php artisan view:cache`
- **Browser cache**: Set cache headers for static assets (1 year)

## Accessibility Compliance (WCAG 2.1 AA)

### Implementation Checklist
- [ ] Semantic HTML5 elements (nav, main, article, section)
- [ ] ARIA labels for icon buttons, form fields
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Focus indicators (visible outline on :focus)
- [ ] Color contrast ≥4.5:1 for text (use contrast checker)
- [ ] Alt text for all images (portfolio screenshots, product thumbnails)
- [ ] Form labels associated with inputs (htmlFor)
- [ ] Skip to main content link
- [ ] Responsive text (resizable to 200% without layout breaks)
- [ ] Screen reader testing with NVDA/JAWS

## Conclusion

All technical decisions are finalized with no NEEDS CLARIFICATION remaining. Architecture follows Laravel + Inertia.js + React best practices, prioritizes performance (<2s page load, <200ms API), security (CSRF, XSS prevention, authorization), and accessibility (WCAG 2.1 AA). Ready for Phase 1 design (data-model.md, contracts, quickstart.md).
