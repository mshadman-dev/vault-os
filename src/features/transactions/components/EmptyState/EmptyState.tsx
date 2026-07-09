/**
 * EmptyState — shown inside TransactionList when there are no transactions.
 *
 * Renders a receipt icon, a contextual message, and an optional
 * "Add Transaction" call-to-action button.
 */

import { Receipt } from 'lucide-react'
import type { TransactionFilter } from '../../types'
import { EMPTY_STATE_MESSAGES } from '../../constants'
import styles from './EmptyState.module.css'

interface EmptyStateProps {
  message?: string
  onAdd?: () => void
  type?: TransactionFilter
}

export function EmptyState({ message, onAdd, type = 'all' }: EmptyStateProps) {
  const displayMessage = message ?? EMPTY_STATE_MESSAGES[type]

  return (
    <div className={styles.root} role="status" aria-live="polite">
      <Receipt
        size={40}
        strokeWidth={1.5}
        className={styles.icon}
        aria-hidden="true"
      />
      <p className={styles.message}>{displayMessage}</p>
      {onAdd && (
        <button type="button" className={styles.addButton} onClick={onAdd}>
          Add Transaction
        </button>
      )}
    </div>
  )
}
