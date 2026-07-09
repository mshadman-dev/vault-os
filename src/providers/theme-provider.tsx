import { useEffect, type PropsWithChildren } from "react";

/**
 * ThemeProvider — VAULT OS ships dark-only.
 *
 * Sets the `dark` class on `<html>` unconditionally so all
 * shadcn/ui @custom-variant dark rules resolve correctly.
 * No light-mode toggle exists in v1.0.
 */
export function ThemeProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    root.setAttribute("data-theme", "dark");
  }, []);

  return <>{children}</>;
}
