import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const myStructure = (S, context) =>
    S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('Author')
                .child(S.documentTypeList('author').title('author')),
            orderableDocumentListDeskItem({ type: 'category', title: 'Blog Category', S, context }),
            orderableDocumentListDeskItem({ type: 'post', title: 'Blog Post', S, context }),
            ...S.documentTypeListItems().filter(
                (listItem) => !['category', 'post', 'author'].includes(listItem.getId())
            ),
        ])