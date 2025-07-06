
-- Create the tailored_resumes table
CREATE TABLE tailored_resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  job_title TEXT,
  company_name TEXT,
  resume_text TEXT NOT NULL,
  job_description TEXT NOT NULL,
  tailored_output JSONB NOT NULL,
  tailored_summary TEXT,
  keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on user_id for faster queries
CREATE INDEX idx_tailored_resumes_user_id ON tailored_resumes(user_id);

-- Create an index on created_at for sorting by date
CREATE INDEX idx_tailored_resumes_created_at ON tailored_resumes(created_at DESC);

-- Enable Row Level Security
ALTER TABLE tailored_resumes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own tailored resumes
CREATE POLICY "Users can view their own tailored resumes" ON tailored_resumes
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own tailored resumes
CREATE POLICY "Users can insert their own tailored resumes" ON tailored_resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own tailored resumes
CREATE POLICY "Users can update their own tailored resumes" ON tailored_resumes
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own tailored resumes
CREATE POLICY "Users can delete their own tailored resumes" ON tailored_resumes
  FOR DELETE USING (auth.uid() = user_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_tailored_resumes_updated_at
  BEFORE UPDATE ON tailored_resumes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
