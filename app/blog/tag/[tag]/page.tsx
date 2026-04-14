import type { Metadata } from 'next'
import { getAllPosts, getAllTags, getPostsByTag } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { ArrowLeft, Hash } from 'lucide-react'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }))
}

export async function generateMetadata(props: PageProps<'/blog/tag/[tag]'>): Promise<Metadata> {
  const { tag } = await props.params
  return {
    title: `#${tag}`,
    description: `All Deskbly articles tagged with ${tag}.`,
    alternates: { canonical: `https://deskbly.com/blog/tag/${tag}` },
  }
}

export default async function TagPage(props: PageProps<'/blog/tag/[tag]'>) {
  const { tag } = await props.params
  const posts = getPostsByTag(tag)
  if (!posts.length) notFound()

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-orange-500 transition-colors mb-6">
            <ArrowLeft size={14} /> All articles
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-orange-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">Tag</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 flex items-center justify-center">
              <Hash size={20} className="text-orange-500" />
            </div>
            <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {tag}
            </h1>
          </div>
          <p className="text-stone-500 dark:text-stone-400">
            {posts.length} article{posts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} size="regular" />
          ))}
        </div>
      </div>
    </div>
  )
}
