'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ScanSearch, Sparkles, Copy, Check, Download, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ToolLayout from '../../components/ToolLayout';

const NIVELES = ['Inicial / Preescolar', 'Primaria', 'Secundaria', 'Bachillerato', 'Universitario', 'General'];
const MATERIAS = ['Ciencias Sociales / Historia', 'Lengua y Literatura', 'Ciencias Naturales', 'Matematica', 'Educacion Fisica', 'Arte / Musica', 'Ciudadania / Etica', 'Tecnologia / Informatica', 'Otra'];

const TIPOS_SESGO = [
  { id: 'genero', label: 'Genero', color: '#8B2FC9', desc: 'Lenguaje no inclusivo, roles estereotipados' },
  { id: 'cultural', label: 'Cultural', color: '#D4622A', desc: 'Etnocentrismo, invisibilizacion de culturas' },
  { id: 'socioeconomico', label: 'Socioeconomico', color: '#1A5C9A', desc: 'Suposiciones sobre acceso a recursos' },
  { id: 'cognitivo', label: 'Capacidades', color: '#3A6B4A', desc: 'Ritmos de aprendizaje, diversidad funcional' },
];

export default function DetectorSesgosPage() {
  const [form, setForm] = useState({ texto: '', nivel: '', materia: '' });
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const isValid = form.texto.trim().length > 30;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isLoading) return;
    setOutput(''); setError(''); setIsLoading(true);
    try {
      const res = await fetch('/api/herramientas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ herramienta: 'detector-sesgos', datos: form }),
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
      setError('Ocurrio un error al analizar el texto. Intentalo de nuevo.'); console.error(err);
    } finally { setIsLoading(false); }
  };

  const handleCopy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'analisis-sesgos.txt'; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout>
      <section style={{ padding: '2.5rem 2rem 5rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#F2E8FB', color: '#8B2FC9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ScanSearch size={24} />
              </div>
              <div>
                <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '0.25rem' }}>
                  Detector de Sesgos
                </h1>
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.92rem' }}>Analiza y mejora tus materiales para una educacion inclusiva</p>
              </div>
            </div>

            {/* Info strip */}
            <div style={{ background: '#F2E8FB', border: '1px solid #8B2FC940', borderRadius: '12px', padding: '0.9rem 1.1rem', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
              <ShieldCheck size={16} style={{ color: '#8B2FC9', flexShrink: 0, marginTop: '0.1rem' }} />
              <p style={{ fontSize: '0.85rem', color: '#8B2FC9', lineHeight: 1.5, margin: 0 }}>
                <strong>Analiza 4 tipos de sesgos:</strong> {TIPOS_SESGO.map(t => t.label).join(', ')}. El analisis es constructivo y siempre propone alternativas mejoradas.
              </p>
            </div>
          </motion.div>

          <div className="sesgo-grid">
            {/* FORM */}
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div style={{ background: 'var(--bg-warm)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.25rem' }}>Material a analizar</h2>

                <div>
                  <label style={labelStyle}>Texto, consigna o actividad * <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>({form.texto.length} caracteres)</span></label>
                  <textarea
                    value={form.texto}
                    onChange={e => setForm(f => ({ ...f, texto: e.target.value }))}
                    placeholder="Pega aqui la actividad, consigna, texto de evaluacion o material educativo que queres analizar..."
                    rows={8}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '180px' }}
                  />
                  {form.texto.length > 0 && form.texto.length < 30 && (
                    <p style={{ fontSize: '0.78rem', color: '#8B2FC9', marginTop: '0.3rem' }}>El texto debe tener al menos 30 caracteres para un analisis util.</p>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Nivel educativo</label>
                    <select value={form.nivel} onChange={e => setForm(f => ({ ...f, nivel: e.target.value }))} style={inputStyle}>
                      <option value="">Opcional</option>
                      {NIVELES.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Materia/Area</label>
                    <select value={form.materia} onChange={e => setForm(f => ({ ...f, materia: e.target.value }))} style={inputStyle}>
                      <option value="">Opcional</option>
                      {MATERIAS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>

                {/* Tipos de sesgo info */}
                <div>
                  <label style={labelStyle}>Tipos de sesgo que se analizaran</label>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {TIPOS_SESGO.map(t => (
                      <span key={t.id} style={{ fontSize: '0.75rem', padding: '3px 10px', borderRadius: '12px', background: t.color + '18', color: t.color, border: `1px solid ${t.color}40`, fontWeight: 500 }}>
                        {t.label}
                      </span>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: '0.4rem' }}>Se analizan los 4 tipos siempre.</p>
                </div>

                <button
                  type="submit"
                  disabled={!isValid || isLoading}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    padding: '0.85rem 1.5rem',
                    background: isValid && !isLoading ? '#8B2FC9' : 'var(--border)',
                    color: 'white', border: 'none', borderRadius: '30px',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 600,
                    cursor: isValid && !isLoading ? 'pointer' : 'not-allowed',
                    transition: 'background 0.15s', marginTop: '0.5rem',
                  }}
                >
                  {isLoading ? <><RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Analizando sesgos...</> : <><Sparkles size={16} /> Analizar Material</>}
                </button>

                {!isValid && <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><AlertCircle size={13} /> Pega el texto o actividad a analizar para continuar.</p>}
              </div>
            </motion.form>

            {/* OUTPUT */}
            <div>
              {error && <div style={{ background: '#F2E8FB', border: '1px solid #8B2FC940', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1rem', color: '#8B2FC9', fontSize: '0.88rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><AlertCircle size={15} style={{ flexShrink: 0, marginTop: '0.1rem' }} /> {error}</div>}

              {(output || isLoading) && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  {output && !isLoading && (
                    <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <button onClick={handleCopy} style={actionBtnStyle}>{copied ? <><Check size={14} /> Copiado!</> : <><Copy size={14} /> Copiar</>}</button>
                      <button onClick={handleDownload} style={actionBtnStyle}><Download size={14} /> Descargar</button>
                      <button onClick={() => { setOutput(''); setError(''); }} style={{ ...actionBtnStyle, marginLeft: 'auto' }}><RefreshCw size={14} /> Nuevo analisis</button>
                    </div>
                  )}
                  <div style={{ background: 'var(--bg-warm)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '1.75rem', minHeight: '200px' }}>
                    {isLoading && !output && (
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', color: 'var(--ink-muted)', fontSize: '0.9rem' }}>
                        {[0, 1, 2].map(i => <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--ink-muted)' }} />)}
                        <span style={{ marginLeft: '0.25rem' }}>Analizando sesgos en el material...</span>
                      </div>
                    )}
                    <div ref={outputRef}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                        h2: ({ children }) => <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', margin: '1.5rem 0 0.75rem', borderBottom: '2px solid #F2E8FB', paddingBottom: '0.4rem' }}>{children}</h2>,
                        h3: ({ children }) => <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '0.98rem', fontWeight: 700, color: '#8B2FC9', margin: '1.25rem 0 0.5rem' }}>{children}</h3>,
                        p: ({ children }) => <p style={{ color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.65, margin: '0.5rem 0' }}>{children}</p>,
                        strong: ({ children }) => <strong style={{ fontWeight: 700, color: 'var(--ink)' }}>{children}</strong>,
                        ul: ({ children }) => <ul style={{ paddingLeft: '1.4em', margin: '0.5rem 0' }}>{children}</ul>,
                        ol: ({ children }) => <ol style={{ paddingLeft: '1.4em', margin: '0.5rem 0' }}>{children}</ol>,
                        li: ({ children }) => <li style={{ color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '0.25rem' }}>{children}</li>,
                        blockquote: ({ children }) => <blockquote style={{ background: '#F2E8FB', borderLeft: '3px solid #8B2FC9', padding: '0.75rem 1rem', borderRadius: '0 8px 8px 0', margin: '0.75rem 0' }}>{children}</blockquote>,
                      }}>
                        {output}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              )}

              {!output && !isLoading && !error && (
                <div style={{ background: 'var(--bg-warm)', border: '1.5px dashed var(--border)', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center', color: 'var(--ink-muted)' }}>
                  <ScanSearch size={40} style={{ opacity: 0.25, margin: '0 auto 1rem' }} />
                  <p style={{ fontSize: '0.92rem', marginBottom: '0.35rem' }}>El analisis de sesgos aparecera aqui</p>
                  <p style={{ fontSize: '0.82rem', opacity: 0.7 }}>Pega tu material educativo y hace clic en Analizar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .sesgo-grid { display: grid; grid-template-columns: 380px 1fr; gap: 1.5rem; align-items: start; }
        input:focus, textarea:focus, select:focus { border-color: #8B2FC9 !important; outline: none; box-shadow: 0 0 0 3px rgba(139,47,201,0.1); }
        @media (max-width: 900px) { .sesgo-grid { grid-template-columns: 1fr; } }
      `}</style>
    </ToolLayout>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.45rem' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.7rem 0.9rem', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', color: 'var(--ink)', fontFamily: 'DM Sans, sans-serif', transition: 'border-color 0.15s', boxSizing: 'border-box' };
const actionBtnStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', background: 'var(--bg-warm)', border: '1.5px solid var(--border)', borderRadius: '20px', fontSize: '0.83rem', color: 'var(--ink)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, transition: 'border-color 0.15s' };
