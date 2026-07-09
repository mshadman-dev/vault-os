/**
 * useAdaptiveDpr — returns a clamped device pixel ratio.
 *
 * High-DPR screens (Retina, etc.) would render at 3–4× the pixel count,
 * burning GPU for imperceptible gain. We cap at 2 and step down on mobile.
 */
import { useMemo } from 'react'

/** Returns a DPR value clamped between `min` and `max`. */
export function useAdaptiveDpr(min = 1, max = 2): number {
  return useMemo(() => {
    const raw = typeof window !== 'undefined' ? window.devicePixelRatio : 1
    return Math.min(Math.max(raw, min), max)
  }, [min, max])
}
