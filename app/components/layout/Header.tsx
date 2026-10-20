// components/layout/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { NavLink } from "@/components/shared/NavLink";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-28 items-center justify-between">
          {/* Logo — swaps with theme */}
          <Link
            href="/"
            aria-label="Paddy Kehoe Suspended Ceilings — Home"
            className="flex items-center shrink-0"
          >
            {/* Dark logo (shown in LIGHT mode) */}
            <Image
              src="/logo/b-l-no-bg.svg"
              alt="Paddy Kehoe Suspended Ceilings"
              width={220}
              height={90}
              priority
              className="block h-30 w-auto max-w-[360px] object-contain dark:hidden"
            />

            {/* Light logo (shown in DARK mode) */}
            <Image
              src="/logo/b-d-no-b.svg"
              alt="Paddy Kehoe Suspended Ceilings"
              width={220}
              height={90}
              priority
              className="hidden h-30 w-auto max-w-[360px] object-contain dark:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/">HOME</NavLink>
            <NavLink href="/services">SERVICES</NavLink>
            <NavLink href="/about">ABOUT US</NavLink>
            <NavLink href="/gallery">GALLERY</NavLink>
            <div className="flex items-center space-x-4">
              <NavLink href="/contact">CONTACT</NavLink>
              <ThemeToggle variant="icon" />
            </div>
          </nav>

          {/* Mobile */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle variant="minimal" />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
