'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, Quote, Terminal, BookOpen, Gamepad2, Globe, GraduationCap, Rocket, Sparkles, CheckCircle2 } from 'lucide-react';
import NavBar from '../../components/NavBar';
import KomIA from '../../components/KomIA';
import { ScrollProgressBar, BackToTop } from '../../components/ScrollProgress';
import SiteFooter from '../../components/SiteFooter';

const niveles = [
  { num: '1-3', icon: <Terminal size={16} />, titulo: 'Terminal desde cero', desc: 'Archivos, carpetas, navegacion y primeros comandos. Sin instalar nada.' },
  { num: '4', icon: <BookOpen size={16} />, titulo: 'Git y GitHub', desc: 'Control de versiones y colaboracion. Nunca mas perder tu trabajo.' },
  { num: '5-7', icon: <Globe size={16} />, titulo: 'Como funciona el software', desc: 'APIs, servidores, Node.js. Entender la tecnologia que usamos todos los dias.' },
  { num: '8-12', icon: <Sparkles size={16} />, titulo: 'Claude Code y programacion con IA', desc: 'Aprende a crear proyectos reales describiendo lo que quieres. Skills, MCP, memoria.' },
  { num: '13-14', icon: <Rocket size={16} />, titulo: 'Proyecto final', desc: 'Patrones profesionales, debug, deploy y un juego multijugador real.' },
];

const beneficios = [
  { icon: <CheckCircle2 size={16} />, text: 'Gratuito, sin tarjeta de credito', color: '#3A6B4A' },
  { icon: <Globe size={16} />, text: 'Disponible en espanol (y 6 idiomas mas)', color: '#1A5C9A' },
  { icon: <Terminal size={16} />, text: 'Terminal virtual en el navegador: no hay que instalar nada', color: '#8B2FC9' },
  { icon: <Gamepad2 size={16} />, text: '10 tipos de actividades interactivas (quizzes, puzzles, simuladores)', color: '#C9A227' },
  { icon: <GraduationCap size={16} />, text: 'Plan de aprendizaje personalizado con IA', color: '#D4622A' },
  { icon: <Rocket size={16} />, text: 'Logros, rachas y 16 insignias desbloqueables', color: '#3A6B4A' },
];

export default function ZeroAClaudeCode() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <NavBar />
      <ScrollProgressBar />

      {/* HEADER ARTICLE */}
      <section style={{ padding: '3rem 2rem 0', maxWidth: '760px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back */}
          <Link
            href="/novedades"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              color: 'var(--ink-muted)',
              textDecoration: 'none',
              marginBottom: '2rem',
              fontWeight: 500,
            }}
          >
            <ArrowLeft size={14} /> Novedades
          </Link>

          {/* Category + date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              padding: '3px 10px',
              borderRadius: '20px',
              background: '#E0EDF7',
              color: '#1A5C9A',
              border: '1px solid #1A5C9A40',
            }}>
              Recurso Recomendado
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--ink-muted)' }}>
              <Calendar size={13} /> Mayo 2026
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            lineHeight: 1.15,
            fontWeight: 700,
            color: 'var(--ink)',
            marginBottom: '1rem',
          }}>
            Zero to Claude Code: de usuario de IA a creador con IA. Gratis y en espanol.
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
            Descubrimos un recurso que encaja perfecto con la mision de Komuny: un curso interactivo,
            gratuito y disponible en espanol que lleva a cualquier persona —sin experiencia tecnica—
            desde sus primeros comandos en la terminal hasta construir proyectos reales con inteligencia artificial.
            147 lecciones. Cero barreras.
          </p>

          <div style={{ height: '2px', background: '#1A5C9A', width: '48px', marginBottom: '2.5rem', borderRadius: '2px' }} />
        </motion.div>
      </section>

      {/* QUOTE DESTACADA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{ padding: '0 2rem', maxWidth: '760px', margin: '0 auto 2.5rem' }}
      >
        <div style={{
          background: 'var(--ink)',
          borderRadius: '16px',
          padding: '2rem 2.25rem',
          position: 'relative',
        }}>
          <Quote size={28} style={{ color: '#1A5C9A', marginBottom: '1rem', opacity: 0.8 }} />
          <blockquote style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
            color: 'var(--bg)',
            lineHeight: 1.55,
            fontStyle: 'italic',
            fontWeight: 300,
            margin: 0,
          }}>
            "No necesitas ser desarrollador. Solo necesitas ser curioso."
          </blockquote>
          <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: 'rgba(245,240,232,0.55)', fontWeight: 600 }}>
            — Zero to Claude Code · zero2claude.dev
          </p>
        </div>
      </motion.section>

      {/* BODY */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        style={{ padding: '0 2rem 3rem', maxWidth: '760px', margin: '0 auto' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.8, color: 'var(--ink)', fontSize: '1.02rem' }}>

          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)', marginTop: '0.5rem' }}>
            Por que nos importa como Komuny
          </h2>

          <p>
            En Komuny construimos herramientas de IA para que cualquier docente pueda integrar
            inteligencia artificial en su practica, sin necesidad de saber programar. Pero siempre
            nos hemos preguntado: <strong>que pasa cuando un docente quiere ir mas alla?</strong>
          </p>

          <p>
            Cuando quiere entender como funciona la tecnologia que usa. Cuando quiere personalizar
            una herramienta. Cuando quiere crear algo propio para su aula o su institucion.
            Hasta ahora, el camino de &ldquo;usuario de IA&rdquo; a &ldquo;creador con IA&rdquo; estaba lleno de barreras:
            cursos en ingles, pre-requisitos tecnicos, costos prohibitivos.
          </p>

          <p>
            <strong>Zero to Claude Code elimina todas esas barreras de un solo golpe.</strong>
          </p>

          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)', marginTop: '0.5rem' }}>
            Que es Zero to Claude Code
          </h2>

          <p>
            Es un curso interactivo 100% online creado por{' '}
            <a href="https://www.linkedin.com/in/itayshmool/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 600 }}>
              Itay Shmool
            </a>{' '}
            que ensena a personas sin experiencia tecnica a usar la terminal y a programar con
            Claude Code — la herramienta de programacion con IA de Anthropic — a traves de
            147 lecciones organizadas en 14 niveles.
          </p>

          {/* BENEFICIOS GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0.75rem',
            margin: '0.5rem 0',
          }}>
            {beneficios.map((b, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
                padding: '0.75rem 1rem',
                background: 'var(--bg-warm)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
              }}>
                <span style={{ color: b.color, flexShrink: 0, display: 'flex' }}>{b.icon}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--ink)', fontWeight: 500 }}>{b.text}</span>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)', marginTop: '1rem' }}>
            Que se aprende: 14 niveles, paso a paso
          </h2>

          <p>
            El curso esta disenado para personas que nunca abrieron una terminal. Cada nivel
            construye sobre el anterior, y todas las actividades son interactivas — se practican
            comandos reales en un terminal virtual dentro del navegador.
          </p>

          {/* NIVELES */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}>
            {niveles.map((n, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                padding: '1rem 1.15rem',
                background: 'var(--bg-warm)',
                border: '1.5px solid var(--border)',
                borderRadius: '12px',
              }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: '#E0EDF7',
                  color: '#1A5C9A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontFamily: 'Fraunces, serif',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                }}>
                  {n.icon}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                    <span style={{
                      fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em',
                      padding: '2px 8px', borderRadius: '20px', background: '#E0EDF7',
                      color: '#1A5C9A', border: '1px solid #1A5C9A30',
                    }}>
                      NIVELES {n.num}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--ink)' }}>{n.titulo}</span>
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', lineHeight: 1.5 }}>{n.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)', marginTop: '1rem' }}>
            Para que le sirve a un docente
          </h2>

          <p>
            El docente que completa este curso no solo entiende que es una terminal o que hace Git.
            Adquiere la capacidad de <strong>construir herramientas propias con IA</strong>. Algunos
            ejemplos concretos:
          </p>

          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong>Automatizar tareas administrativas:</strong> generar informes, organizar archivos, procesar datos de estudiantes desde la terminal.</li>
            <li><strong>Crear materiales educativos personalizados:</strong> usar Claude Code para generar actividades, quizzes y contenido adaptado a su contexto especifico.</li>
            <li><strong>Contribuir a proyectos open source:</strong> con Git y GitHub, cualquier docente puede contribuir a Komuny o a otros proyectos educativos.</li>
            <li><strong>Entender la tecnologia que usan sus estudiantes:</strong> APIs, servidores, codigo — dejan de ser cajas negras.</li>
            <li><strong>Construir prototipos de apps educativas:</strong> desde un bot que responde preguntas hasta un servidor con recursos para sus clases.</li>
          </ul>

          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)', marginTop: '0.5rem' }}>
            La conexion con Komuny
          </h2>

          <p>
            Zero to Claude Code y Komuny Edu son complementarios. Komuny ofrece herramientas
            listas para usar — el camino corto. Zero to Claude Code ofrece el camino largo pero
            transformador: <strong>aprender a construir tus propias herramientas</strong>.
          </p>

          <div style={{
            background: 'var(--bg-warm)',
            border: '1.5px solid var(--border)',
            borderRadius: '14px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
              Dos caminos, un mismo destino
            </h3>
            {[
              {
                icon: <Sparkles size={16} />,
                title: 'Camino rapido: Komuny',
                desc: 'Usa nuestras herramientas IA y Komuny Chat hoy, sin saber programar. Genera rubricas, planificaciones y mas en minutos.',
                href: '/herramientas',
                color: '#D4622A',
                bg: '#FBE9DF',
              },
              {
                icon: <Terminal size={16} />,
                title: 'Camino profundo: Zero to Claude Code',
                desc: 'Aprende terminal, Git y programacion con IA. Construye tus propias herramientas. 147 lecciones gratuitas y en espanol.',
                href: 'https://zero2claude.dev',
                color: '#1A5C9A',
                bg: '#E0EDF7',
                external: true,
              },
              {
                icon: <GraduationCap size={16} />,
                title: 'Destino: docente empoderado',
                desc: 'Un educador que entiende la IA, la usa en su practica y puede crear soluciones propias para su aula y su comunidad.',
                href: '/fundacion',
                color: '#3A6B4A',
                bg: '#E8F2EC',
              },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                target={(item as { external?: boolean }).external ? '_blank' : undefined}
                rel={(item as { external?: boolean }).external ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  textDecoration: 'none',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  transition: 'border-color 0.15s',
                }}
              >
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: item.bg,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--ink)', marginBottom: '0.2rem' }}>{item.title}</div>
                  <div style={{ fontSize: '0.83rem', color: 'var(--ink-muted)', lineHeight: 1.45 }}>{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>

          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)', marginTop: '0.5rem' }}>
            Como empezar
          </h2>

          <p>
            El registro toma 30 segundos. No piden tarjeta de credito ni datos personales innecesarios.
            Solo un nombre de usuario y una contrasena.
          </p>

          <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>Entra a <a href="https://zero2claude.dev" target="_blank" rel="noopener noreferrer" style={{ color: '#1A5C9A', fontWeight: 600 }}>zero2claude.dev</a></li>
            <li>Hace clic en &ldquo;Create Account&rdquo; (el curso esta disponible en espanol una vez adentro)</li>
            <li>Completa el onboarding con IA — te sugiere un plan segun tu perfil</li>
            <li>Empieza el Nivel 1: &ldquo;Computers Are Not Magic&rdquo;</li>
          </ol>

          <p>
            La comunidad ya tiene <strong>mas de 8.000 estudiantes</strong> en el foro, con categorias
            por leccion, ayuda entre pares en tiempo real y un sistema de votacion donde los mismos
            usuarios proponen nuevas funcionalidades.
          </p>

          {/* CTA */}
          <div style={{
            background: '#E0EDF7',
            border: '1.5px solid #1A5C9A40',
            borderRadius: '14px',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--ink)', margin: '0 0 0.2rem', fontSize: '0.95rem' }}>
                Ir a Zero to Claude Code
              </p>
              <p style={{ fontSize: '0.83rem', color: 'var(--ink-muted)', margin: 0 }}>
                zero2claude.dev · Gratuito · En espanol · 147 lecciones
              </p>
            </div>
            <a
              href="https://zero2claude.dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#1A5C9A',
                color: 'white',
                padding: '0.55rem 1.25rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.88rem',
                flexShrink: 0,
              }}
            >
              Empezar gratis <ExternalLink size={14} />
            </a>
          </div>

          <p style={{ fontSize: '0.92rem', color: 'var(--ink-muted)', fontStyle: 'italic', marginTop: '0.5rem' }}>
            Nota: Komuny no tiene afiliacion comercial con Zero to Claude Code. Lo recomendamos porque
            creemos que es un recurso valioso para nuestra comunidad de educadores y porque comparte
            nuestra vision: que la tecnologia sea accesible para todos.
          </p>

        </div>
      </motion.section>

      {/* FOOTER NAV */}
      <section style={{ padding: '1.5rem 2rem 0', maxWidth: '760px', margin: '0 auto' }}>
        <Link
          href="/novedades"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.88rem',
            color: 'var(--accent)',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={14} /> Ver todas las novedades
        </Link>
      </section>

      <SiteFooter />
      <KomIA />
      <BackToTop />
    </main>
  );
}
