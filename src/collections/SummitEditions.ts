import type { CollectionConfig } from 'payload'

export const SummitEditions: CollectionConfig = {
  slug: 'summit-editions',
  admin: {
    useAsTitle: 'year',
    defaultColumns: ['year', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'year',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'href',
      type: 'text',
      required: true,
      defaultValue: '/summits',
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
