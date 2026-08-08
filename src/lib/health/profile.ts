export type HealthProfile = {
  goals: string[];
  lifestyle: string[];
  preferences: string[];
  allergies: string[];
  dietaryPreferences: string[];
};

export const emptyHealthProfile: HealthProfile = {
  goals: [],
  lifestyle: [],
  preferences: [],
  allergies: [],
  dietaryPreferences: [],
};
