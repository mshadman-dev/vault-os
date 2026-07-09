/**
 * TransactionItem — single row in the transactions list.
 *
 * Shows a type icon, category + optional note + date, formatted amount
 * with sign, and edit/delete action buttons.
 */

import { ArrowDownLeft, ArrowUpRight, Pencil, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate, getCategoryLabel, getTransactionSign } from '../../utils'
import type { Transaction } from '../../types'
import styles from './TransactionItem.module.css'

interface TransactionItemProps {
  transaction: Transaction
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  currency: string
  locale: string
}

export function TransactionItem({
  transaction,
  onEdit,
  onDelete,
  currency,
  locale,
}: TransactionItemProps) {
  const { id, type, amount, category, note, date } = transaction
  const isIncome = type === 'income'
  const sign = getTransactionSign(type)
  const formattedAmount = formatCurrency(amount, currency, locale)
  const formattedDate = formatDate(date, locale)
  const categoryLabel = getCategoryLabel(category)

  return (
    <li className={styles.item}>
      {/* Avatar icon */}
      <span
        className={[styles.avatar, isIncome ? styles.avatarIncome : styles.avatarExpense].join(' ')}
        aria-hidden="true"
      >
        {isIncome ? (
          <ArrowDownLeft size={16} strokeWidth={2} />
        ) : (
          <ArrowUpRight size={16} strokeWidth={2} />
        )}
      </span>

      {/* Details */}
      <div className={styles.details}>
        <span className={styles.category}>{categoryLabel}</span>
        {note && <span className={styles.note}>{note}</span>}
        <span className={styles.date}>{formattedDate}</span>
      </div>

      {/* Amount */}
      <span
        className={[styles.amount, isIncome ? styles.amountIncome : styles.amountExpense].join(' ')}
        aria-label={`${isIncome ? 'Income' : 'Expense'}: ${formattedAmount}`}
      >
        {sign}{formattedAmount}
      </span>

      {/* Actions */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={() => onEdit(id)}
          aria-label={`Edit ${categoryLabel} transaction`}
        >
          <Pencil size={14} strokeWidth={2} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={[styles.actionBtn, styles.actionBtnDelete].join(' ')}
          onClick={() => onDelete(id)}
          aria-label={`Delete ${categoryLabel} transaction`}
        >
          <Trash2 size={14} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </li>
  )
}
