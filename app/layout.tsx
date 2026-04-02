import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Komuny Edu — IA para Docentes Latinoamericanos',
  description: 'Recursos prácticos, abiertos y colaborativos para educadores que quieren integrar IA en el aula. Sin barreras técnicas.',
  openGraph: { title: 'Komuny Edu', description: 'IA para docentes de LATAM — Open Source', type: 'website' }
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body>{children}</body></html>;
}
