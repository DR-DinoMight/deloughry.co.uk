export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
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
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      validation: Rule => Rule.required()
    }
  ],
}
