import { client } from "@/sanity/lib/client";
import { projectQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await client.fetch(projectQuery, { slug });

    console.log("PROJECT:", project);
    return (
        <section>
            <div className="max-w-[1400px] mx-auto px-[5vw]">

                {/* Space below fixed header */}
                <div className="h-[130px]" />

                {/* Project Intro */}
                <div className="max-w-[1000px] mb-24">
                    <span className="font-sans text-[0.75rem] tracking-[0.3em] uppercase text-fg-muted block mb-6">
                        {project.type}
                    </span>

                    <h1 className="font-serif text-[clamp(3.5rem,6.5vw,6.5rem)] font-light leading-[1.0] tracking-[-0.02em] text-fg-primary">
                        {project.title}
                    </h1>
                </div>

                {/* Hero Image */}
                <div className="w-full pb-[110px]">
                    <img
                        src={urlFor(project.coverImage).width(2000).url()}
                        alt={project.title}
                        className="w-full"
                    />
                </div>

                {/* Description */}
                <div className="flex justify-center pb-[60px]">
                    <div className="w-full max-w-[800px]">
                        <p className="text-lg md:text-xl text-fg-secondary leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                </div>

                {/* Year & Services */}
                <div className="flex justify-center pb-[110px]">
                    <div className="w-full max-w-[800px] grid grid-cols-2 gap-12">
                        <div>
                            <p className="text-xs uppercase text-fg-muted mb-2">Year</p>
                            <p>{project.year}</p>
                        </div>

                        <div>
                            <p className="text-xs uppercase text-fg-muted mb-2">Services</p>
                            <div className="space-y-1">
                                {project.services?.map((service: string) => (
                                    <p key={service}>{service}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <section className="grid grid-cols-12 gap-10 pb-[200px]">
                    {project.gallery.map((image: any, index: number) => (
                        <div
                            key={index}
                            className={
                                index % 4 === 0
                                    ? "col-span-5"
                                    : index % 4 === 1
                                        ? "col-span-5"
                                        : index % 4 === 2
                                            ? "col-span-6"
                                            : "col-span-7"
                            }
                        >
                            <img
                                src={urlFor(image).width(1600).url()}
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