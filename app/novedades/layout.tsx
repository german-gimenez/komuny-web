import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Novedades — Komuny Edu',
  description:
    'Notas, reflexiones y contexto del ecosistema educativo latinoamericano. Lo que pasa afuera y como Komuny responde desde adentro con recursos open source para docentes.',
  openGraph: {
    title: 'Novedades del Ecosistema Educativo — Komuny Edu',
    description:
      'Lo que pasa en el ecosistema educativo latinoamericano y como Komuny responde con herramientas concretas para docentes.',
    url: 'https://komuny.org/novedades',
    siteName: 'Komuny Edu',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Novedades — Komuny Edu',
    description:
      'Ecosistema educativo latinoamericano. Reflexiones y respuestas concretas desde Komuny.',
  },
};

export default function NovedadesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
