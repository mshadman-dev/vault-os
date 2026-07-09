/**
 * useAuth — primary auth hook.
 *
 * Exposes the auth store state plus action wrappers that call
 * AuthService and keep the store updated. Components never call
 * AuthService or supabase directly.
 */

import { useCallback } from "react";
import { useAuthStore } from "../../../store/auth.store";
import { AuthService } from "../services/auth.service";
import { mapAuthError } from "../constants";
import type { LoginFormValues, SignupFormValues } from "../types";

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const session = useAuthStore((s) => s.session);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setError = useAuthStore((s) => s.setError);
  const setLoading = useAuthStore((s) => s.setLoading);
  const reset = useAuthStore((s) => s.reset);

  const login = useCallback(
    async (values: LoginFormValues) => {
      setError(null);
      setLoading(true);
      try {
        await AuthService.login(values);
        // AuthProvider listener handles setSession automatically.
      } catch (err) {
        const msg = err instanceof Error ? err.message : mapAuthError("Unknown error");
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setError, setLoading],
  );

  const signup = useCallback(
    async (values: Pick<SignupFormValues, "email" | "password">) => {
      setError(null);
      setLoading(true);
      try {
        await AuthService.signup(values);
      } catch (err) {
        const msg = err instanceof Error ? err.message : mapAuthError("Unknown error");
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setError, setLoading],
  );

  const logout = useCallback(async () => {
    setError(null);
    try {
      await AuthService.logout();
      reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : mapAuthError("Unknown error");
      setError(msg);
    }
  }, [setError, reset]);

  const forgotPassword = useCallback(
    async (email: string) => {
      setError(null);
      setLoading(true);
      try {
        await AuthService.forgotPassword(email);
      } catch (err) {
        const msg = err instanceof Error ? err.message : mapAuthError("Unknown error");
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setError, setLoading],
  );

  return {
    user,
    session,
    loading,
    error,
    isAuthenticated,
    login,
    signup,
    logout,
    forgotPassword,
  };
}
