import type { GlobalConfig } from 'payload'
import { LText } from '../utilities/fields'

export const SectionIntros: GlobalConfig = {
  slug: 'section-intros',
  label: 'Section Intros',
  access: {
    read: () => true,
  },
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
}
