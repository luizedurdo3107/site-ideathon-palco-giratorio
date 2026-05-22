import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'StagePro - Marketplace de Artes e Entretenimento',
  description: 'Conectamos artistas, técnicos e os melhores equipamentos do mercado para criar experiências inesquecíveis. Encontre músicos, atores, dançarinos, iluminação, som e muito mais.',
  keywords: ['artistas', 'músicos', 'bandas', 'eventos', 'shows', 'iluminação', 'som', 'palco', 'entretenimento', 'marketplace'],
  authors: [{ name: 'StagePro' }],
  creator: 'StagePro',
  publisher: 'StagePro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://stagepro.com.br'),
  openGraph: {
    title: 'StagePro - Marketplace de Artes e Entretenimento',
    description: 'Conectamos artistas, técnicos e os melhores equipamentos do mercado para criar experiências inesquecíveis.',
    url: 'https://stagepro.com.br',
    siteName: 'StagePro',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StagePro - Marketplace de Artes e Entretenimento',
    description: 'Conectamos artistas, técnicos e os melhores equipamentos do mercado para criar experiências inesquecíveis.',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'StagePro',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#e67e22',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
