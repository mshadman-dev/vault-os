/**
 * Zod schema — Expense entry validation.
 *
 * Validates a single expense transaction form submission.
 * No business logic, no calculations, no API calls.
 */
import { z } from 'zod'

export const EXPENSE_CATEGORIES = [
  'housing',
  'food',
  'transport',
  'utilities',
  'healthcare',
  'entertainment',
  'clothing',
  'education',
  'subscriptions',
  'travel',
  'other',
] as const

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number]

export const expenseSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(Number(val)), 'Amount must be a number')
    .refine((val) => Number(val) > 0, 'Amount must be greater than zero')
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val),
      'Amount can have at most 2 decimal places',
    ),

  category: z.enum(EXPENSE_CATEGORIES, {
    errorMap: () => ({ message: 'Please select a category' }),
  }),

  date: z
    .string()
    .min(1, 'Date is required')
    .refine((val) => !isNaN(Date.parse(val)), 'Please enter a valid date'),

  note: z.string().max(500, 'Note must be 500 characters or fewer').optional(),
})

/** Inferred TypeScript type from the expense schema. */
export type ExpenseFormValues = z.infer<typeof expenseSchema>
