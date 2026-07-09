/**
 * PATHS — single source of truth for all application routes.
 * Import this wherever a route string is needed: navigation config,
 * router definitions, NavLink `to` props, and programmatic navigation.
 */
export const PATHS = {
  DASHBOARD: '/',
  INCOME: '/income',
  EXPENSES: '/expenses',
  ANALYTICS: '/analytics',
  BUDGETS: '/budgets',
  SAVINGS: '/savings',
  TIMELINE: '/timeline',
  SETTINGS: '/settings',
} as const

export type AppPath = (typeof PATHS)[keyof typeof PATHS]
