// components/shared/StatsCard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  description?: string;
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  trend = "neutral", 
  icon: Icon,
  description,
  className 
}: StatsCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(change || description) && (
          <div className="flex items-center gap-2 mt-1">
            {change && (
              <div className={cn(
                "flex items-center text-xs",
                trend === "up" && "text-green-600",
                trend === "down" && "text-red-600",
                trend === "neutral" && "text-muted-foreground"
              )}>
                {trend === "up" && <TrendingUp className="h-3 w-3 mr-0.5" />}
                {trend === "down" && <TrendingDown className="h-3 w-3 mr-0.5" />}
                {change}
              </div>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}