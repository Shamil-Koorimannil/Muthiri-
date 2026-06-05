"use client";

import { useEffect } from "react";

export function useParallax() {
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const heroImage = document.querySelector(".hero-image") as HTMLElement | null;
      if (!heroImage) return;
      const xOffset = (window.innerWidth / 2 - e.clientX) * 0.03;
      const yOffset = (window.innerHeight / 2 - e.clientY) * 0.03;
      heroImage.style.transform = `scale(1.1) translate(${xOffset}px, ${yOffset}px)`;
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);
}
