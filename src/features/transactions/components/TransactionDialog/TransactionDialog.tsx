/**
 * TransactionDialog — modal for adding or editing a transaction.
 *
 * Uses the native <dialog> element for a built-in focus trap and
 * Escape key handling. react-hook-form + zodResolver handles validation.
 */

import { useRef, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { incomeSchema } from '../../../../lib/validation/income.schema'
import { expenseSchema } from '../../../../lib/validation/expense.schema'
import { INCOME_CATEGORIES } from '../../../../lib/validation/income.schema'
import { EXPENSE_CATEGORIES } from '../../../../lib/validation/expense.schema'
import {
  FormField,
  FormInput,
  FormSelect,
  FormTextarea,
  FormActions,
} from '../../../../components/forms'
import { DIALOG_TITLES } from '../../constants'
import { getCategoryLabel } from '../../utils'
import type { TransactionType, TransactionFormValues, Transaction } from '../../types'
import styles from './TransactionDialog.module.css'

interface TransactionDialogProps {
  isOpen: boolean
  onClose: () => void
  mode: 'add' | 'edit'
  type: TransactionType
  transaction?: Transaction
  onSubmit: (values: TransactionFormValues) => void
}

export function TransactionDialog({
  isOpen,
  onClose,
  mode,
  type,
  transaction,
  onSubmit,
}: TransactionDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const schema = type === 'income' ? incomeSchema : expenseSchema
  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
  const title = DIALOG_TITLES[mode][type]

  const defaultValues: TransactionFormValues = {
    type,
    amount: transaction ? String(transaction.amount) : '',
    category: transaction?.category ?? '',
    note: transaction?.note ?? '',
    date: transaction?.date ?? new Date().toISOString().split('T')[0],
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  // Sync dialog open/close state with showModal/close
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen) {
      if (!dialog.open) dialog.showModal()
    } else {
      if (dialog.open) dialog.close()
    }
  }, [isOpen])

  // Reset form whenever the dialog opens with new data
  useEffect(() => {
    if (isOpen) {
      reset({
        type,
        amount: transaction ? String(transaction.amount) : '',
        category: transaction?.category ?? '',
        note: transaction?.note ?? '',
        date: transaction?.date ?? new Date().toISOString().split('T')[0],
      })
    }
  }, [isOpen, type, transaction, reset])

  // Sync native dialog 'close' event back to onClose
  const stableOnClose = useCallback(() => onClose(), [onClose])
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    dialog.addEventListener('close', stableOnClose)
    return () => dialog.removeEventListener('close', stableOnClose)
  }, [stableOnClose])

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose()
  }

  const handleFormSubmit = (values: TransactionFormValues) => {
    onSubmit({ ...values, type })
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialogRoot}
      aria-labelledby="transaction-dialog-title"
      onClick={handleBackdropClick}
    >
      {/* Prevent backdrop clicks from propagating to inner content */}
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.dialogHeader}>
          <h2 id="transaction-dialog-title" className={styles.dialogTitle}>
            {title}
          </h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          {/* Type indicator in edit mode */}
          {mode === 'edit' && (
            <div className={styles.typeIndicator}>
              <span className={styles.typeLabel}>Type</span>
              <span
                className={[
                  styles.typeBadge,
                  type === 'income' ? styles.typeBadgeIncome : styles.typeBadgeExpense,
                ].join(' ')}
              >
                {type === 'income' ? 'Income' : 'Expense'}
              </span>
            </div>
          )}

          <div className={styles.fields}>
            <FormField
              label="Amount"
              fieldId="amount"
              required
              error={errors.amount?.message}
            >
              <FormInput
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                hasError={!!errors.amount}
                errorId={errors.amount ? 'amount-error' : undefined}
                {...register('amount')}
              />
            </FormField>

            <FormField
              label="Category"
              fieldId="category"
              required
              error={errors.category?.message}
            >
              <FormSelect
                id="category"
                hasError={!!errors.category}
                errorId={errors.category ? 'category-error' : undefined}
                {...register('category')}
              >
                <option value="">Select a category…</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {getCategoryLabel(cat)}
                  </option>
                ))}
              </FormSelect>
            </FormField>

            <FormField
              label="Date"
              fieldId="date"
              required
              error={errors.date?.message}
            >
              <FormInput
                id="date"
                type="date"
                hasError={!!errors.date}
                errorId={errors.date ? 'date-error' : undefined}
                {...register('date')}
              />
            </FormField>

            <FormField
              label="Note"
              fieldId="note"
              error={errors.note?.message}
            >
              <FormTextarea
                id="note"
                rows={3}
                placeholder="Optional note…"
                maxLength={500}
                hasError={!!errors.note}
                errorId={errors.note ? 'note-error' : undefined}
                {...register('note')}
              />
            </FormField>
          </div>

          <div className={styles.formFooter}>
            <FormActions
              submitLabel={mode === 'add' ? title : 'Save Changes'}
              cancelLabel="Cancel"
              onCancel={onClose}
              isSubmitting={isSubmitting}
              align="right"
            />
          </div>
        </form>
      </div>
    </dialog>
  )
}
