import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface TrustPillProps {
  icon: ReactNode;
  label: string;
  variant?: "default" | "onGradient";
  className?: string;
}

export function TrustPill({ icon, label, variant = "default", className }: TrustPillProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs",
        variant === "default" && "border border-border bg-background/80 text-muted-foreground",
        variant === "onGradient" && "bg-white/15 text-white backdrop-blur-sm",
        className
      )}
    >
      <span className={variant === "default" ? "text-primary" : "text-white"}>{icon}</span>
      {label}
    </span>
  );
}
