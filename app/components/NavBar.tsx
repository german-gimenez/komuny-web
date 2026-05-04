'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GitFork, Wrench, Menu, X, Newspaper } from 'lucide-react';

export default function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navLinks = [
    { href: '/herramientas', label: 'Herramientas', icon: <Wrench size={13} />, accent: true },
    { href: '/#glosario', label: 'Glosario', anchor: true },
    { href: '/#recursos', label: 'Recursos', anchor: true },
    { href: '/novedades', label: 'Novedades', icon: <Newspaper size={13} /> },
    { href: '/fundacion', label: 'Fundación' },
  ];

  return (
    <>
      <nav
        className="site-nav"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(245,240,232,0.97)' : 'rgba(245,240,232,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px',
          transition: 'box-shadow 0.2s, background 0.2s',
          boxShadow: scrolled ? '0 1px 16px rgba(26,18,8,0.08)' : 'none',
        }}
      >
        {/* LOGO */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', flexShrink: 0 }}>
          <img src="/favicon.jpg" alt="Komuny" style={{ width: '28px', height: '28px', borderRadius: '6px', objectFit: 'cover' }} />
          <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
            Komuny Edu
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="nav-links" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
          {navLinks.map(link => {
            const active = !link.anchor && isActive(link.href);
            if (link.accent) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.88rem',
                    color: active ? 'var(--accent)' : 'var(--accent)',
                    textDecoration: 'none',
                    padding: '0.3rem 0.7rem',
                    fontWeight: 600,
                    borderRadius: '8px',
                    background: active ? 'var(--accent-pale)' : 'transparent',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--accent-pale)'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  {link.icon} {link.label}
                </Link>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.88rem',
                  color: active ? 'var(--ink)' : 'var(--ink-muted)',
                  textDecoration: 'none',
                  padding: '0.3rem 0.7rem',
                  borderRadius: '8px',
                  fontWeight: active ? 600 : 400,
                  borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
                  transition: 'color 0.15s, background 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.background = 'var(--bg-warm)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = active ? 'var(--ink)' : 'var(--ink-muted)'; e.currentTarget.style.background = 'transparent'; }}
              >
                {link.icon && <span style={{ display: 'flex', opacity: 0.7 }}>{link.icon}</span>}
                {link.label}
              </Link>
            );
          })}

          {/* GitHub button */}
          <a
            href="https://github.com/german-gimenez/komuny"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-github"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              textDecoration: 'none',
              background: 'var(--ink)',
              color: 'var(--bg)',
              padding: '0.35rem 0.9rem',
              borderRadius: '20px',
              fontWeight: 500,
              marginLeft: '0.25rem',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            <GitFork size={14} /> <span className="nav-github-text">GitHub</span>
          </a>

          {/* Socials — desktop only */}
          <div className="nav-socials" style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginLeft: '0.25rem' }}>
            <div style={{ width: '1px', height: '18px', background: 'var(--border)' }} />
            {[
              { href: 'https://www.instagram.com/komuny.social/', label: 'IG' },
              { href: 'https://www.facebook.com/komuny.social/', label: 'FB' },
              { href: 'https://www.linkedin.com/company/komuny/', label: 'LI' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--ink-muted)',
                  textDecoration: 'none',
                  padding: '0.25rem 0.55rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  border: '1px solid var(--border)',
                  transition: 'border-color 0.15s, color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-light)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--ink-muted)'; }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* MOBILE: hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen(v => !v)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--ink)',
            padding: '0.4rem',
            borderRadius: '8px',
          }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* MOBILE MENU DRAWER */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(26,18,8,0.3)',
              zIndex: 98,
            }}
          />
          {/* Panel */}
          <div
            style={{
              position: 'fixed',
              top: '60px',
              left: 0,
              right: 0,
              zIndex: 99,
              background: 'var(--bg)',
              borderBottom: '1px solid var(--border)',
              padding: '1rem 1.5rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              boxShadow: '0 8px 32px rgba(26,18,8,0.12)',
            }}
          >
            {navLinks.map(link => {
              const active = !link.anchor && isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    color: active ? 'var(--accent)' : 'var(--ink)',
                    textDecoration: 'none',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    fontWeight: active ? 600 : 400,
                    background: active ? 'var(--accent-pale)' : 'transparent',
                  }}
                >
                  {link.icon} {link.label}
                </Link>
              );
            })}
            <div style={{ height: '1px', background: 'var(--border)', margin: '0.5rem 0' }} />
            <a
              href="https://github.com/german-gimenez/komuny"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.95rem',
                color: 'var(--ink)',
                textDecoration: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                fontWeight: 500,
              }}
            >
              <GitFork size={16} /> GitHub
            </a>
            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem', flexWrap: 'wrap' }}>
              {[
                { href: 'https://www.instagram.com/komuny.social/', label: 'Instagram' },
                { href: 'https://www.facebook.com/komuny.social/', label: 'Facebook' },
                { href: 'https://www.linkedin.com/company/komuny/', label: 'LinkedIn' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--ink-muted)',
                    textDecoration: 'none',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    border: '1px solid var(--border)',
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-hamburger { display: none !important; }
          .nav-socials { display: flex !important; }
        }
        @media (max-width: 1024px) {
          .nav-socials { display: none !important; }
          .nav-github-text { display: inline; }
        }
      `}</style>
    </>
  );
}
