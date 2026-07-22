import type { GlobalConfig } from 'payload'
import { LText } from '../utilities/fields'

export const Mission: GlobalConfig = {
  slug: 'mission',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tabs',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: 'tabId',
          type: 'text',
          required: true,
          admin: {
            description: 'Stable id: mission | vision | what-we-do',
          },
        },
        LText('label', 'Tab Label'),
        LText('lead', 'Lead', undefined, { textarea: true }),
        LText('emphasis', 'Emphasis'),
        LText('trail', 'Trail', undefined, { textarea: true }),
      ],
    },
  ],
}
