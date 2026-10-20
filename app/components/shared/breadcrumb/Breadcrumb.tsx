// components/shared/Breadcrumb.tsx
"use client";

import Link from "next/link";
import { 
  ChevronRight, 
  Home, 
  Slash, 
  ArrowRight,
  MoreHorizontal,
  FileText,
  Layout,
  Users,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useMemo } from "react"; // 👈 Removed usePathname import
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  badgeVariant?: "default" | "primary" | "success" | "warning" | "danger";
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  homeIcon?: boolean;
  homeHref?: string;
  separator?: React.ReactNode;
  className?: string;
  variant?: "default" | "simple" | "arrow" | "bullet" | "line" | "modern" | "gradient";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  maxItems?: number;
  showIcons?: boolean;
  onClick?: (item: BreadcrumbItem, index: number) => void;
}

const sizeStyles = {
  sm: "text-xs gap-1",
  md: "text-sm gap-1.5",
  lg: "text-base gap-2"
};

const iconSizes = {
  sm: 14,
  md: 16,
  lg: 18
};

const badgeColors = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-green-500/10 text-green-600 dark:text-green-400",
  warning: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  danger: "bg-red-500/10 text-red-600 dark:text-red-400"
};

export function Breadcrumb({ 
  items, 
  homeIcon = true, 
  homeHref = "/dashboard",
  separator,
  className,
  variant = "modern",
  size = "md",
  animated = true,
  maxItems = 5,
  showIcons = true,
  onClick
}: BreadcrumbProps) {
  // 🧠 Removed unused pathname variable
  
  // 🧠 useMemo instead of useEffect + useState
  // This calculates if we need compact view based on items length
  // It only recalculates when items or maxItems change
  const isCompact = useMemo(() => {
    return items.length > maxItems;
  }, [items.length, maxItems]);

  // Modern separator variants
  const getSeparator = () => {
    if (separator) return separator;

    switch (variant) {
      case "default":
        return <ChevronRight size={iconSizes[size]} className="text-muted-foreground/50" />;
      case "simple":
        return <Slash size={iconSizes[size]} className="text-muted-foreground/30 rotate-12" />;
      case "arrow":
        return <ArrowRight size={iconSizes[size]} className="text-muted-foreground/50" />;
      case "bullet":
        return <span className="text-muted-foreground/30 text-lg leading-none">•</span>;
      case "line":
        return <span className="text-muted-foreground/30 text-lg leading-none">|</span>;
      case "modern":
        return <ChevronRight size={iconSizes[size]} className="text-muted-foreground/30" />;
      case "gradient":
        return (
          <span className="bg-gradient-to-r from-transparent via-primary/20 to-transparent w-4 h-px" />
        );
      default:
        return <ChevronRight size={iconSizes[size]} className="text-muted-foreground" />;
    }
  };

  // 🧠 Animation variants
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 }
  };

  const renderBadge = (item: BreadcrumbItem) => {
    if (!item.badge) return null;
    
    return (
      <span className={cn(
        "ml-1.5 px-1.5 py-0.5 text-xs rounded-full",
        badgeColors[item.badgeVariant || "default"]
      )}>
        {item.badge}
      </span>
    );
  };

  const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    const content = (
      <span className="flex items-center">
        {showIcons && item.icon && (
          <span className="mr-1.5">
            {item.icon}
          </span>
        )}
        <span>{item.label}</span>
        {renderBadge(item)}
      </span>
    );

    const itemClassName = cn(
      "flex items-center transition-all duration-200",
      isLast 
        ? cn(
            "font-semibold",
            variant === "gradient" && "bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          )
        : "text-muted-foreground hover:text-foreground",
      onClick && !isLast && "cursor-pointer"
    );

    if (item.href && !isLast) {
      return (
        <Link
          href={item.href}
          className={itemClassName}
          onClick={(e) => {
            if (onClick) {
              e.preventDefault();
              onClick(item, index);
            }
          }}
        >
          {content}
        </Link>
      );
    }

    return (
      <span 
        className={itemClassName}
        onClick={() => onClick?.(item, index)}
      >
        {content}
      </span>
    );
  };

  // 🧠 Function to render items with proper typing
  const renderItems = () => {
    if (!isCompact) {
      // Simple case: show all items
      return items.map((item, index) => {
        const MotionLi = animated ? motion.li : 'li';
        
        return (
          <MotionLi
            key={index}
            variants={animated ? itemVariants : undefined}
            initial={animated ? "hidden" : undefined}
            animate={animated ? "visible" : undefined}
            exit={animated ? "exit" : undefined}
            transition={{ delay: index * 0.05 }}
            className="flex items-center"
          >
            {index > 0 && (
              <span className="mx-2 text-muted-foreground/30">
                {getSeparator()}
              </span>
            )}
            {renderItem(item, index, index === items.length - 1)}
          </MotionLi>
        );
      });
    }

    // 🧠 Compact view logic with proper typing
    // Split items into visible and hidden based on maxItems
    // We'll show first 2 and last 2 items, hide the rest
    
    // Properly typed arrays
    const visibleItems: Array<{ item: BreadcrumbItem; index: number }> = [];
    const hiddenItems: Array<{ item: BreadcrumbItem; index: number }> = [];

    // Separate items into visible and hidden
    items.forEach((item, index) => {
      // Show first 2 items
      if (index < 2) {
        visibleItems.push({ item, index });
      } 
      // Show last 2 items
      else if (index >= items.length - 2) {
        visibleItems.push({ item, index });
      } 
      // Hide everything in between
      else {
        hiddenItems.push({ item, index });
      }
    });

    return (
      <>
        {/* Render visible items */}
        {visibleItems.map(({ item, index }, visibleIndex) => {
          const MotionLi = animated ? motion.li : 'li';
          const isLast = index === items.length - 1;
          
          return (
            <MotionLi
              key={index}
              variants={animated ? itemVariants : undefined}
              initial={animated ? "hidden" : undefined}
              animate={animated ? "visible" : undefined}
              exit={animated ? "exit" : undefined}
              transition={{ delay: visibleIndex * 0.05 }}
              className="flex items-center"
            >
              {/* Show separator if not first item */}
              {index > 0 && (
                <span className="mx-2 text-muted-foreground/30">
                  {getSeparator()}
                </span>
              )}
              {renderItem(item, index, isLast)}
            </MotionLi>
          );
        })}
        
        {/* Render ellipsis if there are hidden items */}
        {hiddenItems.length > 0 && (
          <motion.li
            variants={animated ? itemVariants : undefined}
            initial={animated ? "hidden" : undefined}
            animate={animated ? "visible" : undefined}
            className="flex items-center"
          >
            <span className="mx-2 text-muted-foreground/30">
              {getSeparator()}
            </span>
            
            {/* 🧠 Dropdown menu for hidden items */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full hover:bg-accent"
                >
                  <MoreHorizontal size={iconSizes[size]} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[200px]">
                {hiddenItems.map(({ item, index }) => (
                  <DropdownMenuItem key={index} asChild>
                    {item.href ? (
                      <Link href={item.href} className="flex items-center">
                        {showIcons && item.icon && (
                          <span className="mr-2">{item.icon}</span>
                        )}
                        {item.label}
                        {renderBadge(item)}
                      </Link>
                    ) : (
                      <span className="flex items-center">
                        {showIcons && item.icon && (
                          <span className="mr-2">{item.icon}</span>
                        )}
                        {item.label}
                        {renderBadge(item)}
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.li>
        )}
      </>
    );
  };

  // Determine which component to use for animation wrapper
  const MotionWrapper = animated ? AnimatePresence : React.Fragment;

  return (
    <nav 
      className={cn(
        "flex items-center",
        sizeStyles[size],
        className
      )} 
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center flex-wrap">
        <MotionWrapper mode={animated ? "wait" : undefined}>
          {homeIcon && (
            <motion.li
              key="home"
              variants={animated ? itemVariants : undefined}
              initial={animated ? "hidden" : undefined}
              animate={animated ? "visible" : undefined}
              exit={animated ? "exit" : undefined}
              className="flex items-center"
            >
              <Link 
                href={homeHref} 
                className={cn(
                  "flex items-center text-muted-foreground hover:text-foreground transition-colors",
                  variant === "gradient" && "hover:bg-gradient-to-r hover:from-primary hover:to-primary/70 hover:bg-clip-text hover:text-transparent"
                )}
              >
                <Home size={iconSizes[size]} />
              </Link>
              {items.length > 0 && (
                <span className="mx-2 text-muted-foreground/30">
                  {getSeparator()}
                </span>
              )}
            </motion.li>
          )}
          
          {renderItems()}
        </MotionWrapper>
      </ol>

      {/* Current page indicator for mobile */}
      {items.length > 0 && (
        <div className="ml-auto text-xs text-muted-foreground lg:hidden">
          {items.length} {items.length === 1 ? 'page' : 'pages'}
        </div>
      )}
    </nav>
  );
}

// Pre-built breadcrumb presets for common pages
export const BreadcrumbPresets = {
  dashboard: (customItems?: BreadcrumbItem[]) => (
    <Breadcrumb 
      items={customItems || [{ label: "Dashboard", href: "/dashboard" }]}
      variant="modern"
      animated
    />
  ),
  
  ecommerce: {
    products: (productName?: string) => (
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard", icon: <Home size={14} /> },
          { label: "Ecommerce", href: "/dashboard/ecommerce", icon: <Layout size={14} /> },
          { label: "Products", href: "/dashboard/ecommerce/products", icon: <FileText size={14} /> },
          ...(productName ? [{ label: productName }] : [])
        ]}
        variant="modern"
        animated
      />
    ),
    
    cart: () => (
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard", icon: <Home size={14} /> },
          { label: "Ecommerce", href: "/dashboard/ecommerce", icon: <Layout size={14} /> },
          { label: "Cart", icon: <FileText size={14} />, badge: 3, badgeVariant: "primary" }
        ]}
        variant="modern"
        animated
      />
    )
  },

  users: {
    list: () => (
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard", icon: <Home size={14} /> },
          { label: "Users", icon: <Users size={14} />, badge: "24", badgeVariant: "success" }
        ]}
        variant="modern"
        animated
      />
    ),
    
    profile: (userName: string) => (
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard", icon: <Home size={14} /> },
          { label: "Users", href: "/dashboard/users", icon: <Users size={14} /> },
          { label: userName }
        ]}
        variant="modern"
        animated
      />
    )
  },

  settings: {
    general: () => (
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard", icon: <Home size={14} /> },
          { label: "Settings", icon: <Settings size={14} /> },
          { label: "General" }
        ]}
        variant="modern"
        animated
      />
    )
  }
};