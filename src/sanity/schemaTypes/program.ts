import {defineArrayMember, defineField, defineType} from 'sanity'

export const program = defineType({
  name: 'program',
  title: 'Ծրագիր',
  type: 'document',
  description:
    'Գլխավոր էջի «Գործող ծրագրեր» բաժնի և /programs էջի քարտերը, ինչպես նաև յուրաքանչյուր ծրագրի առանձին էջը։',
  groups: [
    {name: 'main', title: 'Հիմնական', default: true},
    {name: 'summary', title: 'Կարճ էջ'},
    {name: 'profile', title: 'Երկար էջ'},
    {name: 'media', title: 'Լուսանկարներ'},
    {name: 'settings', title: 'Կարգավորումներ'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Անվանում',
      type: 'localizedString',
      group: 'main',
      description: 'Ծրագրի անունը՝ քարտի և էջի վերնագրում։',
      validation: (rule) => rule.required().error('Լրացրու ծրագրի անվանումը'),
    }),
    defineField({
      name: 'shortTitle',
      title: 'Կարճ անվանում',
      type: 'localizedString',
      group: 'main',
      description: 'Ոչ պարտադիր։ Օգտագործվում է կայքի ստորին հատվածի ծրագրերի ցանկում։ Դատարկ թողնելու դեպքում վերցվում է լրիվ անվանումը։',
    }),
    defineField({
      name: 'category',
      title: 'Ուղղություն',
      type: 'localizedString',
      group: 'main',
      description: 'Կարճ պիտակ անվանման վերևում (օր.՝ «Կրթական ծրագիր», «Մասնագիտական վերապատրաստում»)։',
      validation: (rule) => rule.required().error('Լրացրու ծրագրի ուղղությունը'),
    }),
    defineField({
      name: 'description',
      title: 'Կարճ նկարագրություն',
      type: 'localizedText',
      group: 'main',
      description: 'Ամփոփումը, որը երևում է ծրագրի քարտի վրա։',
      validation: (rule) => rule.required().error('Լրացրու կարճ նկարագրությունը'),
    }),
    defineField({
      name: 'image',
      title: 'Գլխավոր լուսանկար',
      type: 'image',
      group: 'media',
      description: 'Երևում է և՛ քարտի վրա, և՛ ծրագրի էջի վերևում։ Hotspot-ով նշիր կարևոր հատվածը՝ կտրվածքները ճիշտ դասավորվելու համար։',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required().error('Ավելացրու գլխավոր լուսանկարը'),
    }),

    // --- Կարճ էջ ------------------------------------------------------------
    defineField({
      name: 'overview',
      title: 'Ակնարկ',
      type: 'localizedText',
      group: 'summary',
      description: 'Ընդարձակ նկարագրություն՝ կարճ էջի վերևում։',
      validation: (rule) => rule.required().error('Լրացրու ծրագրի ակնարկը'),
    }),
    defineField({
      name: 'relationshipNote',
      title: 'Գործընկերային ծանոթագրություն',
      type: 'localizedText',
      group: 'summary',
      description: 'Ոչ պարտադիր։ Ընդգծված նշում ակնարկի տակ՝ օրինակ, թե ինչ կապ ունի ծրագիրը կենտրոնի հետ։',
    }),
    defineField({
      name: 'objectives',
      title: 'Նպատակներ',
      type: 'array',
      group: 'summary',
      description: 'Ցանկ՝ մեկ կետը մեկ նախադասություն։',
      of: [defineArrayMember({type: 'localizedText'})],
      validation: (rule) => rule.required().min(1).error('Ավելացրու գոնե մեկ նպատակ'),
    }),
    defineField({
      name: 'activities',
      title: 'Գործունեություն',
      type: 'array',
      group: 'summary',
      description: 'Ինչով է զբաղվում ծրագիրը՝ կետերով։',
      of: [defineArrayMember({type: 'localizedText'})],
      validation: (rule) => rule.required().min(1).error('Ավելացրու գոնե մեկ կետ'),
    }),
    defineField({
      name: 'impact',
      title: 'Արդյունքներ',
      type: 'array',
      group: 'summary',
      description: 'Ծրագրի տված արդյունքները՝ կետերով (թվեր, ընդգրկույթ, ձեռքբերումներ)։',
      of: [defineArrayMember({type: 'localizedText'})],
      validation: (rule) => rule.required().min(1).error('Ավելացրու գոնե մեկ արդյունք'),
    }),

    // --- Երկար էջ -----------------------------------------------------------
    defineField({
      name: 'profile',
      title: 'Երկար ֆորմատի էջ',
      type: 'programProfile',
      group: 'profile',
      description:
        'Ոչ պարտադիր։ Լրացնելու դեպքում ծրագրի էջը ստանում է ընդարձակ տեսք՝ փաստերի շերտ, բաժիններ և ժամանակագրություն՝ կարճ էջի փոխարեն։',
    }),

    // --- Կարգավորումներ -----------------------------------------------------
    defineField({
      name: 'slug',
      title: 'Հասցե (slug)',
      type: 'slug',
      group: 'settings',
      description: 'Ծրագրի հասցեն կայքում՝ /programs/[slug]։ Սեղմիր «Generate»։ Հրապարակումից հետո ցանկալի չէ փոխել։',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Ստեղծիր ծրագրի հասցեն («Generate» կոճակով)'),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Քարտի կոճակի մակագրություն',
      type: 'string',
      group: 'settings',
      description: 'Ո՞ր պատրաստի մակագրությունը ցուցադրվի ծրագրի քարտի կոճակին։ Թարգմանությունները կայքում արդեն կան։',
      options: {
        list: [
          {title: 'Իմանալ ավելին', value: 'learnMore'},
          {title: 'Տեսնել դասընթացները', value: 'exploreCourses'},
          {title: 'Այցելել կայք', value: 'visitWebsite'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().error('Ընտրիր կոճակի մակագրությունը'),
    }),
    defineField({
      name: 'externalUrlKey',
      title: 'Արտաքին կայքի բանալի',
      type: 'string',
      group: 'settings',
      description:
        'Ոչ պարտադիր։ Ընտրում է գործընկերոջ կայքի հասցեն կայքի կարգավորումների ֆայլից։ Օգտագործվում է, երբ քարտը պետք է տանի դեպի արտաքին կայք՝ ներքին էջի փոխարեն։',
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
      title: 'Ունի էջ մեր կայքում',
      type: 'boolean',
      group: 'settings',
      description:
        'Միացրու, որ քարտը տանի մեր կայքի /programs/[slug] էջին՝ նույնիսկ եթե արտաքին կայքի բանալի է ընտրված։ Օգտագործիր լրացված երկար էջի հետ։',
      initialValue: false,
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
      category: 'category.hy',
      categoryRu: 'category.ru',
      hasProfile: 'profile.tagline.ru',
      onSite: 'hasOnSiteProfile',
      media: 'image',
    },
    prepare({title, titleRu, category, categoryRu, hasProfile, onSite, media}) {
      return {
        title: title || titleRu || 'Անվերնագիր ծրագիր',
        subtitle: [
          category || categoryRu,
          hasProfile ? 'Երկար էջ' : 'Կարճ էջ',
          onSite === false && !hasProfile ? '● Տանում է արտաքին կայք' : null,
        ]
          .filter(Boolean)
          .join('  ·  '),
        media,
      }
    },
  },
})
