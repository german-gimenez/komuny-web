'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Shield,
  Scale,
  Handshake,
  Users,
  BookOpen,
  Globe,
  Zap,
  Heart,
  ArrowRight,
  ExternalLink,
  GitFork,
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const credentials = [
  {
    icon: <Scale size={22} />,
    color: '#1A5C9A',
    bg: '#E0EDF7',
    title: 'Declaraci\u00f3n de Inter\u00e9s Legislativo',
    org: 'Honorable C\u00e1mara de Senadores \u00b7 Mendoza',
    desc: 'Declarada de inter\u00e9s por la C\u00e1mara de Senadores de la Provincia de Mendoza en septiembre de 2022. Impulsada por los Senadores Gabriel Pradines, Rolando Baldasso, Germ\u00e1n Vicchi y Valent\u00edn Gonz\u00e1lez.',
    href: 'https://senadomendoza.gob.ar/declaran-de-interes-una-fundacion-dedicada-a-la-educacion-y-capacitacion-de-docentes/',
    label: 'Ver resoluci\u00f3n',
    external: true,
  },
  {
    icon: <Shield size={22} />,
    color: '#3A6B4A',
    bg: '#E8F2EC',
    title: 'Entidad Legal Registrada',
    org: 'AFIP \u00b7 Argentina',
    desc: 'CUIT: 30-71735388-5 \u00b7 Persona Jur\u00eddica sin fines de lucro \u00b7 IVA Exento \u00b7 Actividad AFIP 854990 (Servicios de Ense\u00f1anza N.C.P.) \u00b7 Inscripta en noviembre de 2021.',
    href: '#datos-legales',
    label: 'Ver datos legales',
    external: false,
  },
  {
    icon: <Handshake size={22} />,
    color: '#8B2FC9',
    bg: '#F2E8FB',
    title: 'Convenio Institucional',
    org: 'IES 9-029 \u00b7 Instituto de Educaci\u00f3n Superior',
    desc: 'Convenio Marco de Cooperaci\u00f3n con el IES 9-029, Instituto de Educaci\u00f3n Superior de la provincia de Mendoza, fortaleciendo la articulaci\u00f3n entre la formaci\u00f3n docente y la tecnolog\u00eda educativa.',
    href: 'https://www.ies9029.edu.ar/convenio-marco-de-cooperacion-entre-ies-9-029-y-fundacion-komuny/',
    label: 'Ver convenio',
    external: true,
  },
];

const howWeWork = [
  {
    icon: <Zap size={18} />,
    title: 'Capacitaciones tecnol\u00f3gicas',
    desc: 'Formamos a docentes en habilidades digitales y herramientas de inteligencia artificial aplicadas al aula.',
  },
  {
    icon: <Globe size={18} />,
    title: 'Nexo regional',
    desc: 'Conectamos educadores de distintas regiones de Latinoam\u00e9rica con recursos digitales pertinentes y accesibles.',
  },
  {
    icon: <Heart size={18} />,
    title: 'Impacto social y ambiental',
    desc: 'Articulamos proyectos de impacto social y ambiental que integran la educaci\u00f3n como motor de cambio.',
  },
  {
    icon: <Users size={18} />,
    title: 'Comunidad de aprendizaje',
    desc: 'Construimos una comunidad de aprendizaje continuo donde los docentes comparten experiencias y buenas pr\u00e1cticas.',
  },
];

const legalData = [
  { label: 'Raz\u00f3n Social', value: 'Fundaci\u00f3n Komuny Social' },
  { label: 'CUIT', value: '30-71735388-5' },
  { label: 'Domicilio', value: 'Olascoaga 267, Mendoza, Argentina' },
  { label: 'Actividad AFIP', value: '854990 \u2014 Servicios de Ense\u00f1anza N.C.P.' },
  { label: 'Condici\u00f3n IVA', value: 'Exento' },
  { label: 'Tipo', value: 'Persona Jur\u00eddica sin fines de lucro' },
];

const stats = [
  { n: '5.4M', label: 'docentes adicionales que necesitar\u00e1 Am\u00e9rica Latina para 2030', accent: true },
  { n: '69M', label: 'docentes requeridos a nivel mundial para alcanzar los ODS de educaci\u00f3n', accent: false },
  { n: '25%', label: 'de docentes ha recibido capacitaci\u00f3n en habilidades del futuro', accent: false },
  { n: '<3%', label: 'de pa\u00edses han adoptado leyes de educaci\u00f3n inclusiva y equitativa', accent: false },
];

export default function FundacionPage() {
  return (
    <main style={{ minHeight: '100vh' }}>
      {/* NAV */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(245,240,232,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px',
        }}
      >
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
        >
          <img
            src="/favicon.jpg"
            alt="Komuny"
            style={{ width: '28px', height: '28px', borderRadius: '6px', objectFit: 'cover' }}
          />
          <span
            style={{
              fontFamily: 'Fraunces, serif',
              fontWeight: 700,
              fontSize: '1.1rem',
              whiteSpace: 'nowrap',
              color: 'var(--ink)',
            }}
          >
            Komuny Edu
          </span>
        </Link>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Link
            href="/#glosario"
            style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', textDecoration: 'none', padding: '0.3rem 0.7rem' }}
          >
            Glosario
          </Link>
          <Link
            href="/#recursos"
            style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', textDecoration: 'none', padding: '0.3rem 0.7rem' }}
          >
            Recursos
          </Link>
          <span
            style={{
              fontSize: '0.88rem',
              color: 'var(--accent)',
              fontWeight: 600,
              padding: '0.3rem 0.7rem',
              borderBottom: '2px solid var(--accent)',
            }}
          >
            Fundaci&#243;n
          </span>
          <a
            href="https://github.com/german-gimenez/komuny"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              textDecoration: 'none',
              background: 'var(--ink)',
              color: 'var(--bg)',
              padding: '0.35rem 0.9rem',
              borderRadius: '20px',
              fontWeight: 500,
            }}
          >
            <GitFork size={14} />
            <span className="nav-github-text">GitHub</span>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '6rem 2rem 4rem', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '0',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(212,98,42,0.07) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div {...fadeUp()}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--accent-pale)',
                border: '1px solid var(--accent-light)',
                padding: '0.4rem 1.1rem',
                borderRadius: '20px',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Shield size={13} color="var(--accent)" />
              <span
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                }}
              >
                PERSONA JUR&#205;DICA &middot; CUIT 30-71735388-5 &middot; EST. 2021
              </span>
            </div>
          </motion.div>
          <motion.h1
            {...fadeUp(0.1)}
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              marginBottom: '1.5rem',
            }}
          >
            Fundaci&#243;n Komuny Social
          </motion.h1>
          <motion.p
            {...fadeUp(0.2)}
            style={{
              fontSize: '1.15rem',
              color: 'var(--ink-muted)',
              lineHeight: 1.7,
              maxWidth: '580px',
              margin: '0 auto',
            }}
          >
            Una organizaci&#243;n sin fines de lucro dedicada a transformar la educaci&#243;n en
            Latinoam&#233;rica.
          </motion.p>
        </div>
      </section>

      {/* MISION */}
      <section style={{ padding: '4rem 2rem', background: 'var(--bg-warm)' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <motion.h2 {...fadeUp()} style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '2rem' }}>
            Nuestra Misi&#243;n
          </motion.h2>
          <motion.div {...fadeUp(0.1)}>
            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--ink-muted)',
                lineHeight: 1.8,
                marginBottom: '1.25rem',
              }}
            >
              Fundada en septiembre de 2021 con sede en{' '}
              <strong style={{ color: 'var(--ink)' }}>Mendoza, Argentina</strong>, la Fundaci&#243;n
              Komuny Social naci&#243; para conectar y capacitar a educadores latinoamericanos en las
              habilidades que demanda la educaci&#243;n del futuro.
            </p>
            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--ink-muted)',
                lineHeight: 1.8,
                marginBottom: '1.25rem',
              }}
            >
              Trabajamos para{' '}
              <strong style={{ color: 'var(--ink)' }}>
                garantizar una educaci&#243;n inclusiva, equitativa y de calidad
              </strong>{' '}
              en toda la regi&#243;n, actuando como nexo entre la tecnolog&#237;a disponible y los
              docentes de cada comunidad.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--ink-muted)', lineHeight: 1.8 }}>
              Creemos que ning&#250;n docente deber&#237;a quedar atr&#225;s en la transici&#243;n
              digital. Por eso, todos nuestros recursos son{' '}
              <strong style={{ color: 'var(--accent)' }}>abiertos, gratuitos y en espa&#241;ol</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROBLEMA: STATS */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '0.75rem' }}>
              El Problema que Enfrentamos
            </h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '1rem' }}>
              La educaci&#243;n latinoamericana enfrenta una brecha sin precedentes
            </p>
          </motion.div>
          <div className="fund-stats-grid">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  padding: '2rem 1.5rem',
                  background: s.accent ? 'var(--accent)' : 'var(--bg-warm)',
                  border: `1.5px solid ${s.accent ? 'transparent' : 'var(--border)'}`,
                  borderRadius: '16px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color: s.accent ? 'white' : 'var(--accent)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {s.n}
                </div>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: s.accent ? 'rgba(255,255,255,0.85)' : 'var(--ink-muted)',
                    lineHeight: 1.5,
                  }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RECONOCIMIENTO INSTITUCIONAL */}
      <section style={{ padding: '5rem 2rem', background: 'var(--bg-warm)' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '0.5rem' }}>
              Reconocimiento Institucional
            </h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '1rem' }}>
              Credenciales que avalan nuestra legitimidad y compromiso educativo
            </p>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {credentials.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                style={{
                  background: 'var(--bg)',
                  border: '2px solid var(--border)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                }}
                className="cred-card"
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
                    flexShrink: 0,
                  }}
                >
                  {c.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'Fraunces, serif',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {c.title}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: c.color,
                      marginBottom: '0.7rem',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase' as const,
                    }}
                  >
                    {c.org}
                  </div>
                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--ink-muted)',
                      lineHeight: 1.65,
                      marginBottom: '1.1rem',
                    }}
                  >
                    {c.desc}
                  </p>
                  {c.external ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cred-link"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.85rem',
                        color: c.color,
                        fontWeight: 600,
                        textDecoration: 'none',
                        border: `1.5px solid ${c.color}40`,
                        padding: '0.35rem 0.9rem',
                        borderRadius: '20px',
                        transition: 'background 0.15s',
                      }}
                    >
                      {c.label} <ExternalLink size={13} />
                    </a>
                  ) : (
                    <a
                      href={c.href}
                      className="cred-link"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.85rem',
                        color: c.color,
                        fontWeight: 600,
                        textDecoration: 'none',
                        border: `1.5px solid ${c.color}40`,
                        padding: '0.35rem 0.9rem',
                        borderRadius: '20px',
                        transition: 'background 0.15s',
                      }}
                    >
                      {c.label} <ArrowRight size={13} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO TRABAJAMOS */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '0.5rem' }}>
              C&#243;mo Trabajamos
            </h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '1rem' }}>
              Nuestro enfoque para transformar la educaci&#243;n en la regi&#243;n
            </p>
          </motion.div>
          <div className="fund-how-grid">
            {howWeWork.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  background: 'var(--bg-warm)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '14px',
                  padding: '1.5rem',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'var(--accent-pale)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DATOS LEGALES */}
      <section id="datos-legales" style={{ padding: '4rem 2rem', background: 'var(--ink)' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <motion.div {...fadeUp()}>
            <h2
              style={{
                color: 'var(--bg)',
                fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                marginBottom: '0.5rem',
              }}
            >
              Datos Legales
            </h2>
            <p
              style={{
                color: 'rgba(245,240,232,0.5)',
                fontSize: '0.88rem',
                marginBottom: '2rem',
              }}
            >
              Informaci&#243;n oficial de la Fundaci&#243;n Komuny Social para transparencia institucional
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="fund-legal-grid">
            {legalData.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '1rem 1.25rem',
                  background: 'rgba(245,240,232,0.06)',
                  border: '1px solid rgba(245,240,232,0.12)',
                  borderRadius: '10px',
                }}
              >
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(245,240,232,0.4)',
                    marginBottom: '0.3rem',
                  }}
                >
                  {item.label}
                </div>
                <div style={{ fontSize: '0.92rem', color: 'var(--bg)', fontWeight: 500 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <motion.div {...fadeUp()}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', marginBottom: '1rem' }}>
              Explor&#225; los recursos
            </h2>
            <p
              style={{
                color: 'var(--ink-muted)',
                fontSize: '1rem',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
              }}
            >
              Todo el contenido de Komuny Edu est&#225; disponible de forma libre y gratuita para
              docentes de toda Latinoam&#233;rica.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/guias"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--ink)',
                  color: 'var(--bg)',
                  padding: '0.8rem 1.75rem',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}
              >
                <BookOpen size={16} /> Conoc&#233; las gu&#237;as
              </Link>
              <Link
                href="/#glosario"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'transparent',
                  color: 'var(--ink)',
                  padding: '0.8rem 1.75rem',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  border: '1.5px solid var(--border)',
                }}
              >
                Explorar el glosario de IA <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: '2.5rem 2rem',
          textAlign: 'center',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-warm)',
        }}
      >
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
          Komuny Edu &mdash; Hecho con amor para docentes de Am&#233;rica Latina &middot;{' '}
          <a
            href="https://napsix.ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)', textDecoration: 'none' }}
          >
            Napsix.AI
          </a>
        </p>
      </footer>

      <style>{`
        .fund-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        .fund-how-grid   { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        .fund-legal-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 0.75rem; }
        .cred-card:hover { border-color: var(--accent-light) !important; }
        @media (max-width: 640px) {
          .fund-stats-grid { grid-template-columns: 1fr; }
          .fund-how-grid   { grid-template-columns: 1fr; }
          .cred-card { flex-direction: column; gap: 1rem; }
        }
        @media (max-width: 480px) {
          .nav-github-text { display: none; }
        }
      `}</style>
    </main>
  );
}
