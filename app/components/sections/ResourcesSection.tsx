"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
interface ResourceCard {
  icon: string;
  title: string;
  href: string;
  description?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ResourcesSectionProps {
  heading?: string;
  subheading?: string;
  description?: string;
  resources?: ResourceCard[];
  faqs?: FaqItem[];
  askQuestionTitle?: string;
  askQuestionDescription?: string;
  askQuestionCtaLabel?: string;
  askQuestionCtaHref?: string;
  pdfTitle?: string;
  pdfDescription?: string;
  pdfCtaLabel?: string;
  pdfCtaHref?: string;
  className?: string;
  variant?: "light" | "dark";
}

// ------------------------------------------------------------------
// Default data
// ------------------------------------------------------------------
const defaultResources: ResourceCard[] = [
  {
    icon: "fa-road",
    title: "Road Signs Ireland",
    href: "/road-signs",
  },
  {
    icon: "fa-question-circle",
    title: "Mock Theory Test",
    href: "/mock-test",
  },
  {
    icon: "fa-book",
    title: "Rules of The Road Book PDF",
    href: "/rules-of-the-road",
  },
  {
    icon: "fa-route",
    title: "Driving Test Routes",
    href: "/test-routes",
  },
];

const defaultFaqs: FaqItem[] = [
  {
    question: "What are the types of driving licences?",
    answer:
      "In Ireland, driving licences are categorised by vehicle type (e.g., AM for mopeds, B for cars, C for trucks, etc.). Full details are in the Rules of the Road.",
  },
  {
    question: "Tips for passing your full driving test",
    answer:
      "Practice consistently, review the Rules of the Road, take mock tests, and book a pre‑test lesson with your instructor to identify weak spots.",
  },
  {
    question: "How to change the address on your driving licence?",
    answer:
      "You can update your address online via the NDLS website or by visiting a National Driver Licence Service centre with proof of address and your current licence.",
  },
  {
    question: "How to renew your driving licence?",
    answer:
      "Renew online through the NDLS portal, or in person. You’ll need your Public Services Card, proof of address, and the appropriate fee.",
  },
  {
    question: "Can you drive a manual car on automatic licence?",
    answer: "No. If you pass your test in an automatic, you are restricted to automatic vehicles only. To drive manual you must retake the test in a manual car.",
  },
  {
    question: "How much do driving lessons cost in Ireland?",
    answer:
      "Prices vary, but typically €40–€60 per hour. Many schools offer package deals for EDT lessons (12 mandatory sessions).",
  },
  {
    question: "How many driving lessons do I need?",
    answer:
      "You must complete at least 12 Essential Driver Training (EDT) lessons. Most learners benefit from additional practice before the test.",
  },
  {
    question: "How long before I can take the full test again?",
    answer:
      "If you fail, you must wait at least 3 weeks before retaking the test (unless you appeal).",
  },
  {
    question: "Can I do driving lessons at 16?",
    answer:
      "You can start learning at 17 in Ireland (16 for some categories like mopeds). You must hold a valid learner permit.",
  },
  {
    question: "Can I remove penalty points from my licence?",
    answer:
      "Penalty points remain for 3 years. You cannot remove them early, but they expire automatically after that period if no further offences occur.",
  },
  {
    question: "Rules on unaccompanied drivers in Ireland",
    answer:
      "Learner drivers must be accompanied by a qualified driver (full licence held for at least 2 years) unless they have passed the test.",
  },
  {
    question: "Can I drive a moped on a car licence?",
    answer:
      "If you have a full car licence (category B) issued before 2001, you can drive a moped (AM) automatically. Otherwise you need a separate AM entitlement.",
  },
];

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export function ResourcesSection({
  heading = "Our Resources",
  subheading = "Free Helpful Tools",
  description = "We have built and compiled loads of free helpful resources to help you study, learn and train yourself for your driving lessons.",
  resources = defaultResources,
  faqs = defaultFaqs,
  askQuestionTitle = "Need help choosing your driving lessons?",
  askQuestionDescription = "Speak with the experts in EDT & Pretest driving lessons today.",
  askQuestionCtaLabel = "Ask a Question",
  askQuestionCtaHref = "/ask",
  pdfTitle = "Free Rules of The Road Book PDF",
  pdfDescription = "Download our Free ROTR PDF",
  pdfCtaLabel = "Download PDF",
  pdfCtaHref = "/rules-of-the-road.pdf",
  className,
  variant = "light",
}: ResourcesSectionProps) {
  const bgClass = variant === "dark" ? "bg-background" : "bg-muted/30";

  return (
    <section
      className={cn(
        "relative py-20 px-6 transition-colors duration-300 overflow-hidden",
        bgClass,
        className
      )}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ---------- HEADER ---------- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className={cn(
              "inline-block px-4 py-1.5 text-xs font-semibold tracking-wider rounded-full mb-4",
              "bg-accent text-accent-foreground"
            )}
          >
            {subheading}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-foreground">
            {heading}
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
            {description}
          </p>
        </div>

        {/* ---------- RESOURCES GRID ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {resources.map((resource, index) => (
            <Card
              key={index}
              className={cn(
                "group relative overflow-hidden transition-all duration-300",
                "hover:scale-[1.03] hover:shadow-xl",
                "bg-card border border-border",
                "hover:shadow-primary/10 dark:hover:shadow-primary/20"
              )}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4",
                    "bg-accent text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  )}
                >
                  <i className={`fas ${resource.icon} text-2xl`} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-card-foreground">
                  {resource.title}
                </h3>
                {resource.description && (
                  <p className="text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                )}
                <Button
                  asChild
                  variant="link"
                  className="mt-3 text-primary p-0 h-auto"
                >
                  <Link href={resource.href}>
                    Learn more <i className="fas fa-arrow-right ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ---------- TWO‑COLUMN LAYOUT (FAQ + RIGHT BLOCKS) ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT COLUMN – Accordion FAQ */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              Frequently Asked Questions
            </h3>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-border last:border-0"
                >
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-3 text-foreground">
                    <span className="flex items-start gap-2">
                      <i className="fas fa-chevron-right text-primary text-xs mt-1 flex-shrink-0" />
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pl-6 pr-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* RIGHT COLUMN – two stacked blocks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top block – Big with background image and overlay */}
            <div
              className={cn(
                "relative rounded-2xl overflow-hidden",
                "bg-cover bg-center bg-no-repeat",
                "min-h-[220px] md:min-h-[280px]",
                "flex items-center justify-center"
              )}
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80')",
              }}
            >
              <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />
              <div className="relative z-10 text-center text-white px-6 py-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {askQuestionTitle}
                </h3>
                <p className="text-white/90 text-sm md:text-base max-w-md mx-auto mb-6">
                  {askQuestionDescription}
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold px-8 shadow-lg"
                >
                  <Link href={askQuestionCtaHref}>
                    <i className="fas fa-comment mr-2" />
                    {askQuestionCtaLabel}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Bottom block – Smaller with PDF download */}
            <Card className="border-border bg-card shadow-sm overflow-hidden">
              <CardContent className="flex flex-col sm:flex-row items-center justify-between p-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center text-primary text-3xl">
                    <i className="fas fa-file-pdf" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-card-foreground">
                      {pdfTitle}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {pdfDescription}
                    </p>
                  </div>
                </div>
                <Button asChild size="default" className="font-semibold">
                  <Link href={pdfCtaHref}>
                    <i className="fas fa-download mr-2" />
                    {pdfCtaLabel}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}