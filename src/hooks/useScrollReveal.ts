"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function useScrollReveal() {
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const options = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, options);

    const els = document.querySelectorAll<HTMLElement>(".reveal-text, .fade-in, .hero-image");
    els.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [pathname]);
}
