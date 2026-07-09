/**
 * GroundPlane — subtle reflective ground surface.
 *
 * A large flat disc below the vault that acts as a ground reflection.
 * Very high metalness + very low roughness makes it a near-mirror,
 * picking up the vault and lighting as a soft subtle reflection.
 *
 * No textures. Pure PBR parameters. The plane is intentionally
 * barely visible — just enough to add perceived depth and weight.
 */
import { useMemo } from 'react'
import { CircleGeometry } from 'three'
import { MATERIALS } from '../materials/materials'

export function GroundPlane() {
  const geo = useMemo(() => new CircleGeometry(8.0, 64), [])

  return (
    <mesh
      geometry={geo}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2.80, -0.5]}
      receiveShadow={false}
    >
      <meshStandardMaterial {...MATERIALS.groundReflect} />
    </mesh>
  )
}
