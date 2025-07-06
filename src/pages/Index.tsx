
import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import InputSection from '@/components/InputSection';
import ResultsSection from '@/components/ResultsSection';
import HistorySection from '@/components/HistorySection';
import HowItWorksSection from '@/components/HowItWorksSection';
import ContactFooter from '@/components/ContactFooter';

const Index = () => {
  const [tailoredResults, setTailoredResults] = useState<{
    results: Array<{ id: number; text: string; keywords: string[] }>;
    jobTitle?: string;
    companyName?: string;
    resumeText: string;
    jobDescription: string;
  } | null>(null);

  const handleTailorComplete = (data: {
    results: Array<{ id: number; text: string; keywords: string[] }>;
    jobTitle?: string;
    companyName?: string;
    resumeText: string;
    jobDescription: string;
  }) => {
    setTailoredResults(data);
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <InputSection onTailorComplete={handleTailorComplete} />
      <ResultsSection 
        results={tailoredResults?.results}
        jobTitle={tailoredResults?.jobTitle}
        companyName={tailoredResults?.companyName}
        resumeText={tailoredResults?.resumeText}
        jobDescription={tailoredResults?.jobDescription}
      />
      <HistorySection />
      <HowItWorksSection />
      <ContactFooter />
    </div>
  );
};

export default Index;
