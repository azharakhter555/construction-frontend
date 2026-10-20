// components/layout/MobileNavItem.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href?: string;
  children?: { href: string; label: string }[];
}

export function MobileNavItem({ item, onItemClick }: { item: NavItem; onItemClick?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  // Simple link with href
  if (item.href) {
    return (
      <Link
        href={item.href}
        className="block px-3 py-3 rounded-md text-md font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        onClick={onItemClick}
      >
        {item.label}
      </Link>
    );
  }

  // Collapsible section with children
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button
          className={cn(
            "flex items-center justify-between w-full px-3 py-3 rounded-md text-md font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
            isOpen && "bg-accent/50 text-accent-foreground"
          )}
        >
          <span>{item.label}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200 flex-shrink-0",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-6 pr-2 space-y-1 mt-1">
        {item.children?.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className="block px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
            onClick={onItemClick}
          >
            {child.label}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}