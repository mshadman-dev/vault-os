/**
 * materials — shared PBR material constants for the vault.
 *
 * Defines layered metallic material properties that create the illusion of
 * real industrial steel. No textures — all PBR parameter tuning.
 *
 * Strategy:
 *  - steelBase   : dark brushed steel — primary door body
 *  - steelMid    : mid-tone panels — stepped insets
 *  - steelLight  : lighter highlights — raised panels catching the key light
 *  - steelEdge   : near-white edge catches — thin bevels, ring highlights
 *  - steelFrame  : darker outer frame — heavier mass feeling
 *  - accentBlue  : integrated blue emissive — not decorative, structural glow
 *  - steelBolt   : bolt head faces — slightly rougher, matte
 *  - interiorGlow: inside of vault — emissive blue, visible when door opens
 */

export type MaterialKey =
  | 'steelBase'
  | 'steelMid'
  | 'steelLight'
  | 'steelEdge'
  | 'steelFrame'
  | 'accentBlue'
  | 'steelBolt'
  | 'interiorGlow'
  | 'groundReflect'

export interface MaterialProps {
  color: string
  metalness: number
  roughness: number
  emissive?: string
  emissiveIntensity?: number
  envMapIntensity?: number
}

export const MATERIALS: Record<MaterialKey, MaterialProps> = {
  // Outer frame — darkest, heaviest feel
  steelFrame: {
    color: '#1a1c22',
    metalness: 0.92,
    roughness: 0.28,
    envMapIntensity: 0.9,
  },

  // Main door body — dark gunmetal
  steelBase: {
    color: '#1e2128',
    metalness: 0.88,
    roughness: 0.22,
    envMapIntensity: 1.0,
  },

  // Inset panels — slightly lighter, mid-tone
  steelMid: {
    color: '#272b34',
    metalness: 0.86,
    roughness: 0.18,
    envMapIntensity: 1.1,
  },

  // Raised panel faces — catching the key light
  steelLight: {
    color: '#3a3f4a',
    metalness: 0.80,
    roughness: 0.14,
    envMapIntensity: 1.2,
  },

  // Edge highlights — thin bevel catches, almost specular
  steelEdge: {
    color: '#7a8499',
    metalness: 0.70,
    roughness: 0.08,
    envMapIntensity: 1.4,
  },

  // Bolt heads — slightly rougher than panels
  steelBolt: {
    color: '#22262e',
    metalness: 0.94,
    roughness: 0.32,
    envMapIntensity: 0.8,
  },

  // Blue accent channels — integrated glow, not decorative
  accentBlue: {
    color: '#0a1a33',
    metalness: 0.60,
    roughness: 0.30,
    emissive: '#0055ff',
    emissiveIntensity: 0.35,
    envMapIntensity: 0.6,
  },

  // Interior — emissive deep blue, glows when door opens
  interiorGlow: {
    color: '#000510',
    metalness: 0.40,
    roughness: 0.80,
    emissive: '#0033cc',
    emissiveIntensity: 0.05,
    envMapIntensity: 0.2,
  },

  // Ground reflection plane — nearly invisible at idle
  groundReflect: {
    color: '#0d0e12',
    metalness: 0.95,
    roughness: 0.05,
    envMapIntensity: 0.4,
  },
} as const

/** Material token colors for non-mesh use (UI, particles, etc.) */
export const MATERIAL_TOKENS = {
  vaultBaseColor: '#1e2128',
  vaultMetalColor: '#7a8499',
  accentColor: '#007aff',
  emissiveAccent: '#0055ff',
  frameColor: '#1a1c22',
} as const
