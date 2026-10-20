// app/providers/ThemeProvider.tsx
"use client";

import { createContext, useState, useEffect } from "react";
import type { ThemeContextType, Theme, ThemeProviderProps, ResolvedTheme } from "@/types/theme";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);
  const toggleTheme = () => setThemeState((prev) => (prev === "dark" ? "light" : "dark"));

  // Derive resolvedTheme safely (always either "light" or "dark")
  const resolvedTheme: ResolvedTheme = theme === "dark" ? "dark" : "light";
  const isDark = resolvedTheme === "dark";

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
    resolvedTheme,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}