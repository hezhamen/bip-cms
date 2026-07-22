import type { CollectionConfig } from 'payload'

export const Stats: CollectionConfig = {
  slug: 'stats',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['value', 'label', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'value',
      type: 'text',
      required: true,
    },
    {
      name: 'label',
      type: 'text',
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
