import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variant definitions ─────────────────────────────────── */

const badgeVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-1",
    "rounded-md px-2 py-0.5",
    "text-xs font-medium leading-tight",
    "border",
    "transition-colors duration-150",
    "select-none",
  ],
  {
    variants: {
      variant: {
        /** Electric Blue — default accent */
        default: [
          "bg-accent-blue-muted text-accent-blue border-accent-blue/20",
        ],
        /** Violet — secondary accent */
        violet: [
          "bg-accent-violet-muted text-accent-violet border-accent-violet/20",
        ],
        /** Success — green semantic */
        success: [
          "bg-semantic-success-muted text-semantic-success border-semantic-success/20",
        ],
        /** Warning — amber semantic */
        warning: [
          "bg-semantic-warning-muted text-semantic-warning border-semantic-warning/20",
        ],
        /** Error / destructive — red semantic */
        error: [
          "bg-semantic-error-muted text-semantic-error border-semantic-error/20",
        ],
        /** Neutral muted — low emphasis label */
        muted: [
          "bg-surface-2 text-muted-foreground border-border-default",
        ],
        /** Solid Electric Blue — high-emphasis filled */
        solid: [
          "bg-accent-blue text-white border-transparent",
        ],
        /** Outline-only — no fill */
        outline: [
          "bg-transparent text-foreground border-border-strong",
        ],
      },
      size: {
        sm: "px-1.5 py-px text-[10px]",
        md: "px-2 py-0.5 text-xs",
        lg: "px-2.5 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

/* ─── Types ───────────────────────────────────────────────── */

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Optional dot indicator rendered before the label */
  dot?: boolean;
}

/* ─── Component ───────────────────────────────────────────── */

function Badge({ className, variant, size, dot = false, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {dot && (
        <span
          className="size-1.5 rounded-full bg-current opacity-80 shrink-0"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

/* ─── Exports ─────────────────────────────────────────────── */

export { Badge, badgeVariants };
