/**
 * AddBudgetForm — example form wiring together form primitives +
 * React Hook Form + Zod budget schema.
 *
 * No API calls, no state management, no business logic.
 * Calls `onSubmit` with validated data and `onCancel` to dismiss.
 */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Wallet } from 'lucide-react'
import {
  Form,
  FormField,
  FormInput,
  FormSelect,
  FormActions,
} from '../../../components/forms'
import {
  budgetSchema,
  BUDGET_CATEGORIES,
  type BudgetFormValues,
} from '../../../lib/validation'
import styles from './ExampleForm.module.css'

/** Human-readable labels for budget category values. */
const BUDGET_CATEGORY_LABELS: Record<(typeof BUDGET_CATEGORIES)[number], string> = {
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

interface AddBudgetFormProps {
  onSubmit: (data: BudgetFormValues) => void
  onCancel?: () => void
}

export function AddBudgetForm({ onSubmit, onCancel }: AddBudgetFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      category: undefined,
      limit: '',
    },
  })

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Wallet
          className={styles.headerIcon}
          size={22}
          strokeWidth={1.75}
          aria-hidden
        />
        <h2 className={styles.title}>Set Budget Limit</h2>
      </div>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        aria-label="Set budget limit form"
      >
        <FormField
          label="Category"
          fieldId="budget-category"
          required
          error={errors.category?.message}
          description="Choose the spending category this budget applies to"
        >
          <FormSelect
            id="budget-category"
            hasError={!!errors.category}
            errorId={errors.category ? 'budget-category-error' : undefined}
            {...register('category')}
          >
            <option value="">Select a category…</option>
            {BUDGET_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {BUDGET_CATEGORY_LABELS[cat]}
              </option>
            ))}
          </FormSelect>
        </FormField>

        <FormField
          label="Monthly Limit"
          fieldId="budget-limit"
          required
          error={errors.limit?.message}
          helperText="Set the maximum you want to spend in this category per month"
        >
          <FormInput
            id="budget-limit"
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            hasError={!!errors.limit}
            errorId={errors.limit ? 'budget-limit-error' : undefined}
            helperId={!errors.limit ? 'budget-limit-helper' : undefined}
            {...register('limit')}
          />
        </FormField>

        <FormActions
          submitLabel="Save Budget"
          cancelLabel={onCancel ? 'Cancel' : undefined}
          onCancel={onCancel}
          isSubmitting={isSubmitting}
        />
      </Form>
    </div>
  )
}
