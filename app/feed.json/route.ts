import { getAllPosts } from '@/lib/posts'

export const dynamic = 'force-static'

export async function GET() {
  const posts = getAllPosts()
  const BASE_URL = 'https://deskbly.com'

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Deskbly',
    home_page_url: BASE_URL,
    feed_url: `${BASE_URL}/feed.json`,
    description: 'Gear reviews, workspace design, and productivity habits for people who care about where they work.',
    icon: `${BASE_URL}/icon`,
    favicon: `${BASE_URL}/icon`,
    language: 'en-US',
    items: posts.map((post) => ({
      id: `${BASE_URL}/blog/${post.slug}`,
      url: `${BASE_URL}/blog/${post.slug}`,
      title: post.title,
      summary: post.excerpt,
      image: post.image,
      date_published: new Date(post.date).toISOString(),
      authors: [{ name: post.author }],
      tags: [post.category, ...post.tags],
    })),
  }

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
