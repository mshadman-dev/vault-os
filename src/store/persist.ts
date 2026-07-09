/**
 * Persistence helper — thin wrapper around Zustand's `persist` middleware.
 *
 * A single, reusable factory keeps all localStorage concerns in one place.
 * Only settings values (theme, currency, locale, compactMode) are persisted;
 * nothing else should use this helper.
 *
 * Usage:
 *   import { createPersistConfig } from './persist'
 *   create(persist(stateCreator, createPersistConfig('vault-os/settings')))
 */

import { type PersistOptions, type StorageValue } from 'zustand/middleware'

/** Keys written to localStorage by this app. */
export const STORAGE_KEYS = {
  SETTINGS: 'vault-os/settings',
  TRANSACTIONS: 'vault-os/transactions',
} as const

/**
 * Returns a typed PersistOptions object for use with Zustand's `persist`
 * middleware.  Defaults to localStorage with JSON serialization.
 */
export function createPersistConfig<T>(
  name: (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS],
  partialize?: (state: T) => Partial<T>,
): PersistOptions<T, Partial<T>> {
  return {
    name,
    storage: {
      getItem: (key: string): StorageValue<Partial<T>> | null => {
        const raw = localStorage.getItem(key)
        if (raw === null) return null
        return JSON.parse(raw) as StorageValue<Partial<T>>
      },
      setItem: (key: string, value: StorageValue<Partial<T>>): void => {
        localStorage.setItem(key, JSON.stringify(value))
      },
      removeItem: (key: string): void => {
        localStorage.removeItem(key)
      },
    },
    ...(partialize !== undefined ? { partialize } : {}),
  }
}
