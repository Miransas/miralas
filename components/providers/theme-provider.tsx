"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { DURATION_THEME } from "@/lib/motion";

function ThemeTransition() {
  const { resolvedTheme } = useTheme();
  const previous = React.useRef<string | undefined>(undefined);
  React.useEffect(() => {
    const changed = previous.current && previous.current !== resolvedTheme;
    previous.current = resolvedTheme;
    if (!changed || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.dataset.themeChanging = "true";
    const timer = window.setTimeout(() => delete root.dataset.themeChanging, DURATION_THEME * 1000);
    return () => {
      window.clearTimeout(timer);
      delete root.dataset.themeChanging;
    };
  }, [resolvedTheme]);
  return null;
}

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}><ThemeTransition />{children}</NextThemesProvider>;
}
