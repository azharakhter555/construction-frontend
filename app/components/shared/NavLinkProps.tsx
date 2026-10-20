// components/shared/NavLink.tsx (with icon support)
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children?: React.ReactNode;  // Make optional
  icon?: React.ReactNode;      // Add icon prop
  label?: string;              // Add label prop
  className?: string;
  activeClassName?: string;
  exact?: boolean;
  onClick?: () => void;
  sidebarOpen?: boolean;       // For sidebar expansion
}

export function NavLink({ 
  href, 
  children,
  icon,
  label,
  className = "",
  activeClassName = "",
  exact = false,
  onClick,
  sidebarOpen = true,
}: NavLinkProps) {
  const pathname = usePathname();
  
  const isActive = exact 
    ? pathname === href 
    : pathname?.startsWith(href);

  // If children is provided, use it (for header links)
  if (children) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-muted-foreground",
          className,
          isActive ? activeClassName : ""
        )}
      >
        {children}
      </Link>
    );
  }

  // If label is provided (for sidebar links with icon)
  if (label) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
          isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
          !sidebarOpen && "justify-center px-2",
          className,
          isActive ? activeClassName : ""
        )}
      >
        {icon && <span className="h-4 w-4">{icon}</span>}
        {sidebarOpen && <span>{label}</span>}
        {!sidebarOpen && <span className="sr-only">{label}</span>}
      </Link>
    );
  }

  // Fallback
  return null;
}