// app/contact/page.tsx
"use client";

import { PageHero } from "@/components/sections/PageHero";
import { FAQSection } from "@/components/sections/FAQSection";
import { Phone, Mail, MapPin, Clock, MessageCircle, Ruler, ShieldCheck, Star } from "lucide-react";

// ------------------------------------------------------------------
// Config — update once, use everywhere
// ------------------------------------------------------------------
const CONTACT = {
  phone: "085 118 1111",
  phoneHref: "tel:+353851181111",
  whatsapp: "353851181111",
  email: "info@paddykehoeceilings.ie",
  address: "Dublin, Ireland",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d152515.45!2d-6.3676!3d53.3498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e80ea27ac2f%3A0xa00c7a9973171a0!2sDublin%2C%20Ireland!5e0!3m2!1sen!2sie!4v1700000000000!5m2!1sen!2sie",
  hours: [
    { day: "Monday – Friday", time: "8am – 6pm" },
    { day: "Saturday", time: "9am – 2pm" },
    { day: "Sunday", time: "Closed" },
  ],
};

// ------------------------------------------------------------------
// Quick methods
// ------------------------------------------------------------------
const quickMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Fastest reply — send us photos of your space",
    href: `https://wa.me/${CONTACT.whatsapp}?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20a%20ceiling%20project.`,
    external: true,
    highlight: true,
  },
  {
    icon: Phone,
    title: "Call Us",
    description: CONTACT.phone,
    href: CONTACT.phoneHref,
    external: false,
  },
  {
    icon: Mail,
    title: "Email",
    description: CONTACT.email,
    href: `mailto:${CONTACT.email}?subject=Ceiling%20Quote%20Request`,
    external: false,
  },
  {
    icon: MapPin,
    title: "Visit",
    description: CONTACT.address,
    href: "#map",
    external: false,
  },
];

// ------------------------------------------------------------------
// Page
// ------------------------------------------------------------------
export default function ContactPage() {
  return (
    <main className="bg-background">
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Get in Touch"
        title='Get a <span class="text-secondary">Free Quote</span> Today'
        description="Call out, measure up, sample tiles, and a clear quote — usually within 48 hours. No obligation, no sales pressure."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image="/assets/pic1.jpg"
        ctaLabel="Message on WhatsApp"
        ctaHref={`https://wa.me/${CONTACT.whatsapp}?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20a%20ceiling%20project.`}
        secondaryCtaLabel={`Call ${CONTACT.phone}`}
        secondaryCtaHref={CONTACT.phoneHref}
        size="sm"
      />

      {/* ============ QUICK CONTACT METHODS ============ */}
      <section className="relative overflow-hidden bg-background px-6 py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-[140px]"
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              Choose How to <span className="text-secondary">Reach Us</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground dark:text-gray-300 md:text-base animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
              WhatsApp is fastest — send a photo and we&apos;ll reply within a few hours.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.title}
                  href={method.href}
                  {...(method.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-500
                  hover:-translate-y-1
                  ${
                    method.highlight
                      ? "border-[#25D366]/40 bg-[#25D366]/5 hover:border-[#25D366] hover:shadow-[0_20px_50px_-15px_rgba(37,211,102,0.4)]"
                      : "border-border bg-card hover:border-secondary/50 hover:shadow-[0_20px_50px_-15px_rgba(202,151,46,0.35)]"
                  }
                  animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both`}
                  style={{ animationDelay: `${300 + i * 100}ms` }}
                >
                  <span
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl
                    shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1
                    transition-all duration-500 group-hover:scale-110 group-hover:rotate-3
                    ${
                      method.highlight
                        ? "bg-[#25D366] text-white ring-[#25D366]/60"
                        : "bg-secondary text-[#0A2946] ring-secondary/60"
                    }`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <h3 className="mb-1 text-base font-bold text-card-foreground transition-colors group-hover:text-secondary">
                    {method.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground dark:text-gray-300 md:text-sm">
                    {method.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ WHAT HAPPENS NEXT ============ */}
      <section className="relative overflow-hidden bg-muted/30 px-6 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-[140px]"
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wider text-[#0A2946] shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60 animate-in fade-in slide-in-from-bottom-4 duration-700">
              ⭐ What Happens Next
            </span>

            <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
              From Message to <span className="text-secondary">Finished Ceiling</span>
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground dark:text-gray-100 md:text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
              Get in touch and we&apos;ll be with you within 24 hours. No bots, no scripts —
              you&apos;ll speak to someone who actually knows ceilings.
            </p>

            {/* Trust items */}
            <ul className="space-y-4 pt-2">
              {[
                {
                  icon: Ruler,
                  title: "Free call-out & measure-up",
                  description: "We visit your site — no charge, no obligation.",
                },
                {
                  icon: Star,
                  title: "Sample tiles shown on-site",
                  description: "See and feel real samples before you commit.",
                },
                {
                  icon: ShieldCheck,
                  title: "Fully insured & fire certified",
                  description: "Safe Pass crew. Full compliance with Irish regulations.",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.title}
                    className="flex items-start gap-4 animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both"
                    style={{ animationDelay: `${500 + i * 120}ms` }}
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary ring-1 ring-secondary/30">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground md:text-base">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground dark:text-gray-300 md:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Direct contact block */}
            <div className="mt-6 rounded-2xl border border-border bg-card p-5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000 fill-mode-both">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-secondary">
                Prefer to speak directly?
              </p>
              <div className="space-y-2">
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-secondary"
                >
                  <Phone className="h-4 w-4 text-secondary" />
                  {CONTACT.phone}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-secondary"
                >
                  <Mail className="h-4 w-4 text-secondary" />
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MAP + HOURS ============ */}
      <section id="map" className="relative overflow-hidden bg-background px-6 py-20">
        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-stretch gap-6 lg:grid-cols-3">
            {/* Map (2 cols) */}
            <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-border shadow-[0_20px_50px_-15px_rgba(10,41,70,0.2)] animate-in fade-in zoom-in-95 duration-700 fill-mode-both">
              <iframe
                src={CONTACT.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 380 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Paddy Kehoe Suspended Ceilings — Dublin location"
              />
            </div>

            {/* Hours + address (1 col) */}
            <div className="flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-200 fill-mode-both">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-[#0A2946] shadow-[0_0_20px_rgba(202,151,46,0.45)] ring-1 ring-secondary/60">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-card-foreground">Opening Hours</h3>
                    <p className="text-xs text-muted-foreground">
                      We answer messages 7 days a week
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  {CONTACT.hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex items-center justify-between border-b border-border pb-2 last:border-0"
                    >
                      <span className="text-muted-foreground">{h.day}</span>
                      <span className="font-medium text-foreground">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-[#0A2946] shadow-[0_0_20px_rgba(202,151,46,0.45)] ring-1 ring-secondary/60">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-card-foreground">Service Area</h3>
                    <p className="text-xs text-muted-foreground">
                      Dublin, Kildare &amp; surrounding
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground dark:text-gray-300">
                  Based in Dublin and covering the surrounding counties. Not sure if we cover your
                  area? Message us — we likely do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <FAQSection variant="muted" />
    </main>
  );
}
