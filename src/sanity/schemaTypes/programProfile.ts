import {defineArrayMember, defineField, defineType} from 'sanity'

export const programFact = defineType({
  name: 'programFact',
  title: 'Program fact',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label.en', subtitle: 'value.en'},
  },
})

export const programTopic = defineType({
  name: 'programTopic',
  title: 'Program topic',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'description.en'},
  },
})

export const programMilestone = defineType({
  name: 'programMilestone',
  title: 'Program milestone',
  type: 'object',
  fields: [
    defineField({
      name: 'date',
      title: 'Date',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'date.en'},
  },
})

export const programNarrative = defineType({
  name: 'programNarrative',
  title: 'Program narrative',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [defineArrayMember({type: 'localizedText'})],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'title.en'},
  },
})

export const programProfile = defineType({
  name: 'programProfile',
  title: 'Long-form profile',
  type: 'object',
  description:
    'Optional long-form profile layout (facts strip, about, mission, education, audience, focus areas, milestones, CTA). When present, the detail page uses this layout instead of the summary layout.',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'localizedText',
      description: 'Shown under the title in the detail hero.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'facts',
      title: 'Facts',
      type: 'array',
      of: [defineArrayMember({type: 'programFact'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'programNarrative',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [defineArrayMember({type: 'localizedText'})],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: 'points',
          title: 'Points',
          type: 'array',
          of: [defineArrayMember({type: 'localizedText'})],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [defineArrayMember({type: 'localizedText'})],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: 'formats',
          title: 'Formats',
          type: 'array',
          of: [defineArrayMember({type: 'programTopic'})],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'audience',
      title: 'Audience',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [defineArrayMember({type: 'localizedText'})],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: 'groups',
          title: 'Groups',
          type: 'array',
          of: [defineArrayMember({type: 'programTopic'})],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'focusAreas',
      title: 'Focus areas',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [defineArrayMember({type: 'localizedText'})],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: 'areas',
          title: 'Areas',
          type: 'array',
          of: [defineArrayMember({type: 'programTopic'})],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [defineArrayMember({type: 'localizedText'})],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: 'milestones',
          title: 'Milestones',
          type: 'array',
          of: [defineArrayMember({type: 'programMilestone'})],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Call to action',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'localizedText',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'label',
          title: 'Button label',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sourceNote',
      title: 'Source note',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
  ],
})
