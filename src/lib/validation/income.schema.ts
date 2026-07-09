/**
 * Zod schema — Income entry validation.
 *
 * Validates a single income transaction form submission.
 * No business logic, no calculations, no API calls.
 */
import { z } from 'zod'

export const INCOME_CATEGORIES = [
  'salary',
  'freelance',
  'investment',
  'rental',
  'gift',
  'refund',
  'other',
] as const

export type IncomeCategory = (typeof INCOME_CATEGORIES)[number]

export const incomeSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(Number(val)), 'Amount must be a number')
    .refine((val) => Number(val) > 0, 'Amount must be greater than zero')
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val),
      'Amount can have at most 2 decimal places',
    ),

  category: z.enum(INCOME_CATEGORIES, {
    errorMap: () => ({ message: 'Please select a category' }),
  }),

  date: z
    .string()
    .min(1, 'Date is required')
    .refine((val) => !isNaN(Date.parse(val)), 'Please enter a valid date'),

  note: z.string().max(500, 'Note must be 500 characters or fewer').optional(),
})

/** Inferred TypeScript type from the income schema. */
export type IncomeFormValues = z.infer<typeof incomeSchema>
