# Requirements Document

## Introduction

Phase 4 of vault-os builds the Dashboard page — the primary landing view of the finance application. The goal is a premium, fully responsive CSS Grid layout populated with eight independent, reusable widget components. No business logic, no API calls, and no real financial data are included; widgets render empty/zero states and placeholder labels. All design uses existing CSS custom properties, Lucide React icons, and Framer Motion (LazyMotion + domAnimation). The foundation is intentionally minimal so future phases can wire in data, charts, and interactivity without structural changes.

## Glossary

- **Dashboard**: The root page rendered at the `/` route inside `AppLayout`.
- **Widget**: A self-contained React component that occupies one or more grid cells on the Dashboard. Each widget has its own `.tsx` and `.module.css` file.
- **DashboardGrid**: The CSS Grid container defined in `Page.module.css` that arranges all widgets.
- **Shell_Tokens**: CSS custom properties defined in `index.css` prefixed with `--shell-` (`--shell-bg`, `--shell-electric-blue`, `--shell-sidebar-width`, `--shell-topnav-height`).
- **Theme_Tokens**: CSS custom properties defined in `index.css` without prefix (`--text`, `--text-h`, `--bg`, `--border`, `--accent`, `--accent-bg`, `--shadow`).
- **HeroBalanceCard**: Widget displaying a prominent total balance area.
- **IncomeCard**: Widget summarising income.
- **ExpenseCard**: Widget summarising expenses.
- **SavingsGoalCard**: Widget showing savings goal progress.
- **BudgetProgressCard**: Widget showing budget usage progress.
- **AnalyticsPlaceholder**: Widget reserving space for a future chart.
- **RecentTransactionsPlaceholder**: Widget reserving space for a future transactions list.
- **QuickActions**: Widget containing quick-action buttons.
- **AppLayout**: The shell component that wraps all pages, providing `Sidebar`, `TopNav`, and a `<main>` content area with `padding: 24px` (desktop) / `16px` (mobile).
- **LazyMotion**: Framer Motion's code-split animation provider (`LazyMotion + domAnimation + m.*`).
- **WCAG_AA**: Web Content Accessibility Guidelines 2.1 Level AA — minimum 4.5:1 contrast for normal text, 3:1 for large text and UI components, visible focus indicators.

---

## Requirements

### Requirement 1: Dashboard Page Structure

**User Story:** As a user, I want to open vault-os and immediately see a structured financial overview page, so that I can understand the layout and navigate quickly.

#### Acceptance Criteria

1. THE `DashboardPage` SHALL render as the direct child of `AppLayout`'s `<Outlet>` at the `/` route, with no intermediate wrapper elements between `<Outlet>` and `DashboardPage`'s root element.
2. THE `DashboardPage` SHALL replace the existing stub `<h1>` / `<p>` markup with a header section containing an `<h1>` and a `<div>` (or `<section>`) carrying the CSS Module class `grid` that establishes the CSS Grid layout container.
3. THE `DashboardGrid` container SHALL include all eight widget components rendered as direct children: `HeroBalanceCard`, `IncomeCard`, `ExpenseCard`, `SavingsGoalCard`, `BudgetProgressCard`, `AnalyticsPlaceholder`, `RecentTransactionsPlaceholder`, and `QuickActions` — each SHALL be present in the DOM and not conditionally hidden.
4. THE `DashboardPage` SHALL include exactly one `<h1>` element with the visible text content "Dashboard" and no `aria-hidden` attribute, ensuring it is announced by screen readers.

---

### Requirement 2: CSS Grid Layout

**User Story:** As a user, I want the dashboard to adapt gracefully across all screen sizes — from small phones to large monitors — so that the layout always feels intentional and premium.

#### Acceptance Criteria

1. THE `DashboardGrid` SHALL use `display: grid` for its two-dimensional layout; flexbox (`display: flex`) is permitted only within individual widget components, not on the grid container itself.
2. THE `DashboardGrid` SHALL define a single-column layout as its base (mobile-first) style, applicable at all viewport widths from 320px upward until a breakpoint overrides it.
3. IF the viewport width is at least 640px, THEN THE `DashboardGrid` SHALL display a two-column layout via `grid-template-columns` producing exactly two equal-width columns.
4. IF the viewport width is at least 1024px, THEN THE `DashboardGrid` SHALL display a three-column layout via `grid-template-columns` producing exactly three equal-width columns.
5. IF the viewport width is at least 1440px, THEN THE `DashboardGrid` SHALL display a four-column layout via `grid-template-columns` producing exactly four equal-width columns.
6. THE `DashboardGrid` SHALL use `minmax(0, 1fr)` or `minmax(min(100%, 280px), 1fr)` for each column track to prevent any column from overflowing its container at viewport widths as narrow as 320px.
7. THE `DashboardGrid` SHALL apply a `gap` of no less than `16px` at viewport widths below 640px, no less than `20px` at viewport widths between 640px and 1023px, and no less than `24px` at viewport widths of 1024px and above.
8. THE `HeroBalanceCard` grid item SHALL carry the CSS property `grid-column: 1 / -1` at all breakpoints, causing it to span all available columns regardless of the active column count.

---

### Requirement 3: Widget Isolation

**User Story:** As a developer, I want each dashboard widget to be an independent component with its own styles, so that widgets can be moved, swapped, or replaced individually in future phases.

#### Acceptance Criteria

1. THE `DashboardPage` SHALL import each of the eight widgets as a separate named export from files within `src/features/dashboard/components/`; barrel re-exports are acceptable provided each widget file remains independent.
2. EACH widget SHALL be implemented in exactly one `.tsx` file and one `.module.css` file; both files SHALL reside in `src/features/dashboard/components/` (flat or in a same-named subdirectory).
3. EACH widget component function SHALL declare all its props through an explicit `interface` or `type` alias; no prop SHALL be typed as `any`, `unknown` without a type guard, or left implicitly untyped.
4. NO widget's `.tsx` file SHALL contain an import whose resolved path points to another widget's `.tsx` or `.module.css` file.
5. IF a UI element (e.g., a card shell `<div>` with shared border/shadow styling) is used by two or more widgets, THEN that element SHALL be extracted to a named component in `src/components/common/` and each widget SHALL import it from there independently; shared TypeScript types SHALL be placed in `src/types/`.

---

### Requirement 4: HeroBalanceCard Widget

**User Story:** As a user, I want a prominent balance display at the top of the dashboard, so that my total financial position is immediately visible.

#### Acceptance Criteria

1. THE `HeroBalanceCard` SHALL render an `<h2>` element with the text content "Total Balance" as the widget's visible heading.
2. IF the `balance` prop is `undefined`, THEN THE `HeroBalanceCard` SHALL display the string `$0.00` in the balance amount element.
3. THE `HeroBalanceCard` SHALL render a static sub-label with the exact text "All accounts combined" below the balance amount.
4. THE `HeroBalanceCard` SHALL reference only CSS custom properties from Shell_Tokens and Theme_Tokens for all colour values; no hardcoded `#hex`, `rgb()`, or `hsl()` literals are permitted in its `.module.css` file.
5. THE `HeroBalanceCard` grid item SHALL carry `grid-column: 1 / -1` so it spans all columns at every breakpoint.
6. THE `HeroBalanceCard` SHALL accept a `balance` prop typed as `number | undefined` with a default value of `undefined`; when provided, the balance SHALL be formatted as a USD currency string with two decimal places.

---

### Requirement 5: IncomeCard Widget

**User Story:** As a user, I want to see an income summary widget on the dashboard, so that I can quickly gauge my earnings at a glance.

#### Acceptance Criteria

1. THE `IncomeCard` SHALL render an `<h2>` (or `<h3>`) element with the text content "Income" and a `TrendingUp` icon from `lucide-react` displayed alongside the heading; the icon SHALL have `aria-hidden="true"`.
2. IF the `amount` prop is `undefined`, THEN THE `IncomeCard` SHALL display the string `$0.00` in its amount element.
3. THE `IncomeCard` SHALL render a static period label with the exact text "This month".
4. THE `IncomeCard` SHALL reference only Shell_Tokens and Theme_Tokens for all colour values in its `.module.css` file.
5. THE `IncomeCard` SHALL accept an `amount` prop typed as `number | undefined` with a default value of `undefined`; when provided, the amount SHALL be formatted as a USD currency string with two decimal places.

---

### Requirement 6: ExpenseCard Widget

**User Story:** As a user, I want to see an expenses summary widget on the dashboard, so that I can quickly gauge my spending at a glance.

#### Acceptance Criteria

1. THE `ExpenseCard` SHALL render an `<h2>` (or `<h3>`) element with the text content "Expenses" and a `TrendingDown` icon from `lucide-react` displayed alongside the heading; the icon SHALL have `aria-hidden="true"`.
2. IF the `amount` prop is `undefined`, THEN THE `ExpenseCard` SHALL display the string `$0.00` in its amount element.
3. THE `ExpenseCard` SHALL render a static period label with the exact text "This month".
4. THE `ExpenseCard` SHALL reference only Shell_Tokens and Theme_Tokens for all colour values in its `.module.css` file.
5. THE `ExpenseCard` SHALL accept an `amount` prop typed as `number | undefined` with a default value of `undefined`; when provided, the amount SHALL be formatted as a USD currency string with two decimal places.

---

### Requirement 7: SavingsGoalCard Widget

**User Story:** As a user, I want to see a savings goal progress widget, so that I can track how close I am to reaching my goal.

#### Acceptance Criteria

1. THE `SavingsGoalCard` SHALL render an `<h2>` (or `<h3>`) element with the text content "Savings Goal" and a `PiggyBank` icon from `lucide-react`; the icon SHALL have `aria-hidden="true"`.
2. THE `SavingsGoalCard` SHALL include a CSS-only progress bar track element with a minimum height of `4px` and a filled inner element whose `width` CSS property is set to `<progress>%`; IF `progress` is `0`, THEN the filled element SHALL have `width: 0%` while the track container remains visible.
3. THE `SavingsGoalCard` SHALL display a textual label formatted as `$<savedAmount> of $<goalAmount>` where each amount is rounded to two decimal places; IF both props default to `0`, THEN the label SHALL read `$0.00 of $0.00`.
4. THE `SavingsGoalCard` SHALL accept a `progress` prop typed as `number` with a default value of `0`; values below `0` SHALL be clamped to `0` and values above `100` SHALL be clamped to `100` before being applied as the progress bar fill width; additionally, it SHALL accept `savedAmount` and `goalAmount` props both typed as `number` with default values of `0`.
5. THE `SavingsGoalCard` SHALL reference only Shell_Tokens and Theme_Tokens for all colour values in its `.module.css` file.

---

### Requirement 8: BudgetProgressCard Widget

**User Story:** As a user, I want to see a budget usage widget, so that I can tell at a glance whether I am over or under budget.

#### Acceptance Criteria

1. THE `BudgetProgressCard` SHALL render an `<h2>` (or `<h3>`) element with the text content "Budget" and a `Wallet` icon from `lucide-react`; the icon SHALL have `aria-hidden="true"`.
2. THE `BudgetProgressCard` SHALL include a CSS-only progress bar track element with a minimum height of `4px` and a filled inner element whose `width` CSS property is set to `<used>%`; IF `used` is `0`, THEN the filled element SHALL have `width: 0%` while the track container remains visible.
3. THE `BudgetProgressCard` SHALL display a textual label formatted as `$<spent> of $<total> used` where each amount is rounded to two decimal places; IF all props default to `0`, THEN the label SHALL read `$0.00 of $0.00 used`.
4. THE `BudgetProgressCard` SHALL accept a `used` prop typed as `number` (0–100) with a default value of `0`, a `spent` prop typed as `number` with a default value of `0`, and a `total` prop typed as `number` with a default value of `0`.
5. THE `BudgetProgressCard` SHALL reference only Shell_Tokens and Theme_Tokens for all colour values in its `.module.css` file.
6. IF `used` is `100`, THEN THE `BudgetProgressCard` SHALL apply a visually distinct over-budget style to the progress bar fill (e.g., using `--accent` or a warning colour token) to communicate that the full budget is consumed.

---

### Requirement 9: AnalyticsPlaceholder Widget

**User Story:** As a developer, I want a placeholder widget that reserves space for a future chart, so that the grid layout is complete and future chart integration requires only an in-place replacement.

#### Acceptance Criteria

1. THE `AnalyticsPlaceholder` SHALL render an `<h2>` (or `<h3>`) element with the text content "Analytics" and a `BarChart2` icon from `lucide-react` with `aria-hidden="true"`.
2. THE `AnalyticsPlaceholder` SHALL render a placeholder area with a dashed border using `var(--border)` and a background using `var(--accent-bg)`; the area SHALL contain a visible text label (e.g., "Chart coming soon") and SHALL NOT contain any numeric or financial data.
3. IF the viewport width is below 1024px, THEN THE `AnalyticsPlaceholder` grid item SHALL occupy a single column; IF the viewport width is at least 1024px, THEN the grid item SHALL carry `grid-column: span 2`.
4. THE `AnalyticsPlaceholder` SHALL reference only Shell_Tokens and Theme_Tokens for all colour values in its `.module.css` file.

---

### Requirement 10: RecentTransactionsPlaceholder Widget

**User Story:** As a developer, I want a placeholder widget that reserves space for a future transactions list, so that the grid layout is stable and future data integration requires only an in-place replacement.

#### Acceptance Criteria

1. THE `RecentTransactionsPlaceholder` SHALL render an `<h2>` (or `<h3>`) element with the text content "Recent Transactions" and a `ListOrdered` icon from `lucide-react` with `aria-hidden="true"`.
2. THE `RecentTransactionsPlaceholder` SHALL render either 3–5 skeleton row elements (each with a minimum height of `16px` and a background colour using `var(--border)` or `var(--accent-bg)`) or a single visible empty-state message; the placeholder content area SHALL have a minimum height of `120px`.
3. THE `RecentTransactionsPlaceholder` grid item SHALL carry `grid-column: 1 / -1` at all breakpoints, and its card content area SHALL have a minimum height of `120px` to preserve reserved space.
4. THE `RecentTransactionsPlaceholder` SHALL reference only Shell_Tokens and Theme_Tokens for all colour values in its `.module.css` file; no hardcoded `#hex`, `rgb()`, or `hsl()` literals are permitted.

---

### Requirement 11: QuickActions Widget

**User Story:** As a user, I want a quick-actions widget on the dashboard, so that I can navigate to common tasks with a single tap or click.

#### Acceptance Criteria

1. THE `QuickActions` SHALL render an `<h2>` (or `<h3>`) element with the text content "Quick Actions".
2. THE `QuickActions` SHALL render exactly four action buttons corresponding to the primary financial routes: "Add Income" (linking to `/income`), "Add Expense" (linking to `/expenses`), "Set Budget" (linking to `/budgets`), and "View Savings" (linking to `/savings`); each button SHALL display a Lucide React icon and a visible text label.
3. EACH action button in `QuickActions` SHALL have an `aria-label` attribute whose value matches the visible text label of that button.
4. WHEN an action button in `QuickActions` receives keyboard focus, THE button SHALL display a `2px solid` outline using `var(--shell-electric-blue)` with a `2px` outline offset, visible against the card background.
5. THE `QuickActions` SHALL reference only CSS custom properties from Shell_Tokens and Theme_Tokens (i.e., variables defined in `index.css`) for all colour values in its `.module.css` file.
6. WHEN an action button is activated via mouse click, keyboard Enter, or keyboard Space, THE application SHALL navigate to the button's corresponding route using `react-router-dom`'s `Link` or `useNavigate`.

---

### Requirement 12: Design Token Compliance

**User Story:** As a developer, I want all dashboard components to use only existing CSS custom properties for colour, so that the dashboard respects the design system and light/dark themes automatically.

#### Acceptance Criteria

1. EVERY `.module.css` and `.tsx` file within the dashboard feature (i.e., any component in `DashboardPage`'s render tree) SHALL reference only CSS custom properties defined in `index.css` for colour values; no hardcoded `#hex`, `rgb()`, or `hsl()` colour literals are permitted in any dashboard file.
2. THE `DashboardPage` and ALL widgets SHALL apply layout and visual styles exclusively via CSS Modules (`.module.css` files); inline `style` props containing colour-related CSS properties or `var(--token)` references are prohibited.
3. THE `DashboardPage` and ALL widgets SHALL use only named exports from `lucide-react` as icon components; raw inline `<svg>` elements, `<img>` icon assets, and components from other icon libraries are prohibited.
4. WHERE animation is applied to dashboard elements, THE animation SHALL use Framer Motion's `LazyMotion` + `domAnimation` + `m.*` API; CSS-native `transition` and `@keyframes` in `.module.css` files are permitted provided they do not duplicate a Framer Motion animation on the same element.

---

### Requirement 13: Accessibility

**User Story:** As a user relying on assistive technology, I want the dashboard to be navigable and understandable with a screen reader or keyboard alone, so that the application is inclusive.

#### Acceptance Criteria

1. THE `DashboardPage` SHALL include exactly one `<h1>` element with no `aria-hidden` attribute, which SHALL be the first heading in document order on the page.
2. EACH widget SHALL include exactly one heading element (`<h2>` or `<h3>`) that contains the widget's display name as visible text with no `aria-hidden` attribute.
3. ALL interactive elements (buttons, links) in ALL widgets SHALL appear in the natural DOM tab order and SHALL be reachable via sequential keyboard `Tab` navigation without requiring any special key combinations; no `tabindex` value less than `0` SHALL be applied to any interactive element.
4. WHEN an interactive element receives keyboard focus (`:focus-visible`), THE element SHALL display a `2px solid` outline using `var(--shell-electric-blue)` with an `outline-offset` of at least `2px`, ensuring the focus ring is visible against both light and dark theme backgrounds.
5. ALL icon elements rendered via `lucide-react` that serve a purely decorative role (i.e., the adjacent visible text already conveys the same meaning) SHALL have the attribute `aria-hidden="true"` on their component.
6. ALL icon elements that are the sole conveyor of meaning (i.e., no adjacent visible text label) SHALL have an `aria-label` attribute on the nearest interactive ancestor or a visually hidden sibling `<span>` with the icon's semantic meaning.
7. THE colour contrast ratio between the primary body text colour (`var(--text)`) and its widget background colour SHALL be at least 4.5:1 in both the default light theme and the `prefers-color-scheme: dark` theme.

---

### Requirement 14: TypeScript Quality

**User Story:** As a developer, I want all dashboard components to be fully typed, so that future refactors and IDE tooling work reliably.

#### Acceptance Criteria

1. THE `DashboardPage` and ALL widget files SHALL produce zero TypeScript compiler errors when checked with `tsc --noEmit` using the project's `tsconfig.app.json` configuration.
2. NO `.tsx` or `.ts` file in the dashboard feature tree (i.e., `src/features/dashboard/` and any components it imports from `src/components/common/`) SHALL contain an explicit `any` type annotation or an implicit `any` arising from an untyped variable, parameter, or return value in project source code (node_modules are excluded via `skipLibCheck: true`).
3. ALL component props SHALL be declared as a named `interface Props` or `type Props` (or an equivalently descriptive name) in the same file as the component; inline anonymous object type literals used directly as function parameter types are prohibited for component props.
4. ALL optional props in widget prop interfaces SHALL be marked with `?` and SHALL have corresponding default parameter values in the component function signature; a prop marked `?` without a default value in the function signature is a violation.
5. THE project's `tsconfig.app.json` SHALL include `"noImplicitAny": true` to enforce compiler-level rejection of implicit `any` types across all dashboard files.
