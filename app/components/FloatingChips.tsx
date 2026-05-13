'use client';

/**
 * FloatingChips — burbujas animadas que flotan alrededor de un elemento
 *
 * Usado para resaltar features sobre el screenshot del Chat. Cada chip
 * aparece con stagger, tiene loop infinito de float + pulse muy sutil.
 *
 * Props:
 *  - chips: array de { label, icon, color, position }
 *  - position: { top, right, bottom, left } en strings (porcentajes o px)
 *
 * El wrapper padre debe tener `position: relative` para que los chips
 * se posicionen correctamente.
 */

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export type Chip = {
  label: string;
  icon?: ReactNode;
  color?: string;
  bg?: string;
  position: { top?: string; right?: string; bottom?: string; left?: string };
  delay?: number;
};

export default function FloatingChips({ chips }: { chips: Chip[] }) {
  return (
    <>
      {chips.map((chip, i) => {
        const color = chip.color || 'var(--accent)';
        const bg = chip.bg || 'var(--bg)';
        const delay = chip.delay ?? i * 0.15;

        return (
          <motion.div
            key={chip.label + i}
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.55,
              delay: 0.4 + delay,
              type: 'spring',
              stiffness: 200,
              damping: 18,
            }}
            style={{
              position: 'absolute',
              ...chip.position,
              zIndex: 5,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              animate={{
                y: [0, -6, 0, 4, 0],
              }}
              transition={{
                duration: 5 + i * 0.7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: delay,
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: bg,
                color: color,
                border: `1.5px solid ${color}40`,
                padding: '0.4rem 0.85rem',
                borderRadius: '30px',
                fontSize: '0.78rem',
                fontWeight: 600,
                boxShadow:
                  '0 8px 24px -6px rgba(26,18,8,0.18), 0 2px 6px rgba(26,18,8,0.06)',
                whiteSpace: 'nowrap',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {chip.icon && (
                <span style={{ display: 'flex', color }}>{chip.icon}</span>
              )}
              {chip.label}
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}
