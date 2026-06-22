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
            options: {
                list: [
                    { title: "Art", value: "art" },
                    { title: "Design", value: "design" },
                ],
            },
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