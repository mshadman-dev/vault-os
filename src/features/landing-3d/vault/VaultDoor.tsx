/**
 * VaultDoor — procedural heavy industrial vault door.
 *
 * Geometry strategy (all procedural, zero external assets):
 *
 *  Frame:
 *    Thick outer ring built from a TorusGeometry + flat backing disc.
 *    Chamfered bevel created with a slightly smaller torus in steelEdge.
 *
 *  Door body:
 *    Layered cylinders (large → small → smaller) to create a stepped,
 *    embossed panel face. Each step = one CylinderGeometry disc.
 *    Pivot point is at the LEFT edge (x = -doorRadius) so the door
 *    rotates open like a real hinge.
 *
 *  Locking bolts:
 *    4 × CylinderGeometry arranged around the door face at 90° intervals.
 *    All bolts share a boltsGroup that scales inward during retraction.
 *
 *  Center wheel:
 *    Built from a thick central hub disc + 6 spokes (CylinderGeometry,
 *    rotated like clock hands) + an outer rim ring. The whole assembly
 *    sits on the doorGroup and rotates as one unit.
 *
 *  Interior plane:
 *    A disc slightly behind the door face, emissive blue, visible when
 *    door swings open.
 *
 *  Blue accent channels:
 *    3 thin TorusGeometry rings in accentBlue material — integrated into
 *    the door's step geometry, not floating in space.
 *
 * Exposed via forwardRef as VaultDoorRefs for animation hooks.
 */
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { CylinderGeometry, TorusGeometry, SphereGeometry } from 'three'
import type { Group, Mesh } from 'three'
import { MATERIALS } from '../materials/materials'

/** Handles exposed to parent for GSAP animation. */
export interface VaultDoorRefs {
  /** Entire door slab — rotates open on Y axis. */
  doorGroup:     Group | null
  /** Combination wheel assembly — rotates on Z axis. */
  wheelGroup:    Group | null
  /** Bolt cluster group — scales inward during retraction. */
  boltsGroup:    Group | null
  /** Interior emissive mesh — brightens when door opens. */
  interiorMesh:  Mesh | null
}

// ─── Geometry constants ──────────────────────────────────────────────────────

const FRAME_R        = 2.40   // outer frame inner radius (door fits inside)
const FRAME_TUBE     = 0.28   // frame tube thickness
const DOOR_R         = 2.00   // main door disc radius
const DOOR_DEPTH     = 0.32   // door body total depth
const PANEL1_R       = 1.72   // first step panel radius
const PANEL1_DEPTH   = 0.10   // step 1 protrusion
const PANEL2_R       = 1.30   // second step radius
const PANEL2_DEPTH   = 0.10   // step 2 protrusion
const PANEL3_R       = 0.88   // innermost step radius
const PANEL3_DEPTH   = 0.06
const BOLT_R         = 0.095  // bolt head radius
const BOLT_H         = 0.22   // bolt protrusion height
const BOLT_DIST      = 1.62   // radial distance from center
const WHEEL_HUB_R    = 0.24   // center hub radius
const WHEEL_HUB_H    = 0.22   // hub height
const WHEEL_RIM_R    = 0.60   // wheel outer rim ring radius
const WHEEL_RIM_TUBE = 0.055  // rim torus tube
const SPOKE_COUNT    = 6
const SPOKE_LEN      = 0.38   // spoke length from hub to rim
const SPOKE_R        = 0.045  // spoke radius
// Hinge pivot offset — door rotates around its left edge
const HINGE_X        = -(FRAME_R - 0.05)

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Outer frame: thick torus + backing disc + bevel ring */
function VaultFrame() {
  const frameGeo = useMemo(
    () => new TorusGeometry(FRAME_R + FRAME_TUBE * 0.5, FRAME_TUBE, 14, 128),
    [],
  )
  const bevelGeo = useMemo(
    () => new TorusGeometry(FRAME_R + FRAME_TUBE * 0.52, FRAME_TUBE * 0.18, 10, 128),
    [],
  )
  const innerBevelGeo = useMemo(
    () => new TorusGeometry(FRAME_R - 0.01, 0.05, 8, 128),
    [],
  )
  const backGeo = useMemo(
    () => new CylinderGeometry(FRAME_R + FRAME_TUBE * 1.0, FRAME_R + FRAME_TUBE * 1.0, 0.12, 128, 1),
    [],
  )

  return (
    <group name="vault-frame">
      {/* Main frame ring */}
      <mesh geometry={frameGeo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial {...MATERIALS.steelFrame} />
      </mesh>
      {/* Outer bevel highlight */}
      <mesh geometry={bevelGeo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.01]}>
        <meshStandardMaterial {...MATERIALS.steelEdge} />
      </mesh>
      {/* Inner edge highlight */}
      <mesh geometry={innerBevelGeo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, FRAME_TUBE * 0.3]}>
        <meshStandardMaterial {...MATERIALS.steelEdge} />
      </mesh>
      {/* Backing plate */}
      <mesh geometry={backGeo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -FRAME_TUBE - 0.04]}>
        <meshStandardMaterial {...MATERIALS.steelBase} />
      </mesh>
    </group>
  )
}

/** Interior glow disc — visible behind the door when it opens */
const InteriorPlane = forwardRef<Mesh>(function InteriorPlane(_props, ref) {
  const geo = useMemo(
    () => new CylinderGeometry(DOOR_R * 0.98, DOOR_R * 0.98, 0.05, 128, 1),
    [],
  )
  return (
    <mesh ref={ref} geometry={geo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.50]}>
      <meshStandardMaterial {...MATERIALS.interiorGlow} />
    </mesh>
  )
})

/** A single locking bolt */
function Bolt({ x, y }: { x: number; y: number }) {
  const shaftGeo = useMemo(
    () => new CylinderGeometry(BOLT_R, BOLT_R * 0.85, BOLT_H, 16, 1),
    [],
  )
  const headGeo = useMemo(
    () => new CylinderGeometry(BOLT_R * 1.3, BOLT_R * 1.3, 0.06, 16, 1),
    [],
  )
  const edgeGeo = useMemo(
    () => new TorusGeometry(BOLT_R * 1.3, 0.012, 8, 24),
    [],
  )

  const z = DOOR_DEPTH * 0.5 + PANEL1_DEPTH + PANEL2_DEPTH

  return (
    <group position={[x, y, 0]}>
      {/* Shaft */}
      <mesh geometry={shaftGeo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z]}>
        <meshStandardMaterial {...MATERIALS.steelBolt} />
      </mesh>
      {/* Head */}
      <mesh geometry={headGeo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z + BOLT_H * 0.5 + 0.01]}>
        <meshStandardMaterial {...MATERIALS.steelMid} />
      </mesh>
      {/* Edge highlight */}
      <mesh geometry={edgeGeo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z + BOLT_H * 0.5 + 0.04]}>
        <meshStandardMaterial {...MATERIALS.steelEdge} />
      </mesh>
    </group>
  )
}

/** All 4 locking bolts — at N/S/E/W positions */
const BoltCluster = forwardRef<Group>(function BoltCluster(_props, ref) {
  const positions: [number, number][] = [
    [0,        BOLT_DIST],   // top
    [0,       -BOLT_DIST],   // bottom
    [BOLT_DIST,  0],         // right
    [-BOLT_DIST, 0],         // left
  ]
  return (
    <group ref={ref} name="bolts">
      {positions.map(([x, y], i) => (
        <Bolt key={i} x={x} y={y} />
      ))}
    </group>
  )
})

/** One spoke of the combination wheel */
function Spoke({ angle }: { angle: number }) {
  const geo = useMemo(
    () => new CylinderGeometry(SPOKE_R, SPOKE_R * 0.7, SPOKE_LEN, 10, 1),
    [],
  )
  const x = Math.cos(angle) * (WHEEL_HUB_R + SPOKE_LEN * 0.5)
  const y = Math.sin(angle) * (WHEEL_HUB_R + SPOKE_LEN * 0.5)
  const rotZ = angle + Math.PI / 2

  return (
    <mesh geometry={geo} position={[x, y, 0]} rotation={[0, 0, rotZ]}>
      <meshStandardMaterial {...MATERIALS.steelLight} />
    </mesh>
  )
}

/** Combination wheel — hub + spokes + rim ring */
const WheelAssembly = forwardRef<Group>(function WheelAssembly(_props, ref) {
  const hubGeo = useMemo(
    () => new CylinderGeometry(WHEEL_HUB_R, WHEEL_HUB_R * 0.9, WHEEL_HUB_H, 32, 1),
    [],
  )
  const hubCapGeo = useMemo(
    () => new SphereGeometry(WHEEL_HUB_R * 0.45, 20, 16),
    [],
  )
  const rimGeo = useMemo(
    () => new TorusGeometry(WHEEL_RIM_R, WHEEL_RIM_TUBE, 12, 72),
    [],
  )
  const rimEdgeGeo = useMemo(
    () => new TorusGeometry(WHEEL_RIM_R, WHEEL_RIM_TUBE * 0.35, 8, 72),
    [],
  )

  const zBase = DOOR_DEPTH * 0.5 + PANEL1_DEPTH + PANEL2_DEPTH + PANEL3_DEPTH + 0.02
  const spokeAngles = Array.from({ length: SPOKE_COUNT }, (_, i) =>
    (i / SPOKE_COUNT) * Math.PI * 2,
  )

  return (
    <group ref={ref} name="wheel" position={[0, 0, zBase]}>
      {/* Hub disc */}
      <mesh geometry={hubGeo} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial {...MATERIALS.steelMid} />
      </mesh>
      {/* Hub center cap */}
      <mesh geometry={hubCapGeo} position={[0, 0, WHEEL_HUB_H * 0.5 + 0.01]}>
        <meshStandardMaterial {...MATERIALS.steelEdge} />
      </mesh>
      {/* Spokes */}
      {spokeAngles.map((a) => (
        <Spoke key={a} angle={a} />
      ))}
      {/* Outer rim */}
      <mesh geometry={rimGeo} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial {...MATERIALS.steelMid} />
      </mesh>
      {/* Rim edge highlight */}
      <mesh geometry={rimEdgeGeo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, WHEEL_RIM_TUBE * 0.4]}>
        <meshStandardMaterial {...MATERIALS.steelEdge} />
      </mesh>
    </group>
  )
})

/** The full door slab — stepped panels, bolts, wheel, accent rings */
function DoorBody({
  doorRef,
  wheelRef,
  boltsRef,
  interiorRef,
}: {
  doorRef:     React.RefObject<Group | null>
  wheelRef:    React.RefObject<Group | null>
  boltsRef:    React.RefObject<Group | null>
  interiorRef: React.RefObject<Mesh | null>
}) {
  // Door body discs — from back to front (stepped)
  const bodyGeo = useMemo(
    () => new CylinderGeometry(DOOR_R, DOOR_R, DOOR_DEPTH, 128, 1),
    [],
  )
  const panel1Geo = useMemo(
    () => new CylinderGeometry(PANEL1_R, PANEL1_R, PANEL1_DEPTH, 96, 1),
    [],
  )
  const panel1EdgeGeo = useMemo(
    () => new TorusGeometry(PANEL1_R, 0.022, 10, 96),
    [],
  )
  const panel2Geo = useMemo(
    () => new CylinderGeometry(PANEL2_R, PANEL2_R, PANEL2_DEPTH, 80, 1),
    [],
  )
  const panel2EdgeGeo = useMemo(
    () => new TorusGeometry(PANEL2_R, 0.018, 10, 80),
    [],
  )
  const panel3Geo = useMemo(
    () => new CylinderGeometry(PANEL3_R, PANEL3_R, PANEL3_DEPTH, 64, 1),
    [],
  )
  const panel3EdgeGeo = useMemo(
    () => new TorusGeometry(PANEL3_R, 0.015, 8, 64),
    [],
  )
  // Blue accent channel rings
  const accent1Geo = useMemo(
    () => new TorusGeometry(PANEL1_R - 0.14, 0.018, 8, 96),
    [],
  )
  const accent2Geo = useMemo(
    () => new TorusGeometry(PANEL2_R - 0.10, 0.014, 8, 80),
    [],
  )
  const accent3Geo = useMemo(
    () => new TorusGeometry(0.48, 0.010, 8, 64),
    [],
  )

  const z0 = 0
  const z1 = DOOR_DEPTH * 0.5 + PANEL1_DEPTH * 0.5
  const z2 = DOOR_DEPTH * 0.5 + PANEL1_DEPTH + PANEL2_DEPTH * 0.5
  const z3 = DOOR_DEPTH * 0.5 + PANEL1_DEPTH + PANEL2_DEPTH + PANEL3_DEPTH * 0.5

  return (
    // doorGroup pivot is at the left edge — hinge point
    <group ref={doorRef} name="door" position={[-HINGE_X, 0, 0]}>
      {/* Shift all geometry back to center it around the hinge */}
      <group position={[HINGE_X, 0, 0]}>
        <InteriorPlane ref={interiorRef} />

        {/* Door body */}
        <mesh geometry={bodyGeo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z0]}>
          <meshStandardMaterial {...MATERIALS.steelBase} />
        </mesh>

        {/* Step 1 panel */}
        <mesh geometry={panel1Geo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z1]}>
          <meshStandardMaterial {...MATERIALS.steelMid} />
        </mesh>
        <mesh geometry={panel1EdgeGeo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z1 + PANEL1_DEPTH * 0.5 + 0.01]}>
          <meshStandardMaterial {...MATERIALS.steelEdge} />
        </mesh>
        {/* Accent ring 1 */}
        <mesh geometry={accent1Geo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z1 + PANEL1_DEPTH * 0.5 + 0.008]}>
          <meshStandardMaterial {...MATERIALS.accentBlue} />
        </mesh>

        {/* Step 2 panel */}
        <mesh geometry={panel2Geo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z2]}>
          <meshStandardMaterial {...MATERIALS.steelLight} />
        </mesh>
        <mesh geometry={panel2EdgeGeo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z2 + PANEL2_DEPTH * 0.5 + 0.01]}>
          <meshStandardMaterial {...MATERIALS.steelEdge} />
        </mesh>
        {/* Accent ring 2 */}
        <mesh geometry={accent2Geo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z2 + PANEL2_DEPTH * 0.5 + 0.008]}>
          <meshStandardMaterial {...MATERIALS.accentBlue} />
        </mesh>

        {/* Step 3 / innermost panel */}
        <mesh geometry={panel3Geo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z3]}>
          <meshStandardMaterial {...MATERIALS.steelMid} />
        </mesh>
        <mesh geometry={panel3EdgeGeo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z3 + PANEL3_DEPTH * 0.5 + 0.01]}>
          <meshStandardMaterial {...MATERIALS.steelEdge} />
        </mesh>
        {/* Accent ring 3 (small, near center) */}
        <mesh geometry={accent3Geo} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z3 + PANEL3_DEPTH * 0.5 + 0.008]}>
          <meshStandardMaterial {...MATERIALS.accentBlue} />
        </mesh>

        {/* Locking bolts */}
        <BoltCluster ref={boltsRef} />

        {/* Combination wheel */}
        <WheelAssembly ref={wheelRef} />
      </group>
    </group>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export const VaultDoor = forwardRef<VaultDoorRefs>(function VaultDoor(_props, ref) {
  const doorGroupRef  = useRef<Group>(null)
  const wheelGroupRef = useRef<Group>(null)
  const boltsGroupRef = useRef<Group>(null)
  const interiorRef   = useRef<Mesh>(null)

  useImperativeHandle(ref, () => ({
    get doorGroup()    { return doorGroupRef.current },
    get wheelGroup()   { return wheelGroupRef.current },
    get boltsGroup()   { return boltsGroupRef.current },
    get interiorMesh() { return interiorRef.current },
  }))

  return (
    <group name="vault-door-assembly">
      <VaultFrame />
      <DoorBody
        doorRef={doorGroupRef}
        wheelRef={wheelGroupRef}
        boltsRef={boltsGroupRef}
        interiorRef={interiorRef}
      />
    </group>
  )
})
