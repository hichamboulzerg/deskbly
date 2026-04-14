import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
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

          {/* Main content */}
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
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f97316', display: 'flex' }} />
              <span style={{ color: '#f97316', fontSize: 16, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Our Team
              </span>
            </div>
            <div
              style={{
                color: '#fafaf9',
                fontSize: 56,
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-1px',
                maxWidth: 900,
              }}
            >
              Meet the people behind Deskbly
            </div>
          </div>

          {/* Tagline */}
          <div style={{ color: '#a8a29e', fontSize: 22, lineHeight: 1.5, maxWidth: 760 }}>
            Writers and researchers passionate about better workspaces, honest gear reviews, and productivity that actually works.
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
          <span style={{ color: '#57534e', fontSize: 14 }}>deskbly.com/about</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
