/**
 * Dashboard Store — view-selection state for the dashboard feature.
 *
 * Holds filter/selection values that control which slice of data the
 * dashboard displays.  No business logic, no calculations, no API calls,
 * no mock data — just plain setters.
 *
 * Not persisted: these selections reset on every page load.
 */

import { create } from 'zustand'

// ─── Types ────────────────────────────────────────────────────────────────────

/** Supported time-range filter values. */
export type TimeRange = '7d' | '30d' | '90d' | '1y' | 'all'

// ─── State shape ─────────────────────────────────────────────────────────────

export interface DashboardState {
  /** Currently selected time range for dashboard metrics. */
  selectedTimeRange: TimeRange
  /** ID of the currently selected account, or null for "all accounts". */
  selectedAccountId: string | null
  /** ID of the budget category that is currently active / expanded. */
  activeBudgetId: string | null
}

// ─── Action shape ─────────────────────────────────────────────────────────────

export interface DashboardActions {
  setSelectedTimeRange: (range: TimeRange) => void
  setSelectedAccountId: (accountId: string | null) => void
  setActiveBudgetId: (budgetId: string | null) => void
}

// ─── Initial state ────────────────────────────────────────────────────────────

const INITIAL_STATE: DashboardState = {
  selectedTimeRange: '30d',
  selectedAccountId: null,
  activeBudgetId: null,
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useDashboardStore = create<DashboardState & DashboardActions>()(
  (set) => ({
    ...INITIAL_STATE,

    setSelectedTimeRange: (range) =>
      set({ selectedTimeRange: range }),

    setSelectedAccountId: (accountId) =>
      set({ selectedAccountId: accountId }),

    setActiveBudgetId: (budgetId) =>
      set({ activeBudgetId: budgetId }),
  }),
)
