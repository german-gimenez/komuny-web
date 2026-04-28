'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Sparkles, Copy, Check, Download, RefreshCw, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ToolLayout from '../../components/ToolLayout';

const NIVELES = ['Inicial / Preescolar', 'Primaria (1-6)', 'Secundaria (7-9)', 'Bachillerato/Polimodal', 'Universitario', 'Formacion docente', 'Educacion de adultos'];
const MODALIDADES = ['Presencial', 'Virtual / Online', 'Hibrida'];
const DURACIONES = ['30 minutos', '45 minutos', '60 minutos', '80 minutos', '90 minutos', '2 horas', '3 horas'];

export default function PlanificadorPage() {
  const [form, setForm] = useState({
    tema: '',
    materia: '',
    nivel: '',
    duracion: '',
    modalidad: '',
    objetivos: '',
    recursos: '',
  });
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const isValid = form.tema.trim() && form.materia.trim() && form.nivel && form.duracion && form.modalidad;

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
        body: JSON.stringify({ herramienta: 'planificador', datos: form }),
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
      setError('Ocurrio un error al generar la planificacion. Intentalo de nuevo.');
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
    a.download = `planificacion-${form.tema.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout>
      <section style={{ padding: '2.5rem 2rem 5rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#E0EDF7', color: '#1A5C9A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CalendarDays size={24} />
              </div>
              <div>
                <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '0.25rem' }}>
                  Planificador de Clases
                </h1>
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.92rem' }}>
                  Planificaciones didacticas completas con IA
                </p>
              </div>
            </div>
          </motion.div>

          <div className="planif-grid">
            {/* FORM */}
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div style={{ background: 'var(--bg-warm)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.25rem' }}>Datos de la clase</h2>

                <div>
                  <label style={labelStyle}>Tema de la clase *</label>
                  <input value={form.tema} onChange={e => setForm(f => ({ ...f, tema: e.target.value }))} placeholder="ej: La Revolucion Francesa, Ecuaciones de 2° grado..." style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Materia / Area *</label>
                  <input value={form.materia} onChange={e => setForm(f => ({ ...f, materia: e.target.value }))} placeholder="ej: Historia, Matematica, Biologia..." style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Nivel educativo *</label>
                  <select value={form.nivel} onChange={e => setForm(f => ({ ...f, nivel: e.target.value }))} style={inputStyle}>
                    <option value="">Selecciona el nivel</option>
                    {NIVELES.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Duracion *</label>
                    <select value={form.duracion} onChange={e => setForm(f => ({ ...f, duracion: e.target.value }))} style={inputStyle}>
                      <option value="">Selecciona</option>
                      {DURACIONES.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Modalidad *</label>
                    <select value={form.modalidad} onChange={e => setForm(f => ({ ...f, modalidad: e.target.value }))} style={inputStyle}>
                      <option value="">Selecciona</option>
                      {MODALIDADES.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Objetivos especificos <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>(opcional)</span></label>
                  <textarea value={form.objetivos} onChange={e => setForm(f => ({ ...f, objetivos: e.target.value }))} placeholder="¿Que queres que los alumnos logren al finalizar la clase?" rows={3} style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} />
                </div>

                <div>
                  <label style={labelStyle}>Recursos disponibles <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>(opcional)</span></label>
                  <input value={form.recursos} onChange={e => setForm(f => ({ ...f, recursos: e.target.value }))} placeholder="ej: proyector, computadoras, libros de texto..." style={inputStyle} />
                </div>

                <button
                  type="submit"
                  disabled={!isValid || isLoading}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    padding: '0.85rem 1.5rem',
                    background: isValid && !isLoading ? '#1A5C9A' : 'var(--border)',
                    color: 'white', border: 'none', borderRadius: '30px',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 600,
                    cursor: isValid && !isLoading ? 'pointer' : 'not-allowed',
                    transition: 'background 0.15s', marginTop: '0.5rem',
                  }}
                >
                  {isLoading ? <><RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Planificando...</> : <><Sparkles size={16} /> Generar Planificacion</>}
                </button>

                {!isValid && <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><AlertCircle size={13} /> Completá los campos obligatorios (*).</p>}
              </div>
            </motion.form>

            {/* OUTPUT */}
            <div>
              {error && (
                <div style={{ background: '#E0EDF7', border: '1px solid #1A5C9A40', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1rem', color: '#1A5C9A', fontSize: '0.88rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <AlertCircle size={15} style={{ flexShrink: 0, marginTop: '0.1rem' }} /> {error}
                </div>
              )}

              {(output || isLoading) && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  {output && !isLoading && (
                    <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <button onClick={handleCopy} style={actionBtnStyle}>
                        {copied ? <><Check size={14} /> Copiado!</> : <><Copy size={14} /> Copiar</>}
                      </button>
                      <button onClick={handleDownload} style={actionBtnStyle}><Download size={14} /> Descargar .txt</button>
                      <button onClick={() => { setOutput(''); setError(''); }} style={{ ...actionBtnStyle, marginLeft: 'auto' }}><RefreshCw size={14} /> Nueva planificacion</button>
                    </div>
                  )}

                  <div style={{ background: 'var(--bg-warm)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '1.75rem', minHeight: '200px' }}>
                    {isLoading && !output && (
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', color: 'var(--ink-muted)', fontSize: '0.9rem' }}>
                        {[0, 1, 2].map(i => <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--ink-muted)' }} />)}
                        <span style={{ marginLeft: '0.25rem' }}>Generando planificacion...</span>
                      </div>
                    )}
                    <div ref={outputRef}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents('#1A5C9A', '#E0EDF7')}>
                        {output}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              )}

              {!output && !isLoading && !error && (
                <div style={{ background: 'var(--bg-warm)', border: '1.5px dashed var(--border)', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center', color: 'var(--ink-muted)' }}>
                  <CalendarDays size={40} style={{ opacity: 0.25, margin: '0 auto 1rem' }} />
                  <p style={{ fontSize: '0.92rem', marginBottom: '0.35rem' }}>Tu planificacion aparecera aqui</p>
                  <p style={{ fontSize: '0.82rem', opacity: 0.7 }}>Completa el formulario y hace clic en Generar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .planif-grid { display: grid; grid-template-columns: 380px 1fr; gap: 1.5rem; align-items: start; }
        input:focus, textarea:focus, select:focus { border-color: #1A5C9A !important; outline: none; box-shadow: 0 0 0 3px rgba(26,92,154,0.1); }
        @media (max-width: 900px) { .planif-grid { grid-template-columns: 1fr; } }
      `}</style>
    </ToolLayout>
  );
}

function markdownComponents(color: string, bg: string) {
  return {
    h2: ({ children }: { children?: React.ReactNode }) => <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', margin: '1.5rem 0 0.75rem', borderBottom: `2px solid ${bg}`, paddingBottom: '0.4rem' }}>{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '0.98rem', fontWeight: 700, color, margin: '1.25rem 0 0.5rem' }}>{children}</h3>,
    p: ({ children }: { children?: React.ReactNode }) => <p style={{ color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.65, margin: '0.5rem 0' }}>{children}</p>,
    strong: ({ children }: { children?: React.ReactNode }) => <strong style={{ fontWeight: 700, color: 'var(--ink)' }}>{children}</strong>,
    ul: ({ children }: { children?: React.ReactNode }) => <ul style={{ paddingLeft: '1.4em', margin: '0.5rem 0' }}>{children}</ul>,
    ol: ({ children }: { children?: React.ReactNode }) => <ol style={{ paddingLeft: '1.4em', margin: '0.5rem 0' }}>{children}</ol>,
    li: ({ children }: { children?: React.ReactNode }) => <li style={{ color: 'var(--ink)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '0.25rem' }}>{children}</li>,
    table: ({ children }: { children?: React.ReactNode }) => <div style={{ overflowX: 'auto', margin: '1rem 0' }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>{children}</table></div>,
    thead: ({ children }: { children?: React.ReactNode }) => <thead style={{ background: color, color: 'white' }}>{children}</thead>,
    th: ({ children }: { children?: React.ReactNode }) => <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontWeight: 600, fontSize: '0.82rem' }}>{children}</th>,
    td: ({ children }: { children?: React.ReactNode }) => <td style={{ padding: '0.55rem 0.75rem', borderBottom: '1px solid var(--border)', color: 'var(--ink)', fontSize: '0.83rem', verticalAlign: 'top' }}>{children}</td>,
    blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote style={{ background: bg, borderLeft: `3px solid ${color}`, padding: '0.75rem 1rem', borderRadius: '0 8px 8px 0', margin: '0.75rem 0' }}>{children}</blockquote>,
  };
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.45rem' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.7rem 0.9rem', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', color: 'var(--ink)', fontFamily: 'DM Sans, sans-serif', transition: 'border-color 0.15s', boxSizing: 'border-box' };
const actionBtnStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', background: 'var(--bg-warm)', border: '1.5px solid var(--border)', borderRadius: '20px', fontSize: '0.83rem', color: 'var(--ink)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, transition: 'border-color 0.15s' };
