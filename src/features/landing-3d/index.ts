/**
 * landing-3d — public surface of the 3D landing experience feature.
 *
 * Import from here rather than from internal paths to keep the feature
 * encapsulated and allow internal restructuring without breaking callsites.
 */
export { Experience } from './components/Experience'
export { LandingCanvas } from './components/LandingCanvas'
export { Scene } from './scene/Scene'
export { useAdaptiveDpr } from './hooks/useAdaptiveDpr'
export { useReducedMotion } from './hooks/useReducedMotion'
export { useViewport } from './hooks/useViewport'
