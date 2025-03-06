import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { CustomCursor } from '@/components/ui/customCursor'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

// Metadata needs to be exported this way in Next.js 13+
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: any
}>) {
  const { locale } = params
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={spaceGrotesk.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <CustomCursor />

            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
