/**
 * Transactions feature — shared types.
 *
 * Mirrors the store Transaction type but lives inside the feature
 * so components can import from a feature-local path.
 */

export type TransactionType = 'income' | 'expense'

export type TransactionFilter = 'all' | 'income' | 'expense'

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  category: string
  note?: string
  /** ISO date string (YYYY-MM-DD) */
  date: string
  /** ISO datetime string */
  createdAt: string
  /** ISO datetime string */
  updatedAt: string
}

/** Values used in the add/edit transaction form. */
export interface TransactionFormValues {
  type: TransactionType
  /** String for form input; parse to number on submit. */
  amount: string
  category: string
  note?: string
  date: string
}
