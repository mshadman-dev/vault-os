/**
 * DustParticles — lightweight procedural floating dust motes.
 *
 * Performance budget:
 *  - Single drawcall (Points primitive)
 *  - Geometry + drift speeds generated once via a module-level factory
 *    (not inside useMemo — avoids react-hooks/purity complaints about Math.random)
 *  - useFrame reads a stable positionsRef to mutate in place — zero React state changes
 *  - Pauses automatically when reducedMotion=true (returns null)
 *
 * Visual design:
 *  - Particles float in a cylindrical volume around the vault (r 1.2–4.8, h 8)
 *  - Very slow upward drift + horizontal wander
 *  - 78% steel-blue-white, 22% accent blue
 *  - Size range 0.012–0.028 — barely visible at idle, catch interior glow on unlock
 */
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { BufferGeometry, Float32BufferAttribute, Points } from 'three'

interface DustParticlesProps {
  count?:        number
  reducedMotion?: boolean
}

const TWO_PI = Math.PI * 2

// ─── Module-level geometry factory ───────────────────────────────────────────
// Placed outside any component/hook to satisfy react-hooks/purity rules.

interface DustData {
  geometry: BufferGeometry
  speeds:   Float32Array
}

function buildDustGeometry(count: number): DustData {
  const positions = new Float32Array(count * 3)
  const colors    = new Float32Array(count * 3)
  const driftSpd  = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const r     = 1.2 + Math.sqrt(Math.random()) * 3.6
    const theta = Math.random() * TWO_PI
    positions[i * 3]     = Math.cos(theta) * r
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8.0
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4.0

    const isAccent = Math.random() < 0.22
    if (isAccent) {
      colors[i * 3]     = 0.15
      colors[i * 3 + 1] = 0.48
      colors[i * 3 + 2] = 1.00
    } else {
      const bright = 0.50 + Math.random() * 0.38
      colors[i * 3]     = bright * 0.74
      colors[i * 3 + 1] = bright * 0.84
      colors[i * 3 + 2] = bright
    }

    const speed = 0.003 + Math.random() * 0.005
    driftSpd[i * 3]     = (Math.random() - 0.5) * speed
    driftSpd[i * 3 + 1] = (0.4 + Math.random() * 0.6) * speed
    driftSpd[i * 3 + 2] = (Math.random() - 0.5) * speed * 0.4
  }

  const geo = new BufferGeometry()
  geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geo.setAttribute('color',    new Float32BufferAttribute(colors,    3))

  return { geometry: geo, speeds: driftSpd }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DustParticles({ count = 140, reducedMotion = false }: DustParticlesProps) {
  const pointsRef  = useRef<Points>(null)
  // Holds stable geometry + speeds across renders — built once in useEffect
  const dataRef    = useRef<DustData | null>(null)

  // Build geometry once (avoids useMemo + purity issues)
  useEffect(() => {
    const data = buildDustGeometry(count)
    dataRef.current = data

    return () => {
      data.geometry.dispose()
      dataRef.current = null
    }
  }, [count])

  useFrame(() => {
    const data = dataRef.current
    if (!data || !pointsRef.current || reducedMotion) return

    const { geometry, speeds } = data
    const pos = geometry.attributes.position
    const arr = pos.array as Float32Array
    const n   = arr.length / 3

    for (let i = 0; i < n; i++) {
      arr[i * 3]     += speeds[i * 3]
      arr[i * 3 + 1] += speeds[i * 3 + 1]
      arr[i * 3 + 2] += speeds[i * 3 + 2]

      if (arr[i * 3 + 1] > 4.1) arr[i * 3 + 1] = -4.1

      const rx = arr[i * 3]
      const rz = arr[i * 3 + 2]
      if (rx * rx + rz * rz > 23.04) {
        arr[i * 3]     *= 0.45
        arr[i * 3 + 2] *= 0.45
      }
    }
    pos.needsUpdate = true
  })

  if (reducedMotion) return null

  // Render a placeholder Points mesh; geometry is attached via useEffect
  // We attach an empty geometry initially; it gets replaced when data loads
  return (
    <group name="dust-particles">
      {/* The geometry ref is updated imperatively in useEffect above.
          We use a ref-driven pattern instead of JSX geometry prop to avoid
          stale closure issues with dynamically built BufferGeometry. */}
      <DustPointsMesh ref={pointsRef} dataRef={dataRef} />
    </group>
  )
}

// ─── Inner mesh component ─────────────────────────────────────────────────────
// Separate component so we can forward the ref cleanly.

import { forwardRef } from 'react'

interface DustPointsMeshProps {
  dataRef: React.RefObject<DustData | null>
}

const DustPointsMesh = forwardRef<Points, DustPointsMeshProps>(
  function DustPointsMesh({ dataRef }, ref) {
    const internalRef = useRef<Points>(null)
    const mergedRef   = (ref as React.RefObject<Points>) ?? internalRef

    // Attach the BufferGeometry once dataRef is populated
    useFrame(() => {
      const mesh = mergedRef.current
      const data = dataRef.current
      if (!mesh || !data) return
      if (mesh.geometry !== data.geometry) {
        mesh.geometry = data.geometry
      }
    })

    return (
      <points ref={mergedRef} frustumCulled={false}>
        <bufferGeometry />
        <pointsMaterial
          vertexColors
          size={0.022}
          sizeAttenuation
          transparent
          opacity={0.48}
          depthWrite={false}
        />
      </points>
    )
  },
)
