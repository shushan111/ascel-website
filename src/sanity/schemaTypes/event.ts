import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description:
        'Event date. Used for sorting upcoming events and for the month/day badge on event cards.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      description: 'Summary shown on the event card.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link path',
      type: 'string',
      description: 'Internal site path for the View Event button (for example /courses, /news, or /simulation-center).',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Date, soonest',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
    {
      title: 'Date, latest',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'date',
    },
  },
})
