'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import KomIA from './KomIA';
import NavBar from './NavBar';
import { ScrollProgressBar, BackToTop } from './ScrollProgress';

interface ToolLayoutProps {
  children: React.ReactNode;
  backLabel?: string;
  backHref?: string;
}

export default function ToolLayout({
  children,
  backLabel = 'Herramientas',
  backHref = '/herramientas',
}: ToolLayoutProps) {
  const socials = [
    { href: 'https://www.instagram.com/komuny.social/', label: 'Instagram' },
    { href: 'https://www.facebook.com/komuny.social/', label: 'Facebook' },
    { href: 'https://www.linkedin.com/company/komuny/', label: 'LinkedIn' },
    { href: 'https://github.com/german-gimenez/komuny', label: 'GitHub' },
  ];

  return (
    <main>
      <NavBar />
      <ScrollProgressBar />

      {/* BACK LINK */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '1.25rem 2rem 0' }}>
        <Link
          href={backHref}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            color: 'var(--ink-muted)',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={14} /> {backLabel}
        </Link>
      </div>

      {/* PAGE CONTENT */}
      {children}

      {/* FOOTER */}
      <footer
        style={{
          padding: '2.5rem 2rem',
          textAlign: 'center',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-warm)',
          marginTop: '4rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.82rem',
                color: 'var(--ink-muted)',
                textDecoration: 'none',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                border: '1.5px solid var(--border)',
                background: 'var(--bg)',
                fontWeight: 500,
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <Link
            href="/fundacion"
            style={{
              fontSize: '0.82rem',
              color: 'var(--accent)',
              textDecoration: 'none',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              border: '1.5px solid var(--accent-light)',
              background: 'var(--accent-pale)',
              fontWeight: 600,
            }}
          >
            Fundaci&#243;n Komuny Social
          </Link>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
          Komuny Edu &mdash; Hecho con amor para docentes de Am&#233;rica Latina &middot;{' '}
          <a
            href="https://napsix.ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)', textDecoration: 'none' }}
          >
            Napsix.AI
          </a>
        </p>
      </footer>

      <KomIA />
      <BackToTop />

      <style>{`
        html, body { overflow-x: hidden; max-width: 100vw; }
      `}</style>
    </main>
  );
}
