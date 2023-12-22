import { defineField, defineType } from "sanity"

export default defineType({
  name: "use-category",
  title: "Use category",
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
        maxLength: 96,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection
      return {
        ...selection,
        title: title,
      }
    },
  },
})
