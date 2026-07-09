/**
 * FormField — label + control + helper/error wrapper.
 *
 * Wraps a single form control with its label, description, helper text,
 * and error message. Wires all accessibility attributes automatically.
 */
import type { ReactNode } from 'react'
import styles from './FormField.module.css'

interface FormFieldProps {
  /** The <label> text. */
  label: string
  /** `id` of the associated control — used for htmlFor / aria linkage. */
  fieldId: string
  /** When true, renders a required asterisk and sets aria-required. */
  required?: boolean
  /** Optional description shown below the label (before the control). */
  description?: string
  /** Optional helper text shown below the control. */
  helperText?: string
  /** Error message — when provided, overrides helper text and marks the field invalid. */
  error?: string
  /** The control itself. */
  children: ReactNode
}

export function FormField({
  label,
  fieldId,
  required,
  description,
  helperText,
  error,
  children,
}: FormFieldProps) {
  const errorId = error ? `${fieldId}-error` : undefined
  const descId = description ? `${fieldId}-desc` : undefined
  const helperId = helperText && !error ? `${fieldId}-helper` : undefined

  return (
    <div className={styles.field}>
      <label htmlFor={fieldId} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {' '}*
          </span>
        )}
      </label>

      {description && (
        <p id={descId} className={styles.description}>
          {description}
        </p>
      )}

      {/* Clone children with accessibility props */}
      {children}

      {error ? (
        <p id={errorId} className={styles.error} role="alert" aria-live="polite">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className={styles.helperText}>
          {helperText}
        </p>
      ) : null}
    </div>
  )
}
