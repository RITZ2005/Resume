
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Save, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTailoredResumes } from '@/hooks/useTailoredResumes';

interface ResultsSectionProps {
  results?: Array<{
    id: number;
    text: string;
    keywords: string[];
  }>;
  jobTitle?: string;
  companyName?: string;
  resumeText?: string;
  jobDescription?: string;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  results, 
  jobTitle, 
  companyName, 
  resumeText, 
  jobDescription 
}) => {
  const { toast } = useToast();
  const { createResume } = useTailoredResumes();
  const [isSaving, setIsSaving] = useState(false);

  // Use mock data if no results provided (for demo purposes)
  const mockResults = [
    {
      id: 1,
      text: "Led cross-functional teams of 8+ developers using Agile methodologies to deliver cloud-native applications, resulting in 40% faster deployment cycles and improved system reliability",
      keywords: ["cross-functional teams", "Agile methodologies", "cloud-native", "deployment cycles"]
    },
    {
      id: 2,
      text: "Implemented data-driven decision making processes using Python and SQL, analyzing customer behavior patterns to increase user engagement by 35% and reduce churn rate by 20%",
      keywords: ["data-driven", "Python", "SQL", "customer behavior", "user engagement"]
    },
    {
      id: 3,
      text: "Architected scalable microservices infrastructure on AWS, managing containerized applications with Docker and Kubernetes, supporting 10M+ daily active users with 99.9% uptime",
      keywords: ["microservices", "AWS", "Docker", "Kubernetes", "scalable"]
    }
  ];

  const displayResults = results || mockResults;

  const highlightKeywords = (text: string, keywords: string[]) => {
    let highlightedText = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="bg-blue-200 text-blue-800 px-1 rounded font-semibold">$1</span>');
    });
    return highlightedText;
  };

  const handleCopyAll = () => {
    const allText = displayResults.map(result => result.text).join('\n\n');
    navigator.clipboard.writeText(allText);
    toast({
      title: "Copied to clipboard!",
      description: "All tailored bullet points have been copied.",
    });
  };

  const handleSaveToHistory = async () => {
    if (!resumeText || !jobDescription) {
      toast({
        title: "Cannot save",
        description: "Resume text and job description are required to save.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    try {
      const tailoredOutput = {
        bullet_points: displayResults.map(result => ({
          text: result.text,
          keywords: result.keywords
        }))
      };

      const allKeywords = Array.from(new Set(displayResults.flatMap(r => r.keywords)));
      const summary = `Generated ${displayResults.length} tailored bullet points focusing on ${allKeywords.slice(0, 3).join(', ')} and other key skills.`;

      await createResume.mutateAsync({
        job_title: jobTitle,
        company_name: companyName,
        resume_text: resumeText,
        job_description: jobDescription,
        tailored_output: tailoredOutput,
        tailored_summary: summary,
        keywords: allKeywords,
      });

    } catch (error) {
      console.error('Error saving to history:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section id="results-section" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-purple-600 mr-2" />
            <h2 className="text-4xl font-bold text-gray-800">
              Your AI-Tailored Resume
            </h2>
            <Sparkles className="w-8 h-8 text-purple-600 ml-2" />
          </div>
          <p className="text-xl text-gray-600">
            Here are your optimized bullet points with highlighted keywords
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {displayResults.map((result, index) => (
            <Card key={result.id} className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                    {index + 1}
                  </span>
                  Tailored Bullet Point
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p 
                  className="text-gray-700 leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ 
                    __html: highlightKeywords(result.text, result.keywords) 
                  }}
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  {result.keywords.map((keyword, idx) => (
                    <span 
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleCopyAll}
            size="lg"
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full transition-all duration-200"
          >
            <Copy className="w-5 h-5 mr-2" />
            Copy All
          </Button>
          <Button
            onClick={handleSaveToHistory}
            disabled={isSaving || createResume.isPending}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Save className="w-5 h-5 mr-2" />
            {isSaving || createResume.isPending ? 'Saving...' : 'Save to My History'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
