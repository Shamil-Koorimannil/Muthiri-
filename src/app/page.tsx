import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { projectsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";

type Project = {
  _id: string;
  title: string;
  type: string;
  subCategory?: string;
  year?: string;
  slug?: {
    current: string;
  };
  coverImage?: any;
};

export default async function HomePage() {
  const projects: Project[] = await client.fetch(projectsQuery);

  return (
    <div
      className="flex flex-col min-h-screen pt-[160px] pb-[120px]"
      style={{
        paddingLeft: "var(--site-padding-x)",
        paddingRight: "var(--site-padding-x)",
      }}
    >
      {/* ── 1. HERO SECTION ────────────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-[8vw] mb-[18vh]">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-sans text-[0.72rem] tracking-[0.2em] uppercase text-fg-secondary font-medium">
              Available for Work &mdash; 2026
            </span>
          </div>

          <h1 className="font-sans text-[clamp(2.8rem,5.5vw,5.2rem)] font-light leading-[1.02] tracking-[-0.03em] text-white mb-8">
            Hello, I&apos;m Noufan. <br />
            <span className="text-fg-secondary font-normal">
              Designer &amp; Creative Director.
            </span>
          </h1>

          <p className="font-sans text-[1.15rem] md:text-[1.3rem] font-light text-fg-secondary leading-[1.6] max-w-[620px] mb-10">
            Crafting brand identities, advertising campaigns, and spatial visual experiences for global cultural institutions &amp; luxury brands.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/work"
              className="
                hover-trigger no-underline font-sans text-[0.8rem] font-medium tracking-[0.16em] uppercase
                bg-white text-black px-8 py-4 rounded-full
                hover:bg-white/90 transition-all duration-300 shadow-lg
                flex items-center gap-3 group
              "
            >
              <span>View Selected Work</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            <Link
              href="/about"
              className="
                hover-trigger no-underline font-sans text-[0.8rem] font-medium tracking-[0.16em] uppercase
                text-fg-secondary hover:text-white transition-colors duration-300 py-2 border-b border-white/20 hover:border-white
              "
            >
              About Practice
            </Link>
          </div>
        </div>

        {/* Hero Editorial Portrait */}
        <div className="relative w-full aspect-[4/5] max-w-[550px] mx-auto overflow-hidden border border-white/10 rounded-sm bg-[#121212] group">
          <Image
            src="/assets/Noufan muthiri.webp"
            alt="Noufan Muthiri Portrait"
            fill
            priority
            className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03] filter grayscale contrast-[105%]"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white/80 font-sans text-[0.68rem] tracking-[0.2em] uppercase">
            <span>Noufan Muthiri</span>
            <span>London / Berlin</span>
          </div>
        </div>
      </section>

      {/* ── 2. INTRODUCTION & CAPABILITIES ───────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-[8vw] items-start mb-[20vh] border-t border-border-color pt-[10vh]">
        <div>
          <span className="font-sans text-[0.72rem] tracking-[0.25em] uppercase text-fg-muted block mb-4">
            Practice Overview
          </span>
          <h2 className="font-sans text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-[1.1] tracking-[-0.02em] text-white">
            A designer focused on identity, art direction &amp; visual systems.
          </h2>
        </div>

        <div className="flex flex-col gap-12">
          <p className="font-sans text-[1.15rem] font-light text-fg-secondary leading-[1.7] max-w-[720px]">
            Bridging the gap between strict rational brand systems, digital spatial design, and conceptual art. Constructing visual monuments of clarity and structural elegance across physical print monographs and digital case studies.
          </p>

          <div>
            <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase text-fg-muted block mb-6">
              Core Capabilities &amp; Expertise
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 font-sans text-[0.95rem] font-medium tracking-[0.1em] text-white uppercase border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span>Brand Identity</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span>Art Direction</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span>Advertising Campaigns</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span>Visual Systems</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. CURATED WORKS (SANITY POWERED) ─────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto w-full mb-[20vh] border-t border-border-color pt-[10vh]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16">
          <div>
            <span className="font-sans text-[0.72rem] tracking-[0.25em] uppercase text-fg-muted block mb-3">
              Portfolio Selection
            </span>
            <h3 className="font-sans text-[clamp(2.2rem,4vw,3.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-white">
              Curated Works
            </h3>
          </div>
          <Link
            href="/work"
            className="hover-trigger font-sans text-[0.78rem] tracking-[0.18em] uppercase text-white border-b border-white pb-1 font-medium hover:opacity-80 transition-opacity"
          >
            View All Archive ({projects.length}) &rarr;
          </Link>
        </div>

        {projects?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[8vw_5vw]">
            {projects.slice(0, 4).map((project: Project, index: number) => {
              const detailUrl =
                project.type === "design"
                  ? `/work/design/${project.slug?.current}`
                  : `/work/art/${project.slug?.current}`;

              return (
                <Link
                  key={project._id}
                  href={detailUrl}
                  className="group hover-trigger flex flex-col no-underline text-inherit"
                >
                  <div className="w-full aspect-[16/11] overflow-hidden bg-[#121212] border border-white/10 mb-6 relative rounded-sm">
                    <img
                      src={
                        project.coverImage
                          ? urlFor(project.coverImage).width(1200).url()
                          : "/assets/hero-home.png"
                      }
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="flex justify-between items-baseline border-t border-white/10 pt-4">
                    <div>
                      <h4 className="font-sans text-[1.6rem] font-light text-white tracking-[-0.01em] mb-1">
                        {project.title}
                      </h4>
                      <span className="font-sans text-[0.7rem] uppercase tracking-[0.18em] text-fg-secondary">
                        {project.type === "design"
                          ? project.subCategory
                            ? project.subCategory
                            : "DESIGN"
                          : "ART"}
                      </span>
                    </div>

                    <span className="font-sans text-[0.8rem] font-medium text-fg-muted">
                      0{index + 1}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center border border-white/5 rounded-2xl bg-black/20">
            <p className="font-sans text-[1.2rem] text-fg-muted">
              No curated projects available yet.
            </p>
          </div>
        )}
      </section>

      {/* ── 4. CONTACT CTA ─────────────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto w-full border-t border-border-color pt-[12vh] pb-[6vh]">
        <div className="flex flex-col items-start gap-8 max-w-[900px]">
          <span className="font-sans text-[0.72rem] tracking-[0.25em] uppercase text-fg-muted">
            Initiate Contact
          </span>
          <h2 className="font-sans text-[clamp(2.5rem,5.5vw,5rem)] font-light leading-[1.02] tracking-[-0.03em] text-white">
            Have a project in mind? <br />
            <span className="text-fg-secondary">Let&apos;s talk.</span>
          </h2>

          <Link
            href="/contact"
            className="
              hover-trigger no-underline font-sans text-[0.85rem] font-medium tracking-[0.18em] uppercase
              inline-flex items-center gap-4 text-white border-b-2 border-white pb-2 hover:gap-6 transition-all duration-300
            "
          >
            <span>Get In Touch</span>
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 6H22M22 6L17 1M22 6L17 11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
