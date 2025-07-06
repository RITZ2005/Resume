
import React from 'react';
import { Upload, Brain, Download } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Resume",
      description: "Paste your current resume or upload a PDF file with your experience and skills"
    },
    {
      icon: Brain,
      title: "Analyze Job Description",
      description: "Our AI uses NLP to extract relevant job keywords and requirements from the posting"
    },
    {
      icon: Download,
      title: "Get Tailored Output",
      description: "Receive optimized bullet points that highlight your relevant experience and skills"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered system analyzes your resume and the job description to create perfectly tailored bullet points
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-blue-100">
                    <IconComponent className="w-10 h-10 text-blue-600" />
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Step number */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mt-4 text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose TailorMyResume.ai?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <p className="text-gray-600">Match Rate</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">3x</div>
                <p className="text-gray-600">More Interviews</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">&lt; 30s</div>
                <p className="text-gray-600">Processing Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
