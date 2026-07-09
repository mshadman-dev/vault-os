/**
 * Experience — orchestration layer for the 3D landing experience.
 *
 * Coordinates:
 *  - LandingCanvas (WebGL context + scene)
 *  - useLenis (smooth scroll)
 *  - useHeroScrollReaction (hero content parallax on scroll)
 *
 * The overlay div is created here and passed into the canvas so the
 * unlock sequence can animate it from within the R3F world.
 *
 * Props:
 *  heroContentRef — passed down from LandingPage for scroll reaction
 */
import { useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLenis } from '../hooks/useLenis'
import { useHeroScrollReaction } from '../hooks/useHeroScrollReaction'
import { LandingCanvas } from './LandingCanvas'

interface ExperienceProps {
  heroContentRef?: React.RefObject<HTMLElement | null>
  onUnlockReady:   (trigger: (navigateFn: () => void) => void) => void
  overlayRef:      React.RefObject<HTMLDivElement | null>
}

export function Experience({ heroContentRef, onUnlockReady, overlayRef }: ExperienceProps) {
  const reducedMotion = useReducedMotion()
  const { scrollProgressRef } = useLenis({ reducedMotion })

  // Wire hero scroll parallax if a ref was provided
  const fallbackRef = useRef<HTMLElement>(null)
  useHeroScrollReaction({
    heroContentRef:    heroContentRef ?? fallbackRef,
    scrollProgressRef,
    reducedMotion,
  })

  return (
    <LandingCanvas
      overlayRef={overlayRef}
      onUnlockReady={onUnlockReady}
    />
  )
}
