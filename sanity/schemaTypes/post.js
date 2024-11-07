import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { SEODescriptionInput, SEOTitleInput } from '../components/SEOInputs';

export default defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    orderings: [orderRankOrdering],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required().max(100),
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
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'author' },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Draft', value: 'draft' },
                    { title: 'Published', value: 'published' },
                    { title: 'Archived', value: 'archived' }
                ],
            },
            initialValue: 'draft',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'smallDescription',
            title: 'Small Description',
            type: 'text',
            validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            description: 'Title tag for search engines (max 60 characters)',
            components: {
                input: SEOTitleInput
            },
            validation: (Rule) => Rule.max(60),
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            description: 'Meta description for search engines (max 160 characters)',
            components: {
                input: SEODescriptionInput
            },
            validation: (Rule) => Rule.max(160),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    validation: (Rule) => Rule.required(),
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: { type: 'category' },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'content',
            type: 'array',
            title: 'Content',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'Heading 2', value: 'h2' },
                        { title: 'Heading 3', value: 'h3' },
                        { title: 'Heading 4', value: 'h4' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Code', value: 'code' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL'
                                    },
                                    {
                                        name: 'blank',
                                        type: 'boolean',
                                        title: 'Open in new tab',
                                        initialValue: true
                                    }
                                ]
                            },
                        ]
                    }
                },
                {
                    type: 'image',
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        },
                    ],
                },
                defineField({
                    name: 'codeBlock',
                    title: 'Code Block',
                    type: 'object',
                    fields: [
                        {
                            name: 'language',
                            title: 'Language',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'JavaScript', value: 'javascript' },
                                    { title: 'Python', value: 'python' },
                                    { title: 'HTML', value: 'html' },
                                    { title: 'CSS', value: 'css' },
                                    { title: 'TypeScript', value: 'typescript' },
                                    { title: 'JSX', value: 'jsx' },
                                    { title: 'TSX', value: 'tsx' },
                                    { title: 'Shell', value: 'shell' },
                                    { title: 'JSON', value: 'json' },
                                ],
                            },
                        },
                        {
                            name: 'filename',
                            title: 'Filename (optional)',
                            type: 'string',
                        },
                        {
                            name: 'code',
                            title: 'Code',
                            type: 'text',
                        },
                    ],
                })
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'estimatedReadingTime',
            title: 'Estimated Reading Time',
            type: 'number',
            description: 'In minutes',
            // readOnly: true,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'question',
                            title: 'Question',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'answer',
                            title: 'Answer',
                            type: 'text',
                            validation: (Rule) => Rule.required(),
                        }
                    ]
                }
            ],
            validation: (Rule) => Rule.required(),
        }),

        orderRankField({ type: "post" }),
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
})