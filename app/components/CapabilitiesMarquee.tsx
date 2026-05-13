'use client';

/**
 * CapabilitiesMarquee — banda horizontal con scroll infinito
 *
 * Lista de features que se desplaza horizontalmente sin parar.
 * Duplica el contenido para loop seamless.
 *
 * Props:
 *  - items: array de strings o JSX
 *  - speed: 'slow' (default), 'normal', 'fast'
 *  - direction: 'left' (default) o 'right'
 *  - dark: usa colores invertidos
 */

import { ReactNode } from 'react';

type Speed = 'slow' | 'normal' | 'fast';

export default function CapabilitiesMarquee({
  items,
  speed = 'normal',
  direction = 'left',
  dark = false,
}: {
  items: ReactNode[];
  speed?: Speed;
  direction?: 'left' | 'right';
  dark?: boolean;
}) {
  const durMap = { slow: 50, normal: 35, fast: 22 };
  const dur = durMap[speed];
  const dir = direction === 'right' ? 'reverse' : 'normal';

  // Duplicamos los items para loop continuo
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        overflow: 'hidden',
        padding: '0.85rem 0',
        background: dark ? 'var(--ink)' : 'var(--bg-warm)',
        borderTop: `1px solid ${dark ? 'rgba(245,240,232,0.08)' : 'var(--border)'}`,
        borderBottom: `1px solid ${dark ? 'rgba(245,240,232,0.08)' : 'var(--border)'}`,
        position: 'relative',
      }}
    >
      {/* Fades laterales */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '80px',
          background: `linear-gradient(to right, ${dark ? 'var(--ink)' : 'var(--bg-warm)'} 0%, transparent 100%)`,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: '80px',
          background: `linear-gradient(to left, ${dark ? 'var(--ink)' : 'var(--bg-warm)'} 0%, transparent 100%)`,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div
        className="cap-marquee-track"
        style={{
          display: 'flex',
          gap: '2.5rem',
          width: 'fit-content',
          animationDuration: `${dur}s`,
          animationDirection: dir,
        }}
      >
        {doubled.map((it, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.88rem',
              color: dark ? 'rgba(245,240,232,0.78)' : 'var(--ink-muted)',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            {it}
          </span>
        ))}
      </div>

      <style>{`
        .cap-marquee-track {
          animation-name: cap-marquee-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes cap-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cap-marquee-track { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
