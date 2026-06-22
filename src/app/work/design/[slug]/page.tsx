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
          <span className="font-sans text-[1rem] tracking-[0.15em] uppercase text-fg-muted block mb-[20px]">
            DESIGN
          </span>

          <h1 className="font-serif text-[5vw] font-light leading-[1]">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-[15vh] pb-[15vh]">
        {/* Hero Image */}
        <div className="w-full h-[85vh] overflow-hidden relative">
          <img
            src={urlFor(project.coverImage).width(2000).url()}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description & Year */}
        <div
          className="max-w-[800px] mx-auto w-full"
          style={{
            paddingLeft: "var(--site-padding-x)",
            paddingRight: "var(--site-padding-x)",
          }}
        >
          <div>
            <p className="font-serif text-[1.35rem] font-light leading-[1.8] text-fg-secondary">
              {project.description}
            </p>

            <div className="border-y border-border-color py-[30px] mt-[50px] flex flex-wrap justify-between gap-[30px]">
              <div>
                <span className="text-fg-muted block text-[0.65rem] uppercase mb-[4px]">
                  Year
                </span>
                {project.year}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div
          className="max-w-[1400px] mx-auto grid grid-cols-12 gap-8"
          style={{
            paddingLeft: "var(--site-padding-x)",
            paddingRight: "var(--site-padding-x)",
          }}
        >
          {project.gallery?.map((image: any, i: number) => (
            <div key={i} className="col-span-6">
              <img
                src={urlFor(image).width(1200).url()}
                alt=""
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}