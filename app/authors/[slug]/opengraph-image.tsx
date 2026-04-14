import { ImageResponse } from 'next/og'
import { authors } from '@/lib/authors'
import { getAllPosts } from '@/lib/posts'

export const dynamic = 'force-static'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }))
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = authors.find((a) => a.slug === slug)
  if (!author) return new Response('Not found', { status: 404 })

  const postCount = getAllPosts().filter((p) => p.author === author.name).length

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0c0a09',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top accent bar */}
        <div style={{ width: '100%', height: 6, background: '#f97316', display: 'flex' }} />

        {/* Content */}
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

          {/* Author info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#f9731622',
                border: '1.5px solid #f9731655',
                borderRadius: 100,
                padding: '6px 18px',
                alignSelf: 'flex-start',
              }}
            >
              <span style={{ color: '#f97316', fontSize: 16, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {author.role}
              </span>
            </div>
            <div
              style={{
                color: '#fafaf9',
                fontSize: 60,
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-1.5px',
              }}
            >
              {author.name}
            </div>
            <div style={{ color: '#a8a29e', fontSize: 22, lineHeight: 1.5, maxWidth: 820 }}>
              {author.bio}
            </div>
          </div>

          {/* Article count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#f97316',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              {author.name[0]}
            </div>
            <span style={{ color: '#78716c', fontSize: 18 }}>
              {postCount} article{postCount !== 1 ? 's' : ''} on Deskbly
            </span>
          </div>
        </div>

        {/* Bottom strip */}
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
          <span style={{ color: '#57534e', fontSize: 14 }}>deskbly.com/authors/{slug}</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
