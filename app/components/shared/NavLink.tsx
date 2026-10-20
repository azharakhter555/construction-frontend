import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

// components/shared/NavLink.tsx

interface NavLinkProps {
  href: string;
  children?: React.ReactNode; // ✅ ADD THIS
  icon?: React.ReactNode;
  label?: string;
  sidebarOpen?: boolean;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
  onClick?: () => void;
}

export function NavLink({
  href,
  children, // ✅ ADD THIS PARAMETER
  icon,
  label,
  sidebarOpen = true,
  className = "",
  activeClassName = "",
  exact = false,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname?.startsWith(href);

  // If children is provided, render children
  if (children) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "text-md font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-muted-foreground",
          className,
          isActive ? activeClassName : ""
        )}
      >
        {children}
      </Link>
    );
  }

  // If label is provided (for sidebar with icon)
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
        {icon && <span className="h-4 w-4 shrink-0">{icon}</span>}
        {sidebarOpen && <span>{label}</span>}
        {!sidebarOpen && <span className="sr-only">{label}</span>}
      </Link>
    );
  }

  return null;
}
