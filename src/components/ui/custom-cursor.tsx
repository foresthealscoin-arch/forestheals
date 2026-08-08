'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.3 });
  const ringSpringX = useSpring(ringX, { stiffness: 200, damping: 22, mass: 0.4 });
  const ringSpringY = useSpring(ringY, { stiffness: 200, damping: 22, mass: 0.4 });

  useEffect(() => {
    setIsMounted(true);

    if (reduceMotion || window.innerWidth < 768) return;

    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      ringX.set(event.clientX);
      ringY.set(event.clientY);
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [reduceMotion, ringX, ringY, x, y]);

  if (!isMounted || reduceMotion || typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-3 w-3 rounded-full bg-[var(--charcoal)] mix-blend-multiply md:block"
        style={{ x: springX, y: springY }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-10 w-10 rounded-full border border-[var(--slate)]/30 bg-[var(--charcoal)]/5 md:block"
        style={{ x: ringSpringX, y: ringSpringY }}
      />
    </>
  );
}
