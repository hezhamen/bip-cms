import type { CollectionConfig } from 'payload'

export const PartnershipTracks: CollectionConfig = {
  slug: 'partnership-tracks',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['track', 'title'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'track',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Sponsor', value: 'sponsor' },
        { label: 'Collaborator', value: 'collaborator' },
      ],
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
      name: 'benefits',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
