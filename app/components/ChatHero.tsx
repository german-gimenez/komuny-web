'use client';

/**
 * ChatHero — bloque hero animado del Komuny Chat
 *
 * Disenado para "empresa de desarrollo dinamica":
 *  - Capa 1: AuroraBackground (blobs animados)
 *  - Capa 2: BrowserFrame con screenshot del Chat (float + tilt parallax con mouse)
 *  - Capa 3: FloatingChips alrededor del mockup (Agentes, MCPs, Claude Opus, etc.)
 *  - Capa 4: Strip animado con los 6 presets pre-cargados
 *  - Capa 5: AnthropicBadge + Napsix.AI
 *  - Capa 6: CapabilitiesMarquee al final
 *
 * Props:
 *  - variant: 'home' (compact, sin Aurora full) | 'page' (hero completo /chat)
 *  - chatUrl: URL real del Chat para el CTA primario
 */

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  Bot,
  Plug,
  BrainCircuit,
  Search as SearchIcon,
  LayoutPanelLeft,
  Globe as GlobeIcon,
  Lock,
  MessageSquare,
} from 'lucide-react';
import AuroraBackground from './AuroraBackground';
import BrowserFrame from './BrowserFrame';
import FloatingChips, { type Chip } from './FloatingChips';
import CapabilitiesMarquee from './CapabilitiesMarquee';
import { AnthropicBadgeInline, AnthropicMark, AnthropicWordmark, ANTHROPIC_ORANGE } from './AnthropicBadge';
import { KOMUNY_PRESETS } from './PresetCard';

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

// Default URL del Chat real - reemplazable cuando se confirme dominio
const DEFAULT_CHAT_URL = 'https://chat.komuny.org';

const TYPING_PROMPTS = [
  'Crea una rubrica para evaluar ensayos de 4to grado...',
  'Planifica una clase de fotosintesis para 6to grado...',
  'Simplifica este texto sobre la Revolucion Industrial...',
  'Detecta sesgos en este material de estudios sociales...',
  'Genera preguntas Bloom sobre cambio climatico...',
];

function TypingDemo() {
  // Componente decorativo: typing rotativo de prompts ejemplo
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'var(--bg)',
        border: '1.5px solid var(--border)',
        borderRadius: '30px',
        padding: '0.45rem 1rem',
        fontSize: '0.83rem',
        color: 'var(--ink-muted)',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        boxShadow: '0 4px 16px -4px rgba(26,18,8,0.08)',
        maxWidth: '100%',
      }}
    >
      <MessageSquare size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
      <span className="typing-rotator" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
        <span className="typing-line">{TYPING_PROMPTS[0]}</span>
      </span>
      <style>{`
        .typing-rotator { position: relative; display: inline-block; min-width: 0; }
        @keyframes typing-rotate {
          0%, 18%   { content: "${TYPING_PROMPTS[0]}"; }
          20%, 38%  { content: "${TYPING_PROMPTS[1]}"; }
          40%, 58%  { content: "${TYPING_PROMPTS[2]}"; }
          60%, 78%  { content: "${TYPING_PROMPTS[3]}"; }
          80%, 98%  { content: "${TYPING_PROMPTS[4]}"; }
          100%      { content: "${TYPING_PROMPTS[0]}"; }
        }
      `}</style>
    </motion.div>
  );
}

function PresetsStrip() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        marginTop: '1.5rem',
      }}
    >
      {KOMUNY_PRESETS.map((p, i) => (
        <motion.span
          key={p.title}
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: p.bg,
            color: p.color,
            border: `1.5px solid ${p.color}30`,
            padding: '0.3rem 0.7rem',
            borderRadius: '20px',
            fontSize: '0.76rem',
            fontWeight: 600,
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          <span style={{ fontSize: '0.9rem' }}>{p.icon}</span>
          {p.title}
        </motion.span>
      ))}
    </motion.div>
  );
}

function MockupWithChips({ variant }: { variant: 'home' | 'page' }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Tilt parallax basado en mouse position
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 80,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 80,
    damping: 18,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const chips: Chip[] = [
    {
      label: 'Agentes',
      icon: <Bot size={13} />,
      color: '#D4622A',
      bg: 'var(--bg)',
      position: { top: '-2%', left: '-6%' },
      delay: 0,
    },
    {
      label: 'Claude Opus 4.6',
      icon: <AnthropicMark size={13} color={ANTHROPIC_ORANGE} />,
      color: ANTHROPIC_ORANGE,
      bg: 'var(--bg)',
      position: { top: '12%', right: '-8%' },
      delay: 0.15,
    },
    {
      label: '+20 MCPs',
      icon: <Plug size={13} />,
      color: '#8B2FC9',
      bg: 'var(--bg)',
      position: { bottom: '20%', left: '-8%' },
      delay: 0.3,
    },
    {
      label: 'Memoria',
      icon: <BrainCircuit size={13} />,
      color: '#1A5C9A',
      bg: 'var(--bg)',
      position: { bottom: '6%', right: '-4%' },
      delay: 0.45,
    },
    {
      label: 'Artifacts',
      icon: <LayoutPanelLeft size={13} />,
      color: '#3A6B4A',
      bg: 'var(--bg)',
      position: { top: '45%', left: '-10%' },
      delay: 0.6,
    },
  ];

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`chat-mockup-wrap ${variant}`}
      style={{
        position: 'relative',
        padding: variant === 'home' ? '2rem 1rem' : '2.5rem 2rem',
        perspective: '1200px',
      }}
    >
      {/* Glow detras */}
      <div
        aria-hidden="true"
        className="chat-mockup-glow"
        style={{
          position: 'absolute',
          inset: '10%',
          background:
            'radial-gradient(ellipse at center, rgba(212,98,42,0.25) 0%, rgba(204,120,92,0.15) 40%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          zIndex: 1,
        }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <BrowserFrame url="chat.komuny.org" shadow="strong">
          {/* Imagen principal del Chat - reemplazable por chat-screenshot-presets.png cuando este disponible */}
          <picture>
            <source srcSet="/demo_dark_komuny_v2.webp" type="image/webp" />
            <img
              src="/demo_dark_komuny_v2.png"
              alt="Komuny Chat — interfaz con presets pedagogicos, MCPs, agentes y memoria"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
              loading="lazy"
            />
          </picture>
        </BrowserFrame>
      </motion.div>

      {/* Bubbles flotantes */}
      <FloatingChips chips={chips} />

      <style>{`
        @keyframes mockup-glow-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .chat-mockup-glow {
          animation: mockup-glow-pulse 6s ease-in-out infinite;
        }
        @media (max-width: 768px) {
          .chat-mockup-wrap.home { padding: 1.25rem 0.5rem !important; }
          .chat-mockup-wrap.page { padding: 1.5rem 0.5rem !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .chat-mockup-glow { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

export default function ChatHero({
  variant = 'home',
  chatUrl = DEFAULT_CHAT_URL,
}: {
  variant?: 'home' | 'page';
  chatUrl?: string;
}) {
  const isPage = variant === 'page';
  const sectionPadding = isPage ? '5rem 2rem 3rem' : '4rem 2rem';

  // Items del marquee
  const marqueeItems: React.ReactNode[] = [
    <span key="1"><Sparkles size={14} style={{ marginRight: 6, verticalAlign: -2, color: 'var(--accent)' }} />Agentes pedagogicos</span>,
    <span key="2"><Plug size={14} style={{ marginRight: 6, verticalAlign: -2, color: '#8B2FC9' }} />+20 MCP Servers</span>,
    <span key="3"><LayoutPanelLeft size={14} style={{ marginRight: 6, verticalAlign: -2, color: '#3A6B4A' }} />Artifacts (React, Mermaid, HTML)</span>,
    <span key="4"><BrainCircuit size={14} style={{ marginRight: 6, verticalAlign: -2, color: '#1A5C9A' }} />Memoria persistente</span>,
    <span key="5"><GlobeIcon size={14} style={{ marginRight: 6, verticalAlign: -2, color: '#C9A227' }} />Web Search live</span>,
    <span key="6"><SearchIcon size={14} style={{ marginRight: 6, verticalAlign: -2, color: 'var(--accent)' }} />Busqueda en chats</span>,
    <span key="7"><Lock size={14} style={{ marginRight: 6, verticalAlign: -2, color: '#3A6B4A' }} />SSO / SAML / OAuth</span>,
    <span key="8"><AnthropicMark size={14} color={ANTHROPIC_ORANGE} /> Claude Opus 4.6 + Sonnet 4.6</span>,
  ];

  const initWrap = isPage ? fadeUpInstant : fadeUp;

  return (
    <section
      className={`chat-hero ${variant}`}
      style={{
        position: 'relative',
        padding: sectionPadding,
        overflow: 'hidden',
        background: 'var(--bg-warm)',
      }}
    >
      <AuroraBackground intensity={isPage ? 'medium' : 'subtle'} pattern="dots" />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: isPage ? '1180px' : '1180px',
          margin: '0 auto',
        }}
      >
        <div
          className="chat-hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* IZQUIERDA: texto + CTAs + presets */}
          <div className="chat-hero-text">
            <motion.div {...initWrap(0)}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  background: 'var(--bg)',
                  border: `1.5px solid ${ANTHROPIC_ORANGE}50`,
                  padding: '0.4rem 1rem',
                  borderRadius: '24px',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                }}
              >
                <Sparkles size={12} style={{ color: 'var(--accent)' }} />
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '0.05em' }}>
                  NUEVO
                </span>
                <span
                  style={{
                    width: '1px',
                    height: '12px',
                    background: 'var(--border)',
                  }}
                />
                <AnthropicBadgeInline color="var(--ink)" />
              </div>
            </motion.div>

            <motion.h2
              {...initWrap(0.08)}
              style={{
                fontFamily: 'Fraunces, serif',
                fontSize: isPage
                  ? 'clamp(2.2rem, 5vw, 3.6rem)'
                  : 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                marginBottom: '1rem',
                color: 'var(--ink)',
              }}
            >
              {isPage ? (
                <>
                  Komuny Chat
                  <br />
                  <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--accent)' }}>
                    IA conversacional con presets pedagogicos
                  </em>
                </>
              ) : (
                <>
                  Conoce <span style={{ color: 'var(--accent)' }}>Komuny Chat</span>
                  <br />
                  <em style={{ fontStyle: 'italic', fontWeight: 300 }}>
                    IA conversacional con presets para el aula
                  </em>
                </>
              )}
            </motion.h2>

            <motion.p
              {...initWrap(0.16)}
              style={{
                fontSize: isPage ? '1.1rem' : '1.02rem',
                color: 'var(--ink-muted)',
                maxWidth: '520px',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}
            >
              {isPage
                ? '6 asistentes pre-cargados, Claude Opus 4.6 + Sonnet 4.6, agentes, MCPs, artifacts, memoria y busqueda web — en una sola plataforma open source disenada para educadores y fundaciones de LATAM.'
                : 'Asistente Komuny + Generador de Rubrica + Planificador + Simplificador + Detector de Sesgos + Banco Bloom. Todo en un solo lugar con agentes, MCPs y memoria.'}
            </motion.p>

            <motion.div {...initWrap(0.22)}>
              <TypingDemo />
            </motion.div>

            <PresetsStrip />

            <motion.div
              {...initWrap(0.5)}
              style={{
                display: 'flex',
                gap: '0.85rem',
                flexWrap: 'wrap',
                marginTop: '1.75rem',
              }}
            >
              <a
                href={chatUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--ink)',
                  color: 'var(--bg)',
                  padding: '0.8rem 1.6rem',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  transition: 'opacity 0.15s, transform 0.15s',
                }}
                className="cta-primary"
              >
                <MessageSquare size={16} /> Probar Komuny Chat
                <ExternalLink size={13} style={{ opacity: 0.65 }} />
              </a>
              {isPage ? (
                <a
                  href="#capacidades"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'transparent',
                    color: 'var(--ink)',
                    padding: '0.8rem 1.6rem',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    border: '1.5px solid var(--border)',
                  }}
                >
                  Ver capacidades <ArrowRight size={15} />
                </a>
              ) : (
                <Link
                  href="/chat"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'transparent',
                    color: 'var(--ink)',
                    padding: '0.8rem 1.6rem',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    border: '1.5px solid var(--border)',
                  }}
                >
                  Conocer mas <ArrowRight size={15} />
                </Link>
              )}
            </motion.div>

            {/* Subtitulo "desarrollado por" */}
            <motion.p
              {...initWrap(0.6)}
              style={{
                fontSize: '0.82rem',
                color: 'var(--ink-muted)',
                marginTop: '1.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                flexWrap: 'wrap',
              }}
            >
              Desarrollado por{' '}
              <a
                href="https://napsix.ai"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Napsix.AI
              </a>
              {' · '}
              Modelos de{' '}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <AnthropicMark size={12} color={ANTHROPIC_ORANGE} />
                <AnthropicWordmark height={12} color="var(--ink)" />
              </span>
            </motion.p>
          </div>

          {/* DERECHA: mockup animado del Chat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            {...(isPage
              ? { animate: { opacity: 1, scale: 1, y: 0 } }
              : { whileInView: { opacity: 1, scale: 1, y: 0 }, viewport: { once: true } })}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="chat-hero-visual"
          >
            <MockupWithChips variant={variant} />
          </motion.div>
        </div>
      </div>

      <style>{`
        .cta-primary:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        @media (max-width: 960px) {
          .chat-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .chat-hero-text { text-align: left; }
          .chat-hero-visual { order: -1; }
        }
        @media (max-width: 640px) {
          .chat-hero.home { padding: 3rem 1rem !important; }
          .chat-hero.page { padding: 4rem 1rem 2rem !important; }
        }
      `}</style>

      {/* Marquee de capabilities — solo en variant page */}
      {isPage && (
        <div style={{ marginTop: '4rem', position: 'relative', zIndex: 1 }}>
          <CapabilitiesMarquee items={marqueeItems} speed="slow" />
        </div>
      )}
    </section>
  );
}
