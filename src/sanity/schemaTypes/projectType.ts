import { defineField, defineType } from "sanity";
import { ImageIcon, CaseIcon } from "@sanity/icons";

export const projectType = defineType({
    name: "project",
    title: "Project",
    type: "document",
    icon: CaseIcon,

    // ── Field groups render as tabs in the editor ──────────────────────────
    groups: [
        {
            name: "details",
            title: "Project Details",
            default: true,
        },
        {
            name: "description",
            title: "Description & Services",
        },
        {
            name: "media",
            title: "Media",
        },
        {
            name: "presentation",
            title: "Presentation & PDF",
        },
    ],

    fields: [

        // ══ PROJECT DETAILS ════════════════════════════════════════════════

        defineField({
            name: "title",
            title: "Project Title",
            type: "string",
            group: "details",
            description: "The project name displayed throughout the portfolio.",
            validation: (Rule) =>
                Rule.required().error("A project title is required."),
        }),

        defineField({
            name: "slug",
            title: "URL Slug",
            type: "slug",
            group: "details",
            description:
                "The URL identifier for this project. Click 'Generate' to create it automatically from the title. Avoid changing this after the project is published — it will break existing links.",
            options: {
                source: "title",
                maxLength: 96,
                isUnique: (value, context) =>
                    context.defaultIsUnique(value, context),
            },
            validation: (Rule) =>
                Rule.required().error(
                    "A URL slug is required. Click 'Generate' to create one from the title."
                ),
        }),

        defineField({
            name: "type",
            title: "Project Type",
            type: "string",
            group: "details",
            description:
                "Choose whether this is an Art or Design project. This controls which section of the portfolio it appears in.",
            initialValue: "design",
            options: {
                list: [
                    { title: "🎨   Art", value: "art" },
                    { title: "✏️   Design", value: "design" },
                ],
                layout: "radio",
            },
            validation: (Rule) =>
                Rule.required().error("You must select a project type (Art or Design)."),
        }),

        defineField({
            name: "subCategory",
            title: "Design Category",
            type: "string",
            group: "details",
            description:
                "Choose the design discipline for this project. This controls the category filter on the Work page. Only applies to Design projects.",
            options: {
                list: [
                    { title: "Advertising", value: "advertising" },
                    { title: "Branding", value: "branding" },
                    { title: "Illustration", value: "illustration" },
                ],
                layout: "radio",
            },
            // Only show for Design projects
            hidden: ({ document }) => document?.type !== "design",
        }),

        defineField({
            name: "year",
            title: "Project Year",
            type: "string",
            group: "details",
            description: "The year this project was created or completed. For example: 2024",
        }),

        // ══ DESCRIPTION & SERVICES ═════════════════════════════════════════

        defineField({
            name: "description",
            title: "Project Description",
            type: "text",
            group: "description",
            rows: 6,
            description:
                "A short description of the project. This text appears on the project detail page beneath the main image.",
        }),

        defineField({
            name: "services",
            title: "Services",
            type: "array",
            group: "description",
            description:
                "The services, disciplines, or areas of work involved in this project. Type a service and press Enter to add it. For example: Brand Identity · Art Direction · Typography.",
            of: [{ type: "string" }],
            options: {
                layout: "tags",
            },
        }),

        // ══ MEDIA ══════════════════════════════════════════════════════════

        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            group: "media",
            description:
                "The main image for this project. It appears on portfolio cards and as the hero image on the project page. ⚠️ A cover image is required — missing images may cause display errors on the website.",
            options: {
                hotspot: true,
            },
            validation: (Rule) =>
                Rule.required().warning(
                    "A cover image is strongly recommended. Missing images will cause display errors on the portfolio."
                ),
        }),

        defineField({
            name: "gallery",
            title: "Project Gallery",
            type: "array",
            group: "media",
            description:
                "Additional images displayed on the project detail page. Add images in the order you want visitors to see them. Drag the handle (⠿) on the left to reorder.",
            of: [
                {
                    type: "image",
                    title: "Gallery Image",
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: "alt",
                            type: "string",
                            title: "Image Caption / Alt Text",
                            description:
                                "Optional: a short description of this image for accessibility.",
                        },
                    ],
                    preview: {
                        select: {
                            media: "asset",
                            title: "alt",
                        },
                        prepare(value: Record<string, any>) {
                            return {
                                media: value.media,
                                title: (value.title as string | undefined) || "Gallery image",
                            };
                        },
                    },
                },
            ],
        }),

        // ══ PRESENTATION & PDF ═════════════════════════════════════════════

        defineField({
            name: "pdfFile",
            title: "Project PDF / Presentation",
            type: "file",
            group: "presentation",
            description:
                "Optional. Upload a PDF presentation or project monograph. For Design projects, this appears as a downloadable presentation card on the project page. Leave blank if there is no PDF document for this project.",
            options: {
                accept: ".pdf",
            },
            // PDF is only shown on Design project pages; hide for Art in the editor
            hidden: ({ document }) => document?.type === "art",
        }),

        defineField({
            name: "featured",
            title: "Featured Project",
            type: "boolean",
            group: "presentation",
            description:
                "Reserved for future use. Enabling this setting does not currently change how the project is displayed on the website.",
            initialValue: false,
        }),
    ],

    // ── Document list preview ─────────────────────────────────────────────
    preview: {
        select: {
            title: "title",
            media: "coverImage",
            type: "type",
            subCategory: "subCategory",
            year: "year",
        },
        prepare({
            title,
            media,
            type,
            subCategory,
            year,
        }: {
            title?: string;
            media?: any;
            type?: string;
            subCategory?: string;
            year?: string;
        }) {
            const typeLabel =
                type === "art"
                    ? "Art"
                    : type === "design"
                    ? "Design"
                    : type || "—";
            const subLabel = subCategory
                ? subCategory.charAt(0).toUpperCase() + subCategory.slice(1)
                : null;
            const parts = [typeLabel, subLabel, year].filter(Boolean);
            return {
                title: title || "Untitled Project",
                media,
                subtitle: parts.join("  ·  "),
            };
        },
    },
});