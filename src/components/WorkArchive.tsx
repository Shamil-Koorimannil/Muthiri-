"use client";

import { useState } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

type Project = {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    type: "design" | "art";
    coverImage?: any;
    year?: string;
};

export default function WorkArchive({
    projects,
}: {
    projects: Project[];
}) {
    const [tab, setTab] = useState<"design" | "art">("design");

    const designProjects = projects.filter(
        (p) => p.type === "design"
    );

    const artProjects = projects.filter(
        (p) => p.type === "art"
    );

    return (
        <section
            className="pt-[180px] pb-[100px] min-h-screen"
            style={{
                paddingLeft: "var(--site-padding-x)",
                paddingRight: "var(--site-padding-x)",
            }}
        >
            <div className="max-w-[1400px] mx-auto mb-[90px]">
                <h1 className="reveal-wrapper block overflow-hidden">
                    <span className="reveal-text font-serif text-[5rem] max-sm:text-[3rem] font-light leading-[0.95] tracking-[-0.02em]">
                        WORK ARCHIVE
                    </span>
                </h1>
            </div>

            {/* Toggle */}
            <div className="max-w-[1400px] mx-auto flex justify-end mb-[60px] md:mb-[120px]" style={{ marginTop: "40px" }}>
                <div className="relative flex items-center archive-toggle">

                    <div
                        className={`
              absolute
              top-[4px]
              h-[34px]
              w-[80px]
              md:h-[42px]
              md:w-[120px]
              rounded-full
              bg-white
              transition-all
              duration-500
              ease-[cubic-bezier(0.76,0,0.24,1)]
              ${tab === "design" ? "left-[4px]" : "left-[84px] md:left-[124px]"}
            `}
                    />

                    <button
                        onClick={() => setTab("design")}
                        className={`
              relative z-10
              w-[80px]
              h-[34px]
              md:w-[120px]
              md:h-[42px]
              font-sans
              text-[0.65rem]
              md:text-[0.75rem]
              uppercase
              tracking-[0.12em]
              md:tracking-[0.14em]
              transition-colors
              duration-300
              ${tab === "design"
                                ? "text-black"
                                : "text-fg-secondary hover:text-white"
                            }
            `}
                    >
                        Design
                    </button>

                    <button
                        onClick={() => setTab("art")}
                        className={`
              relative z-10
              w-[80px]
              h-[34px]
              md:w-[120px]
              md:h-[42px]
              font-sans
              text-[0.65rem]
              md:text-[0.75rem]
              uppercase
              tracking-[0.12em]
              md:tracking-[0.14em]
              transition-colors
              duration-300
              ${tab === "art"
                                ? "text-black"
                                : "text-fg-secondary hover:text-white"
                            }
            `}
                    >
                        Art
                    </button>
                </div>
            </div>

            {/* Design Grid */}
            <div className="max-w-[1400px] mx-auto" style={{ marginTop: "50px" }}>
                {tab === "design" ? (
                    designProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[6vw_4vw] fade-in active">
                            {designProjects.map((p, index) => (
                                <Link
                                    key={p._id}
                                    href={`/work/design/${p.slug.current}`}
                                    className="design-project-item hover-trigger flex flex-col no-underline text-inherit"
                                >
                                    <div className="w-full aspect-[16/11] overflow-hidden bg-bg-secondary border border-border-color mb-[25px]">
                                        <img
                                            src={urlFor(p.coverImage).width(1200).url()}
                                            alt={p.title}
                                            className="w-full h-full object-cover transition-all duration-[1400ms] hover:scale-[1.03]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-[1fr_120px] gap-[20px] border-t border-border-color pt-[18px]">
                                        <div>
                                            <h3 className="font-serif text-[1.8rem] font-light mb-[4px]">
                                                {p.title}
                                            </h3>

                                            <span className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-fg-secondary">
                                                DESIGN
                                            </span>
                                        </div>

                                        <div className="text-right font-sans text-[0.75rem]">
                                            <span className="font-display font-bold text-fg-muted block">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>

                                            <span className="text-fg-secondary">
                                                {p.year}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="fade-in active py-[12vh] border border-dashed border-white/10 flex items-center justify-center rounded-[8px]">
                            <p className="font-sans text-[0.9rem] tracking-[0.15em] text-fg-secondary uppercase">
                                Design archive is currently being updated.
                            </p>
                        </div>
                    )
                ) : (
                    artProjects.length > 0 ? (
                        <div className="grid grid-cols-12 gap-[15vh_2vw] items-center pb-[10vh]">
                            {artProjects.map((p, i) => (
                                <Link
                                    key={p._id}
                                    href={`/work/art/${p.slug.current}`}
                                    className={`art-project-item hover-trigger flex flex-col no-underline text-inherit ${i % 2 === 0
                                        ? "col-span-12 md:col-start-2 md:col-span-5"
                                        : "col-span-12 md:col-start-7 md:col-span-5 md:mt-[10vh]"
                                        }`}
                                >
                                    <div className="w-full aspect-[4/5] overflow-hidden bg-bg-secondary border border-border-color mb-[30px]">
                                        <img
                                            src={urlFor(p.coverImage).width(1200).url()}
                                            alt={p.title}
                                            className="w-full h-full object-cover transition-all duration-[2000ms] hover:scale-[1.06]"
                                        />
                                    </div>

                                    <div className="self-start max-w-[320px]">
                                        <h3 className="font-serif text-[2.2rem] font-light italic leading-[1.1] mb-[8px]">
                                            {p.title}
                                        </h3>

                                        <span className="font-sans text-[0.75rem] text-fg-secondary tracking-[0.05em] uppercase">
                                            ART
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="fade-in active py-[12vh] border border-dashed border-white/10 flex items-center justify-center rounded-[8px] pb-[10vh]">
                            <p className="font-sans text-[0.9rem] tracking-[0.15em] text-fg-secondary uppercase">
                                Art archive is currently being updated.
                            </p>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}