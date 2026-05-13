import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Komuny para Fundaciones — IA generativa lista para tu organizacion | Komuny Edu',
  description:
    'Stack educativo open source para fundaciones de LATAM. Chat IA con tu marca, presets pedagogicos a medida, acompanamiento Napsix.AI y modelos Anthropic.',
  keywords: [
    'fundaciones LATAM',
    'IA educativa',
    'Komuny',
    'Anthropic',
    'Claude para nonprofits',
    'capacitacion docente',
    'tecnologia educativa',
    'B2B IA',
    'Napsix.AI',
  ],
  openGraph: {
    title: 'Komuny para Fundaciones',
    description:
      'Llevamos Komuny Chat a tu fundacion: white-label, presets a medida, hecho con Anthropic.',
    type: 'website',
    url: 'https://komuny.org/para-fundaciones',
    images: [
      {
        url: '/demo_dark_komuny_v2.png',
        width: 1200,
        height: 630,
        alt: 'Komuny Chat para Fundaciones',
      },
    ],
    siteName: 'Komuny Edu',
    locale: 'es_LA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Komuny para Fundaciones',
    description: 'Stack IA open source para fundaciones educativas de LATAM.',
    images: ['/demo_dark_komuny_v2.png'],
  },
  alternates: {
    canonical: 'https://komuny.org/para-fundaciones',
  },
};

export default function ParaFundacionesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
