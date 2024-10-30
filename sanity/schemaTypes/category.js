import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export default defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    orderings: [orderRankOrdering],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule) => Rule.max(200),
        }),
        defineField({
            name: 'parentCategory',
            title: 'Parent Category',
            type: 'reference',
            to: [{ type: 'category' }],
            description: 'Select a parent category if this is a subcategory',
        }),
        orderRankField({ type: "category" }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
        },
    },
})