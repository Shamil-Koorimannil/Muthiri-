"use client";

import { portfolioDB } from "@/data/portfolio";
import { useEffect } from "react";

export default function DissertationPage() {
  const doc = portfolioDB.writing.dissertation;

  useEffect(() => {
    const copyBtn = document.getElementById("copy-cite");
    const handleCopy = () => {
      navigator.clipboard.writeText(doc.citation);
      if (copyBtn) {
        copyBtn.textContent = "COPIED TO CLIPBOARD";
        setTimeout(() => {
          copyBtn.textContent = "COPY CITATION (APA)";
        }, 3000);
      }
    };
    copyBtn?.addEventListener("click", handleCopy);
    return () => copyBtn?.removeEventListener("click", handleCopy);
  }, [doc.citation]);

  return (
    <section className="pt-[150px] min-h-screen bg-[#0c0c0c]">
      <div className="pb-[15vh] grid grid-cols-1 md:grid-cols-[300px_1fr] gap-[6vw]" style={{ paddingLeft: "var(--site-padding-x)", paddingRight: "var(--site-padding-x)" }}>
        <aside className="md:sticky md:top-[150px] h-fit fade-in">
          <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-fg-muted block mb-[25px]">
            Dissertation Chapters
          </span>
          <ul className="list-none flex flex-col max-md:flex-row max-md:flex-wrap max-md:gap-[10px_20px] gap-[15px] border-l max-md:border-l-0 max-md:border-b border-border-color pl-[20px] max-md:pl-0 max-md:pb-[20px]">
            {doc.chapters.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="hover-trigger no-underline font-sans text-[0.75rem] text-fg-secondary block transition-colors hover:text-fg-primary"
                >
                  {c.num} &mdash; {c.title.split(":")[0]}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="dissertation-reader max-w-[750px] fade-in">
          <div className="border-b border-border-color pb-[40px] mb-[50px]">
            <span className="font-sans text-[0.7rem] tracking-[0.05em] text-fg-secondary bg-white/3 px-[12px] py-[6px] rounded inline-block mb-[20px]">
              {doc.citation}
            </span>
            <h1 className="font-serif text-[3.5rem] max-sm:text-[2.2rem] font-light leading-[1.1] mb-[15px]">
              {doc.title}
            </h1>
            <h2 className="font-serif text-[1.5rem] italic font-light text-fg-secondary mb-[25px]">
              {doc.subtitle}
            </h2>
            <div className="font-sans text-[0.8rem] text-fg-muted">
              Published by {doc.author} // Royal College of Art
            </div>
          </div>

          <article className="journal-content font-serif text-[1.25rem] max-sm:text-[1.1rem] leading-[1.8] text-fg-primary">
            {doc.chapters.map((c) => (
              <section key={c.id} id={c.id} className="mb-[80px]">
                <h3 className="font-display text-[1.4rem] font-bold tracking-[-0.01em] uppercase mt-[50px] mb-[25px]">
                  {c.num}: {c.title}
                </h3>
                <div
                  className="[&_p]:mb-[30px] [&_blockquote]:border-l-2 [&_blockquote]:border-fg-muted [&_blockquote]:pl-[30px] [&_blockquote]:my-[40px] [&_blockquote]:italic [&_blockquote]:text-fg-secondary [&_.citation-ref]:align-super [&_.citation-ref]:text-[0.7rem] [&_.citation-ref]:font-semibold [&_.citation-ref]:text-accent [&_.citation-ref]:no-underline [&_.citation-ref]:px-[2px]"
                  dangerouslySetInnerHTML={{ __html: c.content }}
                />
              </section>
            ))}

            <hr className="border-0 border-t border-border-color w-[100px] my-[80px_30px]" />

            <ul className="list-none font-sans text-[0.8rem] text-fg-secondary flex flex-col gap-[15px] pb-[50px]">
              {doc.footnotes.map((f) => (
                <li key={f.id} id={f.id} className="footnote-item">
                  {f.label}{" "}
                  <a href={`#${f.refId}`} className="hover-trigger text-fg-muted no-underline ml-[4px]">
                    ↩
                  </a>
                </li>
              ))}
            </ul>

            <div className="bg-bg-secondary border border-border-color p-[30px] mt-[60px] flex flex-col gap-[15px]">
              <span className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-fg-muted">Academic Reference</span>
              <p className="font-serif text-[1rem] text-fg-secondary italic">
                &ldquo;{doc.citation}&rdquo;
              </p>
              <button
                className="hover-trigger bg-transparent border border-fg-secondary text-fg-primary px-[16px] py-[8px] font-sans text-[0.7rem] tracking-[0.1em] uppercase self-start transition-all hover:bg-fg-primary hover:text-bg-primary hover:border-fg-primary"
                id="copy-cite"
              >
                Copy Citation (APA)
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
