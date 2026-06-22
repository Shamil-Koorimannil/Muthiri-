import { client } from "@/sanity/lib/client";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";

export default async function ArtDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const artwork = await client.fetch(
    projectBySlugQuery,
    { slug }
  );

  if (!artwork || artwork.type !== "art") {
    notFound();
  }

  return (
    <section className="min-h-screen">

      {/* Header Spacer */}
      <div className="h-[220px]" />

      {/* Title */}
      <div
        className="max-w-[1400px] mx-auto mb-[100px]"
        style={{
          paddingLeft: "var(--site-padding-x)",
          paddingRight: "var(--site-padding-x)",
        }}
      >
        <span className="font-sans text-[0.75rem] tracking-[0.3em] uppercase text-fg-secondary block mb-[20px]">
          ART
        </span>

        <h1 className="font-serif text-[clamp(3rem,6vw,7rem)] font-light italic leading-[0.95] tracking-[-0.02em]">
          {artwork.title}
        </h1>
      </div>

      <div className="flex flex-col gap-[15vh] pb-[15vh]">

        {/* Hero Image */}
        <div className="w-full h-[90vh] overflow-hidden border-y border-border-color relative">
          <img
            src={urlFor(artwork.coverImage).width(2000).url()}
            alt={artwork.title}
            className="w-full h-full object-cover"
          />
        </div>


        <div
          className="max-w-[800px] mx-auto"
          style={{
            paddingLeft: "var(--site-padding-x)",
            paddingRight: "var(--site-padding-x)",
          }}
        >
          <div>
            <p className="font-serif text-[1.35rem] font-light leading-[1.8] text-fg-secondary">
              {artwork.description}
            </p>

            <div className="border-y border-border-color py-[30px] mt-[50px] flex flex-wrap justify-between gap-[30px]">
              <div>
                <span className="text-fg-muted block text-[0.65rem] uppercase mb-[4px]">
                  Year
                </span>
                {artwork.year}
              </div>


            </div>
          </div>
        </div>



        <section className="max-w-[1400px] mx-auto grid grid-cols-12 gap-8">
          {artwork.gallery?.map((image: any, index: number) => (
            <div key={index} className="col-span-6">
              <img
                src={urlFor(image).width(1200).url()}
                alt=""
                className="w-full"
              />
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}