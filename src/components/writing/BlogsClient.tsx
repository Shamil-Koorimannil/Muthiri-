"use client";
import { urlFor } from "@/sanity/lib/image";
import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";

interface BlogsClientProps {
    doc: any;
}

export default function BlogsClient({
    doc,
}: BlogsClientProps) {
    const [activeChapter, setActiveChapter] = useState("");



    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveChapter(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-20% 0px -60% 0px",
                threshold: 0,
            }
        );

        doc.chapters?.forEach((chapter: any) => {
            const el = document.getElementById(chapter.id);

            if (el) {
                observer.observe(el);
            }
        });

        return () => observer.disconnect();
    }, [doc]);

    return (
        <section className="pt-[150px] min-h-screen bg-[#0c0c0c] text-white">
            <div
                className="max-w-[1400px] mx-auto pb-[15vh] grid grid-cols-1 md:grid-cols-[300px_1fr] gap-[6vw]"
                style={{
                    paddingLeft: "var(--site-padding-x)",
                    paddingRight: "var(--site-padding-x)",
                }}
            >
                <aside className="md:sticky md:top-[150px] h-fit">
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-400 block mb-6">
                        Blog Chapters
                    </span>

                    <ul className="flex flex-col gap-4 border-l border-gray-700 pl-5">
                        {doc.chapters?.map((chapter: any, index: number) => (
                            <li key={chapter._key || chapter.id || index}>
                                <a
                                    href={`#${chapter.id}`}
                                    className={`text-sm transition-colors ${activeChapter === chapter.id
                                        ? "text-white font-medium"
                                        : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {chapter.num} — {chapter.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className="max-w-[750px]">
                    <div className="border-b border-gray-700 pb-10 mb-12">
                        <h1 className="font-serif text-5xl max-sm:text-3xl mb-4">
                            {doc.title}
                        </h1>

                        <h2 className="font-serif text-2xl italic text-gray-400 mb-6">
                            {doc.subtitle}
                        </h2>
                    </div>

                    <article className="space-y-16">
                        {doc.chapters?.map((chapter: any, index: number) => (
                            <section
                                key={chapter._key || chapter.id || index}
                                id={chapter.id}
                            >
                                <h3 className="text-2xl font-bold mb-6">
                                    {chapter.num}: {chapter.title}
                                </h3>

                                <div className="prose prose-invert max-w-none">
                                    <PortableText value={chapter.content} />
                                </div>
                            </section>
                        ))}

                        {doc.coverImage && (
                            <div className="mb-10">
                                <img
                                    src={urlFor(doc.coverImage).width(1400).url()}
                                    alt={doc.title}
                                    className="w-full h-auto object-cover border border-gray-700"
                                />
                            </div>
                        )}
                    </article>
                </div>
            </div>
        </section>
    );
}
