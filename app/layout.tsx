import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Hours — The most effective ED treatment available',
  description:
    'Hours is discreet, doctor-prescribed ED treatment delivered to your door. Licensed U.S. physicians, FDA-approved ingredients, packaging no one will notice.',
  generator: 'v0.app',
  openGraph: {
    title: 'Hours — The most effective ED treatment available',
    description:
      'Discreet, doctor-prescribed ED treatment delivered to your door. Licensed U.S. physicians. FDA-approved ingredients.',
    type: 'website',
  },
  icons: {
    icon: '/hours-logo.png',
    apple: '/hours-logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0b',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
