import { LazyMotion, domAnimation, m } from 'framer-motion'
import { Wallet } from 'lucide-react'
import { CARD_TRANSITION, STAGGER_DELAY, EMPTY_STATE_LABEL, ARIA_LABELS } from '../../constants'
import type { BudgetProgressCardProps } from '../../types'
import styles from './BudgetProgressCard.module.css'

/**
 * BudgetProgressCard — lists budget categories with progress bars.
 *
 * Bars turn red when a category is over budget.
 * Part of Row 3 (two-column grid alongside SavingsGoalCard).
 */
export function BudgetProgressCard({ categories }: BudgetProgressCardProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.article
        className={styles.card}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...CARD_TRANSITION, delay: 0.2 }}
        aria-label={ARIA_LABELS.BUDGET_PROGRESS}
      >
        <div className={styles.header}>
          <Wallet
            className={styles.headerIcon}
            size={18}
            strokeWidth={1.75}
            aria-hidden
          />
          <h2 className={styles.title}>Budget</h2>
        </div>

        {categories.length === 0 ? (
          <p className={styles.emptyState}>{EMPTY_STATE_LABEL}</p>
        ) : (
          <ul className={styles.categoryList} role="list">
            {categories.map((cat, index) => (
              <m.li
                key={cat.id}
                className={styles.categoryItem}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...CARD_TRANSITION, delay: 0.2 + index * STAGGER_DELAY }}
              >
                <div className={styles.categoryRow}>
                  <span className={styles.categoryName}>{cat.name}</span>
                  {cat.isOverBudget ? (
                    <span className={styles.overBudgetLabel} role="status">
                      Over budget
                    </span>
                  ) : (
                    <span className={styles.categoryAmount} aria-hidden="true">
                      {cat.amountLabel}
                    </span>
                  )}
                </div>
                <div
                  className={styles.progressTrack}
                  role="progressbar"
                  aria-valuenow={Math.min(cat.spentPercent, 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${cat.name}: ${cat.amountLabel}${cat.isOverBudget ? ' — over budget' : ''}`}
                >
                  <div
                    className={[
                      styles.progressBar,
                      cat.isOverBudget ? styles.progressBarOver : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    style={{ width: `${Math.min(cat.spentPercent, 100)}%` }}
                  />
                </div>
              </m.li>
            ))}
          </ul>
        )}
      </m.article>
    </LazyMotion>
  )
}
