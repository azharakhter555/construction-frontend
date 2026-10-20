// components/shared/ThemeToggle.tsx
"use client";

import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "icon" | "minimal" | "full"; // Define allowed variants
  className?: string;
}

export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const [mounted] = useState(() => {
    if (typeof window === "undefined") return false;
    return true;
  });

  if (!mounted) {
    return (
      <button
        className={cn(
          "p-2 rounded hover:bg-muted/20 transition-colors",
          variant === "minimal" && "p-1",
          className
        )}
        aria-label="Toggle theme"
      >
        <div className="h-5 w-5 animate-pulse rounded-full bg-muted" />
      </button>
    );
  }

  // Minimal variant - just icon with no background
  if (variant === "minimal") {
    return (
      <button
        onClick={toggleTheme}
        className={cn("p-1 rounded hover:bg-muted/20 transition-colors", className)}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    );
  }

  // Full variant - button with text
  if (variant === "full") {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background hover:bg-muted/20 transition-colors",
          className
        )}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        <span className="text-sm font-medium">{theme === "dark" ? "Light" : "Dark"} Mode</span>
      </button>
    );
  }

  // Default: Icon with background (icon variant)
  return (
    <button
      onClick={toggleTheme}
      className={cn("p-2 rounded hover:bg-muted/20 transition-colors", className)}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
