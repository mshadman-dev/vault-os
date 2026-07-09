/**
 * Auth feature constants.
 */

export const AUTH_REDIRECT_URL =
  typeof window !== "undefined"
    ? `${window.location.origin}/auth/callback`
    : "";

export const PASSWORD_MIN_LENGTH = 8;

export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "Invalid login credentials": "Incorrect email or password.",
  "Email not confirmed":
    "Please check your email and confirm your account first.",
  "User already registered": "An account with this email already exists.",
  "Password should be at least 6 characters":
    `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
};

/** Translate a raw Supabase error message to a user-friendly string. */
export function mapAuthError(message: string): string {
  return AUTH_ERROR_MESSAGES[message] ?? message;
}
