import Link from "next/link";
import { client } from "@/sanity/lib/client";
import {
  blogsQuery,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export default async function WritingPage() {
  const blogs = await client.fetch(blogsQuery);

  if (!blogs) {
    return (
      <section className="pt-[180px] min-h-screen">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1>No blogs found.</h1>
        </div>
      </section>
    );
  }

  return (
    <section
      className=" pb-[140px] min-h-screen"
      style={{
        paddingTop: "180px",

        paddingLeft: "var(--site-padding-x)",
        paddingRight: "var(--site-padding-x)",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Hero */}
        <div className="border-b border-border-color pb-[8vh] mb-[12vh]">
          <h1 className="reveal-wrapper block overflow-hidden">
            <span className="reveal-text font-serif text-[5rem] max-sm:text-[3rem] font-light leading-[1]">
              WRITING &amp; RESEARCH
            </span>
          </h1>
        </div>

        {/* Blogs Feature */}
        <div className="fade-in bg-bg-secondary border border-border-color p-[50px] max-sm:p-[30px_20px] grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-[6vw] items-center mb-[18vh]">
          <div className="w-full aspect-[4/3] overflow-hidden border border-border-color">
            {blogs.coverImage && (
              <img
                src={urlFor(blogs.coverImage)
                  .width(1200)
                  .url()}
                alt={blogs.title}
                className="w-full h-full object-cover grayscale"
              />
            )}
          </div>

          <div className="flex flex-col gap-[20px]">
            <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-fg-secondary border border-white/20 px-[10px] py-[4px] w-fit">
              BLOGS
            </span>

            <h2 className="font-serif text-[2.2rem] font-light leading-[1.2]">
              {blogs.title}: {blogs.subtitle}
            </h2>

            <p className="font-sans text-[0.95rem] text-fg-secondary leading-[1.8]">
              {blogs.teaser}
            </p>

            <Link
              href="/writing/blogs"
              className="hover-trigger no-underline font-sans text-[0.75rem] tracking-[0.15em] uppercase text-fg-primary border-b border-fg-primary pb-[4px] w-fit font-medium"
            >
              Read Blog
            </Link>
          </div>
        </div>


      </div>
    </section>
  );
}