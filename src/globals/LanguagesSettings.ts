import type { GlobalConfig } from 'payload'

export const LanguagesSettings: GlobalConfig = {
  slug: 'languages-settings',
  label: 'Languages Settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'enableEnglish',
          type: 'checkbox',
          label: 'Enable English',
          defaultValue: true,
          admin: { width: '33.33%' },
        },
        {
          name: 'enableKurdish',
          type: 'checkbox',
          label: 'Enable Kurdish',
          defaultValue: true,
          admin: { width: '33.33%' },
        },
        {
          name: 'enableArabic',
          type: 'checkbox',
          label: 'Enable Arabic',
          defaultValue: true,
          admin: { width: '33.33%' },
        },
      ],
    },
  ],
}
