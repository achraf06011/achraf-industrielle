import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Toaster } from 'sonner'
import { routing } from '@/i18n/routing'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import type { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    fr: 'ACHRAF INDUSTRIELLE - Partenaire Industriel de Confiance au Maroc',
    en: 'ACHRAF INDUSTRIELLE - Your Trusted Industrial Partner in Morocco',
    ar: 'أشرف الصناعية - شريككم الصناعي الموثوق في المغرب',
  }

  const descriptions: Record<string, string> = {
    fr: 'Construction métallique, maintenance industrielle, usinage de précision, électricité industrielle. Leader industriel à Marrakech depuis 2016.',
    en: 'Metal construction, industrial maintenance, precision machining, industrial electricity. Industrial leader in Marrakech since 2016.',
    ar: 'البناء المعدني، الصيانة الصناعية، التصنيع الدقيق، الكهرباء الصناعية. رائد صناعي في مراكش منذ 2016.',
  }

  return {
    title: titles[locale] ?? titles.fr,
    description: descriptions[locale] ?? descriptions.fr,
    keywords:
      'construction métallique, maintenance industrielle, usinage, électricité industrielle, Marrakech, Maroc',
    authors: [{ name: 'ACHRAF INDUSTRIELLE' }],
    openGraph: {
      title: titles[locale] ?? titles.fr,
      description: descriptions[locale] ?? descriptions.fr,
      siteName: 'ACHRAF INDUSTRIELLE',
      locale,
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'ACHRAF INDUSTRIELLE — Marrakech' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] ?? titles.fr,
      description: descriptions[locale] ?? descriptions.fr,
    },
    robots: { index: true, follow: true },
    icons: {
      icon: '/logo.svg',
      shortcut: '/logo.svg',
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'fr' | 'en' | 'ar')) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = (await import(`../../../messages/${locale}.json`)).default
  const isRTL = locale === 'ar'

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
          <WhatsAppButton />
          <Toaster
            position={isRTL ? 'top-left' : 'top-right'}
            richColors
            toastOptions={{
              style: {
                background: '#0D1526',
                border: '1px solid rgba(15, 76, 129, 0.3)',
                color: '#fff',
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
