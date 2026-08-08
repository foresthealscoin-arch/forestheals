import { z } from 'zod';

export const AIRecommendationSchema = z.object({
  summary: z.string(),
  recommendations: z.array(
    z.object({
      productId: z.string(),
      reason: z.string(),
      evidenceIds: z.array(z.string()),
    }),
  ),
  cautions: z.array(z.string()),
  disclaimer: z.string(),
});

export type AIRecommendation = z.infer<typeof AIRecommendationSchema>;
