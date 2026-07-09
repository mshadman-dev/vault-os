/**
 * CameraRig — camera animation system wrapper.
 *
 * Integrates useCameraAnimation (entrance + idle loop) and exposes
 * setIdlePaused via forwardRef so the unlock sequence can take over
 * camera control without fighting with the idle tweens.
 *
 * All scene content is rendered as children inside the rig group so
 * the camera and scene objects share the same coordinate space.
 */
import { forwardRef, useImperativeHandle, type ReactNode } from 'react'
import type { PerspectiveCamera } from 'three'
import { useCameraAnimation } from '../hooks/useCameraAnimation'

export interface CameraRigHandle {
  /** Pause or resume the idle camera drift loop. */
  setIdlePaused: (paused: boolean) => void
}

interface CameraRigProps {
  children?: ReactNode
  /** Ref to the PerspectiveCamera created in Scene. */
  cameraRef: React.RefObject<PerspectiveCamera | null>
  /** When true, suppresses entrance + idle animations. */
  reducedMotion?: boolean
}

export const CameraRig = forwardRef<CameraRigHandle, CameraRigProps>(
  function CameraRig({ children, cameraRef, reducedMotion = false }, ref) {
    const { setIdlePaused } = useCameraAnimation(cameraRef, {
      enabled: !reducedMotion,
    })

    useImperativeHandle(ref, () => ({
      setIdlePaused,
    }))

    return (
      <group name="camera-rig">
        {children}
      </group>
    )
  },
)
