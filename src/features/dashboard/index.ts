/**
 * Dashboard feature — public API.
 *
 * Only surfaces the page component and shared types.
 * Internal component imports should use the component's own barrel.
 */
export { DashboardPage } from './pages'
export type {
  HeroBalanceCardProps,
  MetricCardProps,
  SavingsGoal,
  SavingsGoalCardProps,
  BudgetCategory,
  BudgetProgressCardProps,
  QuickAction,
  QuickActionsProps,
  TrendDirection,
} from './types'
