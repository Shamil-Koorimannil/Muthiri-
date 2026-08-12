import { defineField, defineType } from "sanity";

export default defineType({
    name: "publication",
    title: "Publication",
    type: "document",

    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),

        defineField({
            name: "year",
            title: "Year",
            type: "number",
        }),

        defineField({
            name: "journal",
            title: "Journal",
            type: "string",
        }),

        defineField({
            name: "summary",
            title: "Summary",
            type: "text",
        }),
    ],
});
