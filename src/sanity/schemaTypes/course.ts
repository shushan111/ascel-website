import {defineField, defineType} from 'sanity'

export const course = defineType({
  name: 'course',
  title: 'Դասընթաց',
  type: 'document',
  description: 'Դասընթացների էջի քարտերը և յուրաքանչյուր դասընթացի առանձին էջը։',
  groups: [
    {name: 'main', title: 'Հիմնական', default: true},
    {name: 'body', title: 'Դասընթացի էջ'},
    {name: 'media', title: 'Լուսանկարներ'},
    {name: 'settings', title: 'Կարգավորումներ'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Անվանում',
      type: 'localizedString',
      group: 'main',
      validation: (rule) => rule.required().error('Լրացրու դասընթացի անվանումը'),
    }),
    defineField({
      name: 'status',
      title: 'Կարգավիճակ',
      type: 'string',
      group: 'main',
      description: 'Առաջիկա դասընթացները ցուցադրվում են ցանկի վերևում, անցածները՝ արխիվի բաժնում։',
      options: {
        list: [
          {title: 'Առաջիկա', value: 'upcoming'},
          {title: 'Անցած', value: 'past'},
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
      validation: (rule) => rule.required().error('Ընտրիր դասընթացի կարգավիճակը'),
    }),
    defineField({
      name: 'type',
      title: 'Տեսակ',
      type: 'localizedString',
      group: 'main',
      description: 'Կարճ պիտակ անվանման վերևում (օր.՝ «Սիմուլյացիոն վերապատրաստում», «Թիմային ուսուցում»)։',
      validation: (rule) => rule.required().error('Լրացրու դասընթացի տեսակը'),
    }),
    defineField({
      name: 'date',
      title: 'Ամսաթիվ (տեքստով)',
      type: 'localizedString',
      group: 'main',
      description:
        'Ազատ տեքստ, ինչպես երևալու է քարտի վրա՝ «2025 թ. մայիսի 23–24» կամ «Ամսաթիվը կհստակեցվի»։',
      validation: (rule) => rule.required().error('Լրացրու ամսաթիվը'),
    }),
    defineField({
      name: 'location',
      title: 'Վայր',
      type: 'localizedString',
      group: 'main',
      description: 'Օրինակ՝ «Գյումրի, Հայաստան»։',
      validation: (rule) => rule.required().error('Լրացրու անցկացման վայրը'),
    }),
    defineField({
      name: 'instructor',
      title: 'Դասախոս',
      type: 'localizedString',
      group: 'main',
      description:
        'Ոչ պարտադիր։ Ներմուծված արխիվային դասընթացներում դատարկ է, քանի որ դասախոսների ցանկը նշված է դասընթացի տեքստի ներսում։',
    }),
    defineField({
      name: 'description',
      title: 'Կարճ նկարագրություն',
      type: 'localizedText',
      group: 'main',
      description: 'Ամփոփումը, որը երևում է դասընթացի քարտի վրա։',
      validation: (rule) => rule.required().error('Լրացրու կարճ նկարագրությունը'),
    }),
    defineField({
      name: 'body',
      title: 'Դասընթացի ամբողջական տեքստ',
      type: 'object',
      group: 'body',
      description: 'Ծրագիր, դասախոսներ, մասնակցության պայմաններ։ Կարելի է ավելացնել նաև ժամանակացույցի աղյուսակ։',
      fields: [
        defineField({name: 'hy', title: 'Հայերեն', type: 'blockContent'}),
        defineField({name: 'ru', title: 'Ռուսերեն', type: 'blockContent'}),
        defineField({name: 'en', title: 'Անգլերեն', type: 'blockContent'}),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Գլխավոր լուսանկար',
      type: 'image',
      group: 'media',
      description: 'Երևում է քարտի վրա և դասընթացի էջի վերևում։',
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
      description: 'Ոչ պարտադիր։ Դասընթացի լրացուցիչ լուսանկարները՝ տեքստից հետո։',
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
      name: 'slug',
      title: 'Հասցե (slug)',
      type: 'slug',
      group: 'settings',
      description:
        'Դասընթացի հասցեն կայքում՝ /courses/[slug]։ Սեղմիր «Generate»։ Հրապարակումից հետո ցանկալի չէ փոխել։',
      options: {
        source: 'title.ru',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Ստեղծիր դասընթացի հասցեն («Generate» կոճակով)'),
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Գրանցման հղում',
      type: 'url',
      group: 'settings',
      description:
        'Արտաքին գրանցման հղում։ Դատարկ թողնելու դեպքում կայքում գրվում է, որ գրանցումը դեռ բաց չէ։',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}).error('Հղումը պետք է սկսվի http:// կամ https:// -ով'),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Աղբյուրի հղում',
      type: 'url',
      group: 'settings',
      description: 'Տեխնիկական դաշտ՝ որտեղից է ներմուծվել դասընթացը։ Խմբագրման ենթակա չէ։',
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Ավելացման ամսաթիվ՝ նորից հին',
      name: 'createdAtDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title.hy',
      titleRu: 'title.ru',
      status: 'status',
      date: 'date.hy',
      dateRu: 'date.ru',
      media: 'image',
    },
    prepare({title, titleRu, status, date, dateRu, media}) {
      return {
        title: title || titleRu || 'Անվերնագիր դասընթաց',
        subtitle: [status === 'past' ? 'Անցած' : 'Առաջիկա', date || dateRu]
          .filter(Boolean)
          .join('  ·  '),
        media,
      }
    },
  },
})
