"use client";

import { useEffect, useRef } from "react";

export function useCursor() {
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = document.querySelector(".cursor-dot") as HTMLElement | null;
    const ring = document.querySelector(".cursor-ring") as HTMLElement | null;

    if (!dot || !ring) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    const speed = 0.12;

    const handleMouse = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    const animate = () => {
      x += (targetX - x) * speed;
      y += (targetY - y) * speed;

      dot!.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      ring!.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement).closest(".hover-trigger, a, button");
      if (trigger) {
        document.body.classList.add("cursor-hover");
        if (
          trigger.classList.contains("featured-card") ||
          trigger.classList.contains("design-project-item") ||
          trigger.classList.contains("art-project-item")
        ) {
          document.body.classList.add("cursor-view-project");
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement).closest(".hover-trigger, a, button");
      if (trigger) {
        document.body.classList.remove("cursor-hover", "cursor-view-project");
      }
    };

    window.addEventListener("mousemove", handleMouse);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
}
