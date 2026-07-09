/**
 * useLenis — lightweight Lenis smooth scroll integration.
 *
 * Creates a single Lenis instance on mount, connects its RAF loop,
 * and exposes the scroll progress (0–1) for hero parallax effects.
 *
 * Design decisions:
 *  - No ScrollTrigger dependency — plain Lenis + requestAnimationFrame
 *  - Lenis RAF is run inside a useEffect — clean teardown on unmount
 *  - Scroll progress exposed as a ref (not state) to avoid re-renders
 *  - When reducedMotion=true, Lenis is not created
 *
 * Usage:
 *   const { scrollProgressRef, lenisRef } = useLenis({ reducedMotion })
 *
 *   // In a GSAP useFrame or plain RAF:
 *   const progress = scrollProgressRef.current  // 0 at top, 1 at bottom
 */
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

interface UseLenisOptions {
  reducedMotion?: boolean
}

interface UseLenisReturn {
  /** Current normalized scroll progress (0–1). Updated without React re-render. */
  scrollProgressRef: React.RefObject<number>
  /** The Lenis instance, if created. */
  lenisRef: React.RefObject<Lenis | null>
}

export function useLenis({ reducedMotion = false }: UseLenisOptions = {}): UseLenisReturn {
  const lenisRef          = useRef<Lenis | null>(null)
  const scrollProgressRef = useRef<number>(0)
  const rafRef            = useRef<number | null>(null)

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.8,
    })

    lenisRef.current = lenis

    // Track normalized scroll progress
    lenis.on('scroll', ({ progress }: { progress: number }) => {
      scrollProgressRef.current = progress
    })

    // Run Lenis inside its own RAF loop
    function raf(time: number) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  return { scrollProgressRef, lenisRef }
}
