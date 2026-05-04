'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, Quote, BookOpen, Wrench, GitFork } from 'lucide-react';
import NavBar from '../../components/NavBar';
import KomIA from '../../components/KomIA';
import { ScrollProgressBar, BackToTop } from '../../components/ScrollProgress';
import SiteFooter from '../../components/SiteFooter';

export default function ReinvencionEducativa() {
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
              background: 'var(--accent-pale)',
              color: 'var(--accent)',
              border: '1px solid var(--accent-light)',
            }}>
              Ecosistema Educativo
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
            El sistema educativo no esta en crisis. Esta cumpliendo para lo que fue disenado. Y ese es el problema.
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
            Facundo Vazquez plantea un diagnostico que nos interpela directamente: el modelo educativo nacio
            en la Revolucion Industrial y funciono 150 anos. Ese paradigma no se esta fracturando —ya se fracturo.
            Desde Komuny, creemos que la respuesta no es individual sino colectiva y open source.
          </p>

          <div style={{ height: '2px', background: 'var(--accent)', width: '48px', marginBottom: '2.5rem', borderRadius: '2px' }} />
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
          <Quote size={28} style={{ color: 'var(--accent)', marginBottom: '1rem', opacity: 0.8 }} />
          <blockquote style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
            color: 'var(--bg)',
            lineHeight: 1.55,
            fontStyle: 'italic',
            fontWeight: 300,
            margin: 0,
          }}>
            "Construimos un sistema que forma personas para responder correctamente, no para preguntar bien.
            Y ahora le pedimos a ese mismo sistema que prepare a la gente para un mundo donde las respuestas las da la IA."
          </blockquote>
          <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: 'rgba(245,240,232,0.55)', fontWeight: 600 }}>
            — Facundo Vazquez · LinkedIn · Abril 2026
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

          <p>
            La nota de Facundo Vazquez en LinkedIn lleva semanas circulando en el ecosistema educativo latinoamericano
            y con razon. El argumento central es incisivo: el problema no es que el sistema educativo este roto,
            sino que funciona exactamente como fue disenado —para producir trabajadores disciplinados con conocimientos
            predecibles en la era industrial.
          </p>

          <p>
            La pregunta que hace es la correcta: <strong>cuantos paises de la region estan disenando hoy esa respuesta?</strong>
            El reskilling masivo no es un programa de RRHH, es politica de Estado o no es nada.
          </p>

          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)', marginTop: '1rem' }}>
            Donde entra Komuny
          </h2>

          <p>
            Desde Komuny entendemos que la reinvencion del sistema educativo no puede esperar a que el Estado
            resuelva la ecuacion completa. <strong>El cambio empieza en el aula, con el docente, hoy.</strong>
          </p>

          <p>
            Por eso construimos un ecosistema open source y gratuito de herramientas de IA para educadores
            latinoamericanos: sin barreras de idioma, sin costo, sin necesidad de saber programar.
            Cada herramienta, cada skill, cada template que publicamos es un grano de arena concreto
            en la reinvencion que Facundo describe.
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
              Nuestra respuesta practica al diagnostico
            </h3>
            {[
              {
                icon: <Wrench size={16} />,
                title: '5 herramientas IA para docentes',
                desc: 'Rubrica, planificador, simplificador, detector de sesgos y banco de preguntas. Gratis, en espanol, sin cuenta.',
                href: '/herramientas',
                color: '#D4622A',
                bg: '#FBE9DF',
              },
              {
                icon: <BookOpen size={16} />,
                title: 'Glosario de IA para educadores',
                desc: '30+ terminos explicados sin tecnicismos para que cualquier docente pueda empezar hoy.',
                href: '/#glosario',
                color: '#1A5C9A',
                bg: '#E0EDF7',
              },
              {
                icon: <GitFork size={16} />,
                title: 'Open Source en GitHub',
                desc: 'Skills, guias y templates que cualquier docente, institucion o gobierno puede adoptar y adaptar libremente.',
                href: 'https://github.com/german-gimenez/komuny',
                color: '#3A6B4A',
                bg: '#E8F2EC',
                external: true,
              },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
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
            La reinvencion es colectiva
          </h2>

          <p>
            Facundo pregunta cuantos paises estan disenando la respuesta. Nosotros creemos que la respuesta
            no viene solo de arriba hacia abajo. Viene de la comunidad docente que decide integrar una herramienta
            nueva, del coordinador pedagogico que comparte un prompt que funciono, del directivo que da el espacio
            para experimentar.
          </p>

          <p>
            El reskilling masivo empieza con un docente que hoy no tiene que saber programar para usar IA en su clase.
            Eso es lo que construimos en Komuny.
          </p>

          {/* CTA a la nota original */}
          <div style={{
            background: 'var(--accent-pale)',
            border: '1.5px solid var(--accent-light)',
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
                Leer la nota original de Facundo Vazquez
              </p>
              <p style={{ fontSize: '0.83rem', color: 'var(--ink-muted)', margin: 0 }}>
                LinkedIn · Abril 2026 · 55 reacciones
              </p>
            </div>
            <a
              href="https://www.linkedin.com/posts/facundovazquez_el-sistema-educativo-no-est%C3%A1-en-crisis-est%C3%A1-share-7453405164482445312-gjH1/?utm_source=share"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--accent)',
                color: 'white',
                padding: '0.55rem 1.25rem',
                borderRadius: '20px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.88rem',
                flexShrink: 0,
              }}
            >
              Ver en LinkedIn <ExternalLink size={14} />
            </a>
          </div>
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
