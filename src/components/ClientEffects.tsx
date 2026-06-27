"use client";

import { useCursor } from "@/hooks/useCursor";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ClientEffects() {
  const pathname = usePathname();

  const isStudio = pathname.startsWith("/studio");

  // Only run portfolio effects outside Studio
  if (!isStudio) {
    useCursor();
    useScrollReveal();
  }

  useEffect(() => {
    if (isStudio) {
      document.body.classList.add("studio-mode");
    } else {
      document.body.classList.remove("studio-mode");
    }
  }, [isStudio]);

  useEffect(() => {
    if (isStudio) return;

    const handleFormSubmit = (e: Event) => {
      e.preventDefault();

      const form = e.target as HTMLFormElement;
      const btn = form.querySelector(
        ".submit-btn"
      ) as HTMLButtonElement | null;
      const feedback = form.querySelector(
        ".form-feedback"
      ) as HTMLElement | null;

      if (!btn || !feedback) return;

      const oldText = btn.textContent;

      btn.disabled = true;
      btn.textContent = "TRANSMITTING...";

      setTimeout(() => {
        btn.textContent = "SUCCESSFULLY SENT";
        feedback.textContent =
          "Message sent. We will respond within 48 hours.";
        feedback.classList.add("active");
        form.reset();

        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = oldText;
          feedback.classList.remove("active");
        }, 5000);
      }, 1500);
    };

    const form = document.querySelector(".contact-form");

    form?.addEventListener("submit", handleFormSubmit);

    return () => {
      form?.removeEventListener("submit", handleFormSubmit);
    };
  }, [pathname, isStudio]);

  useEffect(() => {
    if (isStudio) return;

    const copyBtn = document.getElementById("copy-cite");

    const docCitation =
      "Muthiri, N. (2026). Visual Communication & Creative Direction. Kerala: Muthiri Creative Consultancy.";

    const handleCopy = () => {
      navigator.clipboard.writeText(docCitation);

      if (copyBtn) {
        copyBtn.textContent = "COPIED TO CLIPBOARD";

        setTimeout(() => {
          copyBtn.textContent = "COPY CITATION (APA)";
        }, 3000);
      }
    };

    copyBtn?.addEventListener("click", handleCopy);

    return () => {
      copyBtn?.removeEventListener("click", handleCopy);
    };
  }, [pathname, isStudio]);

  return null;
}