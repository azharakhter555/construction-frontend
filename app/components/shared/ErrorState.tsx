// components/shared/ErrorState.tsx
"use client";

import { RefreshCw, AlertCircle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ErrorVariant = "default" | "warning" | "critical";

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: Error;
  onRetry?: () => void;
  variant?: ErrorVariant;
  fullPage?: boolean;
  className?: string;
}

const variantConfig = {
  default: {
    icon: AlertCircle,
    iconColor: "text-destructive",
    title: "Something went wrong",
  },
  warning: {
    icon: AlertCircle,
    iconColor: "text-yellow-600",
    title: "Warning",
  },
  critical: {
    icon: ShieldAlert,
    iconColor: "text-destructive",
    title: "Critical Error",
  },
};

export function ErrorState({
  title,
  message,
  error,
  onRetry,
  variant = "default",
  fullPage = false,
  className,
}: ErrorStateProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;
  
  const displayTitle = title || config.title;
  const displayMessage = message || error?.message || "An unexpected error occurred";

  const content = (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-4",
        fullPage && "h-[60vh]",
        className
      )}
    >
      <div className={cn("rounded-full bg-destructive/10 p-3", config.iconColor)}>
        <Icon className="h-6 w-6" />
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-lg font-medium">{displayTitle}</p>
        <p className="text-sm text-muted-foreground max-w-md">
          {displayMessage}
        </p>
      </div>

      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );

  if (fullPage) {
    return content;
  }

  return (
    <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6">
      {content}
    </div>
  );
}