"use client";
import { urlFor } from "@/sanity/lib/image";
import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";

import { client } from "@/sanity/lib/client";
import { blogsQuery } from "@/sanity/lib/queries";

export default function BlogsPage() {
  const [doc, setDoc] = useState<any>(null);
  const [activeChapter, setActiveChapter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await client.fetch(blogsQuery);
        // setDoc(data);
        setDoc(null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    if (!doc?.chapters) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-240px 0px -40% 0px",
        threshold: 0,
      }
    );

    doc.chapters.forEach((chapter: any, index: number) => {
      const chapterId = `chapter-${index + 1}`;
      const el = document.getElementById(chapterId);

      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [doc]);

  if (!doc) {
    return (
      <section className="pt-[150px] min-h-screen flex items-center justify-center text-white font-sans text-sm tracking-[0.15em] uppercase">
        Blog content is currently offline for updates.
      </section>
    );
  }

  return (
    <section className="pt-[240px] min-h-screen bg-[#0c0c0c] text-white">
      <div
        className="max-w-[1400px] mx-auto pb-[15vh] grid grid-cols-1 md:grid-cols-[300px_1fr] gap-[6vw]"
        style={{
          paddingTop: "180px",
          paddingLeft: "var(--site-padding-x)",
          paddingRight: "var(--site-padding-x)",
        }}
      >
        {/* Sidebar */}
        <aside className="md:sticky md:top-[240px] h-fit self-start">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-400 block mb-6">
            Blog Chapters
          </span>

          <ul className="flex flex-col gap-4 border-l border-gray-700 pl-5">
            {doc.chapters?.map((chapter: any, index: number) => {
              const chapterId = `chapter-${index + 1}`;
              return (
                <li key={chapter._key || chapterId}>
                  <a
                    href={`#${chapterId}`}
                    className={`text-sm transition-colors ${activeChapter === chapterId
                      ? "text-white font-medium"
                      : "text-gray-400 hover:text-white"
                      }`}
                  >
                    {chapter.num} — {chapter.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Content */}
        <div className="max-w-[750px]">
          <div className="border-b border-gray-700 pb-10 mb-12">
            <h1 className="font-serif text-5xl max-sm:text-3xl mb-4">
              {doc.title}
            </h1>

            <h2 className="font-serif text-2xl italic text-gray-400 mb-6">
              {doc.subtitle}
            </h2>
          </div>

          <article className="space-y-16 pb-[80vh]">
            {doc.chapters?.map((chapter: any, index: number) => {
              const chapterId = `chapter-${index + 1}`;
              return (
                <section
                  key={chapter._key || chapterId}
                  id={chapterId}
                  className="scroll-mt-[240px]"
                >
                  <h3 className="text-2xl font-bold mb-6">
                    {chapter.num}: {chapter.title}
                  </h3>

                  <div className="prose prose-invert max-w-none">
                    <PortableText value={chapter.content} />
                  </div>
                </section>
              );
            })}
          </article>
        </div>
      </div>
    </section>
  );
}
