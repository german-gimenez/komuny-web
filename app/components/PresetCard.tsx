'use client';

/**
 * PresetCard — card reusable de preset/asistente de Komuny Chat
 *
 * Usado en /chat (grid 2x3), /para-fundaciones (mini grid) y opcionalmente
 * en home dentro de un strip animado.
 *
 * Cada card representa un preset configurado en Komuny Chat (Asistente
 * Komuny, Generador de Rubrica, Planificador, Simplificador, Detector,
 * Bloom). El copy es identico al que aparece dentro del Chat real.
 *
 * Props:
 *  - title, desc, icon, color, bg
 *  - href: opcional para link al equivalente web
 *  - tag: 'NUEVO', 'Default' etc.
 *  - compact: version mas pequena (para strip horizontal)
 */

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Link from 'next/link';

export type Preset = {
  title: string;
  desc: string;
  icon: ReactNode;
  color: string;
  bg: string;
  href?: string;
  tag?: string;
  isDefault?: boolean;
};

export default function PresetCard({
  preset,
  index = 0,
  compact = false,
}: {
  preset: Preset;
  index?: number;
  compact?: boolean;
}) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="preset-card"
      style={{
        background: 'var(--bg-warm)',
        border: '1.5px solid var(--border)',
        borderRadius: compact ? '12px' : '16px',
        padding: compact ? '0.9rem 1rem' : '1.4rem',
        display: 'flex',
        gap: '0.9rem',
        alignItems: 'flex-start',
        cursor: preset.href ? 'pointer' : 'default',
        transition: 'border-color 0.18s, box-shadow 0.18s',
        height: '100%',
      }}
    >
      <div
        style={{
          width: compact ? '36px' : '44px',
          height: compact ? '36px' : '44px',
          borderRadius: compact ? '9px' : '11px',
          background: preset.bg,
          color: preset.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: `1px solid ${preset.color}25`,
        }}
      >
        {preset.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            flexWrap: 'wrap',
            marginBottom: '0.3rem',
          }}
        >
          <span
            style={{
              fontFamily: 'Fraunces, serif',
              fontWeight: 700,
              fontSize: compact ? '0.95rem' : '1.05rem',
              color: 'var(--ink)',
              lineHeight: 1.2,
            }}
          >
            {preset.title}
          </span>
          {preset.isDefault && (
            <span
              style={{
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                padding: '1px 7px',
                borderRadius: '20px',
                background: preset.color + '18',
                color: preset.color,
                border: `1px solid ${preset.color}35`,
              }}
            >
              Default
            </span>
          )}
          {preset.tag && (
            <span
              style={{
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                padding: '1px 7px',
                borderRadius: '20px',
                background: 'var(--accent-pale)',
                color: 'var(--accent)',
                border: '1px solid var(--accent-light)',
              }}
            >
              {preset.tag}
            </span>
          )}
        </div>
        <p
          style={{
            fontSize: compact ? '0.8rem' : '0.88rem',
            color: 'var(--ink-muted)',
            lineHeight: 1.55,
          }}
        >
          {preset.desc}
        </p>
      </div>
    </motion.div>
  );

  if (preset.href) {
    return (
      <Link href={preset.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        {card}
      </Link>
    );
  }

  return card;
}

// Lista canonical de presets - usada en /chat y home strip
export const KOMUNY_PRESETS: Preset[] = [
  {
    title: 'Asistente Komuny',
    desc: 'Tu asistente IA pedagogico generalista en espanol',
    icon: <span style={{ fontSize: '1.2rem' }}>🎓</span>,
    color: '#D4622A',
    bg: '#FBE9DF',
    isDefault: true,
  },
  {
    title: 'Generador de Rubrica',
    desc: 'Crea rubricas de evaluacion claras y alineadas a objetivos',
    icon: <span style={{ fontSize: '1.2rem' }}>📋</span>,
    color: '#D4622A',
    bg: '#FBE9DF',
    href: '/herramientas/rubrica',
  },
  {
    title: 'Planificador de Clases',
    desc: 'Diseña secuencias didacticas estructuradas',
    icon: <span style={{ fontSize: '1.2rem' }}>📅</span>,
    color: '#1A5C9A',
    bg: '#E0EDF7',
    href: '/herramientas/planificador',
  },
  {
    title: 'Simplificador de Textos',
    desc: 'Adapta textos al nivel lector de tus estudiantes',
    icon: <span style={{ fontSize: '1.2rem' }}>📖</span>,
    color: '#3A6B4A',
    bg: '#E8F2EC',
    href: '/herramientas/simplificador',
  },
  {
    title: 'Detector de Sesgos',
    desc: 'Analiza materiales en busca de sesgos involuntarios',
    icon: <span style={{ fontSize: '1.2rem' }}>🔎</span>,
    color: '#8B2FC9',
    bg: '#F2E8FB',
    href: '/herramientas/detector-sesgos',
  },
  {
    title: 'Banco de Preguntas Bloom',
    desc: 'Genera preguntas en los 6 niveles de Bloom',
    icon: <span style={{ fontSize: '1.2rem' }}>❓</span>,
    color: '#C9A227',
    bg: '#FBF3DC',
    href: '/herramientas/preguntas',
  },
];
