import type { GlobalConfig } from 'payload'
import { LText } from '../utilities/fields'

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

/** Brand, contact, nav, and locale switches — one place for site chrome. */
export const Website: GlobalConfig = {
  slug: 'website',
  label: 'Website',
  admin: {
    group: 'Site',
    description: 'Brand, contact, navigation, and languages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand & SEO',
          fields: [
            LText('siteTitle', 'Site Title', 'BIP Summit'),
            LText('titleTemplate', 'Title Template', '%s | BIP Summit'),
            LText(
              'metaDescription',
              'Default Meta Description',
              'BIP — Becoming International Professionals — connects companies, innovators, and investors across technology, energy, healthcare, and more at summits in the Kurdistan Region.',
              { textarea: true },
            ),
            LText(
              'copyright',
              'Copyright',
              '© 2026, BIP Program. All rights reserved to BIP Program.',
            ),
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            LText(
              'pioneeringHeadline',
              'Pioneering Headline (full)',
              'A pioneering program that unites companies, innovators, and investors for a shared future of prosperity.',
              { textarea: true },
            ),
            LText(
              'programBlurb',
              'Program Blurb',
              'The Becoming International Professionals (BIP) Program connects global expertise with regional opportunity across construction, banking, green energy, tourism, AI, healthcare, and franchise development.',
              { textarea: true },
            ),
            LText(
              'programIntro',
              'Program Intro',
              'The Becoming International Professionals (BIP) Program is a specialized international initiative that turns introductions into investment outcomes.',
              { textarea: true },
            ),
            LText(
              'ctaBandBody',
              'CTA Band Body',
              'BIP connects companies, innovators, and investors to build lasting prosperity across the region.',
              { textarea: true },
            ),
            LText('ctaBandHeading', 'CTA Band Heading', 'Get in Touch'),
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contactEmail',
              type: 'email',
              required: true,
              defaultValue: 'info@bipprograms.com',
            },
            {
              name: 'phones',
              type: 'array',
              labels: { singular: 'Phone', plural: 'Phones' },
              minRows: 1,
              fields: [
                {
                  name: 'display',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'tel:+964...',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'headerLinks',
              type: 'array',
              label: 'Header Links',
              fields: linkFields,
            },
            {
              name: 'headerCtas',
              type: 'group',
              label: 'Header CTAs',
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
              label: 'Footer Nav Links',
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
        },
        {
          label: 'Languages',
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
        },
      ],
    },
  ],
}
