'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Newspaper } from 'lucide-react';
import NavBar from '../components/NavBar';
import KomIA from '../components/KomIA';

const novedades = [
  {
    slug: 'reinvencion-educativa',
    fecha: 'Mayo 2026',
    categoria: 'Ecosistema Educativo',
    categoriaColor: '#D4622A',
    categoriaBg: '#FBE9DF',
    titulo: 'El sistema educativo no esta en crisis. Esta cumpliendo para lo que fue disenado.',
    resumen:
      'Facundo Vazquez plantea un diagnostico que resuena con nuestra mision: el modelo educativo nacio en la Revolucion Industrial y ya se fracturo. Lo que viene no es una reforma, es una reinvencion. Desde Komuny, trabajamos para que esa reinvencion empiece hoy, en el aula.',
    autor: 'Contexto: nota de Facundo Vazquez · Respuesta Komuny',
  },
];

export default function NovedadesPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <NavBar />

      {/* HEADER */}
      <section style={{ padding: '4rem 2rem 2rem', maxWidth: '860px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--accent-pale)',
            border: '1px solid var(--accent-light)',
            padding: '0.35rem 1rem',
            borderRadius: '20px',
            marginBottom: '1.5rem',
          }}>
            <Newspaper size={13} color="var(--accent)" />
            <span style={{ fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.05em' }}>
              NOVEDADES
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            fontWeight: 700,
            lineHeight: 1.12,
            color: 'var(--ink)',
            marginBottom: '1rem',
          }}>
            Comunidad, ecosistema<br />
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--accent)' }}>y educacion que se reinventa.</em>
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--ink-muted)', maxWidth: '560px', lineHeight: 1.7, marginBottom: '3rem' }}>
            Notas, reflexiones y contexto del ecosistema educativo latinoamericano.
            Lo que pasa afuera y como Komuny responde desde adentro.
          </p>

          <div style={{ height: '1px', background: 'var(--border)', marginBottom: '3rem' }} />
        </motion.div>

        {/* LISTA DE NOVEDADES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {novedades.map((n, i) => (
            <motion.div
              key={n.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/novedades/${n.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <article style={{
                  background: 'var(--bg-warm)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '16px',
                  padding: '1.75rem 2rem',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-light)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(212,98,42,0.1)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase' as const,
                      padding: '3px 10px',
                      borderRadius: '20px',
                      background: n.categoriaBg,
                      color: n.categoriaColor,
                      border: `1px solid ${n.categoriaColor}40`,
                    }}>
                      {n.categoria}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                      <Calendar size={12} /> {n.fecha}
                    </span>
                  </div>

                  <h2 style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    lineHeight: 1.25,
                    marginBottom: '0.75rem',
                  }}>
                    {n.titulo}
                  </h2>

                  <p style={{ fontSize: '0.93rem', color: 'var(--ink-muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                    {n.resumen}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', fontStyle: 'italic' }}>{n.autor}</span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.88rem',
                      color: 'var(--accent)',
                      fontWeight: 600,
                    }}>
                      Leer nota <ArrowRight size={14} />
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', marginBottom: '1rem' }}>
            Komuny Edu · Hecho para docentes de America Latina
          </p>
          <Link
            href="/"
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
            Volver al inicio <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <KomIA />
    </main>
  );
}
