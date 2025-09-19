import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CareerProfile } from "@/types/career";
import { BrainCircuit, User, GraduationCap, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { fetchCareerRecommendations } from "@/services/careerApi";

interface CareerFormProps {
  onSubmit: (profile: CareerProfile) => void;
}

export const CareerForm = ({ onSubmit }: CareerFormProps) => {
  const [formData, setFormData] = useState<CareerProfile>({
    name: "",
    interests: "",
    academicBackground: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.interests || !formData.academicBackground) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to get personalized recommendations.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Save to Supabase
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          name: formData.name,
          interests: formData.interests,
          academic_background: formData.academicBackground,
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving profile:', error);
        toast({
          title: "Error",
          description: "Failed to save profile. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Profile Saved!",
        description: "Generating your personalized career recommendations...",
      });
      
      // Create profile object for API call
      const savedProfile: CareerProfile = {
        id: data.id,
        name: data.name,
        interests: data.interests,
        academicBackground: data.academic_background,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      // Fetch career recommendations from API
      const aiResult = await fetchCareerRecommendations(savedProfile);
      
      // Update profile with AI results
      const profileWithResults: CareerProfile = {
        ...savedProfile,
        aiResult,
      };
      
      onSubmit(profileWithResults);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof CareerProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div id="career-form" className="max-w-2xl mx-auto animate-slide-up">
      <Card className="shadow-card bg-gradient-card border-0">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-white shadow-button">
            <BrainCircuit className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">
            Tell Us About Yourself
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Share your background and interests to receive personalized career guidance
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <User className="h-4 w-4 text-primary" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="border-border focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Heart className="h-4 w-4 text-primary" />
                Interests & Passions
              </Label>
              <Textarea
                id="interests"
                placeholder="e.g., Technology, Healthcare, Creative Writing, Data Analysis, Environmental Science"
                value={formData.interests}
                onChange={(e) => handleInputChange("interests", e.target.value)}
                className="border-border focus:ring-primary/20 focus:border-primary transition-all duration-200 min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple interests with commas
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="academic" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <GraduationCap className="h-4 w-4 text-primary" />
                Academic Background
              </Label>
              <Textarea
                id="academic"
                placeholder="e.g., Bachelor's in Computer Science, Master's in Business Administration, High School with focus on STEM"
                value={formData.academicBackground}
                onChange={(e) => handleInputChange("academicBackground", e.target.value)}
                className="border-border focus:ring-primary/20 focus:border-primary transition-all duration-200 min-h-[100px]"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-button transition-all duration-200 hover:shadow-elegant"
              size="lg"
            >
              Get My Career Recommendations
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};