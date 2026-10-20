"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    const update = () => {
      const section = sectionRef.current;
      const bg = bgRef.current;
      const content = contentRef.current;
      const glow = glowRef.current;
      if (!section || !bg || !content) return;

      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));

      const bgY = progress * rect.height * 0.2;
      bg.style.transform = `translate3d(0, ${bgY}px, 0)`;

      const contentY = progress * -80;
      content.style.transform = `translate3d(0, ${contentY}px, 0)`;
      content.style.opacity = String(Math.max(0, 1 - progress * 1.35));

      if (glow) {
        glow.style.transform = `translate3d(0, ${progress * 120}px, 0)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[100vh] overflow-hidden">
      {/* ===== PARALLAX BACKGROUND ===== */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-x-0 -top-[20%] h-[140%] bg-cover bg-center bg-no-repeat will-change-transform"
          style={{ backgroundImage: "url('/assets/pic1.jpg')" }}
        />
      </div>

      {/* ===== DIRECTIONAL OVERLAY ===== */}
      {/* Dark on the LEFT (behind the text) → clear on the RIGHT (image shows through) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(30deg, rgba(10,41,70,0.92) 0%, rgba(10,41,70,0.75) 50%, rgba(10,41,70,0.35) 10%, rgba(10,41,70,0.05) 100%)",
        }}
      />

      {/* Light overall wash — keeps highlights from blowing out on bright images */}
      <div className="absolute inset-0 bg-[#0A2946]/10" />

      {/* Golden ambient glow — animated subtly on scroll */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-secondary/20 blur-[120px] will-change-transform"
      />

      {/* ===== CONTENT ===== */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-start justify-center h-full min-h-[90vh] px-6 md:px-12 max-w-4xl mx-auto will-change-transform"
      >
        {/* Badge — entrance */}
        <span
          className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-[#0A2946] bg-secondary rounded-full
          shadow-[0_0_20px_rgba(202,151,46,0.55),0_4px_14px_rgba(0,0,0,0.25)]
          ring-1 ring-secondary/60
          animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          ⭐ Dublin&apos;s Trusted Property Maintenance Specialists
        </span>

        {/* H1 — entrance, staggered by line */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
          <span className="inline-block animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
            Property Maintenance &
          </span>{" "}
          <span className="inline-block text-secondary animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 fill-mode-both">
            Installation
          </span>{" "}
          <span className="inline-block animate-in fade-in slide-in-from-bottom-6 duration-700 delay-450 fill-mode-both">
            in Dublin
          </span>
        </h1>

        <p
          className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl
          animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[650ms] fill-mode-both"
        >
          Five Start Property Maintenance are known for their excellent workmanship. We call out,
          measure up, quote, and show sample tiles to make your decision an easy one.{" "}
          <span className="font-semibold text-secondary">
            Fire sealing over suspended ceilings now available.
          </span>
        </p>

        <ul className="mt-6 flex flex-col gap-2 text-sm md:text-base text-white/90">
          {[
            "Free call-out, measure-up & quotation",
            "Sample tiles shown on-site",
            "Fire sealing now available",
          ].map((text, i) => (
            <li
              key={text}
              className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both"
              style={{ animationDelay: `${800 + i * 120}ms` }}
            >
              <span className="text-secondary">✓</span>
              {text}
            </li>
          ))}
        </ul>

        <div
          className="mt-8 flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
          style={{ animationDelay: "1200ms" }}
        >
          {/* Primary CTA */}
          <Button
            asChild
            size="lg"
            className="font-semibold bg-primary text-primary-foreground
            shadow-[0_10px_30px_-8px_rgba(202,151,46,0.65),0_4px_12px_rgba(0,0,0,0.25)]
            hover:shadow-[0_14px_38px_-8px_rgba(202,151,46,0.85),0_6px_16px_rgba(0,0,0,0.3)]
            hover:-translate-y-0.5 transition-all duration-300"
          >
            <Link href="/contact">Get a Free Quote</Link>
          </Button>

          {/* Secondary CTA */}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="font-semibold bg-secondary text-[#0A2946] border-secondary
            shadow-[0_10px_30px_-8px_rgba(202,151,46,0.65),0_4px_12px_rgba(0,0,0,0.2)]
            hover:bg-secondary/90
            hover:shadow-[0_14px_38px_-8px_rgba(202,151,46,0.9),0_6px_16px_rgba(0,0,0,0.25)]
            hover:-translate-y-0.5 transition-all duration-300"
          >
            <Link href="/gallery">View Our Work</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
