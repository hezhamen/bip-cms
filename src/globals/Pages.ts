import type { Field, GlobalConfig } from 'payload'
import { LText } from '../utilities/fields'

function pageSeoFields(defaults: {
  title: string
  description: string
}): Field[] {
  return [
    LText('seoTitle', 'SEO Title', defaults.title),
    LText('seoDescription', 'SEO Description', defaults.description, {
      textarea: true,
    }),
  ]
}

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  access: { read: () => true },
  fields: [
    ...pageSeoFields({
      title: 'About',
      description:
        'Learn about the BIP Program — connecting companies, innovators, and investors across the Kurdistan Region.',
    }),
    LText('eyebrow', 'Eyebrow', 'About Us'),
  ],
}

export const SummitsPage: GlobalConfig = {
  slug: 'summits-page',
  label: 'Summits Page',
  access: { read: () => true },
  fields: pageSeoFields({
    title: 'Summits',
    description:
      'Explore BIP Summit editions — agendas, outcomes, and investment conversations from Erbil.',
  }),
}

export const NewsPage: GlobalConfig = {
  slug: 'news-page',
  label: 'News Page',
  access: { read: () => true },
  fields: pageSeoFields({
    title: 'News & Blogs',
    description: 'News and stories from BIP Summits and the BIP Program community.',
  }),
}

export const SpeakersPage: GlobalConfig = {
  slug: 'speakers-page',
  label: 'Speakers Page',
  access: { read: () => true },
  fields: [
    ...pageSeoFields({
      title: 'Speakers',
      description: 'Meet the speakers shaping BIP Summit conversations.',
    }),
    LText('listingTitle', 'Listing Title', 'Meet Our Speakers'),
  ],
}

export const JoinPage: GlobalConfig = {
  slug: 'join-page',
  label: 'Join Page',
  access: { read: () => true },
  fields: [
    ...pageSeoFields({
      title: 'Join BIP Program',
      description: 'Join the BIP Program and stay connected to summits, dealrooms, and follow-up.',
    }),
    LText('formTitle', 'Form Title', 'Join BIP Program'),
    LText('successTitle', 'Success Title', 'Successfully Registered'),
  ],
}

export const PartnerPage: GlobalConfig = {
  slug: 'partner-page',
  label: 'Partner Page',
  access: { read: () => true },
  fields: [
    ...pageSeoFields({
      title: 'Become a Partner',
      description: 'Become a BIP partner — sponsor a track or collaborate on market entry.',
    }),
    LText('formTitle', 'Form Title', 'Become a Partner'),
    LText('benefitsHeading', 'Benefits Heading', 'Program Benefits'),
  ],
}

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  access: { read: () => true },
  fields: [
    ...pageSeoFields({
      title: 'Contact',
      description: 'Get in touch with the BIP Program team.',
    }),
    LText('eyebrow', 'Eyebrow', 'Contact Us'),
    LText('heading', 'Heading', 'Get in Touch'),
  ],
}

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  access: { read: () => true },
  fields: pageSeoFields({
    title: 'BIP Summit',
    description:
      'BIP — Becoming International Professionals — connects companies, innovators, and investors across technology, energy, healthcare, and more at summits in the Kurdistan Region.',
  }),
}
