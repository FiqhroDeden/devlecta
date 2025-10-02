<!--
  SYNC IMPACT REPORT
  Version change: Initial → 1.0.0
  Created: 2025-10-02

  New Constitution Sections:
  - Core Principles (5 principles established)
  - Quality Standards (code quality requirements)
  - Development Workflow (process requirements)
  - Governance (amendment and compliance policies)

  Templates alignment status:
  ✅ .specify/templates/plan-template.md - Constitution Check section references this file
  ✅ .specify/templates/spec-template.md - Testability requirements align with TDD principle
  ✅ .specify/templates/tasks-template.md - Test-first ordering enforced, aligns with TDD principle
  ✅ .specify/templates/agent-file-template.md - No constitution-specific references to update

  Follow-up items: None
-->

# Devlecta Constitution

## Core Principles

### I. Test-Driven Development (NON-NEGOTIABLE)

Tests MUST be written before implementation code in all cases. The TDD cycle is strictly enforced:

1. Write a failing test that defines the desired behavior
2. Run the test to verify it fails for the expected reason
3. Write the minimum code necessary to make the test pass
4. Refactor while keeping tests green
5. Repeat for each new behavior

**Rationale**: TDD ensures testable design, prevents regressions, documents expected behavior, and reduces debugging time. It is the foundation of code quality in this project.

**Enforcement**:
- Pull requests MUST include tests written before implementation
- Code reviews MUST verify TDD discipline was followed
- Implementation commits MUST NOT precede test commits for the same feature

### II. Code Quality & Standards

All code MUST meet these non-negotiable quality standards:

- **Type Safety**: Full TypeScript strictness on frontend (no `any` except with explicit justification); PHP 8.2+ type hints on all methods
- **Linting**: Zero ESLint/Prettier violations on frontend; zero Laravel Pint violations on backend
- **Complexity**: Functions MUST NOT exceed 20 lines; classes MUST NOT exceed 200 lines without architectural justification
- **Naming**: Self-documenting variable/function names; avoid abbreviations except universally understood (e.g., `id`, `url`)
- **DRY Principle**: Duplication of business logic is prohibited; extract shared code to utilities/services

**Rationale**: Consistent, readable code reduces cognitive load, accelerates onboarding, and minimizes defects.

**Tooling Required**:
- Frontend: ESLint, Prettier, TypeScript compiler
- Backend: Laravel Pint, PHPStan/Psalm (level 8+), Pest

### III. Test Coverage & Quality Standards

Testing MUST cover all critical paths with these requirements:

- **Unit Tests**: All business logic, utilities, and services MUST have unit tests with ≥90% coverage
- **Feature Tests**: All API endpoints MUST have feature tests verifying request/response contracts
- **Integration Tests**: All user workflows spanning multiple components MUST have end-to-end tests
- **Edge Cases**: Tests MUST cover error conditions, boundary values, and invalid inputs
- **Performance Tests**: API endpoints MUST meet <200ms p95 response time; frontend interactions <100ms time-to-interactive

**Rationale**: Comprehensive testing catches bugs early, enables confident refactoring, and documents system behavior.

**Test Organization**:
- Backend: `tests/Unit/`, `tests/Feature/`, organized by domain
- Frontend: Co-located `*.test.tsx` files, `__tests__/` for integration tests
- Contract tests in `tests/Contract/` for API schema validation

### IV. User Experience Consistency

All user-facing features MUST provide a consistent, accessible, and performant experience:

- **Accessibility**: WCAG 2.1 AA compliance mandatory; semantic HTML, ARIA labels, keyboard navigation
- **Responsive Design**: Mobile-first approach; test on mobile (375px), tablet (768px), desktop (1440px)
- **Loading States**: All async operations MUST show loading indicators; skeleton screens for content
- **Error Handling**: User-friendly error messages; no raw error dumps; actionable guidance ("Try again", "Contact support")
- **Performance**: Lighthouse score ≥90 on mobile; Core Web Vitals in green (LCP <2.5s, FID <100ms, CLS <0.1)

**Rationale**: Consistent UX builds user trust, reduces support burden, and ensures inclusive access.

**Component Standards**:
- Use Radix UI primitives for accessibility
- Follow Tailwind CSS conventions for styling consistency
- Headless UI for advanced patterns (modals, dropdowns)

### V. Performance & Scalability Requirements

All features MUST be designed for production scale with these constraints:

- **Backend Performance**:
  - API endpoints: <200ms p95 response time
  - Database queries: N+1 detection enabled; eager loading required for relationships
  - Caching: Laravel cache for expensive computations; Redis for session/queue data
  - Jobs: Long-running tasks (>5s) MUST use queues; idempotent job design required

- **Frontend Performance**:
  - Bundle size: <200KB gzip for initial load; code splitting for routes
  - React optimization: Memoization for expensive renders; lazy loading for large components
  - Asset optimization: Image optimization (WebP format); SVG for icons

- **Scalability Constraints**:
  - Design for horizontal scaling; avoid in-memory state (use database/cache)
  - API rate limiting enforced (100 req/min per user)
  - Database indexing for all frequently queried columns

**Rationale**: Performance is a feature, not an optimization. Slow applications lose users and revenue.

## Quality Standards

### Code Review Requirements

All changes MUST pass peer review before merging:

- **Required Checks**:
  - All tests passing (no skipped tests without justification)
  - Lint/format checks passing
  - Type checking passing
  - No merge conflicts
  - Branch up-to-date with main

- **Review Criteria**:
  - TDD discipline verified (test commits before implementation)
  - Constitution compliance checked
  - Security implications assessed
  - Performance impact considered

- **Approval**: Minimum 1 approving review; 2 for architectural changes

### Security & Data Protection

- **Authentication**: Laravel Fortify for secure auth; 2FA available for sensitive accounts
- **Authorization**: Policy-based access control; never trust client-side permissions
- **Input Validation**: Validate all inputs server-side; sanitize for XSS prevention
- **Secrets Management**: Never commit secrets; use `.env` files (gitignored); rotate credentials regularly
- **Dependency Security**: Weekly `npm audit` and `composer audit` runs; update vulnerable packages within 7 days

### Documentation Requirements

- **Code Documentation**: PHPDoc blocks for all public methods; TSDoc for complex TypeScript utilities
- **API Documentation**: OpenAPI spec for all endpoints; maintained in `docs/api/`
- **Feature Specs**: All features MUST have spec in `.specify/specs/[feature]/spec.md`
- **README Updates**: Keep `README.md` current with setup instructions, architecture overview, and contribution guidelines

## Development Workflow

### Branch Strategy

- **Main Branch**: Always deployable; protected; requires PR + reviews
- **Feature Branches**: `[issue-number]-feature-name` format (e.g., `042-user-dashboard`)
- **Commit Messages**: Conventional Commits format (`feat:`, `fix:`, `test:`, `refactor:`, `docs:`)

### Feature Development Process

1. **Specification**: Create spec using `/specify` command
2. **Planning**: Generate implementation plan using `/plan` command
3. **Task Breakdown**: Create tasks using `/tasks` command
4. **TDD Implementation**: Write tests → verify failures → implement → verify passes
5. **Review**: Submit PR, address feedback, obtain approval
6. **Merge**: Squash merge to main with meaningful commit message

### Testing Gates

Features CANNOT be merged unless:

- [ ] All new code has corresponding tests written first
- [ ] All tests passing (unit, feature, integration)
- [ ] Coverage ≥90% for new code
- [ ] Performance tests passing (if applicable)
- [ ] Manual QA checklist completed for UI changes

## Governance

### Constitutional Authority

This constitution supersedes all other development practices. When conflicts arise between this document and external guidelines, this constitution takes precedence.

### Amendment Process

Amendments to this constitution MUST follow this process:

1. **Proposal**: Document proposed change with rationale in `docs/rfcs/`
2. **Discussion**: Minimum 3-day review period for team feedback
3. **Approval**: Consensus required from tech leads
4. **Version Bump**: Update `CONSTITUTION_VERSION` per semantic versioning
5. **Propagation**: Update all dependent templates and documentation
6. **Communication**: Announce changes to entire team with migration plan if needed

### Version Semantics

- **MAJOR (X.0.0)**: Backward-incompatible principle removals or redefinitions
- **MINOR (0.X.0)**: New principles added or material expansions to existing guidance
- **PATCH (0.0.X)**: Clarifications, wording fixes, non-semantic refinements

### Compliance & Enforcement

- **PR Reviews**: Every pull request MUST be checked for constitutional compliance
- **Automated Checks**: CI/CD pipeline MUST enforce linting, testing, type checking
- **Complexity Audits**: Quarterly review of codebase against complexity limits
- **Exception Handling**: Violations MUST be documented in `specs/[feature]/plan.md` Complexity Tracking section with justification

### Related Documentation

- **Agent Guidance**: See `.specify/templates/agent-file-template.md` for AI agent development instructions
- **Spec Template**: See `.specify/templates/spec-template.md` for feature specification format
- **Plan Template**: See `.specify/templates/plan-template.md` for implementation planning format
- **Tasks Template**: See `.specify/templates/tasks-template.md` for task breakdown format

---

**Version**: 1.0.0 | **Ratified**: 2025-10-02 | **Last Amended**: 2025-10-02
