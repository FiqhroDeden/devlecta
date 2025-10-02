# Quickstart Validation Guide

**Feature**: Devlecta Web Agency Website
**Purpose**: Validate implementation against user scenarios from spec.md
**Date**: 2025-10-02

## Prerequisites

- Application deployed and accessible
- Database seeded with sample portfolio, products, categories, technologies
- Admin user created (email: admin@devlecta.com, password: set via seeder)
- SSL certificate installed (HTTPS enabled)
- Google Analytics configured
- reCAPTCHA v3 keys added to `.env`

---

## Scenario 1: Digital Product Buyer Journey

**User Story**: As a freelance designer looking for website templates, I want to discover and purchase Devlecta's Envato products.

### 1.1 Homepage Discovery
```bash
# Test: Visit homepage
URL: https://devlecta.com/en
Expected:
- [ ] Hero section displays with clear value proposition
- [ ] Services overview section visible
- [ ] Featured portfolio section shows 6-8 items
- [ ] Digital products highlighted with "Available on Envato" badges
- [ ] Clear CTAs ("View Portfolio", "Browse Products", "Contact Us")
- [ ] Trust indicators (client logos, testimonials) visible
- [ ] Page loads in <2 seconds (check Network tab in DevTools)
- [ ] Lighthouse score ≥90 (mobile)
```

### 1.2 Portfolio Filtering
```bash
# Test: Filter portfolio by "Digital Products"
URL: https://devlecta.com/en/portfolio
Actions:
1. Click "Digital Products" filter button
2. Observe filtered results

Expected:
- [ ] Only Envato marketplace products displayed
- [ ] Each product shows "Available on Envato" badge
- [ ] Grid layout with responsive cards
- [ ] Filter state persists in URL (?type=envato_product)
- [ ] "Buy on Envato" CTA visible on each card
- [ ] Skeleton screens display while loading
- [ ] No layout shift (CLS <0.1)
```

### 1.3 Product Detail View
```bash
# Test: View product detail page
URL: https://devlecta.com/en/portfolio/{slug}
Expected:
- [ ] Product title, description, challenge/solution visible
- [ ] Technology stack displayed with badges
- [ ] Image gallery with lightbox functionality
- [ ] "Buy on Envato" button prominently displayed
- [ ] Button links to correct Envato marketplace listing
- [ ] Related products section at bottom
- [ ] Breadcrumb navigation (Home > Portfolio > Product Name)
- [ ] Meta tags present (Open Graph, Twitter Cards)
- [ ] Schema.org Product markup in HTML
```

### 1.4 Envato Redirect
```bash
# Test: Click "Buy on Envato" button
Actions:
1. Click "Buy on Envato" button on product detail page
2. Verify GA4 event tracked

Expected:
- [ ] New tab opens with Envato product URL
- [ ] Original tab remains on product page
- [ ] GA4 event "envato_redirect" tracked with product_id
- [ ] Event visible in GA4 DebugView (if in debug mode)
```

### 1.5 Customization Request
```bash
# Test: Request customization for a product
URL: https://devlecta.com/en/portfolio/{slug}
Actions:
1. Click "Request Customization" button
2. Observe contact form

Expected:
- [ ] Redirected to /en/contact
- [ ] Service interest pre-filled with "Template Customization"
- [ ] Product name pre-filled in message field
- [ ] Form fields: name, email, phone, company, message, budget_range
- [ ] Language toggle (EN/ID) visible in header
- [ ] reCAPTCHA badge visible in bottom-right
```

---

## Scenario 2: Custom Development Lead Generation

### 2.1 Services Page Navigation
```bash
# Test: Navigate to Services page
URL: https://devlecta.com/en/services
Expected:
- [ ] Service packages displayed (Discovery, Design, Development, Testing, Deployment)
- [ ] Each package shows description, deliverables, timeline
- [ ] Development process explained with visual timeline/steps
- [ ] Technology stack showcased (Laravel, React, Inertia.js)
- [ ] CTA: "Start Your Project" button links to /contact
- [ ] Testimonials from custom development clients
- [ ] Case studies linked to portfolio
```

### 2.2 Custom Project Case Studies
```bash
# Test: View custom project in portfolio
URL: https://devlecta.com/en/portfolio?type=custom_project
Expected:
- [ ] Only custom projects displayed (no Envato products)
- [ ] Each project shows client name (if not NDA)
- [ ] Industry badges visible (e.g., "E-commerce", "Healthcare")
- [ ] Click project to view detail page

# On detail page:
- [ ] Challenge section describes client problem
- [ ] Solution section explains approach taken
- [ ] Results section shows outcomes (metrics, KPIs)
- [ ] Technologies used displayed with badges
- [ ] Project duration displayed
- [ ] Visual gallery of screenshots
- [ ] CTA: "Start Similar Project" links to contact form
```

### 2.3 Contact Form Submission
```bash
# Test: Submit contact form
URL: https://devlecta.com/en/contact
Actions:
1. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Phone: +1-555-123-4567
   - Company: Test Corp
   - Service Interest: Custom Web Development
   - Budget Range: $10k-$25k
   - Message: "I need a custom e-commerce platform with multi-vendor support."
   - Preferred Language: English
2. Submit form
3. Check email inbox (admin@devlecta.com)
4. Check user email (test@example.com)

Expected:
- [ ] Form validates client-side (inline errors if fields missing)
- [ ] reCAPTCHA score validated server-side
- [ ] Success message displayed: "Thank you for your inquiry..."
- [ ] User redirected to thank-you page or modal shown
- [ ] Admin receives email notification with lead details
- [ ] User receives confirmation email
- [ ] Lead appears in admin dashboard with status "New"
- [ ] GA4 event "form_submit" tracked
- [ ] Form submission queued (check queue worker logs)
```

### 2.4 Multi-Language Toggle
```bash
# Test: Switch language to Indonesian
URL: https://devlecta.com/en
Actions:
1. Click language toggle in header (EN → ID)
2. Navigate to different pages (Home, Services, Portfolio, Contact)

Expected:
- [ ] URL changes to /id/ prefix
- [ ] All UI elements translated to Indonesian
- [ ] Navigation menu translated
- [ ] Service descriptions translated
- [ ] Form labels and validation messages translated
- [ ] Email templates sent in Indonesian
- [ ] Language preference persists via cookie (laravel_locale)
- [ ] hreflang tags present in HTML (<link rel="alternate" hreflang="en" href="/en"/>)
- [ ] Portfolio titles remain in original language (as designed)
- [ ] Technical terms remain in English (e.g., "Laravel", "React")
```

---

## Scenario 3: Admin Content Management

### 3.1 Admin Login
```bash
# Test: Admin authentication
URL: https://devlecta.com/admin/login
Actions:
1. Enter email: admin@devlecta.com
2. Enter password: [admin_password]
3. Submit login form

Expected:
- [ ] CSRF token present in form
- [ ] HTTPS enforced (redirect from HTTP if attempted)
- [ ] Invalid credentials show error: "These credentials do not match our records."
- [ ] Valid credentials redirect to /admin/dashboard
- [ ] Session created with laravel_session cookie (HttpOnly, Secure)
- [ ] Last login timestamp updated in database
```

### 3.2 Portfolio Management
```bash
# Test: CRUD operations on portfolio
URL: https://devlecta.com/admin/portfolio

# List View:
Expected:
- [ ] Table shows all portfolios (drafts, published, archived)
- [ ] Columns: Title, Category, Type, Status, Featured, Created At, Actions
- [ ] Filter by status dropdown
- [ ] Search by title input
- [ ] Pagination (25 per page)
- [ ] "Create Portfolio" button visible
- [ ] Actions: Edit, Delete icons

# Create Portfolio:
Actions:
1. Click "Create Portfolio"
2. Fill form:
   - Title: Test Portfolio Project
   - Description: [min 50 chars]
   - Type: Custom Project
   - Category: Web Development
   - Industry: E-commerce
   - Challenge: Client needed scalable solution...
   - Solution: We built a Laravel + React app...
   - Results: {"revenue": "50% increase"}
   - Duration: 3 months
   - Client Name: Test Client
   - Technologies: [Select: Laravel, React, MySQL]
   - Featured: Yes
   - Status: Published
   - Images: Upload 3 images (JPG, PNG, WebP, <5MB each)
3. Submit form

Expected:
- [ ] Client-side validation (inline errors)
- [ ] Server-side validation (422 response if invalid)
- [ ] Images uploaded to storage/app/public/portfolio/{id}/
- [ ] Multiple image sizes generated (thumbnail, medium, large)
- [ ] WebP versions created
- [ ] Slug auto-generated from title (test-portfolio-project)
- [ ] Redirect to /admin/portfolio with success message
- [ ] Portfolio appears in public listing at /en/portfolio
- [ ] Cache invalidated (portfolio listings refresh)

# Edit Portfolio:
Actions:
1. Click "Edit" on a portfolio
2. Modify title: "Updated Portfolio Project"
3. Add new image
4. Submit

Expected:
- [ ] Form pre-filled with existing data
- [ ] Slug remains unchanged (or updated if slug field edited)
- [ ] New image added to media collection
- [ ] Old images remain (unless deleted)
- [ ] Updated_at timestamp refreshed
- [ ] Cache invalidated

# Delete Portfolio:
Actions:
1. Click "Delete" on a portfolio
2. Confirm deletion in modal

Expected:
- [ ] Confirmation modal appears
- [ ] On confirm: Portfolio soft-deleted (deleted_at set)
- [ ] Portfolio removed from public listings
- [ ] Still visible in admin with "Archived" badge
- [ ] Media files remain on disk (orphan cleanup job runs later)
```

### 3.3 Lead Management
```bash
# Test: Lead dashboard
URL: https://devlecta.com/admin/leads

Expected:
- [ ] Table shows all lead submissions
- [ ] Columns: Name, Email, Service Interest, Status, Created At, Actions
- [ ] Filter by status (New, Contacted, Qualified, Converted, Closed)
- [ ] Filter by date range (Date From, Date To)
- [ ] Export to CSV button
- [ ] Status badges color-coded (New: blue, Contacted: yellow, Converted: green)
- [ ] Click lead to view detail modal

# Lead Detail Modal:
Expected:
- [ ] All submission fields displayed
- [ ] Status dropdown (change to "Contacted")
- [ ] Admin notes textarea
- [ ] Save button

Actions:
1. Change status to "Contacted"
2. Add note: "Sent initial proposal on 2025-10-03"
3. Save

Expected:
- [ ] Status updated in database
- [ ] Notes saved
- [ ] Updated_at timestamp refreshed
- [ ] Modal closes, table refreshed

# Export Leads:
Actions:
1. Filter by status: "Qualified"
2. Click "Export to CSV"

Expected:
- [ ] CSV file downloads (leads_qualified_2025-10-02.csv)
- [ ] CSV contains: Name, Email, Phone, Company, Service Interest, Budget, Message, Status, Created At
- [ ] Respects current filters (only qualified leads)
```

### 3.4 Content Management
```bash
# Test: Edit service page content
URL: https://devlecta.com/admin/settings/content

Expected:
- [ ] Editable fields for service descriptions (EN/ID)
- [ ] WYSIWYG editor (TinyMCE or Trix)
- [ ] Save button
- [ ] Changes reflect immediately on public /services page
- [ ] Stored in site_settings table (key: service_description_en, service_description_id)
```

---

## Scenario 4: Multi-Language Experience

### 4.1 Browser Language Auto-Detection
```bash
# Test: Auto-detect browser language
Actions:
1. Set browser language to Indonesian (id-ID)
2. Visit https://devlecta.com (no language prefix)

Expected:
- [ ] Middleware detects Accept-Language header
- [ ] Redirects to /id/ with 302 status
- [ ] Cookie set: laravel_locale=id
```

### 4.2 Language Persistence
```bash
# Test: Language preference persists
Actions:
1. Switch to Indonesian (/id/)
2. Navigate to /id/portfolio
3. Click on a portfolio item
4. Close browser
5. Reopen browser and visit https://devlecta.com

Expected:
- [ ] Cookie laravel_locale=id persists (30 days)
- [ ] Homepage loads in Indonesian automatically
- [ ] No redirect flicker (language detected from cookie)
```

### 4.3 Technical Terms Handling
```bash
# Test: View portfolio in Indonesian
URL: https://devlecta.com/id/portfolio/{slug}
Expected:
- [ ] UI labels translated (e.g., "Teknologi yang Digunakan")
- [ ] Technology names remain in English (Laravel, React, MySQL)
- [ ] Portfolio title remains in original language (if English)
- [ ] Description translated (if translation provided)
- [ ] Contextual terms translated (e.g., "Tantangan" for Challenge)
```

---

## Edge Cases

### Edge Case 1: Form Validation
```bash
# Test: Submit contact form with missing required fields
Actions:
1. Leave "Name" field empty
2. Enter invalid email: "notanemail"
3. Enter message: "Hi" (< 10 chars)
4. Submit form

Expected:
- [ ] Inline validation errors displayed:
  - Name: "The name field is required."
  - Email: "The email must be a valid email address."
  - Message: "The message must be at least 10 characters."
- [ ] Form not submitted
- [ ] No network request sent
- [ ] Focus moved to first invalid field
```

### Edge Case 2: Slow Image Loading
```bash
# Test: Portfolio gallery with slow network
Actions:
1. Open DevTools > Network tab
2. Throttle to "Slow 3G"
3. Visit /en/portfolio

Expected:
- [ ] Skeleton screens display for portfolio cards
- [ ] Images lazy-load (IntersectionObserver)
- [ ] Placeholder shown until image loads
- [ ] No layout shift (CLS <0.1)
- [ ] Page usable before images fully loaded
```

### Edge Case 3: Invalid Envato Product Link
```bash
# Test: Product with broken Envato URL
Actions:
1. Admin: Create product with invalid envato_url: https://themeforest.net/invalid-product-404
2. Public: View product detail page
3. Click "Buy on Envato"

Expected:
- [ ] Admin receives notification (email or dashboard alert)
- [ ] Public: Graceful fallback message: "Product currently unavailable. Contact us for assistance."
- [ ] GA4 event tracked: "envato_link_error"
- [ ] No 500 error on public page
```

### Edge Case 4: Large Portfolio Dataset
```bash
# Test: Performance with 100+ portfolio items
Setup:
1. Seed database with 150 portfolio items
2. Visit /en/portfolio

Expected:
- [ ] Pagination displays (12 per page)
- [ ] Page load time <2 seconds
- [ ] Database query uses indexes (check EXPLAIN)
- [ ] N+1 queries prevented (eager loading technologies, category)
- [ ] Cache hit (subsequent loads <500ms)
```

### Edge Case 5: Unauthorized Admin Access
```bash
# Test: Access admin routes without authentication
Actions:
1. Clear cookies (logout)
2. Visit https://devlecta.com/admin/portfolio

Expected:
- [ ] Redirected to /admin/login with 302 status
- [ ] Intended URL stored in session (redirect after login)
- [ ] Error message: "Please log in to continue."
```

### Edge Case 6: Form Submission Network Error
```bash
# Test: Contact form with network failure
Actions:
1. Open DevTools > Network tab
2. Set to "Offline"
3. Fill and submit contact form

Expected:
- [ ] Error message: "Network error. Please check your connection and try again."
- [ ] Form data preserved in client state (not lost)
- [ ] Retry button displayed
- [ ] No silent failure
```

### Edge Case 7: Concurrent Editing (Admin)
```bash
# Test: Two admins edit same portfolio
Actions:
1. Admin A: Edit portfolio ID 5
2. Admin B: Edit portfolio ID 5
3. Admin A: Save changes (title: "Version A")
4. Admin B: Save changes (title: "Version B")

Expected:
- [ ] Last save wins (Version B overwrites Version A)
- [ ] No conflict resolution (MVP limitation, documented)
- [ ] No data corruption
- [ ] Updated_at reflects most recent save
```

---

## Performance Validation

### Lighthouse Audit
```bash
# Test: Run Lighthouse on homepage
Actions:
1. Open Chrome DevTools
2. Navigate to Lighthouse tab
3. Run audit (Mobile, Performance + Accessibility + SEO)

Expected Scores:
- [ ] Performance: ≥90
- [ ] Accessibility: ≥90 (WCAG 2.1 AA)
- [ ] Best Practices: ≥90
- [ ] SEO: ≥90

# Check Core Web Vitals:
- [ ] LCP (Largest Contentful Paint): <2.5s
- [ ] FID (First Input Delay): <100ms
- [ ] CLS (Cumulative Layout Shift): <0.1
```

### API Performance
```bash
# Test: API response times
Actions:
1. Use browser DevTools > Network tab
2. Load /en/portfolio
3. Check API request timing

Expected:
- [ ] GET /portfolio: <200ms (p95)
- [ ] GET /portfolio/{slug}: <150ms (p95)
- [ ] POST /contact: <300ms (includes email queue)
```

### Database Query Performance
```bash
# Test: Check for N+1 queries
Actions:
1. Enable Laravel Telescope (local)
2. Visit /en/portfolio
3. Check Telescope > Queries tab

Expected:
- [ ] Portfolio query uses eager loading: `with(['category', 'technologies', 'media'])`
- [ ] Total queries: ≤5 (1 portfolio + 1 categories + 1 technologies + cache check)
- [ ] No duplicate queries
- [ ] Query time: <100ms total
```

---

## Accessibility Validation

### Keyboard Navigation
```bash
# Test: Navigate site with keyboard only
Actions:
1. Use Tab key to navigate homepage
2. Use Enter to click links
3. Use Escape to close modals

Expected:
- [ ] All interactive elements reachable via Tab
- [ ] Focus indicator visible (outline or highlight)
- [ ] Logical tab order (header → hero → portfolio → footer)
- [ ] Skip to main content link present
- [ ] Modals trap focus (Tab cycles within modal)
- [ ] Escape key closes modals
```

### Screen Reader Testing
```bash
# Test: Use NVDA/JAWS screen reader
Actions:
1. Enable NVDA (Windows) or VoiceOver (Mac)
2. Navigate homepage

Expected:
- [ ] Page title announced
- [ ] Landmark regions announced (navigation, main, footer)
- [ ] Headings hierarchy correct (h1 → h2 → h3)
- [ ] Images have alt text (portfolio screenshots)
- [ ] Form labels associated with inputs
- [ ] ARIA labels on icon buttons
- [ ] Link text descriptive (not "click here")
```

### Color Contrast
```bash
# Test: Check color contrast ratios
Actions:
1. Use browser extension (WAVE, axe DevTools)
2. Scan homepage

Expected:
- [ ] All text has ≥4.5:1 contrast ratio
- [ ] Large text (≥18pt) has ≥3:1 contrast
- [ ] Focus indicators have ≥3:1 contrast
- [ ] No contrast errors in WAVE report
```

---

## Security Validation

### CSRF Protection
```bash
# Test: Submit form without CSRF token
Actions:
1. Open DevTools > Console
2. Remove CSRF token from contact form
3. Submit form

Expected:
- [ ] 419 error: "CSRF token mismatch"
- [ ] Form not processed
```

### XSS Prevention
```bash
# Test: Submit malicious script in contact form
Actions:
1. Enter message: "<script>alert('XSS')</script>"
2. Submit form
3. View lead in admin dashboard

Expected:
- [ ] Script not executed
- [ ] Message displayed as plain text (escaped)
- [ ] HTML entities visible: &lt;script&gt;alert('XSS')&lt;/script&gt;
```

### SQL Injection Prevention
```bash
# Test: SQL injection in portfolio filter
Actions:
1. Visit /en/portfolio?category=1' OR '1'='1
2. Observe results

Expected:
- [ ] Eloquent ORM uses parameterized queries
- [ ] No SQL error displayed
- [ ] Invalid category slug returns empty results
- [ ] No data breach
```

### Rate Limiting
```bash
# Test: Exceed contact form rate limit
Actions:
1. Submit contact form 6 times within 1 hour

Expected:
- [ ] First 5 submissions succeed
- [ ] 6th submission returns 429 error
- [ ] Message: "Too many contact submissions. Please try again later."
- [ ] Rate limit resets after 1 hour
```

---

## Analytics Validation

### Google Analytics 4
```bash
# Test: Verify GA4 tracking
Actions:
1. Visit https://devlecta.com/en
2. Open GA4 DebugView (Real-time)

Expected Events:
- [ ] page_view (homepage)
- [ ] portfolio_view (when viewing portfolio detail)
- [ ] product_click (when clicking product card)
- [ ] envato_redirect (when clicking "Buy on Envato")
- [ ] form_submit (when submitting contact form)
- [ ] language_toggle (when switching EN ↔ ID)
```

---

## Conclusion

This quickstart guide validates all user scenarios from spec.md. Each test ensures functional requirements are met, performance targets achieved, and edge cases handled gracefully.

**Final Checklist**:
- [ ] All user scenarios pass
- [ ] Performance targets met (<2s page load, <200ms API)
- [ ] Accessibility WCAG 2.1 AA compliant
- [ ] Security vulnerabilities mitigated
- [ ] Analytics tracking functional
- [ ] Multi-language support working
- [ ] Admin dashboard fully functional

**Status**: Ready for implementation and validation.
