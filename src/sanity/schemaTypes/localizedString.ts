import {defineField, defineType} from 'sanity'

/**
 * Russian is the required locale: the imported archive is Russian-first, and
 * Armenian and English are filled in as translation lands. The website falls
 * back through `loc()` in src/lib/utils.ts, so a missing translation shows the
 * Russian original rather than an empty field.
 */
function localeFields(type: 'string' | 'text') {
  return [
    defineField({
      name: 'hy',
      title: 'Հայերեն',
      type,
      description: 'Ցուցադրվում է կայքի հայերեն տարբերակում։',
    }),
    defineField({
      name: 'ru',
      title: 'Ռուսերեն',
      type,
      description: 'Պարտադիր լեզու։ Եթե հայերենը կամ անգլերենը լրացված չեն, կայքը ցույց է տալիս հենց ռուսերենը։',
      validation: (rule) => rule.required().error('Լրացրու ռուսերեն տարբերակը'),
    }),
    defineField({
      name: 'en',
      title: 'Անգլերեն',
      type,
      description: 'Ցուցադրվում է կայքի անգլերեն տարբերակում։',
    }),
  ]
}

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Եռալեզու տեքստ (կարճ)',
  type: 'object',
  description: 'Մեկ տողանոց տեքստ՝ երեք լեզվով։',
  fields: localeFields('string'),
})

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Եռալեզու տեքստ (երկար)',
  type: 'object',
  description: 'Պարբերության չափի տեքստ՝ երեք լեզվով։',
  fields: localeFields('text'),
})
