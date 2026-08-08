export type SkinAnalysisResult = {
  observations: string[];
  confidence?: number;
  suggestedGoals: string[];
  recommendedNextSteps: string[];
  requiresProfessionalReview: boolean;
  disclaimer: string;
};

export function analyzeSkinPlaceholder(): SkinAnalysisResult {
  return {
    observations: [],
    suggestedGoals: [],
    recommendedNextSteps: [],
    requiresProfessionalReview: true,
    disclaimer:
      'This feature is for educational wellness information and is not a medical diagnosis.',
  };
}
