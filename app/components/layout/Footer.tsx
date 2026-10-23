"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Clock, MapPin, Facebook, Instagram, Heart } from "lucide-react";

// ------------------------------------------------------------------
// Data
// ------------------------------------------------------------------
const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Suspended Ceilings", href: "/services/suspended-ceilings" },
  { label: "Office Partitions", href: "/services/office-partitions" },
  { label: "Shop Ceilings", href: "/services/shop-ceiling-installation" },
  { label: "Ceiling Repairs", href: "/services/commercial-ceiling-repairs" },
  { label: "Fire Sealing", href: "/services/fire-sealing" },
];

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0A2946] text-white/70">
      {/* Top gold accent line */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* ============ MAIN GRID ============ */}
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-2 md:text-left lg:grid-cols-4 lg:gap-12">
          {/* ---------- Brand / About ---------- */}
          <div className="space-y-4 lg:col-span-2">
            {/* Logo — centered on mobile */}
            <Link
              href="/"
              aria-label="Five Star Property Maintenance — Home"
              className="inline-block mx-auto md:mx-0"
            >
              <Image
                src="/logo/b-d-no-b.svg"
                alt="Five Star Property Maintenance"
                width={300}
                height={80}
                className="h-32 w-auto max-w-[320px] object-contain md:h-40 md:max-w-[400px]"
              />
            </Link>

            {/* Contact quick links — centered on mobile */}
            <ul className="space-y-2 pt-2 text-sm">
              <li className="flex items-center justify-center gap-3 md:justify-start">
                <Phone className="h-4 w-4 text-secondary shrink-0" />
                <a href="tel:+353851181111" className="transition-colors hover:text-white">
                  085 118 1111
                </a>
              </li>
              <li className="flex items-center justify-center gap-3 md:justify-start">
                <Mail className="h-4 w-4 text-secondary shrink-0" />
                <a
                  href="mailto:info@dublinceillings.ie"
                  className="transition-colors hover:text-white"
                >
                  info@dublinceillings.ie
                </a>
              </li>
              <li className="flex items-center justify-center gap-3 md:justify-start">
                <MapPin className="h-4 w-4 text-secondary shrink-0" />
                <span>Dublin, Kildare &amp; surrounding areas</span>
              </li>
            </ul>

            {/* Social — centered on mobile */}
            <div className="flex justify-center gap-3 pt-3 md:justify-start">
              {[
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Instagram, label: "Instagram", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full
                  bg-white/5 text-white/70 ring-1 ring-white/10
                  transition-all duration-300
                  hover:bg-secondary hover:text-[#0A2946] hover:ring-secondary hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ---------- Navigation ---------- */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center justify-center gap-2 transition-colors hover:text-white md:justify-start"
                  >
                    <span className="h-1 w-0 rounded-full bg-secondary transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Services ---------- */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="group inline-flex items-center justify-center gap-2 transition-colors hover:text-white md:justify-start"
                  >
                    <span className="h-1 w-0 rounded-full bg-secondary transition-all duration-300 group-hover:w-3" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ============ OPENING HOURS + CTA ============ */}
        <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 text-sm md:grid-cols-2">
          <div className="flex items-start justify-center gap-3 md:justify-start">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
            <div className="text-center md:text-left">
              <p className="font-semibold text-white">Opening Hours</p>
              <p className="text-white/60">Monday – Friday: 8am – 6pm</p>
              <p className="text-white/60">Saturday: 9am – 2pm</p>
              <p className="text-white/60">Sunday: Closed</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-[#0A2946]
              shadow-[0_10px_30px_-8px_rgba(202,151,46,0.55)]
              transition-all duration-300
              hover:-translate-y-0.5 hover:bg-secondary/90
              hover:shadow-[0_14px_38px_-8px_rgba(202,151,46,0.85)]"
            >
              Get a Free Quote
            </a>
          </div>
        </div>

        {/* ============ BOTTOM BAR ============ */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          <p>© {new Date().getFullYear()} Five Star Property Maintenance. All rights reserved.</p>
          <p className="mt-1 inline-flex items-center gap-1">
            Designed with <Heart className="h-3 w-3 fill-secondary text-secondary" /> in Dublin
          </p>
        </div>
      </div>
    </footer>
  );
}
