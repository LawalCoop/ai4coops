// RootLayout.tsx (ejemplo actualizado)

import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { CustomCursor } from '@/components/ui/customCursor'
import Navbar from '@/components/Navbar'
import Footer from '@/sections/footer'
import { LoadingProvider } from '@/contexts/LoadingContext'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI for coops from coops',
  description: 'Exploring how AI can empower cooperativism.',
  metadataBase: new URL('https://lawal.coop/en/'),
  openGraph: {
    type: 'website',
    title: 'AI for coops from coops',
    description: 'Exploring how AI can empower cooperativism.',
    url: 'https://lawal.coop/en/',
    siteName: 'AI4Coops',
    images: [],
  },
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  let { locale } = await params
  if (!locale) {
    const userLocale = navigator.language || 'en'
    locale = routing.locales.find(l => userLocale.startsWith(l)) || 'en'
  }

  if (!routing.locales.includes(locale as 'en' | 'es')) {
    notFound()
  }

  const messages = await getMessages({ locale })

  return (
    <html lang={locale}>
      <body className={spaceGrotesk.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <LoadingProvider>
              <CustomCursor />
              <Navbar />
              <main>{children}</main>
              <Footer />
            </LoadingProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
