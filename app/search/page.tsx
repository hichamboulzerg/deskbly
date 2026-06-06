import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Search } from 'lucide-react'
import SearchContent from './SearchContent'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search all Deskbly articles on workspace design, gear reviews, and productivity.',
  alternates: { canonical: 'https://deskbly.com/search' },
  openGraph: {
    title: 'Search | Deskbly',
    description: 'Search all Deskbly articles on workspace design, gear reviews, and productivity.',
    url: 'https://deskbly.com/search',
  },
  twitter: {
    card: 'summary',
    title: 'Search | Deskbly',
    description: 'Search all Deskbly articles on workspace design, gear reviews, and productivity.',
  },
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
        <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="h-8 w-48 bg-stone-100 dark:bg-stone-800 rounded animate-pulse mb-6" />
            <div className="h-12 w-full max-w-xl bg-stone-100 dark:bg-stone-800 rounded-xl animate-pulse" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center">
          <Search size={40} className="text-stone-300 mb-4" />
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
