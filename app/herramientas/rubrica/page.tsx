'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileCheck2, Sparkles, Copy, Check, Download, RefreshCw, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ToolLayout from '../../components/ToolLayout';

const NIVELES = ['Primaria (1-6)', 'Secundaria (7-9)', 'Bachillerato/Polimodal', 'Universitario', 'Formacion docente'];
const ACTIVIDADES = ['Trabajo escrito / Ensayo', 'Presentacion oral / Exposicion', 'Proyecto grupal', 'Trabajo practico / Laboratorio', 'Debate', 'Portafolio', 'Obra de arte / Produccion creativa', 'Evaluacion oral', 'Investigacion', 'Otro'];
const IDIOMAS = ['Espanol', 'Ingles', 'Portugues'];

export default function RubricaPage() {
  const [form, setForm] = useState({
    materia: '',
    nivel: '',
    actividad: '',
    criterios: '',
    idioma: 'Espanol',
  });
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const isValid = form.materia.trim() && form.nivel && form.actividad;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isLoading) return;
    setOutput('');
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/herramientas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ herramienta: 'rubrica', datos: form }),
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
      setError('Ocurrio un error al generar la rubrica. Intentalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rubrica-${form.materia.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setOutput('');
    setError('');
  };

  return (
    <ToolLayout>
      <section style={{ padding: '2.5rem 2rem 5rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '2.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#FBE9DF', color: '#D4622A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileCheck2 size={24} />
              </div>
              <div>
                <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '0.25rem' }}>
                  Generador de Rubrica
                </h1>
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.92rem' }}>
                  Crea rubricas completas con IA en segundos
                </p>
              </div>
            </div>
          </motion.div>

          <div className="rubrica-grid">
            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <form onSubmit={handleSubmit}>
                <div style={{ background: 'var(--bg-warm)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--ink)' }}>
                    Datos de la actividad
                  </h2>

                  {/* Materia */}
                  <div>
                    <label style={labelStyle}>Materia / Area *</label>
                    <input
                      value={form.materia}
                      onChange={e => setForm(f => ({ ...f, materia: e.target.value }))}
                      placeholder="ej: Matematica, Historia, Biologia..."
                      style={inputStyle}
                    />
                  </div>

                  {/* Nivel */}
                  <div>
                    <label style={labelStyle}>Nivel educativo *</label>
                    <select value={form.nivel} onChange={e => setForm(f => ({ ...f, nivel: e.target.value }))} style={inputStyle}>
                      <option value="">Selecciona el nivel</option>
                      {NIVELES.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>

                  {/* Actividad */}
                  <div>
                    <label style={labelStyle}>Tipo de actividad *</label>
                    <select value={form.actividad} onChange={e => setForm(f => ({ ...f, actividad: e.target.value }))} style={inputStyle}>
                      <option value="">Selecciona el tipo</option>
                      {ACTIVIDADES.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>

                  {/* Criterios */}
                  <div>
                    <label style={labelStyle}>Criterios importantes <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>(opcional)</span></label>
                    <textarea
                      value={form.criterios}
                      onChange={e => setForm(f => ({ ...f, criterios: e.target.value }))}
                      placeholder="ej: claridad de argumentos, uso de fuentes, creatividad..."
                      rows={3}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                    />
                    <p style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: '0.35rem' }}>
                      Si lo dejás vacío, la IA usará criterios estándar para esta actividad.
                    </p>
                  </div>

                  {/* Idioma */}
                  <div>
                    <label style={labelStyle}>Idioma de la rubrica</label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {IDIOMAS.map(id => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, idioma: id }))}
                          style={{
                            padding: '0.35rem 1rem',
                            borderRadius: '20px',
                            border: `1.5px solid ${form.idioma === id ? '#D4622A' : 'var(--border)'}`,
                            background: form.idioma === id ? '#FBE9DF' : 'var(--bg)',
                            color: form.idioma === id ? '#D4622A' : 'var(--ink-muted)',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            fontWeight: form.idioma === id ? 600 : 400,
                            transition: 'all 0.15s',
                          }}
                        >
                          {id}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!isValid || isLoading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.85rem 1.5rem',
                      background: isValid && !isLoading ? '#D4622A' : 'var(--border)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '30px',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      cursor: isValid && !isLoading ? 'pointer' : 'not-allowed',
                      transition: 'background 0.15s',
                      marginTop: '0.5rem',
                    }}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                        Generando rubrica...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        Generar Rubrica
                      </>
                    )}
                  </button>

                  {!isValid && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <AlertCircle size={13} /> Completá los campos obligatorios (*) para continuar.
                    </p>
                  )}
                </div>
              </form>
            </motion.div>

            {/* OUTPUT */}
            <div>
              {error && (
                <div style={{ background: '#FBE9DF', border: '1px solid var(--accent-light)', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1rem', color: 'var(--accent)', fontSize: '0.88rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <AlertCircle size={15} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                  {error}
                </div>
              )}

              {(output || isLoading) && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Output actions */}
                  {output && !isLoading && (
                    <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <button onClick={handleCopy} style={actionBtnStyle}>
                        {copied ? <><Check size={14} /> Copiado!</> : <><Copy size={14} /> Copiar</>}
                      </button>
                      <button onClick={handleDownload} style={actionBtnStyle}>
                        <Download size={14} /> Descargar .txt
                      </button>
                      <button onClick={handleReset} style={{ ...actionBtnStyle, marginLeft: 'auto' }}>
                        <RefreshCw size={14} /> Nueva rubrica
                      </button>
                    </div>
                  )}

                  {/* Output card */}
                  <div style={{ background: 'var(--bg-warm)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '1.75rem', minHeight: '200px' }}>
                    {isLoading && !output && (
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', color: 'var(--ink-muted)', fontSize: '0.9rem' }}>
                        {[0, 1, 2].map(i => (
                          <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--ink-muted)' }} />
                        ))}
                        <span style={{ marginLeft: '0.25rem' }}>Generando rubrica...</span>
                      </div>
                    )}
                    <div ref={outputRef} className="rubrica-output">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h2: ({ children }) => <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)', margin: '1.5rem 0 0.75rem', borderBottom: '2px solid var(--accent-pale)', paddingBottom: '0.4rem' }}>{children}</h2>,
                          h3: ({ children }) => <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1rem', fontWeight: 700, color: 'var(--accent)', margin: '1.25rem 0 0.5rem' }}>{children}</h3>,
                          p: ({ children }) => <p style={{ color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.65, margin: '0.5rem 0' }}>{children}</p>,
                          strong: ({ children }) => <strong style={{ fontWeight: 700, color: 'var(--ink)' }}>{children}</strong>,
                          ul: ({ children }) => <ul style={{ paddingLeft: '1.4em', margin: '0.5rem 0' }}>{children}</ul>,
                          ol: ({ children }) => <ol style={{ paddingLeft: '1.4em', margin: '0.5rem 0' }}>{children}</ol>,
                          li: ({ children }) => <li style={{ color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '0.25rem' }}>{children}</li>,
                          table: ({ children }) => (
                            <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
                              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>{children}</table>
                            </div>
                          ),
                          thead: ({ children }) => <thead style={{ background: '#D4622A', color: 'white' }}>{children}</thead>,
                          th: ({ children }) => <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontWeight: 600, fontSize: '0.82rem' }}>{children}</th>,
                          td: ({ children }) => <td style={{ padding: '0.55rem 0.75rem', borderBottom: '1px solid var(--border)', color: 'var(--ink)', fontSize: '0.83rem', verticalAlign: 'top' }}>{children}</td>,
                          tr: ({ children }) => <tr style={{ borderBottom: '1px solid var(--border)' }}>{children}</tr>,
                          blockquote: ({ children }) => <blockquote style={{ background: 'var(--accent-pale)', borderLeft: '3px solid var(--accent)', padding: '0.75rem 1rem', borderRadius: '0 8px 8px 0', margin: '0.75rem 0' }}>{children}</blockquote>,
                        }}
                      >
                        {output}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              )}

              {!output && !isLoading && !error && (
                <div style={{ background: 'var(--bg-warm)', border: '1.5px dashed var(--border)', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center', color: 'var(--ink-muted)' }}>
                  <FileCheck2 size={40} style={{ opacity: 0.25, margin: '0 auto 1rem' }} />
                  <p style={{ fontSize: '0.92rem', marginBottom: '0.35rem' }}>Tu rubrica aparecera aqui</p>
                  <p style={{ fontSize: '0.82rem', opacity: 0.7 }}>Completa el formulario y hace clic en Generar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .rubrica-grid { display: grid; grid-template-columns: 380px 1fr; gap: 1.5rem; align-items: start; }
        .rubrica-output h2:first-child { margin-top: 0; }
        input:focus, textarea:focus, select:focus { border-color: #D4622A !important; outline: none; box-shadow: 0 0 0 3px rgba(212,98,42,0.1); }
        @media (max-width: 900px) { .rubrica-grid { grid-template-columns: 1fr; } }
      `}</style>
    </ToolLayout>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: 'var(--ink)',
  marginBottom: '0.45rem',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.7rem 0.9rem',
  background: 'var(--bg)',
  border: '1.5px solid var(--border)',
  borderRadius: '10px',
  fontSize: '0.9rem',
  color: 'var(--ink)',
  fontFamily: 'DM Sans, sans-serif',
  transition: 'border-color 0.15s',
  boxSizing: 'border-box',
};

const actionBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '0.45rem 1rem',
  background: 'var(--bg-warm)',
  border: '1.5px solid var(--border)',
  borderRadius: '20px',
  fontSize: '0.83rem',
  color: 'var(--ink)',
  cursor: 'pointer',
  fontFamily: 'DM Sans, sans-serif',
  fontWeight: 500,
  transition: 'border-color 0.15s',
};
