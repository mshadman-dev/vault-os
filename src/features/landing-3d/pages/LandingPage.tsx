/**
 * LandingPage — public-facing hero page at /landing.
 *
 * Renders the 3D canvas as a background layer behind the hero content.
 * Existing visual appearance is preserved; the canvas adds only a subtle
 * dark background with no geometry yet.
 */
import { Link } from 'react-router-dom'
import { PATHS } from '../../../lib/constants/paths'
import { Experience } from '../components/Experience'
import styles from './LandingPage.module.css'

export function LandingPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-label="Hero">

        {/* ── 3D canvas — behind all content ─────────────────────────── */}
        <div className={styles.canvasWrap}>
          <Experience />
        </div>

        {/* ── Hero content ───────────────────────────────────────────── */}
        <div className={styles.heroContent}>
          <div className={styles.logoRow}>
            <div className={styles.logoMark} aria-hidden="true">V</div>
            <span className={styles.logoName}>Vault OS</span>
          </div>

          <h1 className={styles.headline}>
            Your finances,{' '}
            <span className={styles.headlineAccent}>under control.</span>
          </h1>

          <p className={styles.sub}>
            Vault OS gives you a unified view of income, expenses, budgets, and
            savings goals — built for clarity, designed for focus.
          </p>

          <div className={styles.cta}>
            <Link to={PATHS.SIGNUP} className={styles.btnPrimary}>
              Get started free
            </Link>
            <Link to={PATHS.LOGIN} className={styles.btnSecondary}>
              Sign in
            </Link>
          </div>
        </div>

      </section>
    </main>
  )
}
