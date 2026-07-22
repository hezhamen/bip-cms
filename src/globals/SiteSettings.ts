import type { GlobalConfig } from 'payload'
import { LText } from '../utilities/fields'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
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
      name: 'contactEmail',
      type: 'email',
      required: true,
      defaultValue: 'info@bipprograms.com',
    },
    {
      name: 'phones',
      type: 'array',
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
}
