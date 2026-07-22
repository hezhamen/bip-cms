import type { GlobalConfig } from 'payload'
import { LText } from '../utilities/fields'

export const FormIntros: GlobalConfig = {
  slug: 'form-intros',
  label: 'Form Intros',
  access: {
    read: () => true,
  },
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
}
