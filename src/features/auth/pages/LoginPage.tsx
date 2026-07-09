/**
 * LoginPage — /login
 */
import { AuthLayout } from "../components/AuthLayout";
import { LoginForm } from "../components/LoginForm";
import { PATHS } from "../../../lib/constants/paths";

export function LoginPage() {
  return (
    <AuthLayout
      heading="Welcome back"
      subheading="Sign in to your Vault OS account."
      footerText="Don't have an account?"
      footerLinkLabel="Create one"
      footerLinkTo={PATHS.SIGNUP}
    >
      <LoginForm />
    </AuthLayout>
  );
}
