import {defineField, defineType} from 'sanity'

export const course = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'localizedString',
      description: 'Short label shown above the course title (for example Simulation Training, Team Training).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'localizedString',
      description: 'Date text shown on the course card (for example a confirmed date or "Date to be announced").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      description: 'Summary shown on the course card.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration URL',
      type: 'url',
      description: 'External registration link. Leave empty to show the pending registration state on the website.',
    }),
  ],
  orderings: [
    {
      title: 'Created, newest',
      name: 'createdAtDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'type.en',
      media: 'image',
    },
  },
})
