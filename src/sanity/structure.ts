import {
  CalendarIcon,
  DocumentTextIcon,
  PresentationIcon,
  UsersIcon,
} from '@sanity/icons'
import type {Divider, ListItemBuilder, StructureResolver} from 'sanity/structure'

/**
 * The editor's menu, in Armenian and grouped the way the site is organised:
 * what the public sees under "Բովանդակություն", who the centre is under
 * "Մեր մասին". Each list opens in the order the website itself uses.
 *
 * https://www.sanity.io/docs/structure-builder-cheat-sheet
 */
function divider(id: string, title: string): Divider {
  return {id, type: 'divider', title}
}

export const structure: StructureResolver = (S) => {
  const programs: ListItemBuilder = S.listItem()
    .title('Ծրագրեր')
    .id('program')
    .icon(PresentationIcon)
    .schemaType('program')
    .child(
      S.documentTypeList('program')
        .title('Ծրագրեր')
        .defaultOrdering([{field: '_createdAt', direction: 'asc'}]),
    )

  const courses: ListItemBuilder = S.listItem()
    .title('Դասընթացներ')
    .id('course')
    .icon(CalendarIcon)
    .schemaType('course')
    .child(
      S.documentTypeList('course')
        .title('Դասընթացներ')
        .defaultOrdering([{field: '_createdAt', direction: 'desc'}]),
    )

  const events: ListItemBuilder = S.listItem()
    .title('Միջոցառումներ')
    .id('event')
    .icon(CalendarIcon)
    .schemaType('event')
    .child(
      S.documentTypeList('event')
        .title('Միջոցառումներ')
        .defaultOrdering([{field: 'date', direction: 'asc'}]),
    )

  const news: ListItemBuilder = S.listItem()
    .title('Նորություններ')
    .id('news')
    .icon(DocumentTextIcon)
    .schemaType('news')
    .child(
      S.documentTypeList('news')
        .title('Նորություններ')
        .defaultOrdering([{field: 'date', direction: 'desc'}]),
    )

  const founders: ListItemBuilder = S.listItem()
    .title('Հիմնադիրներ')
    .id('founder')
    .icon(UsersIcon)
    .schemaType('founder')
    .child(
      S.documentTypeList('founder')
        .title('Հիմնադիրներ')
        .defaultOrdering([
          {field: 'order', direction: 'asc'},
          {field: '_createdAt', direction: 'asc'},
        ]),
    )

  const handled = ['program', 'course', 'event', 'news', 'founder']

  return (
    S.list()
      // Sanity requires an id on the root list — without it the Studio cannot
      // serialize the structure, and every "create new document" link fails.
      .id('__root__')
      .title('Կայքի բովանդակությունը')
      .items([
        divider('group-content', 'Բովանդակություն'),
        programs,
        courses,
        events,
        news,
        divider('group-about', 'Մեր մասին'),
        founders,
        // Anything added to the schema later still shows up, so a new document
        // type is never invisible just because this file was not updated.
        ...S.documentTypeListItems().filter((item) => !handled.includes(item.getId() ?? '')),
      ])
  )
}
