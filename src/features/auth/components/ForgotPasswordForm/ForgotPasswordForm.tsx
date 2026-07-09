/**
 * ForgotPasswordForm — email-only form for password reset.
 *
 * Shows a success state after the reset email is sent.
 * Calls useAuth().forgotPassword() — never calls Supabase directly.
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormInput, FormActions } from "../../../../components/forms";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../../../../lib/validation/auth.schema";
import { useAuth } from "../../hooks/useAuth";
import styles from "./ForgotPasswordForm.module.css";

export function ForgotPasswordForm() {
  const { forgotPassword, loading } = useAuth();
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      await forgotPassword(values.email);
      setEmailSent(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError("root", { message: msg });
    }
  };

  if (emailSent) {
    return (
      <p className={styles.successBanner} role="status">
        If an account exists for that email, you'll receive a password reset link shortly.
      </p>
    );
  }

  const busy = isSubmitting || loading;

  return (
    <Form aria-label="Reset password form" onSubmit={handleSubmit(onSubmit)}>
      {errors.root && (
        <p className={styles.globalError} role="alert">
          {errors.root.message}
        </p>
      )}

      <FormField
        label="Email"
        fieldId="forgot-email"
        required
        error={errors.email?.message}
        helperText="We'll send a reset link to this address."
      >
        <FormInput
          id="forgot-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          hasError={!!errors.email}
          disabled={busy}
          {...register("email")}
        />
      </FormField>

      <FormActions
        submitLabel="Send reset link"
        isSubmitting={busy}
        align="left"
        fullWidth
      />
    </Form>
  );
}
