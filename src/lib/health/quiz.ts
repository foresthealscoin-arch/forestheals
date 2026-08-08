import type { HealthGoal } from './goals';

export type QuizAnswer = {
  questionId: string;
  value: string;
  goals: HealthGoal[];
};

export function scoreGoals(answers: QuizAnswer[]) {
  const scores: Record<string, number> = {};

  for (const answer of answers) {
    for (const goal of answer.goals) {
      scores[goal] = (scores[goal] ?? 0) + 1;
    }
  }

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([goal, score]) => ({
      goal,
      score,
    }));
}
