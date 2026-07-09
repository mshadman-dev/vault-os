/**
 * Zod schema — Savings goal validation.
 *
 * Validates a savings goal form submission.
 * No business logic, no calculations, no API calls.
 */
import { z } from 'zod'

export const savingsSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must be 100 characters or fewer'),

  targetAmount: z
    .string()
    .min(1, 'Target amount is required')
    .refine((val) => !isNaN(Number(val)), 'Target amount must be a number')
    .refine((val) => Number(val) > 0, 'Target amount must be greater than zero')
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val),
      'Target amount can have at most 2 decimal places',
    ),

  deadline: z
    .string()
    .min(1, 'Deadline is required')
    .refine((val) => !isNaN(Date.parse(val)), 'Please enter a valid date')
    .refine((val) => {
      const date = new Date(val)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return date >= today
    }, 'Deadline must be today or in the future'),
})

/** Inferred TypeScript type from the savings schema. */
export type SavingsFormValues = z.infer<typeof savingsSchema>
