// components/shared/DashboardFooter.tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface DashboardFooterProps {
  companyName?: string;
  year?: number;
  links?: FooterLink[];
  variant?: "default" | "minimal" | "compact";
  className?: string;
}

export function DashboardFooter({
  companyName = "Your Company",
  year = new Date().getFullYear(),
  links = [],
  variant = "default",
  className
}: DashboardFooterProps) {
  const variantStyles = {
    default: "border-t py-6",
    minimal: "border-t py-4",
    compact: "border-t py-2 text-sm"
  };

  return (
    <footer className={cn(
      "w-full bg-background",
      variantStyles[variant],
      className
    )}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "flex flex-col gap-4",
          variant === "compact" ? "md:flex-row items-center justify-between" : "md:flex-row items-center justify-between"
        )}>
          <div className="text-sm text-muted-foreground">
            © {year} {companyName}. All rights reserved.
          </div>
          
          {links.length > 0 && (
            <nav className="flex gap-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}