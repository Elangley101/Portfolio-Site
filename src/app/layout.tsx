import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { SiteAnalytics } from '@/components/layout/Analytics';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ThemeScript } from '@/components/layout/ThemeScript';
import { JsonLd } from '@/components/ui/JsonLd';
import { seo, site } from '@/content/site';
import { siteUrl } from '@/lib/env';
import { jsonLdGraph, personSchema, professionalServiceSchema, websiteSchema } from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-mono-code',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: seo.titleTemplate,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: site.name,
    title: seo.title,
    description: seo.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'technology',
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcfcfb' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0c0f' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const graph = jsonLdGraph(websiteSchema(), personSchema(), professionalServiceSchema());

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
      // ThemeScript may strip the dark class before hydration, which is an
      // intentional server/client difference on this element only.
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <JsonLd data={graph} />
        {/* Reveal animations start at opacity 0, so without JS they must be forced visible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;animation:none !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="bg-accent text-accent-contrast focus-visible:ring-accent sr-only rounded-md px-4 py-2 text-sm font-medium focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-[60]"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <SiteAnalytics />
      </body>
    </html>
  );
}
