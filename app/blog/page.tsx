'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PostGridSkeleton } from '@/components/PostCardSkeleton'

const PER_PAGE = 6

function BlogList() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') ?? undefined
  const [page, setPage] = useState(1)

  useEffect(() => { setPage(1) }, [category])

  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const filtered = category ? allPosts.filter((p) => p.category === category) : allPosts
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-orange-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">
              {category ?? 'All Topics'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {category ?? 'All Articles'}
          </h1>
          <p className="text-stone-500 dark:text-stone-400">
            {filtered.length} article{filtered.length !== 1 ? 's' : ''}{category ? ` about ${category.toLowerCase()}` : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link href="/blog"
            className={`text-sm font-semibold px-5 py-2 rounded-full transition-colors ${!category ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900' : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700'}`}>
            All
          </Link>
          {categories.map((cat) => (
            <Link key={cat} href={`/blog?category=${cat}`}
              className={`text-sm font-semibold px-5 py-2 rounded-full transition-colors ${category === cat ? 'bg-orange-500 text-white' : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700'}`}>
              {cat}
            </Link>
          ))}
          <Link href="/blog/archive"
            className="text-sm font-semibold px-5 py-2 rounded-full transition-colors bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700">
            Archive
          </Link>
        </div>

        {paginated.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((post) => (
                <PostCard key={post.slug} post={post} size="regular" />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  disabled={page === 1}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} /> Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      className={`w-9 h-9 rounded-xl text-sm font-semibold transition-colors ${p === page ? 'bg-orange-500 text-white' : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  disabled={page === totalPages}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <p className="text-lg text-stone-400 font-medium">No articles found.</p>
            <Link href="/blog" className="mt-4 inline-block text-sm font-medium text-orange-500 hover:underline">
              ← Back to all articles
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
        <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 h-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <PostGridSkeleton count={6} />
        </div>
      </div>
    }>
      <BlogList />
    </Suspense>
  )
}
