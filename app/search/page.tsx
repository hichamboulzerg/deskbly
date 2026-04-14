'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import { Search, X } from 'lucide-react'
import Link from 'next/link'

const allPosts = getAllPosts()

const fuse = new Fuse(allPosts, {
  keys: [
    { name: 'title',    weight: 3 },
    { name: 'excerpt',  weight: 2 },
    { name: 'tags',     weight: 2 },
    { name: 'category', weight: 1 },
    { name: 'author',   weight: 1 },
    { name: 'content',  weight: 0.5 },
  ],
  threshold: 0.35,
  includeScore: true,
  minMatchCharLength: 2,
})

const QUICK_FILTERS = [
  { label: 'Workspace', value: 'workspace' },
  { label: 'Gear',      value: 'gear' },
  { label: 'Productivity', value: 'productivity' },
  { label: 'Ergonomics', value: 'ergonomics' },
  { label: 'Remote Work', value: 'remote-work' },
  { label: 'Focus',      value: 'focus' },
  { label: 'Buying Guide', value: 'buying-guide' },
]

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')

  // Sync from URL on mount / back-navigation
  useEffect(() => {
    const q = searchParams.get('q') ?? ''
    setQuery(q)
  }, [searchParams])

  // Debounced URL sync
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = query.trim()
      const params = new URLSearchParams()
      if (trimmed) params.set('q', trimmed)
      const newUrl = trimmed ? `/search?${params.toString()}` : '/search'
      router.replace(newUrl, { scroll: false })
    }, 300)
    return () => clearTimeout(timer)
  }, [query, router])

  const results = useMemo(() => {
    const q = query.trim()
    if (q.length < 2) return []
    return fuse.search(q).map((r) => r.item)
  }, [query])

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-orange-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">Search</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Find an article
          </h1>

          {/* Search input */}
          <div className="relative max-w-xl mb-5">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <input
              autoFocus
              type="text"
              placeholder="Search by title, topic, tag, or author…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 text-sm outline-none focus:border-orange-500 transition-colors shadow-sm"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Quick filter pills */}
          <div className="flex flex-wrap gap-2">
            {QUICK_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setQuery(f.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  query.trim().toLowerCase() === f.value
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-orange-400 hover:text-orange-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Empty state */}
        {query.trim().length < 2 && !query && (
          <div className="text-center py-20">
            <Search size={40} className="text-stone-300 dark:text-stone-600 mx-auto mb-4" />
            <p className="text-stone-400 font-medium">Start typing to search all {allPosts.length} articles</p>
            <p className="text-stone-400 text-sm mt-2">Or pick a topic above</p>
          </div>
        )}

        {/* Short query nudge */}
        {query.trim().length === 1 && (
          <div className="text-center py-20">
            <Search size={40} className="text-stone-300 dark:text-stone-600 mx-auto mb-4" />
            <p className="text-stone-400 font-medium">Keep typing…</p>
          </div>
        )}

        {/* No results */}
        {query.trim().length >= 2 && results.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg font-semibold text-stone-700 dark:text-stone-300 mb-2">
              No results for &ldquo;{query}&rdquo;
            </p>
            <p className="text-stone-400 text-sm mb-8">Try a different keyword or browse by category.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/blog?category=workspace"
                className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-sm font-semibold text-stone-600 dark:text-stone-300 hover:border-orange-400 hover:text-orange-600 transition-colors bg-white dark:bg-stone-800">
                Workspace
              </Link>
              <Link href="/blog?category=gear"
                className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-sm font-semibold text-stone-600 dark:text-stone-300 hover:border-orange-400 hover:text-orange-600 transition-colors bg-white dark:bg-stone-800">
                Gear
              </Link>
              <Link href="/blog?category=productivity"
                className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-sm font-semibold text-stone-600 dark:text-stone-300 hover:border-orange-400 hover:text-orange-600 transition-colors bg-white dark:bg-stone-800">
                Productivity
              </Link>
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <>
            <p className="text-sm text-stone-400 mb-6">
              {results.length} result{results.length !== 1 ? 's' : ''} for{' '}
              <span className="font-semibold text-stone-600 dark:text-stone-300">&ldquo;{query}&rdquo;</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((post) => (
                <PostCard key={post.slug} post={post} size="regular" />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
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
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
