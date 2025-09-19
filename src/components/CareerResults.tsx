import { CareerProfile } from "@/types/career";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  RotateCcw, 
  TrendingUp, 
  Target, 
  Calendar, 
  CheckCircle,
  Star,
  DollarSign
} from "lucide-react";
import { generatePDF } from "@/utils/pdfGenerator";
import { getMockRecommendations, getMockRoadmap } from "@/utils/mockData";
import { useToast } from "@/hooks/use-toast";

interface CareerResultsProps {
  profile: CareerProfile;
  onReset: () => void;
}

export const CareerResults = ({ profile, onReset }: CareerResultsProps) => {
  // Use AI results if available, otherwise fallback to mock data
  const recommendations = profile.aiResult?.recommendations || getMockRecommendations(profile);
  const roadmap = profile.aiResult?.roadmap || getMockRoadmap(profile);
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    try {
      generatePDF({
        profile,
        recommendations,
        roadmap
      });
      
      toast({
        title: "PDF Generated!",
        description: "Your career report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Download Error",
        description: "There was an issue generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <Card className="shadow-elegant bg-gradient-card border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-foreground mb-2">
            Welcome, {profile.name}!
          </CardTitle>
          <p className="text-muted-foreground text-lg">
            Here are your personalized career recommendations
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Button onClick={handleDownloadPDF} className="bg-gradient-primary hover:opacity-90 shadow-button">
              <Download className="mr-2 h-4 w-4" />
              Download PDF Report
            </Button>
            <Button variant="outline" onClick={onReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Start Over
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Career Recommendations */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            Top Career Recommendations
          </h2>
          <p className="text-muted-foreground mt-2">
            Based on your interests and academic background
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {recommendations.map((career, index) => (
            <Card key={index} className="shadow-card bg-gradient-card border-0 hover:shadow-elegant transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                    #{index + 1} Match
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{career.matchPercentage}%</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{career.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{career.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {career.requiredSkills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <DollarSign className="h-4 w-4 text-success" />
                  <span className="font-semibold text-success">{career.averageSalary}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-8" />

      {/* Skill Roadmap */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            4-Week Skill Development Roadmap
          </h2>
          <p className="text-muted-foreground mt-2">
            A structured path to build the skills you need
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {roadmap.map((week, index) => (
            <Card key={index} className="shadow-card bg-gradient-card border-0 animate-scale-in" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-white font-bold">
                    {week.week}
                  </div>
                  <CardTitle className="text-lg">{week.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Tasks to Complete:</h4>
                  <ul className="space-y-1">
                    {week.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Learning Resources:</h4>
                  <ul className="space-y-1">
                    {week.resources.map((resource, resourceIndex) => (
                      <li key={resourceIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{resource}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};