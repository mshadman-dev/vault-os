/**
 * AddExpenseForm — example form wiring together form primitives +
 * React Hook Form + Zod expense schema.
 *
 * No API calls, no state management, no business logic.
 * Calls `onSubmit` with validated data and `onCancel` to dismiss.
 */
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TrendingDown } from 'lucide-react'
import {
  Form,
  FormField,
  FormInput,
  FormSelect,
  FormTextarea,
  FormActions,
} from '../../../components/forms'
import {
  expenseSchema,
  EXPENSE_CATEGORIES,
  type ExpenseFormValues,
} from '../../../lib/validation'
import styles from './ExampleForm.module.css'

/** Human-readable labels for expense category values. */
const EXPENSE_CATEGORY_LABELS: Record<(typeof EXPENSE_CATEGORIES)[number], string> = {
  housing: 'Housing',
  food: 'Food & Dining',
  transport: 'Transport',
  utilities: 'Utilities',
  healthcare: 'Healthcare',
  entertainment: 'Entertainment',
  clothing: 'Clothing',
  education: 'Education',
  subscriptions: 'Subscriptions',
  travel: 'Travel',
  other: 'Other',
}

interface AddExpenseFormProps {
  onSubmit: (data: ExpenseFormValues) => void
  onCancel?: () => void
}

export function AddExpenseForm({ onSubmit, onCancel }: AddExpenseFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: '',
      category: undefined,
      date: new Date().toISOString().split('T')[0],
      note: '',
    },
  })

  const noteValue = useWatch({ control, name: 'note' }) ?? ''

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <TrendingDown
          className={styles.headerIcon}
          size={22}
          strokeWidth={1.75}
          aria-hidden
        />
        <h2 className={styles.title}>Add Expense</h2>
      </div>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        aria-label="Add expense form"
      >
        <div className={styles.row}>
          <FormField
            label="Amount"
            fieldId="expense-amount"
            required
            error={errors.amount?.message}
            helperText="Enter the expense amount in your currency"
          >
            <FormInput
              id="expense-amount"
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              hasError={!!errors.amount}
              errorId={errors.amount ? 'expense-amount-error' : undefined}
              helperId={!errors.amount ? 'expense-amount-helper' : undefined}
              {...register('amount')}
            />
          </FormField>

          <FormField
            label="Date"
            fieldId="expense-date"
            required
            error={errors.date?.message}
          >
            <FormInput
              id="expense-date"
              type="date"
              hasError={!!errors.date}
              errorId={errors.date ? 'expense-date-error' : undefined}
              {...register('date')}
            />
          </FormField>
        </div>

        <FormField
          label="Category"
          fieldId="expense-category"
          required
          error={errors.category?.message}
        >
          <FormSelect
            id="expense-category"
            hasError={!!errors.category}
            errorId={errors.category ? 'expense-category-error' : undefined}
            {...register('category')}
          >
            <option value="">Select a category…</option>
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {EXPENSE_CATEGORY_LABELS[cat]}
              </option>
            ))}
          </FormSelect>
        </FormField>

        <FormField
          label="Note"
          fieldId="expense-note"
          error={errors.note?.message}
          helperText="Optional — add any relevant details"
        >
          <FormTextarea
            id="expense-note"
            rows={3}
            placeholder="Add a note…"
            maxLength={500}
            showCharCount
            currentLength={noteValue.length}
            hasError={!!errors.note}
            errorId={errors.note ? 'expense-note-error' : undefined}
            helperId={!errors.note ? 'expense-note-helper' : undefined}
            {...register('note')}
          />
        </FormField>

        <FormActions
          submitLabel="Add Expense"
          cancelLabel={onCancel ? 'Cancel' : undefined}
          onCancel={onCancel}
          isSubmitting={isSubmitting}
        />
      </Form>
    </div>
  )
}
