/**
 * useTransactions — hook for consuming transaction state.
 *
 * Returns filtered transactions, derived totals, and formatted
 * currency values ready for display.
 */

import { useMemo } from 'react'
import { useTransactionsStore, useSettingsStore, selectCurrency, selectLocale } from '../../../store'
import { selectTotalIncome, selectTotalExpense, selectBalance } from '../../../store/selectors'
import { formatCurrency } from '../utils'
import type { TransactionFilter, Transaction } from '../types'

export interface UseTransactionsResult {
  transactions: Transaction[]
  totalIncome: number
  totalExpense: number
  balance: number
  formattedIncome: string
  formattedExpense: string
  formattedBalance: string
}

export function useTransactions(filter: TransactionFilter = 'all'): UseTransactionsResult {
  const allTransactions = useTransactionsStore((s) => s.transactions)
  const totalIncome = useTransactionsStore(selectTotalIncome)
  const totalExpense = useTransactionsStore(selectTotalExpense)
  const balance = useTransactionsStore(selectBalance)
  const currency = useSettingsStore(selectCurrency)
  const locale = useSettingsStore(selectLocale)

  const transactions = useMemo<Transaction[]>(() => {
    if (filter === 'all') return allTransactions
    return allTransactions.filter((t) => t.type === filter)
  }, [allTransactions, filter])

  const formattedIncome = formatCurrency(totalIncome, currency, locale)
  const formattedExpense = formatCurrency(totalExpense, currency, locale)
  const formattedBalance = formatCurrency(balance, currency, locale)

  return {
    transactions,
    totalIncome,
    totalExpense,
    balance,
    formattedIncome,
    formattedExpense,
    formattedBalance,
  }
}
