"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

type Project = {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    type: "design" | "art";
    subCategory?: string;
    coverImage?: any;
    pdfUrl?: string;
    year?: string;
};

export default function WorkArchive({
    projects,
}: {
    projects: Project[];
}) {
    const [tab, setTab] = useState<"design" | "art">("design");
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDesignClick = () => {
        if (tab !== "design") {
            setTab("design");
            setDropdownOpen(true);
        } else {
            setDropdownOpen((prev) => !prev);
        }
    };

    const handleArtClick = () => {
        setTab("art");
        setDropdownOpen(false);
    };

    const subCategories = [
        { id: "all", label: "All Design" },
        { id: "advertising", label: "Advertising" },
        { id: "branding", label: "Branding" },
        { id: "illustration", label: "Illustration" },
    ];

    const designProjects = projects.filter((p) => {
        if (p.type === "art") return false;
        if (selectedSubCategory !== "all") {
            if (!p.subCategory) return false;
            return p.subCategory.trim().toLowerCase() === selectedSubCategory.trim().toLowerCase();
        }
        return true;
    });

    const artProjects = projects.filter((p) => p.type === "art");

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
                <div className="relative flex items-center" ref={dropdownRef}>
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
                            onClick={handleDesignClick}
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
                                    ? "text-black font-medium"
                                    : "text-fg-secondary hover:text-white"
                                }
            `}
                        >
                            Design
                        </button>

                        <button
                            onClick={handleArtClick}
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
                                    ? "text-black font-medium"
                                    : "text-fg-secondary hover:text-white"
                                }
            `}
                        >
                            Art
                        </button>
                    </div>

                    {/* Dropdown Menu */}
                    {dropdownOpen && tab === "design" && (
                        <div
                            className="
                                absolute top-[calc(100%+10px)] left-0
                                w-[130px] md:w-[150px]
                                bg-[#121212]/90
                                backdrop-blur-[16px]
                                border border-white/10
                                rounded-[16px]
                                py-1 px-1.5
                                shadow-[0_20px_50px_rgba(0,0,0,0.8)]
                                z-50
                            "
                        >
                            {[
                                { id: "all", label: "All Design" },
                                { id: "advertising", label: "Advertising" },
                                { id: "branding", label: "Branding" },
                                { id: "illustration", label: "Illustration" },
                            ].map((sub, idx, arr) => (
                                <div key={sub.id}>
                                    <button
                                        onClick={() => {
                                            setSelectedSubCategory(sub.id);
                                            setDropdownOpen(false);
                                        }}
                                        className={`
                                            w-full text-center py-3 px-2
                                            font-sans text-[0.65rem] md:text-[0.7rem] uppercase tracking-[0.14em]
                                            text-fg-secondary
                                            opacity-70 hover:opacity-100 hover:text-white hover:bg-white/[0.06]
                                            transition-all duration-200
                                            rounded-[10px]
                                            ${selectedSubCategory === sub.id ? "text-white opacity-100 bg-white/[0.08] font-medium" : ""}
                                        `}
                                    >
                                        {sub.label}
                                    </button>
                                    {idx < arr.length - 1 && (
                                        <div className="h-[1px] bg-white/10 mx-2" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Design Grid */}
            <div className="max-w-[1400px] mx-auto" style={{ marginTop: "50px" }}>
                {tab === "design" ? (
                    designProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[6vw_4vw] fade-in active">
                            {designProjects.map((p, index) => {
                                const isPdf = Boolean(p.pdfUrl);
                                return (
                                    <Link
                                        key={p._id}
                                        href={`/work/design/${p.slug?.current}`}
                                        className="design-project-item hover-trigger flex flex-col no-underline text-inherit group"
                                    >
                                        <div className="w-full aspect-[16/11] overflow-hidden bg-bg-secondary border border-border-color mb-[25px] relative">
                                            <img
                                                src={urlFor(p.coverImage).width(1200).url()}
                                                alt={p.title}
                                                className="w-full h-full object-cover transition-all duration-[1400ms] group-hover:scale-[1.03]"
                                            />
                                            {isPdf && (
                                                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white font-sans text-[0.65rem] uppercase tracking-[0.15em] flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    PDF Presentation
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-[1fr_120px] gap-[20px] border-t border-border-color pt-[18px]">
                                            <div>
                                                <h3 className="font-serif text-[1.8rem] font-light mb-[4px]">
                                                    {p.title}
                                                </h3>

                                                <div className="flex items-center gap-2">
                                                    <span className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-fg-secondary">
                                                        {p.subCategory ? p.subCategory : "DESIGN"}
                                                    </span>
                                                </div>
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
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-[100px] text-center border border-white/5 rounded-2xl bg-black/20">
                            <p className="font-serif text-[1.8rem] font-light text-fg-secondary mb-4">
                                No {selectedSubCategory} projects found in the archive yet.
                            </p>
                            <button
                                onClick={() => setSelectedSubCategory("all")}
                                className="font-sans text-[0.75rem] uppercase tracking-[0.15em] text-white border-b border-white pb-1 hover:opacity-80 transition-opacity"
                            >
                                View All Design Projects
                            </button>
                        </div>
                    )
                ) : (
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
                )}
            </div>
        </section>
    );
}