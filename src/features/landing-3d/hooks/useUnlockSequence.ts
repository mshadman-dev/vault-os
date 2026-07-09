/**
 * useUnlockSequence — master GSAP cinematic timeline for the vault unlock.
 *
 * Sequence (total ~5.8 s before navigation):
 *   t=0.0  Wheel spins fast (multiple rotations) — combination entry feel
 *   t=1.1  Wheel settles — heavy deceleration
 *   t=1.4  Bolts retract radially (boltsGroup.scale shrinks inward) — staggered
 *   t=2.7  Short pause — anticipation
 *   t=2.7  Door rotates open (rotation.y → -1.48 rad) — slow heavy pivot
 *   t=2.75 Interior glow fades in — blue light leaks
 *   t=3.8  Camera begins travelling through the doorway (Z: 7.5 → 0.8)
 *   t=5.5  Fade-to-black overlay opacity → 1
 *   t=5.8  navigate() fires via onComplete
 *
 * All animations inside a single gsap.context() for leak-free cleanup.
 * Returns: triggerUnlock(navigateFn) — call when CTA is clicked.
 *
 * reducedMotion=true: skips all animation and calls navigateFn immediately.
 */
import { useCallback, useRef } from 'react'
import gsap from 'gsap'
import type { MeshStandardMaterial, PointLight, PerspectiveCamera } from 'three'
import type { VaultDoorRefs } from '../vault/VaultDoor'

interface UnlockTargets {
  vaultRefs:      React.RefObject<VaultDoorRefs | null>
  cameraRef:      React.RefObject<PerspectiveCamera | null>
  interiorLight:  React.RefObject<PointLight | null>
  setIdlePaused:  (paused: boolean) => void
  overlayRef:     React.RefObject<HTMLDivElement | null>
  reducedMotion:  boolean
}

export function useUnlockSequence(targets: UnlockTargets) {
  const ctxRef = useRef<gsap.Context | null>(null)

  const triggerUnlock = useCallback(
    (navigateFn: () => void) => {
      const {
        vaultRefs, cameraRef, interiorLight,
        setIdlePaused, overlayRef, reducedMotion,
      } = targets

      if (reducedMotion) {
        navigateFn()
        return
      }

      ctxRef.current?.kill()

      const vault    = vaultRefs.current
      const camera   = cameraRef.current
      const intLight = interiorLight.current
      const overlay  = overlayRef.current

      if (!vault || !camera) {
        navigateFn()
        return
      }

      setIdlePaused(true)

      const startZ   = camera.position.z
      const startFov = camera.fov

      ctxRef.current = gsap.context(() => {
        const master = gsap.timeline({
          onComplete: () => {
            // Restore camera state after navigation mounts new page
            camera.position.z = startZ
            camera.fov = startFov
            camera.updateProjectionMatrix()
            navigateFn()
          },
        })

        // ── WHEEL SPIN ─────────────────────────────────────────────────
        if (vault.wheelGroup) {
          master.to(vault.wheelGroup.rotation, {
            z: Math.PI * 8.5,
            duration: 1.10,
            ease: 'power2.in',
          }, 0)
          master.to(vault.wheelGroup.rotation, {
            z: Math.PI * 9.0,
            duration: 0.55,
            ease: 'expo.out',
          }, 1.10)
        }

        // ── BOLT RETRACTION ────────────────────────────────────────────
        if (vault.boltsGroup) {
          master.to(vault.boltsGroup.scale, {
            x: 0.55,
            y: 0.55,
            duration: 0.55,
            ease: 'power3.inOut',
          }, 1.40)
          master.to(vault.boltsGroup.scale, {
            x: 0.40,
            y: 0.40,
            duration: 0.30,
            ease: 'power2.in',
          }, 1.95)
        }

        // ── VAULT DOOR OPENS ───────────────────────────────────────────
        if (vault.doorGroup) {
          master.to(vault.doorGroup.rotation, {
            y: -1.48,
            duration: 1.80,
            ease: 'power4.inOut',
          }, 2.70)
        }

        // ── INTERIOR LIGHT FLOODS IN ───────────────────────────────────
        if (intLight) {
          master.to(intLight, {
            intensity: 9.0,
            duration: 1.60,
            ease: 'power2.inOut',
          }, 2.75)
        }

        if (vault.interiorMesh) {
          const mat = vault.interiorMesh.material as MeshStandardMaterial
          master.to(mat, {
            emissiveIntensity: 1.4,
            duration: 1.6,
            ease: 'power2.inOut',
          }, 2.75)
        }

        // ── CAMERA TRAVELS THROUGH ─────────────────────────────────────
        master.to(camera.position, {
          z: 0.8,
          x: 0,
          y: 0,
          duration: 2.20,
          ease: 'power2.inOut',
        }, 3.80)
        master.to(camera.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.80,
          ease: 'power2.out',
        }, 3.80)
        master.to(camera, {
          fov: 38,
          duration: 2.20,
          ease: 'power2.inOut',
          onUpdate: () => { camera.updateProjectionMatrix() },
        }, 3.80)

        // ── FADE TO BLACK ──────────────────────────────────────────────
        if (overlay) {
          master.to(overlay, {
            opacity: 1,
            duration: 0.55,
            ease: 'power2.in',
          }, 5.40)
        }
      })
    },
    // targets is a stable object containing refs — safe to exclude from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return { triggerUnlock }
}
