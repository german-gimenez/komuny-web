'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Sparkles, Copy, Check, Download, RefreshCw, AlertCircle, Brain } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ToolLayout from '../../components/ToolLayout';

const NIVELES = ['Primaria (1-3)', 'Primaria (4-6)', 'Secundaria basica', 'Bachillerato/Polimodal', 'Universitario'];
const CANTIDADES = ['1', '2', '3'];
const TIPOS_PREGUNTA = ['Solo abiertas', 'Solo cerradas (opcion multiple)', 'Verdadero / Falso', 'Mixto (abiertas y cerradas)'];

const NIVELES_BLOOM = [
  { n: 1, nombre: 'Recordar', color: '#3A6B4A', desc: 'Memoria y conocimiento factual' },
  { n: 2, nombre: 'Comprender', color: '#1A5C9A', desc: 'Interpretacion y explicacion' },
  { n: 3, nombre: 'Aplicar', color: '#C9A227', desc: 'Uso en situaciones nuevas' },
  { n: 4, nombre: 'Analizar', color: '#D4622A', desc: 'Descomposicion y relaciones' },
  { n: 5, nombre: 'Evaluar', color: '#8B2FC9', desc: 'Juicio y valoracion critica' },
  { n: 6, nombre: 'Crear', color: '#B5341F', desc: 'Sintesis y produccion original' },
];

export default function PreguntasPage() {
  const [form, setForm] = useState({ tema: '', nivel: '', materia: '', cantidad: '2', tipoPregunta: 'Mixto (abiertas y cerradas)' });
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const isValid = form.tema.trim().length > 10 && form.nivel;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isLoading) return;
    setOutput(''); setError(''); setIsLoading(true);
    try {
      const res = await fetch('/api/herramientas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ herramienta: 'preguntas', datos: form }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let text = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setOutput(text);
        if (outputRef.current) outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    } catch (err) {
      setError('Ocurrio un error al generar las preguntas. Intentalo de nuevo.'); console.error(err);
    } finally { setIsLoading(false); }
  };

  const handleCopy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `banco-preguntas-${form.nivel.toLowerCase().replace(/\s+/g, '-')}.txt`; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout>
      <section style={{ padding: '2.5rem 2rem 5rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#FBF3DC', color: '#C9A227', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <HelpCircle size={24} />
              </div>
              <div>
                <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '0.25rem' }}>
                  Banco de Preguntas
                </h1>
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.92rem' }}>Preguntas clasificadas por Taxonomia de Bloom para cualquier tema</p>
              </div>
            </div>

            {/* Bloom levels visual */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {NIVELES_BLOOM.map(b => (
                <span key={b.n} style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: '12px', background: b.color + '18', color: b.color, border: `1px solid ${b.color}40`, fontWeight: 600 }}>
                  {b.n}. {b.nombre}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="preguntas-grid">
            {/* FORM */}
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div style={{ background: 'var(--bg-warm)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.25rem' }}>Configurar el banco</h2>

                <div>
                  <label style={labelStyle}>Tema o texto base * <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>({form.tema.length} caracteres)</span></label>
                  <textarea
                    value={form.tema}
                    onChange={e => setForm(f => ({ ...f, tema: e.target.value }))}
                    placeholder="Pega un texto, ingresa un tema o describe el contenido para el que queres preguntas..."
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                  />
                  {form.tema.length > 0 && form.tema.length < 10 && (
                    <p style={{ fontSize: '0.78rem', color: '#C9A227', marginTop: '0.3rem' }}>El tema debe ser mas descriptivo para mejores resultados.</p>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>Nivel educativo *</label>
                  <select value={form.nivel} onChange={e => setForm(f => ({ ...f, nivel: e.target.value }))} style={inputStyle}>
                    <option value="">Selecciona el nivel</option>
                    {NIVELES.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Materia/Area <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>(opcional)</span></label>
                  <input value={form.materia} onChange={e => setForm(f => ({ ...f, materia: e.target.value }))} placeholder="ej: Biologia, Literatura, Historia..." style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Preguntas por nivel de Bloom</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {CANTIDADES.map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, cantidad: c }))}
                        style={{
                          flex: 1,
                          padding: '0.6rem',
                          borderRadius: '10px',
                          border: `1.5px solid ${form.cantidad === c ? '#C9A227' : 'var(--border)'}`,
                          background: form.cantidad === c ? '#FBF3DC' : 'var(--bg)',
                          color: form.cantidad === c ? '#C9A227' : 'var(--ink-muted)',
                          fontSize: '0.88rem',
                          fontWeight: form.cantidad === c ? 700 : 400,
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          textAlign: 'center',
                        }}
                      >
                        {c} {parseInt(c) === 1 ? 'pregunta' : 'preguntas'}
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: '0.3rem' }}>
                    Total: {parseInt(form.cantidad) * 6} preguntas ({form.cantidad} por cada uno de los 6 niveles)
                  </p>
                </div>

                <div>
                  <label style={labelStyle}>Tipo de preguntas preferido</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {TIPOS_PREGUNTA.map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, tipoPregunta: t }))}
                        style={{
                          padding: '0.5rem 0.9rem',
                          borderRadius: '8px',
                          border: `1.5px solid ${form.tipoPregunta === t ? '#C9A227' : 'var(--border)'}`,
                          background: form.tipoPregunta === t ? '#FBF3DC' : 'var(--bg)',
                          color: form.tipoPregunta === t ? '#C9A227' : 'var(--ink-muted)',
                          fontSize: '0.85rem',
                          fontWeight: form.tipoPregunta === t ? 600 : 400,
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isValid || isLoading}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    padding: '0.85rem 1.5rem',
                    background: isValid && !isLoading ? '#C9A227' : 'var(--border)',
                    color: 'white', border: 'none', borderRadius: '30px',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 600,
                    cursor: isValid && !isLoading ? 'pointer' : 'not-allowed',
                    transition: 'background 0.15s', marginTop: '0.5rem',
                  }}
                >
                  {isLoading ? <><RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Generando preguntas...</> : <><Brain size={16} /> Generar Banco de Preguntas</>}
                </button>

                {!isValid && <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><AlertCircle size={13} /> Ingresa el tema y selecciona el nivel.</p>}
              </div>
            </motion.form>

            {/* OUTPUT */}
            <div>
              {error && <div style={{ background: '#FBF3DC', border: '1px solid #C9A22740', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1rem', color: '#C9A227', fontSize: '0.88rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><AlertCircle size={15} style={{ flexShrink: 0, marginTop: '0.1rem' }} /> {error}</div>}

              {(output || isLoading) && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  {output && !isLoading && (
                    <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <button onClick={handleCopy} style={actionBtnStyle}>{copied ? <><Check size={14} /> Copiado!</> : <><Copy size={14} /> Copiar</>}</button>
                      <button onClick={handleDownload} style={actionBtnStyle}><Download size={14} /> Descargar</button>
                      <button onClick={() => { setOutput(''); setError(''); }} style={{ ...actionBtnStyle, marginLeft: 'auto' }}><RefreshCw size={14} /> Nuevo banco</button>
                    </div>
                  )}
                  <div style={{ background: 'var(--bg-warm)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '1.75rem', minHeight: '200px' }}>
                    {isLoading && !output && (
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', color: 'var(--ink-muted)', fontSize: '0.9rem' }}>
                        {[0, 1, 2].map(i => <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--ink-muted)' }} />)}
                        <span style={{ marginLeft: '0.25rem' }}>Generando banco de preguntas por niveles de Bloom...</span>
                      </div>
                    )}
                    <div ref={outputRef}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                        h2: ({ children }) => <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', margin: '1.5rem 0 0.75rem', borderBottom: '2px solid #FBF3DC', paddingBottom: '0.4rem' }}>{children}</h2>,
                        h3: ({ children }) => <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '0.98rem', fontWeight: 700, color: '#C9A227', margin: '1.25rem 0 0.5rem' }}>{children}</h3>,
                        p: ({ children }) => <p style={{ color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.65, margin: '0.5rem 0' }}>{children}</p>,
                        strong: ({ children }) => <strong style={{ fontWeight: 700, color: 'var(--ink)' }}>{children}</strong>,
                        ul: ({ children }) => <ul style={{ paddingLeft: '1.4em', margin: '0.5rem 0' }}>{children}</ul>,
                        ol: ({ children }) => <ol style={{ paddingLeft: '1.4em', margin: '0.5rem 0' }}>{children}</ol>,
                        li: ({ children }) => <li style={{ color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '0.25rem' }}>{children}</li>,
                        blockquote: ({ children }) => <blockquote style={{ background: '#FBF3DC', borderLeft: '3px solid #C9A227', padding: '0.75rem 1rem', borderRadius: '0 8px 8px 0', margin: '0.75rem 0' }}>{children}</blockquote>,
                      }}>
                        {output}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              )}

              {!output && !isLoading && !error && (
                <div style={{ background: 'var(--bg-warm)', border: '1.5px dashed var(--border)', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center', color: 'var(--ink-muted)' }}>
                  <HelpCircle size={40} style={{ opacity: 0.25, margin: '0 auto 1rem' }} />
                  <p style={{ fontSize: '0.92rem', marginBottom: '0.35rem' }}>Tu banco de preguntas aparecera aqui</p>
                  <p style={{ fontSize: '0.82rem', opacity: 0.7 }}>Con preguntas para los 6 niveles de la Taxonomia de Bloom</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .preguntas-grid { display: grid; grid-template-columns: 380px 1fr; gap: 1.5rem; align-items: start; }
        input:focus, textarea:focus, select:focus { border-color: #C9A227 !important; outline: none; box-shadow: 0 0 0 3px rgba(201,162,39,0.1); }
        @media (max-width: 900px) { .preguntas-grid { grid-template-columns: 1fr; } }
      `}</style>
    </ToolLayout>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.45rem' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.7rem 0.9rem', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', color: 'var(--ink)', fontFamily: 'DM Sans, sans-serif', transition: 'border-color 0.15s', boxSizing: 'border-box' };
const actionBtnStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', background: 'var(--bg-warm)', border: '1.5px solid var(--border)', borderRadius: '20px', fontSize: '0.83rem', color: 'var(--ink)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, transition: 'border-color 0.15s' };
