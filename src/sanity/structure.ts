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
          S.documentList()
            .title('Design Projects')
            .schemaType('project')
            .filter('_type == "project" && type == "design"')
        ),
      S.divider(),
      S.documentTypeListItem('blogs').title('Blogs').icon(BookIcon),
    ])

