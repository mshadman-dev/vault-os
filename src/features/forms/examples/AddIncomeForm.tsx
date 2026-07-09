/**
 * AddIncomeForm — example form wiring together form primitives +
 * React Hook Form + Zod income schema.
 *
 * No API calls, no state management, no business logic.
 * Calls `onSubmit` with validated data and `onCancel` to dismiss.
 */
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TrendingUp } from 'lucide-react'
import {
  Form,
  FormField,
  FormInput,
  FormSelect,
  FormTextarea,
  FormActions,
} from '../../../components/forms'
import {
  incomeSchema,
  INCOME_CATEGORIES,
  type IncomeFormValues,
} from '../../../lib/validation'
import styles from './ExampleForm.module.css'

/** Human-readable labels for income category values. */
const INCOME_CATEGORY_LABELS: Record<(typeof INCOME_CATEGORIES)[number], string> = {
  salary: 'Salary',
  freelance: 'Freelance',
  investment: 'Investment',
  rental: 'Rental',
  gift: 'Gift',
  refund: 'Refund',
  other: 'Other',
}

interface AddIncomeFormProps {
  onSubmit: (data: IncomeFormValues) => void
  onCancel?: () => void
}

export function AddIncomeForm({ onSubmit, onCancel }: AddIncomeFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IncomeFormValues>({
    resolver: zodResolver(incomeSchema),
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
        <TrendingUp
          className={styles.headerIcon}
          size={22}
          strokeWidth={1.75}
          aria-hidden
        />
        <h2 className={styles.title}>Add Income</h2>
      </div>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        aria-label="Add income form"
      >
        <div className={styles.row}>
          <FormField
            label="Amount"
            fieldId="income-amount"
            required
            error={errors.amount?.message}
            helperText="Enter the income amount in your currency"
          >
            <FormInput
              id="income-amount"
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              hasError={!!errors.amount}
              errorId={errors.amount ? 'income-amount-error' : undefined}
              helperId={!errors.amount ? 'income-amount-helper' : undefined}
              {...register('amount')}
            />
          </FormField>

          <FormField
            label="Date"
            fieldId="income-date"
            required
            error={errors.date?.message}
          >
            <FormInput
              id="income-date"
              type="date"
              hasError={!!errors.date}
              errorId={errors.date ? 'income-date-error' : undefined}
              {...register('date')}
            />
          </FormField>
        </div>

        <FormField
          label="Category"
          fieldId="income-category"
          required
          error={errors.category?.message}
        >
          <FormSelect
            id="income-category"
            hasError={!!errors.category}
            errorId={errors.category ? 'income-category-error' : undefined}
            {...register('category')}
          >
            <option value="">Select a category…</option>
            {INCOME_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {INCOME_CATEGORY_LABELS[cat]}
              </option>
            ))}
          </FormSelect>
        </FormField>

        <FormField
          label="Note"
          fieldId="income-note"
          error={errors.note?.message}
          helperText="Optional — add any relevant details"
        >
          <FormTextarea
            id="income-note"
            rows={3}
            placeholder="Add a note…"
            maxLength={500}
            showCharCount
            currentLength={noteValue.length}
            hasError={!!errors.note}
            errorId={errors.note ? 'income-note-error' : undefined}
            helperId={!errors.note ? 'income-note-helper' : undefined}
            {...register('note')}
          />
        </FormField>

        <FormActions
          submitLabel="Add Income"
          cancelLabel={onCancel ? 'Cancel' : undefined}
          onCancel={onCancel}
          isSubmitting={isSubmitting}
        />
      </Form>
    </div>
  )
}
