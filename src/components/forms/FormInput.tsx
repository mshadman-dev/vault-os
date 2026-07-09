/**
 * FormInput — single-line text / number / date / email input.
 *
 * Designed to be used inside <FormField>. Pass the same `id` to both
 * so the label `htmlFor` links correctly.
 *
 * Usage:
 *   <FormField label="Amount" fieldId="amount" required error={errors.amount?.message}>
 *     <FormInput
 *       id="amount"
 *       type="number"
 *       placeholder="0.00"
 *       hasError={!!errors.amount}
 *       {...register('amount')}
 *     />
 *   </FormField>
 */
import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import styles from './FormInput.module.css'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** When true, applies error styling and sets aria-invalid. */
  hasError?: boolean
  /** `id` of the error element for aria-describedby linkage. */
  errorId?: string
  /** `id` of helper/description text for aria-describedby linkage. */
  helperId?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ hasError, errorId, helperId, className, ...props }, ref) => {
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined

    return (
      <input
        ref={ref}
        className={[styles.input, className].filter(Boolean).join(' ')}
        aria-invalid={hasError ? 'true' : undefined}
        aria-describedby={describedBy}
        {...props}
      />
    )
  },
)

FormInput.displayName = 'FormInput'
