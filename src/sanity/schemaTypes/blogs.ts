import { defineField, defineType } from "sanity";

export default defineType({
    name: "blogs",
    title: "Blogs",
    type: "document",

    fields: [
        defineField({
            name: "title",
            type: "string",
        }),

        defineField({
            name: "subtitle",
            type: "string",
        }),

        defineField({
            name: "teaser",
            type: "text",
        }),

        defineField({
            name: "coverImage",
            type: "image",
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: "chapters",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "id",
                            type: "string",
                        },
                        {
                            name: "num",
                            type: "string",
                        },
                        {
                            name: "title",
                            type: "string",
                        },
                        {
                            name: "content",
                            type: "array",
                            of: [{ type: "block" }],
                        },
                    ],
                },
            ],
        }),

    ],
});
