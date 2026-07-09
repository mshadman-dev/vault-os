import { LazyMotion, domAnimation, m } from 'framer-motion'
import { Zap } from 'lucide-react'
import { CARD_TRANSITION, STAGGER_DELAY, ARIA_LABELS } from '../../constants'
import type { QuickActionsProps } from '../../types'
import styles from './QuickActions.module.css'

/**
 * QuickActions — Row 6 grid of action buttons.
 *
 * Accepts an `actions` prop so the parent controls what actions are
 * available. No business logic lives here.
 */
export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.section
        className={styles.card}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...CARD_TRANSITION, delay: 0.35 }}
        aria-label={ARIA_LABELS.QUICK_ACTIONS}
      >
        <div className={styles.header}>
          <Zap
            className={styles.headerIcon}
            size={18}
            strokeWidth={1.75}
            aria-hidden
          />
          <h2 className={styles.title}>Quick Actions</h2>
        </div>

        <div className={styles.actionGrid} role="group" aria-label="Quick action buttons">
          {actions.map((action, index) => {
            const Icon = action.icon

            return (
              <m.button
                key={action.id}
                type="button"
                className={styles.actionButton}
                onClick={action.onClick}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...CARD_TRANSITION, delay: 0.35 + index * STAGGER_DELAY }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon
                  className={styles.actionIcon}
                  size={20}
                  strokeWidth={1.75}
                  aria-hidden
                />
                {action.label}
              </m.button>
            )
          })}
        </div>
      </m.section>
    </LazyMotion>
  )
}
