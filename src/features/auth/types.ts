/**
 * Auth feature types.
 * Thin wrappers / re-exports of Supabase types used within this feature.
 */
import type { User, Session } from "@supabase/supabase-js";

export type { User, Session };

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormValues {
  email: string;
}
