
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye, Trash2, Clock, Briefcase, Copy } from 'lucide-react';
import { useTailoredResumes } from '@/hooks/useTailoredResumes';
import { useToast } from '@/hooks/use-toast';

const HistorySection = () => {
  const { resumes, isLoading, deleteResume } = useTailoredResumes();
  const { toast } = useToast();
  const [selectedResume, setSelectedResume] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewFull = (resume: any) => {
    setSelectedResume(resume);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string, jobTitle: string) => {
    if (confirm(`Are you sure you want to delete the tailored resume for "${jobTitle}"?`)) {
      deleteResume.mutate(id);
    }
  };

  const handleCopyBulletPoints = (bulletPoints: Array<{ text: string; keywords: string[] }>) => {
    const text = bulletPoints.map(bp => bp.text).join('\n\n');
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Bullet points copied to clipboard.",
    });
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <p className="text-xl text-gray-500">Loading your tailored resumes...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Your Tailoring History
          </h2>
          <p className="text-xl text-gray-600">
            Access your previously tailored resumes and track your applications
          </p>
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500 mb-2">No tailored resumes yet</p>
            <p className="text-gray-400">Start by tailoring your first resume above!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <Card key={resume.id} className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {resume.job_title || 'Untitled Position'}
                    {resume.company_name && (
                      <span className="text-sm font-normal text-gray-600 block">
                        at {resume.company_name}
                      </span>
                    )}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(resume.created_at).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {resume.tailored_summary || 'AI-tailored resume content generated based on job requirements'}
                  </p>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleViewFull(resume)}
                      size="sm"
                      variant="outline"
                      className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Full
                    </Button>
                    <Button
                      onClick={() => handleDelete(resume.id, resume.job_title || 'Untitled')}
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                      disabled={deleteResume.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {resumes.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">
              Showing {resumes.length} tailored resume{resumes.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {selectedResume?.job_title || 'Tailored Resume'}
                {selectedResume?.company_name && (
                  <span className="text-lg font-normal text-gray-600 block">
                    at {selectedResume.company_name}
                  </span>
                )}
              </DialogTitle>
            </DialogHeader>
            
            {selectedResume && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Created: {new Date(selectedResume.created_at).toLocaleDateString()}
                  </p>
                  <Button
                    onClick={() => handleCopyBulletPoints(selectedResume.tailored_output.bullet_points)}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Tailored Bullet Points:</h3>
                  {selectedResume.tailored_output.bullet_points.map((bullet: any, index: number) => (
                    <Card key={index} className="p-4">
                      <p className="text-gray-700 mb-3">{bullet.text}</p>
                      <div className="flex flex-wrap gap-2">
                        {bullet.keywords.map((keyword: string, idx: number) => (
                          <span 
                            key={idx}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>

                {selectedResume.keywords && selectedResume.keywords.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Keywords:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedResume.keywords.map((keyword: string, idx: number) => (
                        <span 
                          key={idx}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default HistorySection;
