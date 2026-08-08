'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type MotionProps,
} from 'framer-motion';
import { type PropsWithChildren, useCallback } from 'react';
import { motionTokens } from '@/lib/motion';

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}> & MotionProps;

export function MotionReveal({
  children,
  className,
  delay = 0,
  y = 24,
  amount = 0.2,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: motionTokens.durations.normal,
        delay,
        ease: motionTokens.easings.standard,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type MagneticButtonProps = PropsWithChildren<{
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}>;

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = 'primary',
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18), rgba(18,61,42,0.08) 40%, rgba(17,24,28,0.08) 100%)`;

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      if (reduceMotion) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = (event.clientX - centerX) / 14;
      const offsetY = (event.clientY - centerY) / 14;

      x.set(offsetX);
      y.set(offsetY);
      rotateX.set(offsetY * -0.7);
      rotateY.set(offsetX * 0.7);
    },
    [reduceMotion, x, y, rotateX, rotateY],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  }, [x, y, rotateX, rotateY]);

  const common = {
    className,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    onMouseEnter: reset,
    onMouseDown: reset,
    whileHover: reduceMotion ? undefined : { scale: 1.02 },
    whileTap: reduceMotion ? undefined : { scale: 0.99 },
    style: {
      x,
      y,
      rotateX,
      rotateY,
      background,
      transformPerspective: 900,
    },
  };

  if (href) {
    return (
      <motion.a href={href} {...common}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} {...common}>
      {children}
    </motion.button>
  );
}
