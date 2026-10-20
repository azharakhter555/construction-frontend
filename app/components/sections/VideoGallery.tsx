"use client";

import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export interface VideoItem {
  /** YouTube video ID (e.g., "dQw4w9WgXcQ") */
  id: string;
  /** Display title */
  title: string;
}

export interface VideoGalleryProps {
  /** Section heading */
  heading?: string;
  /** Subheading / description */
  subheading?: string;
  /** Array of videos */
  videos: VideoItem[];
  /** Number of columns: 2, 3, or 4 (default: 3) */
  columns?: 2 | 3 | 4;
  /** Background variant */
  variant?: "light" | "muted";
  /** Additional classes */
  className?: string;
}

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export function VideoGallery({
  heading = "Driving Techniques & Tutorials",
  subheading = "Watch our expert instructors demonstrate key driving skills",
  videos,
  columns = 3,
  variant = "light",
  className,
}: VideoGalleryProps) {
  const bgClass = variant === "muted" ? "bg-muted/30" : "bg-background";

  // Responsive grid columns
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className={cn("py-20 px-6 transition-colors", bgClass, className)}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {(heading || subheading) && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-lg text-muted-foreground">{subheading}</p>
            )}
          </div>
        )}

        {/* Video Grid */}
        <div className={cn("grid gap-6", gridCols[columns])}>
          {videos.map((video) => (
            <div
              key={video.id}
              className="group rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              {/* 16:9 Video Wrapper */}
              <div className="relative aspect-video bg-muted">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              {/* Title */}
              <div className="p-4">
                <h3 className="text-base font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}