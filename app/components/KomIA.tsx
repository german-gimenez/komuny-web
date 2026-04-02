'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, isTextUIPart } from 'ai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SUGGESTIONS = [
  '¿Qué es un LLM?',
  'Herramientas gratuitas para docentes',
  '¿Cómo evitar alucinaciones?',
  'Cómo hacer un buen prompt',
];

function CodeBlock({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'relative', margin: '0.6em 0' }}>
      <pre style={{
        background: 'var(--ink)',
        color: 'var(--bg)',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        paddingRight: '5rem',
        fontSize: '0.8rem',
        overflowX: 'auto',
        lineHeight: 1.5,
        fontFamily: 'monospace',
        margin: 0,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        <code className={className}>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        title="Copiar"
        style={{
          position: 'absolute',
          top: '0.4rem',
          right: '0.4rem',
          background: copied ? '#3A6B4A' : 'rgba(255,255,255,0.15)',
          border: 'none',
          borderRadius: '5px',
          padding: '0.2rem 0.6rem',
          fontSize: '0.7rem',
          color: 'white',
          cursor: 'pointer',
          transition: 'background 0.2s',
          whiteSpace: 'nowrap',
        }}
      >
        {copied ? '✓ Copiado' : 'Copiar'}
      </button>
    </div>
  );
}

export default function KomIA() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    experimental_throttle: 50,
    onError: (error) => {
      setErrorMsg('Ocurrió un error al conectar con KomIA. Intentá de nuevo.');
      console.error('[KomIA]', error);
    },
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    setErrorMsg(null);
    sendMessage({ text });
  };

  const handleSuggestion = (text: string) => {
    if (isLoading) return;
    setInput('');
    setErrorMsg(null);
    sendMessage({ text });
  };

  const getMessageText = (msg: (typeof messages)[0]) =>
    msg.parts
      .filter(isTextUIPart)
      .map(p => p.text)
      .join('');

  return (
    <>
      {/* Trigger button — centered pill */}
      {!isOpen && (
        <div style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 200 }}>
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Abrir KomIA"
            style={{
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.7rem 1.5rem',
              borderRadius: '30px',
              boxShadow: '0 4px 24px rgba(212,98,42,0.45)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              letterSpacing: '0.01em',
            }}
          >
            <MessageCircle size={18} />
            Chatea con KomIA
          </motion.button>
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(26,18,8,0.35)',
                zIndex: 199,
              }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '380px',
                maxWidth: '100vw',
                height: '100dvh',
                background: 'var(--bg)',
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '-4px 0 32px rgba(26,18,8,0.12)',
              }}
            >
              {/* Header */}
              <div style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--bg-warm)',
                flexShrink: 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Bot size={16} color="white" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>KomIA</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>Asistente Komuny Edu</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', display: 'flex', padding: '0.25rem' }}
                  aria-label="Cerrar"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Messages */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}>
                {messages.length === 0 && (
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <Bot size={13} color="white" />
                    </div>
                    <div style={{ background: 'var(--bg-warm)', border: '1px solid var(--border)', borderRadius: '12px 12px 12px 2px', padding: '0.75rem 1rem', fontSize: '0.88rem', lineHeight: 1.6, maxWidth: '90%' }}>
                      <p style={{ margin: 0, color: 'var(--ink)' }}>
                        ¡Hola! Soy <strong>KomIA</strong>, tu asistente de Komuny Edu. 👋<br />
                        Puedo ayudarte con IA en el aula, recursos para docentes, o cualquier pregunta que tengas.
                      </p>
                    </div>
                  </div>
                )}

                {messages.map(msg => {
                  const text = getMessageText(msg);
                  if (!text && msg.role !== 'user') return null;
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={msg.id}
                      style={{
                        display: 'flex',
                        gap: '0.6rem',
                        alignItems: 'flex-start',
                        flexDirection: isUser ? 'row-reverse' : 'row',
                      }}
                    >
                      {!isUser && (
                        <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                          <Bot size={13} color="white" />
                        </div>
                      )}
                      <div style={{
                        background: isUser ? 'var(--ink)' : 'var(--bg-warm)',
                        color: isUser ? 'var(--bg)' : 'var(--ink)',
                        border: isUser ? 'none' : '1px solid var(--border)',
                        borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                        padding: '0.75rem 1rem',
                        fontSize: '0.88rem',
                        lineHeight: 1.6,
                        maxWidth: '85%',
                      }}>
                        {isUser ? (
                          <span style={{ whiteSpace: 'pre-wrap' }}>{text}</span>
                        ) : (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ children }) => (
                                <p style={{ margin: '0 0 0.5em', lineHeight: 1.6 }}>{children}</p>
                              ),
                              a: ({ href, children }) => (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: 'var(--accent)', textDecoration: 'underline' }}
                                >
                                  {children}
                                </a>
                              ),
                              code({ className, children, ...props }) {
                                const isInline = !className && !String(children).includes('\n');
                                if (isInline) {
                                  return (
                                    <code
                                      style={{
                                        background: 'var(--bg)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '4px',
                                        padding: '0.1em 0.35em',
                                        fontSize: '0.85em',
                                        fontFamily: 'monospace',
                                      }}
                                      {...props}
                                    >
                                      {children}
                                    </code>
                                  );
                                }
                                return (
                                  <CodeBlock
                                    code={String(children).replace(/\n$/, '')}
                                    className={className}
                                  />
                                );
                              },
                              ul: ({ children }) => (
                                <ul style={{ paddingLeft: '1.2em', margin: '0.4em 0' }}>{children}</ul>
                              ),
                              ol: ({ children }) => (
                                <ol style={{ paddingLeft: '1.2em', margin: '0.4em 0' }}>{children}</ol>
                              ),
                              li: ({ children }) => (
                                <li style={{ marginBottom: '0.2em' }}>{children}</li>
                              ),
                              strong: ({ children }) => (
                                <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>{children}</strong>
                              ),
                              hr: () => null,
                            }}
                          >
                            {text}
                          </ReactMarkdown>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isLoading && (
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <Bot size={13} color="white" />
                    </div>
                    <div style={{ background: 'var(--bg-warm)', border: '1px solid var(--border)', borderRadius: '12px 12px 12px 2px', padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        {[0, 1, 2].map(i => (
                          <motion.div
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                            style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--ink-muted)' }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Error banner */}
              {errorMsg && (
                <div style={{
                  padding: '0.5rem 1rem',
                  background: '#FBE9DF',
                  borderTop: '1px solid var(--border)',
                  fontSize: '0.8rem',
                  color: 'var(--accent)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexShrink: 0,
                }}>
                  ⚠️ {errorMsg}
                  <button
                    onClick={() => setErrorMsg(null)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontSize: '1rem', padding: '0 0.2rem', lineHeight: 1 }}
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Suggestion chips — always visible */}
              <div
                className="kom-chips"
                style={{
                  borderTop: '1px solid var(--border)',
                  padding: '0.5rem 1rem',
                  display: 'flex',
                  gap: '0.5rem',
                  overflowX: 'auto',
                  flexShrink: 0,
                  background: 'var(--bg)',
                  scrollbarWidth: 'none',
                }}
              >
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    disabled={isLoading}
                    style={{
                      flexShrink: 0,
                      background: 'transparent',
                      border: '1px solid var(--border)',
                      borderRadius: '20px',
                      padding: '0.3rem 0.8rem',
                      fontSize: '0.78rem',
                      color: 'var(--ink-muted)',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      whiteSpace: 'nowrap',
                      opacity: isLoading ? 0.5 : 1,
                      transition: 'border-color 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => {
                      if (!isLoading) {
                        e.currentTarget.style.borderColor = 'var(--accent)';
                        e.currentTarget.style.color = 'var(--accent)';
                      }
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.color = 'var(--ink-muted)';
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div style={{ borderTop: '1px solid var(--border)', padding: '0.75rem 1rem', flexShrink: 0, background: 'var(--bg)' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Preguntame algo..."
                    disabled={isLoading}
                    style={{
                      flex: 1,
                      padding: '0.6rem 0.9rem',
                      background: 'var(--bg-warm)',
                      border: '1.5px solid var(--border)',
                      borderRadius: '20px',
                      fontSize: '0.88rem',
                      color: 'var(--ink)',
                      outline: 'none',
                      fontFamily: 'DM Sans, sans-serif',
                      opacity: isLoading ? 0.6 : 1,
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: input.trim() && !isLoading ? 'var(--accent)' : 'var(--border)',
                      border: 'none',
                      cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'background 0.15s',
                    }}
                  >
                    <Send size={15} color="white" />
                  </button>
                </form>
              </div>

              {/* Powered by Napsix.AI */}
              <div style={{
                borderTop: '1px solid var(--border)',
                padding: '0.4rem 1rem',
                textAlign: 'center',
                flexShrink: 0,
                background: 'var(--bg-warm)',
              }}>
                <a
                  href="https://napsix.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--ink-muted)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    opacity: 0.75,
                  }}
                >
                  ⚡ Powered by <strong style={{ color: 'var(--ink)' }}>Napsix.AI</strong>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
