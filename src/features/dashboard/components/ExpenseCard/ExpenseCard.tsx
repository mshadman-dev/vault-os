import { LazyMotion, domAnimation, m } from 'framer-motion'
import { TrendingDown, ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { CARD_TRANSITION } from '../../constants'
import type { MetricCardProps } from '../../types'
import styles from './ExpenseCard.module.css'

/**
 * ExpenseCard — summary metric card for expenses.
 *
 * Part of Row 2 (two-column grid alongside IncomeCard).
 */
export function ExpenseCard({ label, value, trend = 'neutral', trendLabel }: MetricCardProps) {
  const trendClass =
    trend === 'up'
      ? styles.trendUp
      : trend === 'down'
        ? styles.trendDown
        : styles.trendNeutral

  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus

  return (
    <LazyMotion features={domAnimation} strict>
      <m.article
        className={styles.card}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...CARD_TRANSITION, delay: 0.1 }}
        aria-label={label}
      >
        <div className={styles.header}>
          <p className={styles.label}>{label}</p>
          <TrendingDown
            className={styles.icon}
            size={18}
            strokeWidth={1.75}
            aria-hidden
          />
        </div>

        <p className={styles.value} aria-live="polite" aria-atomic="true">
          {value}
        </p>

        {trendLabel != null && (
          <span className={`${styles.trend} ${trendClass}`} aria-label={`Trend: ${trendLabel}`}>
            <TrendIcon
              className={styles.trendIcon}
              size={13}
              strokeWidth={2}
              aria-hidden
            />
            {trendLabel}
          </span>
        )}
      </m.article>
    </LazyMotion>
  )
}
