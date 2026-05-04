'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Cpu, FileText, GraduationCap, Star, ArrowRight, GitFork, Search, X, Lightbulb, AlertCircle, ChevronDown, Globe, Scale, Shield, Handshake, Wrench, Newspaper, ExternalLink } from 'lucide-react';
import { glossaryTerms, letters, tagColors, GlossaryTerm } from './data/glossary';
import KomIA from './components/KomIA';
import NavBar from './components/NavBar';
import { ScrollProgressBar, BackToTop } from './components/ScrollProgress';
import TextFlip from './components/TextFlip';

const Globe3D = dynamic(() => import('./components/Globe3D'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle, var(--accent-pale) 30%, transparent 80%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '60%', height: '60%', borderRadius: '50%', background: 'var(--accent-pale)', border: '1px solid var(--accent-light)' }} />
    </div>
  ),
});

const tagLabels: Record<string, string> = {
  fundamental: 'Fundamental',
  tecnico: 'Tecnico',
  practica: 'Para el aula',
  etica: 'Etica'
};

function TermCard({ term }: { term: GlossaryTerm }) {
  const [expanded, setExpanded] = useState(false);
  const color = term.tag ? tagColors[term.tag] : '#5C5040';
  return (
    <motion.div layout className="term-card" onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.15rem', color: 'var(--ink)' }}>{term.term}</h3>
            {term.tag && <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, padding: '2px 8px', borderRadius: '20px', background: color + '18', color, border: `1px solid ${color}40` }}>{tagLabels[term.tag] || term.tag}</span>}
          </div>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
            {expanded ? term.definition : term.definition.slice(0, 120) + (term.definition.length > 120 ? '...' : '')}
          </p>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ color: 'var(--ink-muted)', flexShrink: 0, marginTop: '0.2rem' }}>
          <ChevronDown size={16} />
        </motion.div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border)', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {term.example && <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: 'var(--accent-pale)', padding: '0.7rem 0.9rem', borderRadius: '8px' }}><Lightbulb size={15} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.15rem' }} /><p style={{ fontSize: '0.88rem', color: 'var(--ink)', fontStyle: 'italic' }}>{term.example}</p></div>}
              {term.tip && <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: 'var(--green-light)', padding: '0.7rem 0.9rem', borderRadius: '8px' }}><AlertCircle size={15} style={{ color: 'var(--green)', flexShrink: 0, marginTop: '0.15rem' }} /><p style={{ fontSize: '0.88rem', color: 'var(--ink)' }}><strong>Consejo docente:</strong> {term.tip}</p></div>}
              {term.seeAlso && <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>Ver tambien: <em>{term.seeAlso}</em></p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = glossaryTerms.filter(t => {
    const ms = search === '' || t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase());
    const ml = activeLetter === null || t.letter === activeLetter;
    const mt = activeTag === null || t.tag === activeTag;
    return ms && ml && mt;
  });

  const grouped = letters.reduce((acc, l) => {
    const ts = filtered.filter(t => t.letter === l);
    if (ts.length > 0) acc[l] = ts;
    return acc;
  }, {} as Record<string, GlossaryTerm[]>);

  const socials = [
    { href: 'https://www.instagram.com/komuny.social/', label: 'Instagram' },
    { href: 'https://www.facebook.com/komuny.social/', label: 'Facebook' },
    { href: 'https://www.linkedin.com/company/komuny/', label: 'LinkedIn' },
    { href: 'https://github.com/german-gimenez/komuny', label: 'GitHub' },
  ];

  const features = [
    { icon: <BookOpen size={18} />, title: 'Glosario', desc: 'Terminos de IA explicados para educadores.', color: '#D4622A', bg: '#FBE9DF', href: '#glosario', label: 'Ver →', external: false },
    { icon: <Wrench size={18} />, title: 'Herramientas IA', desc: 'Generador de rubricas, planificador, simplificador de textos y mas.', color: '#8B2FC9', bg: '#F2E8FB', href: '/herramientas', label: 'Usar ahora →', external: false },
    { icon: <Globe size={18} />, title: 'Herramientas gratuitas', desc: 'Canva, Khanmigo, NotebookLM y mas recursos sin costo.', color: '#C9A227', bg: '#FBF3DC', href: 'https://github.com/german-gimenez/komuny/blob/main/recursos/herramientas-gratuitas.md', label: 'Ver lista →', external: true },
    { icon: <Cpu size={18} />, title: 'Skills para Claude', desc: 'Configuraciones especializadas listas para usar en el aula.', color: '#3A6B4A', bg: '#E8F2EC', href: 'https://github.com/german-gimenez/komuny/tree/main/skills', label: 'En GitHub →', external: true },
    { icon: <FileText size={18} />, title: 'Templates de Prompts', desc: 'Tickets listos para planear clases y evaluar.', color: '#1A5C9A', bg: '#E0EDF7', href: 'https://github.com/german-gimenez/komuny/tree/main/templates', label: 'En GitHub →', external: true },
    { icon: <GraduationCap size={18} />, title: 'Guias paso a paso', desc: 'Desde tu primera clase con IA hasta proyectos de 4 semanas.', color: '#5C5040', bg: 'var(--bg-warm)', href: 'https://github.com/german-gimenez/komuny/tree/main/guides', label: 'En GitHub →', external: true },
  ];

  return (
    <main>
      <NavBar />
      <ScrollProgressBar />

      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '0', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(212,98,42,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(58,107,74,0.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div className="hero-grid">
          {/* LEFT */}
          <div className="hero-left">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-pale)', border: '1px solid var(--accent-light)', padding: '0.35rem 1rem', borderRadius: '20px', marginBottom: '2rem' }}>
                <Star size={13} color="var(--accent)" fill="var(--accent)" />
                <span style={{ fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.05em' }}>OPEN SOURCE - PARA LATAM</span>
              </div>
            </motion.div>
            <motion.h1 className="hero-h1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} style={{ fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1.5rem', lineHeight: 1.12 }}>
              <span style={{ display: 'block' }}>IA para <TextFlip />,</span>
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--accent)' }}>sin barreras.</em>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} style={{ fontSize: '1.1rem', color: 'var(--ink-muted)', maxWidth: '480px', marginBottom: '2.5rem', lineHeight: 1.7 }}>
              Recursos practicos, abiertos y colaborativos para educadores que quieren integrar inteligencia artificial en el aula.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }} className="hero-ctas">
              <a href="#glosario" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--ink)', color: 'var(--bg)', padding: '0.75rem 1.75rem', borderRadius: '30px', textDecoration: 'none', fontWeight: 500 }}>
                Explorar glosario <ArrowRight size={16} />
              </a>
              <a href="#recursos" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: 'var(--ink)', padding: '0.75rem 1.75rem', borderRadius: '30px', textDecoration: 'none', fontWeight: 500, border: '1.5px solid var(--border)' }}>
                <Globe size={16} /> Recursos
              </a>
              <a href="https://github.com/german-gimenez/komuny" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: 'var(--ink)', padding: '0.75rem 1.75rem', borderRadius: '30px', textDecoration: 'none', fontWeight: 500, border: '1.5px solid var(--border)' }}>
                <GitFork size={16} /> Ver en GitHub
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ display: 'flex', gap: '2rem', marginTop: '3.5rem', flexWrap: 'wrap' }} className="hero-stats">
              {[{ n: `${glossaryTerms.length}+`, label: 'Terminos en glosario' }, { n: 'LATAM', label: 'Enfoque regional' }, { n: '100%', label: 'Open Source' }].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1.9rem', fontWeight: 700, color: 'var(--accent)' }}>{s.n}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginTop: '0.2rem' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Globe */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.35 }}
          >
            <Globe3D />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="recursos" className="recursos-section" style={{ padding: '3rem 2rem', background: 'var(--bg-warm)' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', marginBottom: '0.4rem' }}>Todo lo que necesitas</h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '1rem' }}>Recursos para cada etapa de tu camino con IA</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {features.map((f, i) => (
              <a key={f.title} href={f.href}
                target={f.external ? '_blank' : undefined}
                rel={f.external ? 'noopener noreferrer' : undefined}
                className="feature-row"
                style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: f.bg, color: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{f.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>{f.title}</span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: f.color, whiteSpace: 'nowrap', background: f.bg, padding: '0.1rem 0.5rem', borderRadius: '10px' }}>{f.label}</span>
                  </div>
                  <p style={{ fontSize: '0.83rem', color: 'var(--ink-muted)', marginTop: '0.15rem', lineHeight: 1.4 }}>{f.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* NOVEDADES */}
      <section id="novedades" style={{ padding: '4rem 2rem', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-pale)', border: '1px solid var(--accent-light)', padding: '0.3rem 0.9rem', borderRadius: '20px', marginBottom: '0.75rem' }}>
                <Newspaper size={12} color="var(--accent)" />
                <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.05em' }}>NOVEDADES</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '0.3rem', lineHeight: 1.2 }}>Ecosistema educativo</h2>
              <p style={{ color: 'var(--ink-muted)', fontSize: '0.95rem' }}>Lo que pasa en el ecosistema y como Komuny responde</p>
            </div>
            <Link href="/novedades" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--accent)', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Ver todas <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Card novedad destacada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link href="/novedades/reinvencion-educativa" style={{ textDecoration: 'none', display: 'block' }}>
              <div className="novedad-card" style={{
                background: 'var(--bg-warm)',
                border: '1.5px solid var(--border)',
                borderRadius: '16px',
                padding: '0',
                overflow: 'hidden',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                display: 'grid',
                gridTemplateColumns: '1fr',
              }}>
                {/* Top accent bar */}
                <div style={{ height: '4px', background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%)' }} />
                <div style={{ padding: '1.75rem 2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, padding: '3px 10px', borderRadius: '20px', background: 'var(--accent-pale)', color: 'var(--accent)', border: '1px solid var(--accent-light)' }}>
                      Ecosistema Educativo
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>Mayo 2026</span>
                  </div>

                  <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.15rem, 2.5vw, 1.55rem)', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25, marginBottom: '0.85rem' }}>
                    "El sistema educativo no esta en crisis. Esta cumpliendo para lo que fue disenado. Y ese es el problema."
                  </h3>

                  <p style={{ fontSize: '0.92rem', color: 'var(--ink-muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                    Facundo Vazquez plantea el diagnostico que resuena con nuestra mision: el modelo educativo industrial ya se fracturo.
                    Lo que viene no es una reforma —es una reinvencion. Desde Komuny colaboramos con herramientas concretas para que
                    esa reinvencion empiece hoy, en el aula.
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', fontStyle: 'italic' }}>Contexto: nota de Facundo Vazquez · Respuesta Komuny</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <a
                        href="https://www.linkedin.com/posts/facundovazquez_el-sistema-educativo-no-est%C3%A1-en-crisis-est%C3%A1-share-7453405164482445312-gjH1/?utm_source=share"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--ink-muted)', textDecoration: 'none', padding: '0.35rem 0.85rem', borderRadius: '20px', border: '1.5px solid var(--border)', background: 'var(--bg)', fontWeight: 500 }}
                      >
                        <ExternalLink size={12} /> LinkedIn original
                      </a>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.88rem', color: 'var(--accent)', fontWeight: 600 }}>
                        Leer nota <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* GLOSARIO */}
      <section id="glosario" style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.5rem' }}>Glosario de IA</h2>
            <p style={{ color: 'var(--ink-muted)' }}>{glossaryTerms.length} terminos explicados para educadores, sin tecnicismos.</p>
          </div>
          <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar termino..." style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', background: 'var(--bg-warm)', border: '1.5px solid var(--border)', borderRadius: '12px', fontSize: '0.95rem', color: 'var(--ink)', outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
              {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', display: 'flex' }}><X size={16} /></button>}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button onClick={() => setActiveTag(null)} style={{ padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 500, background: activeTag === null ? 'var(--ink)' : 'transparent', color: activeTag === null ? 'var(--bg)' : 'var(--ink-muted)', border: `1.5px solid ${activeTag === null ? 'var(--ink)' : 'var(--border)'}` }}>Todos</button>
              {Object.entries(tagColors).map(([tag, color]) => (
                <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} style={{ padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 500, background: activeTag === tag ? color : 'transparent', color: activeTag === tag ? 'white' : color, border: `1.5px solid ${color}60` }}>
                  {tagLabels[tag] || tag}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {letters.map(l => (
                <button key={l} onClick={() => setActiveLetter(activeLetter === l ? null : l)} style={{ width: '32px', height: '32px', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'Fraunces, serif', fontWeight: 600, background: activeLetter === l ? 'var(--accent)' : 'var(--bg-warm)', color: activeLetter === l ? 'white' : 'var(--ink-muted)', border: `1.5px solid ${activeLetter === l ? 'var(--accent)' : 'var(--border)'}` }}>{l}</button>
              ))}
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: '1.5rem' }}>{filtered.length} termino{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {Object.entries(grouped).map(([letter, terms]) => (
              <div key={letter}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.75rem', borderBottom: '2px solid var(--accent-pale)', paddingBottom: '0.4rem' }}>{letter}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{terms.map(term => <TermCard key={term.term} term={term} />)}</div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--ink-muted)' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No se encontraron terminos</p>
              <p style={{ fontSize: '0.9rem' }}>Falta un termino? <a href="https://github.com/german-gimenez/komuny/issues/new" style={{ color: 'var(--accent)' }}>Proponelo en GitHub</a></p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 2rem', background: 'var(--ink)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--bg)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '1rem' }}>Quieres contribuir?</h2>
          <p style={{ color: 'rgba(245,240,232,0.65)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.7 }}>Komuny Edu crece con la comunidad. Agrega terminos, comparte tus prompts o cuenta tu experiencia.</p>
          <a href="https://github.com/german-gimenez/komuny" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent)', color: 'white', padding: '0.85rem 2rem', borderRadius: '30px', textDecoration: 'none', fontWeight: 600 }}>
            <GitFork size={18} /> Contribuir en GitHub
          </a>
        </div>
      </section>

      {/* RESPALDO INSTITUCIONAL */}
      <section style={{ padding: '4rem 2rem', background: 'var(--bg)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '2.25rem' }}
          >
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '0.5rem' }}>
              Con el respaldo de instituciones educativas
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="respaldo-badges"
          >
            {[
              {
                icon: <Scale size={15} />,
                label: 'Declarada de Inter\u00e9s por el Senado de Mendoza',
                href: 'https://senadomendoza.gob.ar/declaran-de-interes-una-fundacion-dedicada-a-la-educacion-y-capacitacion-de-docentes/',
                external: true,
              },
              {
                icon: <Shield size={15} />,
                label: 'Persona Jur\u00eddica \u00b7 CUIT 30-71735388-5',
                href: '/fundacion',
                external: false,
              },
              {
                icon: <Handshake size={15} />,
                label: 'Convenio con IES\u00a09-029',
                href: 'https://www.ies9029.edu.ar/convenio-marco-de-cooperacion-entre-ies-9-029-y-fundacion-komuny/',
                external: true,
              },
            ].map((b, i) =>
              b.external ? (
                <a
                  key={i}
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="respaldo-badge"
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
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                    whiteSpace: 'nowrap' as const,
                  }}
                >
                  <span style={{ color: 'var(--accent)', display: 'flex' }}>{b.icon}</span>
                  {b.label}
                </a>
              ) : (
                <Link
                  key={i}
                  href={b.href}
                  className="respaldo-badge"
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
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                    whiteSpace: 'nowrap' as const,
                  }}
                >
                  <span style={{ color: 'var(--accent)', display: 'flex' }}>{b.icon}</span>
                  {b.label}
                </Link>
              )
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ textAlign: 'center', marginTop: '2rem' }}
          >
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-muted)', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 1.5rem' }}>
              Fundaci&#243;n Komuny Social es una organizaci&#243;n sin fines de lucro registrada en Argentina,
              con reconocimiento legislativo provincial y convenios activos con instituciones educativas.
            </p>
            <Link
              href="/fundacion"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.9rem',
                color: 'var(--accent)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Conoc&#233; m&#225;s sobre la Fundaci&#243;n <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '2.5rem 2rem', textAlign: 'center', borderTop: '1px solid var(--border)', background: 'var(--bg-warm)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' as const }}>
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', textDecoration: 'none', padding: '0.4rem 1rem', borderRadius: '20px', border: '1.5px solid var(--border)', background: 'var(--bg)', fontWeight: 500 }}>
              {s.label}
            </a>
          ))}
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <Link href="/fundacion" style={{ fontSize: '0.82rem', color: 'var(--accent)', textDecoration: 'none', padding: '0.4rem 1rem', borderRadius: '20px', border: '1.5px solid var(--accent-light)', background: 'var(--accent-pale)', fontWeight: 600 }}>
            Fundaci&#243;n Komuny Social
          </Link>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
          Komuny Edu &mdash; Hecho con amor para docentes de America Latina &middot;{' '}
          <a href="https://napsix.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Napsix.AI</a>
        </p>
      </footer>

      <style>{`
        html, body { overflow-x: hidden; max-width: 100vw; }
        .term-card { background: var(--bg-warm); border: 1.5px solid var(--border); border-radius: 12px; padding: 1.1rem 1.25rem; transition: border-color 0.15s, box-shadow 0.15s; }
        .term-card:hover { border-color: var(--accent-light); box-shadow: 0 2px 12px rgba(212,98,42,0.08); }
        input:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 3px rgba(212,98,42,0.1); }
        .feature-row { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.25rem; text-decoration: none; background: transparent; transition: background 0.15s; }
        .feature-row:hover { background: var(--bg); }
        .hero-grid { display: grid; grid-template-columns: 55fr 45fr; gap: 4rem; align-items: center; padding: 5rem 4rem; max-width: 1280px; margin: 0 auto; min-height: 88vh; overflow: hidden; }
        .hero-h1 { font-size: clamp(2.4rem, 5vw, 4.8rem); }
        .hero-right { height: 500px; }
        .hero-stats { justify-content: flex-start; }
        .hero-ctas { justify-content: flex-start; }
        @media (max-width: 1024px) { .hero-grid { gap: 2.5rem; padding: 5rem 2.5rem; } }
        @media (max-width: 768px) {
          .recursos-section { padding: 2rem 1rem !important; }
          .feature-row { padding: 0.85rem 0.75rem; }
          .hero-grid { grid-template-columns: 1fr; padding: 3rem 1.25rem 2rem; gap: 0; min-height: unset; }
          .hero-left { text-align: center; max-width: 100%; }
          .hero-h1 { font-size: 2rem; }
          .hero-right { height: 280px; margin-bottom: 0.5rem; }
          .hero-stats { justify-content: center; gap: 1.5rem !important; }
          .hero-ctas { justify-content: center; flex-direction: column; align-items: center; }
          .hero-ctas a { width: 100%; max-width: 260px; justify-content: center; }
        }
        @media (max-width: 480px) {
          .hero-h1 { font-size: 1.75rem; }
          .hero-right { height: 240px; }
          .hero-stats { gap: 1rem !important; }
        }
        .respaldo-badges { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }
        .respaldo-badge:hover { border-color: var(--accent-light) !important; box-shadow: 0 2px 12px rgba(212,98,42,0.1); }
        .novedad-card:hover { border-color: var(--accent-light) !important; box-shadow: 0 4px 20px rgba(212,98,42,0.1); }
      `}</style>
      <KomIA />
      <BackToTop />
    </main>
  );
}
