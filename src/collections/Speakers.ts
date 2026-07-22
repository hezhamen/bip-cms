import type { CollectionConfig } from 'payload'

export const Speakers: CollectionConfig = {
  slug: 'speakers',
  labels: {
    singular: 'Speaker',
    plural: 'Speakers',
  },
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'slug', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'bio',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'paragraph',
          type: 'textarea',
          required: true,
        },
      ],
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
