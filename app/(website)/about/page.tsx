"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/PageHero";
// import { VideoFeature } from "@/components/sections/VideoFeature";
import { FAQSection } from "@/components/sections/FAQSection";
import {
  CheckCircle2,
  Award,
  Users,
  Clock,
  Hammer,
  ShieldCheck,
  MapPin,
  ArrowRight,
} from "lucide-react";

// ------------------------------------------------------------------
// Stats
// ------------------------------------------------------------------
const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "4.9★", label: "Average Rating" },
  { value: "100%", label: "Fully Insured" },
  { value: "48h", label: "Quote Turnaround" },
];

// ------------------------------------------------------------------
// Values
// ------------------------------------------------------------------
const values = [
  {
    icon: Hammer,
    title: "Excellent Workmanship",
    description:
      "Every ceiling we install is finished to a professional standard — clean lines, precise alignment, no shortcuts. It's the reason customers come back and recommend us.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Fire-rated materials, fire sealing where required, and full compliance with Irish building regulations on every single project.",
  },
  {
    icon: Clock,
    title: "On Time, On Budget",
    description:
      "We call out, measure up, and quote accurately — then deliver to the quoted price and timeline. No surprises, no hidden costs.",
  },
  {
    icon: Users,
    title: "Straightforward Service",
    description:
      "No jargon, no sales pressure. We show you sample tiles, answer your questions, and let you decide what's right for your space.",
  },
];

// ------------------------------------------------------------------
// Process
// ------------------------------------------------------------------
const processSteps = [
  {
    step: "01",
    title: "Free call-out",
    description: "We visit your site, measure the space, and understand what you need.",
  },
  {
    step: "02",
    title: "Sample tiles & quote",
    description: "We show you sample tiles on-site and give you a clear, itemised quote.",
  },
  {
    step: "03",
    title: "Professional installation",
    description: "Our team installs to the highest standard, on time and on budget.",
  },
  {
    step: "04",
    title: "Final walkthrough",
    description: "We don't leave until you're 100% happy with the finish and cleanup.",
  },
];

// ------------------------------------------------------------------
// Page
// ------------------------------------------------------------------
export default function AboutPage() {
  return (
    <main className="bg-background">
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="About Us"
        title='Dublin&apos;s Trusted <span class="text-secondary">Suspended Ceiling</span> Specialists'
        description="Five Star Property Maintenance are specialists in suspended ceiling installation and commercial ceiling repairs across Dublin and Ireland. Known for excellent workmanship, honest pricing, and a clean finish — from single office ceilings to full commercial fit-outs."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        image="/assets/pic44.jpg"
        ctaLabel="Get a Free Quote"
        ctaHref="/contact"
        secondaryCtaLabel="View Our Work"
        secondaryCtaHref="/gallery"
        size="md"
      />

      {/* ============ STORY ============ */}
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
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — Story */}
            <div className="space-y-5">
              <span
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wider text-[#0A2946]
                shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60
                animate-in fade-in slide-in-from-bottom-4 duration-700"
              >
                ⭐ Our Story
              </span>

              <h2
                className="text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl
                animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both"
              >
                Built on Craftsmanship.{" "}
                <span className="text-secondary">Trusted Across Dublin.</span>
              </h2>

              <p
                className="text-lg leading-relaxed text-muted-foreground dark:text-gray-100
                animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both"
              >
                Five Star Property Maintenance was built on a simple idea: do the job properly,
                leave the site clean, and treat every customer the way you&apos;d want to be
                treated. That standard hasn&apos;t changed — we still measure twice, cut once, and
                finish every ceiling as if it were going into our own home.
              </p>

              <p
                className="text-base leading-relaxed text-muted-foreground dark:text-gray-300
                animate-in fade-in slide-in-from-bottom-4 duration-700 delay-450 fill-mode-both"
              >
                Today, we work with offices, retail spaces, healthcare facilities, schools and
                residential developments across Dublin, Kildare and the surrounding counties. From a
                single-room suspended ceiling to a full commercial fit-out with partitions and fire
                sealing, we bring the same attention to detail and honest communication.
              </p>

              <ul className="space-y-3 pt-2">
                {[
                  "Free call-out, measure-up & quotation",
                  "Sample tiles shown on-site for confident decisions",
                  "Fire-rated office partitions available",
                  "Certified fire sealing over suspended ceilings",
                ].map((item, i) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-foreground/85 md:text-base
                    animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both"
                    style={{ animationDelay: `${600 + i * 100}ms` }}
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[1000ms] fill-mode-both">
                <Button
                  asChild
                  size="lg"
                  className="gap-2 font-semibold bg-primary text-primary-foreground
                  shadow-[0_10px_30px_-8px_rgba(202,151,46,0.55)]
                  hover:-translate-y-0.5 hover:shadow-[0_14px_38px_-8px_rgba(202,151,46,0.85)]
                  transition-all duration-300"
                >
                  <Link href="/contact">
                    Speak to Our Team
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right — Image collage */}
            <div className="relative">
              <div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border
                shadow-[0_25px_60px_-15px_rgba(10,41,70,0.35)]
                animate-in fade-in zoom-in-95 duration-700 fill-mode-both"
              >
                <img
                  src="/assets/about-3.jpeg"
                  alt="Five Star Property Maintenance installing a suspended ceiling"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2946]/40 via-transparent to-transparent" />
              </div>

              {/* Floating stat card */}
              <div
                className="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-card px-6 py-4
                shadow-[0_20px_50px_-15px_rgba(202,151,46,0.4)]
                animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-[#0A2946] shadow-[0_0_20px_rgba(202,151,46,0.45)] ring-1 ring-secondary/60">
                    <Award className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-2xl font-black leading-none text-foreground">5★</p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">
                      Quality Standard
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating location card */}
              <div
                className="absolute -right-4 top-8 rounded-2xl border border-border bg-card px-4 py-3
                shadow-[0_20px_50px_-15px_rgba(10,41,70,0.3)]
                animate-in fade-in slide-in-from-top-4 duration-700 delay-700 fill-mode-both"
              >
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-secondary" />
                  <span className="font-medium text-foreground">Dublin &amp; Kildare</span>
                </div>
              </div>
            </div>
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

      {/* ============ VIDEO FEATURE ============ */}
      {/* <VideoFeature
        videoId="YOUR_YOUTUBE_VIDEO_ID"
        title='See the <span class="text-secondary">Work</span> Behind the Reputation'
        description="A quick look at how Five Star Property Maintenance approaches a project — from measure-up and sample tiles to the finished ceiling. Watch and see the standard our customers talk about."
        testimonial="Excellent workmanship — clean finish, on time, no hassle."
        trustLine="Fully insured · Fire safety certified · Dublin & Kildare"
        ctaLabel="Get a Free Quote"
        ctaHref="/contact"
        phoneNumber="085 118 1111"
      /> */}

      {/* ============ VALUES ============ */}
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
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wider text-[#0A2946] shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60 animate-in fade-in slide-in-from-bottom-4 duration-700">
              ⭐ What We Stand For
            </span>
            <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
              Our <span className="text-secondary">Values</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground dark:text-gray-100 md:text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
              Four principles guide every project we take on — no matter the size or scope.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6
                  transition-all duration-500
                  hover:-translate-y-2 hover:border-secondary/50
                  hover:shadow-[0_25px_60px_-15px_rgba(202,151,46,0.35),0_10px_20px_-8px_rgba(10,41,70,0.15)]
                  animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                  style={{ animationDelay: `${400 + i * 120}ms` }}
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 w-0 bg-secondary transition-all duration-500 group-hover:w-full" />

                  <span
                    className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-[#0A2946]
                  shadow-[0_0_25px_rgba(202,151,46,0.45)] ring-1 ring-secondary/60
                  transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                  >
                    <Icon className="h-7 w-7" strokeWidth={2} />
                  </span>

                  <h3 className="mb-2 text-lg font-bold text-card-foreground transition-colors group-hover:text-secondary">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="relative overflow-hidden bg-background px-6 py-24">
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wider text-[#0A2946] shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60 animate-in fade-in slide-in-from-bottom-4 duration-700">
              ⭐ How We Work
            </span>
            <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
              From First Call to <span className="text-secondary">Final Walkthrough</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground dark:text-gray-100 md:text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
              A straightforward process — no surprises, no hidden costs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <div
                key={step.step}
                className="group relative rounded-2xl border border-border bg-card p-6
                transition-all duration-500 hover:-translate-y-1 hover:border-secondary/50
                hover:shadow-[0_20px_50px_-15px_rgba(202,151,46,0.3)]
                animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                style={{ animationDelay: `${400 + i * 120}ms` }}
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
          <h2 className="text-3xl font-bold text-white md:text-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            Ready to <span className="text-secondary">Transform</span> Your Ceiling?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80 md:text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
            Get a free call-out, measure-up, and no-obligation quote — usually within 48 hours.
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
              <Link href="/gallery">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <FAQSection variant="muted" />
    </main>
  );
}
