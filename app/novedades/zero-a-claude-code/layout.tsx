import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zero to Claude Code: curso gratuito para aprender terminal e IA — Komuny Edu',
  description:
    'Zero to Claude Code es un curso interactivo, gratuito y en espanol que ensena terminal, Git y programacion con IA desde cero. 147 lecciones para docentes que quieren pasar de usar IA a crear con IA.',
  openGraph: {
    title: 'Zero to Claude Code: de usuario de IA a creador con IA — Komuny Edu',
    description:
      '147 lecciones interactivas, gratuitas y en espanol para aprender terminal, Git y Claude Code sin experiencia previa. El recurso que recomendamos desde Komuny para docentes que quieren dar el siguiente paso.',
    url: 'https://komuny.org/novedades/zero-a-claude-code',
    siteName: 'Komuny Edu',
    locale: 'es_AR',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zero to Claude Code: curso gratuito para docentes — Komuny Edu',
    description:
      'Curso interactivo y gratuito: 147 lecciones para aprender terminal, Git y Claude Code desde cero. Disponible en espanol.',
  },
};

export default function ZeroAClaudeCodeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
