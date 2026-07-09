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
import { RecentTransactionsPlaceholder } from '../components/RecentTransactionsPlaceholder'
import { QuickActions } from '../components/QuickActions'
import type { QuickAction, SavingsGoal, BudgetCategory } from '../types'
import styles from './DashboardPage.module.css'

/**
 * DashboardPage — assembles all dashboard widgets in the defined layout.
 *
 * Layout rows:
 *   1. HeroBalanceCard          (full width)
 *   2. IncomeCard | ExpenseCard (2-col)
 *   3. SavingsGoalCard | BudgetProgressCard (2-col)
 *   4. AnalyticsPlaceholder     (full width)
 *   5. RecentTransactionsPlaceholder (full width)
 *   6. QuickActions             (full width)
 *
 * No business logic, no API calls, no fake financial values.
 * All widget data uses intentionally empty/neutral placeholder state.
 */

/** Empty-state placeholder value shown before real data arrives. */
const EMPTY_VALUE = '—'

const SAVINGS_GOALS: SavingsGoal[] = []

const BUDGET_CATEGORIES: BudgetCategory[] = []

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'add-income',
    label: 'Add Income',
    icon: ArrowDownLeft,
    onClick: () => undefined,
  },
  {
    id: 'add-expense',
    label: 'Add Expense',
    icon: ArrowUpRight,
    onClick: () => undefined,
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

export function DashboardPage() {
  return (
    <div className={styles.root}>
      {/* Page header */}
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageSubtitle}>Your financial overview.</p>
      </header>

      {/* Row 1 — Net balance hero */}
      <HeroBalanceCard
        label="Net Balance"
        value={EMPTY_VALUE}
      />

      {/* Row 2 — Income & Expense */}
      <div className={styles.twoCol}>
        <IncomeCard
          label="Income"
          value={EMPTY_VALUE}
        />
        <ExpenseCard
          label="Expenses"
          value={EMPTY_VALUE}
        />
      </div>

      {/* Row 3 — Savings & Budget */}
      <div className={styles.twoCol}>
        <SavingsGoalCard goals={SAVINGS_GOALS} />
        <BudgetProgressCard categories={BUDGET_CATEGORIES} />
      </div>

      {/* Row 4 — Analytics placeholder */}
      <AnalyticsPlaceholder />

      {/* Row 5 — Recent transactions placeholder */}
      <RecentTransactionsPlaceholder />

      {/* Row 6 — Quick actions */}
      <QuickActions actions={QUICK_ACTIONS} />
    </div>
  )
}
