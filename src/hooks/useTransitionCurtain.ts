"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function useTransitionCurtain() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const [curtainState, setCurtainState] = useState<"enter" | "active" | "exit" | "hidden">("enter");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
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
  }, [curtainState]);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      setIsVisible(true);
      setCurtainState("enter");
    }
  }, [pathname]);

  return { isVisible, curtainState };
}
