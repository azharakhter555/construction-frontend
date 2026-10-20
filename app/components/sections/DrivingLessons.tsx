"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
interface VideoFeatureProps {
  title: string;
  description: string;
  videoId: string;
  ctaLabel?: string;
  ctaHref?: string;
  phoneNumber?: string;
  badge?: string;
  testimonial?: string;
  trustLine?: string;
  curveStyle?: "wave" | "angle";
  className?: string;
}

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export function VideoFeature({
  title,
  description,
  videoId,
  ctaLabel = "Get a Free Quote",
  ctaHref = "/contact",
  phoneNumber = "085 118 1111",
  badge = "5.0 ★ Trusted by Dublin Businesses",
  testimonial = "Excellent workmanship — clean finish, on time, no hassle.",
  trustLine = "Fully insured · Fire safety certified · Dublin",
  curveStyle = "wave",
  className,
}: VideoFeatureProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?si=Hkz6Yz5cT8Yz3A2B`;
  const curveClass = curveStyle === "angle" ? "section-bottom-angle" : "section-bottom-wave";

  return (
    <section
      className={cn(
        "relative bg-background py-20 px-6 transition-colors duration-300",
        curveClass,
        className
      )}
      style={{ "--wave-color": "var(--background)" } as React.CSSProperties}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ============ LEFT — TEXT ============ */}
          <div className="space-y-6">
            {/* Badge — gold, on-brand */}
            <div
              className="inline-flex items-center gap-2 bg-secondary text-[#0A2946] text-sm font-semibold px-4 py-1.5 rounded-full
              shadow-[0_0_18px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60"
            >
              <span>⭐</span>
              <span>{badge}</span>
            </div>

            {/* Title (supports <span className="text-secondary">…</span> highlighting) */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">{description}</p>

            {/* Stars + testimonial */}
            <div className="flex items-center gap-3">
              <span className="stars text-xl text-secondary">★★★★★</span>
              <span className="text-sm text-muted-foreground">&quot;{testimonial}&quot;</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="font-semibold bg-primary text-primary-foreground
                shadow-[0_10px_30px_-8px_rgba(202,151,46,0.6)]
                hover:shadow-[0_14px_38px_-8px_rgba(202,151,46,0.85)]
                hover:-translate-y-0.5 transition-all duration-300"
              >
                <Link href={ctaHref}>{ctaLabel}</Link>
              </Button>

              <a
                href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                className="phone-bounce inline-flex items-center gap-3 text-foreground bg-card hover:bg-muted px-6 py-3.5 rounded-full transition border border-border shadow-sm font-medium"
              >
                <span className="text-secondary text-lg">📞</span>
                <span>{phoneNumber}</span>
              </a>
            </div>

            {/* Trust line */}
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="text-green-600">✓</span>
              {trustLine}
            </p>
          </div>

          {/* ============ RIGHT — VIDEO ============ */}
          <div className="relative">
            <div className="video-wrapper">
              <iframe
                src={embedUrl}
                title="Paddy Kehoe Suspended Ceilings — project showcase"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-xl px-4 py-2.5 flex items-center gap-3
              border border-border
              shadow-[0_10px_30px_-8px_rgba(202,151,46,0.45),0_4px_12px_rgba(0,0,0,0.15)]"
            >
              <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
                <span className="text-lg">🎬</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-card-foreground">See our work</p>
                <p className="text-[10px] text-muted-foreground">Project showcase · HD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
