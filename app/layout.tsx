import type { Metadata, Viewport } from 'next';
import './globals.css';

// Viewport separado de metadata (requerido en Next.js 14+)
export const viewport: Viewport = {
  themeColor: '#D4622A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://komuny.org'),
  title: 'Komuny Edu — IA para Docentes Latinoamericanos',
  description: 'Recursos prácticos, abiertos y colaborativos para educadores que quieren integrar IA en el aula. Sin barreras técnicas.',
  // Manifest PWA
  manifest: '/manifest.json',
  // Iconos
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    // iOS — apple-touch-icon es critico para "Add to Home Screen"
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
    ],
  },
  // Open Graph
  openGraph: {
    title: 'Komuny Edu — IA para Docentes',
    description: 'Recursos open source de IA para educadores latinoamericanos.',
    type: 'website',
    url: 'https://komuny.org',
    images: [{ url: '/icons/icon-512x512.png', width: 512, height: 512, alt: 'Komuny Edu' }],
    siteName: 'Komuny Edu',
    locale: 'es_LA',
  },
  twitter: {
    card: 'summary',
    title: 'Komuny Edu — IA para Docentes',
    description: 'Recursos open source de IA para educadores latinoamericanos.',
    images: ['/icons/icon-512x512.png'],
  },
  // Meta tags para Apple PWA
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Komuny',
    startupImage: [
      { url: '/icons/icon-512x512.png' },
    ],
  },
  // SEO adicional
  keywords: ['educacion', 'inteligencia artificial', 'docentes', 'LATAM', 'herramientas IA', 'planificacion', 'rubricas'],
  authors: [{ name: 'Komuny Edu', url: 'https://komuny.org' }],
  creator: 'Komuny Edu — Napsix.AI',
  publisher: 'Napsix.AI',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://komuny.org',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
      <head>
        {/* iOS Safari PWA meta tags — no cubiertos por Next.js metadata API */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        {/* Splash screens iOS (genericos — en prod se pueden agregar por device) */}
        <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png" />
        {/* Microsoft Tiles (Windows Phone / Edge) */}
        <meta name="msapplication-TileColor" content="#D4622A" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <meta name="msapplication-config" content="none" />
        {/* Color de fondo para navegadores */}
        <meta name="theme-color" content="#D4622A" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#B8501F" media="(prefers-color-scheme: dark)" />
      </head>
      <body style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
        {children}
      </body>
    </html>
  );
}
