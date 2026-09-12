"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="w-full bg-[#080808] border-t border-white/10 pt-16 pb-12 text-fg-secondary relative z-10"
      style={{
        paddingLeft: "var(--site-padding-x)",
        paddingRight: "var(--site-padding-x)",
      }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col gap-16">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <Link
              href="/"
              className="hover-trigger no-underline group inline-block"
            >
              <span className="font-display font-extrabold text-[1.4rem] md:text-[1.6rem] tracking-[0.28em] uppercase text-white block">
                MUTHIRI
              </span>
            </Link>
            <p className="font-sans text-[0.82rem] font-light text-fg-secondary tracking-[0.08em] leading-relaxed max-w-[360px]">
              Multidisciplinary archive, digital design practice, and architectural monographs by Noufan Muthiri.
            </p>
          </div>

          {/* Quick Navigation Links Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-fg-muted block mb-1">
              Index
            </span>
            <ul className="flex flex-col gap-2.5 list-none">
              {[
                { href: "/work", label: "Work Archive" },
                { href: "/writing", label: "Writing & Research" },
                { href: "/about", label: "About Practice" },
                { href: "/contact", label: "Contact & Inquiries" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover-trigger no-underline font-sans text-[0.85rem] font-normal tracking-[0.1em] text-fg-secondary hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Location Column */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-fg-muted block mb-1">
              Correspondence
            </span>
            <a
              href="mailto:studio@muthiri.com"
              className="hover-trigger no-underline font-sans text-[0.92rem] font-medium text-white hover:text-fg-secondary transition-colors duration-200"
            >
              studio@muthiri.com
            </a>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 font-sans text-[0.75rem] text-fg-muted tracking-[0.12em]">
          <p>© {new Date().getFullYear()} MUTHIRI. ALL RIGHTS RESERVED.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="hover-trigger flex items-center gap-2 text-fg-secondary hover:text-white uppercase transition-colors duration-300 cursor-pointer bg-transparent border-none py-1"
          >
            <span>BACK TO TOP</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
