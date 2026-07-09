import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Card ────────────────────────────────────────────────── */

/**
 * Root card container.
 * Uses the Surface (#121212) background with a single-pixel border.
 * Compose with CardHeader, CardContent, and CardFooter.
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Net Worth</CardTitle>
 *     <CardDescription>All accounts combined</CardDescription>
 *   </CardHeader>
 *   <CardContent>…</CardContent>
 *   <CardFooter>…</CardFooter>
 * </Card>
 */
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl bg-surface-1 border border-border-default",
        "shadow-md",
        "text-foreground",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

/* ─── CardHeader ──────────────────────────────────────────── */

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/* ─── CardTitle ───────────────────────────────────────────── */

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold text-base leading-tight tracking-tight text-foreground", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/* ─── CardDescription ─────────────────────────────────────── */

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-snug", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/* ─── CardContent ─────────────────────────────────────────── */

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-6 pb-6 pt-0", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

/* ─── CardFooter ──────────────────────────────────────────── */

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center px-6 pb-6 pt-0 gap-3",
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

/* ─── Exports ─────────────────────────────────────────────── */

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
