"use client";

import { usePathname } from "next/navigation";

export function CustomCursor() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return null;
  }

  return (
    <div id="custom-cursor">
      <div className="cursor-dot" />
      <div className="cursor-ring" />
    </div>
  );
}