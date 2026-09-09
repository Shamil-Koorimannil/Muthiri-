import type { StructureResolver } from 'sanity/structure'
import {
  ImageIcon,
  CaseIcon,
  BookIcon,
  DocumentTextIcon,
  FolderIcon,
} from '@sanity/icons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Studio')
    .items([

      // ── PORTFOLIO ──────────────────────────────────────────────────────────
      S.listItem()
        .title('Portfolio')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('Portfolio')
            .items([

              // Art Projects
              S.listItem()
                .title('Art Projects')
                .icon(ImageIcon)
                .child(
                  S.documentList()
                    .title('Art Projects')
                    .schemaType('project')
                    .filter('_type == "project" && type == "art"')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),

              // Design Projects with sub-category filters
              S.listItem()
                .title('Design Projects')
                .icon(CaseIcon)
                .child(
                  S.list()
                    .title('Design Projects')
                    .items([
                      S.listItem()
                        .title('All Design Projects')
                        .icon(CaseIcon)
                        .child(
                          S.documentList()
                            .title('All Design Projects')
                            .schemaType('project')
                            .filter('_type == "project" && type == "design"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
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
            ])
        ),

      S.divider(),

      // ── WRITING ────────────────────────────────────────────────────────────
      S.listItem()
        .title('Writing')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Writing')
            .items([
              S.documentTypeListItem('blogs').title('Blogs').icon(DocumentTextIcon),
            ])
        ),

      // ── NOTE: Posts, Categories, and Authors schemas remain registered
      // ── in schemaTypes/index.ts and their documents are preserved in the
      // ── dataset. They are hidden from this navigation because the website
      // ── does not use them. To access them, add them back to this structure.
    ])
