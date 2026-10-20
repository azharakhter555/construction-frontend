// types/theme.ts
export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme; // Add this
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}
