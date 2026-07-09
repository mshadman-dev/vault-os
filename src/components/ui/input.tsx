import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Types ───────────────────────────────────────────────── */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Renders a helper text or error message below the input */
  hint?: string;
  /** When true, applies error styles and wires aria-invalid */
  hasError?: boolean;
  /** Icon rendered on the left side of the input */
  leadingIcon?: React.ReactNode;
  /** Icon or element rendered on the right side of the input */
  trailingIcon?: React.ReactNode;
}

/* ─── Component ───────────────────────────────────────────── */

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      hint,
      hasError = false,
      leadingIcon,
      trailingIcon,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const hintId = hint && id ? `${id}-hint` : undefined;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Input wrapper — needed for icon positioning */}
        <div className="relative flex items-center">
          {/* Leading icon */}
          {leadingIcon && (
            <span
              className="pointer-events-none absolute left-3 flex items-center text-muted-foreground [&_svg]:size-4"
              aria-hidden="true"
            >
              {leadingIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            type={type}
            disabled={disabled}
            aria-invalid={hasError ? "true" : undefined}
            aria-describedby={hintId}
            className={cn(
              // Layout
              "w-full h-10 rounded-lg px-3 py-2 text-sm",
              // Colors
              "bg-input text-foreground placeholder:text-muted-foreground",
              // Border
              "border border-border-default",
              // Transitions
              "transition-colors duration-150",
              // Focus
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-1 focus-visible:ring-offset-surface-0",
              "focus-visible:border-accent-blue",
              // Hover
              "hover:border-border-strong",
              // Disabled
              "disabled:cursor-not-allowed disabled:opacity-40",
              // Error state
              hasError && [
                "border-semantic-error",
                "focus-visible:ring-semantic-error",
                "focus-visible:border-semantic-error",
              ],
              // Icon padding adjustments
              leadingIcon && "pl-9",
              trailingIcon && "pr-9",
              className,
            )}
            {...props}
          />

          {/* Trailing icon */}
          {trailingIcon && (
            <span
              className="pointer-events-none absolute right-3 flex items-center text-muted-foreground [&_svg]:size-4"
              aria-hidden="true"
            >
              {trailingIcon}
            </span>
          )}
        </div>

        {/* Hint / error message */}
        {hint && (
          <p
            id={hintId}
            className={cn(
              "text-xs leading-tight px-0.5",
              hasError ? "text-semantic-error" : "text-muted-foreground",
            )}
          >
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

/* ─── Exports ─────────────────────────────────────────────── */

export { Input };
