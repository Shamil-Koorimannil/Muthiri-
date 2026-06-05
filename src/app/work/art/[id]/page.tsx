import { portfolioDB } from "@/data/portfolio";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return portfolioDB.art.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const artwork = portfolioDB.art.find((p) => p.id === id);
  if (!artwork) return {};
  return { title: `${artwork.title} — Muthiri` };
}

export default async function ArtDetailPage({ params }: Props) {
  const { id } = await params;
  const artwork = portfolioDB.art.find((p) => p.id === id);
  if (!artwork) notFound();

  const index = portfolioDB.art.findIndex((p) => p.id === artwork.id);
  const nextArt = portfolioDB.art[(index + 1) % portfolioDB.art.length];

  return (
    <section className="pt-[150px] min-h-screen">
      <div className="max-w-[1400px] mx-auto mb-[10vh]" style={{ paddingLeft: "var(--site-padding-x)", paddingRight: "var(--site-padding-x)" }}>
        <span className="reveal-wrapper block overflow-hidden">
          <span className="reveal-text font-sans text-[0.75rem] tracking-[0.3em] uppercase text-fg-secondary block mb-[20px]">
            {artwork.num}
          </span>
        </span>
        <h1 className="reveal-wrapper block overflow-hidden">
          <span className="reveal-text font-serif text-[6vw] max-sm:text-[3rem] font-light italic leading-[0.95] tracking-[-0.02em]">
            {artwork.title}
          </span>
        </h1>
      </div>

      <div className="flex flex-col gap-[15vh] pb-[15vh]">
        <div className="w-full h-[90vh] overflow-hidden border-y border-border-color relative fade-in">
          <img src={artwork.image} alt={`${artwork.title} Installation View`} className="w-full h-full object-cover grayscale contrast-[1.05]" />
          <div className="absolute bottom-[30px] font-sans text-[0.75rem] text-fg-secondary bg-black/75 backdrop-blur-[8px] px-[16px] py-[8px] border border-white/5" style={{ left: "var(--site-padding-x)" }}>
            Exhibition Mockup &mdash; {artwork.location}
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-[8vw] fade-in" style={{ paddingLeft: "var(--site-padding-x)", paddingRight: "var(--site-padding-x)" }}>
          <div className="font-serif text-[2.2rem] font-light italic leading-[1.2]">{artwork.headline}</div>
          <div>
            <div
              className="font-serif text-[1.35rem] font-light leading-[1.8] text-fg-secondary [&_p]:mb-[25px]"
              dangerouslySetInnerHTML={{ __html: artwork.description }}
            />
            <div className="border-y border-border-color py-[30px] mt-[50px] flex flex-wrap justify-between gap-[30px]">
              <div className="font-sans text-[0.8rem]">
                <span className="text-fg-muted block text-[0.65rem] tracking-[0.15em] uppercase mb-[4px]">Location</span>
                {artwork.location}
              </div>
              <div className="font-sans text-[0.8rem]">
                <span className="text-fg-muted block text-[0.65rem] tracking-[0.15em] uppercase mb-[4px]">Medium</span>
                {artwork.medium}
              </div>
              <div className="font-sans text-[0.8rem]">
                <span className="text-fg-muted block text-[0.65rem] tracking-[0.15em] uppercase mb-[4px]">Scale</span>
                {artwork.dimensions}
              </div>
              <div className="font-sans text-[0.8rem]">
                <span className="text-fg-muted block text-[0.65rem] tracking-[0.15em] uppercase mb-[4px]">Year</span>
                {artwork.year}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto w-full" style={{ paddingLeft: "var(--site-padding-x)", paddingRight: "var(--site-padding-x)" }}>
          <div className="border-t border-border-color py-[8vh] flex justify-between items-center">
            <Link href="/work" className="hover-trigger no-underline text-inherit">
              <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-fg-muted block">Back to</span>
              <span className="font-serif text-[2.2rem] font-light transition-colors hover:text-fg-secondary">Exhibitions</span>
            </Link>
            <Link href={`/work/art/${nextArt.id}`} className="hover-trigger no-underline text-inherit text-right">
              <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-fg-muted block">Next Exhibition</span>
              <span className="font-serif text-[2.2rem] font-light transition-colors hover:text-fg-secondary">{nextArt.title}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
