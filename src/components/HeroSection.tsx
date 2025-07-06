
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToInput = () => {
    document.getElementById('input-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            TailorMyResume.ai
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-4">
            Boost Your Job Chances with AI-Tailored Resumes
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Let AI help you craft better bullet points for every job.
          </p>
          <Button 
            onClick={scrollToInput}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Start Tailoring
            <ArrowDown className="ml-2 w-5 h-5" />
          </Button>
        </div>
        
        {/* Hero Image */}
        <div className="mt-16 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6">
              <div className="space-y-3">
                <div className="h-4 bg-blue-300 rounded w-3/4"></div>
                <div className="h-4 bg-purple-300 rounded w-1/2"></div>
                <div className="h-4 bg-blue-200 rounded w-5/6"></div>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-sm text-gray-600">Resume.pdf</span>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
