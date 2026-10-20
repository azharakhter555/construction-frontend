// components/shared/Logo.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark" | "auto";
}

export function Logo({ 
  className, 
  showText = true, 
  size = "md",
  variant = "auto" 
}: LogoProps) {
  
  const { theme } = useTheme();
  // Size mappings
  const sizes = {
    sm: { width: 32, height: 32, text: "text-lg" },
    md: { width: 40, height: 40, text: "text-xl" },
    lg: { width: 48, height: 48, text: "text-2xl" },
  };

  // Determine logo source based on variant
    const resolvedVariant =
    variant === "auto" ? (theme === "dark" ? "dark" : "light") : variant;

  const logoSrc =
    resolvedVariant === "dark" ? "/logo/logo-dark.svg" : "/logo/logo-light.svg";
  // Company name for SEO
  const companyName = "ServiceHub";
  const companyDescription = "Enterprise Service Management Platform";

  return (
    <Link 
      href="/" 
      className={cn("flex items-center gap-2 focus:outline-none focus:ring-1 focus:ring-primary rounded-lg", className)}
      aria-label={`${companyName} - ${companyDescription}`}
    >
      {/* Logo Image with proper SEO attributes */}
      <div className="relative flex-shrink-0">
        <Image
  src={logoSrc}
  alt={companyName}
  width={sizes[size].width}
  height={sizes[size].height}
  priority
/>
      </div>

      {/* Company Name (optional) */}
      {showText && (
        <div className="flex flex-col">
          <span className={cn(
            "font-semibold tracking-tight",
            sizes[size].text
          )}>
            {companyName}
          </span>
          {/* Hidden description for SEO (screen readers only) */}
          <span className="sr-only">{companyDescription}</span>
        </div>
      )}
    </Link>
  );
}