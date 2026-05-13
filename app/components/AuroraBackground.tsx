'use client';

/**
 * AuroraBackground — fondo animado con blobs gradiente
 *
 * Da sensacion de "vida" sin distraer. Usa filter blur + mix-blend para
 * mezclarse con el fondo de la pagina (light cream). Performance OK porque
 * todo se anima via CSS @keyframes (no JS loop).
 *
 * Props:
 *  - intensity: 'subtle' (default), 'medium', 'strong'
 *  - colors: array de 3 colores (default = paleta Komuny + Anthropic)
 *  - pattern: 'dots' (default), 'grid', 'none'
 */

import { ANTHROPIC_ORANGE } from './AnthropicBadge';

type Intensity = 'subtle' | 'medium' | 'strong';
type Pattern = 'dots' | 'grid' | 'none';

const DEFAULT_COLORS = ['#D4622A', '#1A5C9A', '#8B2FC9', ANTHROPIC_ORANGE];

export default function AuroraBackground({
  intensity = 'subtle',
  colors = DEFAULT_COLORS,
  pattern = 'dots',
  className = '',
}: {
  intensity?: Intensity;
  colors?: string[];
  pattern?: Pattern;
  className?: string;
}) {
  const opacityMap = { subtle: 0.18, medium: 0.3, strong: 0.45 };
  const opacity = opacityMap[intensity];

  return (
    <div
      className={`aurora-bg ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Blobs animados */}
      <div
        className="aurora-blob aurora-blob-1"
        style={{
          background: `radial-gradient(circle, ${colors[0]} 0%, transparent 65%)`,
          opacity,
        }}
      />
      <div
        className="aurora-blob aurora-blob-2"
        style={{
          background: `radial-gradient(circle, ${colors[1]} 0%, transparent 65%)`,
          opacity: opacity * 0.85,
        }}
      />
      <div
        className="aurora-blob aurora-blob-3"
        style={{
          background: `radial-gradient(circle, ${colors[2]} 0%, transparent 65%)`,
          opacity: opacity * 0.7,
        }}
      />
      {colors[3] && (
        <div
          className="aurora-blob aurora-blob-4"
          style={{
            background: `radial-gradient(circle, ${colors[3]} 0%, transparent 65%)`,
            opacity: opacity * 0.6,
          }}
        />
      )}

      {/* Pattern overlay */}
      {pattern === 'dots' && (
        <div
          className="aurora-pattern"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(26,18,8,0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          }}
        />
      )}
      {pattern === 'grid' && (
        <div
          className="aurora-pattern"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(26,18,8,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,18,8,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          }}
        />
      )}

      <style>{`
        .aurora-blob {
          position: absolute;
          width: 60vw;
          height: 60vw;
          max-width: 800px;
          max-height: 800px;
          border-radius: 50%;
          filter: blur(70px);
          mix-blend-mode: multiply;
          will-change: transform;
        }
        .aurora-blob-1 {
          top: -10%;
          left: -10%;
          animation: aurora-drift-1 22s ease-in-out infinite;
        }
        .aurora-blob-2 {
          top: 40%;
          right: -15%;
          animation: aurora-drift-2 28s ease-in-out infinite;
        }
        .aurora-blob-3 {
          bottom: -10%;
          left: 30%;
          animation: aurora-drift-3 25s ease-in-out infinite;
        }
        .aurora-blob-4 {
          top: 10%;
          right: 20%;
          width: 35vw;
          height: 35vw;
          animation: aurora-drift-4 30s ease-in-out infinite;
        }
        @keyframes aurora-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(8vw, 5vw) scale(1.08); }
          50% { transform: translate(4vw, 10vw) scale(0.95); }
          75% { transform: translate(-3vw, 4vw) scale(1.04); }
        }
        @keyframes aurora-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-6vw, 8vw) scale(1.05); }
          66% { transform: translate(-10vw, -4vw) scale(0.92); }
        }
        @keyframes aurora-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(6vw, -8vw) scale(1.1); }
        }
        @keyframes aurora-drift-4 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(-4vw, 6vw) scale(1.06) rotate(8deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-blob { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
