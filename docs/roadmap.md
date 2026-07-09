# VAULT OS — Implementation Roadmap

> Version 3.0
> Every phase ships on its own `feat/` or `chore/` branch, merged to `main` via pull request after CI passes.
> CI runs: lint → format:check → type-check → Vitest unit/component tests → build → Playwright E2E.
> Every phase produces a documentation file at `docs/phases/<n>-<name>.md` before the PR is merged.
> No code is committed directly to `main`. No placeholder text, lorem ipsum, or dummy UI at any phase.

---

## Phase 0 — Project Hardening

**Goal:** Production-grade tooling, repo governance, testing infrastructure, and security scaffolding in place before a single line of product code is written.

**Branch:** `chore/project-hardening`

### Tasks

- [ ] Delete Vite scaffold boilerplate: `src/App.css`, default `App.tsx` content, `src/assets/react.svg`, `src/assets/vite.svg`
- [ ] Install and configure Tailwind CSS v3 + PostCSS (`tailwind.config.ts`, `postcss.config.js`)
- [ ] Install shadcn/ui CLI and initialize (`npx shadcn-ui@latest init` → sets `components.json`, updates `globals.css` with shadcn CSS vars)
- [ ] Install `lucide-react`
- [ ] Install `prettier` + `prettier-plugin-tailwindcss`; add `.prettierrc`; add `format` and `format:check` npm scripts
- [ ] Install `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-tailwindcss`; upgrade `eslint.config.js` to strict TypeScript + tailwindcss rules; add `lint` npm script (exits non-zero on any violation); add `no-warning-comments` rule for `TODO`/`FIXME`; add `no-console` rule (allows `warn`/`error` only via logger)
- [ ] Install `lint-staged` + `husky`; configure pre-commit hook to run lint + format on staged files
- [ ] Configure path aliases in `tsconfig.app.json` and `vite.config.ts` for `@/components`, `@/pages`, `@/hooks`, `@/store`, `@/styles`, `@/types`, `@/utils`, `@/lib`
- [ ] Configure `no-restricted-imports` ESLint rules for `@react-three/fiber`, `three`, and `gsap` with `src/lib/three/**` and `src/lib/gsap/**` exemptions
- [ ] **Testing infrastructure:**
  - [ ] Install `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `@vitest/coverage-v8`, `jsdom`
  - [ ] Configure Vitest in `vite.config.ts`: `environment: 'jsdom'`, `globals: true`, `setupFiles: ['src/test/setup.ts']`
  - [ ] Create `src/test/setup.ts` importing `@testing-library/jest-dom`
  - [ ] Add `test`, `test:watch`, `test:coverage` npm scripts
  - [ ] Install Playwright: `npm init playwright@latest` (outputs `playwright.config.ts`, `e2e/` directory)
  - [ ] Configure `playwright.config.ts`: target `http://localhost:4173`, 3 browsers (Chromium, Firefox, WebKit)
  - [ ] Verify Vitest runs with zero tests (clean pass) and Playwright configuration is valid
- [ ] **Security scaffolding:**
  - [ ] Create `src/lib/env.ts` with Zod schema for `import.meta.env`; add `VITE_SENTRY_DSN` as optional string defaulting to `''`
  - [ ] Create `.env.example` with all env vars documented; add `.env`, `.env.local`, `.env.*.local` to `.gitignore`
  - [ ] Add `<meta http-equiv="Content-Security-Policy">` tag to `index.html` with baseline policy
  - [ ] Create `docs/security.md` documenting CSP policy, recommended HTTP headers, deployment configuration guide
- [ ] **Observability scaffolding:**
  - [ ] Create `src/lib/logger.ts` with `logger.debug/info/warn/error` + `initSentry()` no-op stub
  - [ ] Call `initSentry(env.VITE_SENTRY_DSN)` in `src/main.tsx`
  - [ ] Create `src/hooks/usePerformanceMark.ts` wrapping `Performance.mark()`/`Performance.measure()`
  - [ ] Create `src/components/layout/ErrorBoundary/ErrorBoundary.tsx` (React class component, full-page fallback, calls `logger.error`)
- [ ] Create `.github/workflows/ci.yml` (lint, format:check, type-check, Vitest, build + preview, Playwright E2E)
- [ ] Create `.github/pull_request_template.md` (Summary / Changes / Testing / Screenshots sections)
- [ ] Create `CONTRIBUTING.md` (branch naming, Conventional Commits, PR checklist)
- [ ] Create `src/lib/three/.gitkeep`, `src/lib/three/README.md`, `src/lib/gsap/.gitkeep`, `src/lib/gsap/README.md`
- [ ] Update `README.md` with project overview, setup instructions, npm scripts reference, link to `CONTRIBUTING.md`
- [ ] Write `docs/phases/0-project-hardening.md`

**Deliverable:** Clean repo, enforced tooling, full CI pipeline (including tests), security and observability scaffolding all in place, README complete.

---

## Phase 1 — Design System

**Goal:** All design tokens, Tailwind config, and global CSS in place; shadcn/ui themed to the VAULT OS dark palette.

**Branch:** `feat/design-system`

### Tasks

- [ ] Write CSS custom property token declarations in `src/styles/globals.css`: surface palette, Electric Blue, Violet, semantic colors, radius, shadow, gradient accent
- [ ] Override all shadcn/ui CSS variables in `globals.css` to map to the VAULT OS dark palette (set `--background`, `--foreground`, `--primary`, `--ring`, `--card`, etc.)
- [ ] Set `class="dark"` unconditionally on `<html>` in `index.html`; verify no `prefers-color-scheme: light` media query exists anywhere
- [ ] Extend `tailwind.config.ts` with all token groups: `colors.surface`, `colors.accent-blue`, `colors.accent-violet`, `colors.semantic`, `borderRadius`, `boxShadow`, custom animation (`shimmer`)
- [ ] Write `src/styles/mixins.css` with `.glass` (`@apply bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]`), `.glow-blue`, `.gradient-text` utilities
- [ ] Import `globals.css` and `mixins.css` in `src/main.tsx`
- [ ] Write `src/lib/motion/variants.ts` with all five variant sets: `pageVariants`, `containerVariants`, `itemVariants`, `overlayVariants`, `pressVariants` — all respecting `useReducedMotion`
- [ ] Write `src/hooks/useBreakpoint.ts` (returns current breakpoint key)
- [ ] Write `src/utils/cn.ts` (`clsx` + `tailwind-merge` helper)
- [ ] Install Framer Motion
- [ ] Write `docs/phases/1-design-system.md`

**Deliverable:** Dark background renders, tokens available as Tailwind classes, motion variants exported, no component code yet.

---

## Phase 2 — Component Library

**Goal:** All shadcn/ui primitives added and themed; custom composite components built on top.

**Branch:** `feat/component-library`

### Tasks

**shadcn/ui primitives (add via CLI, then theme):**
- [ ] `button` — themed to Electric Blue primary, ghost, secondary, destructive variants; add `isLoading` prop with `Loader2` Lucide icon
- [ ] `card` — themed; add `flat` variant using `bg-surface-1` without backdrop-filter
- [ ] `badge` — themed to Electric Blue and Violet variants
- [ ] `input` — themed with Frosted Glass surface, Electric Blue focus ring, inline error message
- [ ] `select` — themed to match Input; keyboard nav tested
- [ ] `dialog` — themed; Framer Motion `overlayVariants` entrance; focus trap verified
- [ ] `tooltip` — themed; appears on `:focus-visible` not just hover
- [ ] `avatar` — themed; fallback initials
- [ ] `skeleton` — shimmer animation using `animate-shimmer` Tailwind custom animation (1500ms cycle)
- [ ] `sonner` (Toast) — themed; success/warning/error left-border accent colors; 4000ms auto-dismiss; max 5 stack

**All icons sourced from `lucide-react` only — verify no other icon library imported**

**Accessibility pass per component:**
- [ ] All interactive components keyboard-operable (Enter, Space, Escape, arrow keys)
- [ ] All icons in interactive contexts have `aria-label` or `sr-only` sibling
- [ ] All inputs have associated `<label>` via `htmlFor`/`id`
- [ ] Focus ring (`focus-visible:ring-2 ring-accent-blue ring-offset-2`) on all focusable elements
- [ ] All touch targets ≥ 44×44px

**Component tests (Vitest + React Testing Library):**
- [ ] `button.test.tsx` — renders all variants, loading state, disabled state, keyboard activation
- [ ] `card.test.tsx` — renders all variants, applies glass class
- [ ] `input.test.tsx` — renders label, error message, focus ring on focus
- [ ] `dialog.test.tsx` — mounts, traps focus, closes on Escape
- [ ] `sonner.test.tsx` — success/warning/error render with correct border color

- [ ] Write `docs/phases/2-component-library.md`

**Deliverable:** All primitives render correctly with VAULT OS dark theme, accessible, tested, no placeholder content.

---

## Phase 3 — Data and State Infrastructure

**Goal:** TanStack Query, Zustand, React Hook Form + Zod all wired up before any page uses data.

**Branch:** `feat/data-infrastructure`

### Tasks

- [ ] Install `@tanstack/react-query` + `@tanstack/react-query-devtools`
- [ ] Wrap `App.tsx` in `<QueryClientProvider>` with `QueryClient` (`staleTime: 60_000`, `retry: 2`)
- [ ] Mount `<ReactQueryDevtools>` gated on `import.meta.env.DEV`
- [ ] Create `src/lib/api/dashboard.ts` — typed fetch functions for each Widget's data
- [ ] Create `src/lib/api/portfolio.ts` — typed fetch functions for Portfolio page
- [ ] Install `zustand`; create `src/store/uiStore.ts` and `src/store/dashboardStore.ts`; create `src/store/index.ts` re-exporting both
- [ ] Install `react-hook-form` + `zod`; write `src/utils/zodResolver.ts` helper (re-export from `@hookform/resolvers/zod`)
- [ ] Write `src/hooks/useToast.ts` (wraps Sonner's `toast()`)
- [ ] Write `docs/phases/3-data-infrastructure.md`

**Deliverable:** Data layer, state stores, and form infrastructure all available for use in pages; no UI yet.

---

## Phase 4 — Layout Shell

**Goal:** Persistent navigation frame with full responsive behavior.

**Branch:** `feat/layout-shell`

### Tasks

- [ ] `src/router.tsx` — `createBrowserRouter` with all 5 routes, `React.lazy` + `Suspense`, 404 route
- [ ] `Shell.tsx` — Tailwind CSS Grid (`grid-cols-[240px_1fr]`), responsive collapse via `useBreakpoint`
- [ ] `Sidebar.tsx` — logotype, nav items (Lucide icons + labels), active state (`border-l-4 border-accent-blue text-accent-blue`), user profile section; `glass` utility applied; Zustand `uiStore` for open/close
- [ ] `TopBar.tsx` — route label, search Input, Lucide `Bell` notification button; `glass` utility applied
- [ ] Responsive behavior: full → icon-only (64px, labels hidden) → hidden (< 768px)
- [ ] Mobile drawer: Framer Motion `x` translate, 250ms; Lucide `Menu` hamburger; 40%-opacity backdrop
- [ ] Auto-close drawer on viewport resize to ≥ 768px
- [ ] Page transition: `motion.div` wrapping `<Outlet />` with `pageVariants`
- [ ] All nav items `aria-current="page"` on active; `<nav aria-label="Main navigation">` wrapper
- [ ] Write `docs/phases/4-layout-shell.md`

**Deliverable:** Full shell renders at 320px and 1440px; routing works; drawer tested; animations verified.

---

## Phase 5 — Dashboard View

**Goal:** Primary data view with all four Widgets, each implementing loading / empty / error states.

**Branch:** `feat/dashboard`

### Tasks

- [ ] `src/pages/Dashboard/Dashboard.tsx` — responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-12`); `containerVariants` stagger on Widget container
- [ ] `DashboardSkeleton.tsx` — full-page skeleton matching Dashboard layout; used as `<Suspense>` fallback
- [ ] `NetWorthCard/` widget — TanStack Query `useQuery`; loading (skeleton), empty, error states; 6-col span
- [ ] `PortfolioAllocation/` widget — SVG donut chart; all three states; 6-col span
- [ ] `RecentTransactions/` widget — list with Avatar + amount; all three states; 8-col span at xl
- [ ] `SpendingTrend/` widget — SVG sparkline; all three states; 4-col span at xl
- [ ] All four widgets reflow to full-width at 1-column mobile; Net Worth Summary first in DOM order
- [ ] Verify no horizontal overflow at 320px, 768px, 1024px, 1280px, 1440px, 2560px, 3840px
- [ ] Staggered entrance animation on mount (`containerVariants` + `itemVariants`)
- [ ] **Widget unit + component tests:**
  - [ ] `NetWorthCard.test.tsx` — renders without throwing, loading skeleton, error state + retry, empty state
  - [ ] `PortfolioAllocation.test.tsx` — same three states
  - [ ] `RecentTransactions.test.tsx` — same three states
  - [ ] `SpendingTrend.test.tsx` — same three states
- [ ] `src/utils/formatCurrency.test.ts` — valid, invalid, edge cases
- [ ] `src/utils/formatDate.test.ts` — valid, invalid, edge cases
- [ ] Write `docs/phases/5-dashboard.md`

**Deliverable:** Dashboard renders with animated entrance, all Widget states functional, all Widget tests passing, no dummy data.

---

## Phase 6 — Remaining Routes

**Goal:** All five routes are navigable and functional with proper states.

**Branch:** `feat/route-stubs`

### Tasks

- [ ] `Portfolio/` — empty state (Lucide icon + message + CTA); skeleton fallback; real layout
- [ ] `Transactions/` — empty state; skeleton fallback; real layout
- [ ] `Analytics/` — empty state; skeleton fallback; real layout
- [ ] `Settings/` — at minimum one functional form using React Hook Form + Zod (e.g., profile settings); all form fields validated; skeleton fallback
- [ ] `NotFound/` — `404` heading + description + link to `/`; inside Layout Shell
- [ ] Verify all routes are navigable; browser back button works; history stack correct
- [ ] **Settings form schema test:** `src/pages/Settings/<formName>.schema.test.ts` — valid input, missing required fields, type mismatches
- [ ] **E2E smoke tests (first Playwright run):**
  - [ ] `e2e/navigation.spec.ts` — all 5 Sidebar links navigate to correct routes
  - [ ] `e2e/mobile-drawer.spec.ts` — hamburger opens/closes drawer at 375px viewport
  - [ ] `e2e/settings-form.spec.ts` — empty submit shows validation errors
- [ ] Write `docs/phases/6-remaining-routes.md`

**Deliverable:** All 5 routes navigable; Settings form validates; first E2E suite passing.

---

## Phase 7 — Accessibility, Performance, and Security Pass

**Goal:** Hit all performance budget scores, WCAG 2.2 AA, full E2E coverage, and security validation on every Route.

**Branch:** `feat/polish`

### Tasks

**Accessibility:**
- [ ] Run Lighthouse CLI on all 5 Routes (production build): target Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100
- [ ] Fix any Lighthouse Accessibility violations (missing `alt`, `aria-label`, contrast, label associations)
- [ ] Run WCAG 2.2 AA audit: focus not obscured, target size ≥ 44px, redundant entry, accessible auth
- [ ] Verify keyboard navigation end-to-end: Tab order, Enter/Space activation, Escape dismissal, focus trap in Modal
- [ ] Verify `aria-live` on Toast region; `aria-current="page"` on active Sidebar item
- [ ] Reduced motion audit: all animations instant when `prefers-reduced-motion: reduce`

**Performance:**
- [ ] Run `vite build`; check bundle sizes: initial ≤ 150 KB gzip, per-route chunk ≤ 80 KB gzip; CSS ≤ 20 KB gzip
- [ ] Verify TanStack Query stale cache renders immediately on re-navigation (no re-skeleton)
- [ ] Verify CLS ≤ 0.1 on all Routes (explicit image dimensions, no layout shifts)
- [ ] Verify Lighthouse mobile score ≥ 90 on Dashboard

**Security:**
- [ ] Verify `src/lib/env.ts` Zod schema covers all env vars; run `vite build` with missing env var to confirm startup throws
- [ ] Verify `.env` and `.env.local` are in `.gitignore`; confirm `.env.example` is committed and accurate
- [ ] Review `index.html` CSP meta tag; verify it does not block any application resources
- [ ] Audit all `src/lib/api/*.ts` functions for string concatenation into URLs — must use typed inputs only
- [ ] Verify no `dangerouslySetInnerHTML` usage in `src/` without justification comment
- [ ] Run ESLint `no-console` check: confirm zero direct `console.*` calls outside `src/lib/logger.ts`

**Observability:**
- [ ] Verify `ErrorBoundary` mounts at root and renders fallback when a child throws (manual test: temporarily throw in a component)
- [ ] Verify `logger.error` is called by `ErrorBoundary` with error + componentStack
- [ ] Verify `usePerformanceMark` marks appear in DevTools Performance panel for each route navigation
- [ ] Verify `initSentry()` is called in `main.tsx` (no-op fires cleanly; no console errors)

**Cleanup:**
- [ ] Remove all `console.log` calls; fix any remaining ESLint warnings; final `tsc -b --noEmit` clean run
- [ ] Write `docs/phases/7-accessibility-performance-security.md`

**Deliverable:** Zero ESLint warnings, zero TS errors, all Lighthouse targets met, WCAG 2.2 AA across all Routes, security checklist passed, observability layer verified.

---

## Phase 8 — Full Test Suite and CI Finalization

**Goal:** Complete E2E coverage, full CI pipeline verified end-to-end, repo governance locked in for ongoing development.

**Branch:** `chore/ci-finalize`

### Tasks

- [ ] Complete E2E Playwright suite:
  - [ ] `e2e/dashboard.spec.ts` — Dashboard loads, Widget skeletons visible, skeletons resolve to content
  - [ ] `e2e/navigation.spec.ts` — all 5 links navigate, browser back works, 404 renders correctly
  - [ ] `e2e/mobile-drawer.spec.ts` — hamburger opens drawer, backdrop tap closes it, resize auto-closes
  - [ ] `e2e/settings-form.spec.ts` — empty submit shows errors, valid submit shows success toast
- [ ] Run full CI workflow on a test PR: lint → format:check → type-check → Vitest → build → Playwright — all steps must pass
- [ ] Enable branch protection on `main`: require PR review, require CI pass, no direct push, admins not exempt
- [ ] Add bundle size check step to CI (warn if initial bundle exceeds 150 KB gzip)
- [ ] Tag `v1.0.0` release on `main`
- [ ] Write `docs/phases/8-ci-test-finalize.md`

**Deliverable:** Full test suite passing in CI, protected `main`, CI badge in README, tagged v1.0.0 release.

---

## Future Phases (Post v1.0.0)

| Phase | Branch | Description |
|---|---|---|
| 9 | `feat/storybook` | Storybook setup — stories for all primitive components |
| 10 | `feat/r3f-hero` | React Three Fiber — 3D hero element on Dashboard |
| 11 | `feat/gsap-scroll` | GSAP scroll animations — Analytics page section reveals |
| 12 | `feat/real-data` | API integration — live finance data source |
| 13 | `feat/auth` | Login/logout flow, protected routes |
| 14 | `feat/sentry` | Activate Sentry — replace `initSentry()` stub with real `Sentry.init()` |
| 15 | `feat/light-theme` | Optional light theme toggle (tokens will support it) |
| 16 | `feat/pwa` | Progressive Web App manifest + service worker |

---

## Branch Naming Convention

```
feat/<scope>    → new feature
fix/<scope>     → bug fix
chore/<scope>   → tooling, config, CI
docs/<scope>    → documentation only
```

All branches target `main` via pull request. No direct pushes to `main`.

## Commit Message Format (Conventional Commits)

```
<type>(<scope>): <short description>

Types: feat, fix, chore, docs, style, refactor, test, perf
Example: feat(dashboard): add Net Worth Widget with skeleton and error states
```
