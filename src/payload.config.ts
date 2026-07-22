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

import { Website } from './globals/Website'
import { Pages } from './globals/Pages'
import { Sections } from './globals/Sections'
import { Translations } from './globals/Translations'
import { migrations } from './migrations'

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
  collections: [Speakers, NewsArticles, Media, Users],
  globals: [Website, Pages, Sections, Translations],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // Dev: drizzle push. Prod: NODE_ENV=production skips push — use migrations.
    push: true,
    prodMigrations: migrations,
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
