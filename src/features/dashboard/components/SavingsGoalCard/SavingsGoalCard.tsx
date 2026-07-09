import { LazyMotion, domAnimation, m } from 'framer-motion'
import { PiggyBank } from 'lucide-react'
import { CARD_TRANSITION, STAGGER_DELAY, EMPTY_STATE_LABEL, ARIA_LABELS } from '../../constants'
import type { SavingsGoalCardProps } from '../../types'
import styles from './SavingsGoalCard.module.css'

/**
 * SavingsGoalCard — lists savings goals with progress bars.
 *
 * Part of Row 3 (two-column grid alongside BudgetProgressCard).
 */
export function SavingsGoalCard({ goals }: SavingsGoalCardProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.article
        className={styles.card}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...CARD_TRANSITION, delay: 0.15 }}
        aria-label={ARIA_LABELS.SAVINGS_GOALS}
      >
        <div className={styles.header}>
          <PiggyBank
            className={styles.headerIcon}
            size={18}
            strokeWidth={1.75}
            aria-hidden
          />
          <h2 className={styles.title}>Savings Goals</h2>
        </div>

        {goals.length === 0 ? (
          <p className={styles.emptyState}>{EMPTY_STATE_LABEL}</p>
        ) : (
          <ul className={styles.goalList} role="list">
            {goals.map((goal, index) => (
              <m.li
                key={goal.id}
                className={styles.goalItem}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...CARD_TRANSITION, delay: 0.15 + index * STAGGER_DELAY }}
              >
                <div className={styles.goalRow}>
                  <span className={styles.goalName}>{goal.name}</span>
                  <span className={styles.goalAmount} aria-hidden="true">
                    {goal.amountLabel}
                  </span>
                </div>
                <div
                  className={styles.progressTrack}
                  role="progressbar"
                  aria-valuenow={goal.progressPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${goal.name}: ${goal.amountLabel}`}
                >
                  <div
                    className={styles.progressBar}
                    style={{ width: `${goal.progressPercent}%` }}
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
