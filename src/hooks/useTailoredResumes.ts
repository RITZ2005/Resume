
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TailoredResume {
  id: string;
  user_id: string | null;
  job_title: string | null;
  company_name: string | null;
  resume_text: string;
  job_description: string;
  tailored_output: {
    bullet_points: Array<{
      text: string;
      keywords: string[];
    }>;
  };
  tailored_summary: string | null;
  keywords: string[] | null;
  created_at: string;
  updated_at: string;
}

export const useTailoredResumes = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: resumes = [], isLoading } = useQuery({
    queryKey: ['tailored-resumes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tailored_resumes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tailored resumes:', error);
        throw error;
      }

      return data as TailoredResume[];
    },
  });

  const createResume = useMutation({
    mutationFn: async (resumeData: {
      job_title?: string;
      company_name?: string;
      resume_text: string;
      job_description: string;
      tailored_output: TailoredResume['tailored_output'];
      tailored_summary?: string;
      keywords?: string[];
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User must be authenticated');
      }

      const { data, error } = await supabase
        .from('tailored_resumes')
        .insert([{
          ...resumeData,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tailored-resumes'] });
      toast({
        title: "Success!",
        description: "Your tailored resume has been saved.",
      });
    },
    onError: (error) => {
      console.error('Error creating tailored resume:', error);
      toast({
        title: "Error",
        description: "Failed to save your tailored resume. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteResume = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('tailored_resumes')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tailored-resumes'] });
      toast({
        title: "Deleted",
        description: "Tailored resume has been deleted.",
      });
    },
    onError: (error) => {
      console.error('Error deleting tailored resume:', error);
      toast({
        title: "Error",
        description: "Failed to delete the tailored resume. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    resumes,
    isLoading,
    createResume,
    deleteResume,
  };
};
