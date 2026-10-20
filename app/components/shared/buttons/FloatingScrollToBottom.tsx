// components/FloatingScrollToBottom.tsx
"use client";

import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FloatingScrollToBottomProps {
  /** Hide once user scrolls past this many pixels (default: 400) */
  hideAfter?: number;
  /** CSS selector of the target to scroll to (default: #contact) */
  targetSelector?: string;
  /** Label shown on larger screens */
  label?: string;
  className?: string;
}

export function FloatingScrollToBottom({
  hideAfter = 400,
  targetSelector = "#contact",
  label = "Get a Quote",
  className,
}: FloatingScrollToBottomProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < hideAfter);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideAfter]);

  const scrollToTarget = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const target = document.querySelector(targetSelector);
    if (target) {
      target.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    } else {
      // Fallback: scroll to the bottom of the document
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: prefersReduced ? "auto" : "smooth",
      });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTarget}
      aria-label={label}
      className={cn(
        "group fixed bottom-24 right-6 z-50 flex items-center gap-2 rounded-full",
        "bg-primary text-primary-foreground px-4 py-3 md:px-5",
        "shadow-[0_10px_30px_-8px_rgba(10,41,70,0.55),0_0_20px_rgba(202,151,46,0.25)]",
        "border border-secondary/40",
        "transition-all duration-500",
        "hover:-translate-y-1 hover:bg-primary/95 hover:border-secondary",
        "hover:shadow-[0_14px_38px_-8px_rgba(10,41,70,0.7),0_0_28px_rgba(202,151,46,0.45)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-10 pointer-events-none",
        className
      )}
    >
      {/* Icon */}
      <span className="flex h-6 w-6 items-center justify-center">
        <ArrowDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
      </span>

      {/* Label — hidden on very small screens */}
      <span className="hidden text-sm font-semibold sm:inline">{label}</span>
    </button>
  );
}
