import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

interface FieldProps {
  id: string;
  label: string;
  icon?: ReactNode;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

export function Field({ id, label, icon, error, hint, children, className }: FieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id} className="flex items-center gap-1.5 text-sm font-medium">
        {icon}
        {label}
      </Label>
      {children}
      {error ? (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
