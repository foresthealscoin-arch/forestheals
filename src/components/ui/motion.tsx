'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type HTMLMotionProps,
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

export function FadeIn({
  children,
  className,
  delay = 0,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={reduceMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: motionTokens.durations.fast, delay, ease: motionTokens.easings.standard }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({
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

export function Stagger({
  children,
  className,
  delay = 0,
  ...props
}: PropsWithChildren<{ className?: string; delay?: number } & MotionProps>) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={reduceMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ delay, duration: motionTokens.durations.normal, staggerChildren: motionTokens.stagger }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  className,
  delay = 0,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: motionTokens.durations.normal, delay, ease: motionTokens.easings.standard }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function PageTransition({ children }: PropsWithChildren) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: motionTokens.easings.standard }}
    >
      {children}
    </motion.div>
  );
}

type MagneticButtonProps = PropsWithChildren<{
  className?: string;
  href?: string;
  onClick?: () => void;
} & HTMLMotionProps<'button'> & HTMLMotionProps<'a'>>;

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  ...props
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2), rgba(17,24,28,0.06) 35%, rgba(17,24,28,0.02) 100%)`;

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
      rotateX.set(offsetY * -0.8);
      rotateY.set(offsetX * 0.8);
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
    ...props,
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
