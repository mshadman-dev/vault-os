/**
 * useSession — lightweight hook for reading session/user state only.
 *
 * Use this in components that only need to read auth state
 * without needing the login/signup/logout action wrappers.
 */

import { useAuthStore } from "../../../store/auth.store";

export function useSession() {
  const user = useAuthStore((s) => s.user);
  const session = useAuthStore((s) => s.session);
  const loading = useAuthStore((s) => s.loading);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return { user, session, loading, isAuthenticated };
}
