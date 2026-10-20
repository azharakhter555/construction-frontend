"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
interface ContentBlockProps {
  /** Main heading */
  heading: string;
  /** Optional subheading (badge) */
  subheading?: string;
  /** Array of paragraph strings */
  paragraphs: string[];
  /** Image source URL */
  imageSrc: string;
  /** Image alt text */
  imageAlt: string;
  /** Layout: image on left or right */
  layout?: "left" | "right";
  /** Background variant: light (default) or muted */
  variant?: "light" | "muted";
  /** Additional class names */
  className?: string;
  /** Optional CTA button (label, href) */
  cta?: {
    label: string;
    href: string;
  };
}

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export function ContentBlock({
  heading,
  subheading,
  paragraphs,
  imageSrc,
  imageAlt,
  layout = "left",
  variant = "light",
  className,
  cta,
}: ContentBlockProps) {
  const bgClass =
    variant === "muted"
      ? "bg-muted/30"
      : "bg-background";

  // Determine order: if layout is "left", image first, else text first
  const imageFirst = layout === "left";

  return (
    <section
      className={cn(
        "py-16 px-6 transition-colors duration-300",
        bgClass,
        className
      )}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            className={cn(
              "relative rounded-2xl overflow-hidden shadow-lg",
              "aspect-[4/3] lg:aspect-auto lg:h-[400px] w-full",
              "order-1",
              imageFirst ? "lg:order-1" : "lg:order-2"
            )}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
          </div>

          {/* Text content */}
          <div
            className={cn(
              "space-y-4",
              "order-2",
              imageFirst ? "lg:order-2" : "lg:order-1"
            )}
          >
            {subheading && (
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider rounded-full bg-accent text-accent-foreground">
                {subheading}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
              {heading}
            </h2>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            {cta && (
              <div className="pt-2">
                <a
                  href={cta.href}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
                >
                  {cta.label}
                  <i className="fas fa-arrow-right text-sm" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}