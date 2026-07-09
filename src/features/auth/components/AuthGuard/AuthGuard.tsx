/**
 * AuthGuard — route protection wrapper.
 *
 * requireAuth=true  → redirects unauthenticated users to /login
 * requireAuth=false → redirects authenticated users to the dashboard
 *                     (used on login/signup/forgot-password routes)
 *
 * Shows nothing while the session is being restored to avoid a flash
 * of the wrong content.
 */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSession } from "../../hooks/useSession";
import { PATHS } from "../../../../lib/constants/paths";

interface AuthGuardProps {
  /** When true, the route requires authentication. Default: true. */
  requireAuth?: boolean;
}

export function AuthGuard({ requireAuth = true }: AuthGuardProps) {
  const { isAuthenticated, loading } = useSession();
  const location = useLocation();

  // While restoring session, render nothing to avoid flash.
  if (loading) return null;

  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate
        to={PATHS.LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  if (!requireAuth && isAuthenticated) {
    const from = (location.state as { from?: Location } | null)?.from?.pathname;
    return <Navigate to={from ?? PATHS.DASHBOARD} replace />;
  }

  return <Outlet />;
}
