import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Browse all Deskbly articles on workspace design, gear reviews, and productivity.',
  alternates: { canonical: 'https://deskbly.com/blog' },
  openGraph: {
    title: 'All Articles | Deskbly',
    description: 'Browse all Deskbly articles on workspace design, gear reviews, and productivity.',
    url: 'https://deskbly.com/blog',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
