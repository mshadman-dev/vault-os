/**
 * FormActions — submit and optional cancel button row.
 *
 * Handles loading state on the submit button (spinner + disabled).
 * The `align` prop controls flex justification. `stackMobile` flips
 * the column direction on small viewports.
 *
 * Usage:
 *   <FormActions
 *     submitLabel="Save income"
 *     cancelLabel="Cancel"
 *     onCancel={onClose}
 *     isSubmitting={isSubmitting}
 *   />
 */
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './FormActions.module.css'

type Align = 'left' | 'right' | 'center'

interface FormActionsProps {
  /** Label for the primary submit button. Defaults to "Submit". */
  submitLabel?: string
  /** Label for the optional secondary cancel/back button. */
  cancelLabel?: string
  /** Called when the cancel button is clicked. */
  onCancel?: () => void
  /** When true, shows a spinner and disables the submit button. */
  isSubmitting?: boolean
  /** Flex alignment of the action row. Defaults to "right". */
  align?: Align
  /** Stack buttons vertically on mobile. */
  stackMobile?: boolean
  /** Stretch buttons to full width. */
  fullWidth?: boolean
  /** Optional type override for the submit button. Defaults to "submit". */
  submitType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  /** Optional additional content (e.g. a secondary action). */
  children?: ReactNode
}

const ALIGN_CLASS: Record<Align, string> = {
  left: styles.alignLeft,
  right: styles.alignRight,
  center: styles.alignCenter,
}

export function FormActions({
  submitLabel = 'Submit',
  cancelLabel,
  onCancel,
  isSubmitting = false,
  align = 'right',
  stackMobile = true,
  fullWidth = false,
  submitType = 'submit',
  children,
}: FormActionsProps) {
  const actionClasses = [
    styles.actions,
    ALIGN_CLASS[align],
    stackMobile ? styles.stackMobile : '',
  ]
    .filter(Boolean)
    .join(' ')

  const btnClasses = [styles.btn, styles.btnPrimary, fullWidth ? styles.btnFull : '']
    .filter(Boolean)
    .join(' ')

  const cancelClasses = [styles.btn, styles.btnSecondary, fullWidth ? styles.btnFull : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={actionClasses}>
      {children}

      {cancelLabel && onCancel && (
        <button
          type="button"
          className={cancelClasses}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {cancelLabel}
        </button>
      )}

      <button type={submitType} className={btnClasses} disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting && (
          <span className={styles.spinner} role="presentation" aria-hidden="true" />
        )}
        {submitLabel}
      </button>
    </div>
  )
}
