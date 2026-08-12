import type {StructureResolver} from 'sanity/structure'
import { ImageIcon, ImagesIcon, BookIcon, DocumentTextIcon, TagIcon, UserIcon, CaseIcon } from '@sanity/icons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Studio Content')
    .items([
      S.documentTypeListItem('post').title('Posts').icon(DocumentTextIcon),
      S.documentTypeListItem('category').title('Categories').icon(TagIcon),
      S.documentTypeListItem('author').title('Authors').icon(UserIcon),
      S.divider(),
      S.listItem()
        .title('Art Projects')
        .icon(ImageIcon)
        .child(
          S.documentList()
            .title('Art Projects')
            .schemaType('project')
            .filter('_type == "project" && type == "art"')
        ),
      S.listItem()
        .title('Design Projects')
        .icon(CaseIcon)
        .child(
          S.list()
            .title('Design Projects')
            .items([
              S.listItem()
                .title('All Design Projects')
                .child(
                  S.documentList()
                    .title('All Design Projects')
                    .schemaType('project')
                    .filter('_type == "project" && type == "design"')
                ),
              S.divider(),
              S.listItem()
                .title('Advertising')
                .child(
                  S.documentList()
                    .title('Advertising Projects')
                    .schemaType('project')
                    .filter('_type == "project" && type == "design" && subCategory == "advertising"')
                ),
              S.listItem()
                .title('Branding')
                .child(
                  S.documentList()
                    .title('Branding Projects')
                    .schemaType('project')
                    .filter('_type == "project" && type == "design" && subCategory == "branding"')
                ),
              S.listItem()
                .title('Illustration')
                .child(
                  S.documentList()
                    .title('Illustration Projects')
                    .schemaType('project')
                    .filter('_type == "project" && type == "design" && subCategory == "illustration"')
                ),
            ])
        ),
      S.divider(),
      S.documentTypeListItem('blogs').title('Blogs').icon(BookIcon),
    ])

