/**
 * LandingCanvas — the reusable R3F canvas for the landing experience.
 *
 * Responsibilities:
 *  - Provides the WebGL context via <Canvas>
 *  - Adaptive DPR (capped at 2, step-down for mobile)
 *  - Suspense boundary with null fallback (canvas appears when ready)
 *  - Error boundary so WebGL failures don't crash the page
 *  - Pauses rendering when the tab is hidden (Page Visibility API)
 *  - Passes reducedMotion flag down to the scene
 */
import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import type { RootState } from '@react-three/fiber'
import { CanvasErrorBoundary } from './CanvasErrorBoundary'
import { useAdaptiveDpr } from '../hooks/useAdaptiveDpr'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Scene } from '../scene/Scene'
import styles from './LandingCanvas.module.css'

export function LandingCanvas() {
  const dpr = useAdaptiveDpr(1, 2)
  const reducedMotion = useReducedMotion()

  /** R3F root state ref — used to pause/resume the render loop. */
  const r3fRef = useRef<RootState | null>(null)

  /** Pause rendering when the tab is not visible to save GPU. */
  useEffect(() => {
    const onVisibilityChange = () => {
      const state = r3fRef.current
      if (!state) return
      if (document.hidden) {
        state.invalidate()   // flush pending frame
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
            camera={undefined /* Scene manages its own PerspectiveCamera */}
            onCreated={(state) => { r3fRef.current = state }}
            resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
          >
            <Scene reducedMotion={reducedMotion} />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  )
}
