import Link from 'next/link'
import { Post, formatDate } from '@/lib/posts'
import { ArrowUpRight, Clock } from 'lucide-react'

const catStyle: Record<string, { bg: string; text: string }> = {
  Workspace:    { bg: 'bg-blue-50',   text: 'text-blue-700' },
  Gear:         { bg: 'bg-orange-50', text: 'text-orange-700' },
  Productivity: { bg: 'bg-green-50',  text: 'text-green-700' },
}

interface PostCardProps {
  post: Post
  size?: 'hero' | 'large' | 'regular' | 'compact'
}

export default function PostCard({ post, size = 'regular' }: PostCardProps) {
  const cat = catStyle[post.category] ?? { bg: 'bg-stone-100', text: 'text-stone-600' }

  /* ── HERO ── */
  if (size === 'hero') {
    return (
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <article className="relative rounded-2xl overflow-hidden h-full min-h-[420px]">
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="relative h-full min-h-[420px] flex flex-col justify-between p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
                {post.category}
              </span>
              <span className="text-xs text-white/70">{formatDate(post.date)}</span>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 group-hover:underline underline-offset-4 decoration-2 line-clamp-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {post.title}
              </h2>
              <p className="text-sm text-white/75 leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center text-xs font-bold text-white">
                    {post.author[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{post.author}</p>
                    <p className="text-xs text-white/60">{post.readTime}</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowUpRight size={18} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  /* ── LARGE ── */
  if (size === 'large') {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
          <div className="h-48 overflow-hidden relative">
            <img src={post.image} alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${cat.bg} ${cat.text}`}>
              {post.category}
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug mb-2 group-hover:text-orange-600 transition-colors line-clamp-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {post.title}
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="font-medium text-stone-600 dark:text-stone-300">{post.author}</span>
              <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  /* ── COMPACT ── */
  if (size === 'compact') {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="flex gap-3 py-3.5 border-b border-stone-100 dark:border-stone-800 last:border-0">
          <div className="shrink-0 w-14 h-14 rounded-xl overflow-hidden">
            <img src={post.image} alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div className="min-w-0">
            <span className={`text-xs font-semibold ${cat.text}`}>{post.category}</span>
            <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2 mt-0.5">
              {post.title}
            </h4>
            <p className="text-xs text-stone-400 mt-0.5">{post.readTime}</p>
          </div>
        </article>
      </Link>
    )
  }

  /* ── REGULAR ── */
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        <div className="relative overflow-hidden h-48">
          <img src={post.image} alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${cat.bg} ${cat.text}`}>
            {post.category}
          </div>
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight size={14} className="text-white" />
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 leading-snug mb-2 group-hover:text-orange-600 transition-colors line-clamp-2 flex-1"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {post.title}
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2 mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-2 text-xs text-stone-400 mt-auto">
            <span className="font-medium text-stone-600 dark:text-stone-300">{post.author}</span>
            <span>·</span>
            <Clock size={10} />
            <span>{post.readTime}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
