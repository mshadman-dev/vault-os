/**
 * AuthProvider — bootstraps and maintains authentication state.
 *
 * Responsibilities:
 * 1. Restore the session on first mount (getSession).
 * 2. Subscribe to Supabase auth state changes.
 * 3. Keep the Zustand auth store in sync with Supabase.
 * 4. Gate the rest of the app behind a loading state until
 *    session restoration is complete.
 *
 * No UI. Pure side-effects wrapper.
 */

import { useEffect, type ReactNode } from "react";
import { AuthService } from "../features/auth/services/auth.service";
import { useAuthStore } from "../store/auth.store";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const setSession = useAuthStore((s) => s.setSession);
  const setLoading = useAuthStore((s) => s.setLoading);
  const reset = useAuthStore((s) => s.reset);

  useEffect(() => {
    // 1. Restore existing session on mount.
    AuthService.getSession().then((session) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Listen for future auth state changes (login, logout, token refresh).
    const unsubscribe = AuthService.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
      } else {
        reset();
      }
    });

    return unsubscribe;
  }, [setSession, setLoading, reset]);

  return <>{children}</>;
}
