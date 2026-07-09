/**
 * Transactions feature — UI constants.
 */

import type { TransactionFilter } from './types'

/** Filter tab definitions shown in the TransactionFilters component. */
export const TRANSACTION_FILTERS: { value: TransactionFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
]

/** Default number of recent transactions shown on the dashboard. */
export const DEFAULT_RECENT_LIMIT = 5

/** Empty-state messages per active filter. */
export const EMPTY_STATE_MESSAGES: Record<TransactionFilter, string> = {
  all: 'No transactions yet. Add your first one!',
  income: 'No income entries yet.',
  expense: 'No expense entries yet.',
}

/** Dialog title copy per mode and type. */
export const DIALOG_TITLES = {
  add: {
    income: 'Add Income',
    expense: 'Add Expense',
  },
  edit: {
    income: 'Edit Income',
    expense: 'Edit Expense',
  },
} as const
