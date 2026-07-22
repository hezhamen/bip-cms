import type { GlobalConfig } from 'payload'
import { LText } from '../utilities/fields'

export const AiChat: GlobalConfig = {
  slug: 'ai-chat',
  label: 'AI Chat',
  access: {
    read: () => true,
  },
  fields: [
    LText('welcome', 'Welcome Title', 'Welcome to BIP AI'),
    LText('subtitle', 'Subtitle', 'Ask anything about BIP Summit'),
    LText('placeholder', 'Placeholder', 'Ask Here...'),
    LText('typing', 'Typing Indicator', 'BIP AI is typing…'),
  ],
}
