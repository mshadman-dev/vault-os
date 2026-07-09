/**
 * SignupPage — /signup
 */
import { AuthLayout } from "../components/AuthLayout";
import { SignupForm } from "../components/SignupForm";
import { PATHS } from "../../../lib/constants/paths";

export function SignupPage() {
  return (
    <AuthLayout
      heading="Create your account"
      subheading="Start tracking your finances with Vault OS."
      footerText="Already have an account?"
      footerLinkLabel="Sign in"
      footerLinkTo={PATHS.LOGIN}
    >
      <SignupForm />
    </AuthLayout>
  );
}
