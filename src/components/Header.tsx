"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSound } from "@/hooks/useSound";
import { useCallback, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const { toggleSound, isPlayingRef } = useSound();
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSound = useCallback(() => {
    const result = toggleSound();
    if (result !== undefined) {
      setIsPlaying(result);
    }
  }, [toggleSound]);

  const isActive = (path: string) => {
    if (path === "/work") return pathname.startsWith("/work");
    if (path === "/writing") return pathname.startsWith("/writing");
    if (path === "/about") return pathname.startsWith("/about");
    if (path === "/contact") return pathname.startsWith("/contact");
    return pathname === path;
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-100 pointer-events-none"
        style={{ padding: "var(--site-padding-y) var(--site-padding-x)" }}
      >
        <div className="flex justify-between items-center pointer-events-auto">
          <div className="header-logo">
            <Link href="/" className="hover-trigger no-underline text-fg-primary flex flex-col" data-cursor="magnetic">
              <span className="font-display font-extrabold text-[1.1rem] tracking-[0.18em] leading-[1.1]">
                MUTHIRI
              </span>
              <span
                className="font-sans font-normal text-[0.6rem] tracking-[0.4em] text-fg-secondary mt-[2px]"
              >
                ARCHIVE
              </span>
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul
              className="flex list-none gap-[3.5vw] bg-black/40 backdrop-blur-[12px] px-[30px] py-[12px] rounded-[30px] border border-white/5"
            >
              {[
                { href: "/work", label: "Work" },
                { href: "/writing", label: "Writing" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group hover-trigger no-underline font-sans text-[0.8rem] font-normal tracking-[0.12em] uppercase text-fg-secondary transition-colors duration-300 relative py-[4px] ${
                      isActive(link.href) ? "text-fg-primary" : "hover:text-fg-primary"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[1px] bg-fg-primary transition-transform duration-[400ms] origin-right ${
                        isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-hover:origin-left"
                      }`}
                      style={{ transitionTimingFunction: "var(--transition-smooth)" }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-[20px]">
            <button
              onClick={handleSound}
              className={`hover-trigger bg-transparent border-none text-fg-secondary flex items-center gap-[8px] px-[12px] py-[6px] rounded-[40px] border border-white/5 bg-black/40 backdrop-blur-[12px] transition-all duration-300 hover:text-fg-primary hover:border-white/20 ${
                isPlaying ? "sound-playing" : ""
              }`}
              aria-label="Toggle exhibition hum"
              data-cursor="magnetic"
            >
              <span className="sound-wave">
                <span className="bar" />
                <span className="bar" />
                <span className="bar" />
              </span>
              <span className="font-sans text-[0.65rem] tracking-[0.15em] font-medium hidden sm:inline">
                {isPlaying ? "SOUND ON" : "SOUND OFF"}
              </span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`hover-trigger bg-transparent border-none flex md:hidden flex-col justify-center gap-[6px] w-[36px] h-[36px] p-[6px] z-[200] ${
                mobileOpen ? "active" : ""
              }`}
              aria-label="Toggle menu"
            >
              <span
                className={`w-[24px] h-[1px] bg-fg-primary transition-transform duration-[400ms] ${
                  mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
                style={{ transitionTimingFunction: "var(--transition-smooth)" }}
              />
              <span
                className={`w-[24px] h-[1px] bg-fg-primary transition-transform duration-[400ms] ${
                  mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
                style={{ transitionTimingFunction: "var(--transition-smooth)" }}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-[#0b0b0b] z-[95] flex flex-col justify-between pb-[50px] pt-[120px] transition-transform duration-[600ms] md:hidden ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ paddingLeft: "var(--site-padding-x)", paddingRight: "var(--site-padding-x)", transitionTimingFunction: "var(--transition-smooth)" }}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.tagName === "A") setMobileOpen(false);
        }}
      >
        <nav>
          <ul className="list-none flex flex-col gap-[30px]">
            {[
              { href: "/work", label: "Work" },
              { href: "/writing", label: "Writing" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="no-underline font-display text-[2.2rem] font-extrabold text-fg-primary tracking-[-0.01em] leading-[1.1] block"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex justify-between items-center border-t border-border-color pt-[30px]">
          <p className="font-sans text-[0.65rem] text-fg-secondary tracking-[0.1em]">
            MULTIDISCIPLINARY ARCHIVE ©2026
          </p>
          <Link href="/contact" className="no-underline font-sans text-[0.75rem] text-fg-primary border-b border-fg-primary">
            Get in touch
          </Link>
        </div>
      </div>
    </>
  );
}
