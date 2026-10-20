import type { ReactNode } from "react";

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ icon, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        {icon}
      </div>
      <div>
        <h2 className="text-base font-semibold leading-tight">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}
