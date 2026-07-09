/**
 * Zod schema — Budget category validation.
 *
 * Validates a budget limit form submission.
 * No business logic, no calculations, no API calls.
 */
import { z } from 'zod'

export const BUDGET_CATEGORIES = [
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

export type BudgetCategory = (typeof BUDGET_CATEGORIES)[number]

export const budgetSchema = z.object({
  category: z.enum(BUDGET_CATEGORIES, {
    errorMap: () => ({ message: 'Please select a category' }),
  }),

  limit: z
    .string()
    .min(1, 'Limit is required')
    .refine((val) => !isNaN(Number(val)), 'Limit must be a number')
    .refine((val) => Number(val) > 0, 'Limit must be greater than zero')
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val),
      'Limit can have at most 2 decimal places',
    ),
})

/** Inferred TypeScript type from the budget schema. */
export type BudgetFormValues = z.infer<typeof budgetSchema>
