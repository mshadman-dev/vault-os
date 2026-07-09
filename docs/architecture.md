# VAULT OS — Technical Architecture

> Version 3.0 · React 19 · TypeScript 5 · Vite 5 · shadcn/ui · Tailwind CSS v3

---

## 1. Stack

| Layer | Choice | Rationale |
|---|---|---|
| Build | Vite 5 | Near-instant HMR, native ESM, optimized production bundles |
| UI Framework | React 19 | Concurrent rendering, Actions API |
| Language | TypeScript 5 (strict) | No `any` policy, inferred Zod types |
| Design System | shadcn/ui + Tailwind CSS v3 | Zero-runtime utility classes, primitive components, fully themeable via CSS vars |
| Icons | Lucide React | Single icon library — consistent stroke weight, tree-shakeable |
| Routing | React Router v6 | `createBrowserRouter`, lazy loading, nested layouts |
| Animation | Framer Motion | Exclusive micro-interaction library; variants centralized in `src/lib/motion/` |
| Client State | Zustand | Minimal boilerplate, slice pattern, DevTools support |
| Server State | TanStack Query v5 | Caching, background refresh, loading/error states |
| Form Validation | React Hook Form + Zod | Schema-driven validation, inferred TS types, controlled shadcn inputs |
| Linting | ESLint + typescript-eslint + eslint-plugin-tailwindcss | Strict rules, Tailwind class order |
| Formatting | Prettier + prettier-plugin-tailwindcss | Auto-sorted Tailwind classes |
| CI | GitHub Actions | Lint + type-check + test + build on every PR |
| Testing (unit/component) | Vitest + React Testing Library | Co-located tests, jsdom environment, jest-dom matchers |
| Testing (E2E) | Playwright | Production-build server; critical user flows |
| Security | Zod env validation + CSP meta tag | Startup validation, no raw env reads outside `lib/env.ts` |
| Observability | Custom logger + Error Boundary + perf marks | Sentry-ready; no direct console calls outside `lib/logger.ts` |
| Future 3D | React Three Fiber (isolated in `src/lib/three/`) | No current install; boundary enforced by ESLint |
| Future Timeline | GSAP (isolated in `src/lib/gsap/`) | No current install; boundary enforced by ESLint |

---

## 2. Folder Structure

```
vault-os/
├── .github/
│   ├── workflows/
│   │   └── ci.yml
│   └── pull_request_template.md
├── .kiro/
│   └── specs/vault-os/
│       ├── requirements.md
│       ├── design.md
│       ├── tasks.md
│       └── .config.kiro
├── docs/
│   ├── architecture.md          ← this file
│   ├── roadmap.md
│   ├── security.md              ← CSP + HTTP headers reference
│   └── phases/                  ← per-phase documentation
│       ├── 0-project-hardening.md
│       ├── 1-design-system.md
│       └── ...
├── e2e/                         ← Playwright end-to-end tests
│   ├── dashboard.spec.ts
│   ├── navigation.spec.ts
│   ├── mobile-drawer.spec.ts
│   └── settings-form.spec.ts
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── ui/                  ← shadcn/ui primitives (themed)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── sonner.tsx
│   │   ├── layout/
│   │   │   ├── ErrorBoundary/   ← Root error boundary
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Shell/
│   │   │   │   ├── Shell.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── index.ts
│   │   │   └── TopBar/
│   │   │       ├── TopBar.tsx
│   │   │       └── index.ts
│   │   └── widgets/
│   │       ├── NetWorthCard/
│   │       │   ├── NetWorthCard.tsx
│   │       │   ├── NetWorthCard.test.tsx
│   │       │   └── index.ts
│   │       ├── PortfolioAllocation/
│   │       ├── RecentTransactions/
│   │       └── SpendingTrend/
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── Portfolio/
│   │   ├── Transactions/
│   │   ├── Analytics/
│   │   ├── Settings/
│   │   └── NotFound/
│   ├── hooks/
│   │   ├── useBreakpoint.ts
│   │   ├── usePerformanceMark.ts  ← Performance.mark() wrapper
│   │   └── useToast.ts
│   ├── store/
│   │   ├── index.ts             ← re-exports all slice hooks
│   │   ├── uiStore.ts
│   │   └── dashboardStore.ts
│   ├── styles/
│   │   ├── globals.css          ← :root tokens, CSS reset, dark-only body bg, scrollbar
│   │   └── mixins.css           ← .glass, .glow, .gradient-text (@apply utilities)
│   ├── types/
│   │   ├── index.ts
│   │   ├── finance.ts
│   │   └── api.ts
│   ├── utils/
│   │   ├── formatCurrency.ts
│   │   ├── formatCurrency.test.ts
│   │   ├── formatDate.ts
│   │   ├── formatDate.test.ts
│   │   └── cn.ts                ← clsx + tailwind-merge helper
│   ├── lib/
│   │   ├── api/                 ← TanStack Query fetch functions (one file per domain)
│   │   │   ├── dashboard.ts
│   │   │   └── portfolio.ts
│   │   ├── env.ts               ← Zod environment variable schema + validation
│   │   ├── logger.ts            ← Logging abstraction + initSentry() stub
│   │   ├── motion/
│   │   │   └── variants.ts      ← all Framer Motion Variants objects
│   │   ├── three/
│   │   │   ├── .gitkeep
│   │   │   └── README.md        ← integration boundary docs
│   │   └── gsap/
│   │       ├── .gitkeep
│   │       └── README.md        ← integration boundary docs
│   ├── test/
│   │   └── setup.ts             ← @testing-library/jest-dom import + global test config
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx
├── .env.example                 ← env var documentation (no real values)
├── index.html
├── tailwind.config.ts
├── vite.config.ts               ← includes Vitest config under `test` key
├── playwright.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── eslint.config.js
├── .prettierrc
├── components.json              ← shadcn/ui config
├── CONTRIBUTING.md
└── package.json
```

---

## 3. Design Token Architecture

Tokens are declared as CSS custom properties in `globals.css` and extended into Tailwind's theme in `tailwind.config.ts`. shadcn/ui reads from the same CSS variables.

```
globals.css (:root CSS vars)
    ↓  extended via tailwind.config.ts theme.extend
Tailwind utility classes (bg-surface-0, text-accent-blue, etc.)
    ↓  consumed by
shadcn/ui primitives + custom components
```

Token categories in `globals.css`:
- `--color-surface-{0-4}` — matte black surface hierarchy
- `--color-accent-blue-{default|hover|active|muted}` — Electric Blue variants
- `--color-accent-violet-{default|hover|active|muted}` — Violet variants
- `--color-semantic-{error|warning|success}` — status colors
- `--radius-{sm|md|lg|xl}` — border radius scale
- `--shadow-{glow-blue|glow-violet}` — colored drop shadows

All components consume tokens through Tailwind classes. No inline CSS `style` objects for theming.

---

## 4. Design System — shadcn/ui + Tailwind

shadcn/ui is **not** a dependency — it's a code generator. Components are added via CLI and live in `src/components/ui/`. They are customized to the VAULT OS palette by overriding their CSS variable references in `globals.css`.

Key shadcn/ui overrides in `globals.css`:
```css
:root {
  --background: 0 0% 4%;        /* #0A0A0A */
  --foreground: 0 0% 96%;       /* #F5F5F5 */
  --card: 0 0% 7%;              /* #111111 */
  --card-foreground: 0 0% 96%;
  --primary: 211 82% 56%;       /* #2F80ED */
  --primary-foreground: 0 0% 100%;
  --ring: 211 82% 56%;          /* Electric Blue focus ring */
  --radius: 0.5rem;             /* 8px base */
}
```

The `dark` class is set on `<html>` unconditionally. No light mode variant ships in v1.0.

---

## 5. Motion Architecture

All Framer Motion variant objects live in `src/lib/motion/variants.ts`. No component defines inline anonymous variant objects.

```
src/lib/motion/variants.ts (variant definitions)
    ↓  imported by
Components (<motion.div variants={pageVariants} />)
```

Exported variant sets:
- `pageVariants` — Route transition: `opacity 0→1, translateY 12px→0`, 300ms ease-out
- `containerVariants` — Stagger parent: 60ms stagger between children
- `itemVariants` — Stagger child: `opacity 0→1`
- `overlayVariants` — Modal entrance: `opacity 0→1, scale 0.95→1`, 200ms ease-out
- `pressVariants` — Button press: `scale 0.97`, 80ms ease-in

Reduced motion: all variants check `useReducedMotion()` from Framer Motion and collapse to `duration: 0`.

---

## 6. Layout Shell Architecture

```
<App>                          ← QueryClientProvider, BrowserRouter
  <Shell>                      ← CSS Grid (sidebar + main)
    <Sidebar />                ← Fixed left, frosted glass, Zustand uiStore
    <TopBar />                 ← Fixed top, frosted glass
    <main>
      <Suspense fallback={<RouteSkeleton />}>
        <Outlet />             ← Route content
      </Suspense>
    </main>
  </Shell>
</App>
```

Responsive sidebar behavior:
| Viewport | Sidebar mode |
|---|---|
| ≥ 1280px | Full width, 240px, labels + icons visible |
| 768px–1279px | Icon-only, 64px, labels hidden |
| < 768px | Hidden; Framer Motion drawer, opened by hamburger in TopBar |

---

## 7. Data Layer — TanStack Query

```
src/lib/api/<domain>.ts        ← typed fetch functions
    ↓  used as queryFn by
useQuery / useMutation hooks   ← inside components/widgets
    ↓  drives
Loading / Empty / Error states ← per Requirement 7
```

`QueryClient` config:
```ts
new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, retry: 2 },
  },
})
```

DevTools mounted in development only:
```tsx
// App.tsx
{import.meta.env.DEV && <ReactQueryDevtools />}
```

---

## 8. Form Architecture — React Hook Form + Zod

```
<FormName>.schema.ts           ← Zod schema + inferred type
    ↓
useForm<FormValues>({ resolver: zodResolver(schema) })
    ↓
<Controller> wrapping shadcn/ui Input / Select
    ↓
onSubmit → useMutation (TanStack Query)
    ↓
success → Toast + form.reset()  |  error → field-level error display
```

---

## 9. State Management — Zustand

| Store | Responsibility |
|---|---|
| `uiStore` | Sidebar open/closed, active route label, modal state |
| `dashboardStore` | Widget UI override states (demo/dev only; real data in TanStack Query) |

All stores use the slice pattern. DevTools wrapper in development.

---

## 10. Routing

React Router v6 `createBrowserRouter`. All page components lazy-loaded via `React.lazy`.

```
/                → <Dashboard />
/portfolio       → <Portfolio />
/transactions    → <Transactions />
/analytics       → <Analytics />
/settings        → <Settings />
*                → <NotFound />
```

Each lazy chunk wrapped in a `<Suspense>` at the Shell level. Fallback renders the Route's skeleton component.

---

## 11. CSS Strategy

- **Tailwind CSS v3** for all component styling — utility classes in JSX, no separate CSS files per component.
- **CSS Custom Properties** on `:root` for design tokens — enables easy future theme additions.
- **`globals.css`** for: CSS reset, `:root` token declarations, `html`/`body` dark background, scrollbar styling.
- **`mixins.css`** for: `.glass` (Frosted Glass via `@apply`), `.glow-blue`, `.gradient-text` utilities.
- **`cn()` helper** (`clsx` + `tailwind-merge`) for conditional and merged class composition.
- **`prettier-plugin-tailwindcss`** auto-sorts class order on every save.
- **No CSS Modules**, no CSS-in-JS.

---

## 12. Accessibility Strategy

Target: WCAG 2.2 Level AA. All five Routes must score 100 on Lighthouse Accessibility.

Key implementation rules:
- All interactive elements use semantic HTML (`<button>`, `<a>`, `<input>`) not `<div onClick>`.
- Focus ring: `focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2` on all focusable elements.
- Modal: `DialogPrimitive` from shadcn/ui provides Radix UI focus trap and aria roles.
- Toast: `role="region"` + `aria-live` set by Sonner.
- All Lucide icons in interactive contexts: paired with `aria-label` or `<span className="sr-only">`.
- Min touch target: `min-h-[44px] min-w-[44px]` on all interactive elements at mobile.

---

## 13. Performance Strategy

Target: Lighthouse Performance ≥ 95 desktop, ≥ 90 mobile.

| Technique | Implementation |
|---|---|
| Route-level code splitting | `React.lazy` + `Suspense` for all 5 pages |
| CSS purging | Tailwind JIT — only used classes in bundle |
| Image optimization | WebP/AVIF, explicit dimensions, no CLS |
| Bundle cap enforcement | `vite-bundle-visualizer` in CI |
| TanStack Query cache | Stale-while-revalidate — no re-skeleton on navigation |
| Font loading | `font-display: swap` in `globals.css` |

JS bundle limits: initial bundle ≤ 150 KB gzip, per-route chunk ≤ 80 KB gzip.

---

## 14. CI Pipeline

`.github/workflows/ci.yml` runs on every PR to `main`:

1. Checkout + `npm ci`
2. `npm run lint` — ESLint with zero warnings
3. `tsc -b --noEmit` — type-check all TS projects
4. `npm run format:check` — Prettier + tailwind class order
5. `npm run test` — Vitest unit + component tests (must pass, exit 0)
6. `vite build && vite preview &` — start production preview server
7. `npx playwright test` — E2E tests against preview server (must pass, exit 0)
8. Kill preview server
9. Bundle size audit — warn if initial bundle > 150 KB gzip

---

## 15. Testing Architecture

```
src/
├── test/setup.ts              ← jest-dom global setup
├── components/ui/
│   └── button.test.tsx        ← co-located component test (RTL)
├── components/widgets/
│   └── NetWorthCard.test.tsx  ← loading / empty / error / render
└── utils/
    ├── formatCurrency.test.ts ← pure unit tests
    └── formatDate.test.ts

e2e/
├── dashboard.spec.ts          ← Widget skeletons visible on load
├── navigation.spec.ts         ← All 5 nav links route correctly
├── mobile-drawer.spec.ts      ← Hamburger at 375px
└── settings-form.spec.ts      ← Validation errors on empty submit
```

Vitest runs in `jsdom` environment. React Testing Library's `userEvent` simulates real user interactions. Playwright targets `http://localhost:4173` (Vite preview).

Test scripts:
```
npm run test          → vitest run (CI mode, no watch)
npm run test:watch    → vitest (dev watch mode)
npm run test:coverage → vitest --coverage
npx playwright test   → E2E against preview server
```

---

## 16. Security Architecture

```
src/lib/env.ts
  ├── Zod schema for all VITE_* env vars
  └── Throws at startup if validation fails

index.html
  └── <meta http-equiv="Content-Security-Policy" content="...">

src/lib/api/*.ts
  └── URL construction uses validated typed inputs only

docs/security.md
  └── CSP header config, HTTP security headers, deployment guide
```

Environment variable flow:
```
.env.example (documented, committed)
    ↓  developer copies to
.env.local (gitignored, real values)
    ↓  read by Vite as
import.meta.env.VITE_*
    ↓  validated ONLY in
src/lib/env.ts (Zod schema)
    ↓  consumed by
src/lib/api/*.ts + src/main.tsx
```

No file outside `src/lib/env.ts` reads `import.meta.env` directly.

---

## 17. Observability Architecture

```
src/main.tsx
  └── initSentry(env.VITE_SENTRY_DSN)  ← no-op in v1.0; real in future

src/lib/logger.ts
  ├── logger.debug / .info / .warn / .error
  ├── DEV: writes to console.*
  └── PROD: .warn/.error → Sentry (when DSN set)

src/components/layout/ErrorBoundary/
  ├── Catches all React render errors
  ├── Calls logger.error(error, { componentStack })
  └── Renders full-page fallback (reload button)

src/hooks/usePerformanceMark.ts
  ├── performance.mark('route:<name>:start') on mount
  └── performance.mark('route:<name>:end') on first render

App.tsx
  └── <QueryErrorResetBoundary>
        └── <ErrorBoundary>
              └── <Shell> ... <Outlet />
```

Sentry activation in a future phase: set `VITE_SENTRY_DSN` env var → replace `initSentry` no-op stub with real `Sentry.init()` call → done. No other files change.

---

## 18. Future Extension Points

### React Three Fiber
- All scene code lives in `src/lib/three/` — isolated by ESLint `no-restricted-imports`.
- A `<ThreeCanvas>` component mounts inside any `<Outlet>` slot — no Shell changes needed.
- Zustand `threeStore.ts` slice added by creating one file + one re-export line.

### GSAP
- All timeline code lives in `src/lib/gsap/` — isolated by ESLint `no-restricted-imports`.
- Framer Motion owns micro-interactions; GSAP owns scroll-driven sequences — they never animate the same element.
- `useGSAP` from `@gsap/react` manages timeline lifecycles.
