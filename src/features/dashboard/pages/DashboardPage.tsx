import { useState } from 'react'
import {
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  Target,
  Download,
} from 'lucide-react'
import { HeroBalanceCard } from '../components/HeroBalanceCard'
import { IncomeCard } from '../components/IncomeCard'
import { ExpenseCard } from '../components/ExpenseCard'
import { SavingsGoalCard } from '../components/SavingsGoalCard'
import { BudgetProgressCard } from '../components/BudgetProgressCard'
import { AnalyticsPlaceholder } from '../components/AnalyticsPlaceholder'
import { QuickActions } from '../components/QuickActions'
import {
  TransactionList,
  TransactionDialog,
} from '../../transactions'
import type { TransactionType, TransactionFormValues, Transaction } from '../../transactions'
import {
  useTransactionsStore,
  useSettingsStore,
  selectCurrency,
  selectLocale,
} from '../../../store'
import { formatCurrency } from '../../transactions/utils'
import type { QuickAction, SavingsGoal, BudgetCategory } from '../types'
import styles from './DashboardPage.module.css'

/**
 * DashboardPage — assembles all dashboard widgets with live transaction data.
 *
 * Layout rows:
 *   1. HeroBalanceCard          (full width)
 *   2. IncomeCard | ExpenseCard (2-col)
 *   3. SavingsGoalCard | BudgetProgressCard (2-col)
 *   4. AnalyticsPlaceholder     (full width)
 *   5. TransactionList          (full width)
 *   6. QuickActions             (full width)
 *   +  TransactionDialog        (portal/modal)
 */

interface DialogState {
  isOpen: boolean
  mode: 'add' | 'edit'
  type: TransactionType
  transaction?: Transaction
}

const SAVINGS_GOALS: SavingsGoal[] = []
const BUDGET_CATEGORIES: BudgetCategory[] = []

export function DashboardPage() {
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    mode: 'add',
    type: 'income',
  })

  // Store access
  const transactions = useTransactionsStore((s) => s.transactions)
  const addTransaction = useTransactionsStore((s) => s.addTransaction)
  const updateTransaction = useTransactionsStore((s) => s.updateTransaction)
  const deleteTransaction = useTransactionsStore((s) => s.deleteTransaction)
  const currency = useSettingsStore(selectCurrency)
  const locale = useSettingsStore(selectLocale)

  // Derived values
  const hasTransactions = transactions.length > 0
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpense

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  const formattedBalance = hasTransactions
    ? formatCurrency(balance, currency, locale)
    : '—'
  const formattedIncome = hasTransactions
    ? formatCurrency(totalIncome, currency, locale)
    : '—'
  const formattedExpense = hasTransactions
    ? formatCurrency(totalExpense, currency, locale)
    : '—'

  // Dialog helpers
  const openAddDialog = (type: TransactionType) => {
    setDialogState({ isOpen: true, mode: 'add', type })
  }

  const openEditDialog = (id: string) => {
    const t = transactions.find((x) => x.id === id)
    if (t) {
      setDialogState({ isOpen: true, mode: 'edit', type: t.type, transaction: t })
    }
  }

  const closeDialog = () => {
    setDialogState((s) => ({ ...s, isOpen: false }))
  }

  const handleSubmit = (values: TransactionFormValues) => {
    if (dialogState.mode === 'add') {
      addTransaction({
        type: values.type,
        amount: parseFloat(values.amount),
        category: values.category,
        note: values.note,
        date: values.date,
      })
    } else if (dialogState.transaction) {
      updateTransaction(dialogState.transaction.id, {
        amount: parseFloat(values.amount),
        category: values.category,
        note: values.note,
        date: values.date,
      })
    }
    closeDialog()
  }

  const QUICK_ACTIONS: QuickAction[] = [
    {
      id: 'add-income',
      label: 'Add Income',
      icon: ArrowDownLeft,
      onClick: () => openAddDialog('income'),
    },
    {
      id: 'add-expense',
      label: 'Add Expense',
      icon: ArrowUpRight,
      onClick: () => openAddDialog('expense'),
    },
    {
      id: 'new-goal',
      label: 'New Goal',
      icon: Target,
      onClick: () => undefined,
    },
    {
      id: 'new-budget',
      label: 'New Budget',
      icon: Plus,
      onClick: () => undefined,
    },
    {
      id: 'export',
      label: 'Export',
      icon: Download,
      onClick: () => undefined,
    },
  ]

  return (
    <div className={styles.root}>
      {/* Page header */}
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageSubtitle}>Your financial overview.</p>
      </header>

      {/* Row 1 — Net balance hero */}
      <HeroBalanceCard label="Net Balance" value={formattedBalance} />

      {/* Row 2 — Income & Expense */}
      <div className={styles.twoCol}>
        <IncomeCard label="Income" value={formattedIncome} />
        <ExpenseCard label="Expenses" value={formattedExpense} />
      </div>

      {/* Row 3 — Savings & Budget */}
      <div className={styles.twoCol}>
        <SavingsGoalCard goals={SAVINGS_GOALS} />
        <BudgetProgressCard categories={BUDGET_CATEGORIES} />
      </div>

      {/* Row 4 — Analytics placeholder */}
      <AnalyticsPlaceholder />

      {/* Row 5 — Recent transactions */}
      <TransactionList
        transactions={recentTransactions}
        onEdit={openEditDialog}
        onDelete={deleteTransaction}
        currency={currency}
        locale={locale}
        emptyMessage="No transactions yet"
        onAdd={() => openAddDialog('income')}
      />

      {/* Row 6 — Quick actions */}
      <QuickActions actions={QUICK_ACTIONS} />

      {/* Transaction dialog */}
      <TransactionDialog
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        mode={dialogState.mode}
        type={dialogState.type}
        transaction={dialogState.transaction}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
