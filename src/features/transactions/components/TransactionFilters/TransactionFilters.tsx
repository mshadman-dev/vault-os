/**
 * TransactionFilters — toggle buttons for filtering by All / Income / Expense.
 *
 * Keyboard accessible with role="group" and aria-label.
 */

import { TRANSACTION_FILTERS } from '../../constants'
import type { TransactionFilter } from '../../types'
import styles from './TransactionFilters.module.css'

interface TransactionFiltersProps {
  activeFilter: TransactionFilter
  onChange: (filter: TransactionFilter) => void
  counts: { all: number; income: number; expense: number }
}

export function TransactionFilters({
  activeFilter,
  onChange,
  counts,
}: TransactionFiltersProps) {
  return (
    <div role="group" aria-label="Filter transactions" className={styles.group}>
      {TRANSACTION_FILTERS.map(({ value, label }) => {
        const count = counts[value]
        const isActive = activeFilter === value
        return (
          <button
            key={value}
            type="button"
            className={[styles.btn, isActive ? styles.btnActive : ''].filter(Boolean).join(' ')}
            onClick={() => onChange(value)}
            aria-pressed={isActive}
          >
            {label}
            <span className={styles.count} aria-label={`${count} ${label.toLowerCase()} transactions`}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
