import type { ComponentType } from 'react'

export type TrendDirection = 'up' | 'down' | 'neutral'

export interface MetricCardProps {
  label: string
  value: string
  trend?: TrendDirection
  trendLabel?: string
}

export interface HeroBalanceCardProps {
  label: string
  value: string
}

export interface SavingsGoal {
  id: string
  name: string
  progressPercent: number
  amountLabel: string
}

export interface SavingsGoalCardProps {
  goals: SavingsGoal[]
}

export interface BudgetCategory {
  id: string
  name: string
  spentPercent: number
  amountLabel: string
  isOverBudget: boolean
}

export interface BudgetProgressCardProps {
  categories: BudgetCategory[]
}

export interface QuickAction {
  id: string
  label: string
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
  onClick: () => void
}

export interface QuickActionsProps {
  actions: QuickAction[]
}
