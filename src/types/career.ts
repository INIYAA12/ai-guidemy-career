export interface CareerProfile {
  id?: string;
  name: string;
  interests: string;
  academicBackground: string;
  aiResult?: {
    recommendations: CareerRecommendation[];
    roadmap: SkillRoadmapWeek[];
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CareerRecommendation {
  title: string;
  description: string;
  matchPercentage: number;
  requiredSkills: string[];
  averageSalary: string;
}

export interface SkillRoadmapWeek {
  week: number;
  title: string;
  tasks: string[];
  resources: string[];
}

export interface CareerResults {
  profile: CareerProfile;
  recommendations: CareerRecommendation[];
  roadmap: SkillRoadmapWeek[];
}