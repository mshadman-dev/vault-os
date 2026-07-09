import { LazyMotion, domAnimation, m } from 'framer-motion'
import { BarChart2 } from 'lucide-react'
import { CARD_TRANSITION, ARIA_LABELS } from '../../constants'
import styles from './AnalyticsPlaceholder.module.css'

/**
 * AnalyticsPlaceholder — Row 4 full-width slot for future chart content.
 *
 * Renders a dashed placeholder container with a coming-soon message.
 * No chart library is loaded here.
 */
export function AnalyticsPlaceholder() {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.section
        className={styles.card}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...CARD_TRANSITION, delay: 0.25 }}
        aria-label={ARIA_LABELS.ANALYTICS_PLACEHOLDER}
      >
        <BarChart2
          className={styles.icon}
          size={36}
          strokeWidth={1.25}
          aria-hidden
        />
        <h2 className={styles.title}>Analytics</h2>
        <p className={styles.description}>
          Charts and insights will appear here once data is available.
        </p>
      </m.section>
    </LazyMotion>
  )
}
