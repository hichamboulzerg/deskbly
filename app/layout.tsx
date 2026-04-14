import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import BackToTop from '@/components/BackToTop'
import NewsletterPopup from '@/components/NewsletterPopup'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })

const BASE_URL = 'https://deskbly.com'

export const metadata: Metadata = {
  title: { default: 'Deskbly — Workspace Ideas Worth Stealing', template: '%s | Deskbly' },
  description: 'Gear reviews, workspace design, and productivity habits for people who care about where they work.',
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
    types: {
      'application/rss+xml': `${BASE_URL}/feed.xml`,
      'application/feed+json': `${BASE_URL}/feed.json`,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Deskbly',
    title: 'Deskbly — Workspace Ideas Worth Stealing',
    description: 'Gear reviews, workspace design, and productivity habits for people who care about where they work.',
    url: BASE_URL,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&h=630&fit=crop&auto=format&q=80',
        width: 1200,
        height: 630,
        alt: 'Deskbly — Workspace Ideas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deskbly — Workspace Ideas Worth Stealing',
    description: 'Gear reviews, workspace design, and productivity habits for people who care about where they work.',
    images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&h=630&fit=crop&auto=format&q=80'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <head>
        {/* Dark mode FOUC prevention — runs sync before paint */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GZZH9VS5EK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GZZH9VS5EK');
        `}</Script>
      </head>
      <body className="min-h-full flex flex-col bg-stone-50 dark:bg-stone-950 font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <BackToTop />
        <NewsletterPopup />
      </body>
    </html>
  )
}
