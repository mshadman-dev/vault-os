/**
 * Lights — re-exportable lighting rig.
 *
 * All light definitions live here so they can be composed independently of
 * the scene graph. This keeps Scene.tsx clean as complexity grows.
 */

interface LightsProps {
  ambientIntensity?: number
  keyIntensity?: number
  fillIntensity?: number
}

export function Lights({
  ambientIntensity = 0.4,
  keyIntensity = 1.2,
  fillIntensity = 0.3,
}: LightsProps) {
  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={keyIntensity}
        castShadow={false}
      />
      <directionalLight
        position={[-3, -2, -4]}
        intensity={fillIntensity}
      />
    </>
  )
}
