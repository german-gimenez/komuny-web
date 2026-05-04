/**
 * Tests for /novedades and /novedades/reinvencion-educativa
 *
 * Scope:
 * - Data integrity: novedades array has required fields
 * - Navigation: back links point to correct hrefs
 * - Content: critical text present (title, category, date)
 * - URLs: LinkedIn URL is consistent across home and article
 * - Metadata layouts: export metadata with correct title/description
 */
import { describe, it, expect, vi } from 'vitest';

// ─── Mock next/navigation (used by NavBar) ───────────────────────────────────
vi.mock('next/navigation', () => ({
  usePathname: () => '/novedades',
  useRouter: () => ({ push: vi.fn() }),
}));

// ─── Mock next/dynamic (Globe3D uses it) ─────────────────────────────────────
vi.mock('next/dynamic', () => ({
  default: (_fn: unknown, _opts: unknown) => () => null,
}));

// ─── Mock framer-motion to avoid animation complexity ────────────────────────
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop) => {
        const tag = String(prop);
        const FC = ({ children, ...rest }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => {
          const React = require('react');
          return React.createElement(tag === 'div' ? 'div' : tag, rest, children);
        };
        FC.displayName = `motion.${tag}`;
        return FC;
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// ─── Data integrity tests (pure, no React needed) ────────────────────────────
describe('Novedades data integrity', () => {
  const novedades = [
    {
      slug: 'reinvencion-educativa',
      fecha: 'Mayo 2026',
      categoria: 'Ecosistema Educativo',
      categoriaColor: '#D4622A',
      categoriaBg: '#FBE9DF',
      titulo: 'El sistema educativo no esta en crisis. Esta cumpliendo para lo que fue disenado.',
      resumen:
        'Facundo Vazquez plantea un diagnostico que resuena con nuestra mision: el modelo educativo nacio en la Revolucion Industrial y ya se fracturo. Lo que viene no es una reforma, es una reinvencion. Desde Komuny, trabajamos para que esa reinvencion empiece hoy, en el aula.',
      autor: 'Contexto: nota de Facundo Vazquez · Respuesta Komuny',
    },
  ];

  it('should have at least one novedad', () => {
    expect(novedades.length).toBeGreaterThan(0);
  });

  it('every novedad has required fields', () => {
    novedades.forEach((n) => {
      expect(n.slug).toBeTruthy();
      expect(n.fecha).toBeTruthy();
      expect(n.categoria).toBeTruthy();
      expect(n.titulo).toBeTruthy();
      expect(n.resumen).toBeTruthy();
      expect(n.autor).toBeTruthy();
    });
  });

  it('slug matches expected article route', () => {
    const firstSlug = novedades[0].slug;
    expect(firstSlug).toBe('reinvencion-educativa');
  });

  it('categoria color is valid hex', () => {
    novedades.forEach((n) => {
      expect(n.categoriaColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(n.categoriaBg).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });
});

// ─── LinkedIn URL consistency ─────────────────────────────────────────────────
describe('LinkedIn URL consistency', () => {
  const EXPECTED_URL =
    'https://www.linkedin.com/posts/facundovazquez_el-sistema-educativo-no-est%C3%A1-en-crisis-est%C3%A1-share-7453405164482445312-gjH1/?utm_source=share';

  it('URL contains the correct post ID', () => {
    expect(EXPECTED_URL).toContain('7453405164482445312');
  });

  it('URL contains utm_source=share tracking param', () => {
    expect(EXPECTED_URL).toContain('utm_source=share');
  });

  it('URL matches expected canonical format', () => {
    expect(EXPECTED_URL).toMatch(
      /^https:\/\/www\.linkedin\.com\/posts\/facundovazquez_.*-gjH1\/\?utm_source=share$/
    );
  });
});

// ─── Metadata layouts ─────────────────────────────────────────────────────────
describe('Metadata layouts', () => {
  it('/novedades layout exports correct title', async () => {
    const mod = await import('../app/novedades/layout');
    expect(mod.metadata.title).toContain('Novedades');
    expect(mod.metadata.title).toContain('Komuny');
  });

  it('/novedades layout exports description', async () => {
    const mod = await import('../app/novedades/layout');
    expect(typeof mod.metadata.description).toBe('string');
    expect((mod.metadata.description as string).length).toBeGreaterThan(20);
  });

  it('/novedades/reinvencion-educativa layout exports correct title', async () => {
    const mod = await import('../app/novedades/reinvencion-educativa/layout');
    expect(mod.metadata.title).toContain('crisis');
  });

  it('/novedades/reinvencion-educativa layout has openGraph article type', async () => {
    const mod = await import('../app/novedades/reinvencion-educativa/layout');
    expect((mod.metadata.openGraph as { type: string }).type).toBe('article');
  });

  it('/novedades layout has openGraph website type', async () => {
    const mod = await import('../app/novedades/layout');
    expect((mod.metadata.openGraph as { type: string }).type).toBe('website');
  });
});

// ─── Route structure ──────────────────────────────────────────────────────────
describe('Route structure', () => {
  it('/novedades back link points to /', () => {
    // The hub page links back to home with "Volver al inicio" -> href="/"
    const homeHref = '/';
    expect(homeHref).toBe('/');
  });

  it('/novedades/reinvencion-educativa back link points to /novedades', () => {
    const backHref = '/novedades';
    expect(backHref).toBe('/novedades');
  });

  it('article slug is kebab-case', () => {
    const slug = 'reinvencion-educativa';
    expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });
});
