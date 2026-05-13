'use client';

/**
 * AnthropicBadge — branding partner reutilizable
 *
 * Usa los **logos oficiales** descargados desde anthropic.com/press-kit,
 * disponibles en /public:
 *  - anthropic-logo-slate.svg / .png  (wordmark dark para fondo claro)
 *  - anthropic-logo-ivory.svg / .png  (wordmark light para fondo oscuro)
 *  - anthropic-symbol-slate.svg / .png (simbolo "A" dark)
 *  - anthropic-symbol-ivory.svg / .png (simbolo "A" light)
 *
 * Variantes:
 *  - "inline"    → texto inline pequeno "Built with Anthropic" (footer, etc.)
 *  - "card"      → bloque con simbolo + wordmark (paginas /chat y /para-fundaciones)
 *  - "wordmark"  → solo el wordmark "Anthropic" (uso compacto)
 *  - "symbol"    → solo el simbolo
 *
 * theme: 'slate' (default, para fondos claros) | 'ivory' (para fondos oscuros)
 */

import { motion } from 'framer-motion';

const ANTHROPIC_ORANGE = '#CC785C'; // accent oficial Anthropic — usado en acentos/borders (no en el logo)

// Dimensiones reales de los SVGs oficiales
const SYMBOL_RATIO = 92 / 64;  // width / height del symbol
const LOGO_RATIO = 590 / 68;   // width / height del wordmark

type Theme = 'slate' | 'ivory';

export function AnthropicSymbol({
  size = 20,
  theme = 'slate',
  alt = 'Anthropic',
}: {
  size?: number;
  theme?: Theme;
  alt?: string;
}) {
  return (
    <img
      src={`/anthropic-symbol-${theme}.svg`}
      alt={alt}
      width={Math.round(size * SYMBOL_RATIO)}
      height={size}
      style={{
        height: `${size}px`,
        width: 'auto',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
      loading="lazy"
      draggable={false}
    />
  );
}

export function AnthropicLogo({
  height = 18,
  theme = 'slate',
  alt = 'Anthropic',
}: {
  height?: number;
  theme?: Theme;
  alt?: string;
}) {
  return (
    <img
      src={`/anthropic-logo-${theme}.svg`}
      alt={alt}
      width={Math.round(height * LOGO_RATIO)}
      height={height}
      style={{
        height: `${height}px`,
        width: 'auto',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
      loading="lazy"
      draggable={false}
    />
  );
}

export function AnthropicBadgeInline({
  color = 'var(--ink-muted)',
  dark = false,
}: {
  color?: string;
  dark?: boolean;
}) {
  const theme: Theme = dark ? 'ivory' : 'slate';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        fontSize: '0.78rem',
        color,
        whiteSpace: 'nowrap',
        fontWeight: 500,
      }}
    >
      <AnthropicSymbol size={14} theme={theme} />
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.32rem' }}>
        Built with
        <AnthropicLogo height={11} theme={theme} />
      </span>
    </span>
  );
}

export function AnthropicBadgeWordmark({
  dark = false,
}: {
  dark?: boolean;
}) {
  const theme: Theme = dark ? 'ivory' : 'slate';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55rem',
      }}
    >
      <AnthropicSymbol size={18} theme={theme} />
      <AnthropicLogo height={14} theme={theme} />
    </span>
  );
}

export default function AnthropicBadge({
  variant = 'card',
  dark = false,
}: {
  variant?: 'inline' | 'card' | 'wordmark' | 'symbol';
  dark?: boolean;
}) {
  const theme: Theme = dark ? 'ivory' : 'slate';

  if (variant === 'inline') {
    return <AnthropicBadgeInline color={dark ? 'rgba(245,240,232,0.75)' : 'var(--ink-muted)'} dark={dark} />;
  }
  if (variant === 'wordmark') {
    return <AnthropicBadgeWordmark dark={dark} />;
  }
  if (variant === 'symbol') {
    return <AnthropicSymbol size={28} theme={theme} />;
  }

  // card: bloque con logo + texto explicativo
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.9rem',
        padding: '0.85rem 1.3rem',
        borderRadius: '14px',
        background: dark ? 'rgba(245,240,232,0.06)' : 'var(--bg-warm)',
        border: `1.5px solid ${dark ? 'rgba(245,240,232,0.12)' : 'var(--border)'}`,
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: ANTHROPIC_ORANGE + '15',
          border: `1px solid ${ANTHROPIC_ORANGE}40`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <AnthropicSymbol size={22} theme={theme} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
        <span
          style={{
            fontSize: '0.66rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            color: dark ? 'rgba(245,240,232,0.55)' : 'var(--ink-muted)',
          }}
        >
          Built with
        </span>
        <AnthropicLogo height={16} theme={theme} />
      </div>
    </motion.div>
  );
}

// Compat: ChatHero y otros usan AnthropicMark / AnthropicWordmark con props (size, color).
// Mantenemos esos aliases para retro-compat — el color se ignora porque el logo oficial
// tiene su propio color. Si se pide tema dark, devolvemos la version ivory.
export function AnthropicMark({
  size = 18,
  color,
}: {
  size?: number;
  color?: string;
}) {
  // Si color es claro/blanco/transparente, usamos ivory. Default slate.
  const isLight =
    color &&
    (color === '#fff' ||
      color === '#ffffff' ||
      color === 'white' ||
      color.toLowerCase().includes('245,240,232') ||
      color === 'var(--bg)');
  const theme: Theme = isLight ? 'ivory' : 'slate';
  return <AnthropicSymbol size={size} theme={theme} />;
}

export function AnthropicWordmark({
  height = 16,
  color,
}: {
  height?: number;
  color?: string;
}) {
  const isLight =
    color &&
    (color === '#fff' ||
      color === '#ffffff' ||
      color === 'white' ||
      color.toLowerCase().includes('245,240,232') ||
      color === 'var(--bg)');
  const theme: Theme = isLight ? 'ivory' : 'slate';
  return <AnthropicLogo height={height} theme={theme} />;
}

export { ANTHROPIC_ORANGE };
