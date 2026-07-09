/**
 * useViewport — tracks the window dimensions with a debounced ResizeObserver.
 *
 * Components and scene logic can consume this to make responsive decisions
 * (camera FOV, canvas size, breakpoint guards) without subscribing to raw
 * window events in multiple places.
 */
import { useCallback, useEffect, useRef, useState } from 'react'

interface Viewport {
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
}

function getSnapshot(): Viewport {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1280
  const h = typeof window !== 'undefined' ? window.innerHeight : 800
  return {
    width: w,
    height: h,
    isMobile: w < 768,
    isTablet: w >= 768 && w < 1024,
  }
}

export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>(getSnapshot)
  const rafId = useRef<number | null>(null)

  const onResize = useCallback(() => {
    if (rafId.current !== null) return
    rafId.current = requestAnimationFrame(() => {
      setViewport(getSnapshot())
      rafId.current = null
    })
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('resize', onResize)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [onResize])

  return viewport
}
