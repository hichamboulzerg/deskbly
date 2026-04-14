import Link from 'next/link'
import { getAllPosts, getFeaturedPosts, getAllCategories, formatDate } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import { ArrowRight, TrendingUp, Zap, BookOpen } from 'lucide-react'

export default function HomePage() {
  const featured = getFeaturedPosts()
  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const hero = featured[0]
  const secondary = featured[1]
  const latest = allPosts.filter((p) => !p.featured).slice(0, 6)
  const sidebarPosts = allPosts.slice(0, 4)

  return (
    <div className="bg-stone-50">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-stone-950">
        <img
          src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1800&h=900&fit=crop&auto=format&q=80"
          alt="Home office"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-orange-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                Workspace Intelligence
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Build the workspace{' '}
              <span className="text-orange-500">you deserve.</span>
            </h1>
            <p className="text-lg text-stone-300 leading-relaxed mb-8">
              Gear reviews, setup guides, and productivity ideas for people who believe where you work shapes how well you work.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors">
                Browse Articles <ArrowRight size={16} />
              </Link>
              <Link href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors">
                About Us
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-14 delay-3 fade-up">
            {[
              { icon: BookOpen, label: 'Articles', value: `${allPosts.length}+` },
              { icon: TrendingUp, label: 'Topics', value: `${categories.length}` },
              { icon: Zap, label: 'Readers', value: '12k+' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Icon size={18} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white leading-none">{value}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-orange-500 rounded-full" />
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Featured
            </h2>
          </div>
          <Link href="/blog" className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center gap-1 transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {hero && (
            <div className="lg:col-span-3">
              <PostCard post={hero} size="hero" />
            </div>
          )}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {secondary && <PostCard post={secondary} size="large" />}
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">Latest</p>
              {sidebarPosts.map((p) => (
                <PostCard key={p.slug} post={p} size="compact" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <div className="bg-white dark:bg-stone-900 border-y border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-stone-400">Browse:</span>
          <Link href="/blog"
            className="text-sm font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 px-4 py-1.5 rounded-full transition-colors">
            All
          </Link>
          {categories.map((cat) => {
            const count = allPosts.filter((p) => p.category === cat).length
            return (
              <Link key={cat} href={`/blog?category=${cat}`}
                className="text-sm font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-orange-50 dark:hover:bg-orange-900/30 hover:text-orange-700 dark:hover:text-orange-400 px-4 py-1.5 rounded-full transition-colors flex items-center gap-2">
                {cat}
                <span className="text-xs font-bold text-orange-500">{count}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── LATEST ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 bg-orange-500 rounded-full" />
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Latest Articles
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((post) => (
            <PostCard key={post.slug} post={post} size="regular" />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-colors">
            See all articles <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  )
}
