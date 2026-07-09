/**
 * Dashboard feature — UI constants.
 */

export const BREAKPOINTS = {
  SM: 480,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const

export const CARD_TRANSITION = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
} as const

export const STAGGER_DELAY = 0.06 as const

export const EMPTY_STATE_LABEL = 'No data yet' as const

export const ARIA_LABELS = {
  HERO_BALANCE: 'Net balance overview',
  INCOME_CARD: 'Income summary',
  EXPENSE_CARD: 'Expense summary',
  SAVINGS_GOALS: 'Savings goals progress',
  BUDGET_PROGRESS: 'Budget categories progress',
  ANALYTICS_PLACEHOLDER: 'Analytics — coming soon',
  TRANSACTIONS_PLACEHOLDER: 'Recent transactions — coming soon',
  QUICK_ACTIONS: 'Quick actions',
} as const
