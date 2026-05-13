'use client';

/**
 * NapsixBadge — branding "Powered by / Desarrollado por Napsix.AI"
 *
 * Usa el logo oficial /public/napsix-logo-black.png (color negro + acento verde
 * sobre fondo transparente).
 *
 * Variantes:
 *  - "inline"     → micro footer en linea, logo pequeno + texto opcional
 *  - "card"       → bloque con logo + label "Desarrollado por"
 *  - "wordmark"   → solo el logo
 *  - "pill-dark"  → logo dentro de pill clara para fondos oscuros (CTA dark)
 *  - "powered"    → variante "⚡ Powered by [logo]" para footer del KomIA drawer
 *
 * Todos los variants linkean a https://napsix.ai/komuny por defecto.
 */

import Link from 'next/link';

const NAPSIX_URL = 'https://napsix.ai/komuny';

type Variant = 'inline' | 'card' | 'wordmark' | 'pill-dark' | 'powered';

function NapsixLogoImg({
  height = 18,
  invert = false,
}: {
  height?: number;
  invert?: boolean;
}) {
  // El PNG es negro + verde. En fondos claros se ve perfecto. En fondos
  // oscuros con invert=true se hace blanco+verde aprox via CSS filter.
  // NOTA: invert no preserva colores exactos; mejor usar pill-dark variant
  // que envuelve el logo en una pill clara.
  return (
    <img
      src="/napsix-logo-black.png"
      alt="Napsix.AI"
      style={{
        height: `${height}px`,
        width: 'auto',
        display: 'inline-block',
        verticalAlign: 'middle',
        filter: invert ? 'invert(1) hue-rotate(180deg)' : 'none',
      }}
      loading="lazy"
      draggable={false}
    />
  );
}

export function NapsixLogo({ height = 18 }: { height?: number }) {
  return <NapsixLogoImg height={height} />;
}

export default function NapsixBadge({
  variant = 'inline',
  label = 'Desarrollado por',
  href = NAPSIX_URL,
  dark = false,
  height,
}: {
  variant?: Variant;
  label?: string;
  href?: string;
  dark?: boolean;
  height?: number;
}) {
  const link = (children: React.ReactNode) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
        transition: 'opacity 0.15s, transform 0.15s',
      }}
      className="napsix-badge-link"
      aria-label="Napsix.AI — napsix.ai/komuny"
    >
      {children}
    </a>
  );

  if (variant === 'wordmark') {
    return link(<NapsixLogoImg height={height || 33} />);
  }

  if (variant === 'inline') {
    return link(
      <>
        {label && (
          <span style={{ fontSize: '0.82rem', color: dark ? 'rgba(245,240,232,0.7)' : 'var(--ink-muted)', fontWeight: 500 }}>
            {label}
          </span>
        )}
        <NapsixLogoImg height={height || 24} />
      </>
    );
  }

  if (variant === 'powered') {
    // Variante para drawer del KomIA - "⚡ Powered by [logo]"
    return link(
      <>
        <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>⚡ Powered by</span>
        <NapsixLogoImg height={height || 21} />
      </>
    );
  }

  if (variant === 'pill-dark') {
    // Logo dentro de pill clara para usar sobre fondos oscuros
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="napsix-badge-link"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.55rem',
          textDecoration: 'none',
          padding: '0.55rem 1.05rem',
          borderRadius: '24px',
          background: 'var(--bg)',
          border: '1.5px solid var(--border)',
          transition: 'opacity 0.15s, transform 0.15s',
        }}
        aria-label="Napsix.AI — napsix.ai/komuny"
      >
        {label && (
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: 'var(--ink-muted)',
            }}
          >
            {label}
          </span>
        )}
        <NapsixLogoImg height={height || 27} />
      </a>
    );
  }

  // card: bloque con logo + label encima
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="napsix-badge-link"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.9rem',
        textDecoration: 'none',
        padding: '0.85rem 1.3rem',
        borderRadius: '14px',
        background: dark ? 'rgba(245,240,232,0.06)' : 'var(--bg-warm)',
        border: `1.5px solid ${dark ? 'rgba(245,240,232,0.12)' : 'var(--border)'}`,
        transition: 'border-color 0.15s, transform 0.15s',
      }}
      aria-label="Napsix.AI — napsix.ai/komuny"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
        <span
          style={{
            fontSize: '0.66rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            color: dark ? 'rgba(245,240,232,0.55)' : 'var(--ink-muted)',
          }}
        >
          {label}
        </span>
        <NapsixLogoImg height={height || 33} />
      </div>
    </a>
  );
}

// Helpers de uso comun
export function NapsixInlineCredit({ dark = false }: { dark?: boolean }) {
  return <NapsixBadge variant="inline" label="Desarrollado por" dark={dark} />;
}

export function NapsixPoweredBy({ dark = false }: { dark?: boolean }) {
  return <NapsixBadge variant="powered" dark={dark} />;
}

export { NAPSIX_URL };
