'use client';

/**
 * AnthropicBadge — branding partner reutilizable
 *
 * Variantes:
 *  - "inline"     → texto inline pequeño "Built with Anthropic" (footer, etc.)
 *  - "card"       → bloque con logo + descripcion (paginas /chat y /para-fundaciones)
 *  - "wordmark"   → solo el wordmark "Anthropic" (uso compacto)
 *
 * El logo se reconstruye en SVG inline para no depender de un asset.
 * Cuando se descargue el logo oficial desde anthropic.com/press-kit
 * se puede swappear por un <Image src="/anthropic-logo.svg" />.
 */

import { motion } from 'framer-motion';

const ANTHROPIC_ORANGE = '#CC785C'; // accent oficial de Anthropic

function AnthropicMark({ size = 18, color = ANTHROPIC_ORANGE }: { size?: number; color?: string }) {
  // "A" estilizada de Anthropic (4 barras verticales asimetricas formando A)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22.2 12L8 52h9.2l2.9-8.5h17.8l2.9 8.5H50L35.8 12H22.2zm.6 24.5l5.6-16.4 5.6 16.4H22.8z"
        fill={color}
      />
    </svg>
  );
}

function AnthropicWordmark({ height = 16, color = 'currentColor' }: { height?: number; color?: string }) {
  // Wordmark simplificado "Anthropic" con fontstyle similar al oficial
  return (
    <span
      style={{
        fontFamily: '"Inter", "Helvetica Neue", system-ui, sans-serif',
        fontWeight: 500,
        fontSize: `${height}px`,
        letterSpacing: '-0.01em',
        color,
        lineHeight: 1,
        display: 'inline-block',
      }}
    >
      Anthropic
    </span>
  );
}

export function AnthropicBadgeInline({ color = 'var(--ink-muted)' }: { color?: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontSize: '0.78rem',
        color,
        whiteSpace: 'nowrap',
      }}
    >
      <AnthropicMark size={13} color={ANTHROPIC_ORANGE} />
      <span>
        Built with <AnthropicWordmark height={13} color={color} />
      </span>
    </span>
  );
}

export function AnthropicBadgeWordmark({ color = 'var(--ink)' }: { color?: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        color,
      }}
    >
      <AnthropicMark size={18} color={ANTHROPIC_ORANGE} />
      <AnthropicWordmark height={16} color={color} />
    </span>
  );
}

export default function AnthropicBadge({
  variant = 'card',
  dark = false,
}: {
  variant?: 'inline' | 'card' | 'wordmark';
  dark?: boolean;
}) {
  if (variant === 'inline') return <AnthropicBadgeInline color={dark ? 'rgba(245,240,232,0.7)' : 'var(--ink-muted)'} />;
  if (variant === 'wordmark') return <AnthropicBadgeWordmark color={dark ? 'var(--bg)' : 'var(--ink)'} />;

  // card: bloque con logo grande + texto explicativo
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
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: ANTHROPIC_ORANGE + '18',
          border: `1px solid ${ANTHROPIC_ORANGE}40`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <AnthropicMark size={22} color={ANTHROPIC_ORANGE} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: dark ? 'rgba(245,240,232,0.55)' : 'var(--ink-muted)',
          }}
        >
          Built with
        </span>
        <AnthropicWordmark height={18} color={dark ? 'var(--bg)' : 'var(--ink)'} />
      </div>
    </motion.div>
  );
}

export { AnthropicMark, AnthropicWordmark, ANTHROPIC_ORANGE };
