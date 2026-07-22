import React from 'react'

export const metadata = {
  description: 'BIP Summit CMS',
  title: 'BIP CMS',
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
