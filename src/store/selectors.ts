/**
 * Selectors — stable, reusable state slicers.
 *
 * Each selector is a plain function that extracts a specific slice from a
 * store slice type.  Passing these to `useXxxStore(selector)` means the
 * component only re-renders when that specific slice changes, rather than
 * on every store update.
 *
 * Pattern:
 *   const value = useUIStore(selectSidebarCollapsed)
 *   // vs.
 *   const { sidebarCollapsed } = useUIStore()  ← re-renders on any change
 */

import type { UIState, UIActions } from './ui.store'
import type { DashboardState, DashboardActions } from './dashboard.store'
import type { SettingsState, SettingsActions } from './settings.store'

// ─── UI selectors ─────────────────────────────────────────────────────────────

export const selectSidebarCollapsed = (s: UIState & UIActions): boolean =>
  s.sidebarCollapsed

export const selectMobileDrawerOpen = (s: UIState & UIActions): boolean =>
  s.mobileDrawerOpen

export const selectLoading = (s: UIState & UIActions): boolean => s.loading

/** Selector for all sidebar-related actions (stable object reference via Zustand). */
export const selectSidebarActions = (
  s: UIState & UIActions,
): Pick<UIActions, 'toggleSidebar' | 'setSidebarCollapsed'> => ({
  toggleSidebar: s.toggleSidebar,
  setSidebarCollapsed: s.setSidebarCollapsed,
})

/** Selector for all drawer-related actions. */
export const selectDrawerActions = (
  s: UIState & UIActions,
): Pick<UIActions, 'openDrawer' | 'closeDrawer' | 'toggleDrawer'> => ({
  openDrawer: s.openDrawer,
  closeDrawer: s.closeDrawer,
  toggleDrawer: s.toggleDrawer,
})

// ─── Dashboard selectors ──────────────────────────────────────────────────────

export const selectSelectedTimeRange = (
  s: DashboardState & DashboardActions,
): DashboardState['selectedTimeRange'] => s.selectedTimeRange

export const selectSelectedAccountId = (
  s: DashboardState & DashboardActions,
): DashboardState['selectedAccountId'] => s.selectedAccountId

export const selectActiveBudgetId = (
  s: DashboardState & DashboardActions,
): DashboardState['activeBudgetId'] => s.activeBudgetId

/** Selector for all dashboard setter actions. */
export const selectDashboardActions = (
  s: DashboardState & DashboardActions,
): Pick<
  DashboardActions,
  'setSelectedTimeRange' | 'setSelectedAccountId' | 'setActiveBudgetId'
> => ({
  setSelectedTimeRange: s.setSelectedTimeRange,
  setSelectedAccountId: s.setSelectedAccountId,
  setActiveBudgetId: s.setActiveBudgetId,
})

// ─── Settings selectors ───────────────────────────────────────────────────────

export const selectTheme = (s: SettingsState & SettingsActions): SettingsState['theme'] =>
  s.theme

export const selectCurrency = (s: SettingsState & SettingsActions): SettingsState['currency'] =>
  s.currency

export const selectLocale = (s: SettingsState & SettingsActions): SettingsState['locale'] =>
  s.locale

export const selectCompactMode = (s: SettingsState & SettingsActions): boolean =>
  s.compactMode

/** Selector for all settings setter actions. */
export const selectSettingsActions = (
  s: SettingsState & SettingsActions,
): Pick<
  SettingsActions,
  'setTheme' | 'setCurrency' | 'setLocale' | 'setCompactMode'
> => ({
  setTheme: s.setTheme,
  setCurrency: s.setCurrency,
  setLocale: s.setLocale,
  setCompactMode: s.setCompactMode,
})
