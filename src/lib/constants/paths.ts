/**
 * PATHS — single source of truth for all application routes.
 * Import this wherever a route string is needed: navigation config,
 * router definitions, NavLink `to` props, and programmatic navigation.
 */
export const PATHS = {
  // ── Public landing ───────────────────────────────────────────────────────
  LANDING: '/',

  // ── App routes (protected) ──────────────────────────────────────────────
  DASHBOARD: '/dashboard',
  INCOME: '/income',
  EXPENSES: '/expenses',
  ANALYTICS: '/analytics',
  BUDGETS: '/budgets',
  SAVINGS: '/savings',
  TIMELINE: '/timeline',
  SETTINGS: '/settings',

  // ── Auth routes (public) ────────────────────────────────────────────────
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
} as const

export type AppPath = (typeof PATHS)[keyof typeof PATHS]
