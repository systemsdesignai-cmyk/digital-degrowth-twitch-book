import { StructureResolver } from 'sanity/desk'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Home Page Settings')
        .id('homeSettings')
        .child(
          S.document()
            .schemaType('homeSettings')
            .documentId('homeSettings')
        ),
      S.listItem()
        .title('Author')
        .id('author')
        .child(
          S.document()
            .schemaType('author')
            .documentId('author')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['siteSettings', 'homeSettings', 'author'].includes(listItem.getId() || '')
      ),
    ])
