'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Cpu, FileText, GraduationCap, Star, ArrowRight, GitFork, Search, X, Lightbulb, AlertCircle, ChevronDown, Globe } from 'lucide-react';
import { glossaryTerms, letters, tagColors, GlossaryTerm } from './data/glossary';

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
    { icon: <Globe size={18} />, title: 'Herramientas gratuitas', desc: 'Canva, Khanmigo, NotebookLM y mas recursos sin costo.', color: '#C9A227', bg: '#FBF3DC', href: 'https://github.com/german-gimenez/komuny/blob/main/recursos/herramientas-gratuitas.md', label: 'Ver lista →', external: true },
    { icon: <Cpu size={18} />, title: 'Skills para Claude', desc: 'Configuraciones especializadas listas para usar en el aula.', color: '#3A6B4A', bg: '#E8F2EC', href: 'https://github.com/german-gimenez/komuny/tree/main/skills', label: 'En GitHub →', external: true },
    { icon: <FileText size={18} />, title: 'Templates de Prompts', desc: 'Tickets listos para planear clases y evaluar.', color: '#1A5C9A', bg: '#E0EDF7', href: 'https://github.com/german-gimenez/komuny/tree/main/templates', label: 'En GitHub →', external: true },
    { icon: <GraduationCap size={18} />, title: 'Guias paso a paso', desc: 'Desde tu primera clase con IA hasta proyectos de 4 semanas.', color: '#8B2FC9', bg: '#F2E8FB', href: 'https://github.com/german-gimenez/komuny/tree/main/guides', label: 'En GitHub →', external: true },
  ];

  return (
    <main>
      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(245,240,232,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src="/favicon.jpg" alt="Komuny" style={{ width: '28px', height: '28px', borderRadius: '6px', objectFit: 'cover' }} />
          <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '1.1rem' }}>Komuny Edu</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <a href="#glosario" style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', textDecoration: 'none', padding: '0.3rem 0.7rem' }}>Glosario</a>
          <a href="#recursos" style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', textDecoration: 'none', padding: '0.3rem 0.7rem' }}>Recursos</a>
          <a href="https://github.com/german-gimenez/komuny" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', textDecoration: 'none', background: 'var(--ink)', color: 'var(--bg)', padding: '0.35rem 0.9rem', borderRadius: '20px', fontWeight: 500 }}>
            <GitFork size={14} /> GitHub
          </a>
          <div style={{ width: '1px', height: '18px', background: 'var(--border)', margin: '0 0.25rem' }} />
          {[{ href: 'https://www.instagram.com/komuny.social/', label: 'IG' }, { href: 'https://www.facebook.com/komuny.social/', label: 'FB' }, { href: 'https://www.linkedin.com/company/komuny/', label: 'LI' }].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', textDecoration: 'none', padding: '0.3rem 0.6rem', borderRadius: '8px', fontWeight: 600, border: '1px solid var(--border)' }}>{s.label}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '88vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem 6rem', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(212,98,42,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(58,107,74,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-pale)', border: '1px solid var(--accent-light)', padding: '0.35rem 1rem', borderRadius: '20px', marginBottom: '2rem' }}>
            <Star size={13} color="var(--accent)" fill="var(--accent)" />
            <span style={{ fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.05em' }}>OPEN SOURCE - PARA LATAM</span>
          </div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 700, maxWidth: '820px', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
          IA para docentes,<br /><em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--accent)' }}>sin barreras.</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} style={{ fontSize: '1.15rem', color: 'var(--ink-muted)', maxWidth: '560px', marginBottom: '2.5rem', lineHeight: 1.7 }}>
          Recursos practicos, abiertos y colaborativos para educadores que quieren integrar inteligencia artificial en el aula.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ display: 'flex', gap: '3rem', marginTop: '5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[{ n: `${glossaryTerms.length}+`, label: 'Terminos en glosario' }, { n: 'LATAM', label: 'Enfoque regional' }, { n: '100%', label: 'Open Source' }].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--accent)' }}>{s.n}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginTop: '0.2rem' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="recursos" style={{ padding: '3rem 2rem', background: 'var(--bg-warm)' }}>
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
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: f.bg, color: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{f.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)', marginRight: '0.5rem' }}>{f.title}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--ink-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.desc}</span>
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: f.color, flexShrink: 0, whiteSpace: 'nowrap' }}>{f.label}</span>
              </a>
            ))}
          </div>
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

      {/* FOOTER */}
      <footer style={{ padding: '2.5rem 2rem', textAlign: 'center', borderTop: '1px solid var(--border)', background: 'var(--bg-warm)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' as const }}>
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', textDecoration: 'none', padding: '0.4rem 1rem', borderRadius: '20px', border: '1.5px solid var(--border)', background: 'var(--bg)', fontWeight: 500 }}>
              {s.label}
            </a>
          ))}
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
          Komuny Edu &mdash; Hecho con amor para docentes de America Latina &middot;{' '}
          <a href="https://napsix.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Napsix.AI</a>
        </p>
      </footer>

      <style>{`
        .term-card { background: var(--bg-warm); border: 1.5px solid var(--border); border-radius: 12px; padding: 1.1rem 1.25rem; transition: border-color 0.15s, box-shadow 0.15s; }
        .term-card:hover { border-color: var(--accent-light); box-shadow: 0 2px 12px rgba(212,98,42,0.08); }
        input:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 3px rgba(212,98,42,0.1); }
        .feature-row { display: flex; align-items: center; gap: 1rem; padding: 0.9rem 1rem; text-decoration: none; background: transparent; transition: background 0.15s; }
        .feature-row:hover { background: var(--bg); }
      `}</style>
    </main>
  );
}
