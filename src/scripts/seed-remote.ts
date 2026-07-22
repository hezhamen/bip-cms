/**
 * Seed remote BIP CMS over REST (media lands on the server).
 *
 * Usage:
 *   CMS_URL=https://bip-cms-….sslip.io \
 *   CMS_EMAIL=… CMS_PASSWORD=… \
 *   pnpm seed:remote
 */
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Blob } from 'buffer'

import { SPEAKERS } from '../../../bip-web/src/data/speakers'
import { NEWS_ARTICLES } from '../../../bip-web/src/data/news'
import { KEY_SECTORS } from '../../../bip-web/src/data/sectors'
import { SUMMIT_EDITIONS } from '../../../bip-web/src/data/summits'
import { FEATURED_VIDEO, SIDEBAR_VIDEOS } from '../../../bip-web/src/data/videos'
import { GALLERY_SLIDES } from '../../../bip-web/src/data/gallery'
import {
  PROGRAM_HIGHLIGHTS,
  PROGRAM_INTRO,
  FORM_INTROS,
} from '../../../bip-web/src/data/highlights'
import { CONTACT_EMAIL, CONTACT_PHONES } from '../../../bip-web/src/data/contact'
import { PARTNERSHIP_OVERLAYS } from '../../../bip-web/src/data/partnership'
import { CHAT_REPLIES } from '../../../bip-web/src/data/chat'
import {
  PIONEERING_HEADLINE,
  PROGRAM_BLURB,
  SECTION_INTROS,
} from '../../../bip-web/src/data/copy'
import { LABEL_LOCALES } from './labels'
import { PAGES_LOCALES, SECTIONS_LOCALES, WEBSITE_LOCALES } from './locale-content'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const BIP_WEB_PUBLIC = path.resolve(__dirname, '../../../bip-web/public')

const CMS_URL = (process.env.CMS_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || '')
  .replace(/\/$/, '')
const EMAIL = process.env.CMS_EMAIL || ''
const PASSWORD = process.env.CMS_PASSWORD || ''

if (!CMS_URL || !EMAIL || !PASSWORD) {
  console.error('Need CMS_URL, CMS_EMAIL, CMS_PASSWORD')
  process.exit(1)
}

type Json = Record<string, unknown>

async function api(
  method: string,
  endpoint: string,
  token: string | null,
  body?: BodyInit | null,
  headers: Record<string, string> = {},
): Promise<Json> {
  const res = await fetch(`${CMS_URL}${endpoint}`, {
    method,
    headers: {
      ...(token ? { Authorization: `JWT ${token}` } : {}),
      ...headers,
    },
    body: body ?? undefined,
  })
  const text = await res.text()
  let data: Json = {}
  try {
    data = text ? (JSON.parse(text) as Json) : {}
  } catch {
    data = { raw: text }
  }
  if (!res.ok) {
    throw new Error(
      `${method} ${endpoint} → ${res.status}: ${JSON.stringify(data).slice(0, 500)}`,
    )
  }
  return data
}

function mimeFor(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.svg') return 'image/svg+xml'
  if (ext === '.webp') return 'image/webp'
  return 'image/jpeg'
}

async function login(): Promise<string> {
  const data = await api('POST', '/api/users/login', null, JSON.stringify({
    email: EMAIL,
    password: PASSWORD,
  }), { 'Content-Type': 'application/json' })
  const token = data.token as string | undefined
  if (!token) throw new Error('Login failed — no token')
  console.log('Logged in as', EMAIL)
  return token
}

async function uploadMedia(
  token: string,
  publicPath: string,
  alt: string,
  cache: Map<string, number | string>,
): Promise<number | string> {
  const cached = cache.get(publicPath)
  if (cached) return cached

  const absolute = path.join(BIP_WEB_PUBLIC, publicPath.replace(/^\//, ''))
  if (!fs.existsSync(absolute)) {
    throw new Error(`Missing media: ${absolute}`)
  }
  const buffer = fs.readFileSync(absolute)
  const filename = path.basename(absolute)
  const form = new FormData()
  form.append(
    'file',
    new Blob([buffer], { type: mimeFor(filename) }),
    filename,
  )
  form.append('_payload', JSON.stringify({ alt }))

  const data = await api('POST', '/api/media', token, form as unknown as BodyInit)
  const doc = (data.doc ?? data) as { id: number | string }
  cache.set(publicPath, doc.id)
  console.log(`  media ${publicPath} → ${doc.id}`)
  return doc.id
}

async function clearCollection(token: string, slug: string) {
  const data = await api(
    'GET',
    `/api/${slug}?limit=200&depth=0`,
    token,
  )
  const docs = (data.docs as { id: number | string }[]) || []
  for (const doc of docs) {
    await api('DELETE', `/api/${slug}/${doc.id}`, token)
  }
  console.log(`Cleared ${slug} (${docs.length})`)
}

async function updateGlobal(
  token: string,
  slug: string,
  locale: string,
  data: Json,
) {
  await api(
    'POST',
    `/api/globals/${slug}?locale=${locale}&depth=0`,
    token,
    JSON.stringify(data),
    { 'Content-Type': 'application/json' },
  )
  console.log(`  global ${slug}:${locale}`)
}

async function seed() {
  const token = await login()
  const mediaCache = new Map<string, number | string>()

  console.log('Uploading media…')
  const heroId = await uploadMedia(token, '/images/hero.jpg', 'Audience at a BIP Summit event', mediaCache)

  for (const slug of ['speakers', 'news-articles'] as const) {
    await clearCollection(token, slug)
  }

  // Keep prior test media; clearCollection doesn't touch media library.

  console.log('Seeding speakers…')
  for (let i = 0; i < SPEAKERS.length; i++) {
    const s = SPEAKERS[i]!
    const imageId = await uploadMedia(token, s.image, s.name, mediaCache)
    await api(
      'POST',
      '/api/speakers?locale=en',
      token,
      JSON.stringify({
        name: s.name,
        slug: s.slug,
        role: s.role,
        image: imageId,
        bio: s.bio.map((paragraph) => ({ paragraph })),
        order: i,
      }),
      { 'Content-Type': 'application/json' },
    )
  }

  console.log('Seeding news…')
  for (let i = 0; i < NEWS_ARTICLES.length; i++) {
    const a = NEWS_ARTICLES[i]!
    const imageId = await uploadMedia(token, a.image, a.title, mediaCache)
    const coverId = await uploadMedia(token, a.coverImage, a.title, mediaCache)
    await api(
      'POST',
      '/api/news-articles?locale=en',
      token,
      JSON.stringify({
        title: a.title,
        slug: a.slug,
        headline: a.headline,
        description: a.description,
        excerpt: a.excerpt,
        image: imageId,
        coverImage: coverId,
        tags: a.tags.map((tag) => ({ tag })),
        body: a.body.map((paragraph) => ({ paragraph })),
        featured: i === 0,
      }),
      { 'Content-Type': 'application/json' },
    )
  }

  console.log('Preparing section media…')
  const allVideos = [FEATURED_VIDEO, ...SIDEBAR_VIDEOS]
  const videoRows = []
  for (let i = 0; i < allVideos.length; i++) {
    const v = allVideos[i]!
    const imageId = await uploadMedia(token, v.image, v.title, mediaCache)
    videoRows.push({
      title: v.title,
      key: v.id,
      description: v.description,
      shortDescription: v.shortDescription,
      image: imageId,
      youtubeUrl: v.href,
      featured: i === 0,
    })
  }

  const galleryRows = []
  for (const g of GALLERY_SLIDES) {
    const imageId = await uploadMedia(token, g.src, g.alt, mediaCache)
    galleryRows.push({ image: imageId, alt: g.alt })
  }

  const channels = [
    { src: '/icons/media-1.svg', label: 'Regional Press' },
    { src: '/icons/media-2.svg', label: 'Business Wire' },
    { src: '/icons/media-3.svg', label: 'Broadcast Partners' },
    { src: '/icons/media-4.svg', label: 'Trade Media' },
    { src: '/icons/media-1.svg', label: 'Digital Outlets' },
  ]
  const channelRows = []
  for (const c of channels) {
    const logoId = await uploadMedia(token, c.src, c.label, mediaCache)
    channelRows.push({ label: c.label, logo: logoId })
  }

  const chatRows = []
  for (const r of CHAT_REPLIES) {
    const imageId = r.image
      ? await uploadMedia(token, r.image, 'Chat reply image', mediaCache)
      : undefined
    chatRows.push({
      text: r.text,
      ...(imageId ? { image: imageId } : {}),
    })
  }

  console.log('Updating Website (en)…')
  await updateGlobal(token, 'website', 'en', {
    siteTitle: 'BIP Summit',
    titleTemplate: '%s | BIP Summit',
    metaDescription:
      'BIP — Becoming International Professionals — connects companies, innovators, and investors across technology, energy, healthcare, and more at summits in the Kurdistan Region.',
    copyright: '© 2026, BIP Program. All rights reserved to BIP Program.',
    contactEmail: CONTACT_EMAIL,
    phones: CONTACT_PHONES.map((p) => ({ display: p.display, href: p.href })),
    heroImage: heroId,
    pioneeringHeadline: PIONEERING_HEADLINE,
    programBlurb: PROGRAM_BLURB,
    programIntro: PROGRAM_INTRO,
    ctaBandBody:
      'BIP connects companies, innovators, and investors to build lasting prosperity across the region.',
    ctaBandHeading: 'Get in Touch',
    headerLinks: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Summits', href: '/summits' },
      { label: 'News & Blogs', href: '/news' },
    ],
    headerCtas: {
      contactLabel: 'Contact',
      contactHref: '/contact',
      joinLabel: 'Join Us',
      joinHref: '/join',
      askAiLabel: 'Ask BIP AI',
    },
    footerNavLinks: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Programs', href: '/summits' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Work With Us', href: '/partner' },
      { label: 'Register', href: '/join' },
    ],
    footerSocialLinks: [
      { platform: 'facebook', label: 'Facebook', href: '#' },
      { platform: 'instagram', label: 'Instagram', href: '#' },
      { platform: 'linkedin', label: 'Linkedin', href: '#' },
      { platform: 'youtube', label: 'Youtube', href: '#' },
      { platform: 'whatsapp', label: 'Whatsapp', href: '#' },
      { platform: 'x', label: 'X', href: '#' },
    ],
    footerProgramLinks: [
      { label: 'BIP 2023', href: '/summits' },
      { label: 'BIP 2024', href: '/summits' },
      { label: 'BIP 2025', href: '/summits' },
    ],
    enableEnglish: true,
    enableKurdish: true,
    enableArabic: true,
  })

  console.log('Updating Pages (en)…')
  await updateGlobal(token, 'pages', 'en', {
    home: {
      seoTitle: 'BIP Summit',
      seoDescription:
        'BIP — Becoming International Professionals — connects companies, innovators, and investors across technology, energy, healthcare, and more at summits in the Kurdistan Region.',
    },
    about: {
      seoTitle: 'About',
      seoDescription:
        'Learn about the BIP Program — connecting companies, innovators, and investors across the Kurdistan Region.',
      eyebrow: 'About Us',
    },
    summits: {
      seoTitle: 'Summits',
      seoDescription:
        'Explore BIP Summit editions — agendas, outcomes, and investment conversations from Erbil.',
    },
    news: {
      seoTitle: 'News & Blogs',
      seoDescription:
        'News and stories from BIP Summits and the BIP Program community.',
    },
    speakers: {
      seoTitle: 'Speakers',
      seoDescription: 'Meet the speakers shaping BIP Summit conversations.',
      listingTitle: 'Meet Our Speakers',
    },
    join: {
      seoTitle: 'Join BIP Program',
      seoDescription:
        'Join the BIP Program and stay connected to summits, dealrooms, and follow-up.',
      formTitle: 'Join BIP Program',
      successTitle: 'Successfully Registered',
    },
    partner: {
      seoTitle: 'Become a Partner',
      seoDescription:
        'Become a BIP partner — sponsor a track or collaborate on market entry.',
      formTitle: 'Become a Partner',
      benefitsHeading: 'Program Benefits',
    },
    contact: {
      seoTitle: 'Contact',
      seoDescription: 'Get in touch with the BIP Program team.',
      eyebrow: 'Contact Us',
      heading: 'Get in Touch',
    },
  })

  console.log('Updating Sections (en)…')
  await updateGlobal(token, 'sections', 'en', {
    missionTabs: [
      {
        tabId: 'mission',
        label: 'Our Mission',
        lead: 'Equip professionals and organizations with the',
        emphasis: 'networks, insight, and confidence',
        trail: 'to invest and operate across borders.',
      },
      {
        tabId: 'vision',
        label: 'Our Vision',
        lead: 'A Kurdistan Region where',
        emphasis: 'talent, capital, and technology',
        trail: 'compound into durable, globally connected growth.',
      },
      {
        tabId: 'what-we-do',
        label: 'What We Do',
        lead: 'We convene BIP Summits, run immersive tracks, and',
        emphasis: 'structure follow-up',
        trail:
          'so introductions become diligence — and diligence becomes deals.',
      },
    ],
    stats: [
      { value: '208', label: 'TOTAL ATTENDEES' },
      { value: '16+', label: 'COUNTRIES' },
      { value: '$360M+', label: 'INVESTMENT FACILITATED' },
      { value: '3', label: 'EDITIONS' },
      { value: '24', label: 'SPEAKERS' },
    ],
    sectors: KEY_SECTORS.map((s) => ({
      number: s.number,
      title: s.title,
      description: s.description,
      href: s.href,
    })),
    summitEditions: SUMMIT_EDITIONS.map((s) => ({
      year: s.year,
      description: s.description,
      href: s.href,
    })),
    videos: videoRows,
    gallery: galleryRows,
    mediaChannels: channelRows,
    programHighlights: PROGRAM_HIGHLIGHTS.map((h) => ({
      number: h.number,
      title: h.title,
      description: h.description,
    })),
    partnership: {
      sponsor: {
        title: PARTNERSHIP_OVERLAYS.sponsor.title,
        description: PARTNERSHIP_OVERLAYS.sponsor.description,
        benefits: PARTNERSHIP_OVERLAYS.sponsor.benefits.map((b) => ({
          number: b.number,
          text: b.text,
        })),
      },
      collaborator: {
        title: PARTNERSHIP_OVERLAYS.collaborator.title,
        description: PARTNERSHIP_OVERLAYS.collaborator.description,
        benefits: PARTNERSHIP_OVERLAYS.collaborator.benefits.map((b) => ({
          number: b.number,
          text: b.text,
        })),
      },
    },
    sectionIntros: { ...SECTION_INTROS },
    formIntros: { ...FORM_INTROS },
    aiChat: {
      welcome: 'Welcome to BIP AI',
      subtitle: 'Ask anything about BIP Summit',
      placeholder: 'Ask Here...',
      typing: 'BIP AI is typing…',
      replies: chatRows,
    },
  })

  console.log('Updating UI Labels (en / ku / ar)…')
  for (const locale of ['en', 'ku', 'ar'] as const) {
    await updateGlobal(token, 'translations', locale, {
      labels: LABEL_LOCALES[locale],
    })
  }

  console.log('Applying ku / ar chrome…')
  for (const locale of ['ku', 'ar'] as const) {
    const site = WEBSITE_LOCALES[locale]
    await updateGlobal(token, 'website', locale, {
      pioneeringHeadline: site.pioneeringHeadline,
      programBlurb: site.programBlurb,
      programIntro: site.programIntro,
      ctaBandBody: site.ctaBandBody,
      ctaBandHeading: site.ctaBandHeading,
      metaDescription: site.metaDescription,
      headerLinks: site.headerLinks,
      headerCtas: site.headerCtas,
      footerNavLinks: site.footerNavLinks,
      footerSocialLinks: site.footerSocialLinks,
      footerProgramLinks: site.footerProgramLinks,
    })
    await updateGlobal(token, 'pages', locale, PAGES_LOCALES[locale])
    const sections = SECTIONS_LOCALES[locale]
    await updateGlobal(token, 'sections', locale, {
      missionTabs: sections.missionTabs,
      stats: sections.stats,
      sectionIntros: sections.sectionIntros,
      formIntros: sections.formIntros,
      aiChat: sections.aiChat,
    })
  }

  console.log('Remote seed complete.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
