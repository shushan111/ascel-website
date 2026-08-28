import {defineField, defineType} from 'sanity'

export const news = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used for the article URL: /news/[slug]',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localizedText',
      description: 'Short summary shown on news cards, as the article lead, and in SEO metadata.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'object',
      description: 'Article paragraphs shown on the news detail page.',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'blockContent',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'hy',
          title: 'Armenian',
          type: 'blockContent',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'ru',
          title: 'Russian',
          type: 'blockContent',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'Publication date. Used as the machine-readable date on news cards.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'localizedString',
      description: 'Short label shown on news cards and the article header (for example Center, Programs, Education).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Date, newest',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'date',
      media: 'image',
    },
  },
})
