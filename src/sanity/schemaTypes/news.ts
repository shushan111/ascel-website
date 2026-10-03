import {defineField, defineType} from 'sanity'

const MONTHS_HY = [
  'հունվարի',
  'փետրվարի',
  'մարտի',
  'ապրիլի',
  'մայիսի',
  'հունիսի',
  'հուլիսի',
  'օգոստոսի',
  'սեպտեմբերի',
  'հոկտեմբերի',
  'նոյեմբերի',
  'դեկտեմբերի',
]

export const news = defineType({
  name: 'news',
  title: 'Նորություն',
  type: 'document',
  description: 'Նորությունների էջի և գլխավոր էջի նորությունների բաժնի հոդվածները։',
  groups: [
    {name: 'main', title: 'Հիմնական', default: true},
    {name: 'body', title: 'Հոդվածի տեքստ'},
    {name: 'media', title: 'Լուսանկարներ'},
    {name: 'settings', title: 'Կարգավորումներ'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Վերնագիր',
      type: 'localizedString',
      group: 'main',
      validation: (rule) => rule.required().error('Լրացրու հոդվածի վերնագիրը'),
    }),
    defineField({
      name: 'slug',
      title: 'Հասցե (slug)',
      type: 'slug',
      group: 'settings',
      description:
        'Հոդվածի հասցեն կայքում՝ /news/[slug]։ Սեղմիր «Generate»՝ վերնագրից ավտոմատ ստեղծելու համար։ Հրապարակումից հետո ցանկալի չէ փոխել՝ հին հղումները կդադարեն աշխատել։',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Ստեղծիր հոդվածի հասցեն («Generate» կոճակով)'),
    }),
    defineField({
      name: 'date',
      title: 'Հրապարակման ամսաթիվ',
      type: 'date',
      group: 'main',
      description: 'Ըստ այս ամսաթվի են դասավորվում նորությունները՝ նորից հին։',
      validation: (rule) => rule.required().error('Նշիր հրապարակման ամսաթիվը'),
    }),
    defineField({
      name: 'category',
      title: 'Բաժին',
      type: 'localizedString',
      group: 'main',
      description: 'Կարճ պիտակ քարտի և հոդվածի վերնագրի վերևում (օր.՝ «Կենտրոն», «Ծրագրեր», «Կրթություն»)։',
      validation: (rule) => rule.required().error('Լրացրու բաժնի անվանումը'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Կարճ ամփոփում',
      type: 'localizedText',
      group: 'main',
      description:
        'Երևում է նորության քարտի վրա, հոդվածի սկզբում՝ որպես ներածական, և որոնողական համակարգերում։ Երկու-երեք նախադասություն։',
      validation: (rule) => rule.required().error('Լրացրու կարճ ամփոփումը'),
    }),
    defineField({
      name: 'body',
      title: 'Հոդվածի տեքստ',
      type: 'object',
      group: 'body',
      description: 'Հոդվածի ամբողջական տեքստը՝ երեք լեզվով։',
      fields: [
        defineField({
          name: 'hy',
          title: 'Հայերեն',
          type: 'blockContent',
          validation: (rule) => rule.required().error('Լրացրու հայերեն տեքստը'),
        }),
        defineField({
          name: 'ru',
          title: 'Ռուսերեն',
          type: 'blockContent',
          validation: (rule) => rule.required().error('Լրացրու ռուսերեն տեքստը'),
        }),
        defineField({
          name: 'en',
          title: 'Անգլերեն',
          type: 'blockContent',
          validation: (rule) => rule.required().error('Լրացրու անգլերեն տեքստը'),
        }),
      ],
      validation: (rule) => rule.required().error('Լրացրու հոդվածի տեքստը'),
    }),
    defineField({
      name: 'image',
      title: 'Գլխավոր լուսանկար',
      type: 'image',
      group: 'media',
      description: 'Երևում է նորության քարտի վրա և հոդվածի վերևում։ Hotspot-ով նշիր կարևոր հատվածը։',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Այլընտրանքային տեքստ',
          type: 'localizedString',
          description: 'Նկարի կարճ նկարագրությունը՝ տեսողության խնդիր ունեցողների և որոնողական համակարգերի համար։',
        }),
      ],
      validation: (rule) => rule.required().error('Ավելացրու գլխավոր լուսանկարը'),
    }),
    defineField({
      name: 'gallery',
      title: 'Պատկերասրահ',
      type: 'array',
      group: 'media',
      description: 'Ոչ պարտադիր։ Լրացուցիչ լուսանկարներ, որոնք ցուցադրվում են հոդվածի տեքստից հետո։',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Այլընտրանքային տեքստ',
              type: 'localizedString',
            }),
          ],
        },
      ],
      options: {layout: 'grid'},
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Աղբյուրի հղում',
      type: 'url',
      group: 'settings',
      description: 'Տեխնիկական դաշտ՝ որտեղից է ներմուծվել հոդվածը։ Խմբագրման ենթակա չէ։',
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Ամսաթիվ՝ նորից հին',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Ամսաթիվ՝ հնից նոր',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title.hy',
      titleRu: 'title.ru',
      date: 'date',
      category: 'category.hy',
      categoryRu: 'category.ru',
      media: 'image',
    },
    prepare({title, titleRu, date, category, categoryRu, media}) {
      const day = typeof date === 'string' ? new Date(date) : null
      const shown =
        day && !Number.isNaN(day.getTime())
          ? `${day.getDate()} ${MONTHS_HY[day.getMonth()]} ${day.getFullYear()}`
          : 'Ամսաթիվը նշված չէ'
      return {
        title: title || titleRu || 'Անվերնագիր նորություն',
        subtitle: [shown, category || categoryRu].filter(Boolean).join('  ·  '),
        media,
      }
    },
  },
})
