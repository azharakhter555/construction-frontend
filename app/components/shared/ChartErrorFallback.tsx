"use client";


import { AlertCircle } from "lucide-react";


export function ChartErrorFallback() {
    return (
        <div className="h-[300px] w-full border border-destructive/50 rounded-lg bg-destructive/5 flex flex-col items-center justify-center">
      <AlertCircle className="h-8 w-8 text-destructive mb-2" />
      <p className="text-sm font-medium">Failed to load chart</p>
      <p className="text-xs text-muted-foreground mt-1">Please refresh the page</p>
    </div>
    )
}