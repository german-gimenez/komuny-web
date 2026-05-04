import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'El sistema educativo no esta en crisis — Komuny Edu',
  description:
    'Facundo Vazquez plantea que el modelo educativo industrial ya se fracturo. Lo que viene no es una reforma, es una reinvencion. Desde Komuny respondemos con herramientas concretas para docentes latinoamericanos.',
  openGraph: {
    title: 'El sistema educativo no esta en crisis. Esta cumpliendo para lo que fue disenado. — Komuny Edu',
    description:
      'El paradigma educativo industrial ya se fracturo. Desde Komuny colaboramos con herramientas de IA open source para que la reinvencion empiece hoy, en el aula.',
    url: 'https://komuny.org/novedades/reinvencion-educativa',
    siteName: 'Komuny Edu',
    locale: 'es_AR',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El sistema educativo no esta en crisis — Komuny Edu',
    description:
      'El modelo educativo industrial ya se fracturo. Lo que viene es una reinvencion. Komuny construye herramientas open source para docentes de LATAM.',
  },
};

export default function ReinvencionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
