/**
 * CameraRig — structural placeholder for the future camera animation system.
 *
 * Phase 9B.1 only stubs this file. GSAP-driven camera movement and scroll
 * syncing will be implemented in a later phase.
 */
import type { ReactNode } from 'react'
import { useRef } from 'react'
import type { Group } from 'three'

interface CameraRigProps {
  children?: ReactNode
}

/**
 * Wraps scene children in a Group that future camera animations can target.
 * Currently renders a transparent pass-through.
 */
export function CameraRig({ children }: CameraRigProps) {
  const rigRef = useRef<Group>(null)

  return (
    <group ref={rigRef} name="camera-rig">
      {children}
    </group>
  )
}
