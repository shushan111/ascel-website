import {defineField, defineType} from 'sanity'

import {apiVersion} from '../env'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_PHOTO_BYTES = 5 * 1024 * 1024

type ImageValue = {asset?: {_ref?: string}} | undefined

type LocalizedValue = {hy?: string; ru?: string; en?: string} | undefined

const LOCALES: Array<{key: 'hy' | 'ru' | 'en'; title: string}> = [
  {key: 'hy', title: 'հայերեն'},
  {key: 'ru', title: 'ռուսերեն'},
  {key: 'en', title: 'անգլերեն'},
]

/** Names and roles are shown in all three site languages, so all three are
 * required here — unlike the site-wide localizedString, which only insists on
 * Russian and falls back for the rest. */
function requireAllLocales(value: LocalizedValue, {optional = false} = {}) {
  const filled = LOCALES.filter(({key}) => value?.[key]?.trim())
  if (!filled.length) return optional ? true : 'Լրացրու երեք լեզվով՝ հայերեն, ռուսերեն և անգլերեն'
  const missing = LOCALES.filter(({key}) => !value?.[key]?.trim())
  if (!missing.length) return true
  return `Մնացել է լրացնել՝ ${missing.map(({title}) => title).join(', ')}`
}

export const founder = defineType({
  name: 'founder',
  title: 'Հիմնադիր',
  type: 'document',
  description:
    'Գլխավոր էջի և «Մեր մասին» էջի «Հիմնադիրներ» բաժնի քարտերը։ Ոչ ակտիվ հիմնադիրները մնում են այստեղ, բայց կայքում չեն երևում։',
  groups: [
    {name: 'main', title: 'Հիմնական', default: true},
    {name: 'photo', title: 'Լուսանկար'},
    {name: 'settings', title: 'Կարգավորումներ'},
  ],
  fields: [
    defineField({
      name: 'firstName',
      title: 'Անուն',
      type: 'localizedString',
      group: 'main',
      description: 'Քարտի վրա անունն ու ազգանունը ցուցադրվում են միասին։ Լրացրու երեք լեզվով։',
      validation: (rule) =>
        rule
          .required()
          .error('Լրացրու հիմնադրի անունը')
          .custom((value: LocalizedValue) => requireAllLocales(value)),
    }),
    defineField({
      name: 'lastName',
      title: 'Ազգանուն',
      type: 'localizedString',
      group: 'main',
      validation: (rule) =>
        rule
          .required()
          .error('Լրացրու հիմնադրի ազգանունը')
          .custom((value: LocalizedValue) => requireAllLocales(value)),
    }),
    defineField({
      name: 'role',
      title: 'Պաշտոն',
      type: 'localizedString',
      group: 'main',
      description:
        'Ոչ պարտադիր։ Ցուցադրվում է անվան վերևում՝ մանր տառերով (օր.՝ «Հիմնադիր», «Գիտական ղեկավար»)։ Լրացնելու դեպքում՝ երեք լեզվով։',
      validation: (rule) =>
        rule.custom((value: LocalizedValue) => requireAllLocales(value, {optional: true})),
    }),
    defineField({
      name: 'bio',
      title: 'Կարճ նկարագրություն',
      type: 'localizedText',
      group: 'main',
      description:
        'Ոչ պարտադիր։ Մեկ-երկու նախադասություն, որը քարտի վրա բացվում է մկնիկը վրայով տանելիս (հեռախոսում՝ միշտ երևում է)։',
    }),
    defineField({
      name: 'photo',
      title: 'Լուսանկար',
      type: 'image',
      group: 'photo',
      description:
        'Ուղղաձիգ դիմանկար՝ JPG, PNG կամ WebP, առավելագույնը 5 ՄԲ։ Բոլոր քարտերը կտրվում են նույն 3:4 շրջանակով, ուստի hotspot-ը դիր դեմքի վրա։',
      options: {
        hotspot: true,
        accept: ACCEPTED_IMAGE_TYPES.join(','),
      },
      validation: (rule) =>
        rule
          .required()
          .error('Ավելացրու հիմնադրի լուսանկարը')
          .custom(async (value: ImageValue, context) => {
            const assetId = value?.asset?._ref
            if (!assetId) return true

            const asset = await context
              .getClient({apiVersion})
              .fetch<{mimeType?: string; size?: number} | null>(
                '*[_id == $id][0]{mimeType, size}',
                {id: assetId},
              )
            if (!asset) return true

            if (asset.mimeType && !ACCEPTED_IMAGE_TYPES.includes(asset.mimeType)) {
              return 'Լուսանկարը պետք է լինի JPG, PNG կամ WebP ձևաչափով'
            }
            if (asset.size && asset.size > MAX_PHOTO_BYTES) {
              const mb = (asset.size / (1024 * 1024)).toFixed(1)
              return `Լուսանկարը ${mb} ՄԲ է։ Վերբեռնիր առավելագույնը 5 ՄԲ ֆայլ`
            }
            return true
          }),
    }),
    defineField({
      name: 'order',
      title: 'Ցուցադրման հերթականություն',
      type: 'number',
      group: 'settings',
      description: 'Փոքր թվերն առաջ են գալիս՝ 0, 1, 2… Նույն թիվն ունեցողները դասավորվում են ըստ ստեղծման ամսաթվի։',
      initialValue: 0,
      validation: (rule) =>
        rule
          .required()
          .error('Նշիր հերթական համարը')
          .integer()
          .error('Նշիր ամբողջ թիվ')
          .min(0)
          .error('Թիվը չի կարող բացասական լինել'),
    }),
    defineField({
      name: 'isActive',
      title: 'Ակտիվ է',
      type: 'boolean',
      group: 'settings',
      description: 'Անջատիր, որ այս հիմնադիրը ժամանակավորապես չերևա կայքում՝ առանց գրառումը ջնջելու։',
      initialValue: true,
      validation: (rule) => rule.required().error('Նշիր՝ ակտիվ է, թե ոչ'),
    }),
  ],
  orderings: [
    {
      title: 'Ըստ հերթականության',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'},
        {field: '_createdAt', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      firstName: 'firstName.hy',
      firstNameRu: 'firstName.ru',
      lastName: 'lastName.hy',
      lastNameRu: 'lastName.ru',
      role: 'role.hy',
      roleRu: 'role.ru',
      order: 'order',
      isActive: 'isActive',
      media: 'photo',
    },
    prepare({firstName, firstNameRu, lastName, lastNameRu, role, roleRu, order, isActive, media}) {
      const name = [firstName || firstNameRu, lastName || lastNameRu].filter(Boolean).join(' ')
      const parts = [
        typeof order === 'number' ? `№${order}` : null,
        role || roleRu || null,
        isActive === false ? '● Թաքցված' : null,
      ].filter(Boolean)
      return {
        title: name || 'Անանուն հիմնադիր',
        subtitle: parts.join('  ·  '),
        media,
      }
    },
  },
})
