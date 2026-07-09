/**
 * SignupForm — email + password + confirm signup form.
 *
 * Shows a success state when Supabase sends the confirmation email.
 * Calls useAuth().signup() — never calls Supabase directly.
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormInput, FormActions } from "../../../../components/forms";
import { signupSchema, type SignupFormValues } from "../../../../lib/validation/auth.schema";
import { useAuth } from "../../hooks/useAuth";
import styles from "./SignupForm.module.css";

export function SignupForm() {
  const { signup, loading } = useAuth();
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (values: SignupFormValues) => {
    try {
      await signup({ email: values.email, password: values.password });
      setEmailSent(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Sign up failed. Please try again.";
      setError("root", { message: msg });
    }
  };

  if (emailSent) {
    return (
      <p className={styles.successBanner} role="status">
        Check your inbox — we sent a confirmation link to your email address.
        Click it to activate your account.
      </p>
    );
  }

  const busy = isSubmitting || loading;

  return (
    <Form aria-label="Create account form" onSubmit={handleSubmit(onSubmit)}>
      {errors.root && (
        <p className={styles.globalError} role="alert">
          {errors.root.message}
        </p>
      )}

      <FormField label="Email" fieldId="signup-email" required error={errors.email?.message}>
        <FormInput
          id="signup-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          hasError={!!errors.email}
          disabled={busy}
          {...register("email")}
        />
      </FormField>

      <FormField
        label="Password"
        fieldId="signup-password"
        required
        error={errors.password?.message}
        helperText="At least 8 characters"
      >
        <FormInput
          id="signup-password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          hasError={!!errors.password}
          disabled={busy}
          {...register("password")}
        />
      </FormField>

      <FormField
        label="Confirm password"
        fieldId="confirm-password"
        required
        error={errors.confirmPassword?.message}
      >
        <FormInput
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          hasError={!!errors.confirmPassword}
          disabled={busy}
          {...register("confirmPassword")}
        />
      </FormField>

      <FormActions
        submitLabel="Create account"
        isSubmitting={busy}
        align="left"
        fullWidth
      />
    </Form>
  );
}
