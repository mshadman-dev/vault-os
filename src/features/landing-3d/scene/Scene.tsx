/**
 * Scene — the Three.js scene graph for the landing experience.
 *
 * Wires together:
 *  - PerspectiveCamera (makeDefault)
 *  - CameraRig (entrance + idle GSAP animations, exposes setIdlePaused)
 *  - Lights (full cinematic rig with interior PointLight ref)
 *  - VaultDoor (full procedural vault geometry, exposes doorGroup/wheel/bolts refs)
 *  - DustParticles (procedural floating dust motes)
 *  - GroundPlane (subtle reflective ground surface)
 *  - useUnlockSequence (master GSAP timeline, exposed to parent via onUnlockReady)
 */
import { useRef, useEffect } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import type { PerspectiveCamera as ThreePerspectiveCamera, PointLight } from 'three'
import { Lights }          from '../lights/Lights'
import { VaultDoor }       from '../vault/VaultDoor'
import type { VaultDoorRefs } from '../vault/VaultDoor'
import { CameraRig }       from '../camera/CameraRig'
import type { CameraRigHandle } from '../camera/CameraRig'
import { DustParticles }   from './DustParticles'
import { GroundPlane }     from './GroundPlane'
import { useUnlockSequence } from '../hooks/useUnlockSequence'

interface SceneProps {
  reducedMotion?:  boolean
  overlayRef:      React.RefObject<HTMLDivElement | null>
  onUnlockReady:   (trigger: (navigateFn: () => void) => void) => void
}

export function Scene({ reducedMotion = false, overlayRef, onUnlockReady }: SceneProps) {
  const cameraRef     = useRef<ThreePerspectiveCamera>(null)
  const vaultRefs     = useRef<VaultDoorRefs>(null)
  const interiorLight = useRef<PointLight>(null)
  const cameraRigRef  = useRef<CameraRigHandle>(null)

  const { triggerUnlock } = useUnlockSequence({
    vaultRefs,
    cameraRef,
    interiorLight,
    setIdlePaused: (paused) => cameraRigRef.current?.setIdlePaused(paused),
    overlayRef,
    reducedMotion,
  })

  // Expose trigger to parent exactly once, after the component tree is ready.
  // useEffect runs after render so we're outside render — safe to schedule.
  const hasRegistered = useRef(false)
  useEffect(() => {
    if (hasRegistered.current) return
    hasRegistered.current = true
    onUnlockReady(triggerUnlock)
  // triggerUnlock and onUnlockReady are both stable (useCallback / passed once)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 7.5]}
        fov={45}
        near={0.1}
        far={100}
      />

      <CameraRig
        ref={cameraRigRef}
        cameraRef={cameraRef}
        reducedMotion={reducedMotion}
      >
        <Lights ref={interiorLight} />

        {/* Deep space fog — tightened for premium feel */}
        <fog attach="fog" args={['#050609', 18, 42]} />

        <group name="vault-root">
          <VaultDoor ref={vaultRefs} />
        </group>

        <GroundPlane />

        <DustParticles count={140} reducedMotion={reducedMotion} />
      </CameraRig>
    </>
  )
}
