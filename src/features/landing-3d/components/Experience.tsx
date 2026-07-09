/**
 * Experience — top-level composition layer for the 3D landing experience.
 *
 * Assembles LandingCanvas (WebGL context) with future orchestration layers
 * (scroll controller, GSAP context, Lenis provider). For now it is a thin
 * pass-through so callsites only need to import one component.
 */
import { LandingCanvas } from './LandingCanvas'

export function Experience() {
  return <LandingCanvas />
}
