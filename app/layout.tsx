import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Komuny Edu — IA para Docentes Latinoamericanos',
  description: 'Recursos prácticos, abiertos y colaborativos para educadores que quieren integrar IA en el aula. Sin barreras técnicas.',
  icons: {
    icon: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
  openGraph: {
    title: 'Komuny Edu — IA para Docentes',
    description: 'Recursos open source de IA para educadores latinoamericanos.',
    type: 'website',
    url: 'https://komuny.org',
    images: [{ url: '/favicon.jpg' }],
  },
  twitter: {
    card: 'summary',
    title: 'Komuny Edu — IA para Docentes',
    description: 'Recursos open source de IA para educadores latinoamericanos.',
    images: ['/favicon.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body>{children}</body></html>;
}
