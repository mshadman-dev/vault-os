/**
 * LoginForm — email + password sign-in form.
 *
 * Uses existing form primitives and Zod validation.
 * Calls useAuth().login() — never calls Supabase directly.
 */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormField, FormInput, FormActions } from "../../../../components/forms";
import { loginSchema, type LoginFormValues } from "../../../../lib/validation/auth.schema";
import { useAuth } from "../../hooks/useAuth";
import { PATHS } from "../../../../lib/constants/paths";
import styles from "./LoginForm.module.css";

export function LoginForm() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      navigate(PATHS.DASHBOARD, { replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed. Please try again.";
      setError("root", { message: msg });
    }
  };

  const busy = isSubmitting || loading;

  return (
    <Form aria-label="Sign in form" onSubmit={handleSubmit(onSubmit)}>
      {errors.root && (
        <p className={styles.globalError} role="alert">
          {errors.root.message}
        </p>
      )}

      <FormField label="Email" fieldId="email" required error={errors.email?.message}>
        <FormInput
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          hasError={!!errors.email}
          disabled={busy}
          {...register("email")}
        />
      </FormField>

      <FormField label="Password" fieldId="password" required error={errors.password?.message}>
        <FormInput
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          hasError={!!errors.password}
          disabled={busy}
          {...register("password")}
        />
      </FormField>

      <Link to={PATHS.FORGOT_PASSWORD} className={styles.forgotLink}>
        Forgot password?
      </Link>

      <FormActions
        submitLabel="Sign in"
        isSubmitting={busy}
        align="left"
        fullWidth
      />
    </Form>
  );
}
