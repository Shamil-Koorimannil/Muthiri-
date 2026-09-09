"use client";

import { usePathname } from "next/navigation";

export function NoiseOverlay() {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  return <div className="noise-overlay" />;
}
