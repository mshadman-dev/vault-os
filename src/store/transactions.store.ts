/**
 * Transactions Store — persistent list of all income and expense entries.
 *
 * Each transaction has a UUID, type, amount, category, optional note,
 * a date string (YYYY-MM-DD), and audit timestamps.
 *
 * Only the `transactions` array is written to localStorage via persist.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createPersistConfig, STORAGE_KEYS } from './persist'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  category: string
  note?: string
  /** ISO date string (YYYY-MM-DD) — the date the transaction occurred. */
  date: string
  /** ISO datetime string — when the record was created. */
  createdAt: string
  /** ISO datetime string — when the record was last updated. */
  updatedAt: string
}

// ─── State & actions shape ────────────────────────────────────────────────────

export interface TransactionsState {
  transactions: Transaction[]
}

export interface TransactionsActions {
  addTransaction: (
    data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>,
  ) => void
  updateTransaction: (
    id: string,
    data: Partial<Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>>,
  ) => void
  deleteTransaction: (id: string) => void
  clearTransactions: () => void
  getTransactionById: (id: string) => Transaction | undefined
}

// ─── Persist config ───────────────────────────────────────────────────────────

const persistConfig = createPersistConfig<TransactionsState & TransactionsActions>(
  STORAGE_KEYS.TRANSACTIONS,
  (state): Partial<TransactionsState & TransactionsActions> => ({
    transactions: state.transactions,
  }),
)

// ─── Store ────────────────────────────────────────────────────────────────────

export const useTransactionsStore = create<TransactionsState & TransactionsActions>()(
  persist(
    (set, get) => ({
      transactions: [],

      addTransaction: (data) => {
        const now = new Date().toISOString()
        const newTransaction: Transaction = {
          id: crypto.randomUUID(),
          ...data,
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({
          transactions: [...state.transactions, newTransaction],
        }))
      },

      updateTransaction: (id, data) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t,
          ),
        }))
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }))
      },

      clearTransactions: () => set({ transactions: [] }),

      getTransactionById: (id) => get().transactions.find((t) => t.id === id),
    }),
    persistConfig,
  ),
)
