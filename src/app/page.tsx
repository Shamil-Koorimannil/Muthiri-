"use client";

import Link from "next/link";
import { useParallax } from "@/hooks/useParallax";

export default function HomePage() {
  useParallax();

  return (
    <section className="flex flex-col justify-center min-h-screen pt-[180px] pb-[100px]" style={{ paddingLeft: "var(--site-padding-x)", paddingRight: "var(--site-padding-x)" }}>
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] items-center gap-[6vw] mb-[12vh]">
        <div className="flex flex-col">
          <span className="reveal-wrapper block overflow-hidden">
            <span className="reveal-text font-sans text-[0.85rem] font-normal tracking-[0.25em] text-fg-secondary uppercase mb-[25px] block">
              London / Berlin &mdash; Est. 2020
            </span>
          </span>
          <h1 className="reveal-wrapper block overflow-hidden">
            <span className="reveal-text font-serif text-[5.5vw] max-md:text-[9vw] max-sm:text-[11vw] font-light leading-[0.95] tracking-[-0.03em] text-fg-primary">
              Muthiri is a <em className="font-serif italic font-light">multidisciplinary</em> creative designing physical archives &amp; generative art.
            </span>
          </h1>
        </div>
        <div className="fade-in relative w-full aspect-[4/5] overflow-hidden border border-white/5">
          <img
            src="/assets/hero-home.png"
            alt="Muthiri Art Installation"
            className="hero-image w-full h-full object-cover grayscale contrast-[105%] scale-[1.15]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[0.7fr_1.3fr] gap-[8vw] items-start mb-[18vh] border-t border-border-color pt-[8vh] fade-in">
        <div className="font-display text-[2.2vw] max-md:text-[1.8rem] font-bold leading-[1.1] tracking-[-0.02em]">
          THE ART OF NEGATIVE SPACE.
        </div>
        <div className="flex flex-col gap-[40px]">
          <p className="text-[1.25rem] font-light text-fg-secondary max-w-[700px] leading-[1.6]">
            Bridging the gap between strict rational brand systems, digital spatial design, and conceptual art. Working with leading museums and luxury publications to construct visual monuments of silence.
          </p>
          <Link
            href="/about"
            className="hover-trigger no-underline font-sans text-[0.85rem] tracking-[0.15em] uppercase text-fg-primary inline-flex items-center gap-[15px] w-fit border-b border-fg-primary pb-[6px] font-medium transition-all duration-[400ms] hover:gap-[25px]"
            style={{ transitionTimingFunction: "var(--transition-smooth)" }}
          >
            <span>Discover the Practice</span>
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 6H22M22 6L17 1M22 6L17 11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="w-screen overflow-x-auto flex gap-[4vw] mb-[12vh] fade-in scrollbar-none" style={{ paddingLeft: "var(--site-padding-x)", paddingRight: "var(--site-padding-x)", marginLeft: "calc(-1 * var(--site-padding-x))", marginRight: "calc(-1 * var(--site-padding-x))" }}>
        <div className="inline-block align-top w-[320px] flex-shrink-0 border-r border-border-color pr-[40px]">
          <span className="font-sans text-[0.75rem] text-fg-muted tracking-[0.2em] uppercase mb-[20px] block">
            Curated works
          </span>
          <h3 className="font-serif text-[2.5rem] font-light leading-[1.1] text-fg-primary">
            Selected Exhibitions &amp; Designs
          </h3>
        </div>

        <Link
          href="/work/design/transient-spaces"
          className="featured-card hover-trigger inline-block align-top w-[480px] max-sm:w-[320px] flex-shrink-0 no-underline text-inherit"
        >
          <div className="w-full aspect-[16/10] overflow-hidden border border-white/5 mb-[20px]">
            <img src="/assets/design-1.png" alt="Transient Spaces Monograph" className="w-full h-full object-cover grayscale transition-all duration-[1200ms] hover:scale-[1.05] hover:grayscale-0" />
          </div>
          <div className="flex justify-between items-baseline border-b border-border-muted pb-[12px] mb-[10px]">
            <span className="font-display text-[0.65rem] font-bold tracking-[0.1em] uppercase text-fg-secondary">DESIGN ARCHIVE</span>
            <span className="font-sans text-[0.75rem] text-fg-muted">01 / 02</span>
          </div>
          <h4 className="font-serif text-[1.8rem] font-light leading-[1.2]">Transient Spaces Monograph</h4>
        </Link>

        <Link
          href="/work/art/digital-liminality"
          className="featured-card hover-trigger inline-block align-top w-[480px] max-sm:w-[320px] flex-shrink-0 no-underline text-inherit"
        >
          <div className="w-full aspect-[16/10] overflow-hidden border border-white/5 mb-[20px]">
            <img src="/assets/art-1.png" alt="Digital Liminality Installation" className="w-full h-full object-cover grayscale transition-all duration-[1200ms] hover:scale-[1.05] hover:grayscale-0" />
          </div>
          <div className="flex justify-between items-baseline border-b border-border-muted pb-[12px] mb-[10px]">
            <span className="font-display text-[0.65rem] font-bold tracking-[0.1em] uppercase text-fg-secondary">ART ARCHIVE</span>
            <span className="font-sans text-[0.75rem] text-fg-muted">02 / 02</span>
          </div>
          <h4 className="font-serif text-[1.8rem] font-light leading-[1.2]">Digital Liminality (Barbican)</h4>
        </Link>
      </div>
    </section>
  );
}
