// app/services/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { HowItWorks } from "@/components/sections/HowWork";
import { SectorsSection } from "@/components/sections/FirstLessonSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Ruler, Eye, ShieldCheck, Flame, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { SERVICESWITHIMAGE } from "@/lib/constants";
// ------------------------------------------------------------------
// Every-service standards
// ------------------------------------------------------------------
const standards = [
  {
    icon: Ruler,
    title: "Free Measure-Up",
    description: "We visit your site and measure the space — no charge, no obligation.",
  },
  {
    icon: Eye,
    title: "Samples On-Site",
    description: "See and feel real sample tiles before you decide — no guesswork.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured",
    description: "Complete public liability cover and Safe Pass certified crew on every job.",
  },
  {
    icon: Flame,
    title: "Fire Safety Compliant",
    description: "Fire-rated materials and fire sealing where required — fully certified.",
  },
  {
    icon: Sparkles,
    title: "Clean Finish",
    description: "Precise alignment, clean lines, full site cleanup before we leave.",
  },
  {
    icon: MessageCircle,
    title: "Aftercare Support",
    description: "Any issues after installation? One call and we'll sort it — no fuss.",
  },
];

// ------------------------------------------------------------------
// Page
// ------------------------------------------------------------------
export default function ServicesPage() {
  return (
    <main className="bg-background">
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Our Services"
        title='Ceiling &amp; Partition <span class="text-secondary">Services</span> in Dublin'
        description="From a single office ceiling to a full commercial fit-out — every project starts with a free measure-up, sample tiles shown on-site, and a clear itemised quote."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        image="/assets/pic1.jpg"
        ctaLabel="Get a Free Quote"
        ctaHref="/contact"
        secondaryCtaLabel="Talk to Our Team"
        secondaryCtaHref="/contact"
        size="sm"
      />

      {/* ============ SERVICES GRID ============ */}
      <ServicesSection
        heading="Our Specialist Ceiling & Partition Services in Dublin"
        subheading="What we do."
        services={SERVICESWITHIMAGE}
      />

      {/* ============ EVERY SERVICE INCLUDES ============ */}
      <section className="relative overflow-hidden bg-muted/30 px-6 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-[140px]"
        />

        <div className="relative mx-auto max-w-6xl">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wider text-[#0A2946] shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60 animate-in fade-in slide-in-from-bottom-4 duration-700">
              ⭐ The Standard
            </span>
            <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
              Every Service <span className="text-secondary">Includes</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground dark:text-gray-100 md:text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
              No matter which service you choose, you get the same standards on every single project
              — big or small.
            </p>
          </div>

          {/* Standards grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {standards.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6
                  transition-all duration-500
                  hover:-translate-y-1 hover:border-secondary/50
                  hover:shadow-[0_20px_50px_-15px_rgba(202,151,46,0.35),0_10px_20px_-8px_rgba(10,41,70,0.12)]
                  animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both"
                  style={{ animationDelay: `${400 + i * 80}ms` }}
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 w-0 bg-secondary transition-all duration-500 group-hover:w-full" />

                  <div className="flex items-start gap-4">
                    <span
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-[#0A2946]
                      shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60
                      transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    >
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </span>
                    <div>
                      <h3 className="mb-1 text-base font-bold text-card-foreground transition-colors group-hover:text-secondary">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <HowItWorks
        whatsappNumber="353851181111"
        email="info@paddykehoeceilings.ie"
        phoneNumber="085 118 1111"
      />

      {/* ============ SECTORS ============ */}
      <SectorsSection />

      {/* ============ WHY CHOOSE US ============ */}
      <WhyChooseUsSection />

      {/* ============ CTA STRIP ============ */}
      <section className="relative overflow-hidden bg-primary px-6 py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-secondary/20 blur-[140px]"
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            Not Sure Which <span className="text-secondary">Service</span> You Need?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80 md:text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
            Message us with a few photos of your space — we&apos;ll tell you what&apos;s possible,
            what it&apos;ll cost, and how long it takes. Free, no obligation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
            <Button
              asChild
              size="lg"
              className="gap-2 font-semibold bg-secondary text-[#0A2946]
              shadow-[0_10px_30px_-8px_rgba(202,151,46,0.7)]
              hover:-translate-y-0.5 hover:bg-secondary/90
              hover:shadow-[0_14px_38px_-8px_rgba(202,151,46,0.9)]
              transition-all duration-300"
            >
              <Link href="/contact">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-semibold border-white/40 bg-white/10 text-white backdrop-blur-sm
              hover:bg-white/20 hover:border-white/60
              hover:-translate-y-0.5 transition-all duration-300"
            >
              <a
                href="https://wa.me/353851181111?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20a%20ceiling%20project."
                target="_blank"
                rel="noopener noreferrer"
              >
                Message on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <FAQSection variant="light" />
    </main>
  );
}
