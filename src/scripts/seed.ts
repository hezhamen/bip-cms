/**
 * Seed BIP CMS with English content from bip-web.
 * Run: pnpm seed  (Postgres via docker compose must be running)
 */
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'

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

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const BIP_WEB_PUBLIC = path.resolve(__dirname, '../../../bip-web/public')

const EN = 'en' as const

async function uploadFile(
  payload: Awaited<ReturnType<typeof getPayload>>,
  publicPath: string,
  alt: string,
  cache: Map<string, string>,
): Promise<string> {
  const cached = cache.get(publicPath)
  if (cached) return cached

  const absolute = path.join(BIP_WEB_PUBLIC, publicPath.replace(/^\//, ''))
  if (!fs.existsSync(absolute)) {
    throw new Error(`Missing media file: ${absolute}`)
  }

  const buffer = fs.readFileSync(absolute)
  const filename = path.basename(absolute)
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: buffer,
      mimetype: mimeFor(filename),
      name: filename,
      size: buffer.length,
    },
    locale: EN,
  })

  cache.set(publicPath, doc.id)
  console.log(`  media: ${publicPath} → ${doc.id}`)
  return doc.id
}

function mimeFor(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.svg') return 'image/svg+xml'
  if (ext === '.webp') return 'image/webp'
  return 'image/jpeg'
}

const TRANSLATIONS_EN = {
  register: 'Register',
  learnMore: 'Learn More',
  explore: 'Explore',
  viewAll: 'View All',
  submit: 'Submit',
  join: 'Join',
  sendMessage: 'Send Message',
  contact: 'Contact',
  joinUs: 'Join Us',
  askBipAi: 'Ask BIP AI',
  close: 'Close',
  closeDialog: 'Close dialog',
  closeOverlay: 'Close {title}',
  navHome: 'Home',
  navAbout: 'About',
  navSummits: 'Summits',
  navNews: 'News & Blogs',
  navPrograms: 'Programs',
  navContactUs: 'Contact Us',
  navWorkWithUs: 'Work With Us',
  navRegister: 'Register',
  footerNavTitle: 'NAVIGATION',
  footerSocialTitle: 'SOCIAL MEDIA',
  footerProgramsTitle: 'LAST PROGRAMS',
  footerContactTitle: 'Contact Dilnia',
  footerBlurb:
    'Empowering innovation through strategic partnerships and sustainable growth solutions.',
  logoHomeAria: 'BIP Summit home',
  logoAlt: 'BIP Summit',
  primaryNavAria: 'Primary',
  mobileNavAria: 'Mobile',
  openChatAria: 'Open BIP AI chat',
  toggleMenuAria: 'Toggle menu',
  socialFacebook: 'Facebook',
  socialInstagram: 'Instagram',
  socialLinkedin: 'Linkedin',
  socialYoutube: 'Youtube',
  socialWhatsapp: 'Whatsapp',
  socialX: 'X',
  meetOurSpeakers: 'Meet Our Speakers',
  keySectors: 'Key Sectors',
  youtubeHighlights: 'YouTube Highlights',
  newsBlog: 'News & Blog',
  summits: 'Summits',
  gallery: 'Gallery',
  mediaChannels: 'Media & Channels',
  participatingCountries: 'Participating Countries',
  programBenefits: 'Program Benefits',
  relatedArticles: 'Related Articles',
  aboutSpeaker: 'About Speaker',
  aboutUs: 'About Us',
  contactUs: 'Contact Us',
  getInTouch: 'Get in Touch',
  ctaBandHeading: 'Get in Touch',
  pioneeringPart1: 'A pioneering program that unites ',
  pioneeringPart2: 'companies, innovators, and investors ',
  pioneeringPart3: 'for a shared future of prosperity.',
  fullName: 'Full Name',
  lastName: 'Last Name',
  companyName: 'Company Name',
  positionTitle: 'Position / Title',
  emailAddress: 'Email Address',
  phoneNumber: 'Phone Number',
  address: 'Address',
  countryRegion: 'Country Region',
  industrySector: 'Industry sector',
  partnershipType: 'Partnership Type',
  subject: 'Subject',
  message: 'Message',
  registerFormTitle: 'Register for BIP Program',
  registerSubmit: 'Register',
  joinFormTitle: 'Join BIP Program',
  joinSubmit: 'Join',
  consentEmailPrivacy:
    'I agree to receive email updates and accept the Privacy Policy.',
  consentNewsletters:
    'I agree to receive newsletters, updates, and promotional offers. I can unsubscribe at any time.',
  joinSuccessTitle: 'Successfully Registered',
  partnerFormTitle: 'Become a Partner',
  partnerSubmit: 'Submit',
  contactSubmit: 'Send Message',
  optionKurdistan: 'Kurdistan Region',
  optionIraq: 'Iraq',
  optionUae: 'United Arab Emirates',
  optionOther: 'Other',
  optionTechnology: 'Technology & AI',
  optionEnergy: 'Green Energy',
  optionHealthcare: 'Healthcare',
  optionConstruction: 'Construction',
  optionBanking: 'Banking & Finance',
  optionTourism: 'Tourism & Hospitality',
  optionFranchise: 'Franchise Development',
  optionInvestment: 'Investment',
  optionSponsor: 'Sponsor',
  optionCollaborator: 'Collaborator',
  optionMediaPartner: 'Media Partner',
  previousImage: 'Previous image',
  nextImage: 'Next image',
  worldMapAlt: 'World map showing BIP Summit participating countries',
  browseNewsAria: 'Browse news articles',
  browseSpeakersAria: 'Browse speakers',
  aboutBipAria: 'About BIP',
  pageComingSoon: 'This page is coming soon.',
  mediaHeroAlt: 'Audience at a BIP Summit event',
  chatWelcome: 'Welcome to BIP AI',
  chatSubtitle: 'Ask anything about BIP Summit',
  chatPlaceholder: 'Ask Here...',
  sendMessageAria: 'Send message',
  closeChatAria: 'Close BIP AI chat',
  chatSrOnly: 'BIP AI chat',
  chatTyping: 'BIP AI is typing…',
}

async function clearCollection(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
) {
  const existing = await payload.find({
    collection: slug as 'speakers',
    limit: 500,
    depth: 0,
  })
  for (const doc of existing.docs) {
    await payload.delete({ collection: slug as 'speakers', id: doc.id })
  }
}

async function seed() {
  console.log('Initializing Payload…')
  const payload = await getPayload({ config })
  const mediaCache = new Map<string, string>()

  // Admin user
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@bipprograms.com'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'bip-admin-change-me'
  const users = await payload.find({
    collection: 'users',
    where: { email: { equals: adminEmail } },
    limit: 1,
  })
  if (users.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: { email: adminEmail, password: adminPassword },
    })
    console.log(`Created admin user: ${adminEmail}`)
  } else {
    console.log(`Admin user exists: ${adminEmail}`)
  }

  console.log('Uploading media…')
  const heroId = await uploadFile(
    payload,
    '/images/hero.jpg',
    'Audience at a BIP Summit event',
    mediaCache,
  )

  // Clear + reseed growing collections
  for (const slug of ['speakers', 'news-articles'] as const) {
    console.log(`Clearing ${slug}…`)
    await clearCollection(payload, slug)
  }

  console.log('Seeding speakers…')
  for (let i = 0; i < SPEAKERS.length; i++) {
    const s = SPEAKERS[i]!
    const imageId = await uploadFile(payload, s.image, s.name, mediaCache)
    await payload.create({
      collection: 'speakers',
      locale: EN,
      data: {
        name: s.name,
        slug: s.slug,
        role: s.role,
        image: imageId,
        bio: s.bio.map((paragraph) => ({ paragraph })),
        order: i,
      },
    })
  }

  console.log('Seeding news…')
  for (let i = 0; i < NEWS_ARTICLES.length; i++) {
    const a = NEWS_ARTICLES[i]!
    const imageId = await uploadFile(payload, a.image, a.title, mediaCache)
    const coverId = await uploadFile(payload, a.coverImage, a.title, mediaCache)
    await payload.create({
      collection: 'news-articles',
      locale: EN,
      data: {
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
      },
    })
  }

  console.log('Preparing section media…')
  const allVideos = [FEATURED_VIDEO, ...SIDEBAR_VIDEOS]
  const videoRows = []
  for (let i = 0; i < allVideos.length; i++) {
    const v = allVideos[i]!
    const imageId = await uploadFile(payload, v.image, v.title, mediaCache)
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
    const imageId = await uploadFile(payload, g.src, g.alt, mediaCache)
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
    const logoId = await uploadFile(payload, c.src, c.label, mediaCache)
    channelRows.push({ label: c.label, logo: logoId })
  }

  const chatRows = []
  for (const r of CHAT_REPLIES) {
    const imageId = r.image
      ? await uploadFile(payload, r.image, 'Chat reply image', mediaCache)
      : undefined
    chatRows.push({
      text: r.text,
      ...(imageId ? { image: imageId } : {}),
    })
  }

  console.log('Updating Website…')
  await payload.updateGlobal({
    slug: 'website',
    locale: EN,
    data: {
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
    },
  })

  console.log('Updating Pages…')
  await payload.updateGlobal({
    slug: 'pages',
    locale: EN,
    data: {
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
    },
  })

  console.log('Updating Sections…')
  await payload.updateGlobal({
    slug: 'sections',
    locale: EN,
    depth: 0,
    data: {
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
    },
  })

  console.log('Updating UI Labels…')
  await payload.updateGlobal({
    slug: 'translations',
    locale: EN,
    data: TRANSLATIONS_EN,
  })

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
