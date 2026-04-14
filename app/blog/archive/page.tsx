import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'All Deskbly articles organised by date.',
  alternates: { canonical: 'https://deskbly.com/blog/archive' },
}

function groupByYearMonth(posts: ReturnType<typeof getAllPosts>) {
  const map: Record<string, Record<string, typeof posts>> = {}
  for (const post of posts) {
    const d = new Date(post.date)
    const year = d.getFullYear().toString()
    const month = d.toLocaleDateString('en-US', { month: 'long' })
    if (!map[year]) map[year] = {}
    if (!map[year][month]) map[year][month] = []
    map[year][month].push(post)
  }
  return map
}

const catColor: Record<string, string> = {
  Workspace: 'text-blue-600 dark:text-blue-400',
  Gear: 'text-orange-500',
  Productivity: 'text-green-600 dark:text-green-400',
}

export default function ArchivePage() {
  const posts = getAllPosts()
  const grouped = groupByYearMonth(posts)
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-orange-500 transition-colors mb-6">
            <ArrowLeft size={14} /> Back to blog
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-orange-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">
              Full Archive
            </span>
          </div>
          <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            All Articles
          </h1>
          <p className="text-stone-500 dark:text-stone-400">
            {posts.length} article{posts.length !== 1 ? 's' : ''} across {years.length} year{years.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Archive listing */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {years.map((year) => (
          <section key={year}>
            {/* Year header */}
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {year}
              </h2>
              <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800" />
              <span className="text-sm font-medium text-stone-400 dark:text-stone-500">
                {Object.values(grouped[year]).flat().length} articles
              </span>
            </div>

            {/* Months */}
            <div className="space-y-8">
              {Object.entries(grouped[year]).map(([month, monthPosts]) => (
                <div key={month}>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 w-28 shrink-0">
                      {month}
                    </h3>
                    <span className="text-xs font-medium text-stone-300 dark:text-stone-700 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-full">
                      {monthPosts.length}
                    </span>
                  </div>

                  <div className="space-y-1 pl-0 sm:pl-32">
                    {monthPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-white dark:hover:bg-stone-900 border border-transparent hover:border-stone-200 dark:hover:border-stone-800 transition-all"
                      >
                        <div className="shrink-0 w-10 h-10 rounded-xl overflow-hidden">
                          <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 group-hover:text-orange-600 transition-colors line-clamp-1">
                            {post.title}
                          </p>
                          <p className={`text-xs font-medium mt-0.5 ${catColor[post.category] ?? 'text-stone-500'}`}>
                            {post.category} · {post.readTime}
                          </p>
                        </div>
                        <ChevronRight size={14} className="text-stone-300 dark:text-stone-600 group-hover:text-orange-500 transition-colors shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
