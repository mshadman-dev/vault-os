import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Wallet,
  PiggyBank,
  CalendarDays,
  Settings,
} from 'lucide-react'
import type { NavItem } from '../../types/navigation'
import { PATHS } from './paths'

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: PATHS.DASHBOARD,
    icon: LayoutDashboard,
    end: true,
  },
  {
    id: 'income',
    label: 'Income',
    path: PATHS.INCOME,
    icon: TrendingUp,
  },
  {
    id: 'expenses',
    label: 'Expenses',
    path: PATHS.EXPENSES,
    icon: TrendingDown,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: PATHS.ANALYTICS,
    icon: BarChart2,
  },
  {
    id: 'budgets',
    label: 'Budgets',
    path: PATHS.BUDGETS,
    icon: Wallet,
  },
  {
    id: 'savings',
    label: 'Savings',
    path: PATHS.SAVINGS,
    icon: PiggyBank,
  },
  {
    id: 'timeline',
    label: 'Timeline',
    path: PATHS.TIMELINE,
    icon: CalendarDays,
  },
  {
    id: 'settings',
    label: 'Settings',
    path: PATHS.SETTINGS,
    icon: Settings,
  },
]
