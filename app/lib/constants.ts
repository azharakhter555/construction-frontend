/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/constants.ts

export const SERVICES = [
  { href: "/edt", label: "EDT Lessons" },
  { href: "/pre-test", label: "Pre-Test Lessons" },
  { href: "/mock-test", label: "Mock Test" },
  { href: "/automatic", label: "Automatic Lessons" },
  { href: "/car-hire", label: "Car Hire for Driving Test" },
  { href: "/instructor-training", label: "Driving Instructor Training" },
];

export const STARTED = [
  { href: "/started/rules-of-the-road", label: "Rules of the Road Book" },
  { href: "/started/test-questions", label: "Driving Test Questions" },
  { href: "/started/road-signs", label: "Road Signs Ireland" },
  { href: "/started/mock-theory", label: "Mock Theory Test" },
  { href: "/started/before-test", label: "Before the Test" },
];

export const LOCATION = [
  { href: "/locations/waterford", label: "Waterford" },
  { href: "/locations/dublin", label: "Dublin" },
];

export const YOUTUBEVIDEOIDS = [
  { id: "_Mm7QVHFEPc", title: "How to do the Turnabout" },
  { id: "dQw4w9WgXcQ", title: "How to do the Hill Start" },
  { id: "9bZkp7q19f0", title: "How to reverse around the corner" },
  { id: "kJQP7kiw5Fk", title: "How to check under the bonnet" },
];

export const ABOUT = [
  { href: "/about/pricing", label: "Pricing" },
  { href: "/about/gift-voucher", label: "Gift Voucher" },
  { href: "/about/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
];

export const MOBILE_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export interface ServiceWITHIMAGETYPE {
  href: string;
  label: string;
  image: string;
  description?: string;
  icon?: string;
}

// lib/constants.ts
export const SERVICESWITHIMAGE: any[] = [
  {
    href: "/services/suspended-ceilings",
    label: "Suspended Ceilings",
    tagline: "Suspended Ceilings in Dublin",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop&q=80",
    icon: "fa-layer-group",
    description:
      "Professional suspended ceiling installation across Dublin and Ireland. From standard grid systems to bespoke feature ceilings with integrated lighting and acoustic performance.",
  },
  {
    href: "/services/plasterboard-ceilings",
    label: "Plasterboard Ceilings",
    tagline: "Plasterboard Ceilings in Dublin",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop&q=80",
    icon: "fa-th-large",
    description:
      "Bespoke plasterboard and feature ceilings designed and finished to a professional standard. Clean lines, seamless finishes and full integration with lighting and services.",
  },
  {
    href: "/services/commercial-ceiling-repairs",
    label: "Commercial Ceiling Repairs",
    tagline: "Commercial Ceiling Repairs in Dublin",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop&q=80",
    icon: "fa-tools",
    description:
      "Fast, reliable commercial ceiling repairs for Dublin businesses. We replace damaged tiles, repair grids and make safe water-damaged ceilings with minimal disruption to your operations.",
  },
  {
    href: "/services/shop-ceiling-installation",
    label: "Shop Ceiling Installation",
    tagline: "Shop Ceiling Installation in Dublin",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&h=400&fit=crop&q=80",
    icon: "fa-store",
    description:
      "Specialist ceiling solutions for retail environments. Suspended and plasterboard ceilings that enhance customer experience, improve acoustics and allow flexible lighting and signage layouts.",
  },
  {
    href: "/services/office-partitions",
    label: "Partition Services",
    tagline: "Partition Services in Dublin",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop&q=80",
    icon: "fa-door-open",
    description:
      "Premium fire-rated and acoustic partition systems for Dublin offices. Expert design and installation of metal stud and drywall partitions that optimise workspace layout, privacy and performance.",
  },
  {
    href: "/services/fire-sealing",
    label: "Fire Sealing",
    tagline: "Fire Sealing in Dublin",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop&q=80",
    icon: "fa-fire-extinguisher",
    description:
      "Certified fire sealing over suspended ceilings. Protect your commercial space and stay compliant with all building and fire safety regulations.",
  },
];
export const SCHOLINFO = {
  name: "National Driving School",
  logo: "/assets/logo.png", // or a URL
  rating: 4.9,
  reviewCount: 2350,
  poweredBy: "Google",
};

// Define your reviews
export const REVIEWS = [
  {
    id: "1",
    name: "Erica Whelan",
    date: "last year",
    text: "I done three pre tests with Damien in Tallaght, and passed first time...",
    avatar: "https://ui-avatars.com/api/?name=Erica+Whelan&background=1a56db&color=fff&size=48",
  },
  {
    id: "2",
    name: "Deepa Sridhar",
    date: "last year",
    text: "Heartfelt Thanks for Your Incredible Support Kevin Veeren!...",
    avatar: "https://ui-avatars.com/api/?name=Deepa+Sridhar&background=1a56db&color=fff&size=48",
  },
  // ... more reviews
];

// Define your clients
export const CLIENTS = [
  { id: "1", name: "Client 1", logo: "/clients/logo1.png" },
  { id: "2", name: "Client 2", logo: "/clients/logo2.png" },
  { id: "3", name: "Client 3", logo: "/clients/logo3.png" },
];
