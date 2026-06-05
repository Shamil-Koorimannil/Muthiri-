import Link from "next/link";
import { portfolioDB } from "@/data/portfolio";

export default function WritingPage() {
  const { dissertation, publications } = portfolioDB.writing;

  return (
    <section className="pt-[180px] pb-[100px] min-h-screen" style={{ paddingLeft: "200px", paddingRight: "6vw" }}>
      <div>
        <div className="border-b border-border-color pb-[6vh] mb-[8vh]">
          <h1 className="reveal-wrapper block overflow-hidden">
            <span className="reveal-text font-serif text-[5rem] max-sm:text-[3rem] font-light leading-[1]">
              WRITING &amp; RESEARCH
            </span>
          </h1>
        </div>

        <div className="bg-bg-secondary border border-border-color p-[50px] max-sm:p-[30px_20px] grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-[6vw] items-center mb-[10vh] fade-in">
          <div className="w-full aspect-[4/3] overflow-hidden border border-border-color">
            <img src="/assets/writing-cover.png" alt="The Architecture of Absence monograph cover" className="w-full h-full object-cover grayscale" />
          </div>
          <div className="flex flex-col gap-[20px]">
            <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-fg-secondary border border-white/20 px-[10px] py-[4px] w-fit">
              MA DISSERTATION
            </span>
            <div className="teaser-title">
              <h2 className="font-serif text-[2.2rem] font-light leading-[1.2]">
                {dissertation.title}: {dissertation.subtitle}
              </h2>
            </div>
            <p className="font-sans text-[0.95rem] text-fg-secondary">
              {dissertation.teaser}
            </p>
            <Link
              href="/writing/dissertation"
              className="hover-trigger no-underline font-sans text-[0.75rem] tracking-[0.15em] uppercase text-fg-primary border-b border-fg-primary pb-[4px] w-fit font-medium"
            >
              Read Publication
            </Link>
          </div>
        </div>

        <span className="font-sans text-[0.75rem] tracking-[0.25em] uppercase text-fg-muted border-b border-border-color pb-[15px] mb-[40px] block fade-in">
          Academic Publications &amp; Essays
        </span>

        <div className="flex flex-col fade-in">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className="grid grid-cols-[120px_1fr_180px] max-sm:grid-cols-1 gap-[30px] max-sm:gap-[10px] py-[30px] max-sm:py-[20px] border-b border-border-muted items-center transition-all duration-[400ms] hover:pl-[20px] hover:border-b-fg-muted"
            >
              <span className="font-sans text-[0.8rem] text-fg-muted">{pub.year}</span>
              <div className="flex flex-col gap-[6px]">
                <h3 className="font-serif text-[1.5rem] font-normal">{pub.title}</h3>
                <span className="font-sans text-[0.75rem] text-fg-secondary italic">{pub.journal}</span>
              </div>
              <div className="text-right max-sm:text-left font-sans text-[0.75rem] tracking-[0.1em] uppercase font-medium opacity-40 transition-opacity hover:opacity-100">
                Read Summary
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
