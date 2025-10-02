# Data Model Specification

**Feature**: Devlecta Web Agency Website
**Date**: 2025-10-02
**Source**: Feature specification entities (spec.md lines 122-138)

## Entity Relationship Diagram

```
┌─────────────────┐         ┌──────────────────┐
│   User          │         │   Portfolio      │
│─────────────────│         │──────────────────│
│ id              │         │ id               │
│ name            │         │ title            │
│ email           │         │ slug             │
│ password        │         │ description      │
│ role            │         │ category_id      │──┐
│ last_login_at   │         │ type             │  │
│ created_at      │         │ industry         │  │
│ updated_at      │         │ challenge        │  │
└─────────────────┘         │ solution         │  │
                            │ results (JSON)   │  │
┌─────────────────┐         │ duration         │  │
│   Lead          │         │ client_name      │  │
│─────────────────│         │ featured         │  │
│ id              │         │ status           │  │
│ name            │         │ created_at       │  │
│ email           │         │ updated_at       │  │
│ phone           │         │ deleted_at       │  │
│ company         │         └──────────────────┘  │
│ service_interest│                │              │
│ budget_range    │                │              │
│ message         │                │ many-to-many │
│ preferred_lang  │                │              │
│ status          │                │              │
│ admin_notes     │         ┌──────▼──────────┐  │
│ ip_address      │         │  Technology     │  │
│ created_at      │         │─────────────────│  │
│ updated_at      │         │ id              │  │
└─────────────────┘         │ name            │  │
                            │ slug            │  │
┌─────────────────┐         │ category        │  │
│  Testimonial    │         │ usage_count     │  │
│─────────────────│         │ display_order   │  │
│ id              │         └─────────────────┘  │
│ client_name     │                              │
│ company         │         ┌──────────────────┐ │
│ role            │         │   Product        │ │
│ text            │         │──────────────────│ │
│ language        │         │ id               │ │
│ rating          │         │ name             │ │
│ avatar_path     │         │ slug             │ │
│ featured        │         │ description      │ │
│ created_at      │         │ category_id      │─┤
│ updated_at      │         │ price            │ │
└─────────────────┘         │ envato_url       │ │
                            │ rating           │ │
┌─────────────────┐         │ reviews_count    │ │
│  Category       │◄────────│ demo_link        │ │
│─────────────────│         │ docs_link        │ │
│ id              │         │ features (JSON)  │ │
│ name            │         │ changelog (JSON) │ │
│ slug            │         │ status           │ │
│ type            │         │ created_at       │ │
│ description     │         │ updated_at       │ │
│ parent_id       │         │ deleted_at       │ │
│ created_at      │         └──────────────────┘ │
│ updated_at      │                              │
└─────────────────┘         ┌──────────────────┐ │
                            │  ProductMedia    │ │
┌─────────────────┐         │──────────────────│ │
│  SiteSetting    │         │ id               │ │
│─────────────────│         │ product_id       │─┘
│ id              │         │ type             │
│ key             │         │ path             │
│ value (TEXT)    │         │ display_order    │
│ type            │         │ created_at       │
│ description     │         └──────────────────┘
│ language        │
│ created_at      │         ┌──────────────────┐
│ updated_at      │         │ PortfolioMedia   │
└─────────────────┘         │──────────────────│
                            │ id               │
                            │ portfolio_id     │─┘
                            │ type             │
                            │ path             │
                            │ display_order    │
                            │ created_at       │
                            └──────────────────┘
```

## Entity Definitions

### 1. Portfolio

**Purpose**: Represents showcase projects (custom development or Envato products)

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| title | VARCHAR(255) | NOT NULL | Project title (can remain in original language) |
| slug | VARCHAR(255) | UNIQUE, NOT NULL, INDEX | URL-friendly identifier |
| description | TEXT | NOT NULL | Project overview |
| category_id | BIGINT UNSIGNED | FK → categories.id, INDEX | Portfolio category |
| type | ENUM('custom_project', 'envato_product') | NOT NULL | Project type |
| industry | VARCHAR(100) | NULLABLE | Client industry (e.g., "E-commerce", "Healthcare") |
| challenge | TEXT | NULLABLE | Problem statement |
| solution | TEXT | NULLABLE | Approach taken |
| results | JSON | NULLABLE | Outcomes (e.g., `{"metric": "50% faster load time"}`) |
| duration | VARCHAR(50) | NULLABLE | Project timeline (e.g., "3 months") |
| client_name | VARCHAR(255) | NULLABLE | Client name (optional for NDA) |
| featured | BOOLEAN | DEFAULT FALSE, INDEX | Display on homepage |
| status | ENUM('draft', 'published', 'archived') | NOT NULL, DEFAULT 'draft', INDEX | Publication status |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last modification timestamp |
| deleted_at | TIMESTAMP | NULLABLE | Soft delete timestamp |

**Relationships**:
- `belongsTo` Category
- `belongsToMany` Technology (via `portfolio_technology` pivot)
- `hasMany` PortfolioMedia

**Validation Rules** (from FR-015):
- title: required, string, max:255
- slug: required, unique, regex:/^[a-z0-9-]+$/
- description: required, string, min:50
- type: required, in:custom_project,envato_product
- category_id: required, exists:categories,id
- status: required, in:draft,published,archived

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE INDEX (slug)
- INDEX (category_id, status, featured, created_at) -- composite for filtering

---

### 2. Product

**Purpose**: Represents digital products from Envato marketplace

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| name | VARCHAR(255) | NOT NULL | Product name |
| slug | VARCHAR(255) | UNIQUE, NOT NULL, INDEX | URL-friendly identifier |
| description | TEXT | NOT NULL | Product description |
| category_id | BIGINT UNSIGNED | FK → categories.id, INDEX | Product category |
| price | DECIMAL(10,2) | NULLABLE | Price in USD (informational) |
| envato_url | VARCHAR(500) | NOT NULL | Link to Envato marketplace listing |
| rating | DECIMAL(3,2) | NULLABLE, CHECK (rating >= 0 AND rating <= 5) | Average rating (0-5) |
| reviews_count | INT UNSIGNED | DEFAULT 0 | Number of reviews |
| demo_link | VARCHAR(500) | NULLABLE | Live demo URL |
| docs_link | VARCHAR(500) | NULLABLE | Documentation URL |
| features | JSON | NULLABLE | Feature list (e.g., `["Responsive", "SEO-optimized"]`) |
| changelog | JSON | NULLABLE | Version history (e.g., `[{"version": "1.2", "changes": "..."}]`) |
| status | ENUM('draft', 'published', 'archived') | NOT NULL, DEFAULT 'draft', INDEX | Publication status |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last modification timestamp |
| deleted_at | TIMESTAMP | NULLABLE | Soft delete timestamp |

**Relationships**:
- `belongsTo` Category
- `hasMany` ProductMedia

**Validation Rules** (from FR-016):
- name: required, string, max:255
- slug: required, unique, regex:/^[a-z0-9-]+$/
- description: required, string, min:50
- envato_url: required, url, regex:/envato\.market|themeforest\.net|codecanyon\.net/
- category_id: required, exists:categories,id
- price: nullable, numeric, min:0
- rating: nullable, numeric, between:0,5

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE INDEX (slug)
- INDEX (category_id, status, created_at)

---

### 3. Lead (Contact Submission)

**Purpose**: Stores contact form submissions for lead management

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| name | VARCHAR(255) | NOT NULL | Submitter name |
| email | VARCHAR(255) | NOT NULL, INDEX | Contact email |
| phone | VARCHAR(50) | NULLABLE | Phone number |
| company | VARCHAR(255) | NULLABLE | Company name |
| service_interest | VARCHAR(100) | NOT NULL | Service type (e.g., "Custom Development", "Template Customization") |
| budget_range | VARCHAR(50) | NULLABLE | Budget range (e.g., "$5k-$10k") |
| message | TEXT | NOT NULL | Inquiry message |
| preferred_lang | ENUM('en', 'id') | NOT NULL, DEFAULT 'en' | Preferred language |
| status | ENUM('new', 'contacted', 'qualified', 'converted', 'closed') | NOT NULL, DEFAULT 'new', INDEX | Lead status |
| admin_notes | TEXT | NULLABLE | Internal notes from admin |
| ip_address | VARCHAR(45) | NULLABLE | Submitter IP (IPv4/IPv6) |
| created_at | TIMESTAMP | NOT NULL, INDEX | Submission timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last modification timestamp |

**Relationships**:
- None (standalone entity)

**Validation Rules** (from FR-008):
- name: required, string, max:255
- email: required, email, max:255
- phone: nullable, string, regex:/^[+]?[0-9\s\-\(\)]+$/
- service_interest: required, string, max:100
- message: required, string, min:10, max:5000
- preferred_lang: required, in:en,id
- recaptcha_token: required, recaptchav3:contact,0.5

**Indexes**:
- PRIMARY KEY (id)
- INDEX (status, created_at) -- for admin dashboard filtering

---

### 4. Technology

**Purpose**: Represents technical skills/tools (tags for portfolio projects)

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| name | VARCHAR(100) | NOT NULL, UNIQUE | Technology name (e.g., "React", "Laravel") |
| slug | VARCHAR(100) | UNIQUE, NOT NULL, INDEX | URL-friendly identifier |
| category | ENUM('language', 'framework', 'tool', 'platform') | NOT NULL | Technology category |
| usage_count | INT UNSIGNED | DEFAULT 0 | Number of portfolios using this tech |
| display_order | INT | DEFAULT 0 | Sorting order for display |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last modification timestamp |

**Relationships**:
- `belongsToMany` Portfolio (via `portfolio_technology` pivot)

**Validation Rules**:
- name: required, string, max:100, unique
- slug: required, unique, regex:/^[a-z0-9-]+$/
- category: required, in:language,framework,tool,platform

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE INDEX (name)
- UNIQUE INDEX (slug)

---

### 5. Category

**Purpose**: Categorizes portfolio projects and products

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| name | VARCHAR(100) | NOT NULL | Category name (e.g., "Web Development", "Mobile Apps") |
| slug | VARCHAR(100) | UNIQUE, NOT NULL, INDEX | URL-friendly identifier |
| type | ENUM('portfolio', 'product') | NOT NULL | Category type |
| description | TEXT | NULLABLE | Category description |
| parent_id | BIGINT UNSIGNED | FK → categories.id, NULLABLE | Parent category for hierarchical categorization |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last modification timestamp |

**Relationships**:
- `hasMany` Portfolio (where type = 'portfolio')
- `hasMany` Product (where type = 'product')
- `belongsTo` Category (parent_id, self-referential)
- `hasMany` Category (children, self-referential)

**Validation Rules**:
- name: required, string, max:100
- slug: required, unique, regex:/^[a-z0-9-]+$/
- type: required, in:portfolio,product
- parent_id: nullable, exists:categories,id

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE INDEX (slug)
- INDEX (type, parent_id)

---

### 6. Testimonial

**Purpose**: Stores client feedback/reviews

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| client_name | VARCHAR(255) | NOT NULL | Client name |
| company | VARCHAR(255) | NULLABLE | Client company |
| role | VARCHAR(100) | NULLABLE | Client role (e.g., "CEO", "Product Manager") |
| text | TEXT | NOT NULL | Testimonial content |
| language | ENUM('en', 'id') | NOT NULL, DEFAULT 'en' | Testimonial language |
| rating | TINYINT UNSIGNED | NULLABLE, CHECK (rating >= 1 AND rating <= 5) | Star rating (1-5) |
| avatar_path | VARCHAR(500) | NULLABLE | Client avatar/logo path |
| featured | BOOLEAN | DEFAULT FALSE, INDEX | Display on homepage |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last modification timestamp |

**Relationships**:
- None (standalone entity)

**Validation Rules**:
- client_name: required, string, max:255
- text: required, string, min:20, max:1000
- language: required, in:en,id
- rating: nullable, integer, between:1,5

**Indexes**:
- PRIMARY KEY (id)
- INDEX (featured, created_at)

---

### 7. User (Admin)

**Purpose**: Represents authenticated admin users

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| name | VARCHAR(255) | NOT NULL | Admin name |
| email | VARCHAR(255) | UNIQUE, NOT NULL, INDEX | Login email |
| password | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| role | ENUM('admin') | NOT NULL, DEFAULT 'admin' | User role (only admin for MVP) |
| last_login_at | TIMESTAMP | NULLABLE | Last login timestamp |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last modification timestamp |

**Relationships**:
- None (standalone entity)

**Validation Rules** (Laravel Fortify):
- email: required, email, unique:users,email
- password: required, min:8, confirmed

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE INDEX (email)

---

### 8. SiteSetting

**Purpose**: Key-value store for site configuration

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| key | VARCHAR(100) | NOT NULL | Setting key (e.g., "site_name", "contact_email") |
| value | TEXT | NULLABLE | Setting value |
| type | ENUM('string', 'boolean', 'integer', 'json') | NOT NULL, DEFAULT 'string' | Data type |
| description | VARCHAR(500) | NULLABLE | Setting description |
| language | ENUM('en', 'id') | NULLABLE | Language-specific setting |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last modification timestamp |

**Relationships**:
- None (standalone entity)

**Validation Rules**:
- key: required, string, max:100
- type: required, in:string,boolean,integer,json

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE INDEX (key, language) -- composite unique for language-specific settings

---

### 9. PortfolioMedia

**Purpose**: Stores portfolio images/screenshots

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| portfolio_id | BIGINT UNSIGNED | FK → portfolios.id, INDEX | Parent portfolio |
| type | ENUM('image', 'video') | NOT NULL, DEFAULT 'image' | Media type |
| path | VARCHAR(500) | NOT NULL | File path (e.g., "portfolio/123/screenshot.webp") |
| display_order | INT | DEFAULT 0 | Sorting order |
| created_at | TIMESTAMP | NOT NULL | Upload timestamp |

**Relationships**:
- `belongsTo` Portfolio

**Validation Rules**:
- portfolio_id: required, exists:portfolios,id
- type: required, in:image,video
- path: required, string

**Indexes**:
- PRIMARY KEY (id)
- INDEX (portfolio_id, display_order)

**Cascade Delete**: When portfolio deleted, delete all associated media

---

### 10. ProductMedia

**Purpose**: Stores product screenshots/images

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| product_id | BIGINT UNSIGNED | FK → products.id, INDEX | Parent product |
| type | ENUM('screenshot', 'thumbnail', 'demo') | NOT NULL | Media type |
| path | VARCHAR(500) | NOT NULL | File path |
| display_order | INT | DEFAULT 0 | Sorting order |
| created_at | TIMESTAMP | NOT NULL | Upload timestamp |

**Relationships**:
- `belongsTo` Product

**Validation Rules**:
- product_id: required, exists:products,id
- type: required, in:screenshot,thumbnail,demo
- path: required, string

**Indexes**:
- PRIMARY KEY (id)
- INDEX (product_id, display_order)

**Cascade Delete**: When product deleted, delete all associated media

---

## Pivot Tables

### portfolio_technology

**Purpose**: Many-to-many relationship between portfolios and technologies

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| portfolio_id | BIGINT UNSIGNED | FK → portfolios.id, INDEX | Portfolio reference |
| technology_id | BIGINT UNSIGNED | FK → technologies.id, INDEX | Technology reference |
| created_at | TIMESTAMP | NOT NULL | Association timestamp |

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE INDEX (portfolio_id, technology_id) -- prevent duplicates
- INDEX (technology_id) -- for reverse lookup

**Cascade Delete**: Delete when portfolio or technology deleted

---

## State Transitions

### Portfolio Status
```
draft → published → archived
  ↓         ↓
published  draft (unpublish)
```

### Lead Status
```
new → contacted → qualified → converted
  ↓       ↓          ↓
closed  closed     closed
```

### Product Status
```
draft → published → archived
  ↓         ↓
published  draft (unpublish)
```

---

## Data Integrity Rules

1. **Soft Deletes**: Portfolio and Product use soft deletes (`deleted_at`) to preserve data
2. **Cascade Deletes**: PortfolioMedia and ProductMedia cascade delete with parent
3. **Foreign Key Constraints**: All FK relationships enforce referential integrity
4. **Unique Constraints**: Slugs must be unique across their respective tables
5. **Check Constraints**: Ratings must be within valid range (0-5 or 1-5)
6. **Default Values**: Status defaults to 'draft', featured defaults to FALSE
7. **Timestamps**: All entities have created_at and updated_at

---

## Query Optimization Strategies

1. **Eager Loading**: Always eager load relationships to prevent N+1 queries
   ```php
   Portfolio::with(['category', 'technologies', 'media'])->get();
   ```

2. **Composite Indexes**: Use composite indexes for common filter combinations
   - `(category_id, status, featured, created_at)` for portfolio filtering

3. **Pagination**: Use `paginate()` or `simplePaginate()` for large datasets
   - Portfolio listings: 12 items per page
   - Admin tables: 25 items per page

4. **Caching**: Cache expensive queries with Redis
   - Portfolio listings: 5-minute TTL, tagged with 'portfolio'
   - Product listings: 5-minute TTL, tagged with 'products'
   - Invalidate cache when portfolio/product updated

5. **Counting**: Use `withCount()` instead of loading relationships for counts
   ```php
   Category::withCount('portfolios')->get();
   ```

---

## Migration Order

1. Create `users` table
2. Create `categories` table
3. Create `technologies` table
4. Create `portfolios` table
5. Create `products` table
6. Create `testimonials` table
7. Create `leads` table
8. Create `site_settings` table
9. Create `portfolio_media` table
10. Create `product_media` table
11. Create `portfolio_technology` pivot table

---

## Data Seeding Strategy

1. **CategorySeeder**: Seed predefined categories (Web Development, Mobile Apps, etc.)
2. **TechnologySeeder**: Seed common technologies (Laravel, React, MySQL, etc.)
3. **UserSeeder**: Create default admin user (for local development only)
4. **TestimonialSeeder**: Seed sample testimonials (for staging/demo)
5. **PortfolioSeeder**: Seed sample portfolio (for staging/demo, not production)

---

**Status**: ✅ Complete - Ready for contract generation (Phase 1)
