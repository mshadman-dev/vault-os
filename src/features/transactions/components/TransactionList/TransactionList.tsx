/**
 * TransactionList — renders a list of TransactionItem rows or an EmptyState.
 */

import { TransactionItem } from '../TransactionItem'
import { EmptyState } from '../EmptyState'
import type { Transaction, TransactionFilter } from '../../types'
import styles from './TransactionList.module.css'

interface TransactionListProps {
  transactions: Transaction[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  currency: string
  locale: string
  emptyMessage?: string
  onAdd?: () => void
  filter?: TransactionFilter
}

export function TransactionList({
  transactions,
  onEdit,
  onDelete,
  currency,
  locale,
  emptyMessage,
  onAdd,
  filter = 'all',
}: TransactionListProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recent Transactions</h2>
      </div>

      {transactions.length === 0 ? (
        <EmptyState message={emptyMessage} onAdd={onAdd} type={filter} />
      ) : (
        <ul className={styles.list} role="list">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
              currency={currency}
              locale={locale}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
