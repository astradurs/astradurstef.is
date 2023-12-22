import { defineField, defineType } from "sanity"

export default defineType({
  name: "use",
  title: "I use",
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
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: { type: "use-category" },
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
