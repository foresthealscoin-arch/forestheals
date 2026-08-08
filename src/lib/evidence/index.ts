export type Evidence = {
  title: string;
  sourceType: string;
  url?: string | null;
  doi?: string | null;
  evidenceLevel?: string | null;
  publishedAt?: Date | null;
};

export function sortEvidence(evidence: Evidence[]) {
  const priority: Record<string, number> = {
    systematic_review: 1,
    meta_analysis: 1,
    randomized_controlled_trial: 2,
    clinical_trial: 3,
    observational: 4,
    educational: 5,
  };

  return [...evidence].sort(
    (a, b) =>
      (priority[a.sourceType] ?? 99) -
      (priority[b.sourceType] ?? 99),
  );
}
