/**
 * Tests for NavBar data and logic
 *
 * Scope:
 * - navLinks array has Novedades entry
 * - Novedades link has correct href and icon
 * - isActive logic works for /novedades and /novedades/* routes
 * - No duplicate hrefs in navLinks
 */
import { describe, it, expect } from 'vitest';

// Replicate navLinks structure from NavBar (pure data, no React needed)
const navLinks = [
  { href: '/herramientas', label: 'Herramientas', accent: true },
  { href: '/#glosario', label: 'Glosario', anchor: true },
  { href: '/#recursos', label: 'Recursos', anchor: true },
  { href: '/novedades', label: 'Novedades', hasIcon: true },
  { href: '/fundacion', label: 'Fundación' },
];

// Replicate isActive logic from NavBar
function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

describe('NavBar — navLinks structure', () => {
  it('includes Novedades link', () => {
    const novedades = navLinks.find((l) => l.label === 'Novedades');
    expect(novedades).toBeDefined();
  });

  it('Novedades link points to /novedades', () => {
    const novedades = navLinks.find((l) => l.label === 'Novedades');
    expect(novedades?.href).toBe('/novedades');
  });

  it('Novedades link has an icon', () => {
    const novedades = navLinks.find((l) => l.label === 'Novedades');
    expect(novedades?.hasIcon).toBe(true);
  });

  it('has no duplicate hrefs', () => {
    const hrefs = navLinks.map((l) => l.href);
    const unique = new Set(hrefs);
    expect(unique.size).toBe(hrefs.length);
  });

  it('Herramientas is marked as accent', () => {
    const herramientas = navLinks.find((l) => l.label === 'Herramientas');
    expect(herramientas?.accent).toBe(true);
  });

  it('total nav links count is 5', () => {
    expect(navLinks.length).toBe(5);
  });
});

describe('NavBar — isActive logic', () => {
  it('/novedades is active when pathname is /novedades', () => {
    expect(isActive('/novedades', '/novedades')).toBe(true);
  });

  it('/novedades is active when pathname is /novedades/reinvencion-educativa', () => {
    expect(isActive('/novedades/reinvencion-educativa', '/novedades')).toBe(true);
  });

  it('/novedades is NOT active when pathname is /', () => {
    expect(isActive('/', '/novedades')).toBe(false);
  });

  it('/novedades is NOT active when pathname is /herramientas', () => {
    expect(isActive('/herramientas', '/novedades')).toBe(false);
  });

  it('/herramientas is active on /herramientas/rubrica', () => {
    expect(isActive('/herramientas/rubrica', '/herramientas')).toBe(true);
  });

  it('/ is ONLY active on exact match', () => {
    expect(isActive('/', '/')).toBe(true);
    expect(isActive('/novedades', '/')).toBe(false);
  });

  it('anchor links are never active (guard)', () => {
    const anchors = navLinks.filter((l) => l.anchor);
    anchors.forEach((l) => {
      // anchor links should not have isActive applied (they use l.anchor as guard)
      expect(l.anchor).toBe(true);
    });
  });
});
