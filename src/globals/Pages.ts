import type { Field, GlobalConfig } from 'payload'
import { LText } from '../utilities/fields'

function seoFields(
  defaults: { seoTitle: string; seoDescription: string },
  extra: Field[] = [],
): Field[] {
  return [
    LText('seoTitle', 'SEO Title', defaults.seoTitle),
    LText('seoDescription', 'SEO Description', defaults.seoDescription, {
      textarea: true,
    }),
    ...extra,
  ]
}

/** All page SEO + page-only copy in one editor with tabs. */
export const Pages: GlobalConfig = {
  slug: 'pages',
  label: 'Pages',
  admin: {
    group: 'Site',
    description: 'SEO and page-specific copy for each route',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'home',
          label: 'Home',
          fields: seoFields({
            seoTitle: 'BIP Summit',
            seoDescription:
              'BIP — Becoming International Professionals — connects companies, innovators, and investors across technology, energy, healthcare, and more at summits in the Kurdistan Region.',
          }),
        },
        {
          name: 'about',
          label: 'About',
          fields: seoFields(
            {
              seoTitle: 'About',
              seoDescription:
                'Learn about the BIP Program — connecting companies, innovators, and investors across the Kurdistan Region.',
            },
            [LText('eyebrow', 'Eyebrow', 'About Us')],
          ),
        },
        {
          name: 'summits',
          label: 'Summits',
          fields: seoFields({
            seoTitle: 'Summits',
            seoDescription:
              'Explore BIP Summit editions — agendas, outcomes, and investment conversations from Erbil.',
          }),
        },
        {
          name: 'news',
          label: 'News',
          fields: seoFields({
            seoTitle: 'News & Blogs',
            seoDescription:
              'News and stories from BIP Summits and the BIP Program community.',
          }),
        },
        {
          name: 'speakers',
          label: 'Speakers',
          fields: seoFields(
            {
              seoTitle: 'Speakers',
              seoDescription: 'Meet the speakers shaping BIP Summit conversations.',
            },
            [LText('listingTitle', 'Listing Title', 'Meet Our Speakers')],
          ),
        },
        {
          name: 'join',
          label: 'Join',
          fields: seoFields(
            {
              seoTitle: 'Join BIP Program',
              seoDescription:
                'Join the BIP Program and stay connected to summits, dealrooms, and follow-up.',
            },
            [
              LText('formTitle', 'Form Title', 'Join BIP Program'),
              LText('successTitle', 'Success Title', 'Successfully Registered'),
            ],
          ),
        },
        {
          name: 'partner',
          label: 'Partner',
          fields: seoFields(
            {
              seoTitle: 'Become a Partner',
              seoDescription:
                'Become a BIP partner — sponsor a track or collaborate on market entry.',
            },
            [
              LText('formTitle', 'Form Title', 'Become a Partner'),
              LText('benefitsHeading', 'Benefits Heading', 'Program Benefits'),
            ],
          ),
        },
        {
          name: 'contact',
          label: 'Contact',
          fields: seoFields(
            {
              seoTitle: 'Contact',
              seoDescription: 'Get in touch with the BIP Program team.',
            },
            [
              LText('eyebrow', 'Eyebrow', 'Contact Us'),
              LText('heading', 'Heading', 'Get in Touch'),
            ],
          ),
        },
      ],
    },
  ],
}
