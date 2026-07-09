/**
 * LandingPage — public entry point of the application.
 *
 * Route: "/"
 * - Unauthenticated users see the full landing page.
 * - Authenticated users are immediately redirected to /dashboard.
 *
 * Sections (top → bottom):
 *   TopNav → Hero → Features → DashboardPreview → Security → AIPreview → CTA → Footer
 */
import { Navigate, Link } from 'react-router-dom'
import { useSession } from '../auth/hooks/useSession'
import { PATHS } from '../../lib/constants/paths'
import { Hero } from './components/Hero/Hero'
import { Features } from './components/Features/Features'
import { DashboardPreview } from './components/DashboardPreview/DashboardPreview'
import { Security } from './components/Security/Security'
import { AIPreview } from './components/AIPreview/AIPreview'
import { CTA } from './components/CTA/CTA'
import { Footer } from './components/Footer/Footer'
import styles from './LandingPage.module.css'

export function LandingPage() {
  const { isAuthenticated, loading } = useSession()

  // While session is restoring, render nothing to avoid flash of landing for auth users.
  if (loading) return null

  // Authenticated users go straight to the dashboard.
  if (isAuthenticated) {
    return <Navigate to={PATHS.DASHBOARD} replace />
  }

  return (
    <>
      {/* Accessible skip link */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      <div className={styles.root}>
        {/* ── Fixed top navigation ── */}
        <header className={styles.topNav}>
          <Link
            to={PATHS.LANDING}
            className={styles.brand}
            aria-label="Vault-OS home"
          >
            <div className={styles.logoMark} aria-hidden="true">V</div>
            <span className={styles.brandName}>Vault-OS</span>
          </Link>

          <nav aria-label="Primary navigation">
            <div className={styles.navActions}>
              <a
                href="#features"
                className={styles.navLink}
              >
                Features
              </a>
              <a
                href="#security"
                className={styles.navLink}
              >
                Privacy
              </a>
              <Link
                to={PATHS.LOGIN}
                className={styles.navCta}
                aria-label="Launch the application"
              >
                Launch App
              </Link>
            </div>
          </nav>
        </header>

        {/* ── Main page content ── */}
        <main id="main-content" className={styles.main}>
          <Hero />

          <div className={styles.divider} aria-hidden="true" />

          <Features />

          <div className={styles.divider} aria-hidden="true" />

          <DashboardPreview />

          <div id="security" className={styles.divider} aria-hidden="true" />

          <Security />

          <div className={styles.divider} aria-hidden="true" />

          <AIPreview />

          <div className={styles.divider} aria-hidden="true" />

          <CTA />
        </main>

        <Footer />
      </div>
    </>
  )
}
