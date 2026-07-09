/**
 * FormSelect — accessible dropdown.
 *
 * Designed to be used inside <FormField>.
 *
 * Usage:
 *   <FormField label="Category" fieldId="category" required error={errors.category?.message}>
 *     <FormSelect
 *       id="category"
 *       hasError={!!errors.category}
 *       {...register('category')}
 *     >
 *       <option value="">Select category…</option>
 *       {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
 *     </FormSelect>
 *   </FormField>
 */
import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'
import styles from './FormSelect.module.css'

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** When true, applies error styling and sets aria-invalid. */
  hasError?: boolean
  /** `id` of the error element for aria-describedby linkage. */
  errorId?: string
  /** `id` of helper text for aria-describedby linkage. */
  helperId?: string
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ hasError, errorId, helperId, className, children, ...props }, ref) => {
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined

    return (
      <select
        ref={ref}
        className={[styles.select, className].filter(Boolean).join(' ')}
        aria-invalid={hasError ? 'true' : undefined}
        aria-describedby={describedBy}
        {...props}
      >
        {children}
      </select>
    )
  },
)

FormSelect.displayName = 'FormSelect'
