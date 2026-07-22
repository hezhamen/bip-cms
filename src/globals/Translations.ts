import type { GlobalConfig } from 'payload'

/**
 * UI dictionary as a single localized JSON object.
 * Individual localized text fields exceeded Postgres' 100-arg
 * json_build_array limit (~108 keys).
 */
export const Translations: GlobalConfig = {
  slug: 'translations',
  label: 'UI Labels',
  admin: {
    group: 'Site',
    description:
      'Button / nav / form strings per locale (en · ku · ar). Edit the JSON object; keys must match the website dictionary.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'labels',
      label: 'Labels',
      type: 'json',
      required: true,
      localized: true,
      admin: {
        description:
          'Flat key → string map (register, navHome, fullName, …). Leave a key out to fall back to English defaults on the site.',
      },
    },
  ],
}
