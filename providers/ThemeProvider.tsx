"use client";

import { useThemeStore } from "@/hooks/useTheme";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";


export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { theme } = useThemeStore();

  return (
    <NextThemesProvider {...props} forcedTheme={theme === "system" ? undefined : theme}>
      {children}
    </NextThemesProvider>
  );
}