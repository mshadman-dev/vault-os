/**
 * FormTextarea — multi-line text area with optional character counter.
 *
 * Designed to be used inside <FormField>.
 *
 * Usage:
 *   <FormField label="Note" fieldId="note" error={errors.note?.message}>
 *     <FormTextarea
 *       id="note"
 *       rows={3}
 *       maxLength={500}
 *       showCharCount
 *       hasError={!!errors.note}
 *       {...register('note')}
 *     />
 *   </FormField>
 */
import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import styles from './FormTextarea.module.css'

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** When true, applies error styling and sets aria-invalid. */
  hasError?: boolean
  /** `id` of the error element for aria-describedby linkage. */
  errorId?: string
  /** `id` of helper text for aria-describedby linkage. */
  helperId?: string
  /** Show a character count below the textarea (requires maxLength). */
  showCharCount?: boolean
  /** Current value length — needed to drive the counter display. */
  currentLength?: number
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      hasError,
      errorId,
      helperId,
      showCharCount,
      currentLength,
      className,
      maxLength,
      ...props
    },
    ref,
  ) => {
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined
    const isNearLimit =
      showCharCount && maxLength && currentLength !== undefined
        ? currentLength >= maxLength * 0.9
        : false

    return (
      <>
        <textarea
          ref={ref}
          maxLength={maxLength}
          className={[styles.textarea, className].filter(Boolean).join(' ')}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {showCharCount && maxLength !== undefined && currentLength !== undefined && (
          <span
            className={[styles.charCount, isNearLimit ? styles.charCountWarning : '']
              .filter(Boolean)
              .join(' ')}
            aria-live="polite"
          >
            {currentLength}/{maxLength}
          </span>
        )}
      </>
    )
  },
)

FormTextarea.displayName = 'FormTextarea'
