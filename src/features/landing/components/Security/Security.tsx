/**
 * Security — privacy and data-ownership trust signals.
 */
import { ShieldCheck, Check } from 'lucide-react'
import styles from './Security.module.css'

const TRUST_POINTS = [
  'Your financial data never leaves your own Supabase project.',
  'No ads, no analytics, no third-party tracking scripts.',
  'Open-source codebase — audit every line yourself.',
  'Row-level security enforced at the database layer.',
  'Works fully offline once loaded — no server-side rendering.',
]

export function Security() {
  return (
    <section
      className={styles.section}
      aria-labelledby="security-heading"
    >
      <div className={styles.inner}>
        {/* Text side */}
        <div className={styles.textSide}>
          <p className={styles.eyebrow} aria-hidden="true">Privacy First</p>
          <h2 id="security-heading" className={styles.heading}>
            Your data stays yours. Always.
          </h2>
          <p className={styles.body}>
            Vault-OS is not a SaaS product. You deploy it, you own the database,
            you hold the keys. Privacy isn't a feature here — it's the foundation.
          </p>

          <ul className={styles.trustList} aria-label="Privacy guarantees">
            {TRUST_POINTS.map((point) => (
              <li key={point} className={styles.trustItem}>
                <span className={styles.checkIcon} aria-hidden="true">
                  <Check size={11} strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual side */}
        <div className={styles.visualSide} aria-hidden="true">
          <div className={styles.shieldWrap}>
            <div className={`${styles.ring} ${styles.ring1}`} />
            <div className={`${styles.ring} ${styles.ring2}`} />
            <div className={`${styles.ring} ${styles.ring3}`} />
            <div className={styles.shieldIcon}>
              <ShieldCheck size={34} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
