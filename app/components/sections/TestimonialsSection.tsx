"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export interface Review {
  id: string;
  name: string;
  date: string;
  text: string;
  rating?: number;
  avatar?: string;
}

export interface SchoolInfo {
  name: string;
  logo?: string;
  rating: number;
  reviewCount: number;
  poweredBy: string;
}

export interface Client {
  id: string;
  name?: string;
  logo: string;
  alt?: string;
}

interface TestimonialsSectionProps {
  heading?: string;
  subheading?: string;
  description?: string;
  school: SchoolInfo;
  reviews: Review[];
  clients?: Client[];
  className?: string;
  variant?: "light" | "primary";
}

// ------------------------------------------------------------------
// Default data
// ------------------------------------------------------------------
const defaultSchool: SchoolInfo = {
  name: "National Driving School",
  logo: "https://via.placeholder.com/120x120?text=NDS",
  rating: 5.0,
  reviewCount: 2350,
  poweredBy: "Google",
};

const defaultReviews: Review[] = [
  {
    id: "1",
    name: "erica whelan",
    date: "last year",
    text: "I done three pre tests with Damien in Tallaght, and passed first time with only 2 grade twos. Would 100% recommend him, he's an amazing instructor, I wouldn't of passed without all his help🙏🏼",
    avatar: "https://ui-avatars.com/api/?name=Erica+Whelan&background=1a56db&color=fff&size=48",
  },
  // ... add more reviews as needed
];

const defaultClients: Client[] = [
  { id: "1", logo: "https://via.placeholder.com/80x80?text=Logo1" },
  { id: "2", logo: "https://via.placeholder.com/80x80?text=Logo2" },
  // ...
];

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export function TestimonialsSection({
  heading = "What people say",
  subheading = "Our Happy Pupils",
  description = "We take great pride in our customer reviews across all platforms! Please take the time to read some if you are seriously considering been thought to drive!",
  school = defaultSchool,
  reviews = defaultReviews,
  clients = defaultClients,
  className,
  variant = "light",
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Safe access: if no reviews, currentReview is undefined
  const currentReview = reviews.length > 0 ? reviews[currentIndex] : undefined;

  const nextReview = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const sectionBg =
    variant === "primary"
      ? "bg-primary text-primary-foreground"
      : "bg-background text-foreground";

  const isPrimary = variant === "primary";

  return (
    <section
      className={cn(
        "py-20 px-6 transition-colors duration-300",
        sectionBg,
        className
      )}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className={cn(
              "inline-block px-4 py-1.5 text-xs font-semibold tracking-wider rounded-full mb-4",
              isPrimary
                ? "bg-white/20 text-white"
                : "bg-accent text-accent-foreground"
            )}
          >
            {subheading}
          </span>
          <h2
            className={cn(
              "text-4xl md:text-5xl font-bold leading-tight mb-4",
              isPrimary ? "text-primary-foreground" : "text-foreground"
            )}
          >
            {heading}
          </h2>
          <p
            className={cn(
              "text-lg max-w-2xl mx-auto",
              isPrimary ? "text-primary-foreground/80" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: School Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {school.logo && (
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
                  <Image
                    src={school.logo}
                    alt={school.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold">{school.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-secondary">
                    {school.rating.toFixed(1)}
                  </span>
                  <div className="flex text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star text-sm" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {school.reviewCount.toLocaleString()} reviews
                </p>
                <p className="text-xs text-muted-foreground/70 flex items-center gap-1 mt-1">
                  <i className="fab fa-google" /> powered by {school.poweredBy}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Carousel */}
          <div className="relative bg-card rounded-2xl p-6 shadow-lg border border-border min-h-[200px]">
            {currentReview ? (
              <>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {currentReview.avatar && (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={currentReview.avatar}
                          alt={currentReview.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-card-foreground">
                        {currentReview.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {currentReview.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-card-foreground/80 text-sm leading-relaxed line-clamp-6">
                    {currentReview.text}
                  </p>
                </div>

                {/* Navigation arrows */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={prevReview}
                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 text-foreground transition-colors flex items-center justify-center border border-border"
                    aria-label="Previous review"
                  >
                    <i className="fas fa-chevron-left text-sm" />
                  </button>
                  <button
                    onClick={nextReview}
                    className="w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center"
                    aria-label="Next review"
                  >
                    <i className="fas fa-chevron-right text-sm" />
                  </button>
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {reviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        idx === currentIndex
                          ? "bg-primary w-6"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                      )}
                      aria-label={`Go to review ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No reviews available.
              </div>
            )}
          </div>
        </div>

        {/* Clients logos */}
        {clients && clients.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border">
            <h4 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-8">
              Our Clients
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="relative w-24 h-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <Image
                    src={client.logo}
                    alt={client.alt || client.name || "Client logo"}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}