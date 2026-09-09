"use client";

import { useState, useRef, useEffect, useMemo } from "react";
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
  illustrations = [],
}: {
  projects: Project[];
  illustrations?: string[];
}) {
  const [tab, setTab] = useState<"all" | "design" | "art">("design");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown or lightbox on click outside / Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        setLightboxImg(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Dynamically collect subcategories from Sanity projects
  const availableSubCategories = useMemo(() => {
    const defaultSubs = [
      { id: "all", label: "All Design" },
      { id: "branding", label: "Branding" },
      { id: "advertising", label: "Advertising" },
      { id: "illustration", label: "Illustration" },
    ];

    const extraSubs = new Set<string>();
    projects.forEach((p) => {
      if (p.type === "design" && p.subCategory) {
        const cleaned = p.subCategory.trim().toLowerCase();
        if (!defaultSubs.some((s) => s.id === cleaned)) {
          extraSubs.add(cleaned);
        }
      }
    });

    const extraFormatted = Array.from(extraSubs).map((sub) => ({
      id: sub,
      label: sub.charAt(0).toUpperCase() + sub.slice(1),
    }));

    return [...defaultSubs, ...extraFormatted];
  }, [projects]);

  // Filter Sanity projects based on main tab and subCategory dropdown
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Main tab filter
      if (tab === "design" && p.type !== "design") return false;
      if (tab === "art" && p.type !== "art") return false;

      // If Illustration is explicitly selected, do not show Sanity Branding/Advertising projects
      if (selectedSubCategory === "illustration") {
        return false;
      }

      // Secondary Design subcategory filter
      if ((tab === "design" || tab === "all") && selectedSubCategory !== "all") {
        if (p.type === "design") {
          if (!p.subCategory) return false;
          return (
            p.subCategory.trim().toLowerCase() ===
            selectedSubCategory.trim().toLowerCase()
          );
        }
      }

      return true;
    });
  }, [projects, tab, selectedSubCategory]);

  const activeSubCategoryLabel = useMemo(() => {
    const found = availableSubCategories.find(
      (s) => s.id === selectedSubCategory
    );
    return found ? found.label : "All Design";
  }, [availableSubCategories, selectedSubCategory]);

  const showIllustrations =
    (tab === "design" || tab === "all") &&
    (selectedSubCategory === "illustration" || selectedSubCategory === "all") &&
    illustrations.length > 0;

  return (
    <section
      className="pt-[180px] pb-[100px] min-h-screen"
      style={{
        paddingLeft: "var(--site-padding-x)",
        paddingRight: "var(--site-padding-x)",
      }}
    >
      {/* Title */}
      <div className="max-w-[1400px] mx-auto mb-[70px]">
        <h1 className="reveal-wrapper block overflow-hidden">
          <span className="reveal-text font-sans text-[clamp(3.5rem,6vw,6rem)] font-light leading-[0.95] tracking-[-0.03em] uppercase">
            WORK ARCHIVE
          </span>
        </h1>
      </div>

      {/* Filter Controls Bar */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-[60px] md:mb-[90px]">
        {/* Left: Main Category Toggles (ALL | DESIGN | ART) */}
        <div className="relative flex items-center archive-toggle">
          <div
            className={`
              absolute
              top-[4px]
              h-[34px]
              w-[70px]
              md:h-[42px]
              md:w-[100px]
              rounded-full
              bg-white
              transition-all
              duration-500
              ease-[cubic-bezier(0.76,0,0.24,1)]
              ${
                tab === "all"
                  ? "left-[4px]"
                  : tab === "design"
                  ? "left-[74px] md:left-[104px]"
                  : "left-[144px] md:left-[204px]"
              }
            `}
          />

          <button
            onClick={() => {
              setTab("all");
              setDropdownOpen(false);
            }}
            className={`
              relative z-10
              w-[70px]
              h-[34px]
              md:w-[100px]
              md:h-[42px]
              font-sans
              text-[0.65rem]
              md:text-[0.75rem]
              uppercase
              tracking-[0.14em]
              transition-colors
              duration-300
              ${
                tab === "all"
                  ? "text-black font-semibold"
                  : "text-fg-secondary hover:text-white"
              }
            `}
          >
            All
          </button>

          <button
            onClick={() => {
              setTab("design");
            }}
            className={`
              relative z-10
              w-[70px]
              h-[34px]
              md:w-[100px]
              md:h-[42px]
              font-sans
              text-[0.65rem]
              md:text-[0.75rem]
              uppercase
              tracking-[0.14em]
              transition-colors
              duration-300
              ${
                tab === "design"
                  ? "text-black font-semibold"
                  : "text-fg-secondary hover:text-white"
              }
            `}
          >
            Design
          </button>

          <button
            onClick={() => {
              setTab("art");
              setDropdownOpen(false);
            }}
            className={`
              relative z-10
              w-[70px]
              h-[34px]
              md:w-[100px]
              md:h-[42px]
              font-sans
              text-[0.65rem]
              md:text-[0.75rem]
              uppercase
              tracking-[0.14em]
              transition-colors
              duration-300
              ${
                tab === "art"
                  ? "text-black font-semibold"
                  : "text-fg-secondary hover:text-white"
              }
            `}
          >
            Art
          </button>
        </div>

        {/* Right: Independent Design Subcategory Dropdown (Visible for Design & All) */}
        {(tab === "design" || tab === "all") && (
          <div className="relative w-full md:w-auto" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              className="
                w-full md:w-[200px]
                h-[42px]
                px-5
                bg-[#141414]/90
                backdrop-blur-[16px]
                border border-white/15
                hover:border-white/30
                rounded-full
                flex items-center justify-between
                gap-3
                font-sans text-[0.72rem] uppercase tracking-[0.14em] font-medium
                text-white
                shadow-md
                transition-all duration-300
                focus:outline-none focus:ring-1 focus:ring-white/40
              "
            >
              <span className="truncate">{activeSubCategoryLabel}</span>
              <svg
                className={`w-3.5 h-3.5 text-white/70 transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180 text-white" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu Panel */}
            {dropdownOpen && (
              <div
                role="listbox"
                className="
                  absolute right-0 top-[calc(100%+8px)]
                  w-full md:w-[200px]
                  bg-[#121212]/95
                  backdrop-blur-[20px]
                  border border-white/15
                  rounded-[18px]
                  py-2 px-1.5
                  shadow-[0_20px_50px_rgba(0,0,0,0.85)]
                  z-50
                  animate-in fade-in slide-in-from-top-2 duration-200
                "
              >
                {availableSubCategories.map((sub, idx, arr) => (
                  <div key={sub.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSubCategory(sub.id);
                        setDropdownOpen(false);
                      }}
                      className={`
                        w-full text-left py-2.5 px-4
                        font-sans text-[0.7rem] uppercase tracking-[0.14em]
                        transition-all duration-200
                        rounded-[10px]
                        flex items-center justify-between
                        ${
                          selectedSubCategory === sub.id
                            ? "text-white bg-white/10 font-semibold"
                            : "text-fg-secondary hover:text-white hover:bg-white/[0.05]"
                        }
                      `}
                    >
                      <span>{sub.label}</span>
                      {selectedSubCategory === sub.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </button>
                    {idx < arr.length - 1 && (
                      <div className="h-[1px] bg-white/5 mx-2 my-0.5" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto">
        {/* ── 1. SANITY PROJECTS GRID ───────────────────────────────────── */}
        {filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[6vw_4vw] fade-in active mb-16">
            {filteredProjects.map((p, index) => {
              const isPdf = Boolean(p.pdfUrl);
              const detailUrl =
                p.type === "design"
                  ? `/work/design/${p.slug?.current}`
                  : `/work/art/${p.slug?.current}`;

              return (
                <Link
                  key={p._id}
                  href={detailUrl}
                  className="design-project-item hover-trigger flex flex-col no-underline text-inherit group"
                >
                  <div className="w-full aspect-[16/11] overflow-hidden bg-bg-secondary border border-border-color mb-[25px] relative">
                    <img
                      src={
                        p.coverImage
                          ? urlFor(p.coverImage).width(1200).url()
                          : "/assets/hero-home.png"
                      }
                      alt={p.title}
                      className="w-full h-full object-cover transition-all duration-[1400ms] group-hover:scale-[1.03]"
                    />
                    {isPdf && (
                      <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white font-sans text-[0.65rem] uppercase tracking-[0.15em] flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        PDF Presentation
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-[1fr_120px] gap-[20px] border-t border-border-color pt-[18px]">
                    <div>
                      <h3 className="font-sans text-[1.6rem] font-light mb-[4px] tracking-[-0.01em]">
                        {p.title}
                      </h3>

                      <div className="flex items-center gap-2">
                        <span className="font-sans text-[0.7rem] uppercase tracking-[0.15em] text-fg-secondary">
                          {p.type === "design"
                            ? p.subCategory
                              ? p.subCategory
                              : "DESIGN"
                            : "ART"}
                        </span>
                      </div>
                    </div>

                    <div className="text-right font-sans text-[0.75rem]">
                      <span className="font-sans font-bold text-fg-muted block">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-fg-secondary">{p.year}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ── 2. LOCAL ILLUSTRATIONS GALLERY ───────────────────────────── */}
        {showIllustrations && (
          <div className="w-full border-t border-white/10 pt-12 my-12">
            {selectedSubCategory === "all" && (
              <div className="mb-10">
                <span className="font-sans text-[0.72rem] tracking-[0.25em] uppercase text-fg-muted block mb-2">
                  Design Portfolio
                </span>
                <h2 className="font-sans text-[2.2rem] font-light text-white uppercase tracking-[-0.02em]">
                  Illustrations &amp; Visual Works
                </h2>
              </div>
            )}

            {/* Editorial Masonry/Grid of Illustrations (No filenames, No fake metadata) */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {illustrations.map((imgSrc, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxImg(imgSrc)}
                  className="
                    break-inside-avoid overflow-hidden bg-[#121212] border border-white/10
                    rounded-sm group relative cursor-pointer
                    transition-all duration-500 hover:border-white/30 hover:shadow-2xl
                  "
                >
                  <img
                    src={imgSrc}
                    alt="Illustration artwork"
                    loading="lazy"
                    className="w-full h-auto object-contain block transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && !showIllustrations && (
          <div className="py-[100px] text-center border border-white/5 rounded-2xl bg-black/20">
            <p className="font-sans text-[1.5rem] font-light text-fg-secondary mb-4">
              No {selectedSubCategory !== "all" ? selectedSubCategory : ""}{" "}
              projects found in the archive.
            </p>
            <button
              onClick={() => {
                setSelectedSubCategory("all");
                setTab("design");
              }}
              className="font-sans text-[0.75rem] uppercase tracking-[0.15em] text-white border-b border-white pb-1 hover:opacity-80 transition-opacity"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>

      {/* ── 3. FULL-SCREEN LIGHTBOX MODAL ────────────────────────────── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setLightboxImg(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            aria-label="Close image lightbox"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <img
            src={lightboxImg}
            alt="Illustration Artwork"
            className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}