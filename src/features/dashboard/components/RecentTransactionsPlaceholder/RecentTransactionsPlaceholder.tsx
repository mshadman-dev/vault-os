import { LazyMotion, domAnimation, m } from 'framer-motion'
import { Receipt } from 'lucide-react'
import { CARD_TRANSITION, STAGGER_DELAY, ARIA_LABELS } from '../../constants'
import styles from './RecentTransactionsPlaceholder.module.css'

/** Number of skeleton rows to render. */
const SKELETON_COUNT = 4

/**
 * RecentTransactionsPlaceholder — Row 5 widget.
 *
 * Displays animated skeleton rows until the transactions feature is
 * implemented. No API calls, no fake data.
 */
export function RecentTransactionsPlaceholder() {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.section
        className={styles.card}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...CARD_TRANSITION, delay: 0.3 }}
        aria-label={ARIA_LABELS.TRANSACTIONS_PLACEHOLDER}
      >
        <div className={styles.header}>
          <Receipt
            className={styles.headerIcon}
            size={18}
            strokeWidth={1.75}
            aria-hidden
          />
          <h2 className={styles.title}>Recent Transactions</h2>
        </div>

        {/* Accessible skeleton list */}
        <ul
          className={styles.skeletonList}
          role="list"
          aria-label="Loading transactions"
          aria-busy="true"
        >
          {Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <m.li
              key={i}
              className={styles.skeletonRow}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: i * STAGGER_DELAY,
                ease: 'easeInOut',
              }}
              aria-hidden="true"
            >
              <div className={styles.skeletonAvatar} />
              <div className={styles.skeletonLines}>
                <div className={styles.skeletonLine} />
                <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
              </div>
              <div className={styles.skeletonAmount} />
            </m.li>
          ))}
        </ul>

        <p className={styles.emptyHint}>Transactions will appear here</p>
      </m.section>
    </LazyMotion>
  )
}
