/**
 * FormCheckbox — accessible custom checkbox.
 *
 * Uses a visually-hidden native <input type="checkbox"> behind a
 * custom visual indicator to support :focus-visible and keyboard nav
 * without sacrificing accessibility.
 *
 * Usage:
 *   <FormCheckbox
 *     id="confirm"
 *     label="I confirm this is correct"
 *     sublabel="Optional sub-label"
 *     hasError={!!errors.confirm}
 *     errorId="confirm-error"
 *     {...register('confirm')}
 *   />
 */
import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Check } from 'lucide-react'
import styles from './FormCheckbox.module.css'

interface FormCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Visible label text. */
  label: string
  /** Optional sub-label shown in smaller text below the label. */
  sublabel?: string
  /** When true, applies error styling. */
  hasError?: boolean
  /** `id` of the error element for aria-describedby linkage. */
  errorId?: string
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, sublabel, hasError, errorId, className, id, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={[
          styles.wrapper,
          props.disabled ? styles.disabled : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className={styles.nativeInput}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={errorId ?? undefined}
          {...props}
        />
        <span className={styles.box} aria-hidden="true">
          <Check className={styles.checkmark} size={12} strokeWidth={3} />
        </span>
        <span className={styles.labelContent}>
          <span className={styles.label}>{label}</span>
          {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
        </span>
      </label>
    )
  },
)

FormCheckbox.displayName = 'FormCheckbox'
