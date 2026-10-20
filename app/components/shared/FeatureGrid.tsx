"use client";

import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
interface Feature {
  icon: string;        // Font Awesome class
  title: string;
  description: string;
}

interface FeatureGridProps {
  heading?: string;
  subheading?: string;
  description?: string;
  features: Feature[];
  variant?: "light" | "muted";
  className?: string;
}

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export function FeatureGrid({
  heading,
  subheading,
  description,
  features,
  variant = "light",
  className,
}: FeatureGridProps) {
  const bgClass =
    variant === "muted"
      ? "bg-muted/30"
      : "bg-background";

  return (
    <section className={cn("py-20 px-6 transition-colors", bgClass, className)}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {(heading || subheading || description) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            {subheading && (
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider rounded-full mb-4 bg-accent text-accent-foreground">
                {subheading}
              </span>
            )}
            {heading && (
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-foreground">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
                <i className={`fas ${feature.icon}`} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-500 group-hover:w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}