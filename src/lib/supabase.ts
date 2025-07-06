
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface TailoredResume {
  id: string;
  user_id: string;
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

// Database operations
export const tailoredResumeService = {
  // Create a new tailored resume
  async create(data: {
    job_title?: string;
    company_name?: string;
    resume_text: string;
    job_description: string;
    tailored_output: TailoredResume['tailored_output'];
    tailored_summary?: string;
    keywords?: string[];
  }) {
    const { data: result, error } = await supabase
      .from('tailored_resumes')
      .insert([{
        ...data,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }])
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  // Get all tailored resumes for the current user
  async getAll() {
    const { data, error } = await supabase
      .from('tailored_resumes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get a specific tailored resume
  async getById(id: string) {
    const { data, error } = await supabase
      .from('tailored_resumes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a tailored resume
  async delete(id: string) {
    const { error } = await supabase
      .from('tailored_resumes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Update a tailored resume
  async update(id: string, updates: Partial<Omit<TailoredResume, 'id' | 'user_id' | 'created_at' | 'updated_at'>>) {
    const { data, error } = await supabase
      .from('tailored_resumes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
