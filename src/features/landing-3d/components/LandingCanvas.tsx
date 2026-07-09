/**
 * LandingCanvas — the R3F canvas for the landing experience.
 *
 * Responsibilities:
 *  - Provides the WebGL context via <Canvas>
 *  - Adaptive DPR (capped at 2, step-down on mobile)
 *  - Suspense boundary with null fallback
 *  - Error boundary so WebGL failures don't crash the page
 *  - Pauses render loop when tab is hidden (Page Visibility API)
 *  - Passes reducedMotion + overlayRef + onUnlockReady down to Scene
 */
import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import type { RootState } from '@react-three/fiber'
import { CanvasErrorBoundary } from './CanvasErrorBoundary'
import { useAdaptiveDpr } from '../hooks/useAdaptiveDpr'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Scene } from '../scene/Scene'
import styles from './LandingCanvas.module.css'

interface LandingCanvasProps {
  overlayRef:    React.RefObject<HTMLDivElement | null>
  onUnlockReady: (trigger: (navigateFn: () => void) => void) => void
}

export function LandingCanvas({ overlayRef, onUnlockReady }: LandingCanvasProps) {
  const dpr          = useAdaptiveDpr(1, 2)
  const reducedMotion = useReducedMotion()
  const r3fRef       = useRef<RootState | null>(null)

  // Pause rendering when the tab is not visible
  useEffect(() => {
    const onVisibilityChange = () => {
      const state = r3fRef.current
      if (!state) return
      if (document.hidden) {
        state.invalidate()
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  return (
    <div className={styles.root} aria-hidden="true">
      <CanvasErrorBoundary>
        <Suspense fallback={null}>
          <Canvas
            dpr={reducedMotion ? 1 : dpr}
            frameloop={reducedMotion ? 'demand' : 'always'}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            camera={undefined}
            onCreated={(state) => { r3fRef.current = state }}
            resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
          >
            <Scene
              reducedMotion={reducedMotion}
              overlayRef={overlayRef}
              onUnlockReady={onUnlockReady}
            />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  )
}
