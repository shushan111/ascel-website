import {defineArrayMember, defineField, defineType} from 'sanity'

export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  description:
    'Active program cards and detail pages shown on the homepage Active Programs section and on /programs.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      description: 'Program name shown on the card and used as the card image alternative text.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used for internal URLs: /programs/[slug]',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortTitle',
      title: 'Short title',
      type: 'localizedString',
      description: 'Compact name used in the footer program list. Defaults to the full title when empty.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'localizedString',
      description:
        'Short label shown above the program title on the card (for example Educational Program, Professional Training).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      description: 'Summary shown on the program card and in the detail hero when no long-form profile is set.',
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
      name: 'ctaLabel',
      title: 'Card button label',
      type: 'string',
      description:
        'Which translated Common label to show on the card button (visitWebsite, exploreCourses, or learnMore).',
      options: {
        list: [
          {title: 'Learn more', value: 'learnMore'},
          {title: 'Explore courses', value: 'exploreCourses'},
          {title: 'Visit website', value: 'visitWebsite'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'externalUrlKey',
      title: 'External website key',
      type: 'string',
      description:
        'Optional. Selects the partner URL from the site configuration. Used when the card should link out instead of to /programs/[slug], unless “Has on-site profile page” is enabled.',
      options: {
        list: [
          {title: 'Gyumri Orthopedic School', value: 'gyumriOrthopedicSchool'},
          {title: 'Damage Control Courses', value: 'damageControlCourses'},
          {title: 'Eternal Nation Foundation', value: 'eternalNation'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'hasOnSiteProfile',
      title: 'Has on-site profile page',
      type: 'boolean',
      description:
        'When enabled, the card links to /programs/[slug] even if an external website key is set. Use with a filled Long-form profile for the full profile layout.',
      initialValue: false,
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'localizedText',
      description: 'Longer overview shown on the summary detail page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'relationshipNote',
      title: 'Relationship note',
      type: 'localizedText',
      description: 'Optional callout shown under the overview (for example partner relationship context).',
    }),
    defineField({
      name: 'objectives',
      title: 'Objectives',
      type: 'array',
      of: [defineArrayMember({type: 'localizedText'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'activities',
      title: 'Activities',
      type: 'array',
      of: [defineArrayMember({type: 'localizedText'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'impact',
      title: 'Impact',
      type: 'array',
      of: [defineArrayMember({type: 'localizedText'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'profile',
      title: 'Long-form profile',
      type: 'programProfile',
      description:
        'Optional. When filled, the detail page uses the long-form profile layout instead of the summary layout.',
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
      subtitle: 'category.en',
      media: 'image',
    },
  },
})
