'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileSearch, Sparkles, Copy, Check, Download, RefreshCw, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ToolLayout from '../../components/ToolLayout';

const NIVELES = ['Primaria (1-3)', 'Primaria (4-6)', 'Secundaria basica', 'Bachillerato/Polimodal', 'Universitario'];
const TIPOS = [
  { value: 'resumen', label: 'Resumen', desc: 'Condensa las ideas principales en 150 palabras' },
  { value: 'explicacion-simple', label: 'Explicacion simple', desc: 'Reescribe el texto con vocabulario del nivel' },
  { value: 'preguntas', label: 'Preguntas de comprension', desc: '8 preguntas literales, inferenciales y criticas' },
  { value: 'mapa-conceptual', label: 'Mapa conceptual', desc: 'Estructura jerarquica con ramas y detalles' },
];

export default function SimplificadorPage() {
  const [form, setForm] = useState({ texto: '', nivel: '', tipo: '', materia: '' });
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const isValid = form.texto.trim().length > 50 && form.nivel && form.tipo;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isLoading) return;
    setOutput(''); setError(''); setIsLoading(true);
    try {
      const res = await fetch('/api/herramientas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ herramienta: 'simplificador', datos: form }),
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
      setError('Ocurrio un error al simplificar el texto. Intentalo de nuevo.'); console.error(err);
    } finally { setIsLoading(false); }
  };

  const handleCopy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'texto-simplificado.txt'; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout>
      <section style={{ padding: '2.5rem 2rem 5rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#E8F2EC', color: '#3A6B4A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileSearch size={24} />
              </div>
              <div>
                <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '0.25rem' }}>
                  Simplificador de Textos
                </h1>
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.92rem' }}>Adapta textos complejos a cualquier nivel educativo</p>
              </div>
            </div>
          </motion.div>

          <div className="simpl-grid">
            {/* FORM */}
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div style={{ background: 'var(--bg-warm)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.25rem' }}>Texto y parametros</h2>

                <div>
                  <label style={labelStyle}>Texto a adaptar * <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>({form.texto.length} caracteres)</span></label>
                  <textarea
                    value={form.texto}
                    onChange={e => setForm(f => ({ ...f, texto: e.target.value }))}
                    placeholder="Pega aqui el texto academico que queres adaptar..."
                    rows={7}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '160px' }}
                  />
                  {form.texto.length > 0 && form.texto.length < 50 && (
                    <p style={{ fontSize: '0.78rem', color: '#D4622A', marginTop: '0.3rem' }}>El texto debe tener al menos 50 caracteres.</p>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>Nivel destinatario *</label>
                  <select value={form.nivel} onChange={e => setForm(f => ({ ...f, nivel: e.target.value }))} style={inputStyle}>
                    <option value="">Selecciona el nivel</option>
                    {NIVELES.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Tipo de salida *</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {TIPOS.map(t => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, tipo: t.value }))}
                        style={{
                          padding: '0.65rem 1rem',
                          borderRadius: '10px',
                          border: `1.5px solid ${form.tipo === t.value ? '#3A6B4A' : 'var(--border)'}`,
                          background: form.tipo === t.value ? '#E8F2EC' : 'var(--bg)',
                          color: form.tipo === t.value ? '#3A6B4A' : 'var(--ink-muted)',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.15rem',
                        }}
                      >
                        <span style={{ fontWeight: form.tipo === t.value ? 600 : 500, color: form.tipo === t.value ? '#3A6B4A' : 'var(--ink)' }}>{t.label}</span>
                        <span style={{ fontSize: '0.78rem', opacity: 0.8 }}>{t.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Materia/Area <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>(opcional)</span></label>
                  <input value={form.materia} onChange={e => setForm(f => ({ ...f, materia: e.target.value }))} placeholder="ej: Ciencias Naturales, Literatura..." style={inputStyle} />
                </div>

                <button
                  type="submit"
                  disabled={!isValid || isLoading}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    padding: '0.85rem 1.5rem',
                    background: isValid && !isLoading ? '#3A6B4A' : 'var(--border)',
                    color: 'white', border: 'none', borderRadius: '30px',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 600,
                    cursor: isValid && !isLoading ? 'pointer' : 'not-allowed',
                    transition: 'background 0.15s', marginTop: '0.5rem',
                  }}
                >
                  {isLoading ? <><RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Adaptando texto...</> : <><Sparkles size={16} /> Adaptar Texto</>}
                </button>

                {!isValid && <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><AlertCircle size={13} /> Pega el texto, selecciona el nivel y el tipo de salida.</p>}
              </div>
            </motion.form>

            {/* OUTPUT */}
            <div>
              {error && <div style={{ background: '#E8F2EC', border: '1px solid #3A6B4A40', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1rem', color: '#3A6B4A', fontSize: '0.88rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}><AlertCircle size={15} style={{ flexShrink: 0, marginTop: '0.1rem' }} /> {error}</div>}

              {(output || isLoading) && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  {output && !isLoading && (
                    <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <button onClick={handleCopy} style={actionBtnStyle}>{copied ? <><Check size={14} /> Copiado!</> : <><Copy size={14} /> Copiar</>}</button>
                      <button onClick={handleDownload} style={actionBtnStyle}><Download size={14} /> Descargar</button>
                      <button onClick={() => { setOutput(''); setError(''); }} style={{ ...actionBtnStyle, marginLeft: 'auto' }}><RefreshCw size={14} /> Limpiar</button>
                    </div>
                  )}
                  <div style={{ background: 'var(--bg-warm)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '1.75rem', minHeight: '200px' }}>
                    {isLoading && !output && (
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', color: 'var(--ink-muted)', fontSize: '0.9rem' }}>
                        {[0, 1, 2].map(i => <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--ink-muted)' }} />)}
                        <span style={{ marginLeft: '0.25rem' }}>Adaptando texto...</span>
                      </div>
                    )}
                    <div ref={outputRef}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                        h2: ({ children }) => <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', margin: '1.5rem 0 0.75rem', borderBottom: '2px solid #E8F2EC', paddingBottom: '0.4rem' }}>{children}</h2>,
                        h3: ({ children }) => <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '0.98rem', fontWeight: 700, color: '#3A6B4A', margin: '1.25rem 0 0.5rem' }}>{children}</h3>,
                        p: ({ children }) => <p style={{ color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.65, margin: '0.5rem 0' }}>{children}</p>,
                        strong: ({ children }) => <strong style={{ fontWeight: 700, color: 'var(--ink)' }}>{children}</strong>,
                        ul: ({ children }) => <ul style={{ paddingLeft: '1.4em', margin: '0.5rem 0' }}>{children}</ul>,
                        ol: ({ children }) => <ol style={{ paddingLeft: '1.4em', margin: '0.5rem 0' }}>{children}</ol>,
                        li: ({ children }) => <li style={{ color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '0.25rem' }}>{children}</li>,
                        blockquote: ({ children }) => <blockquote style={{ background: '#E8F2EC', borderLeft: '3px solid #3A6B4A', padding: '0.75rem 1rem', borderRadius: '0 8px 8px 0', margin: '0.75rem 0' }}>{children}</blockquote>,
                      }}>
                        {output}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              )}

              {!output && !isLoading && !error && (
                <div style={{ background: 'var(--bg-warm)', border: '1.5px dashed var(--border)', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center', color: 'var(--ink-muted)' }}>
                  <FileSearch size={40} style={{ opacity: 0.25, margin: '0 auto 1rem' }} />
                  <p style={{ fontSize: '0.92rem', marginBottom: '0.35rem' }}>El texto adaptado aparecera aqui</p>
                  <p style={{ fontSize: '0.82rem', opacity: 0.7 }}>Pega tu texto, elige el nivel y tipo de salida</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .simpl-grid { display: grid; grid-template-columns: 380px 1fr; gap: 1.5rem; align-items: start; }
        input:focus, textarea:focus, select:focus { border-color: #3A6B4A !important; outline: none; box-shadow: 0 0 0 3px rgba(58,107,74,0.1); }
        @media (max-width: 900px) { .simpl-grid { grid-template-columns: 1fr; } }
      `}</style>
    </ToolLayout>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.45rem' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.7rem 0.9rem', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', color: 'var(--ink)', fontFamily: 'DM Sans, sans-serif', transition: 'border-color 0.15s', boxSizing: 'border-box' };
const actionBtnStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', background: 'var(--bg-warm)', border: '1.5px solid var(--border)', borderRadius: '20px', fontSize: '0.83rem', color: 'var(--ink)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, transition: 'border-color 0.15s' };
