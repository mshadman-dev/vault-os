/**
 * VaultRings — decorative concentric metallic rings on the door face.
 *
 * Phase 9B.4: Rings sit at slightly higher Z on the stepped panels.
 * Alternating edge-highlight rings create depth illusion.
 */
import { useMemo } from 'react'
import { TorusGeometry } from 'three'
import { MATERIALS } from '../materials/materials'

interface RingDef {
  radius: number
  tube: number
  z: number
  material: keyof typeof MATERIALS
}

const RING_DEFS: RingDef[] = [
  { radius: 1.54, tube: 0.050, z: 0.09, material: 'steelMid'   },
  { radius: 1.54, tube: 0.018, z: 0.12, material: 'steelEdge'  },
  { radius: 1.12, tube: 0.044, z: 0.14, material: 'steelLight' },
  { radius: 1.12, tube: 0.015, z: 0.17, material: 'steelEdge'  },
  { radius: 0.72, tube: 0.038, z: 0.15, material: 'steelMid'   },
]

interface RingProps extends RingDef {
  _key?: string
}

function Ring({ radius, tube, z, material }: RingProps) {
  const geo = useMemo(
    () => new TorusGeometry(radius, tube, 18, 96),
    [radius, tube],
  )
  return (
    <mesh geometry={geo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z]}>
      <meshStandardMaterial {...MATERIALS[material]} />
    </mesh>
  )
}

export function VaultRings() {
  return (
    <group name="vault-rings">
      {RING_DEFS.map((def) => (
        <Ring key={`${def.radius}-${def.tube}`} {...def} />
      ))}
    </group>
  )
}
