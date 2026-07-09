/**
 * useHeroScrollReaction — subtle GSAP parallax for hero content on scroll.
 *
 * Reads scrollProgressRef (from useLenis) each frame and applies a
 * very subtle translateY + opacity fade to the hero content element.
 *
 * This runs inside a plain RAF loop (not useFrame — we're in DOM land).
 * No React re-renders. Pure GSAP quickTo for smooth, performant updates.
 *
 * Effect:
 *  - progress 0   → translateY 0,   opacity 1
 *  - progress 0.3 → translateY -24px, opacity 0.6
 *  - progress 0.5 → translateY -48px, opacity 0
 */
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface UseHeroScrollReactionOptions {
  /** Ref to the hero content DOM element. */
  heroContentRef:    React.RefObject<HTMLElement | null>
  /** Normalized scroll progress 0–1 from useLenis. */
  scrollProgressRef: React.RefObject<number>
  reducedMotion?:    boolean
}

export function useHeroScrollReaction({
  heroContentRef,
  scrollProgressRef,
  reducedMotion = false,
}: UseHeroScrollReactionOptions): void {
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const el = heroContentRef.current
    if (!el || reducedMotion) return

    // quickTo gives a spring-interpolated setter — much smoother than direct sets
    const setY   = gsap.quickTo(el, 'y',       { duration: 0.6, ease: 'power2.out' })
    const setO   = gsap.quickTo(el, 'opacity', { duration: 0.5, ease: 'power2.out' })

    function tick() {
      const progress = scrollProgressRef.current
      const yOffset  = progress * -80           // max -80px at progress=1
      const opacity  = Math.max(0, 1 - progress * 2.5)  // fades out by progress=0.4
      setY(yOffset)
      setO(opacity)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      gsap.set(el, { y: 0, opacity: 1 })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])
}
