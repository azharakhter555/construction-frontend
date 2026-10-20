"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export interface Service {
  href: string;
  label: string;
  tagline: string;
  description: string;
  image: string;
}

interface ServicesSectionProps {
  heading?: string;
  subheading?: string;
  services?: Service[];
  className?: string;
  /** WhatsApp number in international format, digits only (e.g. 353870000000) */
  whatsappNumber?: string;
  /** Optional global message appended to the per-service message */
  whatsappMessage?: string;
}

// ------------------------------------------------------------------
// WhatsApp icon (inline SVG — lucide-react doesn't ship the brand logo)
// ------------------------------------------------------------------
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export function ServicesSection({
  subheading = "What we do",
  services,
  className,
  whatsappNumber = "353870000000", // ⚠️ replace with your real number
  whatsappMessage,
}: ServicesSectionProps) {
  return (
    <section className={cn("relative overflow-hidden bg-background py-24 px-6", className)}>
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
            Our Specialist Ceiling &amp; Partition <span className="text-secondary">Services</span>{" "}
            in Dublin
          </h2>
          <p
            className="mt-4 text-base text-muted-foreground md:text-lg
            animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both"
          >
            Paddy Kehoe Suspended Ceilings provides comprehensive partition and ceiling solutions
            for commercial spaces throughout Dublin and Ireland. Our specialist services are
            designed to meet the highest standards of quality, safety and compliance.
          </p>
        </div>

        {/* ============ CARDS ============ */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services?.map((service, i) => {
            const waText = encodeURIComponent(
              whatsappMessage
                ? `${whatsappMessage}\n\nService: ${service.label}`
                : `Hi, I'd like a quote for ${service.label} in Dublin.`
            );
            const waHref = `https://wa.me/${whatsappNumber}?text=${waText}`;

            return (
              <div
                key={service.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card
                transition-all duration-500
                hover:-translate-y-2 hover:border-secondary/60
                hover:shadow-[0_25px_60px_-15px_rgba(202,151,46,0.35),0_10px_20px_-8px_rgba(10,41,70,0.15)]
                animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                style={{ animationDelay: `${400 + i * 120}ms` }}
              >
                {/* Full-card click-through to the service page */}
                <Link
                  href={service.href}
                  aria-label={`View ${service.label}`}
                  className="absolute inset-0 z-10"
                />

                {/* ---- IMAGE HEADER ---- */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Navy gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2946] via-[#0A2946]/40 to-transparent opacity-90" />

                  {/* Gold number badge */}
                  <div className="absolute left-5 top-5">
                    <span
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-sm font-bold text-[#0A2946]
                      shadow-[0_0_20px_rgba(202,151,46,0.55),0_4px_14px_rgba(0,0,0,0.25)]
                      ring-2 ring-secondary/60"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Tagline + title */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-secondary">
                      {service.tagline}
                    </p>
                    <h3 className="text-2xl font-bold text-white md:text-[26px]">
                      {service.label}
                    </h3>
                  </div>

                  {/* Gold underline grows on hover */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-secondary transition-all duration-500 group-hover:w-full" />
                </div>

                {/* ---- CONTENT ---- */}
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  {/* CTA row: Learn More + WhatsApp */}
                  <div className="mt-auto flex items-center justify-between gap-3">
                    {/* Learn More (visual — the whole card is a Link) */}
                    <div className="flex items-center gap-3 text-primary transition-colors group-hover:text-secondary">
                      <span className="text-sm font-semibold tracking-wide">Learn More</span>
                      <span
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 text-primary
                        transition-all duration-300
                        group-hover:translate-x-1 group-hover:bg-secondary group-hover:text-[#0A2946]"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>

                    {/* WhatsApp button — sits ABOVE the card link */}
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Chat on WhatsApp about ${service.label}`}
                      className="relative z-20 inline-flex items-center gap-2 rounded-full
                      bg-[#25D366] px-3.5 py-2 text-xs font-semibold text-white
                      shadow-[0_6px_18px_-6px_rgba(37,211,102,0.7)]
                      transition-all duration-300
                      hover:bg-[#1ebe5b] hover:-translate-y-0.5
                      hover:shadow-[0_10px_24px_-6px_rgba(37,211,102,0.9)]
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
