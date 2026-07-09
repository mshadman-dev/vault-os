/**
 * Settings Store — persistent user preferences.
 *
 * This is the only store that writes to localStorage.  The `persist`
 * middleware is scoped exclusively to the four preference fields:
 * theme, currency, locale, and compactMode.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createPersistConfig, STORAGE_KEYS } from './persist'

// ─── Types ────────────────────────────────────────────────────────────────────

export type Theme = 'light' | 'dark' | 'system'

/** ISO 4217 currency code (e.g. "USD", "EUR", "GBP"). */
export type CurrencyCode = string

/** BCP 47 locale tag (e.g. "en-US", "de-DE"). */
export type LocaleTag = string

// ─── State shape ─────────────────────────────────────────────────────────────

export interface SettingsState {
  /** Active colour theme. */
  theme: Theme
  /** ISO 4217 currency code used for formatting. */
  currency: CurrencyCode
  /** BCP 47 locale tag used for number/date formatting. */
  locale: LocaleTag
  /** Whether to use a denser, more compact layout. */
  compactMode: boolean
}

// ─── Action shape ─────────────────────────────────────────────────────────────

export interface SettingsActions {
  setTheme: (theme: Theme) => void
  setCurrency: (currency: CurrencyCode) => void
  setLocale: (locale: LocaleTag) => void
  setCompactMode: (compact: boolean) => void
}

// ─── Initial state ────────────────────────────────────────────────────────────

const INITIAL_STATE: SettingsState = {
  theme: 'system',
  currency: 'USD',
  locale: 'en-US',
  compactMode: false,
}

// ─── Persist config ───────────────────────────────────────────────────────────

/**
 * Only the four preference fields are written to localStorage.
 * Nothing else (future transient fields) will accidentally be persisted.
 */
const persistConfig = createPersistConfig<SettingsState & SettingsActions>(
  STORAGE_KEYS.SETTINGS,
  (state): Partial<SettingsState & SettingsActions> => ({
    theme: state.theme,
    currency: state.currency,
    locale: state.locale,
    compactMode: state.compactMode,
  }),
)

// ─── Store ────────────────────────────────────────────────────────────────────

export const useSettingsStore = create<SettingsState & SettingsActions>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      setTheme: (theme) => set({ theme }),
      setCurrency: (currency) => set({ currency }),
      setLocale: (locale) => set({ locale }),
      setCompactMode: (compact) => set({ compactMode: compact }),
    }),
    persistConfig,
  ),
)
