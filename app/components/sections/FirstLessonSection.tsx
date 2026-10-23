"use client";

import { Building2, ShoppingBag, Stethoscope, GraduationCap, Warehouse, Home } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export interface Sector {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface SectorsSectionProps {
  heading?: string;
  subheading?: string;
  description?: string;
  sectors?: Sector[];
  className?: string;
}

// ------------------------------------------------------------------
// Default sectors
// ------------------------------------------------------------------
const defaultSectors: Sector[] = [
  {
    icon: Building2,
    title: "Offices & Corporate",
    description:
      "Suspended ceilings and partition systems for modern office environments, from open-plan workspaces to private meeting rooms and executive suites.",
  },
  {
    icon: ShoppingBag,
    title: "Retail & Hospitality",
    description:
      "Shop ceiling installations, feature ceilings and partition solutions for retail units, restaurants, hotels and hospitality venues across Dublin.",
  },
  {
    icon: Stethoscope,
    title: "Healthcare & Clinics",
    description:
      "Specialist ceiling systems for hospitals, clinics, dental practices and care facilities with strict hygiene and acoustic requirements.",
  },
  {
    icon: GraduationCap,
    title: "Education & Public Buildings",
    description:
      "Acoustic ceilings and durable partition solutions for schools, colleges, universities and public sector buildings throughout Ireland.",
  },
  {
    icon: Warehouse,
    title: "Industrial & Warehousing",
    description:
      "Robust ceiling systems for warehouses, factories and industrial facilities, engineered for durability, safety and full compliance.",
  },
  {
    icon: Home,
    title: "Residential & Apartments",
    description:
      "Fire-rated ceiling solutions for apartments, multi-unit developments and residential fit-outs, finished to a professional standard.",
  },
];

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export function SectorsSection({
  heading = "Sectors We Work In",
  subheading = "Where we work",
  description = "Five Star Property Maintenance delivers suspended ceiling and partition solutions across a wide range of commercial sectors throughout Dublin, Kildare and Ireland.",
  sectors = defaultSectors,
  className,
}: SectorsSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-primary py-24 px-6 text-primary-foreground",
        className
      )}
    >
      {/* Ambient gold glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-secondary/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-secondary/15 blur-[140px]"
      />

      {/* Subtle grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ============ HEADER ============ */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wider text-[#0A2946]
            shadow-[0_0_20px_rgba(202,151,46,0.45)] ring-1 ring-secondary/60
            animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            ⭐ {subheading}
          </span>
          <h2
            className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl
            animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both"
          >
            {heading}
          </h2>
          <p
            className="mt-4 text-base text-white/80 md:text-lg
            animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both"
          >
            {description}
          </p>
        </div>

        {/* ============ CARDS ============ */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, i) => {
            const Icon = sector.icon;
            return (
              <div
                key={sector.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl
                border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm
                transition-all duration-500
                hover:-translate-y-2 hover:border-secondary/50 hover:bg-white/[0.08]
                hover:shadow-[0_25px_60px_-15px_rgba(202,151,46,0.4)]
                animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                style={{ animationDelay: `${400 + i * 100}ms` }}
              >
                {/* Top gold accent line grows on hover */}
                <div className="absolute inset-x-0 top-0 h-0.5 w-0 bg-secondary transition-all duration-500 group-hover:w-full" />

                {/* Icon badge */}
                <div className="mb-5 inline-flex">
                  <span
                    className="inline-flex h-14 w-14 items-center justify-center rounded-xl
                    bg-secondary text-[#0A2946]
                    shadow-[0_0_25px_rgba(202,151,46,0.45),0_4px_14px_rgba(0,0,0,0.25)]
                    ring-1 ring-secondary/60
                    transition-all duration-500
                    group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(202,151,46,0.7)]"
                  >
                    <Icon className="h-7 w-7" strokeWidth={2} />
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-secondary">
                  {sector.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-white/80">{sector.description}</p>

                {/* Corner index number */}
                <span className="pointer-events-none absolute bottom-4 right-5 text-4xl font-black text-white/[0.06] transition-colors duration-500 group-hover:text-secondary/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
