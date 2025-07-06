
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Upload, FileText } from 'lucide-react';

interface InputSectionProps {
  onTailorComplete?: (data: {
    results: Array<{ id: number; text: string; keywords: string[] }>;
    jobTitle?: string;
    companyName?: string;
    resumeText: string;
    jobDescription: string;
  }) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ onTailorComplete }) => {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputMode, setInputMode] = useState<'paste' | 'upload'>('paste');

  const handleTailorResume = async () => {
    if (!resume.trim() || !jobDescription.trim()) {
      alert('Please fill in both resume and job description');
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing - in real implementation, this would call an AI service
    setTimeout(() => {
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

      setIsLoading(false);
      
      if (onTailorComplete) {
        onTailorComplete({
          results: mockResults,
          jobTitle: jobTitle.trim() || undefined,
          companyName: companyName.trim() || undefined,
          resumeText: resume,
          jobDescription: jobDescription,
        });
      }
      
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 3000);
  };

  return (
    <section id="input-section" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Paste Your Resume and Job Description
          </h2>
          <p className="text-xl text-gray-600">
            Our AI will analyze both and create tailored bullet points that match the job requirements
          </p>
        </div>

        {/* Job Details */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
              Job Title (Optional)
            </label>
            <Input
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Senior Software Engineer"
              className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
              Company Name (Optional)
            </label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Google"
              className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Toggle between Paste and Upload */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-full p-1 flex">
            <button
              onClick={() => setInputMode('paste')}
              className={`px-6 py-2 rounded-full transition-all ${
                inputMode === 'paste'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Paste Text
            </button>
            <button
              onClick={() => setInputMode('upload')}
              className={`px-6 py-2 rounded-full transition-all ${
                inputMode === 'upload'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Upload PDF
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Resume Input */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Your Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              {inputMode === 'paste' ? (
                <Textarea
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  placeholder="e.g. My experience includes managing cloud deployments, leading cross-functional teams, and implementing agile methodologies..."
                  className="min-h-[300px] border-2 border-gray-200 focus:border-blue-500 transition-colors"
                />
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload your resume (PDF format)</p>
                  <p className="text-sm text-gray-400">Coming soon - use paste text for now</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Job Description Input */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Job Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here including required skills, qualifications, and responsibilities..."
                className="min-h-[300px] border-2 border-gray-200 focus:border-blue-500 transition-colors"
              />
            </CardContent>
          </Card>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Button
            onClick={handleTailorResume}
            disabled={isLoading}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Analyzing and tailoring your resume with AI magic...
              </>
            ) : (
              'Tailor My Resume'
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InputSection;
