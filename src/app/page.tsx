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
      className="flex flex-col min-h-screen pt-[180px] sm:pt-[200px] md:pt-[170px] pb-[120px]"
      style={{
        paddingLeft: "var(--site-padding-x)",
        paddingRight: "var(--site-padding-x)",
      }}
    >
      {/* ── 1. HERO SECTION ────────────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-12 lg:gap-20 mt-10 sm:mt-12 md:mt-0 mb-[16vh]">
        <div className="flex flex-col items-start">
          <h1 className="font-sans text-[clamp(2.8rem,5.5vw,5.2rem)] font-light leading-[1.02] tracking-[-0.03em] text-white mb-4">
            HELLO, I&apos;M NOUFAN.
          </h1>

          <h2 className="font-sans text-[clamp(1.1rem,2vw,1.6rem)] font-normal tracking-[0.15em] uppercase text-fg-secondary mb-8">
            DESIGNER / CREATIVE
          </h2>

          <p className="font-sans text-[1.15rem] md:text-[1.35rem] font-light text-fg-secondary leading-[1.6] max-w-[600px] mb-12">
            I create identities, advertising campaigns, and spatial visual experiences for cultural institutions &amp; global brands.
          </p>

          <Link
            href="/work"
            className="
              hover-trigger no-underline font-sans text-[0.85rem] md:text-[0.88rem] font-medium tracking-[0.22em] uppercase
              bg-[#121212] hover:bg-[#1a1a1a] text-white px-12 py-4.5 md:px-14 md:py-5 rounded-full
              border border-white/25 hover:border-white/50
              transition-all duration-300 shadow-md
              inline-flex items-center gap-10 group cursor-pointer mt-2
            "
          >
            <span>VIEW WORK</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Hero Portrait Visual */}
        <div className="relative w-full aspect-[4/5] max-w-[520px] mx-auto overflow-hidden border border-white/10 rounded-sm bg-[#121212] group">
          <Image
            src="/assets/Noufan muthiri.webp"
            alt="Noufan Muthiri Portrait"
            fill
            priority
            className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>
      </section>

      {/* ── 2. PRACTICE OVERVIEW ───────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start mt-12 md:mt-20 mb-[18vh] border-t border-white/10 pt-[10vh]">
        <div>
          <span className="font-sans text-[0.72rem] tracking-[0.25em] uppercase text-fg-muted block mb-4">
            Practice Overview
          </span>
          <h3 className="font-sans text-[clamp(1.8rem,3vw,2.6rem)] font-light leading-[1.1] tracking-[-0.02em] text-white">
            A designer focused on identity, art direction &amp; visual systems.
          </h3>
        </div>

        <div className="flex flex-col gap-10">
          <p className="font-sans text-[1.15rem] font-light text-fg-secondary leading-[1.7] max-w-[700px]">
            Bridging strict rational brand systems, digital spatial design, and conceptual art. Constructing visual monuments of clarity and structural elegance across physical monographs and digital case studies.
          </p>

          <div className="grid grid-cols-2 gap-y-4 gap-x-8 font-sans text-[0.85rem] font-medium tracking-[0.14em] text-white uppercase border-t border-white/10 pt-6">
            <div>Brand Identity</div>
            <div>Art Direction</div>
            <div>Advertising Campaigns</div>
            <div>Visual Systems</div>
          </div>
        </div>
      </section>

      {/* ── 3. CURATED WORKS ────────────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto w-full mt-12 md:mt-20 mb-[18vh] border-t border-white/10 pt-[10vh]">
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
            className="hover-trigger font-sans text-[0.75rem] tracking-[0.18em] uppercase text-white border-b border-white/40 hover:border-white pb-1 font-medium transition-colors"
          >
            View All Work &rarr;
          </Link>
        </div>

        {projects?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 md:gap-x-12 md:gap-y-20">
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
                  <div className="w-full aspect-[16/11] overflow-hidden bg-[#121212] border border-white/10 mb-5 relative rounded-sm">
                    <img
                      src={
                        project.coverImage
                          ? urlFor(project.coverImage).width(1200).url()
                          : "/assets/hero-home.png"
                      }
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex justify-between items-baseline border-t border-white/10 pt-4">
                    <div>
                      <h4 className="font-sans text-[1.5rem] font-light text-white tracking-[-0.01em] mb-1">
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

                    <span className="font-sans text-[0.75rem] font-bold text-fg-muted">
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

      {/* ── 4. INITIATE CONTACT ────────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto w-full mt-12 md:mt-20 border-t border-white/10 pt-[10vh] pb-[4vh]">
        <div className="flex flex-col items-start gap-8 max-w-[800px]">
          <span className="font-sans text-[0.72rem] tracking-[0.25em] uppercase text-fg-muted">
            Initiate Contact
          </span>
          <h2 className="font-sans text-[clamp(2.2rem,5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-white">
            Have a project in mind? <br />
            <span className="text-fg-secondary">Let&apos;s talk.</span>
          </h2>

          <Link
            href="/contact"
            className="
              hover-trigger no-underline font-sans text-[0.8rem] font-medium tracking-[0.18em] uppercase
              bg-[#121212] hover:bg-[#1a1a1a] text-white px-10 py-4.5 rounded-full
              border border-white/20 hover:border-white/40
              transition-all duration-300 shadow-sm
              inline-flex items-center gap-6 group cursor-pointer mt-4
            "
          >
            <span>GET IN TOUCH</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

