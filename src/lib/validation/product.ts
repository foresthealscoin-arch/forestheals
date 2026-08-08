import { z } from 'zod';

export const ProductInputSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(120),
  description: z.string().max(5000).optional(),
  priceCents: z.number().int().nonnegative(),
  category: z.string().min(1),
  active: z.boolean(),
});

export type ProductInput = z.infer<typeof ProductInputSchema>;
