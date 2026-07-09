/**
 * Hero — full-viewport opening section of the landing page.
 *
 * "Launch App" navigates to /login.
 * Authenticated users are redirected before reaching this page.
 */
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { PATHS } from '../../../../lib/constants/paths'
import styles from './Hero.module.css'

const STATS = [
  { value: '100%', label: 'Private' },
  { value: 'Zero', label: 'Subscriptions' },
  { value: 'Open', label: 'Source' },
]

export function Hero() {
  return (
    <section className={styles.section} aria-label="Hero">
      {/* Background glow */}
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Badge */}
        <div className={styles.badge} aria-hidden="true">
          <span className={styles.badgeDot} />
          Personal Finance OS
        </div>

        {/* Main headline */}
        <h1 className={styles.headline}>
          Your money,
          <span className={styles.accentText}>fully in control.</span>
        </h1>

        {/* Sub-headline */}
        <p className={styles.subheadline}>
          Vault-OS is a dark, privacy-first personal finance dashboard. Track income,
          expenses, budgets, and savings goals — all in one place, all yours.
        </p>

        {/* CTA buttons */}
        <div className={styles.ctaRow}>
          <Link
            to={PATHS.LOGIN}
            className={styles.btnPrimary}
            aria-label="Launch the application"
          >
            <Sparkles size={16} aria-hidden="true" />
            Launch App
          </Link>
          <a
            href="#features"
            className={styles.btnGhost}
            aria-label="See the features"
          >
            See Features
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        {/* Stat strip */}
        <dl className={styles.statStrip} aria-label="Key facts">
          {STATS.map((stat, i) => (
            <div key={stat.label} className={styles.statGroup}>
              {i > 0 && (
                <div className={styles.statDivider} aria-hidden="true" />
              )}
              <div className={styles.stat}>
                <dt className={styles.statLabel}>{stat.label}</dt>
                <dd className={styles.statValue}>{stat.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
