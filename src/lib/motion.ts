export const motionTokens = {
  durations: {
    micro: 0.18,
    fast: 0.28,
    normal: 0.42,
    slow: 0.6,
    cinematic: 0.9,
  },
  easings: {
    standard: [0.22, 1, 0.36, 1],
    smooth: [0.16, 1, 0.3, 1],
    spring: [0.2, 0.8, 0.2, 1],
  },
  spring: {
    stiffness: 180,
    damping: 18,
    mass: 0.8,
  },
  revealDistance: {
    sm: 16,
    md: 28,
    lg: 48,
  },
  stagger: 0.08,
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

export const slideLeft = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: motionTokens.stagger,
      delayChildren: 0.08,
    },
  },
};
