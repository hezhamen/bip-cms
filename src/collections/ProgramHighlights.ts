import type { CollectionConfig } from 'payload'

export const ProgramHighlights: CollectionConfig = {
  slug: 'program-highlights',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['number', 'title', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'number',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
