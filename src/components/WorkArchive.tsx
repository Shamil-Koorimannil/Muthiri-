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

const SUB_CATEGORY_OPTIONS = [
  { id: "all", buttonLabel: "ALL DESIGN", menuLabel: "ALL" },
  { id: "branding", buttonLabel: "BRANDING", menuLabel: "BRANDING" },
  { id: "advertising", buttonLabel: "ADVERTISING", menuLabel: "ADVERTISING" },
  { id: "illustration", buttonLabel: "ILLUSTRATION", menuLabel: "ILLUSTRATION" },
];

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
    function handleClickOutside(event: MouseEvent | TouchEvent) {
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
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
          const cat = p.subCategory.trim().toLowerCase();
          if (selectedSubCategory === "branding" && !cat.includes("brand")) {
            return false;
          }
          if (selectedSubCategory === "advertising" && !cat.includes("advertis")) {
            return false;
          }
        }
      }

      return true;
    });
  }, [projects, tab, selectedSubCategory]);

  const activeSubCategoryOption = useMemo(() => {
    const found = SUB_CATEGORY_OPTIONS.find((s) => s.id === selectedSubCategory);
    return found || SUB_CATEGORY_OPTIONS[0];
  }, [selectedSubCategory]);

  const showIllustrations =
    (tab === "design" || tab === "all") &&
    (selectedSubCategory === "illustration" || selectedSubCategory === "all") &&
    illustrations.length > 0;

  return (
    <section
      className="min-h-screen pb-[120px] md:pb-[160px]"
      style={{
        paddingTop: "170px",
        paddingLeft: "var(--site-padding-x)",
        paddingRight: "var(--site-padding-x)",
      }}
    >
      {/* ── 1. QUIET PAGE TITLE ────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto mt-10 sm:mt-12 md:mt-0 mb-10 md:mb-14">
        <h1 className="font-sans text-[clamp(2.5rem,4.5vw,4rem)] font-light leading-[1] tracking-[-0.02em] uppercase text-white">
          WORK
        </h1>
      </div>

      {/* ── 2. STICKY FILTER CONTROLS BAR WRAPPER ────────────────────────────── */}
      <div className="sticky top-[80px] md:top-[90px] z-40 bg-[#080808]/95 backdrop-blur-md pt-3 pb-5 border-b border-white/10 mb-14 md:mb-20 transition-colors">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 md:gap-6 relative">
          {/* Left: Primary Segmented Toggle (ALL | DESIGN | ART) */}
          <div className="h-[54px] w-full md:w-[340px] p-1.5 bg-[#121212] border border-white/15 hover:border-white/25 rounded-full inline-flex items-center justify-between gap-1 shadow-sm backdrop-blur-md transition-colors">
            <button
              type="button"
              onClick={() => {
                setTab("all");
                setSelectedSubCategory("all");
                setDropdownOpen(false);
              }}
              className={`
                flex-1 h-full inline-flex items-center justify-center
                font-sans text-[0.8rem] md:text-[0.82rem] uppercase tracking-[0.18em]
                rounded-full transition-all duration-200 cursor-pointer
                ${
                  tab === "all"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "bg-transparent text-white/70 hover:text-white hover:bg-white/5"
                }
              `}
            >
              All
            </button>

            <button
              type="button"
              onClick={() => {
                setTab("design");
                setDropdownOpen(false);
              }}
              className={`
                flex-1 h-full inline-flex items-center justify-center
                font-sans text-[0.8rem] md:text-[0.82rem] uppercase tracking-[0.18em]
                rounded-full transition-all duration-200 cursor-pointer
                ${
                  tab === "design"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "bg-transparent text-white/70 hover:text-white hover:bg-white/5"
                }
              `}
            >
              Design
            </button>

            <button
              type="button"
              onClick={() => {
                setTab("art");
                setDropdownOpen(false);
              }}
              className={`
                flex-1 h-full inline-flex items-center justify-center
                font-sans text-[0.8rem] md:text-[0.82rem] uppercase tracking-[0.18em]
                rounded-full transition-all duration-200 cursor-pointer
                ${
                  tab === "art"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "bg-transparent text-white/70 hover:text-white hover:bg-white/5"
                }
              `}
            >
              Art
            </button>
          </div>

          {/* Right: Independent Category Dropdown (Visible for Design & All) */}
          {(tab === "design" || tab === "all") && (
            <div className="relative w-full md:w-[320px] z-50" ref={dropdownRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen((prev) => !prev);
                }}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                className="
                  relative
                  w-full md:w-[320px]
                  h-[54px]
                  px-12
                  bg-[#121212]
                  border border-white/15
                  hover:border-white/30
                  rounded-full
                  flex items-center justify-center
                  font-sans text-[0.8rem] md:text-[0.82rem] uppercase tracking-[0.18em] font-medium
                  text-white
                  transition-all duration-200
                  focus:outline-none focus:ring-1 focus:ring-white/30
                  cursor-pointer
                  shadow-sm
                  backdrop-blur-md
                "
              >
                <span className="truncate text-center w-full block">
                  {activeSubCategoryOption.buttonLabel}
                </span>
                <svg
                  className={`absolute right-5 w-4 h-4 text-white/70 transition-transform duration-200 ${
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
                    absolute left-0 right-0 md:left-auto md:right-0 top-[calc(100%+10px)]
                    w-full md:w-[320px]
                    bg-[#181818]
                    border border-white/20
                    rounded-[22px]
                    py-2
                    shadow-[0_20px_50px_rgba(0,0,0,0.9)]
                    z-[999]
                    overflow-hidden
                  "
                >
                  {SUB_CATEGORY_OPTIONS.map((sub, idx, arr) => {
                    const isSelected = selectedSubCategory === sub.id;
                    return (
                      <div key={sub.id}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSubCategory(sub.id);
                            setDropdownOpen(false);
                          }}
                          className={`
                            w-full py-3.5 px-6
                            text-center justify-center
                            font-sans text-[0.8rem] md:text-[0.82rem] uppercase tracking-[0.18em]
                            transition-colors duration-150
                            flex items-center
                            cursor-pointer
                            ${
                              isSelected
                                ? "text-white bg-white/15 font-semibold"
                                : "text-white/70 hover:text-white hover:bg-white/5"
                            }
                          `}
                        >
                          {sub.menuLabel}
                        </button>
                        {idx < arr.length - 1 && (
                          <div className="border-b border-white/5 mx-4" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── 3. MAIN CONTENT AREA ────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto">
        {/* ── 3.1 SANITY PROJECTS GRID ─────────────────────────────────── */}
        {filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 md:gap-x-12 md:gap-y-20">
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
                  <div className="w-full aspect-[16/11] overflow-hidden bg-bg-secondary border border-border-color mb-5 relative rounded-sm">
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

                  <div className="grid grid-cols-[1fr_120px] gap-5 border-t border-border-color pt-4">
                    <div>
                      <h3 className="font-sans text-[1.5rem] md:text-[1.7rem] font-light mb-1 tracking-[-0.01em] text-white">
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

        {/* ── 3.2 LOCAL ILLUSTRATIONS GALLERY ──────────────────────────── */}
        {showIllustrations && (
          <div
            className={`w-full ${
              filteredProjects.length > 0
                ? "mt-28 md:mt-40 lg:mt-48 pt-20 md:pt-28 border-t border-white/10"
                : ""
            }`}
          >
            <div className="mb-12 md:mb-16">
              <h2 className="font-sans text-[clamp(1.8rem,3.5vw,3rem)] font-light text-white uppercase tracking-[-0.02em] leading-tight">
                ILLUSTRATIONS &amp; VISUAL WORKS
              </h2>
            </div>

            {/* Editorial Masonry/Grid of Illustrations */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
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
          <div className="py-[100px] text-center border border-white/5 rounded-2xl bg-black/20 my-12">
            <p className="font-sans text-[1.5rem] font-light text-fg-secondary mb-4">
              No {selectedSubCategory !== "all" ? selectedSubCategory : ""}{" "}
              projects found in the archive.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedSubCategory("all");
                setTab("design");
              }}
              className="font-sans text-[0.75rem] uppercase tracking-[0.15em] text-white border-b border-white pb-1 hover:opacity-80 transition-opacity cursor-pointer"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>

      {/* ── 4. FULL-SCREEN LIGHTBOX MODAL ────────────────────────────── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setLightboxImg(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10 cursor-pointer"
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