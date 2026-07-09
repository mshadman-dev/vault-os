/**
 * Transactions feature — pure utility functions.
 *
 * No side-effects, no store access. Safe to use anywhere.
 */

import type { TransactionType } from './types'

/**
 * Formats a numeric amount as a localized currency string.
 *
 * @example formatCurrency(1234.5, 'USD', 'en-US') → '$1,234.50'
 */
export function formatCurrency(
  amount: number,
  currency: string,
  locale: string,
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Formats an ISO date string (YYYY-MM-DD) into a human-readable date.
 *
 * @example formatDate('2024-03-15', 'en-US') → 'Mar 15, 2024'
 */
export function formatDate(dateStr: string, locale: string): string {
  // Append T00:00:00 to force local-time parsing instead of UTC midnight
  const date = new Date(`${dateStr}T00:00:00`)
  if (isNaN(date.getTime())) return dateStr
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

/**
 * Converts a category slug into a human-readable title-cased label.
 *
 * @example getCategoryLabel('food') → 'Food'
 * @example getCategoryLabel('real-estate') → 'Real Estate'
 */
export function getCategoryLabel(category: string): string {
  return category
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

/**
 * Returns the sign character for a transaction amount display.
 */
export function getTransactionSign(type: TransactionType): '+' | '-' {
  return type === 'income' ? '+' : '-'
}
