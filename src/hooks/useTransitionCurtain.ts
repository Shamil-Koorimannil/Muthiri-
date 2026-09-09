"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function useTransitionCurtain() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const isStudio = pathname?.startsWith("/studio");

  const [curtainState, setCurtainState] = useState<"enter" | "active" | "exit" | "hidden">(
    isStudio ? "hidden" : "enter"
  );
  const [isVisible, setIsVisible] = useState(!isStudio);

  useEffect(() => {
    if (isStudio) {
      setIsVisible(false);
      setCurtainState("hidden");
      return;
    }

    if (curtainState === "enter") {
      requestAnimationFrame(() => {
        setCurtainState("active");
        setTimeout(() => {
          setCurtainState("exit");
          setTimeout(() => {
            setCurtainState("hidden");
            setIsVisible(false);
          }, 1000);
        }, 600);
      });
    }
  }, [curtainState, isStudio]);

  useEffect(() => {
    if (isStudio) {
      setIsVisible(false);
      setCurtainState("hidden");
      return;
    }

    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      setIsVisible(true);
      setCurtainState("enter");
    }
  }, [pathname, isStudio]);

  if (isStudio) {
    return { isVisible: false, curtainState: "hidden" as const };
  }

  return { isVisible, curtainState };
}
