'use client';

/**
 * BrowserFrame — mockup estilo macOS para wrappear screenshots
 *
 * Usado en /chat y home (nuevo ChatHero) para enmarcar las capturas
 * de Komuny Chat. Incluye barra superior con dots + URL bar opcional.
 *
 * Props:
 *  - children: el contenido (typicamente un <Image> o <img>)
 *  - url: string opcional para mostrar en la URL bar (ej. 'chat.komuny.org')
 *  - shadow: 'soft' (default), 'strong', 'none'
 */

import { ReactNode } from 'react';

type Shadow = 'soft' | 'strong' | 'none';

export default function BrowserFrame({
  children,
  url,
  shadow = 'soft',
  rounded = 12,
}: {
  children: ReactNode;
  url?: string;
  shadow?: Shadow;
  rounded?: number;
}) {
  const shadowMap = {
    none: 'none',
    soft: '0 20px 50px -15px rgba(26,18,8,0.25), 0 8px 16px -4px rgba(26,18,8,0.08)',
    strong:
      '0 40px 80px -20px rgba(26,18,8,0.4), 0 16px 32px -8px rgba(26,18,8,0.15)',
  };

  return (
    <div
      style={{
        background: '#1A1208',
        borderRadius: `${rounded}px`,
        overflow: 'hidden',
        border: '1px solid rgba(245,240,232,0.08)',
        boxShadow: shadowMap[shadow],
      }}
    >
      {/* Barra superior estilo macOS */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.55rem 0.85rem',
          gap: '0.4rem',
          background: '#0E0904',
          borderBottom: '1px solid rgba(245,240,232,0.06)',
        }}
      >
        {/* Dots */}
        <div style={{ display: 'flex', gap: '0.35rem', flexShrink: 0 }}>
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: '#FF5F57',
            }}
          />
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: '#FEBC2E',
            }}
          />
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: '#28C840',
            }}
          />
        </div>

        {/* URL bar */}
        {url && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                background: 'rgba(245,240,232,0.06)',
                border: '1px solid rgba(245,240,232,0.1)',
                borderRadius: '6px',
                padding: '0.2rem 0.7rem',
                fontSize: '0.72rem',
                color: 'rgba(245,240,232,0.65)',
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
                maxWidth: '70%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <span style={{ opacity: 0.5 }}>https://</span>
              {url}
            </div>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div style={{ display: 'block', lineHeight: 0 }}>{children}</div>
    </div>
  );
}
