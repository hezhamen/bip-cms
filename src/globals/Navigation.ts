import type { GlobalConfig } from 'payload'

const linkFields = [
  {
    name: 'label',
    type: 'text' as const,
    required: true,
    localized: true,
  },
  {
    name: 'href',
    type: 'text' as const,
    required: true,
  },
]

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'headerLinks',
      type: 'array',
      label: 'Header Nav Links',
      fields: linkFields,
    },
    {
      name: 'headerCtas',
      type: 'group',
      fields: [
        {
          name: 'contactLabel',
          type: 'text',
          localized: true,
          defaultValue: 'Contact',
        },
        {
          name: 'contactHref',
          type: 'text',
          defaultValue: '/contact',
        },
        {
          name: 'joinLabel',
          type: 'text',
          localized: true,
          defaultValue: 'Join Us',
        },
        {
          name: 'joinHref',
          type: 'text',
          defaultValue: '/join',
        },
        {
          name: 'askAiLabel',
          type: 'text',
          localized: true,
          defaultValue: 'Ask BIP AI',
        },
      ],
    },
    {
      name: 'footerNavLinks',
      type: 'array',
      label: 'Footer Navigation Links',
      fields: linkFields,
    },
    {
      name: 'footerSocialLinks',
      type: 'array',
      label: 'Footer Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Linkedin', value: 'linkedin' },
            { label: 'Youtube', value: 'youtube' },
            { label: 'Whatsapp', value: 'whatsapp' },
            { label: 'X', value: 'x' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          defaultValue: '#',
        },
      ],
    },
    {
      name: 'footerProgramLinks',
      type: 'array',
      label: 'Footer Program Links',
      fields: linkFields,
    },
  ],
}
