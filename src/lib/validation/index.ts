/**
 * Barrel export — validation schemas and inferred types.
 *
 * Import everything through this file:
 *   import { incomeSchema, type IncomeFormValues } from '@/lib/validation'
 */
export {
  incomeSchema,
  INCOME_CATEGORIES,
  type IncomeCategory,
  type IncomeFormValues,
} from './income.schema'

export {
  expenseSchema,
  EXPENSE_CATEGORIES,
  type ExpenseCategory,
  type ExpenseFormValues,
} from './expense.schema'

export {
  budgetSchema,
  BUDGET_CATEGORIES,
  type BudgetCategory,
  type BudgetFormValues,
} from './budget.schema'

export {
  savingsSchema,
  type SavingsFormValues,
} from './savings.schema'

export {
  loginSchema,
  type LoginFormValues,
  signupSchema,
  type SignupFormValues,
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from './auth.schema'
