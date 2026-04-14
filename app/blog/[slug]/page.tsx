import { getPostBySlug, getAllPosts, formatDate } from '@/lib/posts'
import { getAuthorByName } from '@/lib/authors'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Tag, ArrowUpRight } from 'lucide-react'
import ShareButtons from '@/components/ShareButtons'
import ReadingProgress from '@/components/ReadingProgress'
import Comments from '@/components/Comments'
import TableOfContents, { type TocItem } from '@/components/TableOfContents'
import Breadcrumbs from '@/components/Breadcrumbs'

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://deskbly.com/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `https://deskbly.com/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function extractToc(content: string): TocItem[] {
  return content
    .trim()
    .split('\n')
    .filter((l) => l.startsWith('## ') || l.startsWith('### '))
    .map((l) => {
      const level = l.startsWith('### ') ? 3 : 2
      const text = l.startsWith('### ') ? l.slice(4) : l.slice(3)
      return { id: slugify(text), text, level } as TocItem
    })
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-orange-600 dark:text-orange-400 hover:underline font-medium">$1</a>')
}

function renderContent(content: string): React.ReactNode[] {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let key = 0
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (line.startsWith('## ')) {
      const text = line.slice(3)
      elements.push(<h2 key={key++} id={slugify(text)}>{text}</h2>)
    } else if (line.startsWith('### ')) {
      const text = line.slice(4)
      elements.push(<h3 key={key++} id={slugify(text)}>{text}</h3>)
    } else if (line.startsWith('> ')) {
      elements.push(<blockquote key={key++}>{line.slice(2)}</blockquote>)
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = []
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(lines[i].slice(2)); i++
      }
      elements.push(<ul key={key++}>{items.map((item, j) => <li key={j} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />)}</ul>)
      continue
    } else if (/^\d+\. /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, '')); i++
      }
      elements.push(<ol key={key++}>{items.map((item, j) => <li key={j} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />)}</ol>)
      continue
    } else if (line.trim()) {
      elements.push(<p key={key++} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />)
    }
    i++
  }
  return elements
}

const catStyle: Record<string, { bg: string; text: string }> = {
  Workspace:    { bg: 'bg-blue-50',   text: 'text-blue-700' },
  Gear:         { bg: 'bg-orange-50', text: 'text-orange-700' },
  Productivity: { bg: 'bg-green-50',  text: 'text-green-700' },
}

export default async function BlogPostPage(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const toc = extractToc(post!.content)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post!.title,
    description: post!.excerpt,
    image: post!.image,
    datePublished: post!.date,
    dateModified: post!.date,
    author: {
      '@type': 'Person',
      name: post!.author,
      jobTitle: post!.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Deskbly',
      url: 'https://deskbly.com',
      logo: { '@type': 'ImageObject', url: 'https://deskbly.com/icon' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://deskbly.com/blog/${post!.slug}`,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://deskbly.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://deskbly.com/blog' },
      { '@type': 'ListItem', position: 3, name: post!.category, item: `https://deskbly.com/blog?category=${post!.category}` },
      { '@type': 'ListItem', position: 4, name: post!.title, item: `https://deskbly.com/blog/${post!.slug}` },
    ],
  }

  const related = getAllPosts().filter((p) => p.slug !== slug && p.category === post!.category).slice(0, 2)
  const cat = catStyle[post!.category] ?? { bg: 'bg-stone-100', text: 'text-stone-600' }
  const authorData = getAuthorByName(post!.author)

  return (
    <div className="bg-stone-50 dark:bg-stone-950">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Cover */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <img src={post!.image} alt={post!.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute top-5 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl text-white bg-white/15 hover:bg-white/25 backdrop-blur-sm transition-colors border border-white/20">
            <ArrowLeft size={14} /> All Articles
          </Link>
        </div>
        <div className="absolute bottom-5 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${cat.bg} ${cat.text}`}>
            <Tag size={11} /> {post!.category}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="pt-6 pb-2">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post!.category, href: `/blog?category=${post!.category}` },
            { label: post!.title },
          ]} />
        </div>

        {/* Title card */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 sm:p-8 mt-4 shadow-lg border border-stone-100 dark:border-stone-800 mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100 leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {post!.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-stone-400">
            <Link href={authorData ? `/authors/${authorData.slug}` : '/about'} className="flex items-center gap-2 group">
              {authorData ? (
                <img src={authorData.photo} alt={post!.author} className="w-8 h-8 rounded-full object-cover object-top" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                  {post!.author[0]}
                </div>
              )}
              <div>
                <p className="font-semibold text-stone-700 dark:text-stone-200 text-sm group-hover:text-orange-600 transition-colors">{post!.author}</p>
                <p className="text-xs text-stone-400">{post!.authorRole}</p>
              </div>
            </Link>
            <span className="flex items-center gap-1"><Clock size={13} /> {post!.readTime}</span>
            <span>{formatDate(post!.date)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-16">
          {/* Article */}
          <article className="lg:col-span-2">
            <p className="text-xl text-stone-600 leading-relaxed mb-10 font-medium pl-4 border-l-4 border-orange-500">
              {post!.excerpt}
            </p>
            <div className="prose">{renderContent(post!.content)}</div>
            <div className="mt-10 pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-stone-500 dark:text-stone-400">Topic:</span>
              <Link href={`/blog?category=${post!.category}`}
                className={`text-sm font-semibold px-3 py-1 rounded-full ${cat.bg} ${cat.text} hover:opacity-80 transition-opacity`}>
                {post!.category}
              </Link>
              {post!.tags.map((tag) => (
                <Link key={tag} href={`/blog/tag/${tag}`}
                  className="text-sm font-medium px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-orange-50 dark:hover:bg-orange-900/30 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  #{tag}
                </Link>
              ))}
            </div>
            <ShareButtons title={post!.title} slug={post!.slug} />
            <div className="print:hidden"><Comments /></div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-5 print:hidden">
            {/* TOC */}
            {toc.length > 0 && <TableOfContents items={toc} />}

            {/* Author */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800">
              {authorData ? (
                <img src={authorData.photo} alt={post!.author} className="w-14 h-14 rounded-2xl object-cover object-top mb-4" />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center text-2xl font-bold text-white mb-4">
                  {post!.author[0]}
                </div>
              )}
              <p className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {post!.author}
              </p>
              <p className="text-sm text-orange-500 font-medium mb-3">{post!.authorRole}</p>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mb-4">
                {authorData ? authorData.bio : 'Expert writer at Deskbly covering workspace design, gear, and productivity since 2024.'}
              </p>
              {authorData && (
                <Link href={`/authors/${authorData.slug}`}
                  className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                  View all articles →
                </Link>
              )}
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800">
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-4">
                  More in {post!.category}
                </p>
                <div className="space-y-4">
                  {related.map((p) => (
                    <Link key={p.slug} href={`/blog/${p.slug}`} className="flex gap-3 group">
                      <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <p className="text-sm font-semibold text-stone-700 dark:text-stone-200 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                        {p.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-stone-950 rounded-2xl p-6 text-center">
              <p className="font-bold text-white text-lg mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Enjoy this article?
              </p>
              <p className="text-xs text-stone-400 mb-4">Get more workspace ideas in your inbox.</p>
              <Link href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl text-white bg-orange-500 hover:bg-orange-600 transition-colors">
                Get in touch <ArrowUpRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
