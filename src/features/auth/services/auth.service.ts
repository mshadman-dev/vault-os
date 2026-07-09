/**
 * AuthService — sole point of contact with Supabase Auth.
 *
 * No component or hook calls supabase.auth directly.
 * All auth side-effects are centralised here.
 */

import { supabase } from "../../../lib/supabase/client";
import type { LoginFormValues, SignupFormValues } from "../types";
import { mapAuthError } from "../constants";

export const AuthService = {
  /**
   * Sign in with email + password.
   * Throws a user-friendly error string on failure.
   */
  async login({ email, password }: LoginFormValues) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(mapAuthError(error.message));
    return data;
  },

  /**
   * Create a new account.
   * Supabase sends a confirmation email automatically when email
   * confirmation is enabled in the project settings.
   */
  async signup({ email, password }: Pick<SignupFormValues, "email" | "password">) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(mapAuthError(error.message));
    return data;
  },

  /**
   * Sign the current user out and clear the local session.
   */
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(mapAuthError(error.message));
  },

  /**
   * Send a password-reset email.
   * redirectTo is the URL Supabase will redirect to after the user clicks
   * the link — adjust if you add a dedicated reset-password page.
   */
  async forgotPassword(email: string) {
    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    if (error) throw new Error(mapAuthError(error.message));
  },

  /**
   * Return the currently authenticated user, or null.
   */
  async getCurrentUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
  },

  /**
   * Return the active session, or null.
   */
  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  /**
   * Force-refresh the access token and return the new session.
   */
  async refreshSession() {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) throw new Error(mapAuthError(error.message));
    return data.session;
  },

  /**
   * Subscribe to auth state changes.
   * Returns an unsubscribe function — call it in cleanup.
   */
  onAuthStateChange(
    callback: (event: string, session: import("@supabase/supabase-js").Session | null) => void,
  ) {
    const { data } = supabase.auth.onAuthStateChange(callback);
    return () => data.subscription.unsubscribe();
  },
};
