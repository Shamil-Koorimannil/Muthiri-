import { defineField, defineType } from "sanity";

export const projectType = defineType({
    name: "project",
    title: "Project",
    type: "document",

    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),

        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
            },
        }),

        defineField({
            name: "type",
            title: "Type",
            type: "string",
            initialValue: "design",
            options: {
                list: [
                    { title: "Design", value: "design" },
                    { title: "Art", value: "art" },
                ],
                layout: "radio",
            },
        }),

        defineField({
            name: "subCategory",
            title: "Design Type / Sub-Category",
            type: "string",
            description: "Select the category for this design project: Advertising, Branding, or Illustration",
            options: {
                list: [
                    { title: "Advertising", value: "advertising" },
                    { title: "Branding", value: "branding" },
                    { title: "Illustration", value: "illustration" },
                ],
                layout: "radio",
            },
            hidden: ({ document }) => document?.type !== "design",
        }),



        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),

        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: "pdfFile",
            title: "PDF File / Presentation",
            type: "file",
            description: "Upload a PDF document (e.g. brand presentation / monograph). If provided, clicking the project cover image will open this PDF directly.",
            options: {
                accept: ".pdf",
            },
        }),

        // NEW FIELDS



        defineField({
            name: "year",
            title: "Year",
            type: "string",
        }),



        defineField({
            name: "services",
            title: "Services",
            type: "array",
            of: [{ type: "string" }],
        }),

        defineField({
            name: "gallery",
            title: "Gallery",
            type: "array",
            of: [
                {
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                },
            ],
        }),



        defineField({
            name: "featured",
            title: "Featured Project",
            type: "boolean",
            initialValue: false,
        }),
    ],
});