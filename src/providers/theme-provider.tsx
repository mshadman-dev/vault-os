import type { PropsWithChildren } from "react";

export function ThemeProvider({
  children,
}: PropsWithChildren) {
  return (
    <div className="dark bg-black text-white">
      {children}
    </div>
  );
}