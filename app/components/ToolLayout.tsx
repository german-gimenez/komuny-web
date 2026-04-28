'use client';

import Link from 'next/link';
import { GitFork, ArrowLeft, Wrench } from 'lucide-react';
import KomIA from './KomIA';

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
      {/* NAV */}
      <nav
        className="site-nav"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(245,240,232,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <img
              src="/favicon.jpg"
              alt="Komuny"
              style={{ width: '28px', height: '28px', borderRadius: '6px', objectFit: 'cover' }}
            />
            <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
              Komuny Edu
            </span>
          </Link>
        </div>
        <div className="nav-links" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Link
            href="/herramientas"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.88rem',
              color: 'var(--accent)',
              textDecoration: 'none',
              padding: '0.3rem 0.7rem',
              fontWeight: 600,
            }}
          >
            <Wrench size={14} /> Herramientas
          </Link>
          <Link href="/#glosario" style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', textDecoration: 'none', padding: '0.3rem 0.7rem' }}>Glosario</Link>
          <Link href="/fundacion" className="nav-fundacion" style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', textDecoration: 'none', padding: '0.3rem 0.7rem' }}>
            Fundaci&#243;n
          </Link>
          <a
            href="https://github.com/german-gimenez/komuny"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-github"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              textDecoration: 'none',
              background: 'var(--ink)',
              color: 'var(--bg)',
              padding: '0.35rem 0.9rem',
              borderRadius: '20px',
              fontWeight: 500,
            }}
          >
            <GitFork size={14} /> <span className="nav-github-text">GitHub</span>
          </a>
          <div className="nav-socials" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ width: '1px', height: '18px', background: 'var(--border)', margin: '0 0.25rem' }} />
            {[
              { href: 'https://www.instagram.com/komuny.social/', label: 'IG' },
              { href: 'https://www.facebook.com/komuny.social/', label: 'FB' },
              { href: 'https://www.linkedin.com/company/komuny/', label: 'LI' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--ink-muted)',
                  textDecoration: 'none',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  border: '1px solid var(--border)',
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

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

      <style>{`
        html, body { overflow-x: hidden; max-width: 100vw; }
        .site-nav { padding: 0 2rem; }
        @media (max-width: 768px) {
          .site-nav { padding: 0 1rem !important; gap: 0.25rem; }
          .nav-socials { display: none !important; }
          .nav-links { gap: 0.25rem !important; }
          .nav-links a { font-size: 0.8rem !important; padding: 0.25rem 0.5rem !important; }
          .nav-github { padding: 0.3rem 0.6rem !important; font-size: 0.78rem !important; }
          .nav-github-text { display: none; }
          .nav-fundacion { display: none !important; }
        }
        @media (max-width: 480px) {
          .site-nav { padding: 0 0.75rem !important; }
        }
      `}</style>
    </main>
  );
}
