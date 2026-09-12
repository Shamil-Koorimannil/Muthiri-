"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    if (path === "/work") return pathname.startsWith("/work");
    if (path === "/writing") return pathname.startsWith("/writing");
    if (path === "/about") return pathname.startsWith("/about");
    if (path === "/contact") return pathname.startsWith("/contact");
    return pathname === path;
  };

  if (pathname.startsWith("/studio")) {
    return null;
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-[100] pointer-events-none"
        style={{ padding: "var(--site-padding-y) var(--site-padding-x)" }}
      >
        <div className="flex justify-between items-center pointer-events-auto max-w-[1400px] mx-auto">
          {/* Brand Logo Wordmark */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              scrolled || mobileOpen
                ? "opacity-0 pointer-events-none -translate-y-[10px]"
                : "opacity-100"
            }`}
          >
            <Link
              href="/"
              className="hover-trigger no-underline flex flex-col gap-0.5"
              data-cursor="magnetic"
            >
              <span className="font-display font-extrabold text-[1.05rem] tracking-[0.28em] uppercase leading-none text-fg-primary">
                Muthiri
              </span>
            </Link>
          </div>

          {/* Central Navigation Pill with Generous Horizontal & Vertical Padding */}
          <nav className="hidden md:block">
            <ul className="flex items-center justify-center gap-14 md:gap-16 px-14 py-4 md:px-16 md:py-4.5 bg-[#121212]/95 backdrop-blur-md rounded-full border border-white/15 shadow-lg">
              {[
                { href: "/work", label: "Work" },
                { href: "/writing", label: "Writing" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group hover-trigger no-underline font-sans text-[0.85rem] md:text-[0.88rem] font-medium tracking-[0.18em] uppercase transition-colors duration-300 relative py-1 ${
                      isActive(link.href)
                        ? "text-white font-semibold"
                        : "text-fg-secondary hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[1px] bg-white transition-transform duration-300 origin-right ${
                        isActive(link.href)
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100 group-hover:origin-left"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`hover-trigger bg-[#121212]/95 border border-white/20 rounded-xl flex md:hidden flex-col items-center justify-center gap-[5px] w-[42px] h-[42px] p-2.5 z-[200] shadow-lg backdrop-blur-md active:scale-95 transition-all duration-300 ${
                mobileOpen ? "active bg-black border-white/40" : "hover:border-white/40 hover:bg-black"
              }`}
              aria-label="Toggle menu"
            >
              <span
                className={`w-[20px] h-[1.5px] bg-fg-primary transition-transform duration-[400ms] ${
                  mobileOpen ? "translate-y-[3.25px] rotate-45" : ""
                }`}
                style={{ transitionTimingFunction: "var(--transition-smooth)" }}
              />
              <span
                className={`w-[20px] h-[1.5px] bg-fg-primary transition-transform duration-[400ms] ${
                  mobileOpen ? "-translate-y-[3.25px] -rotate-45" : ""
                }`}
                style={{ transitionTimingFunction: "var(--transition-smooth)" }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-[#080808]/98 backdrop-blur-xl z-[95] flex flex-col justify-between pb-[40px] pt-[90px] px-6 transition-transform duration-[600ms] md:hidden ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          transitionTimingFunction: "var(--transition-smooth)",
        }}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.tagName === "A") setMobileOpen(false);
        }}
      >
        <nav className="flex-1 flex flex-col justify-center items-center">
          <ul className="list-none flex flex-col items-center justify-center gap-[28px] text-center">
            {[
              { href: "/work", label: "Work" },
              { href: "/writing", label: "Writing" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="no-underline font-display text-[2.2rem] sm:text-[2.6rem] font-extrabold text-white hover:text-fg-secondary transition-colors duration-300 tracking-[0.08em] uppercase block text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-white/10 pt-[24px] text-center">
          <p className="font-sans text-[0.7rem] text-fg-muted tracking-[0.15em] uppercase">
            MULTIDISCIPLINARY ARCHIVE ©2026
          </p>
          <Link
            href="/contact"
            className="no-underline font-sans text-[0.8rem] text-white border-b border-white/40 pb-0.5 tracking-[0.1em] uppercase font-medium hover:border-white transition-colors"
          >
            Get in touch &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
