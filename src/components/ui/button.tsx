import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variant definitions ─────────────────────────────────── */

const buttonVariants = cva(
  // Base styles shared by all variants
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-lg font-medium",
    "text-sm leading-none",
    "min-h-[44px] min-w-[44px]", // WCAG min touch target
    "transition-colors duration-150 ease-in-out",
    "select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        /** Electric Blue filled — primary CTA */
        primary: [
          "bg-accent-blue text-white",
          "hover:bg-accent-blue-hover",
          "active:bg-accent-blue-active",
        ],
        /** Violet filled — secondary CTA */
        violet: [
          "bg-accent-violet text-white",
          "hover:bg-accent-violet-hover",
          "active:bg-accent-violet-active",
        ],
        /** Outlined — Electric Blue border, no fill */
        outline: [
          "border border-accent-blue text-accent-blue bg-transparent",
          "hover:bg-accent-blue-muted",
          "active:bg-accent-blue-muted",
        ],
        /** Ghost — no border, subtle hover */
        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-surface-2 hover:text-foreground",
          "active:bg-surface-3",
        ],
        /** Destructive — error red */
        destructive: [
          "bg-semantic-error text-white",
          "hover:bg-semantic-error/90",
          "active:bg-semantic-error/80",
        ],
        /** Link-style — no background or border */
        link: [
          "bg-transparent text-accent-blue underline-offset-4",
          "hover:underline hover:text-accent-blue-hover",
          "active:text-accent-blue-active",
          "min-h-0 min-w-0 p-0 h-auto",
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-10 p-0 rounded-lg",
        "icon-sm": "size-8 p-0 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

/* ─── Types ───────────────────────────────────────────────── */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Renders a loading spinner and disables the button while true */
  isLoading?: boolean;
  /** Optional accessible label for icon-only buttons */
  "aria-label"?: string;
}

/* ─── Component ───────────────────────────────────────────── */

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled ?? isLoading}
        aria-disabled={disabled ?? isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            {/* Spinner — inherits current color */}
            <svg
              className="size-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span className="sr-only">Loading…</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

/* ─── Exports ─────────────────────────────────────────────── */

export { Button, buttonVariants };
