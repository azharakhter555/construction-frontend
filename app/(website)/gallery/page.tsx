// app/gallery/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/PageHero";
import { GallerySection } from "@/components/sections/DrivingSections";
import { FAQSection } from "@/components/sections/FAQSection";
import { Quote, Star, ArrowRight, MessageCircle, Camera, CheckCircle2 } from "lucide-react";

// ------------------------------------------------------------------
// Stats
// ------------------------------------------------------------------
const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "30+", label: "Years Experience" },
  { value: "4.9★", label: "Average Rating" },
  { value: "100%", label: "Fully Insured" },
];

// ------------------------------------------------------------------
// Testimonials
// ------------------------------------------------------------------
const testimonials = [
  {
    quote:
      "Paddy and his team fitted out our entire office in Dublin 2. Clean, on time, and the finish is genuinely excellent — you can't see a single joint. Would use again without hesitation.",
    name: "Aoife Murphy",
    role: "Office Manager, Dublin 2",
  },
  {
    quote:
      "We had water damage across our shop ceiling and needed it fixed fast without closing. They worked nights, replaced the damaged tiles, and we opened the next morning like nothing happened.",
    name: "David O'Sullivan",
    role: "Retail Owner, Grafton Street",
  },
  {
    quote:
      "Free call-out, samples shown on-site, honest quote — no pressure at all. The ceiling in our clinic looks fantastic and the acoustic result is a huge improvement.",
    name: "Dr. Sarah Byrne",
    role: "Clinic Director, Dublin 4",
  },
];

// ------------------------------------------------------------------
// What you'll see in the gallery
// ------------------------------------------------------------------
const galleryNotes = [
  {
    icon: Camera,
    title: "Real Projects",
    description:
      "Every photo here is a completed Paddy Kehoe project — no stock images, no mockups.",
  },
  {
    icon: CheckCircle2,
    title: "Recent Work",
    description:
      "Regularly updated with new installs across Dublin, Kildare and surrounding counties.",
  },
  {
    icon: MessageCircle,
    title: "See Something You Like?",
    description:
      "Send us a photo of a ceiling you like — we'll tell you what's possible for your space.",
  },
];

// ------------------------------------------------------------------
// Page
// ------------------------------------------------------------------
export default function GalleryPage() {
  return (
    <main className="bg-background">
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Our Work"
        title='Recent <span class="text-secondary">Projects</span> Across Dublin'
        description="A selection of suspended ceiling and partition projects we've completed across Dublin, Kildare and Ireland. Every job finished to the same high standard — from single-room installs to full commercial fit-outs."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        image="/assets/pic1.jpg"
        ctaLabel="Get a Free Quote"
        ctaHref="/contact"
        secondaryCtaLabel="Talk to Our Team"
        secondaryCtaHref="/contact"
        size="sm"
      />

      {/* ============ MAIN GALLERY (with custom CTA) ============ */}
      <GallerySection
        heading="Browse by Project Type"
        subheading="Recent Work"
        description="Filter by service to see real examples of our ceiling and partition installations. Click any image to view it in full."
        ctaLabel="Get a Free Quote"
        ctaHref="/contact"
      />

      {/* ============ HOW TO BROWSE ============ */}
      <section className="relative overflow-hidden bg-muted/30 px-6 py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-[140px]"
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wider text-[#0A2946] shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60 animate-in fade-in slide-in-from-bottom-4 duration-700">
              ⭐ How to Browse
            </span>
            <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
              What You&apos;ll <span className="text-secondary">See Here</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {galleryNotes.map((note, i) => {
              const Icon = note.icon;
              return (
                <div
                  key={note.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6
                  transition-all duration-500
                  hover:-translate-y-1 hover:border-secondary/50
                  hover:shadow-[0_20px_50px_-15px_rgba(202,151,46,0.3)]
                  animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both"
                  style={{ animationDelay: `${300 + i * 120}ms` }}
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 w-0 bg-secondary transition-all duration-500 group-hover:w-full" />

                  <span
                    className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-[#0A2946]
                  shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60
                  transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>

                  <h3 className="mb-2 text-base font-bold text-card-foreground transition-colors group-hover:text-secondary">
                    {note.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground dark:text-gray-300">
                    {note.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ STATS BAR ============ */}
      <section className="relative overflow-hidden bg-primary px-6 py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent"
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <p className="text-3xl font-black text-secondary md:text-4xl lg:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/70 md:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="relative overflow-hidden bg-background px-6 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-[140px]"
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wider text-[#0A2946] shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60 animate-in fade-in slide-in-from-bottom-4 duration-700">
              ⭐ What Customers Say
            </span>
            <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
              Real Reviews From <span className="text-secondary">Real Clients</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground dark:text-gray-100 md:text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
              A few words from the businesses we&apos;ve worked with across Dublin.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7
                transition-all duration-500
                hover:-translate-y-1 hover:border-secondary/50
                hover:shadow-[0_20px_50px_-15px_rgba(202,151,46,0.35)]
                animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both"
                style={{ animationDelay: `${300 + i * 120}ms` }}
              >
                {/* Quote icon */}
                <Quote className="mb-4 h-8 w-8 text-secondary/40 transition-colors duration-500 group-hover:text-secondary" />

                {/* Stars */}
                <div className="mb-3 flex gap-0.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="mb-5 text-sm leading-relaxed text-foreground/90 dark:text-gray-200">
                  &quot;{t.quote}&quot;
                </p>

                {/* Author */}
                <div className="mt-auto border-t border-border pt-4">
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            Like What You <span className="text-secondary">See</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80 md:text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
            Get a free call-out, measure-up, and no-obligation quote — we&apos;ll show you sample
            tiles and tell you exactly what&apos;s possible for your space.
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
                href="https://wa.me/353851181111?text=Hi%2C%20I%20saw%20your%20gallery%20and%20I%27d%20like%20a%20quote."
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
      <FAQSection variant="muted" />
    </main>
  );
}
