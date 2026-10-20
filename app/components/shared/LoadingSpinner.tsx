// components/shared/LoadingSpinner.tsx
"use client";

import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
  text?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = "md", 
  fullPage = false,
  text,
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  const spinner = (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <RefreshCw className={cn("animate-spin text-muted-foreground", sizeClasses[size])} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        {spinner}
      </div>
    );
  }

  return spinner;
}