'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState('');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.3 });

  useEffect(() => {
    if (reduceMotion || typeof window === 'undefined') return;

    const media = window.matchMedia('(pointer: coarse)');
    if (media.matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const handlePointerOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const dataLabel = target.closest('[data-cursor-label]')?.getAttribute('data-cursor-label');
      const isProduct = !!target.closest('[data-cursor="product"]');
      const isAdd = !!target.closest('[data-cursor="add"]');

      setIsHovering(Boolean(dataLabel || isProduct || isAdd || target.closest('a, button, input, textarea, select')));
      setLabel(dataLabel ?? (isProduct ? 'VIEW' : isAdd ? 'ADD' : ''));
    };

    const handlePointerLeave = () => {
      setIsHovering(false);
      setLabel('');
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerover', handlePointerOver, true);
    document.addEventListener('pointerleave', handlePointerLeave, true);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver, true);
      document.removeEventListener('pointerleave', handlePointerLeave, true);
    };
  }, [reduceMotion, x, y]);

  if (reduceMotion || typeof window === 'undefined' || window.innerWidth < 768) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: springX, y: springY }}
        animate={{ scale: isHovering ? 1.1 : 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22, mass: 0.3 }}
      >
        <div className="relative flex h-14 w-14 items-center justify-center">
          <motion.div
            aria-hidden="true"
            className="absolute h-8 w-8 rounded-full border border-[var(--charcoal)]/30"
            animate={{ rotate: 360, scale: isHovering ? 1.25 : 1 }}
            transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
          />

          <motion.div
            aria-hidden="true"
            className="absolute h-12 w-12 rounded-full border border-[var(--slate)]/20"
            animate={{ rotate: -360, scale: isHovering ? 1.18 : 1 }}
            transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
          />

          <motion.span
            aria-hidden="true"
            className="absolute h-3.5 w-3.5 rounded-full bg-[var(--charcoal)] shadow-[0_0_0_2px_rgba(255,255,255,0.7)]"
            animate={{ scale: isHovering ? 0.75 : 1 }}
          />

          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -bottom-7 left-1/2 -translate-x-1/2 rounded-full bg-[var(--charcoal)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--cream)]"
            >
              {label}
            </motion.span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
