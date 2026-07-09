import { LazyMotion, domAnimation, m } from 'framer-motion'
import { Landmark } from 'lucide-react'
import { CARD_TRANSITION } from '../../constants'
import type { HeroBalanceCardProps } from '../../types'
import styles from './HeroBalanceCard.module.css'

/**
 * HeroBalanceCard — full-width banner displaying the net balance.
 *
 * Row 1 of the dashboard grid.
 * No financial values are hard-coded; the parent passes `value` and `label`.
 */
export function HeroBalanceCard({ label, value }: HeroBalanceCardProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.article
        className={styles.card}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={CARD_TRANSITION}
        aria-label={label}
      >
        <div className={styles.row}>
          <Landmark
            className={styles.icon}
            size={28}
            strokeWidth={1.5}
            aria-hidden
          />
        </div>
        <p className={styles.label}>{label}</p>
        {/* aria-live ensures screen readers announce updates */}
        <p className={styles.value} aria-live="polite" aria-atomic="true">
          {value}
        </p>
      </m.article>
    </LazyMotion>
  )
}
