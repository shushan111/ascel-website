import {defineField, defineType} from 'sanity'

function localeFields(type: 'string' | 'text') {
  return [
    defineField({
      name: 'en',
      title: 'English',
      type,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hy',
      title: 'Armenian',
      type,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ru',
      title: 'Russian',
      type,
      validation: (rule) => rule.required(),
    }),
  ]
}

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized string',
  type: 'object',
  fields: localeFields('string'),
})

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized text',
  type: 'object',
  fields: localeFields('text'),
})
