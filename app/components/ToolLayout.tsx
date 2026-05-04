'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import KomIA from './KomIA';
import NavBar from './NavBar';
import { ScrollProgressBar, BackToTop } from './ScrollProgress';
import SiteFooter from './SiteFooter';

interface ToolLayoutProps {
  children: React.ReactNode;
  backLabel?: string;
  backHref?: string;
}

export default function ToolLayout({
  children,
  backLabel = 'Herramientas',
  backHref = '/herramientas',
}: ToolLayoutProps) {
  return (
    <main>
      <NavBar />
      <ScrollProgressBar />

      {/* BACK LINK */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '1.25rem 2rem 0' }}>
        <Link
          href={backHref}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            color: 'var(--ink-muted)',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={14} /> {backLabel}
        </Link>
      </div>

      {/* PAGE CONTENT */}
      {children}

      <SiteFooter />
      <KomIA />
      <BackToTop />

      <style>{`
        html, body { overflow-x: hidden; max-width: 100vw; }
      `}</style>
    </main>
  );
}
