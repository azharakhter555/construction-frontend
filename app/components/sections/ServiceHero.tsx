"use client";

import Link from "next/link";
import type { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export interface ServiceHeroProps {
  /** Background image: URL string OR static import (e.g. import img from "@/public/img.jpg") */
  backgroundImage?: string | StaticImageData;
  /** Side the solid colour overlay comes from: 'left' or 'right' (default: 'left') */
  overlaySide?: "left" | "right";
  /** Override overlay colour (default: uses primary from theme) */
  overlayColor?: string;
  /** Content alignment: 'left' or 'right' (default: 'left') */
  alignment?: "left" | "right";
  /** Number of stars (e.g. 5) */
  rating?: number;
  /** Rating label (e.g. "5 Star rated Driving School on Google & Facebook") */
  ratingText?: string;
  /** Main heading */
  title: string;
  /** Subheading / description */
  subtitle: string;
  /** Primary CTA (e.g. "Prices") */
  ctaPrimary?: {
    label: string;
    href: string;
  };
  /** Phone number (displayed as a button) */
  ctaPhone?: string;
  /** Extra child content (optional) */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export function ServiceHero({
  backgroundImage,
  overlaySide = "left",
  overlayColor,
  alignment = "left",
  rating = 5,
  ratingText = "5 Star rated Driving School on Google & Facebook",
  title = "Start Your Driving Lessons with National Driving School.",
  subtitle = "Time to kick start your driving lessons Dublin with one of the highest rated driving schools around.",
  ctaPrimary = { label: "Prices", href: "/prices" },
  ctaPhone = "085 118 1111",
  children,
  className,
}: ServiceHeroProps) {
  // Resolve the image src: if it's a StaticImageData, use .src, else use the string
  const imageSrc =
    backgroundImage && typeof backgroundImage === "object" && "src" in backgroundImage
      ? backgroundImage.src
      : backgroundImage;

  const gradientDirection = overlaySide === "left" ? "to right" : "to left";

  const overlayStyle = {
    backgroundImage: `linear-gradient(${gradientDirection}, ${overlayColor || "var(--primary)"} 0%, transparent 100%)`,
  };

  const contentJustify =
    alignment === "left" ? "justify-start" : "justify-end";

  return (
    <section
      className={cn(
        "relative py-20 px-6 overflow-hidden transition-colors",
        "min-h-[400px] md:min-h-[500px]",
        !imageSrc && "bg-muted/30",
        className
      )}
      style={
        imageSrc
          ? {
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {/* Overlay gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={overlayStyle}
      />

      {/* Content */}
      <div
        className={cn(
          "relative z-10 max-w-6xl mx-auto flex items-center min-h-[300px]",
          contentJustify
        )}
      >
        <div
          className={cn(
            "max-w-2xl p-8 rounded-2xl",
            "bg-background/80 backdrop-blur-sm",
            "border border-border/50",
            "shadow-2xl",
            alignment === "right" ? "ml-auto" : "mr-auto"
          )}
        >
          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-2 mb-2">
              <div className="stars flex text-secondary">
                {Array.from({ length: rating }).map((_, i) => (
                  <i key={i} className="fas fa-star text-sm" />
                ))}
              </div>
              {ratingText && (
                <span className="text-sm font-medium text-foreground/80">
                  {ratingText}
                </span>
              )}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground mb-4">
            {title}
          </h1>

          <p className="text-lg text-muted-foreground mb-6">{subtitle}</p>

          <div className="flex flex-wrap items-center gap-4">
            {ctaPrimary && (
              <Link
                href={ctaPrimary.href}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
              >
                {ctaPrimary.label}
                <i className="fas fa-arrow-right text-sm" />
              </Link>
            )}
            {ctaPhone && (
              <a
                href={`tel:${ctaPhone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors shadow-md"
              >
                <i className="fas fa-phone-alt" />
                {ctaPhone}
              </a>
            )}
          </div>

          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </section>
  );
}