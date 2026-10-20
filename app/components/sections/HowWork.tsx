"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageCircle, Mail, Phone, Camera, Ruler, CheckCircle2, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
}

interface HowItWorksProps {
  heading?: string;
  subheading?: string;
  description?: string;
  steps?: Step[];
  whatsappNumber?: string;
  whatsappMessage?: string;
  email?: string;
  phoneNumber?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
  variant?: "light" | "dark";
}

// ------------------------------------------------------------------
// Default steps — contact-first ceiling service flow
// ------------------------------------------------------------------
const defaultSteps: Step[] = [
  {
    icon: MessageCircle,
    title: "Get in touch",
    description:
      "Contact us on WhatsApp, email or call directly. We reply fast — usually within a few hours on weekdays.",
    bullets: ["WhatsApp", "Email", "Phone call"],
  },
  {
    icon: Camera,
    title: "Send photos & details",
    description:
      "Send us a few photos of your space and tell us roughly what you need. The more detail, the quicker we can quote.",
    bullets: ["Photos of the space", "Room size & location", "Any specific needs"],
  },
  {
    icon: Ruler,
    title: "We measure, quote & complete",
    description:
      "We call out, measure up, show you sample tiles, then install to the highest standard — on time and on budget.",
    bullets: ["Free measure-up", "Sample tiles shown", "Professional installation"],
  },
];

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export function HowItWorks({
  heading = "Get a Quote in 3 Simple Steps",
  subheading = "How it works",
  description = "No forms, no fuss. Just message us with a few photos of your project and we'll take it from there.",
  steps = defaultSteps,
  whatsappNumber = "353870000000", // ⚠️ replace with real number (digits only, no +)
  whatsappMessage = "Hi, I'd like a quote for a ceiling / partition project.",
  email = "info@paddykehoeceilings.ie",
  phoneNumber = "085 118 1111",
  ctaLabel = "Message on WhatsApp",
  ctaHref,
  className,
  variant = "light",
}: HowItWorksProps) {
  const bgClass = variant === "dark" ? "bg-primary text-primary-foreground" : "bg-muted/30";

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const telHref = `tel:${phoneNumber.replace(/\s/g, "")}`;
  const mailHref = `mailto:${email}?subject=${encodeURIComponent("Ceiling Quote Request")}`;

  return (
    <section
      className={cn(
        "relative overflow-hidden px-6 py-20 transition-colors duration-300",
        bgClass,
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

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ============ HEADER ============ */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wider text-[#0A2946]
            shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60
            animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            ⭐ {subheading}
          </span>
          <h2
            className={cn(
              "text-3xl font-bold leading-tight md:text-4xl lg:text-5xl",
              variant === "dark" ? "text-white" : "text-foreground",
              "animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both"
            )}
          >
            {heading}
          </h2>
          <p
            className={cn(
              "mt-4 text-base md:text-lg",
              variant === "dark" ? "text-white/75" : "text-muted-foreground",
              "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both"
            )}
          >
            {description}
          </p>
        </div>

        {/* ============ QUICK CONTACT BAR ============ */}
        <div
          className="mx-auto mb-16 flex max-w-3xl flex-wrap items-center justify-center gap-3
          animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400 fill-mode-both"
        >
          {/* WhatsApp */}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white
            shadow-[0_6px_18px_-6px_rgba(37,211,102,0.7)]
            transition-all duration-300 hover:bg-[#1ebe5b] hover:-translate-y-0.5
            hover:shadow-[0_10px_24px_-6px_rgba(37,211,102,0.9)]"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>

          {/* Email */}
          <a
            href={mailHref}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground
            shadow-[0_6px_18px_-6px_rgba(10,41,70,0.6)]
            transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>

          {/* Phone */}
          <a
            href={telHref}
            className="inline-flex items-center gap-2 rounded-full bg-card px-5 py-2.5 text-sm font-semibold text-foreground
            border border-border
            transition-all duration-300 hover:bg-muted hover:-translate-y-0.5"
          >
            <Phone className="h-4 w-4 text-secondary" />
            {phoneNumber}
          </a>
        </div>

        {/* ============ STEPS ============ */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className={cn(
                  "group relative flex flex-col rounded-2xl p-7 transition-all duration-500",
                  "border",
                  variant === "dark"
                    ? "border-white/10 bg-white/[0.04] backdrop-blur-sm hover:border-secondary/50 hover:bg-white/[0.08]"
                    : "border-border bg-card hover:border-secondary/50",
                  "hover:-translate-y-2",
                  "hover:shadow-[0_25px_60px_-15px_rgba(202,151,46,0.35),0_10px_20px_-8px_rgba(10,41,70,0.15)]",
                  "animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                )}
                style={{ animationDelay: `${500 + index * 120}ms` }}
              >
                {/* Step number */}
                <span
                  className={cn(
                    "pointer-events-none absolute top-4 right-6 select-none text-6xl font-black",
                    variant === "dark" ? "text-white/[0.06]" : "text-border/60"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
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
                <h3
                  className={cn(
                    "relative z-10 mb-3 text-xl font-bold transition-colors group-hover:text-secondary",
                    variant === "dark" ? "text-white" : "text-card-foreground"
                  )}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className={cn(
                    "mb-5 text-sm leading-relaxed",
                    variant === "dark" ? "text-white/70" : "text-muted-foreground"
                  )}
                >
                  {step.description}
                </p>

                {/* Bullets */}
                <ul className="mt-auto space-y-2">
                  {step.bullets.map((b) => (
                    <li
                      key={b}
                      className={cn(
                        "flex items-start gap-2 text-xs font-medium",
                        variant === "dark" ? "text-white/80" : "text-foreground/80"
                      )}
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* ============ BOTTOM CTA ============ */}
        <div
          className="mt-14 flex flex-wrap items-center justify-center gap-4
          animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
          style={{ animationDelay: "900ms" }}
        >
          <Button
            asChild
            size="lg"
            className="gap-2 bg-[#25D366] text-white font-semibold px-8
            shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)]
            hover:bg-[#1ebe5b]
            hover:shadow-[0_14px_38px_-8px_rgba(37,211,102,0.9)]
            hover:-translate-y-0.5 transition-all duration-300"
          >
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className={cn(
              "gap-2 font-semibold px-8",
              variant === "dark"
                ? "border-white/30 text-white hover:bg-white/10 hover:text-white"
                : "border-border hover:bg-muted"
            )}
          >
            <Link href={ctaHref ?? "/contact"}>
              <Mail className="h-4 w-4" />
              Send a message
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
