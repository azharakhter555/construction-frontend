"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, Minus, MessageCircle, Phone } from "lucide-react";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export interface FaqItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  heading?: string;
  subheading?: string;
  faqs?: FaqItem[]; // ← already there
  variant?: "light" | "muted";
  className?: string;
}

// ------------------------------------------------------------------
// Default FAQ data — shop ceiling installation
// ------------------------------------------------------------------
const defaultFaqs: FaqItem[] = [
  {
    question: "How long does a shop ceiling installation typically take?",
    answer:
      "Most shop ceiling installations take 3–5 days, depending on the size of the retail space and complexity of the design. We always work around your business hours to minimise disruption to your operations.",
  },
  {
    question: "What types of ceilings are best for retail and salon environments?",
    answer:
      "For retail spaces and salons, we typically recommend suspended grid ceilings with high-quality acoustic tiles. These provide excellent sound absorption, easy access to services above, and can incorporate various lighting options. For higher-end spaces like beauty salons, we also offer designer ceilings with custom features that enhance the customer experience.",
  },
  {
    question: "Do I need to close my shop during ceiling installation?",
    answer:
      "Not necessarily. We can work outside business hours or section off areas of your shop to allow continued operation. Our team is experienced in retail installations and understands the importance of minimising business disruption.",
  },
  {
    question: "What are the building regulations for shop ceilings in Dublin?",
    answer:
      "Shop ceilings must meet fire safety regulations, including proper fire ratings for materials. They must also comply with acoustic and thermal requirements. Our team ensures all installations meet current building regulations, and we handle any necessary compliance documentation.",
  },
  {
    question: "Can you install a ceiling that matches my shop branding?",
    answer:
      "Absolutely. We offer custom colour options, decorative elements, and unique design features to complement your brand. We can incorporate logos, custom lighting layouts, and special features to create a ceiling that enhances your retail brand identity.",
  },
  {
    question: "What is the typical cost for a shop ceiling installation?",
    answer:
      "Shop ceiling costs vary based on size, materials, and complexity. Basic suspended ceilings typically range from €30–€60 per square metre, while custom designs with special features can range from €60–€120+ per square metre. We provide detailed quotes following a site visit.",
  },
  {
    question: "What special considerations are there for salon ceiling installations?",
    answer:
      "Salon ceilings require specific attention to lighting quality, moisture resistance, and acoustics. We install specialised lighting systems that accurately represent hair colours, moisture-resistant materials for areas near washing stations, and sound-absorbing elements to create a relaxing environment. Our salon ceiling solutions are designed to enhance both functionality and aesthetics.",
  },
];

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export function FAQSection({
  heading = "Frequently Asked Questions",
  subheading = "Everything you need to know about shop, retail and salon ceiling installations in Dublin.",
  faqs = defaultFaqs,
  variant = "light",
  className,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const bgClass = variant === "muted" ? "bg-muted/30" : "bg-background";

  return (
    <section
      className={cn("relative overflow-hidden px-6 py-24 transition-colors", bgClass, className)}
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

      <div className="relative mx-auto max-w-4xl">
        {/* ============ HEADER ============ */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wider text-[#0A2946]
            shadow-[0_0_20px_rgba(202,151,46,0.4)] ring-1 ring-secondary/60
            animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            ⭐ Got questions?
          </span>
          <h2
            className="text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl
            animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both"
          >
            {heading}
          </h2>
          <p
            className="mt-4 text-base text-muted-foreground dark:text-gray-100 md:text-lg
            animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both"
          >
            {subheading}
          </p>
        </div>

        {/* ============ FAQ ACCORDION ============ */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border bg-card transition-all duration-500",
                  isOpen
                    ? "border-secondary/60 shadow-[0_20px_50px_-15px_rgba(202,151,46,0.35),0_10px_20px_-8px_rgba(10,41,70,0.15)]"
                    : "border-border hover:border-secondary/40 hover:shadow-[0_10px_30px_-10px_rgba(10,41,70,0.15)]",
                  "animate-in fade-in slide-in-from-bottom-6 duration-500 fill-mode-both"
                )}
                style={{ animationDelay: `${400 + index * 70}ms` }}
              >
                {/* Gold accent line grows on open */}
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-0.5 bg-secondary transition-all duration-500",
                    isOpen ? "w-full" : "w-0 group-hover:w-16"
                  )}
                />

                {/* Question button */}
                <button
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left focus:outline-none
                  focus-visible:ring-2 focus-visible:ring-secondary/40"
                >
                  {/* Plus / minus icon */}
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                      isOpen
                        ? "bg-secondary text-[#0A2946] shadow-[0_0_18px_rgba(202,151,46,0.5)]"
                        : "bg-secondary/10 text-secondary ring-1 ring-secondary/30 group-hover:bg-secondary/20"
                    )}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" strokeWidth={2.5} />
                    ) : (
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                    )}
                  </span>

                  {/* Question text */}
                  <span
                    className={cn(
                      "flex-1 text-base font-semibold transition-colors md:text-lg",
                      isOpen ? "text-secondary" : "text-card-foreground group-hover:text-secondary"
                    )}
                  >
                    {faq.question}
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={cn(
                    "grid overflow-hidden px-6 transition-all duration-500 ease-in-out",
                    isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] pb-0 opacity-0"
                  )}
                >
                  <div className="min-h-0">
                    <p className="pl-12 leading-relaxed text-muted-foreground dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============ STILL HAVE QUESTIONS CTA ============ */}
        <div
          className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8
          animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
          style={{ animationDelay: "900ms" }}
        >
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-foreground md:text-xl">
                Still have questions?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Message us on WhatsApp or call — we&apos;re happy to help.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/353851181111?text=Hi%2C%20I%27d%20like%20to%20ask%20about%20a%20shop%20ceiling%20installation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white
                shadow-[0_8px_22px_-6px_rgba(37,211,102,0.7)]
                transition-all duration-300
                hover:-translate-y-0.5 hover:bg-[#1ebe5b]
                hover:shadow-[0_12px_28px_-6px_rgba(37,211,102,0.9)]"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>

              <a
                href="tel:+353851181111"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground
                transition-all duration-300
                hover:-translate-y-0.5 hover:border-secondary/50 hover:bg-secondary/10"
              >
                <Phone className="h-4 w-4 text-secondary" />
                Call us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
