import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * A row of a programme table. The source courses publish their schedules as
 * time / topic / lecturer tables, which Portable Text has no native block for,
 * so they are carried as an embedded object instead of being flattened into
 * prose.
 */
export const contentTableRow = defineType({
  name: 'contentTableRow',
  title: 'Աղյուսակի տող',
  type: 'object',
  fields: [
    defineField({
      name: 'cells',
      title: 'Վանդակներ',
      type: 'array',
      description: 'Տողի վանդակները՝ ձախից աջ։ Յուրաքանչյուր վանդակ առանձին տող է։',
      of: [{type: 'string'}],
    }),
  ],
  preview: {
    select: {cells: 'cells'},
    prepare: ({cells}: {cells?: string[]}) => ({
      title: (cells ?? []).filter(Boolean).join('  ·  ') || 'Դատարկ տող',
    }),
  },
})

export const contentTable = defineType({
  name: 'contentTable',
  title: 'Աղյուսակ',
  type: 'object',
  description: 'Օրինակ՝ դասընթացի ժամանակացույց՝ ժամ / թեմա / դասախոս։',
  fields: [
    defineField({
      name: 'hasHeader',
      title: 'Առաջին տողը վերնագրային է',
      type: 'boolean',
      description: 'Միացրու, եթե առաջին տողը սյուների անվանումներն են։',
      initialValue: false,
    }),
    defineField({
      name: 'rows',
      title: 'Տողեր',
      type: 'array',
      of: [defineArrayMember({type: 'contentTableRow'})],
      validation: (rule) => rule.min(1).error('Ավելացրու գոնե մեկ տող'),
    }),
  ],
  preview: {
    select: {rows: 'rows'},
    prepare: ({rows}: {rows?: unknown[]}) => ({
      title: `Աղյուսակ — ${rows?.length ?? 0} տող`,
    }),
  },
})

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Տեքստ ձևաչափմամբ',
  type: 'array',
  description: 'Պարբերություններ, վերնագրեր, ցանկեր և աղյուսակներ։',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Սովորական տեքստ', value: 'normal'},
        {title: 'Վերնագիր', value: 'h2'},
        {title: 'Ենթավերնագիր', value: 'h3'},
      ],
      lists: [
        {title: 'Կետանշված ցանկ', value: 'bullet'},
        {title: 'Համարակալված ցանկ', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Թավ', value: 'strong'},
          {title: 'Շեղ', value: 'em'},
        ],
      },
    }),
    defineArrayMember({type: 'contentTable'}),
  ],
})
