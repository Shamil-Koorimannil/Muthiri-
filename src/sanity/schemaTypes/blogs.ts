import { defineField, defineType } from "sanity";
import { BookIcon, DocumentTextIcon } from "@sanity/icons";

export default defineType({
    name: "blogs",
    title: "Blogs",
    type: "document",
    icon: DocumentTextIcon,

    // ── Field groups render as tabs in the editor ──────────────────────────
    groups: [
        {
            name: "info",
            title: "Blog Information",
            default: true,
        },
        {
            name: "chapters",
            title: "Chapters",
        },
    ],

    fields: [

        // ══ BLOG INFORMATION ═══════════════════════════════════════════════
        //
        // Note: The website is designed to display ONE Blogs document.
        // If you create more than one, only the first (oldest) will appear.

        defineField({
            name: "title",
            title: "Writing Title",
            type: "string",
            group: "info",
            description:
                "The main title displayed on the Writing page and at the top of the full blog.",
            validation: (Rule) =>
                Rule.required().error("A writing title is required."),
        }),

        defineField({
            name: "subtitle",
            title: "Subtitle",
            type: "string",
            group: "info",
            description:
                "Subtitle displayed beneath the main title on both the Writing page and the full blog.",
        }),

        defineField({
            name: "teaser",
            title: "Introduction / Teaser",
            type: "text",
            group: "info",
            rows: 4,
            description:
                "A short introduction to the writing. This text appears on the Writing index page beneath the title.",
        }),

        defineField({
            name: "coverImage",
            title: "Writing Cover Image",
            type: "image",
            group: "info",
            description:
                "The main image displayed on the Writing page alongside the title and teaser. Also appears at the bottom of the full blog article.",
            options: {
                hotspot: true,
            },
        }),

        // ══ CHAPTERS ═══════════════════════════════════════════════════════

        defineField({
            name: "chapters",
            title: "Chapters",
            type: "array",
            group: "chapters",
            description:
                "The chapters of your writing. Each chapter appears as a section in the sidebar navigation and as a full section in the blog. The order here is the order visitors will read — drag to reorder.",
            of: [
                {
                    type: "object",
                    title: "Chapter",
                    icon: BookIcon,
                    fields: [
                        defineField({
                            name: "id",
                            title: "Chapter ID",
                            type: "string",
                            description:
                                "Internal identifier used for page scroll navigation. Auto-generated when you add a new chapter. Do not change this after the chapter is published.",
                            // Auto-generate a stable, URL-safe ID when a new chapter is added.
                            // readOnly once set so navigation links cannot be accidentally broken.
                            initialValue: () =>
                                `chapter-${Math.random().toString(36).slice(2, 9)}`,
                            readOnly: ({ value }: { value?: string }) => Boolean(value),
                            // Hidden from view once set — it's an internal field
                            hidden: ({ value }: { value?: string }) => Boolean(value),
                            validation: (Rule) =>
                                Rule.required().regex(/^[a-z0-9-]+$/, {
                                    name: "url-safe",
                                    invert: false,
                                }).error(
                                    "Chapter ID must use only lowercase letters, numbers, and hyphens (e.g. chapter-1)."
                                ),
                        }),

                        defineField({
                            name: "num",
                            title: "Chapter Number",
                            type: "string",
                            description:
                                "The number or label shown in the chapter navigation sidebar. For example: Chapter I, Chapter 1, or Part One.",
                        }),

                        defineField({
                            name: "title",
                            title: "Chapter Title",
                            type: "string",
                            description:
                                "The title of this chapter, shown in the sidebar navigation and as the chapter heading.",
                            validation: (Rule) =>
                                Rule.required().error("Each chapter must have a title."),
                        }),

                        defineField({
                            name: "content",
                            title: "Chapter Content",
                            type: "array",
                            description:
                                "The full text of this chapter. Supports bold, italic, headings, quotes, and links.",
                            of: [{ type: "block" }],
                        }),
                    ],

                    // How each chapter appears as a row in the chapters list
                    preview: {
                        select: {
                            num: "num",
                            title: "title",
                        },
                        prepare({
                            num,
                            title,
                        }: {
                            num?: string;
                            title?: string;
                        }) {
                            const label =
                                num && title
                                    ? `${num}: ${title}`
                                    : title || num || "Untitled Chapter";
                            return {
                                title: label,
                                subtitle: "Chapter",
                            };
                        },
                    },
                },
            ],
        }),
    ],

    // ── Document list preview ─────────────────────────────────────────────
    preview: {
        select: {
            title: "title",
            subtitle: "subtitle",
            media: "coverImage",
        },
        prepare({
            title,
            subtitle,
            media,
        }: {
            title?: string;
            subtitle?: string;
            media?: any;
        }) {
            return {
                title: title || "Untitled Writing",
                subtitle: subtitle || "",
                media,
            };
        },
    },
});
