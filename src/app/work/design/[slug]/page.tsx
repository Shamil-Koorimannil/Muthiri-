import { client } from "@/sanity/lib/client";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";

export default async function DesignPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await client.fetch(
    projectBySlugQuery,
    { slug }
  );

  if (!project) notFound();

  return (
    <section className="min-h-screen">

      {/* Header Spacer */}
      <div className="h-[200px]" />

      <div
        className="max-w-[1400px] mx-auto mb-[8vh]"
        style={{
          paddingLeft: "var(--site-padding-x)",
          paddingRight: "var(--site-padding-x)",
        }}
      >
        <div>
          <span className="font-sans text-[0.85rem] tracking-[0.2em] uppercase text-fg-muted block mb-[15px]">
            DESIGN {project.subCategory ? `/ ${project.subCategory.toUpperCase()}` : ""}
          </span>

          <h1 className="font-serif text-[5vw] max-sm:text-[2.5rem] font-light leading-[1]">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-[12vh] pb-[15vh]">
        {/* Cover Image */}
        {project.coverImage && (
          <div className="w-full h-[75vh] max-sm:h-[50vh] overflow-hidden relative border-y border-white/10">
            <img
              src={urlFor(project.coverImage).width(2000).url()}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Description & Metadata */}
        <div
          className="max-w-[900px] mx-auto w-full"
          style={{
            paddingLeft: "var(--site-padding-x)",
            paddingRight: "var(--site-padding-x)",
          }}
        >
          <div>
            <p className="font-serif text-[1.4rem] max-sm:text-[1.1rem] font-light leading-[1.8] text-fg-secondary mb-[40px]">
              {project.description}
            </p>

            <div className="border-y border-border-color py-[25px] flex flex-wrap justify-between items-center gap-[20px]">
              <div>
                <span className="text-fg-muted block text-[0.65rem] uppercase tracking-[0.15em] mb-[4px]">
                  Year
                </span>
                <span className="font-sans text-[0.9rem] font-medium">{project.year}</span>
              </div>
              {project.subCategory && (
                <div>
                  <span className="text-fg-muted block text-[0.65rem] uppercase tracking-[0.15em] mb-[4px]">
                    Category
                  </span>
                  <span className="font-sans text-[0.9rem] font-medium uppercase">{project.subCategory}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PDF Monograph Card Section */}
        {project.pdfUrl && (
          <div
            className="max-w-[1400px] mx-auto w-full"
            style={{
              paddingLeft: "var(--site-padding-x)",
              paddingRight: "var(--site-padding-x)",
            }}
          >
            <div className="border-t border-border-color pt-[8vh]">
              <div className="mb-[30px]">
                <span className="font-sans text-[0.75rem] tracking-[0.2em] uppercase text-fg-muted block mb-2">
                  Brand Presentation & Monograph
                </span>
                <h3 className="font-serif text-[2.2rem] max-sm:text-[1.6rem] font-light">
                  {project.title} PDF Document
                </h3>
              </div>

              <a
                href={project.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full max-w-[900px] aspect-[16/10] overflow-hidden bg-bg-secondary border border-white/10 rounded-2xl transition-all duration-500 hover:border-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              >
                {project.coverImage && (
                  <img
                    src={urlFor(project.coverImage).width(1600).url()}
                    alt={`${project.title} PDF cover`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 flex flex-col justify-end p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-white text-black font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full">
                      PDF Document
                    </span>
                    <span className="text-white/70 font-sans text-[0.75rem]">
                      Click cover to view full PDF
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <h4 className="font-serif text-[1.8rem] md:text-[2.2rem] text-white font-light">
                      Open {project.title} PDF Monograph &rarr;
                    </h4>
                    <span className="w-[48px] h-[48px] rounded-full bg-white text-black flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        )}

        {/* Additional Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div
            className="max-w-[1400px] mx-auto grid grid-cols-12 gap-8"
            style={{
              paddingLeft: "var(--site-padding-x)",
              paddingRight: "var(--site-padding-x)",
            }}
          >
            {project.gallery.map((image: any, i: number) => (
              <div key={i} className="col-span-6 max-sm:col-span-12">
                <img
                  src={urlFor(image).width(1200).url()}
                  alt=""
                  className="w-full border border-white/5"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}