# Requirements Document

## Introduction

VAULT OS is a premium financial operating system built on React 19, TypeScript, and Vite. It presents a desktop-class, browser-rendered UI with matte black surfaces, frosted glass panels, electric blue and purple accents, and fluid Framer Motion animations — inspired by the interaction quality of Apple, Linear, and Stripe. The product ships as dark-mode only for v1.0 with no light theme code. It is built on a mobile-first responsive foundation scaling from 320px to 4K (3840px), using shadcn/ui and Tailwind CSS as the design system, Lucide React for all iconography, Zustand for state, TanStack Query for async data, and React Hook Form + Zod for form validation. The application is hardened with a security-first approach: environment variable validation, CSP-ready architecture, and sanitized inputs. It ships with a full testing strategy (Vitest, React Testing Library, Playwright) and a structured observability layer (root error boundary, logging abstraction, performance hooks, Sentry integration point). Development follows a GitHub-first workflow where every feature lives on its own branch and merges to `main` through a pull request. Every phase produces living documentation.

---

## Glossary

- **VAULT OS**: The financial operating system product being built.
- **Design System**: shadcn/ui component primitives composed with Tailwind CSS utility classes and a custom CSS variable token layer, governing all visual and behavioral consistency.
- **Design Token**: A CSS custom property (color, spacing, radius, shadow, typography) declared on `:root` and consumed by Tailwind's theme extension and shadcn/ui component overrides.
- **Theme**: The dark-only visual configuration for v1.0 — matte black base palette, frosted glass surfaces, Electric Blue and Violet accents — applied globally with no light-mode variant shipped.
- **Frosted Glass Surface**: A UI surface rendered with `bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]` Tailwind classes.
- **Electric Blue**: The primary accent color `#2F80ED`, mapped to `--color-accent-blue` and the Tailwind `accent-blue` token group.
- **Violet**: The secondary accent color `#7B5EA7`, mapped to `--color-accent-violet` and the Tailwind `accent-violet` token group.
- **Motion Layer**: The Framer Motion animation system — the exclusive library for all UI micro-interactions — governing entrance, exit, hover, press, and page-transition animations.
- **Layout Shell**: The persistent outer frame containing the Sidebar, Top Bar, and main content `<Outlet />`.
- **Sidebar**: The left-side navigation panel within the Layout Shell.
- **Top Bar**: The horizontal bar at the top displaying route label, search, and user controls.
- **Widget**: A self-contained Card component rendering a specific financial metric or data visualization.
- **Dashboard**: The primary view composed of a responsive grid of Widgets.
- **Route**: A distinct navigable view managed by React Router v6.
- **Component**: A reusable shadcn/ui-based React component that consumes Design Tokens and belongs to `src/components/ui/`.
- **Loading State**: The UI representation of a component actively fetching or processing data — rendered as a skeleton shimmer.
- **Empty State**: The UI representation of a component with no data to display — rendered with an icon, message, and optional action.
- **Error State**: The UI representation of a component that has encountered a failure — rendered with an error message and a retry affordance.
- **TanStack Query**: The async state and server-state management library (`@tanstack/react-query`) used for all data fetching.
- **GitHub-first Workflow**: Every feature is developed on a named branch, reviewed via pull request, and merged to `main` only after passing CI checks.
- **Performance Budget**: The minimum Lighthouse scores all Routes must achieve: Performance ≥ 95, Accessibility = 100, Best Practices = 100, SEO = 100.
- **Error Boundary**: A React class component that catches unhandled rendering errors in its subtree and renders a fallback UI instead of crashing the application.
- **Logging Abstraction**: The `src/lib/logger.ts` module — the single location through which all runtime logging flows; wraps `console.*` in development and forwards to Sentry in production.
- **Sentry Integration Point**: The `initSentry()` stub in `src/lib/logger.ts` that wires up Sentry SDK when a `VITE_SENTRY_DSN` environment variable is set.
- **CSP**: Content Security Policy — an HTTP response header (or `<meta>` tag) that restricts which resources the browser is permitted to load, mitigating XSS attacks.
- **Environment Schema**: The Zod schema in `src/lib/env.ts` that validates all `import.meta.env` values at startup.
- **Vitest**: The unit and component test runner, configured inside `vite.config.ts`, used for all non-E2E tests.
- **Playwright**: The end-to-end test framework targeting a production-built preview server; E2E tests live in the top-level `e2e/` directory.

---

## Requirements

### Requirement 1: Design System Foundation

**User Story:** As a developer building VAULT OS, I want a design system built on shadcn/ui and Tailwind CSS with a centralized CSS variable token layer, so that every component references a single source of truth and the codebase stays maintainable at scale.

#### Acceptance Criteria

1. THE Design_System SHALL use shadcn/ui as the primitive component base and Tailwind CSS v3 as the utility layer; no other CSS framework or CSS-in-JS runtime SHALL be installed; raw CSS usage SHALL be limited to `globals.css` (reset, `:root` tokens, scrollbar) and `src/styles/mixins.css` (glass and glow utilities).
2. THE Design_System SHALL declare all color, radius, shadow, and blur tokens as CSS custom properties on `:root` in `globals.css` following the naming pattern `--color-{category}-{name}` (e.g., `--color-surface-0`); these SHALL be extended into the Tailwind config under `theme.extend` so tokens are available as utility classes (e.g., `bg-surface-0`).
3. THE Design_System SHALL define a matte black base palette with exactly five surface levels — `surface-0` (`#0A0A0A`), `surface-1` (`#111111`), `surface-2` (`#161616`), `surface-3` (`#1A1A1A`), `surface-4` (`#1C1C1E`) — each registered as both a CSS custom property and a Tailwind color token.
4. THE Design_System SHALL define Electric Blue (`#2F80ED`) and Violet (`#7B5EA7`) accent token groups, each with four named variant levels `default`, `hover`, `active`, `muted`, registered as CSS custom properties and Tailwind color tokens.
5. THE Design_System SHALL define a typography scale extending Tailwind's default with exactly the sizes `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, each with a corresponding `lineHeight` and `letterSpacing` declared in the Tailwind config.
6. THE Design_System SHALL define motion tokens — at minimum `duration-fast` (80ms), `duration-base` (150ms), `duration-slow` (300ms), and three named easing curves `ease-in`, `ease-out`, `ease-in-out` — exported from `src/lib/motion/variants.ts` and consumed exclusively by the Motion Layer.
7. WHEN a token value is updated in `globals.css` or `tailwind.config.ts`, THE Design_System SHALL reflect the updated value automatically in all components that consume the token via CSS `var()` references or Tailwind utility classes, with no component-level changes required.
8. THE Design_System SHALL ship dark-mode-only styles for v1.0; no `dark:` Tailwind variant classes SHALL be required because the dark palette IS the default; no `prefers-color-scheme: light` media query SHALL appear anywhere in the codebase; no light-mode token values SHALL be defined.

---

### Requirement 2: Global Theme and Visual Identity

**User Story:** As a user of VAULT OS, I want a consistent matte black, frosted glass, electric blue and purple visual theme that looks premium on every device and screen size, so that the product feels like a first-class financial tool.

#### Acceptance Criteria

1. THE Theme SHALL set `background-color: #0A0A0A` on `<html>` and `<body>` via the `bg-surface-0` Tailwind class applied in `App.tsx`; no Route-level component SHALL override the root background.
2. THE Theme SHALL render Frosted Glass Surfaces using the Tailwind composition `bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]`; this combination SHALL be extracted into a `glass` CSS utility in `mixins.css` and applied via `@apply` where Tailwind class repetition would occur.
3. THE Theme SHALL apply Electric Blue (`#2F80ED`) as the interactive accent for primary buttons, active Sidebar items, focused Input rings, and positive numeric data highlights; no other blue hue SHALL be used for these roles.
4. THE Theme SHALL apply Violet (`#7B5EA7`) as the secondary accent for badges, gradient decoration, and accent dividers; Violet SHALL NOT be used as a primary call-to-action color.
5. THE Theme SHALL render primary body text at `#F5F5F5` minimum, achieving a contrast ratio ≥ 4.5:1 against all matte black surfaces, verified against the WCAG 2.2 relative luminance formula.
6. THE Theme SHALL apply `rounded-xl` (12px) to all Card and Widget surfaces and `rounded-lg` (8px) to all Button, Input, Dropdown, and Badge elements, sourced from Tailwind's rounded scale.
7. THE Theme SHALL define the gradient token `--gradient-accent` as `linear-gradient(135deg, #2F80ED 0%, #7B5EA7 100%)` in `globals.css`, applied to hero headings and accent dividers via Tailwind's `bg-gradient-to-br from-accent-blue to-accent-violet` or the custom property directly.
8. WHILE the viewport width is below 768px, THE Theme SHALL maintain all frosted glass treatments, accent colors, and border-radius values with no mobile overrides that deviate from the desktop palette.

---

### Requirement 3: Mobile-First Responsive Design

**User Story:** As a user of VAULT OS on any device, I want the interface to be fully usable from 320px phone screens up to 4K 3840px displays, so that I can access my financial data regardless of my device.

#### Acceptance Criteria

1. THE Codebase SHALL apply a mobile-first responsive strategy: base CSS classes target the smallest viewport (320px) and Tailwind breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) progressively enhance layout for larger viewports; no component SHALL define styles only for desktop and override for mobile.
2. THE Layout_Shell SHALL render without horizontal scroll and without content clipping at viewport widths of 320px, 375px, 428px, 768px, 1024px, 1280px, 1440px, 2560px, and 3840px.
3. THE Dashboard grid SHALL use exactly these column counts by breakpoint: 1 column at < 640px, 2 columns at ≥ 640px (`sm:`), 6 columns at ≥ 1024px (`lg:`), 12 columns at ≥ 1280px (`xl:`); Widget column spans SHALL reflow automatically using responsive Tailwind `col-span-*` classes.
4. THE Layout_Shell SHALL display the full 240px Sidebar at ≥ 1280px, collapse to a 64px icon-only Sidebar at 768px–1279px, and hide the Sidebar entirely at < 768px replacing it with a slide-in drawer triggered by a hamburger button in the Top Bar.
5. ALL touch targets (buttons, nav items, interactive icons) SHALL have a minimum hit area of 44×44px on viewports below 768px, per WCAG 2.2 Success Criterion 2.5.8.
6. THE Typography SHALL scale with the viewport: base font sizes from the Design Token scale apply at mobile, and `text-lg` or `text-xl` headings MAY increase one step at `lg:` breakpoints to fill the larger canvas.
7. THE Dashboard Widgets SHALL reorder their grid position on mobile to show the highest-priority Widget (Net Worth Summary) in the first grid slot at 1-column layout.
8. WHEN a user on a touch device scrolls within a Widget that contains an overflow list (e.g., Recent Transactions), THE Widget SHALL handle touch scroll independently without propagating to the page scroll.

---

### Requirement 4: Accessibility — WCAG 2.2 AA

**User Story:** As a user of VAULT OS who relies on assistive technology, I want every part of the interface to meet WCAG 2.2 AA standards, so that I can use the product regardless of my abilities.

#### Acceptance Criteria

1. THE Codebase SHALL target WCAG 2.2 Level AA conformance across all Routes and Components; this is a stricter target than WCAG 2.1 AA and includes all new 2.2 success criteria (e.g., SC 2.4.11 Focus Not Obscured, SC 2.4.12 Focus Not Obscured Enhanced, SC 2.5.3 Label in Name, SC 2.5.8 Target Size Minimum, SC 3.2.6 Consistent Help, SC 3.3.7 Redundant Entry, SC 3.3.8 Accessible Authentication).
2. ALL text content SHALL achieve a contrast ratio ≥ 4.5:1 for normal text and ≥ 3:1 for large text (≥ 18pt or ≥ 14pt bold) against their backgrounds, as computed by the WCAG 2.2 relative luminance formula.
3. ALL interactive components (Button, Input, Dropdown, Modal, Toast, Tooltip, Sidebar nav items) SHALL be fully operable by keyboard alone: `Tab` moves focus forward, `Shift+Tab` moves focus backward, `Enter` and `Space` activate buttons and dropdowns, `Escape` closes modals and dropdowns, arrow keys navigate within dropdowns and menus.
4. ALL focusable elements SHALL display a visible focus indicator; the focus ring SHALL be a 2px solid Electric Blue (`#2F80ED`) outline with a 2px transparent offset so it is visible on both dark and frosted-glass surfaces; the `:focus-visible` pseudo-class SHALL be used so the ring does not appear on mouse click.
5. WHEN a Modal mounts, THE Modal SHALL move keyboard focus to the first focusable element inside the modal and SHALL trap focus within the modal using a focus-trap implementation until the modal is dismissed; focus SHALL return to the triggering element on modal close.
6. ALL images, icons, and decorative elements SHALL have appropriate `alt` text or `aria-hidden="true"` as applicable; all Lucide React icons used in interactive contexts SHALL have an accompanying `aria-label` or a visually-hidden text sibling.
7. THE Sidebar navigation SHALL use `<nav aria-label="Main navigation">` with `<ul>` and `<li>` structure; each nav item SHALL use `aria-current="page"` on the active item.
8. THE Toast notification region SHALL use `role="region"` with `aria-live="polite"` for success/warning toasts and `aria-live="assertive"` for error toasts so screen readers announce them without interrupting the user's current context.
9. ALL form fields (Input, Dropdown) SHALL have an associated `<label>` element linked via `htmlFor`/`id`; error messages SHALL be linked to their field via `aria-describedby`; required fields SHALL have `aria-required="true"`.
10. THE Lighthouse Accessibility score SHALL be 100 on all five Routes (`/`, `/portfolio`, `/transactions`, `/analytics`, `/settings`) measured with default Lighthouse configuration on a production build.

---

### Requirement 5: Performance Budget

**User Story:** As a user of VAULT OS, I want the application to load fast and run smoothly, so that I can access my financial data without delay on any network or device.

#### Acceptance Criteria

1. THE Application SHALL achieve the following minimum Lighthouse scores on a production build served over localhost, measured using Lighthouse CLI with the `--preset=desktop` profile on all five Routes: Performance ≥ 95, Accessibility = 100, Best Practices = 100, SEO = 100.
2. THE Application SHALL achieve Lighthouse Performance ≥ 90 on the mobile Lighthouse profile (`--form-factor=mobile --throttling-method=simulate`) for the Dashboard route (`/`), which is the heaviest Route.
3. THE Initial JavaScript bundle (parsed and executed before the user can interact with the shell) SHALL NOT exceed 150 KB gzipped; Route-level code-split chunks SHALL NOT individually exceed 80 KB gzipped; these limits SHALL be enforced by a `vite-bundle-visualizer` audit step in the CI workflow.
4. THE Application SHALL load and display the Layout Shell (Sidebar + Top Bar + skeleton placeholders) within 1.5 seconds on a simulated Fast 3G connection (40 Mbps download, 15 ms RTT) from a cold cache, measured by Lighthouse's First Contentful Paint metric.
5. THE Application SHALL use `React.lazy` and `Suspense` for all five Route-level page components so that their JavaScript is fetched only when the Route is first visited, reducing the initial parse cost.
6. ALL images referenced in the application SHALL use modern formats (WebP or AVIF) and SHALL have explicit `width` and `height` attributes or CSS aspect-ratio declarations to prevent Cumulative Layout Shift; CLS SHALL be ≤ 0.1 on all Routes.
7. THE Tailwind CSS build SHALL use PurgeCSS (Tailwind's built-in content purging) so that the shipped CSS contains only utility classes actually used in `src/`; the CSS bundle SHALL NOT exceed 20 KB gzipped on a production build.
8. WHEN a TanStack Query cache hit is available for a route's data, THE Application SHALL render the cached data immediately without re-triggering a loading skeleton, ensuring zero layout flicker on navigations after the first visit.

---

### Requirement 6: Motion Layer

**User Story:** As a user of VAULT OS, I want smooth, purposeful animations on every interaction, so that the product feels alive and polished rather than static.

#### Acceptance Criteria

1. THE Motion_Layer SHALL use Framer Motion as the exclusive animation library for all UI micro-interaction animations — entrance, exit, hover, press, and page-transition — within the React component tree; GSAP and React Three Fiber are reserved for future non-micro-interaction use per Requirement 15.
2. WHEN a Route changes, THE Motion_Layer SHALL play a page-transition animation that fades opacity from 0 to 1 and translates the incoming page from `translateY(12px)` to `translateY(0)`, completing within 300ms using the `ease-out` easing token.
3. WHEN the Dashboard mounts and its Widget container enters the DOM, THE Motion_Layer SHALL play a staggered entrance animation where each Widget fades from `opacity: 0` to `opacity: 1` with a 60ms delay between consecutive items, using `containerVariants` (parent) and `itemVariants` (children) Framer Motion variant objects.
4. WHEN a user's pointer enters an interactive element, THE Motion_Layer SHALL apply `scale(1.03)` completing within 150ms using the `ease-out` easing token; the scale SHALL revert on pointer leave within the same 150ms.
5. WHEN a user's pointer depresses an interactive element, THE Motion_Layer SHALL apply `scale(0.97)` completing within 80ms using the `ease-in` easing token; the scale SHALL revert on pointer release within 80ms.
6. WHEN a Modal mounts, THE Motion_Layer SHALL animate it from `opacity: 0, scale: 0.95` to `opacity: 1, scale: 1` within 200ms using `ease-out`; on unmount, the reverse animation SHALL play within 200ms.
7. THE Motion_Layer SHALL centralize all Framer Motion `Variants` objects in `src/lib/motion/variants.ts`, exporting the named sets `pageVariants`, `containerVariants`, `itemVariants`, `overlayVariants`, and `pressVariants`; no component file SHALL define inline anonymous variant objects.
8. WHERE `window.matchMedia('(prefers-reduced-motion: reduce)')` returns `true`, THE Motion_Layer SHALL replace all animations with instant transitions (`duration: 0`) using Framer Motion's `useReducedMotion` hook.

---

### Requirement 7: Universal Component States

**User Story:** As a user of VAULT OS, I want every data-bearing component to communicate its current state clearly — whether loading, empty, or errored — so that I always understand what's happening with my data.

#### Acceptance Criteria

1. EVERY component that fetches or displays data SHALL implement all three states: a **loading state** rendered as a skeleton shimmer, an **empty state** rendered with a Lucide React icon, a descriptive message, and an optional action button, and an **error state** rendered with a Lucide `AlertCircle` icon, an error message string, and a retry button that re-triggers the data fetch.
2. WHEN a component is in a loading state, THE component SHALL render a skeleton placeholder matching the shape and dimensions of its loaded content; the skeleton SHALL apply a shimmer animation using a `background-size: 200% 100%` linear gradient cycling from `#161616` to `#1C1C1E` with a 1500ms cycle duration.
3. WHEN a component is in an empty state (data fetch succeeded but returned zero items), THE component SHALL render a vertically centered empty state block containing: a Lucide React icon (contextually appropriate per component), a heading of no more than eight words, a sub-text of no more than twenty words, and an optional primary action Button; empty state SHALL NOT display any lorem ipsum or placeholder text.
4. WHEN a component is in an error state, THE component SHALL display the error message string returned from the data layer (or a generic fallback if none) alongside a "Retry" Button that calls the TanStack Query `refetch()` function for that query; the error state SHALL NOT unmount sibling components or propagate an unhandled React error to the root error boundary.
5. THE four Dashboard Widgets (Net Worth Summary, Portfolio Allocation, Recent Transactions, Spending Trend) SHALL each implement all three states independently; a single Widget entering an error state SHALL NOT affect the loading or display state of other Widgets.
6. THE Layout Shell (Sidebar and Top Bar) SHALL render in their fully visible state immediately; they SHALL NOT display loading or error states since they contain no async data of their own.
7. ALL skeleton loading states ACROSS the application SHALL use identical shimmer animation timing (1500ms cycle, same gradient stops) so the loading experience is visually consistent.
8. WHEN a TanStack Query cache exists for a component's data and the data is being re-fetched in the background, THE component SHALL display the stale cached data (not the skeleton) with an optional subtle "refreshing" indicator; it SHALL NOT revert to the skeleton state for background re-fetches.

---

### Requirement 8: Layout Shell

**User Story:** As a user of VAULT OS, I want a persistent navigation shell with a sidebar and top bar, so that I can navigate between views without losing context on any device.

#### Acceptance Criteria

1. THE Layout_Shell SHALL render a fixed-position left Sidebar and fixed-position Top Bar that remain mounted across all Route changes without unmounting and remounting.
2. THE Sidebar SHALL display, from top to bottom: the VAULT OS logotype, a vertically stacked list of primary navigation items (each with a Lucide React icon and a label), and a user profile section pinned to the bottom.
3. THE Sidebar navigation items SHALL use only Lucide React icons; no other icon library SHALL be imported.
4. THE Sidebar SHALL highlight the active navigation item by applying the `text-accent-blue` Tailwind class to the item label and icon, and rendering a 4px-wide left-border indicator using `border-l-4 border-accent-blue`.
5. WHEN a navigation item in the Sidebar is clicked, THE Layout_Shell SHALL invoke React Router's `navigate()` to update the URL without a full page reload.
6. THE Top_Bar SHALL display: the human-readable label of the current active Route (left-aligned), a text search Input (center), and a notifications icon button using the Lucide `Bell` icon (right-aligned).
7. WHILE the viewport width is 768px–1279px, THE Layout_Shell SHALL render the Sidebar in 64px icon-only mode, hiding labels but preserving icons and the active indicator.
8. WHILE the viewport width is below 768px, THE Layout_Shell SHALL hide the Sidebar and display a Lucide `Menu` hamburger button in the Top Bar.
9. WHEN the hamburger button is tapped on a viewport below 768px, THE Layout_Shell SHALL slide the Sidebar in from the left as a drawer overlay using a Framer Motion `x` translate animation within 250ms.
10. WHEN the Sidebar drawer is open and the 40%-opacity black backdrop is tapped, THE Layout_Shell SHALL slide the drawer out and remove the backdrop.
11. WHEN the viewport width grows from below 768px to ≥ 768px while the drawer is open, THE Layout_Shell SHALL close the drawer and restore the appropriate desktop Sidebar mode automatically.
12. THE Sidebar and Top Bar SHALL apply the Frosted Glass Surface treatment using the `glass` utility class defined in `mixins.css`.

---

### Requirement 9: Dashboard View

**User Story:** As a user of VAULT OS, I want a dashboard view composed of financial Widgets with live data states, so that I can see all key metrics at a glance on any device.

#### Acceptance Criteria

1. THE Dashboard SHALL render a responsive CSS Grid with column counts matching Requirement 3, criterion 3 (1 → 2 → 6 → 12 columns across breakpoints).
2. THE Dashboard SHALL render exactly four initial Widgets at the 12-column breakpoint: Net Worth Summary (6 cols), Portfolio Allocation (6 cols), Recent Transactions (8 cols), Spending Trend (4 cols); Widget column spans SHALL reflow to full-width at 1-column mobile.
3. WHEN the Dashboard mounts, THE Motion_Layer SHALL trigger the `containerVariants` stagger on the Widget grid container, causing each Widget to enter with the `itemVariants` pattern from Requirement 6, criterion 3.
4. EACH Widget SHALL implement the universal loading, empty, and error states defined in Requirement 7.
5. THE Dashboard SHALL use TanStack Query to manage each Widget's data fetching; each Widget's query SHALL be independent so a failure in one does not affect the others.
6. THE Dashboard SHALL render without horizontal overflow and without Widget clipping at all breakpoints defined in Requirement 3, criterion 2.
7. THE Dashboard page component SHALL export a `<DashboardSkeleton />` sub-component used as the `<Suspense>` fallback while the lazy Route bundle loads.

---

### Requirement 10: Component Library

**User Story:** As a developer building VAULT OS, I want a typed, accessible component library built on shadcn/ui, so that every UI element is consistent, keyboard-navigable, and easy to compose.

#### Acceptance Criteria

1. THE Component_Library SHALL use shadcn/ui as the primitive base; each component SHALL be added via the shadcn/ui CLI (`npx shadcn-ui@latest add <component>`) and then themed to the VAULT OS dark palette; no component SHALL be written from scratch when an equivalent shadcn/ui primitive exists.
2. THE Component_Library SHALL include at minimum: Button, Badge, Card, Input, Select (Dropdown), Dialog (Modal), Toast (Sonner), Tooltip, Avatar, and Skeleton — all sourced from shadcn/ui and styled with the VAULT OS token set.
3. ALL icons used within Component_Library components SHALL be sourced exclusively from `lucide-react`; no other icon library SHALL be imported anywhere in `src/`.
4. THE Button SHALL accept `variant` (`'default' | 'secondary' | 'ghost' | 'destructive'`) and `size` (`'sm' | 'default' | 'lg' | 'icon'`) props matching the shadcn/ui Button API; the `default` variant SHALL render Electric Blue fill.
5. WHEN the Button receives `disabled={true}`, THE Button SHALL set `opacity-40 pointer-events-none` and render `aria-disabled="true"`.
6. WHEN the Button receives `isLoading={true}`, THE Button SHALL render the shadcn/ui Skeleton or a Lucide `Loader2` spinning icon in place of its label and set `aria-busy="true"`.
7. THE Card SHALL render as a Frosted Glass Surface by default; the `flat` variant SHALL use `bg-surface-1` without `backdrop-filter`.
8. THE Input SHALL render with a Frosted Glass border, an Electric Blue `ring-2 ring-accent-blue` focus ring, and an inline error message in `text-red-400` when an `error` prop is provided.
9. WHEN the Dialog (Modal) mounts, it SHALL render in a React Portal to `document.body`, trap focus per WCAG 2.2, and close on `Escape`; the Framer Motion `overlayVariants` SHALL animate its entrance.
10. THE Toast (Sonner) SHALL render in a fixed container, stack up to five toasts, auto-dismiss after 4000ms, support manual dismissal, and accept `success | warning | error` types with distinct left-border accent colors.
11. ALL Component_Library components SHALL define their props using TypeScript `interface` or `type` with no `any`; prop types SHALL be exported from each component's `index.ts`.
12. ALL interactive components SHALL conform to the WCAG 2.2 AA keyboard and focus criteria defined in Requirement 4.

---

### Requirement 11: Data Layer — TanStack Query

**User Story:** As a developer building VAULT OS, I want a consistent data-fetching layer using TanStack Query, so that all async state (loading, caching, errors, background refresh) is handled uniformly across the application.

#### Acceptance Criteria

1. THE Application SHALL install `@tanstack/react-query` and wrap the component tree in a single `<QueryClientProvider>` at the `App.tsx` level; the `QueryClient` SHALL be instantiated once with a shared default config defining `staleTime: 60_000` (1 minute) and `retry: 2`.
2. ALL data fetching in VAULT OS SHALL use TanStack Query `useQuery` or `useMutation` hooks; no component SHALL use raw `useEffect` + `fetch` / `axios` for data fetching.
3. THE API layer SHALL define each endpoint call as a typed async function in `src/lib/api/` — one file per domain (e.g., `dashboard.ts`, `portfolio.ts`) — that returns a strongly typed response object; these functions SHALL be the sole arguments passed to `useQuery`'s `queryFn`.
4. WHEN a `useQuery` is in `isPending: true` state, THE consuming component SHALL render its Loading State (skeleton shimmer) as defined in Requirement 7, criterion 2.
5. WHEN a `useQuery` is in `isError: true` state, THE consuming component SHALL render its Error State (error message + retry button) as defined in Requirement 7, criterion 4; the retry button SHALL call `refetch()`.
6. WHEN a `useQuery` returns an empty array or null result with `isSuccess: true`, THE consuming component SHALL render its Empty State as defined in Requirement 7, criterion 3.
7. THE `QueryClient` SHALL be configured with `@tanstack/react-query-devtools` available in development mode only; the devtools panel SHALL NOT be bundled in the production build.
8. EACH Widget's data SHALL be fetched with its own `queryKey` so queries are independently cacheable, independently retryable, and independently invalidatable without affecting sibling Widgets.

---

### Requirement 12: Form Validation — React Hook Form + Zod

**User Story:** As a user of VAULT OS, I want form inputs to validate my data immediately and clearly, so that I understand what's required before submitting.

#### Acceptance Criteria

1. ALL forms in VAULT OS SHALL use React Hook Form (`react-hook-form`) as the form state manager and Zod (`zod`) for schema-based validation; no other form library SHALL be used.
2. EACH form SHALL define a Zod schema in a co-located `<FormName>.schema.ts` file; the schema SHALL be the single source of truth for field types, required/optional status, and validation rules; TypeScript types for form values SHALL be inferred from the Zod schema via `z.infer<typeof schema>`.
3. WHEN a user blurs a required field that is empty, THE Form SHALL display an inline validation error message below the field within 100ms of the blur event; the message SHALL be sourced from the Zod schema's `.message()` override or a sensible default.
4. WHEN a user submits a form with validation errors, THE Form SHALL prevent the submit handler from executing, display all field-level errors, and move focus to the first invalid field.
5. WHEN a form submission is in progress (pending TanStack Query mutation), THE submit Button SHALL enter its loading state (`isLoading={true}`) and ALL form fields SHALL be disabled to prevent duplicate submissions.
6. WHEN a form submission succeeds, THE Form SHALL reset to its initial empty state and a success Toast SHALL be displayed via the `useToast` hook.
7. ALL Input and Select components SHALL be registered with `react-hook-form` via the `Controller` wrapper to maintain compatibility with shadcn/ui's controlled component API.
8. FORM schemas SHALL be defined for all Settings page forms before v1.0 ships; no Settings form SHALL be left in a non-validating state.

---

### Requirement 13: State Management — Zustand

**User Story:** As a developer building VAULT OS, I want a lightweight, slice-based state management layer using Zustand, so that UI state is easy to read, test, and extend.

#### Acceptance Criteria

1. THE Application SHALL use Zustand for all client-side UI state; server/async state SHALL be owned by TanStack Query; no component SHALL use React context for state that is needed across more than two component levels.
2. EACH Zustand slice SHALL be defined in its own file at `src/store/<sliceName>Store.ts`, exporting a typed `use<SliceName>Store` hook; the `src/store/index.ts` file SHALL re-export all slice hooks.
3. THE `uiStore` slice SHALL manage: sidebar open/closed state, active route label, toast queue, and modal open/close state; it SHALL export typed actions alongside state with no Redux-style action creators.
4. THE `dashboardStore` slice SHALL manage Widget-level UI overrides (e.g., manually pinned loading or error states for demo purposes); actual async data SHALL live in TanStack Query, not in this store.
5. EACH store action SHALL be a plain synchronous function that updates the Zustand store's `set()`; side effects (API calls) SHALL be handled by TanStack Query mutations, not by store actions.
6. THE Zustand store SHALL be compatible with the `zustand/middleware` `devtools` wrapper in development mode so state changes are visible in Redux DevTools.
7. FUTURE slices (e.g., `threeStore.ts`, `gsapStore.ts`) SHALL be addable by creating a new `<sliceName>Store.ts` file and adding a single re-export line to `src/store/index.ts`, with no changes to existing stores required.

---

### Requirement 14: Routing Architecture

**User Story:** As a user of VAULT OS, I want navigable routes for each major section with fast, lazy-loaded transitions, so that the product functions as a multi-page application within a single page shell.

#### Acceptance Criteria

1. THE Router SHALL use `createBrowserRouter` from React Router v6; no `HashRouter` or custom history management SHALL be used.
2. THE Router SHALL define exactly these five Routes in `src/router.tsx`: `/` → `<Dashboard />`, `/portfolio` → `<Portfolio />`, `/transactions` → `<Transactions />`, `/analytics` → `<Analytics />`, `/settings` → `<Settings />`.
3. WHEN a Route is navigated to, THE Router SHALL push a new entry onto the browser history stack so the browser back button works.
4. IF a user navigates to any path not matched by the five defined Routes, THE Router SHALL render a Not Found view within the Layout Shell with a visible `404` heading and a link back to `/`.
5. WHEN a Route's lazy bundle is loading, THE Router SHALL display a loading indicator (matching that Route's skeleton component) inside the main content area.
6. ALL five Route-level components SHALL be wrapped in `React.lazy()` with a shared `<Suspense>` boundary at the Shell level.

---

### Requirement 15: Code Quality and Folder Structure

**User Story:** As a developer maintaining VAULT OS, I want an enforced folder structure and strict code quality tooling, so that the codebase stays scalable, consistent, and free of dead code.

#### Acceptance Criteria

1. THE Codebase SHALL organize `src/` into exactly these top-level directories: `components/`, `pages/`, `hooks/`, `store/`, `styles/`, `types/`, `utils/`, `lib/`; no source files SHALL reside directly in `src/` except `App.tsx`, `main.tsx`, and `router.tsx`.
2. EACH component SHALL live in its own directory under `src/components/` containing: `index.ts` (re-export), `<Name>.tsx` (implementation), and optionally a co-located test file; all styling SHALL use Tailwind utility classes applied directly in JSX.
3. THE `lib/` directory SHALL contain: `api/` (TanStack Query fetch functions), `motion/` (Framer Motion variants), `three/` (future R3F, currently `.gitkeep`), `gsap/` (future GSAP, currently `.gitkeep`).
4. THE Codebase SHALL use `typescript-eslint` with `recommended-type-checked` rules, `eslint-plugin-react-hooks`, and `eslint-plugin-tailwindcss` (for class order); the `lint` script SHALL exit non-zero on any violation.
5. THE Codebase SHALL have Prettier with `prettier-plugin-tailwindcss` installed; the `format:check` script SHALL exit non-zero on any formatting violation; Tailwind class order SHALL be auto-sorted by the Prettier plugin.
6. THE Codebase SHALL configure path aliases in `tsconfig.app.json` and `vite.config.ts` for: `@/components`, `@/pages`, `@/hooks`, `@/store`, `@/styles`, `@/types`, `@/utils`, `@/lib`; no import SHALL use `../` traversal across `src/` subdirectories.
7. THE Codebase SHALL contain no `any` TypeScript type unless suppressed with `// eslint-disable-next-line @typescript-eslint/no-explicit-any -- <reason>` where `<reason>` is a non-empty justification string.
8. THE Codebase SHALL contain no files under `src/` with any of: `// TODO`, `// FIXME`, `// PLACEHOLDER`, `lorem ipsum`, `[insert`, dummy data strings, or fake financial figures in any file merged to `main`.

---

### Requirement 16: GitHub-First Workflow and Branch Strategy

**User Story:** As a developer on the VAULT OS project, I want every feature isolated on its own Git branch and merged through a pull request, so that `main` always reflects reviewed, CI-passing, production-quality code.

#### Acceptance Criteria

1. THE Repository SHALL designate `main` as the default and protected branch requiring: at least one approved pull request review, all CI status checks passing, and no direct pushes.
2. EVERY feature, fix, or chore SHALL be developed on a named branch following the convention: `feat/<scope>`, `fix/<scope>`, `chore/<scope>`, `docs/<scope>`; branch names SHALL use kebab-case.
3. NO code change SHALL be committed directly to `main`; every merge SHALL occur via a pull request that passes CI.
4. THE Repository SHALL include `.github/workflows/ci.yml` running on `pull_request` events targeting `main`, executing: `npm run lint` (exit 0 required), `tsc -b --noEmit` (exit 0 required), and `vite build` (exit 0 required); any non-zero exit SHALL fail the CI check and block the merge.
5. THE CI check SHALL be configured as a required status check in branch protection so a failing CI run cannot be merged even by administrators.
6. THE Repository SHALL include `.github/pull_request_template.md` with four `##` headings: `Summary`, `Changes`, `Testing`, and `Screenshots`, each with a placeholder prompt.
7. THE Repository SHALL include `CONTRIBUTING.md` documenting branch naming, Conventional Commits format, and a PR checklist covering summary, testing, and screenshots.

---

### Requirement 17: Phase Documentation

**User Story:** As a developer joining the VAULT OS project at any phase, I want up-to-date documentation for every completed phase, so that I can understand the architecture, conventions, and decisions without reading all the code.

#### Acceptance Criteria

1. EACH implementation phase defined in the roadmap SHALL produce a corresponding documentation file at `docs/phases/<phase-number>-<phase-name>.md` before the phase's pull request is merged to `main`.
2. EACH phase documentation file SHALL contain at minimum: a **Goal** section (one sentence), a **What was built** section (bulleted list of files created or modified), a **Key decisions** section (rationale for non-obvious choices), and a **How to verify** section (commands or browser steps to confirm the phase is working correctly).
3. THE `docs/architecture.md` file SHALL be updated within the same pull request as any phase that introduces a structural change to the stack, folder structure, or data flow.
4. THE `README.md` SHALL be updated by Phase 0 to include: project overview, local setup instructions (`npm install`, `npm run dev`), available npm scripts and their purpose, and a link to `CONTRIBUTING.md`.
5. ALL documentation files SHALL be written in plain English with no lorem ipsum, placeholder text, or `[insert content here]` strings; every section SHALL contain real, accurate content before the PR is approved.

---

### Requirement 18: Future-Readiness — Three.js and GSAP

**User Story:** As a developer extending VAULT OS beyond v1.0, I want the architecture to support React Three Fiber 3D scenes and GSAP timeline animations without touching the existing component tree or Framer Motion layer.

#### Acceptance Criteria

1. THE Codebase SHALL confine all future React Three Fiber scene logic to `src/lib/three/`; no file outside that directory SHALL import from `@react-three/fiber` or `three`, enforced via an ESLint `no-restricted-imports` rule with an exemption for `src/lib/three/**`.
2. THE Codebase SHALL confine all future GSAP timeline logic to `src/lib/gsap/`; no file outside that directory SHALL import from `gsap`, enforced via an ESLint `no-restricted-imports` rule with an exemption for `src/lib/gsap/**`.
3. THE Layout_Shell SHALL render the main content area exclusively as a React Router `<Outlet />` with no wrapper imposing fixed dimensions or `overflow: hidden`, so that any Route — including a full-viewport 3D canvas — can mount without Shell changes.
4. FRAMER MOTION and GSAP SHALL coexist without conflict: Framer Motion owns all micro-interactions defined in Requirement 6; GSAP is reserved for complex scroll-driven sequences in `src/lib/gsap/`; the two libraries SHALL NOT animate the same DOM element simultaneously.
5. THE `src/lib/three/` and `src/lib/gsap/` directories SHALL each contain a `.gitkeep` file in v1.0 and a `README.md` stub documenting the intended usage pattern so future developers understand the integration boundary.

---

### Requirement 19: Testing Strategy

**User Story:** As a developer on the VAULT OS project, I want a comprehensive, automated test suite covering units, components, and end-to-end flows, and I want CI to run all tests before any code can merge, so that regressions are caught before they reach `main`.

#### Acceptance Criteria

1. THE Codebase SHALL use **Vitest** as the unit test runner; Vitest SHALL be configured in `vite.config.ts` under the `test` key with `environment: 'jsdom'`, `globals: true`, and `setupFiles: ['src/test/setup.ts']`; the `test` npm script SHALL run all Vitest tests and exit non-zero on any failure.
2. THE Codebase SHALL use **React Testing Library** (`@testing-library/react` + `@testing-library/user-event` + `@testing-library/jest-dom`) for all component-level tests; no component test SHALL use Enzyme or direct DOM manipulation outside of Testing Library's `screen` and `userEvent` APIs.
3. EVERY component in `src/components/ui/` and `src/components/widgets/` SHALL have a co-located test file named `<ComponentName>.test.tsx` covering at minimum: (a) renders without throwing, (b) loading state renders a skeleton, (c) error state renders the error message and retry button, (d) empty state renders the empty state icon and message, and (e) key interactive behaviors (button click, form submit, keyboard navigation).
4. THE Codebase SHALL use **Playwright** for end-to-end tests; Playwright SHALL be installed as a dev dependency with a `playwright.config.ts` at the project root targeting `http://localhost:5173`; E2E tests SHALL live in a top-level `e2e/` directory.
5. THE Playwright E2E test suite SHALL cover the following critical user flows before v1.0 ships: (a) application loads and the Dashboard renders with Widget skeletons visible, (b) all five Sidebar navigation links navigate to the correct Route, (c) mobile drawer opens and closes via the hamburger button at 375px viewport, (d) the Settings form displays validation errors on empty submit, and (e) a Widget error state shows the retry button.
6. WHEN the CI workflow runs on a pull request targeting `main`, THE CI_Workflow SHALL execute `npm run test` (Vitest) and `npx playwright test` (E2E against a production-built app) as required steps; a failure in either test suite SHALL mark the CI check as failed and block the merge.
7. THE CI workflow SHALL run Playwright tests against a `vite build && vite preview` server (not the dev server) to test the production bundle; the preview server SHALL start before Playwright runs and be shut down after.
8. THE `src/test/setup.ts` file SHALL import `@testing-library/jest-dom` to extend Vitest's `expect` with DOM matchers (`.toBeInTheDocument()`, `.toBeVisible()`, etc.); this setup file SHALL be the only place `@testing-library/jest-dom` is imported globally.
9. UNIT TESTS SHALL be written for all pure utility functions in `src/utils/` (`formatCurrency`, `formatDate`, `cn`) and all Zod schemas in co-located `*.schema.ts` files, covering valid inputs, invalid inputs, and edge cases.
10. TEST COVERAGE SHALL NOT be gated on a numeric threshold in CI for v1.0; coverage reports SHALL be generated (`vitest --coverage`) as an informational CI artifact but SHALL NOT block merges; this rule SHALL be revisited post-v1.0.

---

### Requirement 20: Security

**User Story:** As an operator and user of VAULT OS, I want the application built with security-first practices — validated environment configuration, no committed secrets, a CSP-ready architecture, and sanitized user inputs — so that the application is hardened against common web vulnerabilities from day one.

#### Acceptance Criteria

1. THE Application SHALL validate all environment variables at startup using a Zod schema defined in `src/lib/env.ts`; `import.meta.env` SHALL NOT be read directly in any file outside `src/lib/env.ts`; if a required environment variable is missing or of the wrong type, the application SHALL throw a descriptive error at startup rather than silently failing at runtime.
2. THE Repository SHALL include a `.env.example` file at the project root listing all required and optional environment variables with placeholder values and inline comments describing their purpose; the actual `.env` and `.env.local` files SHALL be listed in `.gitignore` and SHALL NOT be committed to the repository.
3. THE Repository SHALL include a `docs/security.md` file documenting: the recommended Content Security Policy (CSP) header configuration for the application, recommended additional HTTP security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`), and instructions for applying these headers in Nginx / Vercel / Netlify deployment configurations.
4. THE `index.html` SHALL include a `<meta http-equiv="Content-Security-Policy">` tag with a restrictive default policy as a baseline: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'`; the policy SHALL be documented in `docs/security.md` alongside notes on how to extend it for external API endpoints.
5. ALL user-generated string content rendered to the DOM SHALL be rendered via React's JSX (which HTML-escapes by default); no user input SHALL be passed to `dangerouslySetInnerHTML` without explicit comment justification; no `eval()` or `new Function()` calls SHALL exist in `src/`.
6. ALL form inputs in VAULT OS SHALL be validated by the Zod schema (Requirement 12) before their values are used in any application logic or API call; numeric financial inputs SHALL additionally be validated to reject non-finite numbers (NaN, Infinity, -Infinity) and values outside a defined min/max range.
7. THE Codebase SHALL include an ESLint rule (`no-restricted-syntax` or a custom rule) that prevents `console.log` statements from being merged to `main`; `console.error` and `console.warn` are permitted only inside the logging abstraction defined in Requirement 21.
8. API fetch functions in `src/lib/api/` SHALL construct URLs using the `URL` constructor or template literals with validated, typed inputs only; no user-provided string SHALL be concatenated directly into a URL or query parameter without type-checking via the Zod-validated API input types.

---

### Requirement 21: Observability

**User Story:** As a developer maintaining VAULT OS in production, I want a structured error boundary, a logging abstraction, performance hooks, and a ready Sentry integration point, so that I can detect, diagnose, and respond to issues quickly.

#### Acceptance Criteria

1. THE Application SHALL render a React error boundary component at the application root (`src/components/layout/ErrorBoundary/ErrorBoundary.tsx`) that catches all unhandled React rendering errors; the error boundary SHALL render a full-page fallback UI with: the VAULT OS logotype, a human-readable error message, and a "Reload application" button that calls `window.location.reload()`; the fallback SHALL apply the matte black theme without depending on any crashed component subtree.
2. THE Error boundary component SHALL call the logging abstraction (Requirement 21, criterion 3) with the caught error and `errorInfo.componentStack` so that errors are captured even before Sentry is wired up.
3. THE Application SHALL define a logging abstraction at `src/lib/logger.ts` exporting a `logger` object with four methods: `logger.debug()`, `logger.info()`, `logger.warn()`, and `logger.error()`; in development (`import.meta.env.DEV === true`), all four methods SHALL write to the browser console using the corresponding `console.*` method; in production (`import.meta.env.PROD === true`), `debug` and `info` SHALL be no-ops and `warn` / `error` SHALL forward to the Sentry integration point (criterion 5); no file in `src/` outside `src/lib/logger.ts` SHALL call `console.*` methods directly.
4. THE Application SHALL include a `src/hooks/usePerformanceMark.ts` hook that wraps the browser `Performance.mark()` and `Performance.measure()` APIs; this hook SHALL be called at the top of each Route-level page component to mark route render start and end times; the marks SHALL be named `route:<routeName>:start` and `route:<routeName>:end` so they are queryable via `performance.getEntriesByName()` and compatible with future APM tooling.
5. THE `src/lib/logger.ts` file SHALL include a `initSentry(dsn: string)` function stub that is a no-op in v1.0 but documents the expected Sentry SDK initialization call (`Sentry.init({ dsn, integrations: [...], tracesSampleRate: 1.0 })`); the stub SHALL be called in `src/main.tsx` with the value of the `VITE_SENTRY_DSN` environment variable (which defaults to `''` so the no-op fires when unset); this establishes the wiring point so activating Sentry in a future phase requires only setting the environment variable and replacing the stub with a real `Sentry.init()` call.
6. THE Error boundary SHALL log the route path (`window.location.pathname`) alongside the error so that future Sentry breadcrumbs are context-rich.
7. THE `src/lib/logger.ts` abstraction SHALL accept a second optional `context` argument of type `Record<string, unknown>` on all four methods; this context object SHALL be passed through to Sentry's `extra` field in the future integration so structured logging context is preserved.
8. THE Application SHALL export a `<QueryErrorResetBoundary>` from TanStack Query wrapping the Layout Shell so that when the root error boundary resets (on page reload or explicit reset), all TanStack Query error states are also cleared, preventing stale error states after recovery.
