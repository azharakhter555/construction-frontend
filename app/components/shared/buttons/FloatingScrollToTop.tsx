// components/FloatingScrollToTop.tsx
"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FloatingScrollToTopProps {
  /** Show after scrolling this many pixels (default: 600) */
  showAfter?: number;
  className?: string;
}

export function FloatingScrollToTop({ showAfter = 600, className }: FloatingScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfter);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={cn(
        "group fixed bottom-24 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full",
        "border border-border bg-card text-foreground",
        "shadow-[0_8px_24px_-8px_rgba(10,41,70,0.35)]",
        "transition-all duration-500",
        "hover:-translate-y-1 hover:border-secondary/60 hover:bg-secondary hover:text-[#0A2946]",
        "hover:shadow-[0_14px_34px_-8px_rgba(202,151,46,0.6)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-10 pointer-events-none",
        className
      )}
    >
      <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
