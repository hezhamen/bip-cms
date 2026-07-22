import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'File',
    plural: 'Media Library',
  },
  admin: {
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      required: false,
      defaultValue: 'Uploaded file',
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (data && operation === 'create' && (!data.alt || String(data.alt).trim() === '')) {
          data.alt = data.filename || 'Uploaded file'
        }
        return data
      },
    ],
  },
  upload: {
    staticDir: path.resolve(dirname, '../../media'),
  },
}
