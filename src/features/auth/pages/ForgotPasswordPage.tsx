/**
 * ForgotPasswordPage — /forgot-password
 */
import { AuthLayout } from "../components/AuthLayout";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { PATHS } from "../../../lib/constants/paths";

export function ForgotPasswordPage() {
  return (
    <AuthLayout
      heading="Reset your password"
      subheading="Enter your email and we'll send you a reset link."
      footerText="Remember your password?"
      footerLinkLabel="Back to sign in"
      footerLinkTo={PATHS.LOGIN}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
