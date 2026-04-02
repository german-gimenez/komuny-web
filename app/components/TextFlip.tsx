'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = ['docentes', 'educadores', 'profesores', 'entusiastas'];

export default function TextFlip() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI(n => (n + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      style={{
        display: 'inline-block',
        background: 'var(--accent)',
        color: 'white',
        padding: '0.04em 0.22em',
        borderRadius: '6px',
        overflow: 'hidden',
        verticalAlign: 'bottom',
        lineHeight: 'inherit',
        minWidth: 0,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[i]}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
          style={{ display: 'inline-block' }}
        >
          {WORDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
