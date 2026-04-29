'use client';

import { useEffect, useState } from 'react';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      // Recargar automaticamente cuando vuelva la conexion
      window.location.href = '/';
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F0E8',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'DM Sans, system-ui, sans-serif',
      }}
    >
      {/* Logo K */}
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 20,
          backgroundColor: '#D4622A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '2rem',
          boxShadow: '0 8px 32px rgba(212, 98, 42, 0.25)',
        }}
      >
        <span
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: '#F5F0E8',
            lineHeight: 1,
            fontFamily: 'Arial Black, sans-serif',
          }}
        >
          K
        </span>
      </div>

      {/* Titulo */}
      <h1
        style={{
          fontSize: 'clamp(1.5rem, 5vw, 2rem)',
          fontWeight: 700,
          color: '#1A1208',
          marginBottom: '0.75rem',
          fontFamily: 'Fraunces, Georgia, serif',
        }}
      >
        Sin conexion a internet
      </h1>

      {/* Subtitulo */}
      <p
        style={{
          fontSize: '1rem',
          color: '#5C5040',
          maxWidth: 400,
          lineHeight: 1.6,
          marginBottom: '2rem',
        }}
      >
        Las herramientas de IA de Komuny requieren conexion para funcionar.
        Revisa tu red y vuelve a intentarlo.
      </p>

      {/* Estado de conexion */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: 999,
          backgroundColor: isOnline ? '#3A6B4A20' : '#D4622A15',
          color: isOnline ? '#3A6B4A' : '#D4622A',
          fontSize: '0.875rem',
          fontWeight: 600,
          marginBottom: '2rem',
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: isOnline ? '#3A6B4A' : '#D4622A',
            display: 'inline-block',
          }}
        />
        {isOnline ? 'Conectado — redirigiendo...' : 'Sin conexion'}
      </div>

      {/* Boton reintentar */}
      <button
        onClick={() => window.location.href = '/'}
        style={{
          backgroundColor: '#D4622A',
          color: '#F5F0E8',
          border: 'none',
          borderRadius: 12,
          padding: '0.875rem 2rem',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'DM Sans, system-ui, sans-serif',
          transition: 'opacity 0.15s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.opacity = '0.85')}
        onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
      >
        Reintentar
      </button>

      {/* Footer */}
      <p
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          fontSize: '0.75rem',
          color: '#5C5040',
          opacity: 0.6,
        }}
      >
        Komuny Edu — IA para Docentes Latinoamericanos
      </p>
    </div>
  );
}
