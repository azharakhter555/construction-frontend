"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  image?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  /** Show the padded height or full hero */
  size?: "sm" | "md" | "lg";
  className?: string;
}

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export function PageHero({
  eyebrow = "Paddy Kehoe Suspended Ceilings",
  title,
  description,
  breadcrumbs = [{ label: "Home", href: "/" }, { label: "Page" }],
  image = "/assets/pic1.jpg",
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  size = "md",
  className,
}: PageHeroProps) {
  const heights = {
    sm: "min-h-[40vh] md:min-h-[45vh]",
    md: "min-h-[50vh] md:min-h-[60vh]",
    lg: "min-h-[60vh] md:min-h-[70vh]",
  };

  return (
    <section
      className={cn("relative flex w-full items-center overflow-hidden", heights[size], className)}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${image}')` }}
      />

      {/* Directional overlay (dark on left, clear on right) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,41,70,0.94) 0%, rgba(10,41,70,0.82) 35%, rgba(10,41,70,0.45) 70%, rgba(10,41,70,0.15) 100%)",
        }}
      />

      {/* Bottom fade — blends into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#0A2946]/40"
      />

      {/* Gold ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-secondary/20 blur-[140px]"
      />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 md:px-12 md:py-20">
        <div className="max-w-3xl">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex flex-wrap items-center gap-1.5 text-xs font-medium text-white/60
              animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="inline-flex items-center gap-1.5">
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-secondary">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-secondary">{crumb.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3 text-white/30" />}
                </span>
              ))}
            </nav>
          )}

          {/* Eyebrow */}
          {eyebrow && (
            <span
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wider text-[#0A2946]
              shadow-[0_0_20px_rgba(202,151,46,0.45)] ring-1 ring-secondary/60
              animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              ⭐ {eyebrow}
            </span>
          )}

          {/* Title */}
          <h1
            className="text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl
            animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          {/* Description */}
          {description && (
            <p
              className="mt-5 max-w-2xl text-base text-white/85 md:text-lg
              animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both"
            >
              {description}
            </p>
          )}

          {/* CTAs */}
          {(ctaLabel || secondaryCtaLabel) && (
            <div
              className="mt-8 flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
              style={{ animationDelay: "500ms" }}
            >
              {ctaLabel && ctaHref && (
                <Button
                  asChild
                  size="lg"
                  className="font-semibold bg-secondary text-[#0A2946]
                  shadow-[0_10px_30px_-8px_rgba(202,151,46,0.7)]
                  hover:-translate-y-0.5 hover:bg-secondary/90
                  hover:shadow-[0_14px_38px_-8px_rgba(202,151,46,0.9)]
                  transition-all duration-300"
                >
                  <Link href={ctaHref}>{ctaLabel}</Link>
                </Button>
              )}

              {secondaryCtaLabel && secondaryCtaHref && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="font-semibold border-white/40 bg-white/10 text-white backdrop-blur-sm
                  hover:bg-white/20 hover:border-white/60
                  hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
