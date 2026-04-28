'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileCheck2, CalendarDays, FileSearch, ScanSearch, HelpCircle, Sparkles, ArrowRight } from 'lucide-react';
import ToolLayout from '../components/ToolLayout';

const tools = [
  {
    href: '/herramientas/rubrica',
    icon: <FileCheck2 size={26} />,
    color: '#D4622A',
    bg: '#FBE9DF',
    badge: 'Evaluacion',
    badgeColor: '#D4622A',
    title: 'Generador de Rubrica',
    desc: 'Crea rubricas completas con criterios, niveles de desempeno y puntuacion. Lista para usar en minutos.',
    tags: ['Evaluacion', 'Primaria', 'Secundaria', 'Universitario'],
    tiempo: '~30 seg',
  },
  {
    href: '/herramientas/planificador',
    icon: <CalendarDays size={26} />,
    color: '#1A5C9A',
    bg: '#E0EDF7',
    badge: 'Planificacion',
    badgeColor: '#1A5C9A',
    title: 'Planificador de Clases',
    desc: 'Genera planificaciones didacticas completas: objetivos, desarrollo, recursos y criterios de evaluacion.',
    tags: ['Planificacion', 'Didactica', 'Curricular'],
    tiempo: '~45 seg',
  },
  {
    href: '/herramientas/simplificador',
    icon: <FileSearch size={26} />,
    color: '#3A6B4A',
    bg: '#E8F2EC',
    badge: 'Adaptacion',
    badgeColor: '#3A6B4A',
    title: 'Simplificador de Textos',
    desc: 'Adapta textos academicos complejos a cualquier nivel. Genera resumenes, explicaciones o preguntas de comprension.',
    tags: ['Comprension', 'Lectura', 'Adaptacion'],
    tiempo: '~20 seg',
  },
  {
    href: '/herramientas/detector-sesgos',
    icon: <ScanSearch size={26} />,
    color: '#8B2FC9',
    bg: '#F2E8FB',
    badge: 'Inclusion',
    badgeColor: '#8B2FC9',
    title: 'Detector de Sesgos',
    desc: 'Analiza tus actividades en busca de sesgos de genero, culturales o socioeconomicos. Con sugerencias inclusivas.',
    tags: ['Inclusion', 'Equidad', 'Diversidad'],
    tiempo: '~40 seg',
  },
  {
    href: '/herramientas/preguntas',
    icon: <HelpCircle size={26} />,
    color: '#C9A227',
    bg: '#FBF3DC',
    badge: 'Pedagogia',
    badgeColor: '#C9A227',
    title: 'Banco de Preguntas',
    desc: 'Genera preguntas clasificadas por Taxonomia de Bloom para cualquier tema. Ideales para debates y evaluaciones.',
    tags: ['Bloom', 'Pedagogia', 'Evaluacion'],
    tiempo: '~35 seg',
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
});

export default function HerramientasHub() {
  return (
    <ToolLayout backLabel="Inicio" backHref="/">
      {/* HERO */}
      <section style={{ padding: '3.5rem 2rem 2rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <motion.div {...fadeUp(0)}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--accent-pale)',
                border: '1px solid var(--accent-light)',
                padding: '0.35rem 1rem',
                borderRadius: '20px',
                marginBottom: '1.5rem',
              }}
            >
              <Sparkles size={13} color="var(--accent)" />
              <span style={{ fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.05em' }}>
                5 HERRAMIENTAS IA PARA DOCENTES
              </span>
            </div>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              marginBottom: '1rem',
            }}
          >
            Herramientas IA
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--accent)' }}>para el aula</em>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            style={{
              fontSize: '1.05rem',
              color: 'var(--ink-muted)',
              maxWidth: '560px',
              lineHeight: 1.7,
              marginBottom: '0.75rem',
            }}
          >
            Generadores con IA especialmente disenados para docentes latinoamericanos.
            Gratis, en espanol, sin necesidad de cuenta.
          </motion.p>

          <motion.p {...fadeUp(0.2)} style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
            Powered by{' '}
            <a href="https://napsix.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
              Napsix.AI
            </a>
          </motion.p>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section style={{ padding: '1.5rem 2rem 4rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tools.map((tool, i) => (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
            >
              <Link
                href={tool.href}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div
                  className="tool-card"
                  style={{
                    background: 'var(--bg-warm)',
                    border: '1.5px solid var(--border)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'flex-start',
                    transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.15s',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      background: tool.bg,
                      color: tool.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {tool.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                      <span
                        style={{
                          fontFamily: 'Fraunces, serif',
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          color: 'var(--ink)',
                        }}
                      >
                        {tool.title}
                      </span>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          padding: '2px 8px',
                          borderRadius: '20px',
                          background: tool.bg,
                          color: tool.color,
                          border: `1px solid ${tool.color}30`,
                        }}
                      >
                        {tool.badge}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.55, marginBottom: '0.75rem' }}>
                      {tool.desc}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {tool.tags.map(tag => (
                          <span
                            key={tag}
                            style={{
                              fontSize: '0.72rem',
                              color: 'var(--ink-muted)',
                              background: 'var(--bg)',
                              border: '1px solid var(--border)',
                              padding: '1px 8px',
                              borderRadius: '10px',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                          Generacion: <strong style={{ color: 'var(--ink)' }}>{tool.tiempo}</strong>
                        </span>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontSize: '0.85rem',
                            color: tool.color,
                            fontWeight: 600,
                          }}
                        >
                          Usar ahora <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <style>{`
        .tool-card:hover {
          border-color: var(--accent-light) !important;
          box-shadow: 0 4px 20px rgba(212,98,42,0.1);
          transform: translateY(-1px);
        }
      `}</style>
    </ToolLayout>
  );
}
