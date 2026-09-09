import { client } from "@/sanity/lib/client";
import { projectQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import { PdfProjectPresentation } from "@/components/PdfProjectPresentation";

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await client.fetch(projectQuery, { slug });

    if (!project) {
        notFound();
    }

    return (
        <section className="min-h-screen">
            <div className="max-w-[1400px] mx-auto px-[5vw]">

                {/* Space below fixed header */}
                <div className="h-[180px]" />

                {/* Project Intro */}
                <div className="max-w-[1000px] mb-16">
                    <span className="font-sans text-[0.75rem] tracking-[0.3em] uppercase text-fg-muted block mb-4">
                        {project.type} {project.subCategory ? `/ ${project.subCategory.toUpperCase()}` : ""}
                    </span>

                    <h1 className="font-serif text-[clamp(3rem,5.5vw,5.5rem)] font-light leading-[1.0] tracking-[-0.02em] text-fg-primary">
                        {project.title}
                    </h1>
                </div>

                {/* Hero Cover Image */}
                {project.coverImage && (
                    <div className="w-full pb-[80px]">
                        <img
                            src={urlFor(project.coverImage).width(2000).url()}
                            alt={project.title}
                            className="w-full border border-white/10"
                        />
                    </div>
                )}

                {/* Description & Services */}
                <div className="flex justify-center pb-[60px]">
                    <div className="w-full max-w-[900px]">
                        {project.description && (
                            <p className="text-lg md:text-xl text-fg-secondary leading-relaxed mb-8">
                                {project.description}
                            </p>
                        )}
                        <div className="grid grid-cols-2 gap-12 border-y border-border-color py-6">
                            <div>
                                <p className="text-xs uppercase text-fg-muted mb-1 tracking-[0.15em]">Year</p>
                                <p className="font-sans font-medium">{project.year}</p>
                            </div>

                            {project.services && project.services.length > 0 && (
                                <div>
                                    <p className="text-xs uppercase text-fg-muted mb-1 tracking-[0.15em]">Services</p>
                                    <div className="space-y-1 font-sans">
                                        {project.services.map((service: string) => (
                                            <p key={service}>{service}</p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Behance-Style PDF Case Study Presentation */}
                {project.pdfUrl && (
                    <div className="w-full border-t border-white/10 pt-12">
                        <span className="font-sans text-[0.75rem] tracking-[0.25em] uppercase text-fg-muted block mb-4 text-center">
                            Project Presentation & Monograph
                        </span>
                        <PdfProjectPresentation pdfUrl={project.pdfUrl} title={project.title} />
                    </div>
                )}

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                    <section className="grid grid-cols-12 gap-10 py-[100px]">
                        {project.gallery.map((image: any, index: number) => (
                            <div
                                key={index}
                                className={
                                    index % 4 === 0
                                        ? "col-span-5 max-sm:col-span-12"
                                        : index % 4 === 1
                                            ? "col-span-5 max-sm:col-span-12"
                                            : index % 4 === 2
                                                ? "col-span-6 max-sm:col-span-12"
                                                : "col-span-7 max-sm:col-span-12"
                                }
                            >
                                <img
                                    src={urlFor(image).width(1600).url()}
                                    alt=""
                                    className="w-full border border-white/5"
                                />
                            </div>
                        ))}
                    </section>
                )}

            </div>
        </section>
    );
}