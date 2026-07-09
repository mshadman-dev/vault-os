/**
 * Scene — the minimal Three.js scene graph for the landing experience.
 *
 * Contains only lighting and structural placeholders.
 * No geometry, no meshes, no animations — those come in later phases.
 */
import { useRef } from 'react'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import type { Group } from 'three'

interface SceneProps {
  reducedMotion?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- will be consumed when animations are added
export function Scene({ reducedMotion: _reducedMotion = false }: SceneProps) {
  /** Empty group that future vault model phases will populate. */
  const vaultGroupRef = useRef<Group>(null)

  return (
    <>
      {/* ── Camera ─────────────────────────────────────────────────────── */}
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 6]}
        fov={50}
        near={0.1}
        far={100}
      />

      {/* ── Ambient fill ───────────────────────────────────────────────── */}
      <ambientLight intensity={0.4} />

      {/* ── Primary directional key light ──────────────────────────────── */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.2}
        castShadow={false}
      />

      {/* ── Subtle rim/fill light ──────────────────────────────────────── */}
      <directionalLight
        position={[-3, -2, -4]}
        intensity={0.3}
      />

      {/* ── Environment — city HDR placeholder at near-zero intensity ──── */}
      <Environment preset="city" background={false} environmentIntensity={0.1} />

      {/* ── Atmospheric fog ────────────────────────────────────────────── */}
      <fog attach="fog" args={['#0a0a0a', 12, 30]} />

      {/* ── Vault model mount-point (populated in future phases) ────────── */}
      <group ref={vaultGroupRef} name="vault-root" />
    </>
  )
}
