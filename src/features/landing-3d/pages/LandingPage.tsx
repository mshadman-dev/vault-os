/**
 * LandingPage — public-facing hero page at /landing.
 *
 * Orchestrates:
 *  - 3D canvas (background layer)
 *  - Hero content (foreground layer)
 *  - Overlay div (full-screen fade-to-black during unlock transition)
 *  - CTA button click → vault unlock sequence → navigation
 *
 * The unlock trigger is registered from Scene via onUnlockReady.
 * When "Get started free" or "Launch App" is clicked:
 *   1. Reduced-motion users navigate immediately
 *   2. Everyone else: triggerUnlock(navigate) fires the GSAP master timeline
 */
import { useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../../lib/constants/paths'
import { Experience } from '../components/Experience'
import { useReducedMotion } from '../hooks/useReducedMotion'
import styles from './LandingPage.module.css'

export function LandingPage() {
  const navigate      = useNavigate()
  const reducedMotion = useReducedMotion()

  /** Ref to the overlay div — passed into canvas for fade-to-black. */
  const overlayRef = useRef<HTMLDivElement>(null)

  /** Ref to the hero content for scroll parallax. */
  const heroContentRef = useRef<HTMLElement>(null)

  /**
   * Holds the triggerUnlock function once Scene has registered it.
   * Using a ref to avoid stale closures without causing re-renders.
   */
  const unlockTriggerRef = useRef<((navigateFn: () => void) => void) | null>(null)

  const handleUnlockReady = useCallback(
    (trigger: (navigateFn: () => void) => void) => {
      unlockTriggerRef.current = trigger
    },
    [],
  )

  /** Called when either CTA button is pressed. */
  const handleCTAClick = useCallback(
    (destination: string) => (e: React.MouseEvent) => {
      e.preventDefault()
      const trigger = unlockTriggerRef.current

      if (reducedMotion || !trigger) {
        // Skip animation entirely for reduced-motion / if scene not ready
        navigate(destination)
        return
      }

      trigger(() => navigate(destination))
    },
    [navigate, reducedMotion],
  )

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-label="Hero">

        {/* ── 3D canvas — behind all content ─────────────────────────── */}
        <div className={styles.canvasWrap}>
          <Experience
            heroContentRef={heroContentRef as React.RefObject<HTMLElement | null>}
            onUnlockReady={handleUnlockReady}
            overlayRef={overlayRef}
          />
        </div>

        {/* ── Hero content ───────────────────────────────────────────── */}
        <div
          className={styles.heroContent}
          ref={heroContentRef as React.RefObject<HTMLDivElement>}
        >
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
            <button
              className={styles.btnPrimary}
              onClick={handleCTAClick(PATHS.SIGNUP)}
              type="button"
            >
              Get started free
            </button>
            <button
              className={styles.btnSecondary}
              onClick={handleCTAClick(PATHS.LOGIN)}
              type="button"
            >
              Sign in
            </button>
          </div>
        </div>

        {/* ── Overlay — full-screen fade to black on unlock ──────────── */}
        <div
          ref={overlayRef}
          className={styles.overlay}
          aria-hidden="true"
        />

      </section>
    </main>
  )
}
