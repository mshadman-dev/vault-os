/**
 * Auth feature — public API barrel.
 *
 * Consumers import from here, not from deep paths:
 *   import { LoginPage, AuthGuard, useAuth } from '../features/auth'
 */

// Pages
export { LoginPage } from "./pages/LoginPage";
export { SignupPage } from "./pages/SignupPage";
export { ForgotPasswordPage } from "./pages/ForgotPasswordPage";

// Components
export { AuthGuard } from "./components/AuthGuard";
export { AuthLayout } from "./components/AuthLayout";
export { LoginForm } from "./components/LoginForm";
export { SignupForm } from "./components/SignupForm";
export { ForgotPasswordForm } from "./components/ForgotPasswordForm";

// Hooks
export { useAuth } from "./hooks/useAuth";
export { useSession } from "./hooks/useSession";

// Service
export { AuthService } from "./services/auth.service";

// Types
export type {
  AuthState,
  LoginFormValues,
  SignupFormValues,
  ForgotPasswordFormValues,
} from "./types";
