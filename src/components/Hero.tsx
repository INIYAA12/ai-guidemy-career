import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 text-white">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="container relative mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
            AI Career Advisor
          </h1>
          <p className="mb-8 text-xl text-white/90 md:text-2xl">
            Discover your perfect career path with AI-powered recommendations
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80">
            Get personalized career suggestions, skill roadmaps, and a professional resume 
            tailored to your interests and academic background.
          </p>
          
          <Button 
            variant="secondary" 
            size="lg"
            className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm shadow-button"
            onClick={() => {
              document.querySelector('#career-form')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            Start Your Career Journey
          </Button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/8 rounded-full blur-lg"></div>
    </section>
  );
};