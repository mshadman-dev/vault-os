/**
 * Transactions feature — public API barrel export.
 *
 * Import components and types from this path:
 *   import { TransactionList, TransactionDialog } from '@/features/transactions'
 */

// Types
export type {
  Transaction,
  TransactionType,
  TransactionFilter,
  TransactionFormValues,
} from './types'

// Constants
export {
  TRANSACTION_FILTERS,
  DEFAULT_RECENT_LIMIT,
  EMPTY_STATE_MESSAGES,
  DIALOG_TITLES,
} from './constants'

// Utils
export {
  formatCurrency,
  formatDate,
  getCategoryLabel,
  getTransactionSign,
} from './utils'

// Hooks
export { useTransactions } from './hooks/useTransactions'

// Components
export { EmptyState } from './components/EmptyState'
export { TransactionItem } from './components/TransactionItem'
export { TransactionList } from './components/TransactionList'
export { TransactionFilters } from './components/TransactionFilters'
export { TransactionDialog } from './components/TransactionDialog'
