"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { useThemeStore } from "@/hooks/useTheme";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { theme } = useThemeStore();

  return (
    <NextThemesProvider {...props} forcedTheme={theme === "system" ? undefined : theme}>
      {children}
    </NextThemesProvider>
  );
}