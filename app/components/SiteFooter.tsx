'use client';

/**
 * SiteFooter — componente de footer estandar de Komuny Edu
 *
 * REGLA: Este componente DEBE aparecer en TODAS las paginas del sitio.
 * Al crear una nueva pagina o layout, siempre importar y agregar <SiteFooter />.
 *
 * Incluye:
 * - Links a redes sociales
 * - Link a Fundacion Komuny Social
 * - Link a Novedades
 * - Credito Napsix.AI
 */

import Link from 'next/link';

const socials = [
  { href: 'https://www.instagram.com/komuny.social/', label: 'Instagram' },
  { href: 'https://www.facebook.com/komuny.social/', label: 'Facebook' },
  { href: 'https://www.linkedin.com/company/komuny/', label: 'LinkedIn' },
  { href: 'https://github.com/german-gimenez/komuny', label: 'GitHub' },
];

const internalLinks = [
  { href: '/fundacion', label: 'Fundación Komuny Social' },
  { href: '/novedades', label: 'Novedades' },
  { href: '/herramientas', label: 'Herramientas IA' },
];

export default function SiteFooter() {
  return (
    <footer
      style={{
        padding: '2.5rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-warm)',
        marginTop: 'auto',
      }}
    >
      {/* Redes sociales */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.6rem',
          marginBottom: '1rem',
          flexWrap: 'wrap',
        }}
      >
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
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent-light)';
              e.currentTarget.style.color = 'var(--accent)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--ink-muted)';
            }}
          >
            {s.label}
          </a>
        ))}
      </div>

      {/* Links internos */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.6rem',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
        }}
      >
        {internalLinks.map(l => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              fontSize: '0.82rem',
              color: 'var(--accent)',
              textDecoration: 'none',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              border: '1.5px solid var(--accent-light)',
              background: 'var(--accent-pale)',
              fontWeight: 600,
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Credito */}
      <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
        Komuny Edu &mdash; Hecho con amor para docentes de Am&eacute;rica Latina &middot;{' '}
        <a
          href="https://napsix.ai"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}
        >
          Napsix.AI
        </a>
      </p>
    </footer>
  );
}
