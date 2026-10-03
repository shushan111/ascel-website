import {defineField, defineType} from 'sanity'

const MONTHS_HY = [
  'հունվար',
  'փետրվար',
  'մարտ',
  'ապրիլ',
  'մայիս',
  'հունիս',
  'հուլիս',
  'օգոստոս',
  'սեպտեմբեր',
  'հոկտեմբեր',
  'նոյեմբեր',
  'դեկտեմբեր',
]

export const event = defineType({
  name: 'event',
  title: 'Միջոցառում',
  type: 'document',
  description:
    'Գլխավոր էջի «Առաջիկա միջոցառումներ» բաժնի քարտերը։ Անցած ամսաթվով միջոցառումներն ինքնաբերաբար դուրս են գալիս ցանկից։',
  fields: [
    defineField({
      name: 'title',
      title: 'Անվանում',
      type: 'localizedString',
      validation: (rule) => rule.required().error('Լրացրու միջոցառման անվանումը'),
    }),
    defineField({
      name: 'date',
      title: 'Ամսաթիվ',
      type: 'date',
      description:
        'Միջոցառման օրը։ Օգտագործվում է դասավորության համար և քարտի վրա՝ ամիս/օր նշագրի տեսքով։',
      validation: (rule) => rule.required().error('Նշիր միջոցառման ամսաթիվը'),
    }),
    defineField({
      name: 'location',
      title: 'Վայր',
      type: 'localizedString',
      description: 'Օրինակ՝ «Գյումրի, Հայաստան» կամ կոնկրետ հասցե։',
      validation: (rule) => rule.required().error('Լրացրու անցկացման վայրը'),
    }),
    defineField({
      name: 'description',
      title: 'Նկարագրություն',
      type: 'localizedText',
      description: 'Կարճ ամփոփում, որը երևում է միջոցառման քարտի վրա։',
      validation: (rule) => rule.required().error('Լրացրու կարճ նկարագրությունը'),
    }),
    defineField({
      name: 'href',
      title: 'Հղման հասցե կայքում',
      type: 'string',
      description:
        'Ո՞ր էջին տանի «Տեսնել միջոցառումը» կոճակը։ Ներքին հասցե է՝ /courses, /news կամ /simulation-center։',
      validation: (rule) =>
        rule
          .required()
          .error('Նշիր, թե որ էջին է տանելու կոճակը')
          .custom((value?: string) =>
            !value || value.startsWith('/') ? true : 'Հասցեն պետք է սկսվի «/» նշանով',
          ),
    }),
  ],
  orderings: [
    {
      title: 'Ամսաթիվ՝ մոտակայից',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
    {
      title: 'Ամսաթիվ՝ վերջիններից',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title.hy',
      titleRu: 'title.ru',
      date: 'date',
      location: 'location.hy',
      locationRu: 'location.ru',
    },
    prepare({title, titleRu, date, location, locationRu}) {
      const day = typeof date === 'string' ? new Date(date) : null
      const shown =
        day && !Number.isNaN(day.getTime())
          ? `${day.getDate()} ${MONTHS_HY[day.getMonth()]} ${day.getFullYear()}`
          : 'Ամսաթիվը նշված չէ'
      const past = day && !Number.isNaN(day.getTime()) && day < new Date(new Date().toDateString())
      return {
        title: title || titleRu || 'Անվերնագիր միջոցառում',
        subtitle: [shown, location || locationRu, past ? '● Անցած' : null]
          .filter(Boolean)
          .join('  ·  '),
      }
    },
  },
})
