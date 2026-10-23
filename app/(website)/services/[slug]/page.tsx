// app/services/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { FAQSection } from "@/components/sections/FAQSection";
import { Button } from "@/components/ui/button";
import { SERVICES_DETAIL, getServiceBySlug, getRelatedServices } from "@/lib/services-data";
import { CheckCircle2, ArrowRight, Star, MessageCircle } from "lucide-react";

// ------------------------------------------------------------------
// Static params — pre-renders every service page at build time
// ------------------------------------------------------------------
export function generateStaticParams() {
  return SERVICES_DETAIL.map((service) => ({ slug: service.slug }));
}

// ------------------------------------------------------------------
// Metadata (per-service SEO)
// ------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.label} in Dublin | Five Star Property Maintenance`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.label} in Dublin | Five Star Property Maintenance`,
      description: service.shortDescription,
      images: [{ url: service.image }],
    },
  };
}

// ------------------------------------------------------------------
// Page
// ------------------------------------------------------------------
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(service.relatedSlugs);

  const waText = encodeURIComponent(`Hi, I'd like a quote for ${service.label} in Dublin.`);
  const waHref = `https://wa.me/353851181111?text=${waText}`;

  return (
    <main className="bg-background">
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow={service.tagline}
        title={service.heroTitle}
        description={service.heroDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.label },
        ]}
        image={service.image}
        ctaLabel="Get a Free Quote"
        ctaHref={`/contact?service=${service.slug}`}
        secondaryCtaLabel="Talk to Our Team"
        secondaryCtaHref="/contact"
        size="md"
      />

      {/* ============ OVERVIEW + BENEFITS ============ */}
      <section className="relative overflow-hidden bg-background px-6 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-[140px]"
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Left — Overview (3 cols) */}
            <div className="space-y-5 lg:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wider text-[#0A2946] shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60">
                ⭐ About This Service
              </span>

              <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
                What you get with <span className="text-secondary">{service.label}</span>
              </h2>

              {service.overview.map((para, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-muted-foreground dark:text-gray-100 md:text-lg"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Right — Benefits card (2 cols) */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_25px_60px_-15px_rgba(10,41,70,0.15)] md:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-[#0A2946] shadow-[0_0_20px_rgba(202,151,46,0.45)] ring-1 ring-secondary/60">
                    <Star className="h-5 w-5 fill-[#0A2946]" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-card-foreground">Why Choose Us</h3>
                    <p className="text-xs text-muted-foreground">
                      Standard on every {service.label.toLowerCase()} job
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm text-foreground/85">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="w-full gap-2 font-semibold bg-primary text-primary-foreground
                    shadow-[0_10px_30px_-8px_rgba(202,151,46,0.55)]
                    hover:-translate-y-0.5 hover:shadow-[0_14px_38px_-8px_rgba(202,151,46,0.85)]
                    transition-all duration-300"
                  >
                    <Link href={`/contact?service=${service.slug}`}>
                      Get a Free Quote
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>

                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white
                    shadow-[0_8px_22px_-6px_rgba(37,211,102,0.7)]
                    transition-all duration-300
                    hover:-translate-y-0.5 hover:bg-[#1ebe5b]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="relative overflow-hidden bg-muted/30 px-6 py-24">
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wider text-[#0A2946] shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60">
              ⭐ What&apos;s Included
            </span>
            <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
              Our <span className="text-secondary">{service.label}</span> Capabilities
            </h2>
            <p className="mt-4 text-base text-muted-foreground dark:text-gray-100 md:text-lg">
              Everything you need under one roof — no subcontractors, no compromise.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature, i) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6
                transition-all duration-500
                hover:-translate-y-1 hover:border-secondary/50
                hover:shadow-[0_20px_50px_-15px_rgba(202,151,46,0.35)]
                animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-0.5 w-0 bg-secondary transition-all duration-500 group-hover:w-full" />
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-[#0A2946] shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <h3 className="mb-2 text-base font-bold text-card-foreground transition-colors group-hover:text-secondary">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="relative overflow-hidden bg-background px-6 py-24">
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wider text-[#0A2946] shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60">
              ⭐ How It Works
            </span>
            <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
              From First Call to <span className="text-secondary">Final Walkthrough</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <div
                key={step.step}
                className="group relative rounded-2xl border border-border bg-card p-6
                transition-all duration-500 hover:-translate-y-1 hover:border-secondary/50
                hover:shadow-[0_20px_50px_-15px_rgba(202,151,46,0.3)]
                animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <span className="mb-4 inline-block text-5xl font-black text-secondary/20 transition-colors duration-500 group-hover:text-secondary/40">
                  {step.step}
                </span>
                <h3 className="mb-2 text-lg font-bold text-card-foreground transition-colors group-hover:text-secondary">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground dark:text-gray-300">
                  {step.description}
                </p>
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
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready for Your <span className="text-secondary">{service.label}</span> Quote?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80 md:text-lg">
            Free call-out, measure-up, and no-obligation quote — usually within 48 hours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="gap-2 font-semibold bg-secondary text-[#0A2946]
              shadow-[0_10px_30px_-8px_rgba(202,151,46,0.7)]
              hover:-translate-y-0.5 hover:bg-secondary/90
              hover:shadow-[0_14px_38px_-8px_rgba(202,151,46,0.9)]
              transition-all duration-300"
            >
              <Link href={`/contact?service=${service.slug}`}>
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
              <Link href="/gallery">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <FAQSection
        variant="light"
        heading={`${service.label} — Frequently Asked Questions`}
        subheading={`Common questions about ${service.label.toLowerCase()} in Dublin`}
        faqs={service.faqs}
      />

      {/* ============ RELATED SERVICES ============ */}
      {relatedServices.length > 0 && (
        <section className="relative overflow-hidden bg-muted/30 px-6 py-24">
          <div className="relative mx-auto max-w-6xl">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wider text-[#0A2946] shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60">
                ⭐ Related Services
              </span>
              <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
                You Might Also <span className="text-secondary">Need</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedServices.map((related) => (
                <Link
                  key={related.slug}
                  href={`/services/${related.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6
                  transition-all duration-500
                  hover:-translate-y-2 hover:border-secondary/50
                  hover:shadow-[0_25px_60px_-15px_rgba(202,151,46,0.35)]"
                >
                  <h3 className="mb-2 text-lg font-bold text-card-foreground transition-colors group-hover:text-secondary">
                    {related.label}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground dark:text-gray-300 line-clamp-3">
                    {related.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
