import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Speakers } from './collections/Speakers'
import { NewsArticles } from './collections/NewsArticles'
import { Videos } from './collections/Videos'
import { GallerySlides } from './collections/GallerySlides'
import { Sectors } from './collections/Sectors'
import { SummitEditions } from './collections/SummitEditions'
import { ProgramHighlights } from './collections/ProgramHighlights'
import { MediaChannels } from './collections/MediaChannels'
import { ChatReplies } from './collections/ChatReplies'
import { Stats } from './collections/Stats'
import { PartnershipTracks } from './collections/PartnershipTracks'

import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'
import { Translations } from './globals/Translations'
import { LanguagesSettings } from './globals/LanguagesSettings'
import { Mission } from './globals/Mission'
import { SectionIntros } from './globals/SectionIntros'
import { FormIntros } from './globals/FormIntros'
import { AiChat } from './globals/AiChat'
import {
  AboutPage,
  ContactPage,
  HomePage,
  JoinPage,
  NewsPage,
  PartnerPage,
  SpeakersPage,
  SummitsPage,
} from './globals/Pages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || process.env.PAYLOAD_SERVER_URL || '',
  admin: {
    meta: {
      titleSuffix: ' - BIP CMS',
      title: 'BIP CMS',
      description: 'Content management for BIP Summit',
    },
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Speakers,
    NewsArticles,
    Videos,
    GallerySlides,
    Sectors,
    SummitEditions,
    ProgramHighlights,
    MediaChannels,
    ChatReplies,
    Stats,
    PartnershipTracks,
  ],
  globals: [
    SiteSettings,
    Navigation,
    Translations,
    LanguagesSettings,
    Mission,
    SectionIntros,
    FormIntros,
    AiChat,
    HomePage,
    AboutPage,
    SummitsPage,
    NewsPage,
    SpeakersPage,
    JoinPage,
    PartnerPage,
    ContactPage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Kurdish', code: 'ku' },
      { label: 'Arabic', code: 'ar' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  cors: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  csrf: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  sharp,
  plugins: [],
})
