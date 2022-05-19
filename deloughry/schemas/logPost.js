export default {
    name: 'logPost',
    title: 'Log Posts',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: {type: 'author'},
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'category',
            title: 'category',
            type: 'reference',
            to: {type: 'category'},
            validation: Rule => Rule.required()
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: Rule => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: Rule => Rule.required(),
        },
        {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        {title: 'Normal', value: 'normal'},
                        {title: 'H1', value: 'h1'},
                        {title: 'H2', value: 'h2'},
                        {title: 'H3', value: 'h3'},
                        {title: 'H4', value: 'h4'},
                        {title: 'H5', value: 'h5'},
                        {title: 'H6', value: 'h6'},
                        {title: 'Quote', value: 'blockquote'}
                    ]
                },

                {
                    type: "cloudinary.asset",
                    name: "image",
                    description: "This asset is served from Cloudinary",
                },
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        },
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alt',
                            options: {
                                isHighlighted: true,
                            },
                        },
                    ]
                },
                {
                    type: 'code'
                },
                {
                    type: 'logPost'
                }
            ],
            validation: Rule => Rule.required(),
        },
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
            description: 'description',
        },
        prepare(selection) {
            const {author} = selection
            return Object.assign({}, selection, {
                subtitle: author && `by ${author}`,
            })
        },
    },
}
