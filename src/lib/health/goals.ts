export const healthGoals = [
  'skin',
  'hair',
  'nails',
  'gut-health',
  'hydration',
  'immunity',
  'energy',
  'sleep',
  'stress',
  'focus',
  'general-wellness',
] as const;

export type HealthGoal = (typeof healthGoals)[number];
