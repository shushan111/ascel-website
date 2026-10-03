import {defineArrayMember, defineField, defineType} from 'sanity'

export const programFact = defineType({
  name: 'programFact',
  title: 'Փաստ',
  type: 'object',
  description: 'Մեկ բջիջ էջի վերևի փաստերի շերտում՝ անվանում և արժեք։',
  fields: [
    defineField({
      name: 'label',
      title: 'Անվանում',
      type: 'localizedString',
      description: 'Օրինակ՝ «Գործում է», «Ձևաչափ», «Մասնակիցներ»։',
      validation: (rule) => rule.required().error('Լրացրու փաստի անվանումը'),
    }),
    defineField({
      name: 'value',
      title: 'Արժեք',
      type: 'localizedString',
      description: 'Օրինակ՝ «2019 թվականից», «Երկօրյա դասընթաց», «153 վիրաբույժ»։',
      validation: (rule) => rule.required().error('Լրացրու փաստի արժեքը'),
    }),
  ],
  preview: {
    select: {title: 'label.hy', titleRu: 'label.ru', subtitle: 'value.hy', subtitleRu: 'value.ru'},
    prepare: ({title, titleRu, subtitle, subtitleRu}) => ({
      title: title || titleRu || 'Փաստ',
      subtitle: subtitle || subtitleRu,
    }),
  },
})

export const programTopic = defineType({
  name: 'programTopic',
  title: 'Քարտ',
  type: 'object',
  description: 'Փոքր քարտ՝ վերնագիր և մեկ-երկու նախադասություն։',
  fields: [
    defineField({
      name: 'title',
      title: 'Վերնագիր',
      type: 'localizedString',
      validation: (rule) => rule.required().error('Լրացրու քարտի վերնագիրը'),
    }),
    defineField({
      name: 'description',
      title: 'Նկարագրություն',
      type: 'localizedText',
      validation: (rule) => rule.required().error('Լրացրու քարտի նկարագրությունը'),
    }),
  ],
  preview: {
    select: {title: 'title.hy', titleRu: 'title.ru', subtitle: 'description.hy', subtitleRu: 'description.ru'},
    prepare: ({title, titleRu, subtitle, subtitleRu}) => ({
      title: title || titleRu || 'Քարտ',
      subtitle: subtitle || subtitleRu,
    }),
  },
})

export const programMilestone = defineType({
  name: 'programMilestone',
  title: 'Իրադարձություն',
  type: 'object',
  description: 'Ժամանակագրության մեկ տող՝ ամսաթիվ, վերնագիր և նկարագրություն։',
  fields: [
    defineField({
      name: 'date',
      title: 'Ամսաթիվ (տեքստով)',
      type: 'localizedString',
      description: 'Ազատ տեքստ՝ «2025», «2024 թ. հունվար», «2023 թ. մայիսի 25–27»։',
      validation: (rule) => rule.required().error('Լրացրու ամսաթիվը'),
    }),
    defineField({
      name: 'title',
      title: 'Վերնագիր',
      type: 'localizedString',
      validation: (rule) => rule.required().error('Լրացրու իրադարձության վերնագիրը'),
    }),
    defineField({
      name: 'description',
      title: 'Նկարագրություն',
      type: 'localizedText',
      validation: (rule) => rule.required().error('Լրացրու իրադարձության նկարագրությունը'),
    }),
  ],
  preview: {
    select: {title: 'title.hy', titleRu: 'title.ru', subtitle: 'date.hy', subtitleRu: 'date.ru'},
    prepare: ({title, titleRu, subtitle, subtitleRu}) => ({
      title: title || titleRu || 'Իրադարձություն',
      subtitle: subtitle || subtitleRu,
    }),
  },
})

export const programNarrative = defineType({
  name: 'programNarrative',
  title: 'Բաժին',
  type: 'object',
  description: 'Բաժնի վերնագիրը և նրա պարբերությունները։',
  fields: [
    defineField({
      name: 'title',
      title: 'Բաժնի վերնագիր',
      type: 'localizedString',
      validation: (rule) => rule.required().error('Լրացրու բաժնի վերնագիրը'),
    }),
    defineField({
      name: 'body',
      title: 'Պարբերություններ',
      type: 'array',
      description: 'Յուրաքանչյուր տարրը՝ առանձին պարբերություն։',
      of: [defineArrayMember({type: 'localizedText'})],
      validation: (rule) => rule.required().min(1).error('Ավելացրու գոնե մեկ պարբերություն'),
    }),
  ],
  preview: {
    select: {title: 'title.hy', titleRu: 'title.ru'},
    prepare: ({title, titleRu}) => ({title: title || titleRu || 'Բաժին'}),
  },
})

export const programProfile = defineType({
  name: 'programProfile',
  title: 'Երկար ֆորմատի էջ',
  type: 'object',
  description:
    'Լրացնելու դեպքում ծրագրի էջը ցուցադրվում է ընդարձակ տեսքով՝ փաստերի շերտ, «Մասին», «Առաքելություն», «Ուսուցում», «Ում համար է», «Ուղղություններ», ժամանակագրություն և վերջի կոճակ։',
  options: {collapsible: true, collapsed: false},
  fields: [
    defineField({
      name: 'tagline',
      title: 'Ենթավերնագիր',
      type: 'localizedText',
      description: 'Մեկ-երկու նախադասություն էջի վերնագրի տակ։ Այս դաշտը լրացնելն է «միացնում» երկար ֆորմատի էջը։',
      validation: (rule) => rule.required().error('Լրացրու ենթավերնագիրը'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Նկարագրություն որոնողների համար (SEO)',
      type: 'localizedText',
      description: 'Երևում է Google-ի արդյունքներում և սոցցանցերում հղումը կիսվելիս։ Մոտ 150–160 նիշ։',
      validation: (rule) => rule.required().error('Լրացրու SEO նկարագրությունը'),
    }),
    defineField({
      name: 'facts',
      title: 'Փաստերի շերտ',
      type: 'array',
      description: 'Էջի վերևի կարճ ցուցանիշները։ Լավագույնը՝ 4 փաստ։',
      of: [defineArrayMember({type: 'programFact'})],
      validation: (rule) => rule.required().min(1).error('Ավելացրու գոնե մեկ փաստ'),
    }),
    defineField({
      name: 'about',
      title: 'Բաժին՝ «Մասին»',
      type: 'programNarrative',
      description: 'Ծրագրի պատմությունը և բովանդակությունը՝ մի քանի պարբերությամբ։',
      validation: (rule) => rule.required().error('Լրացրու «Մասին» բաժինը'),
    }),
    defineField({
      name: 'mission',
      title: 'Բաժին՝ «Առաքելություն»',
      type: 'object',
      description: 'Պարբերություններ ձախ կողմում և համարակալված ցանկ՝ աջ կողմում։',
      fields: [
        defineField({
          name: 'title',
          title: 'Բաժնի վերնագիր',
          type: 'localizedString',
          validation: (rule) => rule.required().error('Լրացրու բաժնի վերնագիրը'),
        }),
        defineField({
          name: 'body',
          title: 'Պարբերություններ',
          type: 'array',
          of: [defineArrayMember({type: 'localizedText'})],
          validation: (rule) => rule.required().min(1).error('Ավելացրու գոնե մեկ պարբերություն'),
        }),
        defineField({
          name: 'points',
          title: 'Համարակալված կետեր',
          type: 'array',
          description: 'Ցուցադրվում են աջ սյունակում՝ 01, 02, 03 համարակալմամբ։',
          of: [defineArrayMember({type: 'localizedText'})],
          validation: (rule) => rule.required().min(1).error('Ավելացրու գոնե մեկ կետ'),
        }),
      ],
      validation: (rule) => rule.required().error('Լրացրու «Առաքելություն» բաժինը'),
    }),
    defineField({
      name: 'education',
      title: 'Բաժին՝ «Ուսուցում»',
      type: 'object',
      description: 'Ինչպես է կազմակերպված ուսուցումը՝ պարբերություններ և քարտեր։',
      fields: [
        defineField({
          name: 'title',
          title: 'Բաժնի վերնագիր',
          type: 'localizedString',
          validation: (rule) => rule.required().error('Լրացրու բաժնի վերնագիրը'),
        }),
        defineField({
          name: 'body',
          title: 'Պարբերություններ',
          type: 'array',
          of: [defineArrayMember({type: 'localizedText'})],
          validation: (rule) => rule.required().min(1).error('Ավելացրու գոնե մեկ պարբերություն'),
        }),
        defineField({
          name: 'formats',
          title: 'Ձևաչափերի քարտեր',
          type: 'array',
          description: 'Ուսուցման ձևերը՝ քարտերով (օր.՝ «Տեսական օր», «Գործնական աշխատանք»)։',
          of: [defineArrayMember({type: 'programTopic'})],
          validation: (rule) => rule.required().min(1).error('Ավելացրու գոնե մեկ քարտ'),
        }),
      ],
      validation: (rule) => rule.required().error('Լրացրու «Ուսուցում» բաժինը'),
    }),
    defineField({
      name: 'audience',
      title: 'Բաժին՝ «Ում համար է»',
      type: 'object',
      description: 'Ում է հասցեագրված ծրագիրը՝ պարբերություններ և խմբերի քարտեր։',
      fields: [
        defineField({
          name: 'title',
          title: 'Բաժնի վերնագիր',
          type: 'localizedString',
          validation: (rule) => rule.required().error('Լրացրու բաժնի վերնագիրը'),
        }),
        defineField({
          name: 'body',
          title: 'Պարբերություններ',
          type: 'array',
          of: [defineArrayMember({type: 'localizedText'})],
          validation: (rule) => rule.required().min(1).error('Ավելացրու գոնե մեկ պարբերություն'),
        }),
        defineField({
          name: 'groups',
          title: 'Լսարանի խմբեր',
          type: 'array',
          description: 'Մասնագիտական խմբերը՝ քարտերով։',
          of: [defineArrayMember({type: 'programTopic'})],
          validation: (rule) => rule.required().min(1).error('Ավելացրու գոնե մեկ խումբ'),
        }),
      ],
      validation: (rule) => rule.required().error('Լրացրու «Ում համար է» բաժինը'),
    }),
    defineField({
      name: 'focusAreas',
      title: 'Բաժին՝ «Ուղղություններ»',
      type: 'object',
      description: 'Ծրագրի բովանդակային ուղղությունները՝ պարբերություններ և քարտեր։',
      fields: [
        defineField({
          name: 'title',
          title: 'Բաժնի վերնագիր',
          type: 'localizedString',
          validation: (rule) => rule.required().error('Լրացրու բաժնի վերնագիրը'),
        }),
        defineField({
          name: 'body',
          title: 'Պարբերություններ',
          type: 'array',
          of: [defineArrayMember({type: 'localizedText'})],
          validation: (rule) => rule.required().min(1).error('Ավելացրու գոնե մեկ պարբերություն'),
        }),
        defineField({
          name: 'areas',
          title: 'Ուղղությունների քարտեր',
          type: 'array',
          of: [defineArrayMember({type: 'programTopic'})],
          validation: (rule) => rule.required().min(1).error('Ավելացրու գոնե մեկ ուղղություն'),
        }),
      ],
      validation: (rule) => rule.required().error('Լրացրու «Ուղղություններ» բաժինը'),
    }),
    defineField({
      name: 'highlights',
      title: 'Բաժին՝ ժամանակագրություն',
      type: 'object',
      description: 'Ծրագրի կարևոր իրադարձությունները՝ ժամանակագրական ցանկով։',
      fields: [
        defineField({
          name: 'title',
          title: 'Բաժնի վերնագիր',
          type: 'localizedString',
          validation: (rule) => rule.required().error('Լրացրու բաժնի վերնագիրը'),
        }),
        defineField({
          name: 'body',
          title: 'Պարբերություններ',
          type: 'array',
          of: [defineArrayMember({type: 'localizedText'})],
          validation: (rule) => rule.required().min(1).error('Ավելացրու գոնե մեկ պարբերություն'),
        }),
        defineField({
          name: 'milestones',
          title: 'Իրադարձություններ',
          type: 'array',
          description: 'Դասավորիր այնպես, ինչպես պետք է երևան էջում՝ սովորաբար նորից հին։',
          of: [defineArrayMember({type: 'programMilestone'})],
          validation: (rule) => rule.required().min(1).error('Ավելացրու գոնե մեկ իրադարձություն'),
        }),
      ],
      validation: (rule) => rule.required().error('Լրացրու ժամանակագրության բաժինը'),
    }),
    defineField({
      name: 'cta',
      title: 'Վերջի կոճակ',
      type: 'object',
      description:
        'Ոչ պարտադիր։ Բոլոր դաշտերը դատարկ թող, եթե ծրագիրն իր կայքը չունի — այդ դեպքում կոճակը չի ցուցադրվում։',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Վերնագրիկ',
          type: 'localizedString',
          description: 'Մանր տեքստ վերնագրի վերևում (օր.՝ «Պաշտոնական կայք»)։',
        }),
        defineField({
          name: 'title',
          title: 'Վերնագիր',
          type: 'localizedString',
          validation: (rule) => rule.required().error('Լրացրու կոճակի բլոկի վերնագիրը'),
        }),
        defineField({
          name: 'body',
          title: 'Տեքստ',
          type: 'localizedText',
          validation: (rule) => rule.required().error('Լրացրու բլոկի տեքստը'),
        }),
        defineField({
          name: 'label',
          title: 'Կոճակի մակագրություն',
          type: 'localizedString',
          validation: (rule) => rule.required().error('Լրացրու կոճակի մակագրությունը'),
        }),
        defineField({
          name: 'url',
          title: 'Կոճակի հղում',
          type: 'url',
          description: 'Արտաքին կայքի հասցեն։ Առանց այս դաշտի կոճակը չի ցուցադրվում։',
          validation: (rule) =>
            rule.uri({scheme: ['http', 'https']}).error('Հղումը պետք է սկսվի http:// կամ https:// -ով'),
        }),
      ],
    }),
    defineField({
      name: 'sourceNote',
      title: 'Աղբյուրի ծանոթագրություն',
      type: 'localizedText',
      description:
        'Ոչ պարտադիր։ Մանր տեքստ էջի ամենաներքևում՝ օրինակ, թե որտեղից է վերցված տեղեկությունը։',
    }),
  ],
})
