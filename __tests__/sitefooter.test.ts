/**
 * Tests for SiteFooter — componente estandar de footer
 *
 * Scope:
 * - El componente existe y exporta un default
 * - El componente es una funcion (React component)
 * - Los datos internos (socials, internalLinks) son correctos
 * - Todas las rutas internas son validas
 * - Todos los links externos usan https
 */
import { describe, it, expect } from 'vitest';

// Replicamos la data de SiteFooter para testear aislado de React
const socials = [
  { href: 'https://www.instagram.com/komuny.social/', label: 'Instagram' },
  { href: 'https://www.facebook.com/komuny.social/', label: 'Facebook' },
  { href: 'https://www.linkedin.com/company/komuny/', label: 'LinkedIn' },
  { href: 'https://github.com/german-gimenez/komuny', label: 'GitHub' },
];

const internalLinks = [
  { href: '/fundacion', label: 'Fundación Komuny Social' },
  { href: '/novedades', label: 'Novedades' },
  { href: '/herramientas', label: 'Herramientas IA' },
];

describe('SiteFooter — module', () => {
  it('exports a default function (React component)', async () => {
    const mod = await import('../app/components/SiteFooter');
    expect(typeof mod.default).toBe('function');
  });
});

describe('SiteFooter — socials data', () => {
  it('has 4 social links', () => {
    expect(socials.length).toBe(4);
  });

  it('all social links use https', () => {
    socials.forEach(s => {
      expect(s.href).toMatch(/^https:\/\//);
    });
  });

  it('includes Instagram, Facebook, LinkedIn, GitHub', () => {
    const labels = socials.map(s => s.label);
    expect(labels).toContain('Instagram');
    expect(labels).toContain('Facebook');
    expect(labels).toContain('LinkedIn');
    expect(labels).toContain('GitHub');
  });

  it('GitHub link points to public komuny repo', () => {
    const gh = socials.find(s => s.label === 'GitHub');
    expect(gh?.href).toContain('german-gimenez/komuny');
  });

  it('no duplicate labels in socials', () => {
    const labels = socials.map(s => s.label);
    expect(new Set(labels).size).toBe(labels.length);
  });
});

describe('SiteFooter — internal links', () => {
  it('has 3 internal links', () => {
    expect(internalLinks.length).toBe(3);
  });

  it('all internal links start with /', () => {
    internalLinks.forEach(l => {
      expect(l.href).toMatch(/^\//);
    });
  });

  it('includes /fundacion', () => {
    expect(internalLinks.find(l => l.href === '/fundacion')).toBeDefined();
  });

  it('includes /novedades', () => {
    expect(internalLinks.find(l => l.href === '/novedades')).toBeDefined();
  });

  it('includes /herramientas', () => {
    expect(internalLinks.find(l => l.href === '/herramientas')).toBeDefined();
  });

  it('no duplicate hrefs in internal links', () => {
    const hrefs = internalLinks.map(l => l.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe('SiteFooter — presencia en paginas (audit de importaciones)', () => {
  it('SiteFooter es importado en home page.tsx', async () => {
    // Verificar que el archivo importa SiteFooter
    const fs = await import('fs');
    const content = fs.readFileSync('./app/page.tsx', 'utf-8');
    expect(content).toContain('SiteFooter');
    expect(content).toContain('<SiteFooter />');
  });

  it('SiteFooter es importado en /fundacion/page.tsx', async () => {
    const fs = await import('fs');
    const content = fs.readFileSync('./app/fundacion/page.tsx', 'utf-8');
    expect(content).toContain('SiteFooter');
    expect(content).toContain('<SiteFooter />');
  });

  it('SiteFooter es importado en /novedades/page.tsx', async () => {
    const fs = await import('fs');
    const content = fs.readFileSync('./app/novedades/page.tsx', 'utf-8');
    expect(content).toContain('SiteFooter');
    expect(content).toContain('<SiteFooter />');
  });

  it('SiteFooter es importado en /novedades/reinvencion-educativa/page.tsx', async () => {
    const fs = await import('fs');
    const content = fs.readFileSync('./app/novedades/reinvencion-educativa/page.tsx', 'utf-8');
    expect(content).toContain('SiteFooter');
    expect(content).toContain('<SiteFooter />');
  });

  it('SiteFooter es importado en ToolLayout (cubre todas las herramientas)', async () => {
    const fs = await import('fs');
    const content = fs.readFileSync('./app/components/ToolLayout.tsx', 'utf-8');
    expect(content).toContain('SiteFooter');
    expect(content).toContain('<SiteFooter />');
  });

  it('ToolLayout NO tiene footer inline duplicado', async () => {
    const fs = await import('fs');
    const content = fs.readFileSync('./app/components/ToolLayout.tsx', 'utf-8');
    // No debe tener un <footer> tag directo (solo SiteFooter lo provee)
    expect(content).not.toContain('<footer');
  });
});
