import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-[var(--site-padding-x)] pt-[120px] pb-[80px]">
      <span className="font-sans text-[0.75rem] tracking-[0.3em] uppercase text-fg-muted block mb-4">
        Error 404
      </span>
      <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light text-fg-primary leading-[1.1] mb-6">
        This page could not be found.
      </h1>
      <p className="text-fg-secondary max-w-[500px] text-[1.05rem] font-light leading-relaxed mb-8">
        The archive entry or route you requested does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="hover-trigger no-underline font-sans text-[0.85rem] tracking-[0.15em] uppercase text-fg-primary inline-flex items-center gap-[15px] border-b border-fg-primary pb-[6px] font-medium transition-all duration-[400ms] hover:gap-[25px]"
      >
        <span>Return to Home</span>
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 6H22M22 6L17 1M22 6L17 11" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </Link>
    </section>
  );
}
