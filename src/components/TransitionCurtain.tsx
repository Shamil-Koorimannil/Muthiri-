"use client";

import { useTransitionCurtain } from "@/hooks/useTransitionCurtain";

export function TransitionCurtain() {
  const { isVisible, curtainState } = useTransitionCurtain();

  if (!isVisible) return null;

  return (
    <div
      className={`transition-curtain fixed inset-0 z-[999] pointer-events-none flex items-center justify-center ${
        curtainState === "active" || curtainState === "enter" ? "curtain active" : curtainState === "exit" ? "curtain exit" : ""
      }`}
    >
      <div className="curtain-panel" />
      <div className="curtain-logo">MUTHIRI</div>
    </div>
  );
}
