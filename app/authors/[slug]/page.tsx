import { authors, getAuthorBySlug } from '@/lib/authors'
import { getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata(props: PageProps<'/authors/[slug]'>) {
  const { slug } = await props.params
  const author = getAuthorBySlug(slug)
  if (!author) return {}
  return {
    title: author.name,
    description: `Articles by ${author.name}, ${author.role} at Deskbly.`,
    alternates: { canonical: `https://deskbly.com/authors/${author.slug}` },
  }
}

export default async function AuthorPage(props: PageProps<'/authors/[slug]'>) {
  const { slug } = await props.params
  const author = getAuthorBySlug(slug)
  if (!author) notFound()

  const posts = getAllPosts().filter((p) => p.author === author!.name)

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <Link href="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-400 hover:text-white transition-colors mb-8">
            <ArrowLeft size={14} /> All writers
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src={author!.photo}
              alt={author!.name}
              className="w-24 h-24 rounded-2xl object-cover object-top shrink-0"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-1">{author!.role}</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {author!.name}
              </h1>
              <p className="text-stone-300 leading-relaxed max-w-xl">{author!.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 bg-orange-500 rounded-full" />
          <h2 className="text-xl font-bold text-stone-900"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {posts.length} article{posts.length !== 1 ? 's' : ''} by {author!.name}
          </h2>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} size="regular" />
            ))}
          </div>
        ) : (
          <p className="text-stone-400">No articles yet.</p>
        )}
      </div>
    </div>
  )
}
