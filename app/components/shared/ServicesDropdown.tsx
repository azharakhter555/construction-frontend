// components/shared/ServicesDropdown.tsx
"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ServiceItem {
  href: string;
  label: string;
}

interface ServicesDropdownProps {
  variant?: "default" | "mobile" | "sidebar";
  className?: string;
    services?: ServiceItem[]; // 👈 new prop
    menuName?: string;
}

// Default service list (kept as fallback)
const defaultServices: ServiceItem[] = [
  { href: "/services/driving", label: "🚗 Driving Lessons" },
  { href: "/services/theory", label: "📚 Theory Test Prep" },
  { href: "/services/advanced", label: "🏎️ Advanced Courses" },
  { href: "/services/refresher", label: "🔄 Refresher Courses" },
];

export function HeaderDropdown({
  variant = "default",
  className,
    services = defaultServices, // 👈 use prop or 
   menuName="services"
  
}: ServicesDropdownProps) {
  // Mobile variant
  if (variant === "mobile") {
    return (
      <div className={cn("space-y-2", className)}>
        <p className="text-md font-medium text-muted-foreground">Services</p>
        <div className="ml-4 flex flex-col space-y-2">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="text-md text-foreground hover:text-primary transition-colors"
            >
              {service.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Sidebar variant
  if (variant === "sidebar") {
    return (
      <div className={cn("space-y-1", className)}>
        <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {menuName}
        </p>
        {services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {service.label}
          </Link>
        ))}
      </div>
    );
  }

  // Default dropdown for header
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1 text-md font-medium text-muted-foreground hover:text-primary transition-colors",
            className
          )}
        >
          {menuName}
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-48">
        {services.map((service) => (
          <DropdownMenuItem key={service.href} asChild>
            <Link href={service.href} className="cursor-pointer">
              {service.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}