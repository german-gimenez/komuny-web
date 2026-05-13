'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Bot,
  Code2,
  Sparkles,
  LayoutPanelLeft,
  Search as SearchIcon,
  Plug,
  BrainCircuit,
  Globe as GlobeIcon,
  Lock,
  ArrowRight,
  ExternalLink,
  GitFork,
  ShieldCheck,
  MessageSquare,
  Building2,
  Check,
  X,
} from 'lucide-react';
import NavBar from '../components/NavBar';
import KomIA from '../components/KomIA';
import { ScrollProgressBar, BackToTop } from '../components/ScrollProgress';
import SiteFooter from '../components/SiteFooter';
import ChatHero from '../components/ChatHero';
import PresetCard, { KOMUNY_PRESETS } from '../components/PresetCard';
import AnthropicBadge, { AnthropicMark, AnthropicWordmark, ANTHROPIC_ORANGE } from '../components/AnthropicBadge';

const CHAT_URL = 'https://chat.komuny.org';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

const capabilities = [
  {
    icon: <Bot size={22} />,
    color: '#D4622A',
    bg: '#FBE9DF',
    title: 'Agentes',
    desc: 'Agentes con manejo de archivos, interpretacion de codigo y llamados a APIs. Crea tu propio asistente especializado.',
  },
  {
    icon: <Code2 size={22} />,
    color: '#1A5C9A',
    bg: '#E0EDF7',
    title: 'Code Interpreter',
    desc: 'Ejecuta codigo en multiples lenguajes de forma segura, sin instalar nada. Ideal para clases de programacion.',
  },
  {
    icon: <Sparkles size={22} />,
    color: '#8B2FC9',
    bg: '#F2E8FB',
    title: 'Modelos multiples',
    desc: 'Claude Opus 4.6, Sonnet 4.6 y otros. Elegi el modelo segun la tarea: razonamiento profundo o velocidad.',
  },
  {
    icon: <LayoutPanelLeft size={22} />,
    color: '#3A6B4A',
    bg: '#E8F2EC',
    title: 'Artifacts',
    desc: 'Genera React, HTML y diagramas Mermaid renderizados en el chat. Perfecto para visualizar conceptos.',
  },
  {
    icon: <SearchIcon size={22} />,
    color: '#C9A227',
    bg: '#FBF3DC',
    title: 'Busqueda total',
    desc: 'Encontra mensajes, archivos y fragmentos de codigo al instante en todas tus conversaciones.',
  },
  {
    icon: <Plug size={22} />,
    color: '#D4622A',
    bg: '#FBE9DF',
    title: 'MCP Servers',
    desc: 'Conecta GitHub, Stripe, HuggingFace, MySQL, Vercel, PayPal y +20 servicios via Model Context Protocol.',
  },
  {
    icon: <BrainCircuit size={22} />,
    color: '#1A5C9A',
    bg: '#E0EDF7',
    title: 'Memoria persistente',
    desc: 'Komuny Chat te recuerda. Guarda contexto sobre tu pais, nivel educativo y preferencias entre sesiones.',
  },
  {
    icon: <GlobeIcon size={22} />,
    color: '#3A6B4A',
    bg: '#E8F2EC',
    title: 'Web Search',
    desc: 'Acceso a internet en vivo con reranking. Cualquier modelo puede consultar fuentes actuales.',
  },
  {
    icon: <Lock size={22} />,
    color: '#8B2FC9',
    bg: '#F2E8FB',
    title: 'Autenticacion enterprise',
    desc: 'SSO con OAuth, SAML, LDAP y autenticacion de dos factores. Listo para instituciones y fundaciones.',
  },
];

const mcpServers = [
  { name: 'GitHub', desc: 'GitHub Copilot MCP server', emoji: '⚡' },
  { name: 'PayPal', desc: 'Payment processing', emoji: '💳' },
  { name: 'Stripe', desc: 'Payment processing', emoji: '💸' },
  { name: 'HuggingFace', desc: 'ML models, datasets, spaces', emoji: '🤗' },
  { name: 'Vercel', desc: 'Deployment & hosting', emoji: '▲' },
  { name: 'Peek', desc: 'Tours and activities', emoji: '🗺️' },
  { name: 'Indeed', desc: 'Job search and listings', emoji: '💼' },
  { name: 'Audioscape', desc: 'Audio/podcast RAG', emoji: '🎙️' },
  { name: 'GitMCP', desc: 'Turn GitHub repos into MCPs', emoji: '🔀' },
  { name: 'MySQL', desc: 'Database access', emoji: '🐬' },
  { name: 'DeepWiki', desc: 'RAG-as-a-Service for docs', emoji: '📚' },
  { name: '+ tus propios', desc: 'Conecta cualquier API via MCP', emoji: '➕' },
];

const useCases = [
  {
    title: 'Planificar una unidad con un agente',
    desc: 'Pedile a Komuny Chat que diseñe una unidad de 4 semanas. El agente puede usar Web Search para fuentes actuales y Artifacts para generar el cronograma visual en Mermaid.',
    color: '#D4622A',
  },
  {
    title: 'Generar artifacts pedagogicos',
    desc: 'Renderiza diagramas Mermaid de procesos (ej. ciclo del agua, mitosis), apps React interactivas o paginas HTML educativas directamente en el chat.',
    color: '#3A6B4A',
  },
  {
    title: 'Conectar con MCPs reales',
    desc: 'Mostra a tus alumnos como funciona la IA aplicada: trae datos en vivo desde HuggingFace, GitHub o tu propia base de datos via MCP.',
    color: '#8B2FC9',
  },
];

const comparison = [
  { feature: 'Tipo', komia: 'Asistente rapido en sitio', chat: 'Plataforma completa' },
  { feature: 'Ideal para', komia: 'Q&A sobre Komuny', chat: 'Trabajo profundo y proyectos' },
  { feature: 'Modelos', komia: '1 modelo', chat: 'Multi-modelo (Claude Opus, Sonnet, etc.)' },
  { feature: 'Archivos adjuntos', komia: false, chat: true },
  { feature: 'Artifacts (React/HTML/Mermaid)', komia: false, chat: true },
  { feature: 'MCP Servers', komia: false, chat: '+20 disponibles' },
  { feature: 'Memoria persistente', komia: false, chat: true },
  { feature: 'Web Search', komia: false, chat: true },
  { feature: 'Presets pedagogicos', komia: false, chat: '6 incluidos' },
];

export default function ChatPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <NavBar />
      <ScrollProgressBar />

      {/* HERO */}
      <ChatHero variant="page" chatUrl={CHAT_URL} />

      {/* HECHO CON ANTHROPIC — banda destacada */}
      <section
        style={{
          padding: '3.5rem 2rem',
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <motion.div
            {...fadeUp(0)}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2.5rem',
              alignItems: 'center',
            }}
            className="anthropic-band"
          >
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <AnthropicBadge variant="card" />
              </div>
              <h2
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                  lineHeight: 1.2,
                  marginBottom: '1rem',
                }}
              >
                Construido con <span style={{ color: ANTHROPIC_ORANGE }}>Claude</span>,
                el modelo seguro de Anthropic
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--ink-muted)',
                  lineHeight: 1.7,
                  marginBottom: '1.25rem',
                }}
              >
                Komuny Chat usa <strong style={{ color: 'var(--ink)' }}>Claude Opus 4.6</strong> y{' '}
                <strong style={{ color: 'var(--ink)' }}>Claude Sonnet 4.6</strong>, los modelos de Anthropic
                disenados con foco en seguridad, razonamiento y comportamiento alineado.
                Especialmente apropiados para contextos educativos donde la precision y
                el cuidado importan.
              </p>
              <a
                href="https://claude.com/solutions/education"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.88rem',
                  color: ANTHROPIC_ORANGE,
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: `1.5px solid ${ANTHROPIC_ORANGE}50`,
                  padding: '0.45rem 0.95rem',
                  borderRadius: '20px',
                }}
              >
                Anthropic for Education <ExternalLink size={13} />
              </a>
            </div>

            <div
              className="anthropic-band-visual"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {[
                { model: 'Claude Opus 4.6', desc: 'Razonamiento profundo', badge: 'Default' },
                { model: 'Claude Sonnet 4.6', desc: 'Velocidad + calidad balanceada', badge: null },
              ].map((m, i) => (
                <motion.div
                  key={m.model}
                  {...fadeUp(0.1 + i * 0.08)}
                  style={{
                    background: 'var(--bg-warm)',
                    border: '1.5px solid var(--border)',
                    borderRadius: '14px',
                    padding: '1.1rem 1.3rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: ANTHROPIC_ORANGE + '15',
                      border: `1px solid ${ANTHROPIC_ORANGE}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <AnthropicMark size={22} color={ANTHROPIC_ORANGE} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'Fraunces, serif',
                        fontWeight: 700,
                        fontSize: '0.98rem',
                        color: 'var(--ink)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.55rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      {m.model}
                      {m.badge && (
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase' as const,
                            padding: '1px 7px',
                            borderRadius: '20px',
                            background: ANTHROPIC_ORANGE + '15',
                            color: ANTHROPIC_ORANGE,
                            border: `1px solid ${ANTHROPIC_ORANGE}40`,
                          }}
                        >
                          {m.badge}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginTop: '0.15rem' }}>
                      {m.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .anthropic-band {
              grid-template-columns: 1fr !important;
              gap: 1.75rem !important;
            }
          }
        `}</style>
      </section>

      {/* PRESETS PRE-CARGADOS */}
      <section
        id="presets"
        style={{
          padding: '5rem 2rem',
          background: 'var(--bg-warm)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
              <Bot size={13} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.05em' }}>
                6 ASISTENTES INCLUIDOS
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '0.5rem' }}>
              Presets pedagogicos pre-cargados
            </h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
              Cada preset es un asistente especializado con prompt, modelo y configuracion optimizada
              para tareas docentes. Elegi uno y empeza a trabajar en segundos.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem',
            }}
          >
            {KOMUNY_PRESETS.map((p, i) => (
              <PresetCard key={p.title} preset={p} index={i} />
            ))}
          </div>

          <motion.div
            {...fadeUp(0.4)}
            style={{
              textAlign: 'center',
              marginTop: '2.5rem',
              padding: '1.5rem',
              background: 'var(--bg)',
              border: '1.5px solid var(--border)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>
                ¿Tu fundacion necesita presets a medida?
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
                Disenamos asistentes especificos para tu programa, idioma o region.
              </div>
            </div>
            <Link
              href="/para-fundaciones"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--accent)',
                color: 'white',
                padding: '0.6rem 1.2rem',
                borderRadius: '24px',
                textDecoration: 'none',
                fontSize: '0.88rem',
                fontWeight: 600,
              }}
            >
              <Building2 size={14} /> Hablemos
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CAPACIDADES */}
      <section
        id="capacidades"
        style={{
          padding: '5rem 2rem',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '0.5rem' }}>
              9 capacidades core
            </h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '1rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              Todo lo que una plataforma IA moderna deberia tener. En un solo lugar, open source.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem',
            }}
          >
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="cap-card"
                style={{
                  background: 'var(--bg-warm)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: c.bg,
                    color: c.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    border: `1px solid ${c.color}25`,
                  }}
                >
                  {c.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '0.4rem',
                    color: 'var(--ink)',
                  }}
                >
                  {c.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.6 }}>
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <style>{`
          .cap-card:hover {
            border-color: var(--accent-light) !important;
            box-shadow: 0 4px 20px rgba(212,98,42,0.08);
          }
        `}</style>
      </section>

      {/* MCPs */}
      <section
        style={{
          padding: '5rem 2rem',
          background: 'var(--bg-warm)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#F2E8FB',
                border: '1px solid #8B2FC940',
                padding: '0.35rem 1rem',
                borderRadius: '20px',
                marginBottom: '1.25rem',
              }}
            >
              <Plug size={13} style={{ color: '#8B2FC9' }} />
              <span style={{ fontSize: '0.78rem', color: '#8B2FC9', fontWeight: 600, letterSpacing: '0.05em' }}>
                MODEL CONTEXT PROTOCOL
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '0.5rem' }}>
              MCPs disponibles
            </h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
              Komuny Chat se conecta a +20 servicios externos via MCP. Trae datos, ejecuta acciones,
              y extende la IA con tus propias herramientas.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '0.75rem',
            }}
          >
            {mcpServers.map((mcp, i) => (
              <motion.div
                key={mcp.name}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.035 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'var(--bg)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '12px',
                  padding: '0.8rem 1rem',
                }}
              >
                <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{mcp.emoji}</span>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: 'Fraunces, serif',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: 'var(--ink)',
                    }}
                  >
                    {mcp.name}
                  </div>
                  <div
                    style={{
                      fontSize: '0.76rem',
                      color: 'var(--ink-muted)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {mcp.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CASOS DE USO */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '0.5rem' }}>
              Casos de uso para docentes
            </h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '1rem' }}>
              Tres ejemplos concretos de Komuny Chat en accion
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
                transition={{ duration: 0.55, delay: i * 0.1 }}
                style={{
                  background: 'var(--bg-warm)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '16px',
                  padding: '1.6rem',
                  borderTop: `4px solid ${uc.color}`,
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '0.65rem',
                    color: 'var(--ink)',
                    lineHeight: 1.25,
                  }}
                >
                  {uc.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-muted)', lineHeight: 1.65 }}>
                  {uc.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARATIVA */}
      <section
        style={{
          padding: '5rem 2rem',
          background: 'var(--bg-warm)',
        }}
      >
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '0.5rem' }}>
              KomIA vs Komuny Chat
            </h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '1rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              Son dos productos complementarios. KomIA es el asistente rapido del sitio; Komuny Chat es la plataforma full.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="comparison-table-wrap">
            <div
              style={{
                background: 'var(--bg)',
                border: '1.5px solid var(--border)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.4fr 1fr 1fr',
                  padding: '1rem 1.25rem',
                  borderBottom: '1.5px solid var(--border)',
                  background: 'var(--bg-warm)',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Feature</span>
                <span style={{ fontFamily: 'Fraunces, serif', fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>KomIA</span>
                <span style={{ fontFamily: 'Fraunces, serif', fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent)', textAlign: 'center' }}>Komuny Chat</span>
              </div>
              {comparison.map((c, i) => (
                <div
                  key={c.feature}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.4fr 1fr 1fr',
                    padding: '0.85rem 1.25rem',
                    borderBottom: i < comparison.length - 1 ? '1px solid var(--border)' : 'none',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.88rem',
                  }}
                >
                  <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{c.feature}</span>
                  <span style={{ textAlign: 'center', color: 'var(--ink-muted)' }}>
                    {typeof c.komia === 'boolean' ? (
                      c.komia ? <Check size={16} style={{ color: 'var(--green)' }} /> : <X size={16} style={{ color: 'var(--ink-muted)', opacity: 0.5 }} />
                    ) : (
                      c.komia
                    )}
                  </span>
                  <span style={{ textAlign: 'center', color: 'var(--ink)', fontWeight: 500 }}>
                    {typeof c.chat === 'boolean' ? (
                      c.chat ? <Check size={16} style={{ color: 'var(--accent)' }} /> : <X size={16} style={{ color: 'var(--ink-muted)', opacity: 0.5 }} />
                    ) : (
                      c.chat
                    )}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 600px) {
            .comparison-table-wrap > div > div {
              grid-template-columns: 1.2fr 0.8fr 0.8fr !important;
              padding: 0.7rem 0.75rem !important;
              font-size: 0.78rem !important;
            }
          }
        `}</style>
      </section>

      {/* PRIVACIDAD */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <motion.div
            {...fadeUp(0)}
            style={{
              background: 'var(--bg-warm)',
              border: '1.5px solid var(--border)',
              borderRadius: '16px',
              padding: '2rem',
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'flex-start',
            }}
            className="privacy-card"
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '13px',
                background: 'var(--green-light)',
                color: 'var(--green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={26} />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  color: 'var(--ink)',
                }}
              >
                Privacidad y datos
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
                Komuny Chat es open source (basado en LibreChat) y respeta tu privacidad. Tus conversaciones
                no se usan para entrenar modelos. Control total sobre retencion. Hosting en la region que
                tu fundacion elija. Datos legales en{' '}
                <Link href="/privacidad" style={{ color: 'var(--accent)', fontWeight: 600 }}>politica de privacidad</Link>.
              </p>
              <a
                href="https://github.com/danny-avila/LibreChat"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.85rem',
                  color: 'var(--ink-muted)',
                  textDecoration: 'none',
                  border: '1.5px solid var(--border)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '20px',
                }}
              >
                <GitFork size={13} /> LibreChat en GitHub <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 600px) {
            .privacy-card { flex-direction: column !important; gap: 1rem !important; }
          }
        `}</style>
      </section>

      {/* CTA FINAL */}
      <section
        style={{
          padding: '5rem 2rem',
          background: 'var(--ink)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-30%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(212,98,42,0.3) 0%, transparent 65%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
            <AnthropicBadge variant="card" dark />
          </motion.div>

          <motion.h2
            {...fadeUp(0.1)}
            style={{
              color: 'var(--bg)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              marginBottom: '1rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            Empeza a usar Komuny Chat
          </motion.h2>
          <motion.p
            {...fadeUp(0.18)}
            style={{
              color: 'rgba(245,240,232,0.7)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
            }}
          >
            Gratis para docentes. Implementaciones a medida para fundaciones.
          </motion.p>
          <motion.div
            {...fadeUp(0.25)}
            style={{
              display: 'flex',
              gap: '0.85rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--accent)',
                color: 'white',
                padding: '0.85rem 1.9rem',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
              }}
            >
              <MessageSquare size={16} /> Abrir Chat <ExternalLink size={13} style={{ opacity: 0.7 }} />
            </a>
            <Link
              href="/para-fundaciones"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                color: 'var(--bg)',
                padding: '0.85rem 1.9rem',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
                border: '1.5px solid rgba(245,240,232,0.25)',
              }}
            >
              <Building2 size={16} /> Para mi fundacion <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
      <KomIA />
      <BackToTop />
    </main>
  );
}
