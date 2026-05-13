'use client';

/**
 * SiteFooter — componente de footer estandar de Komuny Edu
 *
 * REGLA: Este componente DEBE aparecer en TODAS las paginas del sitio.
 * Al crear una nueva pagina o layout, siempre importar y agregar <SiteFooter />.
 *
 * Incluye:
 * - Logo Komuny (isologo a color)
 * - Links a redes sociales
 * - Links internos (Chat, Fundaciones, Herramientas, Novedades, Fundacion Komuny)
 * - Credito "Built with Anthropic" + "Desarrollado por Napsix.AI"
 */

import Link from 'next/link';
import { AnthropicBadgeInline } from './AnthropicBadge';

const socials = [
  { href: 'https://www.instagram.com/komuny.social/', label: 'Instagram' },
  { href: 'https://www.facebook.com/komuny.social/', label: 'Facebook' },
  { href: 'https://www.linkedin.com/company/komuny/', label: 'LinkedIn' },
  { href: 'https://github.com/german-gimenez/komuny', label: 'GitHub' },
];

const internalLinks = [
  { href: '/chat', label: 'Komuny Chat', highlight: true },
  { href: '/para-fundaciones', label: 'Para Fundaciones', highlight: true },
  { href: '/herramientas', label: 'Herramientas IA' },
  { href: '/fundacion', label: 'Fundacion Komuny Social' },
  { href: '/novedades', label: 'Novedades' },
];

export default function SiteFooter() {
  return (
    <footer
      style={{
        padding: '2.75rem 2rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-warm)',
        marginTop: 'auto',
      }}
    >
      {/* Logo wordmark color + tagline */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.65rem',
          marginBottom: '1.5rem',
        }}
      >
        <Link href="/" style={{ display: 'inline-block', textDecoration: 'none' }} aria-label="Komuny — Inicio">
          <img
            src="/komuny-logo-color.png"
            alt="Komuny"
            style={{
              height: '52px',
              width: 'auto',
              maxWidth: '260px',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Link>
        <span style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', fontWeight: 500 }}>
          IA para educadores y fundaciones de LATAM
        </span>
      </div>

      {/* Redes sociales */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
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
              fontSize: '0.8rem',
              color: 'var(--ink-muted)',
              textDecoration: 'none',
              padding: '0.35rem 0.9rem',
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
          gap: '0.5rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        {internalLinks.map(l => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              fontSize: '0.8rem',
              color: l.highlight ? 'var(--accent)' : 'var(--ink-muted)',
              textDecoration: 'none',
              padding: '0.35rem 0.9rem',
              borderRadius: '20px',
              border: `1.5px solid ${l.highlight ? 'var(--accent-light)' : 'var(--border)'}`,
              background: l.highlight ? 'var(--accent-pale)' : 'var(--bg)',
              fontWeight: l.highlight ? 600 : 500,
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Built with Anthropic + Napsix */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <AnthropicBadgeInline color="var(--ink-muted)" />
        <span
          aria-hidden="true"
          style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--border)' }}
        />
        <span style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
          Desarrollado por{' '}
          <a
            href="https://napsix.ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}
          >
            Napsix.AI
          </a>
        </span>
      </div>

      {/* Credito */}
      <p style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
        Komuny Edu &mdash; Hecho con amor para docentes de Am&eacute;rica Latina &middot;{' '}
        <Link
          href="/privacidad"
          style={{ color: 'var(--ink-muted)', textDecoration: 'none', fontWeight: 500 }}
        >
          Privacidad
        </Link>{' '}
        &middot;{' '}
        <Link
          href="/terminos"
          style={{ color: 'var(--ink-muted)', textDecoration: 'none', fontWeight: 500 }}
        >
          Terminos
        </Link>
      </p>
    </footer>
  );
}
