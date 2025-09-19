import { useState } from "react";
import { CareerForm } from "@/components/CareerForm";
import { CareerResults } from "@/components/CareerResults";
import { Hero } from "@/components/Hero";
import { CareerProfile } from "@/types/career";

const Index = () => {
  const [profile, setProfile] = useState<CareerProfile | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleProfileSubmit = (profileData: CareerProfile) => {
    setProfile(profileData);
    setShowResults(true);
  };

  const handleReset = () => {
    setProfile(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="container mx-auto px-4 py-8">
        {!showResults ? (
          <div className="animate-fade-in">
            <CareerForm onSubmit={handleProfileSubmit} />
          </div>
        ) : (
          <div className="animate-slide-up">
            <CareerResults profile={profile!} onReset={handleReset} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;