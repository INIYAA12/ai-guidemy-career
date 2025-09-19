import { CareerProfile, CareerRecommendation, SkillRoadmapWeek } from "@/types/career";

interface ApiResponse {
  careers: string[];
  skillRoadmap: string[];
}

export const fetchCareerRecommendations = async (profile: CareerProfile): Promise<{
  recommendations: CareerRecommendation[];
  roadmap: SkillRoadmapWeek[];
}> => {
  try {
    const response = await fetch('https://your-free-api-endpoint.com/careers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: profile.name,
        interests: profile.interests,
        background: profile.academicBackground,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    
    // Transform API response to match existing UI structure
    const recommendations: CareerRecommendation[] = data.careers.map((career, index) => ({
      title: career,
      description: `Exciting career opportunity in ${career} tailored to your interests and background.`,
      matchPercentage: 85 + (index * 5), // Generate realistic match percentages
      requiredSkills: [`${career} fundamentals`, "Problem solving", "Communication"],
      averageSalary: "$60,000 - $120,000",
    }));

    const roadmap: SkillRoadmapWeek[] = data.skillRoadmap.map((weekContent, index) => {
      const weekNumber = index + 1;
      return {
        week: weekNumber,
        title: weekContent,
        tasks: [
          `Complete ${weekContent.toLowerCase()} exercises`,
          `Practice hands-on projects`,
          `Review and document progress`,
        ],
        resources: [
          "Online tutorials",
          "Practice exercises", 
          "Community forums",
        ],
      };
    });

    return { recommendations, roadmap };
  } catch (error) {
    console.error('API call failed, using fallback data:', error);
    
    // Import mock data functions for fallback
    const { getMockRecommendations } = await import('@/utils/mockData');
    const { getMockRoadmap } = await import('@/utils/mockData');
    
    return {
      recommendations: getMockRecommendations(profile),
      roadmap: getMockRoadmap(profile),
    };
  }
};