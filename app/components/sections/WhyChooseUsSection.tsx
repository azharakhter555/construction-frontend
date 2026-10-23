"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Clock,
  Hammer,
  ShieldCheck,
  Ruler,
  HardHat,
  Flame,
  Award,
  Building2,
  Lock,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface TrustBadge {
  icon: LucideIcon;
  label: string;
}

interface WhyChooseUsProps {
  heading?: string;
  subheading?: string;
  description?: string;
  features?: Feature[];
  badges?: TrustBadge[];
  className?: string;
}

// ------------------------------------------------------------------
// Default features
// ------------------------------------------------------------------
const defaultFeatures: Feature[] = [
  {
    icon: Clock,
    title: "30+ Years Experience",
    description:
      "Decades of hands-on experience installing suspended ceilings and partition systems across Dublin and Ireland — no job too complex.",
  },
  {
    icon: Hammer,
    title: "Expert Workmanship",
    description:
      "Known for excellent workmanship. Every ceiling is fitted cleanly, aligned precisely, and finished to a professional standard.",
  },
  {
    icon: Ruler,
    title: "Free Measure-Up & Samples",
    description:
      "We call out, measure up, and show you sample tiles on-site — making your decision easy and accurate before you commit.",
  },
  {
    icon: ShieldCheck,
    title: "Fire Safety Certified",
    description:
      "Certified fire sealing over suspended ceilings. Fully compliant with building and fire safety regulations across all projects.",
  },
];

// ------------------------------------------------------------------
// Default trust badges
// ------------------------------------------------------------------
const defaultBadges: TrustBadge[] = [
  { icon: HardHat, label: "Safe Pass" },
  { icon: Flame, label: "Fire Safety Certified" },
  { icon: ShieldCheck, label: "Fully Insured" },
  { icon: Award, label: "Qualified Tradesmen" },
  { icon: Building2, label: "Registered Contractor" },
  { icon: Lock, label: "GDPR Compliant" },
];

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export function WhyChooseUsSection({
  subheading = "Why choose us",
  description = "We're not just another ceiling contractor. We're known for excellent workmanship, honest pricing, and a clean finish every time — from a single office to a full commercial fit-out. Here's why Dublin businesses choose us.",
  features = defaultFeatures,
  badges = defaultBadges,
  className,
}: WhyChooseUsProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-muted/30 px-6 py-24 transition-colors duration-300",
        className
      )}
    >
      {/* Ambient gold glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ============ HEADER ============ */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wider text-[#0A2946]
            shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60
            animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            ⭐ {subheading}
          </span>
          <h2
            className="text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl
            animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both"
          >
            Why Choose <span className="text-secondary">Five Star</span> Property Maintenance
          </h2>
          <p
            className="mt-4 text-base text-muted-foreground dark:text-gray-100 md:text-lg
            animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both"
          >
            {description}
          </p>
        </div>

        {/* ============ FEATURES GRID ============ */}
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className={cn(
                  "group relative overflow-hidden border-border bg-card",
                  "transition-all duration-500",
                  "hover:-translate-y-2 hover:border-secondary/50",
                  "hover:shadow-[0_25px_60px_-15px_rgba(202,151,46,0.35),0_10px_20px_-8px_rgba(10,41,70,0.15)]",
                  "animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                )}
                style={{ animationDelay: `${400 + index * 120}ms` }}
              >
                {/* Top gold accent line grows on hover */}
                <div className="absolute inset-x-0 top-0 h-0.5 w-0 bg-secondary transition-all duration-500 group-hover:w-full" />

                {/* Corner glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-secondary/10 blur-2xl" />

                {/* Step number */}
                <span className="pointer-events-none absolute right-4 top-4 select-none text-5xl font-black text-border/60">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <CardContent className="relative z-10 p-6">
                  {/* Icon badge */}
                  <div className="mb-5 inline-flex">
                    <span
                      className="inline-flex h-14 w-14 items-center justify-center rounded-xl
                      bg-secondary text-[#0A2946]
                      shadow-[0_0_25px_rgba(202,151,46,0.45),0_4px_14px_rgba(0,0,0,0.15)]
                      ring-1 ring-secondary/60
                      transition-all duration-500
                      group-hover:scale-110 group-hover:rotate-3
                      group-hover:shadow-[0_0_35px_rgba(202,151,46,0.7)]"
                    >
                      <Icon className="h-7 w-7" strokeWidth={2} />
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-lg font-bold text-card-foreground transition-colors group-hover:text-secondary">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-muted-foreground dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ============ TRUST BADGES ============ */}
        <div
          className="pt-10 border-t border-border animate-in fade-in slide-in-from-bottom-4 duration-700"
          style={{ animationDelay: "900ms", animationFillMode: "both" }}
        >
          <h4 className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground dark:text-gray-300">
            Proudly Accredited &amp; Certified
          </h4>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="group inline-flex items-center gap-2.5 rounded-full
                  border border-border bg-card px-4 py-2
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:border-secondary/50 hover:shadow-[0_8px_24px_-8px_rgba(202,151,46,0.4)]"
                >
                  <Icon className="h-4 w-4 text-secondary transition-colors group-hover:text-secondary" />
                  <span className="text-sm font-medium text-foreground">{badge.label}</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
