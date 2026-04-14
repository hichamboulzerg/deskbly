import { ImageResponse } from 'next/og'
import { getPostBySlug, getAllPosts } from '@/lib/posts'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

const catColor: Record<string, string> = {
  Workspace: '#3b82f6',
  Gear: '#f97316',
  Productivity: '#22c55e',
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return new Response('Not found', { status: 404 })

  const accent = catColor[post.category] ?? '#f97316'

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0c0a09',
          display: 'flex',
          flexDirection: 'column',
          padding: '0',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top accent bar */}
        <div style={{ width: '100%', height: 6, background: accent, display: 'flex' }} />

        {/* Content area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '56px 80px 48px',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                background: '#f97316',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: 22,
              }}
            >
              D
            </div>
            <span style={{ color: '#fff', fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px' }}>
              Deskbly
            </span>
          </div>

          {/* Title + category */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Category pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: `${accent}22`,
                border: `1.5px solid ${accent}55`,
                borderRadius: 100,
                padding: '6px 18px',
                alignSelf: 'flex-start',
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: accent, display: 'flex' }} />
              <span style={{ color: accent, fontSize: 16, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {post.category}
              </span>
            </div>

            {/* Title */}
            <div
              style={{
                color: '#fafaf9',
                fontSize: post.title.length > 60 ? 44 : 52,
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-1px',
                maxWidth: 960,
              }}
            >
              {post.title}
            </div>
          </div>

          {/* Author + read time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              {post.author[0]}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ color: '#fafaf9', fontWeight: 600, fontSize: 18 }}>{post.author}</span>
              <span style={{ color: '#a8a29e', fontSize: 15 }}>{post.authorRole} · {post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Bottom accent strip */}
        <div
          style={{
            width: '100%',
            height: 48,
            background: '#1c1917',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 80,
          }}
        >
          <span style={{ color: '#57534e', fontSize: 14 }}>deskbly.com</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
