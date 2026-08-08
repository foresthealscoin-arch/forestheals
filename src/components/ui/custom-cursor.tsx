'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 280, damping: 20, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 280, damping: 20, mass: 0.25 });

  useEffect(() => {
    setIsMounted(true);

    if (reduceMotion || window.innerWidth < 768) return;

    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [reduceMotion, x, y]);

  if (!isMounted || reduceMotion || (typeof window !== 'undefined' && window.innerWidth < 768)) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: springX, y: springY }}
      >
        <div className="relative flex h-12 w-12 items-center justify-center">
          <motion.div
            className="absolute h-10 w-10 rounded-full border border-[var(--charcoal)]/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
          >
            <span className="absolute -left-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[var(--charcoal)]" />
          </motion.div>

          <motion.div
            className="absolute h-16 w-16 rounded-full border border-[var(--slate)]/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
          >
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--slate)]" />
          </motion.div>

          <span className="absolute h-3.5 w-3.5 rounded-full bg-[var(--cream)] shadow-[0_0_0_2px_rgba(44,41,48,0.1)] ring-2 ring-[var(--charcoal)]/80" />
        </div>
      </motion.div>
    </div>
  );
}
