/**
 * loaders — asset loader configuration and preload utilities.
 *
 * Phase 9B.1 stub. GLB preloading and texture loading helpers will be
 * registered here so Suspense boundaries can cache assets once.
 *
 * Example (future phase):
 *   useGLTF.preload('/models/vault.glb')
 */

/** Paths to static 3D assets, kept as a single source of truth. */
export const ASSET_PATHS = {
  // vault: '/models/vault.glb',      // populated in phase 9B.2
} as const
