import type { HealthGoal } from '@/lib/health/goals';

export type Recommendation = {
  productId: string;
  reason: string;
  matchedGoals: HealthGoal[];
};

export function recommendProducts(
  goals: HealthGoal[],
  products: Array<{
    id: string;
    benefits: string[];
    tags: string[];
  }>,
): Recommendation[] {
  return products
    .map((product) => {
      const matchedGoals = goals.filter(
        (goal) =>
          product.tags.includes(goal) ||
          product.benefits.some((benefit) =>
            benefit.toLowerCase().includes(goal.replace('-', ' ')),
          ),
      );

      return {
        productId: product.id,
        reason: matchedGoals.length
          ? `Matches ${matchedGoals.join(', ')}`
          : 'General wellness match',
        matchedGoals,
      };
    })
    .filter((item) => item.matchedGoals.length > 0);
}
