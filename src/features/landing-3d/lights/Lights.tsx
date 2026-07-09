/**
 * Lights — full cinematic lighting rig for the vault experience.
 *
 * Strategy (no bloom, no post-processing):
 *
 *  1. ambientLight        — very dim, just lifts black shadows
 *  2. keyLight            — directional from upper-right, primary specular driver
 *  3. rimLightLeft        — directional from back-left, creates edge separation
 *  4. rimLightRight       — directional from back-right, secondary edge catch
 *  5. interiorPointLight  — PointLight inside vault, starts at 0, animates to ~9
 *                           during unlock. Ref exposed for GSAP control.
 *  6. groundBounce        — faint warm-ish light from below, ground reflection feel
 *
 * No bloom or post-processing is used. Edge catches come from the steelEdge
 * material's high specularity + rim lights hitting at grazing angles.
 */
import { forwardRef } from 'react'
import type { PointLight } from 'three'

export const Lights = forwardRef<PointLight>(function Lights(_props, ref) {
  return (
    <>
      {/* ── Ambient: lifts deep shadows, keep very dark ──────────────── */}
      <ambientLight intensity={0.08} />

      {/* ── Key light: upper-right front — primary specular driver ────── */}
      <directionalLight
        position={[5.0, 7.0, 5.5]}
        intensity={1.6}
        color="#d6e4ff"
        castShadow={false}
      />

      {/* ── Rim left: back-left, cool blue — steel edge separation ────── */}
      <directionalLight
        position={[-6.0, 2.0, -4.0]}
        intensity={0.90}
        color="#4488ff"
        castShadow={false}
      />

      {/* ── Rim right: back-right, lighter — secondary edge catch ─────── */}
      <directionalLight
        position={[5.5, -1.5, -3.5]}
        intensity={0.55}
        color="#aabbdd"
        castShadow={false}
      />

      {/* ── Interior point light — controlled by GSAP during unlock ────── */}
      {/* Starts at 0, floods to ~9 when door opens */}
      <pointLight
        ref={ref}
        position={[0, 0, -1.8]}
        intensity={0}
        color="#1a66ff"
        distance={12}
        decay={2}
      />

      {/* ── Ground bounce: very faint cool light from below ─────────────── */}
      <directionalLight
        position={[0, -5.0, 2.0]}
        intensity={0.18}
        color="#112244"
        castShadow={false}
      />
    </>
  )
})
