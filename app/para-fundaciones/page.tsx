'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Building2,
  Sparkles,
  Brush,
  Handshake,
  GraduationCap,
  HeartHandshake,
  Users,
  Scale,
  Shield,
  Globe as GlobeIcon,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  Send,
  Mail,
  Check,
  Box,
  Wrench,
  BookOpen,
} from 'lucide-react';
import NavBar from '../components/NavBar';
import KomIA from '../components/KomIA';
import { ScrollProgressBar, BackToTop } from '../components/ScrollProgress';
import SiteFooter from '../components/SiteFooter';
import AnthropicBadge, { AnthropicMark, AnthropicWordmark, ANTHROPIC_ORANGE } from '../components/AnthropicBadge';
import AuroraBackground from '../components/AuroraBackground';
import BrowserFrame from '../components/BrowserFrame';
import PresetCard, { KOMUNY_PRESETS } from '../components/PresetCard';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const fadeUpInstant = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const stats = [
  { n: '5.4M', label: 'docentes adicionales que necesitara LATAM para 2030', accent: true },
  { n: '<25%', label: 'docentes capacitados en habilidades del futuro', accent: false },
  { n: '100%', label: 'Open Source — auditable y replicable', accent: false },
  { n: '+20', label: 'MCPs disponibles para extender el chat', accent: false },
];

const offerings = [
  {
    icon: <Brush size={22} />,
    color: '#D4622A',
    bg: '#FBE9DF',
    title: 'Chat con tu marca',
    desc: 'White-label deployment: logo, colores, dominio propio, footer institucional. Tus docentes ven el chat de tu fundacion, no el nuestro.',
  },
  {
    icon: <Bot22 />,
    color: '#1A5C9A',
    bg: '#E0EDF7',
    title: 'Presets a medida',
    desc: 'Disenamos asistentes pedagogicos especificos para tu programa, region o nivel educativo. Mas alla de los 6 incluidos.',
  },
  {
    icon: <Handshake size={22} />,
    color: '#8B2FC9',
    bg: '#F2E8FB',
    title: 'Acompanamiento Napsix.AI',
    desc: 'Implementacion, capacitacion del equipo, soporte tecnico y consultoria pedagogica. No quedas solo.',
  },
  {
    icon: <AnthropicMarkLarge />,
    color: ANTHROPIC_ORANGE,
    bg: ANTHROPIC_ORANGE + '15',
    title: 'Modelos Anthropic',
    desc: 'Claude Opus 4.6 y Sonnet 4.6 como motor. Disenados con foco en seguridad, alineamiento y razonamiento de alta calidad.',
  },
  {
    icon: <BookOpen size={22} />,
    color: '#3A6B4A',
    bg: '#E8F2EC',
    title: 'Contenido Komuny incluido',
    desc: '30+ terminos de glosario, 7 skills para Claude, 6 guias pedagogicas, packs de prompts en espanol. Listos para usar.',
  },
  {
    icon: <Shield size={22} />,
    color: '#C9A227',
    bg: '#FBF3DC',
    title: 'Privacidad y soberania',
    desc: 'Hosting en la region de tu fundacion, control sobre datos y retencion, SSO/SAML, datos no usados para entrenar modelos.',
  },
];

function Bot22() {
  return (
    <span style={{ display: 'inline-flex' }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="10" x="3" y="11" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" x2="8" y1="16" y2="16" />
        <line x1="16" x2="16" y1="16" y2="16" />
      </svg>
    </span>
  );
}

function AnthropicMarkLarge() {
  return <AnthropicMark size={22} color={ANTHROPIC_ORANGE} />;
}

const useCases = [
  {
    icon: <GraduationCap size={20} />,
    color: '#D4622A',
    title: 'Capacitacion docente masiva',
    desc: 'Tu fundacion forma 1.000+ docentes al año. Komuny Chat les da una herramienta IA practica para llevar al aula desde dia 1.',
  },
  {
    icon: <HeartHandshake size={20} />,
    color: '#8B2FC9',
    title: 'Asistente para programas sociales',
    desc: 'Tutor virtual para becarios, asistente para coordinadores territoriales, generador de materiales para campañas educativas.',
  },
  {
    icon: <Users size={20} />,
    color: '#1A5C9A',
    title: 'Tutor virtual para estudiantes',
    desc: 'Acompañamiento personalizado en programas de extension, becas, mentorias. Con presets adaptados al nivel de cada cohorte.',
  },
  {
    icon: <Wrench size={20} />,
    color: '#3A6B4A',
    title: 'Backoffice de ONG con MCPs',
    desc: 'Conecta Stripe (donaciones), Google Sheets (registros), Drive (documentos). Que la IA opere tus sistemas reales.',
  },
];

const stack = [
  { layer: 'Frontend del Chat', tech: 'LibreChat (open source)' },
  { layer: 'Motor IA', tech: 'Claude Opus 4.6 / Sonnet 4.6 (Anthropic)' },
  { layer: 'Hosting', tech: 'Vercel / Cloudflare / AWS (tu eleccion)' },
  { layer: 'Auth', tech: 'OAuth, SAML, SSO institucional' },
  { layer: 'Datos', tech: 'PostgreSQL / MongoDB (en tu region)' },
  { layer: 'Soporte', tech: 'Napsix.AI — implementacion y operacion' },
];

const respaldo = [
  {
    icon: <Scale size={15} />,
    label: 'Declarada de Interes por el Senado de Mendoza',
    href: 'https://senadomendoza.gob.ar/declaran-de-interes-una-fundacion-dedicada-a-la-educacion-y-capacitacion-de-docentes/',
  },
  {
    icon: <Shield size={15} />,
    label: 'Persona Juridica · CUIT 30-71735388-5',
    href: '/fundacion',
  },
  {
    icon: <Handshake size={15} />,
    label: 'Convenio con IES 9-029',
    href: 'https://www.ies9029.edu.ar/convenio-marco-de-cooperacion-entre-ies-9-029-y-fundacion-komuny/',
  },
];

const CONTACT_EMAIL = 'hola@napsix.ai';

export default function ParaFundacionesPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <NavBar />
      <ScrollProgressBar />

      {/* HERO */}
      <section
        style={{
          position: 'relative',
          padding: '5rem 2rem 4rem',
          overflow: 'hidden',
        }}
      >
        <AuroraBackground intensity="subtle" pattern="dots" />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1080px', margin: '0 auto' }}>
          <div
            className="fund-hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            <div>
              <motion.div {...fadeUpInstant(0)}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'var(--accent-pale)',
                    border: '1px solid var(--accent-light)',
                    padding: '0.4rem 1.1rem',
                    borderRadius: '24px',
                    marginBottom: '1.75rem',
                  }}
                >
                  <Building2 size={13} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontSize: '0.76rem', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.06em' }}>
                    PARA FUNDACIONES EDUCATIVAS LATAM
                  </span>
                </div>
              </motion.div>

              <motion.h1
                {...fadeUpInstant(0.08)}
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.12,
                  marginBottom: '1.25rem',
                }}
              >
                Lleva IA generativa
                <br />
                <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--accent)' }}>
                  a tu fundacion, sin construir desde cero
                </em>
              </motion.h1>

              <motion.p
                {...fadeUpInstant(0.16)}
                style={{
                  fontSize: '1.1rem',
                  color: 'var(--ink-muted)',
                  maxWidth: '500px',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                }}
              >
                Komuny Chat es el stack educativo que tu fundacion necesita para capacitar docentes,
                asistir programas sociales y acompañar estudiantes.{' '}
                <strong style={{ color: 'var(--ink)' }}>Open source, en espanol, con soporte Napsix.AI.</strong>
              </motion.p>

              <motion.div
                {...fadeUpInstant(0.24)}
                style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}
              >
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Komuny Chat para mi fundacion')}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'var(--ink)',
                    color: 'var(--bg)',
                    padding: '0.8rem 1.7rem',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                  }}
                >
                  <Mail size={16} /> Conversemos
                </a>
                <Link
                  href="/chat"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'transparent',
                    color: 'var(--ink)',
                    padding: '0.8rem 1.7rem',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    border: '1.5px solid var(--border)',
                  }}
                >
                  <MessageSquare size={16} /> Ver Komuny Chat <ArrowRight size={14} />
                </Link>
              </motion.div>

              <motion.div
                {...fadeUpInstant(0.32)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  marginTop: '2rem',
                  flexWrap: 'wrap',
                }}
              >
                <AnthropicBadge variant="card" />
                <div style={{ fontSize: '0.84rem', color: 'var(--ink-muted)' }}>
                  Desarrollado por{' '}
                  <a
                    href="https://napsix.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}
                  >
                    Napsix.AI
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Visual */}
            <motion.div
              {...fadeUpInstant(0.2)}
              className="fund-hero-visual"
              style={{ position: 'relative' }}
            >
              <BrowserFrame url="chat.tu-fundacion.org" shadow="strong">
                <picture>
                  <source srcSet="/demo_dark_komuny_v2.webp" type="image/webp" />
                  <img
                    src="/demo_dark_komuny_v2.png"
                    alt="Komuny Chat — vista para fundaciones"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    loading="lazy"
                  />
                </picture>
              </BrowserFrame>
            </motion.div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .fund-hero-grid {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
            .fund-hero-visual { order: -1; }
          }
        `}</style>
      </section>

      {/* STATS */}
      <section style={{ padding: '4rem 2rem', background: 'var(--bg-warm)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '0.5rem' }}>
              Por que ahora
            </h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '1rem' }}>
              La oportunidad de impacto es enorme
            </p>
          </motion.div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  padding: '1.75rem 1.25rem',
                  background: s.accent ? 'var(--accent)' : 'var(--bg)',
                  border: `1.5px solid ${s.accent ? 'transparent' : 'var(--border)'}`,
                  borderRadius: '16px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                    fontWeight: 700,
                    color: s.accent ? 'white' : 'var(--accent)',
                    marginBottom: '0.5rem',
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </div>
                <p style={{ fontSize: '0.86rem', color: s.accent ? 'rgba(255,255,255,0.9)' : 'var(--ink-muted)', lineHeight: 1.5 }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUE INCLUYE */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '0.5rem' }}>
              Que incluye Komuny para Fundaciones
            </h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '1rem', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7 }}>
              Una solucion integral: producto + acompanamiento + contenido pedagogico
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {offerings.map((o, i) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                className="offering-card"
                style={{
                  background: 'var(--bg-warm)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '16px',
                  padding: '1.6rem',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: o.bg,
                    color: o.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    border: `1px solid ${o.color}30`,
                  }}
                >
                  {o.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    color: 'var(--ink)',
                  }}
                >
                  {o.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.65 }}>
                  {o.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <style>{`
          .offering-card:hover {
            border-color: var(--accent-light) !important;
            box-shadow: 0 4px 20px rgba(212,98,42,0.08);
          }
        `}</style>
      </section>

      {/* CASOS DE USO */}
      <section style={{ padding: '5rem 2rem', background: 'var(--bg-warm)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '0.5rem' }}>
              Casos de uso para fundaciones
            </h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '1rem' }}>
              Como otras organizaciones podrian usar Komuny Chat
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                style={{
                  background: 'var(--bg)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  borderLeft: `4px solid ${uc.color}`,
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: uc.color + '15',
                    color: uc.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.85rem',
                  }}
                >
                  {uc.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    color: 'var(--ink)',
                    lineHeight: 1.25,
                  }}
                >
                  {uc.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', lineHeight: 1.6 }}>
                  {uc.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESETS INCLUIDOS VS A MEDIDA */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '0.5rem' }}>
              Presets incluidos + presets a medida
            </h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
              Empezas con 6 presets pedagogicos listos. Disenamos los que tu fundacion necesite.
            </p>
          </motion.div>

          <div
            className="presets-included-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
              alignItems: 'start',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--green)',
                  marginBottom: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.3rem 0.75rem',
                  background: 'var(--green-light)',
                  borderRadius: '20px',
                  border: '1px solid #3A6B4A40',
                }}
              >
                <Check size={12} /> INCLUIDOS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {KOMUNY_PRESETS.map((p, i) => (
                  <PresetCard key={p.title} preset={p} index={i} compact />
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--accent)',
                  marginBottom: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.3rem 0.75rem',
                  background: 'var(--accent-pale)',
                  borderRadius: '20px',
                  border: '1px solid var(--accent-light)',
                }}
              >
                <Sparkles size={12} /> A MEDIDA PARA TI
              </div>
              <div
                style={{
                  background: 'var(--bg-warm)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                }}
              >
                {[
                  'Asistente de programa social especifico',
                  'Tutor virtual para becarios de tu fundacion',
                  'Generador de materiales en idioma originario',
                  'Asistente de coordinacion territorial',
                  'Evaluador de impacto educativo',
                  'Bot interno para staff y voluntarios',
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.6rem',
                      fontSize: '0.92rem',
                      color: 'var(--ink)',
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'var(--accent-pale)',
                        color: 'var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '0.1rem',
                      }}
                    >
                      <Sparkles size={11} />
                    </span>
                    {item}
                  </motion.div>
                ))}
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginTop: '0.5rem', fontStyle: 'italic' }}>
                  ... o lo que tu fundacion necesite.
                </p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .presets-included-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* STACK TECNICO */}
      <section style={{ padding: '5rem 2rem', background: 'var(--ink)' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(212,98,42,0.18)',
                border: '1px solid rgba(212,98,42,0.35)',
                padding: '0.35rem 1rem',
                borderRadius: '20px',
                marginBottom: '1.25rem',
              }}
            >
              <Box size={13} style={{ color: 'var(--accent-light)' }} />
              <span style={{ fontSize: '0.78rem', color: 'var(--accent-light)', fontWeight: 600, letterSpacing: '0.06em' }}>
                STACK ABIERTO
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: 'var(--bg)', marginBottom: '0.5rem' }}>
              Tecnologia transparente
            </h2>
            <p style={{ color: 'rgba(245,240,232,0.65)', fontSize: '1rem' }}>
              Sin caja negra. Sabes exactamente que esta corriendo y donde.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            style={{
              background: 'rgba(245,240,232,0.05)',
              border: '1px solid rgba(245,240,232,0.12)',
              borderRadius: '14px',
              overflow: 'hidden',
            }}
          >
            {stack.map((row, i) => (
              <div
                key={row.layer}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  padding: '0.95rem 1.3rem',
                  borderBottom: i < stack.length - 1 ? '1px solid rgba(245,240,232,0.08)' : 'none',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(245,240,232,0.5)',
                  }}
                >
                  {row.layer}
                </span>
                <span style={{ fontSize: '0.95rem', color: 'var(--bg)', fontWeight: 500 }}>{row.tech}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* QUIENES YA CONFIAN */}
      <section style={{ padding: '4rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          <motion.h2 {...fadeUp(0)} style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '0.5rem' }}>
            Komuny ya tiene respaldo institucional
          </motion.h2>
          <motion.p
            {...fadeUp(0.05)}
            style={{ color: 'var(--ink-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}
          >
            Fundacion Komuny Social ya opera con reconocimientos legislativos y convenios.
          </motion.p>
          <motion.div
            {...fadeUp(0.1)}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}
          >
            {respaldo.map((b, i) =>
              b.href.startsWith('http') ? (
                <a
                  key={i}
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="respaldo-fund-badge"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    padding: '0.6rem 1.1rem',
                    borderRadius: '30px',
                    border: '1.5px solid var(--border)',
                    background: 'var(--bg-warm)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'var(--ink)',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ color: 'var(--accent)', display: 'flex' }}>{b.icon}</span>
                  {b.label}
                </a>
              ) : (
                <Link
                  key={i}
                  href={b.href}
                  className="respaldo-fund-badge"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    padding: '0.6rem 1.1rem',
                    borderRadius: '30px',
                    border: '1.5px solid var(--border)',
                    background: 'var(--bg-warm)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'var(--ink)',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ color: 'var(--accent)', display: 'flex' }}>{b.icon}</span>
                  {b.label}
                </Link>
              )
            )}
          </motion.div>
        </div>

        <style>{`
          .respaldo-fund-badge:hover {
            border-color: var(--accent-light) !important;
            box-shadow: 0 2px 12px rgba(212,98,42,0.1);
          }
        `}</style>
      </section>

      {/* CONTACTO */}
      <section
        id="contacto"
        style={{
          padding: '5rem 2rem',
          background: 'var(--bg-warm)',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--accent-pale)',
                border: '1px solid var(--accent-light)',
                padding: '0.35rem 1rem',
                borderRadius: '20px',
                marginBottom: '1.25rem',
              }}
            >
              <Send size={13} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.06em' }}>
                EMPEZAMOS A CONVERSAR
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
              ¿Llevamos Komuny Chat a tu fundacion?
            </h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '1rem', lineHeight: 1.7 }}>
              Contanos sobre tu organizacion. Te respondemos con una propuesta concreta en 48 horas.
            </p>
          </motion.div>

          <motion.form
            {...fadeUp(0.1)}
            action={`mailto:${CONTACT_EMAIL}`}
            method="POST"
            encType="text/plain"
            style={{
              background: 'var(--bg)',
              border: '1.5px solid var(--border)',
              borderRadius: '18px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.1rem',
            }}
          >
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.02em' }}>
                  Tu nombre
                </span>
                <input
                  name="nombre"
                  required
                  type="text"
                  placeholder="Maria Lopez"
                  style={{
                    padding: '0.7rem 0.9rem',
                    background: 'var(--bg-warm)',
                    border: '1.5px solid var(--border)',
                    borderRadius: '10px',
                    fontSize: '0.92rem',
                    color: 'var(--ink)',
                    outline: 'none',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink)' }}>Fundacion</span>
                <input
                  name="fundacion"
                  required
                  type="text"
                  placeholder="Nombre de tu organizacion"
                  style={{
                    padding: '0.7rem 0.9rem',
                    background: 'var(--bg-warm)',
                    border: '1.5px solid var(--border)',
                    borderRadius: '10px',
                    fontSize: '0.92rem',
                    color: 'var(--ink)',
                    outline: 'none',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                />
              </label>
            </div>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink)' }}>Email</span>
              <input
                name="email"
                required
                type="email"
                placeholder="vos@tufundacion.org"
                style={{
                  padding: '0.7rem 0.9rem',
                  background: 'var(--bg-warm)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '10px',
                  fontSize: '0.92rem',
                  color: 'var(--ink)',
                  outline: 'none',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink)' }}>
                ¿Que necesita tu fundacion?
              </span>
              <textarea
                name="mensaje"
                required
                placeholder="Capacitamos 500 docentes al ano y queremos darles una herramienta IA practica..."
                rows={5}
                style={{
                  padding: '0.8rem 0.9rem',
                  background: 'var(--bg-warm)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '10px',
                  fontSize: '0.92rem',
                  color: 'var(--ink)',
                  outline: 'none',
                  fontFamily: 'DM Sans, sans-serif',
                  resize: 'vertical',
                  minHeight: '110px',
                }}
              />
            </label>
            <button
              type="submit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: 'var(--accent)',
                color: 'white',
                padding: '0.85rem 1.7rem',
                borderRadius: '30px',
                fontWeight: 600,
                fontSize: '0.95rem',
                border: 'none',
                cursor: 'pointer',
                marginTop: '0.5rem',
                fontFamily: 'DM Sans, sans-serif',
                transition: 'opacity 0.15s, transform 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.opacity = '0.9';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.opacity = '1';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <Send size={15} /> Enviar consulta
            </button>
            <p style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', textAlign: 'center', marginTop: '0.25rem' }}>
              O escribinos directo a{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--accent)', fontWeight: 600 }}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </motion.form>
        </div>

        <style>{`
          @media (max-width: 600px) {
            .form-row {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      <SiteFooter />
      <KomIA />
      <BackToTop />
    </main>
  );
}
