/**
 * useCameraAnimation — GSAP-driven cinematic camera controller.
 *
 * Phase 9B.4: Refactored to support pause/resume so the unlock sequence
 * can take over the camera without fighting with idle tweens.
 *
 * Exposes:
 *   setIdlePaused(true)  — kills idle timelines, leaves camera where it is
 *   setIdlePaused(false) — restarts idle from current camera position
 *
 * Lifecycle:
 *   mount  → entrance (Z 10.5 → 7.5) ~2.5 s
 *   after  → idle loop (float, drift, orbit, FOV breathe)
 *   unlock → setIdlePaused(true) called by useUnlockSequence
 */
import { useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { PerspectiveCamera } from 'three'

// ─── Design tokens ────────────────────────────────────────────────────────────

const SETTLED        = { x: 0, y: 0, z: 7.5 }
const ENTRANCE_START = { x: 0.4, y: 0.3, z: 10.5 }
const IDLE_ROTATION  = { xAmp: 0.012, yAmp: 0.016 }
const IDLE_FLOAT_AMP = 0.06
const BREATHE        = { min: 44.4, max: 45.6 }

// ─── Hook ─────────────────────────────────────────────────────────────────────

interface UseCameraAnimationOptions {
  enabled: boolean
}

export function useCameraAnimation(
  cameraRef: React.RefObject<PerspectiveCamera | null>,
  { enabled }: UseCameraAnimationOptions,
) {
  // Holds the idle context so we can kill/restart it independently
  const idleCtxRef = useRef<gsap.Context | null>(null)
  const entranceCtxRef = useRef<gsap.Context | null>(null)

  const startIdle = useCallback(() => {
    const camera = cameraRef.current
    if (!camera) return

    idleCtxRef.current?.kill()
    idleCtxRef.current = gsap.context(() => {
      const idle = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: 'sine.inOut' },
      })

      idle.to(camera.position, { y: SETTLED.y + IDLE_FLOAT_AMP, duration: 4.8 }, 0)
      idle.to(camera.position, { x: SETTLED.x + 0.04, duration: 6.2 }, 0)
      idle.to(camera.rotation, { y: IDLE_ROTATION.yAmp, duration: 7.1 }, 0)
      idle.to(camera.rotation, { x: -IDLE_ROTATION.xAmp, duration: 5.5 }, 0)
      idle.to(camera, {
        fov: BREATHE.max,
        duration: 5.0,
        onUpdate: () => camera.updateProjectionMatrix(),
      }, 0)

      // Counter-oscillation
      gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' }, delay: 3.1 })
        .to(camera.position, { x: SETTLED.x - 0.04, duration: 6.2 })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setIdlePaused = useCallback((paused: boolean) => {
    if (paused) {
      idleCtxRef.current?.kill()
      idleCtxRef.current = null
    } else {
      startIdle()
    }
  }, [startIdle])

  useEffect(() => {
    const camera = cameraRef.current
    if (!camera) return

    if (!enabled) {
      camera.position.set(SETTLED.x, SETTLED.y, SETTLED.z)
      camera.rotation.set(0, 0, 0)
      return
    }

    entranceCtxRef.current?.kill()
    entranceCtxRef.current = gsap.context(() => {
      camera.position.set(ENTRANCE_START.x, ENTRANCE_START.y, ENTRANCE_START.z)
      camera.rotation.set(0.025, 0.04, 0)

      const entrance = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: startIdle,
      })

      entrance.to(camera.position, { x: SETTLED.x, y: SETTLED.y, z: SETTLED.z, duration: 2.5 }, 0)
      entrance.to(camera.rotation, { x: 0, y: 0, z: 0, duration: 2.4 }, 0)
    })

    const capturedCamera = camera
    return () => {
      entranceCtxRef.current?.kill()
      idleCtxRef.current?.kill()
      capturedCamera.fov = 45
      capturedCamera.updateProjectionMatrix()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  return { setIdlePaused }
}
