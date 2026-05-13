import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Komuny Chat — IA conversacional para educadores y fundaciones | Komuny Edu',
  description:
    'Plataforma IA con 6 presets pedagogicos pre-cargados (Asistente Komuny, Rubrica, Planificador, Simplificador, Sesgos, Bloom), agentes, MCPs, artifacts y memoria. Built with Anthropic, desarrollado por Napsix.AI.',
  keywords: [
    'Komuny Chat',
    'IA educativa',
    'Claude',
    'Anthropic',
    'LibreChat',
    'docentes',
    'fundaciones',
    'MCP',
    'agentes IA',
    'Napsix.AI',
    'LATAM',
  ],
  openGraph: {
    title: 'Komuny Chat — IA conversacional para educadores',
    description:
      '6 asistentes pedagogicos listos para usar, agentes, MCPs, memoria y mas. Open source, built with Anthropic.',
    type: 'website',
    url: 'https://komuny.org/chat',
    images: [
      {
        url: '/demo_dark_komuny_v2.png',
        width: 1200,
        height: 630,
        alt: 'Komuny Chat — interfaz con presets pedagogicos',
      },
    ],
    siteName: 'Komuny Edu',
    locale: 'es_LA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Komuny Chat — IA conversacional para educadores',
    description: '6 asistentes pedagogicos, agentes, MCPs y memoria. Built with Anthropic.',
    images: ['/demo_dark_komuny_v2.png'],
  },
  alternates: {
    canonical: 'https://komuny.org/chat',
  },
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
