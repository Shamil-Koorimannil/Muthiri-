import { portfolioDB } from "@/data/portfolio";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return portfolioDB.design.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = portfolioDB.design.find((p) => p.id === id);
  if (!project) return {};
  return { title: `${project.title} — Muthiri` };
}

export default async function DesignDetailPage({ params }: Props) {
  const { id } = await params;
  const project = portfolioDB.design.find((p) => p.id === id);
  if (!project) notFound();

  const index = portfolioDB.design.findIndex((p) => p.id === project.id);
  const nextProj = portfolioDB.design[(index + 1) % portfolioDB.design.length];

  return (
    <section className="pt-[150px] min-h-screen">
      <div className="max-w-[1400px] mx-auto mb-[8vh] grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-[8vw] items-end" style={{ paddingLeft: "var(--site-padding-x)", paddingRight: "var(--site-padding-x)" }}>
        <div className="monograph-title-block">
          <span className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-fg-muted block mb-[20px]">
            {project.num}
          </span>
          <h1 className="reveal-wrapper block overflow-hidden">
            <span className="reveal-text font-serif text-[5vw] max-md:text-[9vw] font-light leading-[1] tracking-[-0.02em]">
              {project.title}
            </span>
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-[30px_20px] md:border-l border-border-color md:pl-[40px] fade-in">
          <div>
            <span className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-fg-muted block mb-[4px]">Client</span>
            <span className="font-sans text-[0.85rem] text-fg-primary">{project.client}</span>
          </div>
          <div>
            <span className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-fg-muted block mb-[4px]">Role</span>
            <span className="font-sans text-[0.85rem] text-fg-primary">{project.role}</span>
          </div>
          <div>
            <span className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-fg-muted block mb-[4px]">Medium</span>
            <span className="font-sans text-[0.85rem] text-fg-primary">{project.medium}</span>
          </div>
          <div>
            <span className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-fg-muted block mb-[4px]">Dimensions</span>
            <span className="font-sans text-[0.85rem] text-fg-primary">{project.dimensions}</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[80vh] overflow-hidden mb-[12vh] border-y border-border-color fade-in">
        <img src={project.image} alt={`${project.title} main spread`} className="w-full h-full object-cover grayscale scale-[1.05]" />
      </div>

      <div className="max-w-[1400px] mx-auto pb-[15vh]" style={{ paddingLeft: "var(--site-padding-x)", paddingRight: "var(--site-padding-x)" }}>
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-[6vw] mb-[12vh] fade-in">
          <div className="font-display text-[1.8vw] max-md:text-[1.8rem] font-bold leading-[1.2]">{project.headline}</div>
          <div
            className="font-sans text-[1.1rem] leading-[1.7] text-fg-secondary [&_p]:mb-[30px]"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        </div>

        <div className="flex flex-col gap-[8vh] mb-[15vh]">
          <div className="flex flex-wrap gap-[4vw]">
            {project.gallery.map((g, i) => (
              <div
                key={i}
                className={`overflow-hidden border border-border-color w-full ${
                  g.type === "col-4" ? "md:w-[30%]" : g.type === "col-6" ? "md:w-[48%]" : g.type === "col-8" ? "md:w-[65%]" : "md:w-full"
                } ${
                  g.aspect === "aspect-wide" ? "aspect-[16/9]" : g.aspect === "aspect-portrait" ? "aspect-[3/4]" : "aspect-square"
                }`}
              >
                <img src={g.img} alt="Monograph Process Image" className="fade-in w-full h-full object-cover grayscale" />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border-color py-[8vh] flex justify-between items-center">
          <Link href="/work" className="hover-trigger no-underline text-inherit">
            <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-fg-muted block">Back to</span>
            <span className="font-serif text-[2.2rem] font-light transition-colors hover:text-fg-secondary">Archive</span>
          </Link>
          <Link href={`/work/design/${nextProj.id}`} className="hover-trigger no-underline text-inherit text-right">
            <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-fg-muted block">Next Project</span>
            <span className="font-serif text-[2.2rem] font-light transition-colors hover:text-fg-secondary">{nextProj.title}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
