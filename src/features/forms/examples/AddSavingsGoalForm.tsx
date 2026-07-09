/**
 * AddSavingsGoalForm — example form wiring together form primitives +
 * React Hook Form + Zod savings schema.
 *
 * No API calls, no state management, no business logic.
 * Calls `onSubmit` with validated data and `onCancel` to dismiss.
 */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PiggyBank } from 'lucide-react'
import {
  Form,
  FormField,
  FormInput,
  FormActions,
} from '../../../components/forms'
import { savingsSchema, type SavingsFormValues } from '../../../lib/validation'
import styles from './ExampleForm.module.css'

interface AddSavingsGoalFormProps {
  onSubmit: (data: SavingsFormValues) => void
  onCancel?: () => void
}

export function AddSavingsGoalForm({ onSubmit, onCancel }: AddSavingsGoalFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SavingsFormValues>({
    resolver: zodResolver(savingsSchema),
    defaultValues: {
      title: '',
      targetAmount: '',
      deadline: '',
    },
  })

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <PiggyBank
          className={styles.headerIcon}
          size={22}
          strokeWidth={1.75}
          aria-hidden
        />
        <h2 className={styles.title}>New Savings Goal</h2>
      </div>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        aria-label="Add savings goal form"
      >
        <FormField
          label="Goal Title"
          fieldId="savings-title"
          required
          error={errors.title?.message}
          helperText="Give your goal a clear, motivating name"
        >
          <FormInput
            id="savings-title"
            type="text"
            placeholder="e.g. Emergency fund, Vacation, New laptop…"
            hasError={!!errors.title}
            errorId={errors.title ? 'savings-title-error' : undefined}
            helperId={!errors.title ? 'savings-title-helper' : undefined}
            {...register('title')}
          />
        </FormField>

        <div className={styles.row}>
          <FormField
            label="Target Amount"
            fieldId="savings-target"
            required
            error={errors.targetAmount?.message}
          >
            <FormInput
              id="savings-target"
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              hasError={!!errors.targetAmount}
              errorId={errors.targetAmount ? 'savings-target-error' : undefined}
              {...register('targetAmount')}
            />
          </FormField>

          <FormField
            label="Target Date"
            fieldId="savings-deadline"
            required
            error={errors.deadline?.message}
            helperText="Must be today or later"
          >
            <FormInput
              id="savings-deadline"
              type="date"
              hasError={!!errors.deadline}
              errorId={errors.deadline ? 'savings-deadline-error' : undefined}
              helperId={!errors.deadline ? 'savings-deadline-helper' : undefined}
              {...register('deadline')}
            />
          </FormField>
        </div>

        <FormActions
          submitLabel="Create Goal"
          cancelLabel={onCancel ? 'Cancel' : undefined}
          onCancel={onCancel}
          isSubmitting={isSubmitting}
        />
      </Form>
    </div>
  )
}
