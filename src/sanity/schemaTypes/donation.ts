import {CreditCardIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {donationStatusLabels, donationStatuses} from '../../lib/donations/types'

/**
 * A donation, written only by the website's server. Every field is read-only
 * in the Studio: the amount and status come from the bank, and the only way
 * to change them is the actions on the document (refresh, cancel, refund),
 * which the server checks against the bank before doing anything.
 */
export const donation = defineType({
  name: 'donation',
  title: 'Նվիրատվություն',
  type: 'document',
  icon: CreditCardIcon,
  readOnly: true,
  description:
    'Նվիրատվությունները ստեղծվում են կայքից։ Կարգավիճակը թարմացվում է բանկից, իսկ չեղարկումն ու վերադարձը արվում են վերևի կոճակներով։',
  fields: [
    defineField({
      name: 'status',
      title: 'Կարգավիճակ',
      type: 'string',
      options: {list: donationStatuses.map((value) => ({value, title: donationStatusLabels[value]}))},
    }),
    defineField({name: 'amount', title: 'Գումար (AMD)', type: 'number'}),
    defineField({
      name: 'requestedAmount',
      title: 'Դոնորի նշած գումարը (AMD)',
      type: 'number',
      description: 'Թեստային ռեժիմում բանկը գանձում է 10 AMD՝ անկախ նշված գումարից։',
    }),
    defineField({name: 'refundedAmount', title: 'Վերադարձված գումար (AMD)', type: 'number'}),
    defineField({name: 'firstName', title: 'Անուն', type: 'string'}),
    defineField({name: 'lastName', title: 'Ազգանուն', type: 'string'}),
    defineField({name: 'email', title: 'Էլ. փոստ', type: 'string'}),
    defineField({
      name: 'showName',
      title: 'Թույլ է տվել ցուցադրել անունը կայքում',
      type: 'boolean',
    }),
    defineField({name: 'paidAt', title: 'Վճարման ժամանակը', type: 'datetime'}),
    defineField({name: 'orderId', title: 'OrderID', type: 'number'}),
    defineField({name: 'paymentId', title: 'PaymentID', type: 'string'}),
    defineField({name: 'cardNumber', title: 'Քարտ', type: 'string'}),
    defineField({name: 'approvalCode', title: 'Հաստատման կոդ', type: 'string'}),
    defineField({name: 'bankOrderStatus', title: 'Բանկի OrderStatus', type: 'number'}),
    defineField({name: 'bankResponseCode', title: 'Բանկի ResponseCode', type: 'string'}),
    defineField({name: 'checkedAt', title: 'Վերջին ստուգումը բանկում', type: 'datetime'}),
    defineField({name: 'testMode', title: 'Թեստային', type: 'boolean'}),
    defineField({name: 'locale', title: 'Կայքի լեզուն', type: 'string'}),
    defineField({
      name: 'log',
      title: 'Պատմություն',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'donationLogEntry',
          fields: [
            defineField({name: 'at', title: 'Երբ', type: 'datetime'}),
            defineField({name: 'action', title: 'Գործողություն', type: 'string'}),
            defineField({name: 'ok', title: 'Հաջող', type: 'boolean'}),
            defineField({name: 'by', title: 'Ով', type: 'string'}),
            defineField({name: 'amount', title: 'Գումար', type: 'number'}),
            defineField({name: 'message', title: 'Մանրամասներ', type: 'string'}),
          ],
          preview: {
            select: {at: 'at', action: 'action', ok: 'ok', by: 'by', amount: 'amount'},
            prepare: ({at, action, ok, by, amount}) => ({
              title: `${ok === false ? '✕ ' : ''}${action ?? ''}${amount ? ` · ${amount} AMD` : ''}`,
              subtitle: [at ? new Date(at).toLocaleString('hy-AM') : '', by].filter(Boolean).join(' · '),
            }),
          },
        }),
      ],
    }),
  ],
  orderings: [
    {title: 'Նորերը վերևում', name: 'createdDesc', by: [{field: '_createdAt', direction: 'desc'}]},
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      amount: 'amount',
      status: 'status',
      testMode: 'testMode',
      createdAt: '_createdAt',
    },
    prepare: ({firstName, lastName, amount, status, testMode, createdAt}) => ({
      title: `${[firstName, lastName].filter(Boolean).join(' ') || '—'} · ${amount ?? 0} AMD`,
      subtitle: [
        donationStatusLabels[status as keyof typeof donationStatusLabels] ?? status,
        createdAt ? new Date(createdAt).toLocaleDateString('hy-AM') : '',
        testMode ? 'թեստ' : '',
      ]
        .filter(Boolean)
        .join(' · '),
    }),
  },
})
