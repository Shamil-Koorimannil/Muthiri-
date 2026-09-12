"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function useScrollReveal() {
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const options = { threshold: 0.01, rootMargin: "50px 0px 50px 0px" };

    const checkAndObserve = () => {
      const els = document.querySelectorAll<HTMLElement>(
        ".reveal-text, .fade-in, .hero-image"
      );

      if (els.length === 0) return;

      if (!observerRef.current) {
        observerRef.current = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
              observerRef.current?.unobserve(entry.target);
            }
          });
        }, options);
      }

      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      els.forEach((el) => {
        if (el.classList.contains("active")) return;

        const rect = el.getBoundingClientRect();
        // If element is inside viewport or above viewport, activate immediately
        if (rect.top <= viewportHeight + 100 && rect.bottom >= -100) {
          el.classList.add("active");
        } else {
          observerRef.current?.observe(el);
        }
      });
    };

    // Immediate check
    checkAndObserve();

    // Staggered re-checks to account for Next.js route transitions & hydration
    const timer1 = setTimeout(checkAndObserve, 50);
    const timer2 = setTimeout(checkAndObserve, 200);
    const timer3 = setTimeout(checkAndObserve, 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [pathname]);
}

