"use client";

import { useState } from "react";
import Link from "next/link";
import { portfolioDB } from "@/data/portfolio";

export default function WorkPage() {
  const [tab, setTab] = useState<"design" | "art">("design");

  return (
    <section className="pt-[180px] pb-[100px] px-[6vw] min-h-screen">

      {/* Tab toggle — fixed under the SOUND OFF button in the top-right */}
      <div
        className="fixed z-[150] flex bg-black/40 backdrop-blur-[12px] border border-border-color p-[6px] rounded-[40px]"
        style={{ top: "88px", right: "6vw" }}
      >
        <button
          onClick={() => setTab("design")}
          className={`hover-trigger bg-transparent border-none font-sans text-[0.75rem] font-medium uppercase tracking-[0.1em] px-[24px] py-[10px] rounded-[30px] transition-all duration-[400ms] ${
            tab === "design" ? "bg-fg-primary text-bg-primary" : "text-fg-secondary"
          }`}
        >
          Design
        </button>
        <button
          onClick={() => setTab("art")}
          className={`hover-trigger bg-transparent border-none font-sans text-[0.75rem] font-medium uppercase tracking-[0.1em] px-[24px] py-[10px] rounded-[30px] transition-all duration-[400ms] ${
            tab === "art" ? "bg-fg-primary text-bg-primary" : "text-fg-secondary"
          }`}
        >
          Art
        </button>
      </div>

      {/* Page title */}
      <div className="mb-[8vh]">
        <h1 className="reveal-wrapper block overflow-hidden">
          <span className="reveal-text font-serif text-[5rem] max-sm:text-[3rem] font-light leading-[0.95] tracking-[-0.02em]">
            WORK ARCHIVE
          </span>
        </h1>
      </div>

      {/* Project grid */}
      <div className="px-[10vw]">
        {tab === "design" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[6vw_4vw] fade-in active">
            {portfolioDB.design.map((p) => (
              <Link
                key={p.id}
                href={`/work/design/${p.id}`}
                className="design-project-item hover-trigger flex flex-col no-underline text-inherit"
              >
                <div className="w-full aspect-[16/9] overflow-hidden bg-bg-secondary border border-border-color mb-[25px]">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover grayscale transition-all duration-[1400ms] hover:scale-[1.03] hover:grayscale-0"
                  />
                </div>
                <div className="grid grid-cols-[1fr_120px] gap-[20px] border-t border-border-color pt-[18px]">
                  <div>
                    <h3 className="font-serif text-[1.8rem] font-light mb-[4px]">{p.title}</h3>
                    <span className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-fg-secondary">{p.type}</span>
                  </div>
                  <div className="text-right font-sans text-[0.75rem]">
                    <span className="font-display font-bold text-fg-muted block">{p.num}</span>
                    <span className="text-fg-secondary">{p.year}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-[15vh_2vw] items-center pb-[10vh]">
            {portfolioDB.art.map((p, i) => (
              <Link
                key={p.id}
                href={`/work/art/${p.id}`}
                className={`art-project-item hover-trigger flex flex-col no-underline text-inherit ${
                  i % 2 === 0 ? "col-span-12 md:col-start-2 md:col-span-5" : "col-span-12 md:col-start-7 md:col-span-5 md:mt-[10vh]"
                }`}
              >
                <div className="w-full aspect-[4/5] overflow-hidden bg-bg-secondary border border-border-color mb-[30px]">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover grayscale brightness-90 transition-all duration-[2000ms] hover:scale-[1.06] hover:grayscale-0 hover:brightness-100"
                  />
                </div>
                <div className="self-start max-w-[320px]">
                  <h3 className="font-serif text-[2.2rem] font-light italic leading-[1.1] mb-[8px]">{p.title}</h3>
                  <span className="font-sans text-[0.75rem] text-fg-secondary tracking-[0.05em] uppercase">{p.medium}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
