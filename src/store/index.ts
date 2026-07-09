/**
 * Store barrel — single import point for all state management.
 *
 * Consumers import everything from 'src/store' (or '../store', etc.):
 *
 *   import { useUIStore, selectSidebarCollapsed } from '../store'
 *   import { useSettingsStore, selectTheme }       from '../store'
 *   import { useDashboardStore, selectSelectedTimeRange } from '../store'
 */

// ─── Stores ───────────────────────────────────────────────────────────────────

export { useUIStore } from './ui.store'
export type { UIState, UIActions } from './ui.store'

export { useDashboardStore } from './dashboard.store'
export type { DashboardState, DashboardActions, TimeRange } from './dashboard.store'

export { useSettingsStore } from './settings.store'
export type { SettingsState, SettingsActions, Theme, CurrencyCode, LocaleTag } from './settings.store'

export { useTransactionsStore } from './transactions.store'
export type { TransactionsState, TransactionsActions, Transaction } from './transactions.store'

// ─── Selectors ────────────────────────────────────────────────────────────────

export {
  // UI
  selectSidebarCollapsed,
  selectMobileDrawerOpen,
  selectLoading,
  selectSidebarActions,
  selectDrawerActions,
  // Dashboard
  selectSelectedTimeRange,
  selectSelectedAccountId,
  selectActiveBudgetId,
  selectDashboardActions,
  // Settings
  selectTheme,
  selectCurrency,
  selectLocale,
  selectCompactMode,
  selectSettingsActions,
  // Transactions
  selectTotalIncome,
  selectTotalExpense,
  selectBalance,
  selectRecentTransactions,
} from './selectors'

// ─── Persistence ──────────────────────────────────────────────────────────────

export { createPersistConfig, STORAGE_KEYS } from './persist'
