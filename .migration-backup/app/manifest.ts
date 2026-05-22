import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StagePro - Marketplace de Artes',
    short_name: 'StagePro',
    description: 'Conectamos artistas, técnicos e os melhores equipamentos do mercado para criar experiências inesquecíveis',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1a1f',
    theme_color: '#e67e22',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    categories: ['entertainment', 'business', 'lifestyle'],
    lang: 'pt-BR',
    dir: 'ltr',
    scope: '/',
    prefer_related_applications: false
  }
}
