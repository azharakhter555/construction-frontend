"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
interface Project {
  id: string;
  title: string;
  category: string; // must match one of the tab values (or "all")
  location: string;
  image: string;
  /** Optional — if you want a larger image in the grid */
  featured?: boolean;
}

interface GallerySectionProps {
  heading?: string;
  subheading?: string;
  description?: string;
  projects?: Project[];
  categories?: { value: string; label: string }[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

// ------------------------------------------------------------------
// Default data — swap image paths for your real project photos
// ------------------------------------------------------------------
const defaultCategories = [
  { value: "all", label: "All Projects" },
  { value: "suspended-ceilings", label: "Suspended Ceilings" },
  { value: "office-partitions", label: "Office Partitions" },
  { value: "shop-ceilings", label: "Shop Ceilings" },
  { value: "fire-sealing", label: "Fire Sealing" },
];

const defaultProjects: Project[] = [
  {
    id: "p1",
    title: "Open-Plan Office Ceiling",
    category: "suspended-ceilings",
    location: "Dublin 2",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=900&fit=crop&q=80",
    featured: true,
  },
  {
    id: "p2",
    title: "Glass Office Partitions",
    category: "office-partitions",
    location: "Dublin 4",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&h=900&fit=crop&q=80",
  },
  {
    id: "p3",
    title: "Retail Shop Feature Ceiling",
    category: "shop-ceilings",
    location: "Grafton Street",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=900&h=900&fit=crop&q=80",
  },
  {
    id: "p4",
    title: "Fire-Rated Ceiling System",
    category: "fire-sealing",
    location: "Dublin 15",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&h=900&fit=crop&q=80",
  },
  {
    id: "p5",
    title: "Acoustic Grid Ceiling",
    category: "suspended-ceilings",
    location: "Kildare",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&h=900&fit=crop&q=80",
  },
  {
    id: "p6",
    title: "Corporate Meeting Room",
    category: "office-partitions",
    location: "Dublin 1",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&h=900&fit=crop&q=80",
  },
  {
    id: "p7",
    title: "Restaurant Ceiling Installation",
    category: "shop-ceilings",
    location: "Temple Bar",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&h=900&fit=crop&q=80",
  },
  {
    id: "p8",
    title: "Plasterboard Feature Ceiling",
    category: "suspended-ceilings",
    location: "Dublin 6",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=900&fit=crop&q=80",
    featured: true,
  },
];

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export function GallerySection({
  heading = "Recent Projects",
  subheading = "Our Work",
  description = "A selection of suspended ceiling and partition projects we've completed across Dublin, Kildare and Ireland. Every job finished to the same high standard.",
  projects = defaultProjects,
  categories = defaultCategories,
  ctaLabel = "See More Projects",
  ctaHref = "/gallery",
  className,
}: GallerySectionProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeTab === "all" ? projects : projects.filter((p) => p.category === activeTab);

  // ----- Lightbox navigation -----
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  }, [filtered.length]);

  // ----- Keyboard controls for lightbox -----
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    // Prevent body scroll while open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, goPrev, goNext]);

  return (
    <section className={cn("relative overflow-hidden bg-background px-6 py-24", className)}>
      {/* Ambient gold glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl">
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
            className="text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl
            animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both"
          >
            {heading}
          </h2>
          <p
            className="mt-4 text-base text-muted-foreground dark:text-gray-100 md:text-lg
            animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both"
          >
            {description}
          </p>
        </div>

        {/* ============ TABS ============ */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isActive = activeTab === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveTab(cat.value);
                  setLightboxIndex(null);
                }}
                className={cn(
                  "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-[0_10px_25px_-8px_rgba(10,41,70,0.55)]"
                    : "bg-card text-foreground border border-border hover:border-secondary/50 hover:bg-secondary/10",
                  isActive &&
                    "shadow-[0_10px_25px_-8px_rgba(10,41,70,0.55),0_0_18px_rgba(202,151,46,0.3)]"
                )}
              >
                {isActive && (
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-secondary" />
                )}
                {cat.label}
                {isActive && <span className="text-xs text-secondary">({filtered.length})</span>}
              </button>
            );
          })}
        </div>

        {/* ============ GALLERY GRID ============ */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            No projects found in this category yet.
          </div>
        ) : (
          <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {filtered.map((project, index) => (
              <button
                key={project.id}
                onClick={() => openLightbox(index)}
                aria-label={`View ${project.title}`}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-muted text-left",
                  "transition-all duration-500",
                  "hover:-translate-y-1 hover:z-10",
                  "hover:shadow-[0_25px_60px_-15px_rgba(202,151,46,0.4),0_10px_20px_-8px_rgba(10,41,70,0.2)]",
                  "animate-in fade-in zoom-in-95 duration-500 fill-mode-both",
                  project.featured && "md:col-span-2 md:row-span-2"
                )}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                {/* Image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark gradient always subtle, stronger on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2946] via-[#0A2946]/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-95" />

                {/* Zoom icon top-right (appears on hover) */}
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-[#0A2946] opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                  <ZoomIn className="h-4 w-4" />
                </div>

                {/* Category pill top-left */}
                <div className="absolute left-4 top-4">
                  <span className="inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm ring-1 ring-white/20">
                    {categories.find((c) => c.value === project.category)?.label ??
                      project.category}
                  </span>
                </div>

                {/* Bottom: title + location (slides up on hover) */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                    <p className="mb-0.5 text-[11px] font-medium text-secondary">
                      {project.location}
                    </p>
                    <h3 className="text-base font-bold text-white md:text-lg">{project.title}</h3>
                  </div>
                  {/* Gold underline grows on hover */}
                  <div className="mt-2 h-0.5 w-0 bg-secondary transition-all duration-500 group-hover:w-12" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ============ BOTTOM CTA ============ */}
        <div className="mt-14 text-center">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-primary text-primary-foreground font-semibold
            shadow-[0_10px_30px_-8px_rgba(202,151,46,0.55)]
            hover:shadow-[0_14px_38px_-8px_rgba(202,151,46,0.8)]
            hover:-translate-y-0.5 transition-all duration-300"
          >
            <Link href={ctaHref}>
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* ============ LIGHTBOX ============ */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A2946]/95 p-4 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full
            bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm
            transition-all hover:bg-secondary hover:text-[#0A2946] hover:ring-secondary"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous"
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full
              bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm
              transition-all hover:bg-secondary hover:text-[#0A2946] hover:ring-secondary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Next */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next"
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full
              bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm
              transition-all hover:bg-secondary hover:text-[#0A2946] hover:ring-secondary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {/* Image + info */}
          <div
            className="relative max-h-[85vh] w-full max-w-5xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={filtered[lightboxIndex].image}
                alt={filtered[lightboxIndex].title}
                className="max-h-[75vh] w-full object-contain"
              />
            </div>

            {/* Caption bar */}
            <div className="mt-4 flex items-end justify-between gap-4 text-white">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-secondary">
                  {filtered[lightboxIndex].location}
                </p>
                <h3 className="text-xl font-bold md:text-2xl">{filtered[lightboxIndex].title}</h3>
              </div>
              <p className="shrink-0 text-sm text-white/60">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
