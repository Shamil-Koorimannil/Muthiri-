"use client";

import { useEffect } from "react";
import { portfolioDB } from "@/data/portfolio";

export default function ContactPage() {
  const { email, location, representedBy } = portfolioDB.contact;
  useEffect(() => {
    const form = document.querySelector(".contact-form") as HTMLFormElement | null;
    const handleSubmit = (e: Event) => {
      e.preventDefault();
      const btn = form?.querySelector(".submit-btn") as HTMLButtonElement | null;
      const feedback = form?.querySelector(".form-feedback") as HTMLElement | null;
      if (!btn || !feedback || !form) return;

      const oldText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "TRANSMITTING...";

      setTimeout(() => {
        btn.textContent = "SUCCESSFULLY SENT";
        feedback.textContent = "Message sent. We will respond within 48 hours.";
        feedback.classList.add("active");
        form.reset();

        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = oldText;
          feedback.classList.remove("active");
        }, 5000);
      }, 1500);
    };

    form?.addEventListener("submit", handleSubmit);
    return () => form?.removeEventListener("submit", handleSubmit);
  }, []);

  return (
    <section className="pt-[180px] pb-[100px] min-h-screen flex flex-col justify-center" style={{ paddingLeft: "var(--site-padding-x)", paddingRight: "var(--site-padding-x)" }}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-[8vw]">
        <div className="flex flex-col justify-between fade-in">
          <div>
            <h1 className="font-serif text-[4.5rem] max-sm:text-[3rem] font-light leading-[1.05] mb-[30px]">
              Let&apos;s build a space together.
            </h1>
          </div>
          <div className="flex flex-col gap-[40px]">
            <div>
              <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-fg-muted block mb-[8px]">
                ELECTRONIC CORRESPONDENCE
              </span>
              <a
                href={`mailto:${email}`}
                className="hover-trigger font-serif text-[1.8rem] max-sm:text-[1.3rem] text-fg-primary no-underline transition-colors hover:text-fg-secondary"
              >
                {email}
              </a>
            </div>
            <div>
              <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-fg-muted block mb-[8px]">
                LOCATION
              </span>
              <span className="font-serif text-[1.8rem] max-sm:text-[1.3rem] text-fg-primary">
                {location}
              </span>
            </div>
            <div>
              <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-fg-muted block mb-[8px]">
                REPRESENTED BY
              </span>
              <span className="font-serif text-[1.8rem] max-sm:text-[1.3rem] text-fg-primary">
                {representedBy}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-bg-secondary border border-border-color p-[50px] max-sm:p-[30px_20px] fade-in">
          <form className="contact-form flex flex-col gap-[40px]">
            <div className="flex flex-col relative">
              <input
                type="text"
                id="form-name"
                className="peer hover-trigger bg-transparent border-none border-b border-border-color text-fg-primary font-sans text-[1rem] py-[10px] outline-none transition-colors duration-[400ms] focus:border-b-fg-primary"
                placeholder=" "
                required
                autoComplete="off"
              />
              <label
                htmlFor="form-name"
                className="absolute top-[10px] left-0 font-sans text-[0.9rem] text-fg-secondary pointer-events-none transition-all duration-[400ms] peer-focus:-translate-y-[25px] peer-focus:text-[0.65rem] peer-focus:text-fg-muted peer-focus:tracking-[0.1em] peer-focus:uppercase peer-[:not(:placeholder-shown)]:-translate-y-[25px] peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:text-fg-muted peer-[:not(:placeholder-shown)]:tracking-[0.1em] peer-[:not(:placeholder-shown)]:uppercase"
                style={{ transitionTimingFunction: "var(--transition-smooth)" }}
              >
                YOUR NAME
              </label>
            </div>
            <div className="flex flex-col relative">
              <input
                type="email"
                id="form-email"
                className="peer hover-trigger bg-transparent border-none border-b border-border-color text-fg-primary font-sans text-[1rem] py-[10px] outline-none transition-colors duration-[400ms] focus:border-b-fg-primary"
                placeholder=" "
                required
                autoComplete="off"
              />
              <label
                htmlFor="form-email"
                className="absolute top-[10px] left-0 font-sans text-[0.9rem] text-fg-secondary pointer-events-none transition-all duration-[400ms] peer-focus:-translate-y-[25px] peer-focus:text-[0.65rem] peer-focus:text-fg-muted peer-focus:tracking-[0.1em] peer-focus:uppercase peer-[:not(:placeholder-shown)]:-translate-y-[25px] peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:text-fg-muted peer-[:not(:placeholder-shown)]:tracking-[0.1em] peer-[:not(:placeholder-shown)]:uppercase"
                style={{ transitionTimingFunction: "var(--transition-smooth)" }}
              >
                EMAIL ADDRESS
              </label>
            </div>
            <div className="flex flex-col relative">
              <textarea
                id="form-message"
                className="peer hover-trigger bg-transparent border-none border-b border-border-color text-fg-primary font-sans text-[1rem] py-[10px] outline-none transition-colors duration-[400ms] focus:border-b-fg-primary resize-none"
                rows={4}
                placeholder=" "
                required
              />
              <label
                htmlFor="form-message"
                className="absolute top-[10px] left-0 font-sans text-[0.9rem] text-fg-secondary pointer-events-none transition-all duration-[400ms] peer-focus:-translate-y-[25px] peer-focus:text-[0.65rem] peer-focus:text-fg-muted peer-focus:tracking-[0.1em] peer-focus:uppercase peer-[:not(:placeholder-shown)]:-translate-y-[25px] peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:text-fg-muted peer-[:not(:placeholder-shown)]:tracking-[0.1em] peer-[:not(:placeholder-shown)]:uppercase"
                style={{ transitionTimingFunction: "var(--transition-smooth)" }}
              >
                INQUIRY / CO-LAB PROPOSAL
              </label>
            </div>

            <button
              type="submit"
              className="submit-btn hover-trigger bg-transparent border border-border-color text-fg-primary px-[32px] py-[16px] font-sans text-[0.8rem] tracking-[0.15em] uppercase font-medium self-start transition-all duration-[400ms] hover:bg-fg-primary hover:text-bg-primary hover:border-fg-primary"
              style={{ transitionTimingFunction: "var(--transition-smooth)" }}
            >
              Transmit message
            </button>
            <div className="form-feedback mt-[15px] font-sans text-[0.8rem] text-[#39e782] opacity-0 transition-opacity duration-[400ms] [&.active]:opacity-100" />
          </form>
        </div>
      </div>
    </section>
  );
}
