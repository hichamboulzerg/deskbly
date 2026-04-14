import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Deskbly',
    short_name: 'Deskbly',
    description: 'Gear reviews, workspace design, and productivity habits for people who care about where they work.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafaf9',
    theme_color: '#f97316',
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
