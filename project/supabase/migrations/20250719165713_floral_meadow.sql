/*
  # Create assessments table for AI-readiness website assessments

  1. New Tables
    - `assessments`
      - `id` (uuid, primary key) - Unique assessment identifier
      - `url` (text) - Website URL being assessed
      - `name` (text) - User's full name
      - `email` (text) - User's email address
      - `status` (text) - Assessment status (pending, crawling, analyzing, completed, failed)
      - `progress` (integer) - Progress percentage (0-100)
      - `created_at` (timestamp) - When assessment was created
      - `updated_at` (timestamp) - Last update time
      - `completed_at` (timestamp) - When assessment was completed
      - `error_message` (text) - Error message if failed
      
      ## Assessment Results Fields
      - `overall_score` (integer) - Overall AI-readiness score (0-100)
      - `overall_grade` (text) - Overall grade (A, B, C, D, F)
      
      ## Category Analysis (JSON fields for detailed results)
      - `structured_data` (jsonb) - Structured data analysis results
      - `content_analysis` (jsonb) - Content quality analysis results  
      - `technical_performance` (jsonb) - Technical performance analysis results
      - `business_context` (jsonb) - Business context analysis results
      
      ## Additional Analysis Data
      - `analysis_metadata` (jsonb) - Additional insights, recommendations, competitive analysis

  2. Security
    - Enable RLS on `assessments` table
    - Add policy for public read access to completed assessments
    - Add policy for creating new assessments
*/

CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'crawling', 'analyzing', 'completed', 'failed')),
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  error_message text,
  
  -- Overall results
  overall_score integer CHECK (overall_score >= 0 AND overall_score <= 100),
  overall_grade text CHECK (overall_grade IN ('A', 'B', 'C', 'D', 'F')),
  
  -- Category analysis results (JSON)
  structured_data jsonb,
  content_analysis jsonb,
  technical_performance jsonb,
  business_context jsonb,
  
  -- Additional analysis metadata
  analysis_metadata jsonb
);

-- Enable Row Level Security
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- Policy for reading completed assessments (public access to results)
CREATE POLICY "Anyone can read completed assessments"
  ON assessments
  FOR SELECT
  USING (status = 'completed');

-- Policy for creating new assessments (public access to start assessments)
CREATE POLICY "Anyone can create assessments"
  ON assessments
  FOR INSERT
  WITH CHECK (true);

-- Policy for updating assessments (system updates only - could be restricted further)
CREATE POLICY "System can update assessments"
  ON assessments
  FOR UPDATE
  USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_assessments_status ON assessments(status);
CREATE INDEX IF NOT EXISTS idx_assessments_created_at ON assessments(created_at);
CREATE INDEX IF NOT EXISTS idx_assessments_email ON assessments(email);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_assessments_updated_at 
    BEFORE UPDATE ON assessments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();