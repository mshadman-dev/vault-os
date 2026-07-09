/**
 * Form — root form container.
 *
 * Wraps <form> with consistent spacing and a11y attributes.
 * Accepts all native form props plus an optional `aria-label`.
 */
import type { FormHTMLAttributes } from 'react'
import styles from './Form.module.css'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /** Accessible label for the form as a whole. */
  'aria-label'?: string
}

export function Form({ children, className, ...props }: FormProps) {
  return (
    <form
      noValidate
      className={[styles.form, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </form>
  )
}
