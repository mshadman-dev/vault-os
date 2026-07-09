/**
 * Auth Store — ephemeral authentication state.
 *
 * Stores user, session, loading, and error only.
 * No Supabase calls live here — all auth operations go through AuthService.
 * AuthProvider is responsible for populating this store.
 */

import { create } from "zustand";
import type { User, Session } from "@supabase/supabase-js";

// ─── State shape ──────────────────────────────────────────────────────────────

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// ─── Action shape ─────────────────────────────────────────────────────────────

export interface AuthActions {
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

// ─── Initial state ────────────────────────────────────────────────────────────

const INITIAL_STATE: AuthState = {
  user: null,
  session: null,
  loading: true,
  error: null,
  isAuthenticated: false,
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState & AuthActions>()((set) => ({
  ...INITIAL_STATE,

  setUser: (user) =>
    set({ user, isAuthenticated: user !== null }),

  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      isAuthenticated: session !== null,
    }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  reset: () => set({ ...INITIAL_STATE, loading: false }),
}));
