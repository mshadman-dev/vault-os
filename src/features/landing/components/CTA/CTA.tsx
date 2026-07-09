/**
 * CTA — final call-to-action section.
 * "Launch App" links to /login.
 */
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PATHS } from '../../../../lib/constants/paths'
import styles from './CTA.module.css'

export function CTA() {
  return (
    <section className={styles.section} aria-labelledby="cta-heading">
      <div className={styles.inner}>
        <div
          className={styles.badge}
          aria-hidden="true"
        >
          Free &amp; Open Source
        </div>

        <h2 id="cta-heading" className={styles.heading}>
          Ready to take control?
        </h2>

        <p className={styles.subheading}>
          Set up Vault-OS in minutes. Point it at your Supabase project and
          you're running a private, fully-featured finance OS.
        </p>

        <div className={styles.btnRow}>
          <Link
            to={PATHS.LOGIN}
            className={styles.btnPrimary}
            aria-label="Launch the Vault-OS application"
          >
            Launch App
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <p className={styles.note} aria-hidden="true">
          No credit card. No subscription. Just your data.
        </p>
      </div>
    </section>
  )
}
