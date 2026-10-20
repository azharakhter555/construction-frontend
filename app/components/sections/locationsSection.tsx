"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
interface LocationGroup {
  title: string;
  places: string[];
}

interface LocationsSectionProps {
  heading?: string;
  subheading?: string;
  description?: string;
  groups?: LocationGroup[];
  className?: string;
}

// ------------------------------------------------------------------
// Default data
// ------------------------------------------------------------------
const defaultGroups: LocationGroup[] = [
  {
    title: "📍 Dublin City & North",
    places: [
      "Tallaght",
      "Finglas",
      "Swords",
      "Raheny",
      "Dun Laoghaire",
      "Blanchardstown",
      "Clondalkin",
      "Balbriggan",
      "Skerries",
      "Portmarnock",
    ],
  },
  {
    title: "📍 Kildare & Surrounds",
    places: [
      "Newbridge",
      "Athy",
      "Celbridge",
      "Clane",
      "Kilcock",
      "Kilcullen",
      "Kill",
      "Leixlip",
      "Maynooth",
      "Naas",
    ],
  },
  {
    title: "📍 South Dublin & East Meath",
    places: [
      "Glasnevin",
      "Foxrock",
      "Ballsbridge",
      "Lusk",
      "Rathcoole",
      "Templeogue",
      "Sandyford",
      "Dunshaughlin",
      "Dundalk",
      "Drogheda",
    ],
  },
];

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export function LocationsSection({
  heading = "Our Locations",
  subheading = "Find us everywhere",
  description = "We have a network of driving instructors that are located in all corners of Ireland. Below are the best areas to get your driving lessons started in:",
  groups = defaultGroups,
  className,
}: LocationsSectionProps) {
  return (
    <section
      className={cn(
        "py-20 px-6 transition-colors duration-300 bg-background",
        className
      )}
    >
      <div className="max-w-6xl mx-auto">
        {/* ---------- HEADER ---------- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider rounded-full mb-4 bg-accent text-accent-foreground">
            {subheading}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-foreground">
            {heading}
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
            {description}
          </p>
        </div>

        {/* ---------- LOCATION GROUPS ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.map((group, index) => (
            <Card
              key={index}
              className={cn(
                "group relative overflow-hidden transition-all duration-300",
                "hover:shadow-xl hover:scale-[1.02]",
                "bg-card border border-border",
                "hover:shadow-primary/5 dark:hover:shadow-primary/10"
              )}
            >
              {/* Decorative accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />

              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-card-foreground">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.places.map((place, idx) => (
                    <span
                      key={idx}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
                        "bg-muted/50 text-muted-foreground",
                        "border border-border",
                        "transition-all duration-200",
                        "hover:bg-primary hover:text-primary-foreground hover:border-primary",
                        "cursor-default"
                      )}
                    >
                      <i className="fas fa-map-pin text-[10px] opacity-70" />
                      {place}
                    </span>
                  ))}
                </div>
                {/* Decorative "Ireland" map hint */}
                <div className="mt-4 text-xs text-muted-foreground/50 flex items-center gap-1">
                  <i className="fas fa-map-marked-alt" />
                  <span>Available in this area</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}