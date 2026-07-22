import type { GlobalConfig } from 'payload'
import { LText } from '../utilities/fields'

const trackFields = [
  LText('title', 'Title'),
  LText('description', 'Description', undefined, { textarea: true }),
  {
    name: 'benefits',
    type: 'array' as const,
    localized: true,
    fields: [
      {
        name: 'number',
        type: 'text' as const,
        required: true,
      },
      {
        name: 'text',
        type: 'textarea' as const,
        required: true,
      },
    ],
  },
]

/**
 * Curated homepage / summits blocks that used to be many tiny collections.
 * Edit lists here with drag-reorder instead of jumping between sidebar items.
 */
export const Sections: GlobalConfig = {
  slug: 'sections',
  label: 'Sections',
  admin: {
    group: 'Site',
    description: 'Mission, stats, sectors, media strips, forms, AI chat',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Mission',
          fields: [
            {
              name: 'missionTabs',
              type: 'array',
              label: 'Mission Tabs',
              minRows: 3,
              maxRows: 3,
              labels: { singular: 'Tab', plural: 'Tabs' },
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
        },
        {
          label: 'Stats',
          fields: [
            {
              name: 'stats',
              type: 'array',
              labels: { singular: 'Stat', plural: 'Stats' },
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
                LText('label', 'Label'),
              ],
            },
          ],
        },
        {
          label: 'Key Sectors',
          fields: [
            {
              name: 'sectors',
              type: 'array',
              labels: { singular: 'Sector', plural: 'Sectors' },
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  required: true,
                },
                LText('title', 'Title'),
                LText('description', 'Description', undefined, { textarea: true }),
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Summit Editions',
          fields: [
            {
              name: 'summitEditions',
              type: 'array',
              labels: { singular: 'Edition', plural: 'Editions' },
              fields: [
                {
                  name: 'year',
                  type: 'text',
                  required: true,
                },
                LText('description', 'Description', undefined, { textarea: true }),
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                  defaultValue: '/summits',
                },
              ],
            },
          ],
        },
        {
          label: 'Videos',
          fields: [
            {
              name: 'videos',
              type: 'array',
              labels: { singular: 'Video', plural: 'Videos' },
              fields: [
                LText('title', 'Title'),
                {
                  name: 'key',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Stable id used by the frontend (e.g. tech-hub)',
                  },
                },
                LText('description', 'Description', undefined, { textarea: true }),
                LText('shortDescription', 'Short Description', undefined, {
                  textarea: true,
                }),
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'youtubeUrl',
                  type: 'text',
                  required: true,
                  defaultValue: 'https://www.youtube.com',
                },
                {
                  name: 'featured',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          label: 'Gallery',
          fields: [
            {
              name: 'gallery',
              type: 'array',
              labels: { singular: 'Slide', plural: 'Slides' },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                LText('alt', 'Alt Text'),
              ],
            },
          ],
        },
        {
          label: 'Media Channels',
          fields: [
            {
              name: 'mediaChannels',
              type: 'array',
              labels: { singular: 'Channel', plural: 'Channels' },
              fields: [
                LText('label', 'Label'),
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Program Highlights',
          fields: [
            {
              name: 'programHighlights',
              type: 'array',
              labels: { singular: 'Highlight', plural: 'Highlights' },
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  required: true,
                },
                LText('title', 'Title'),
                LText('description', 'Description', undefined, { textarea: true }),
              ],
            },
          ],
        },
        {
          label: 'Partnership',
          fields: [
            {
              name: 'partnership',
              type: 'group',
              fields: [
                {
                  name: 'sponsor',
                  type: 'group',
                  label: 'Sponsor',
                  fields: trackFields,
                },
                {
                  name: 'collaborator',
                  type: 'group',
                  label: 'Collaborator',
                  fields: trackFields,
                },
              ],
            },
          ],
        },
        {
          label: 'Section Intros',
          fields: [
            {
              name: 'sectionIntros',
              type: 'group',
              fields: [
                LText(
                  'speakers',
                  'Speakers',
                  'Hear from founders, policymakers, and operators who are shaping investment and innovation across the Kurdistan Region and beyond.',
                  { textarea: true },
                ),
                LText(
                  'sectors',
                  'Sectors',
                  'BIP focuses capital and collaboration on the industries driving the next decade of regional growth.',
                  { textarea: true },
                ),
                LText(
                  'youtube',
                  'YouTube',
                  'Catch keynotes, panels, and dealroom moments from recent BIP Summit editions.',
                  { textarea: true },
                ),
                LText(
                  'news',
                  'News',
                  'Updates from the BIP community — summits, partnerships, and the deals taking shape on the ground.',
                  { textarea: true },
                ),
                LText(
                  'summits',
                  'Summits',
                  'Each BIP Summit edition builds on the last: sharper agendas, deeper networks, clearer investment outcomes.',
                  { textarea: true },
                ),
                LText(
                  'gallery',
                  'Gallery',
                  'Scenes from BIP Summit stages, site visits, and the conversations that turn introductions into partnerships.',
                  { textarea: true },
                ),
                LText(
                  'media',
                  'Media',
                  'BIP Summit coverage across regional and international outlets covering investment, technology, and public–private collaboration.',
                  { textarea: true },
                ),
                LText(
                  'countries',
                  'Countries',
                  'Delegates and partners join BIP from across the Middle East, Europe, Asia, and North America.',
                  { textarea: true },
                ),
                LText(
                  'related',
                  'Related Articles',
                  'More stories from BIP Summits and the wider program network.',
                  { textarea: true },
                ),
              ],
            },
          ],
        },
        {
          label: 'Form Intros',
          fields: [
            {
              name: 'formIntros',
              type: 'group',
              fields: [
                LText(
                  'register',
                  'Register',
                  'Reserve your place at the next BIP Summit — two intensive days in Erbil with sector dealrooms, site visits, and structured follow-up.',
                  { textarea: true },
                ),
                LText(
                  'join',
                  'Join',
                  'The Becoming International Professionals (BIP) Program is a specialized international initiative.',
                  { textarea: true },
                ),
                LText(
                  'partner',
                  'Partner',
                  'Partner with BIP to host a sector track, meet decision-makers, and stay connected to the deals that start on site.',
                  { textarea: true },
                ),
                LText(
                  'contact',
                  'Contact',
                  'Tell us what you are exploring — registration, partnership, press, or investment introductions — and the BIP team will respond.',
                  { textarea: true },
                ),
              ],
            },
          ],
        },
        {
          label: 'AI Chat',
          fields: [
            {
              name: 'aiChat',
              type: 'group',
              fields: [
                LText('welcome', 'Welcome Title', 'Welcome to BIP AI'),
                LText('subtitle', 'Subtitle', 'Ask anything about BIP Summit'),
                LText('placeholder', 'Placeholder', 'Ask Here...'),
                LText('typing', 'Typing Indicator', 'BIP AI is typing…'),
                {
                  name: 'replies',
                  type: 'array',
                  label: 'Suggested Replies',
                  labels: { singular: 'Reply', plural: 'Replies' },
                  fields: [
                    LText('text', 'Text', undefined, { textarea: true }),
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      required: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
