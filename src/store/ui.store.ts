/**
 * UI Store — ephemeral interface state.
 *
 * Tracks sidebar, mobile-drawer, and global loading flag.
 * No persistence: these values reset on every page load.
 */

import { create } from 'zustand'

// ─── State shape ─────────────────────────────────────────────────────────────

export interface UIState {
  /** Whether the desktop sidebar is in collapsed (icon-only) mode. */
  sidebarCollapsed: boolean
  /** Whether the mobile navigation drawer is open. */
  mobileDrawerOpen: boolean
  /** Global loading flag — true while an async operation is in flight. */
  loading: boolean
}

// ─── Action shape ─────────────────────────────────────────────────────────────

export interface UIActions {
  /** Toggle sidebar between expanded and collapsed. */
  toggleSidebar: () => void
  /** Explicitly set the sidebar collapsed state. */
  setSidebarCollapsed: (collapsed: boolean) => void
  /** Open the mobile drawer. */
  openDrawer: () => void
  /** Close the mobile drawer. */
  closeDrawer: () => void
  /** Toggle the mobile drawer open/closed. */
  toggleDrawer: () => void
  /** Set the global loading flag. */
  setLoading: (loading: boolean) => void
}

// ─── Initial state ────────────────────────────────────────────────────────────

const INITIAL_STATE: UIState = {
  sidebarCollapsed: false,
  mobileDrawerOpen: false,
  loading: false,
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useUIStore = create<UIState & UIActions>()((set) => ({
  ...INITIAL_STATE,

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setSidebarCollapsed: (collapsed) =>
    set({ sidebarCollapsed: collapsed }),

  openDrawer: () => set({ mobileDrawerOpen: true }),

  closeDrawer: () => set({ mobileDrawerOpen: false }),

  toggleDrawer: () =>
    set((state) => ({ mobileDrawerOpen: !state.mobileDrawerOpen })),

  setLoading: (loading) => set({ loading }),
}))
