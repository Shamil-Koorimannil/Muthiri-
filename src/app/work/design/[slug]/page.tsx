import { client } from "@/sanity/lib/client";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import { PdfProjectPresentation } from "@/components/PdfProjectPresentation";

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

      <div className="flex flex-col gap-[10vh] pb-[15vh]">
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
            {project.description && (
              <p className="font-serif text-[1.4rem] max-sm:text-[1.1rem] font-light leading-[1.8] text-fg-secondary mb-[40px]">
                {project.description}
              </p>
            )}

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
              {project.services && project.services.length > 0 && (
                <div>
                  <span className="text-fg-muted block text-[0.65rem] uppercase tracking-[0.15em] mb-[4px]">
                    Services
                  </span>
                  <span className="font-sans text-[0.9rem] font-medium">{project.services.join(" · ")}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Behance-Style PDF Case Study Presentation */}
        {project.pdfUrl && (
          <div
            className="w-full border-t border-white/10 pt-[6vh]"
            style={{
              paddingLeft: "var(--site-padding-x)",
              paddingRight: "var(--site-padding-x)",
            }}
          >
            <div className="max-w-[1400px] mx-auto">
              <span className="font-sans text-[0.75rem] tracking-[0.25em] uppercase text-fg-muted block mb-4 text-center">
                Project Presentation & Monograph
              </span>
              <PdfProjectPresentation pdfUrl={project.pdfUrl} title={project.title} />
            </div>
          </div>
        )}

        {/* Additional Project Gallery */}
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