/*
  # Create Student Exams and Predictions Tables

  1. New Tables
    - `students`
      - `id` (uuid, primary key) - Student unique identifier
      - `student_id` (text, unique) - Student ID from dataset
      - `gender` (text) - Student gender
      - `program` (text) - Academic program
      - `year` (integer) - Academic year
      - `created_at` (timestamptz) - Record creation timestamp
    
    - `exam_submissions`
      - `id` (uuid, primary key) - Submission unique identifier
      - `student_id` (uuid, foreign key) - Reference to students table
      - `semester` (text) - Semester of submission
      - `courses_enrolled` (integer) - Number of courses enrolled
      - `exam_data` (jsonb) - All exam and historical data
      - `anomaly_probability` (numeric) - Predicted anomaly probability
      - `flagged_as_cheating` (boolean) - Whether submission is flagged
      - `risk_level` (text) - Risk classification (Low, Medium, High, Critical)
      - `created_at` (timestamptz) - Submission timestamp
  
  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (for demo purposes)
*/

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id text UNIQUE NOT NULL,
  gender text,
  program text,
  year integer,
  created_at timestamptz DEFAULT now()
);

-- Create exam submissions table
CREATE TABLE IF NOT EXISTS exam_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  semester text NOT NULL,
  courses_enrolled integer DEFAULT 0,
  exam_data jsonb NOT NULL,
  anomaly_probability numeric,
  flagged_as_cheating boolean DEFAULT false,
  risk_level text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_exam_submissions_student_id ON exam_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_exam_submissions_risk_level ON exam_submissions(risk_level);
CREATE INDEX IF NOT EXISTS idx_students_student_id ON students(student_id);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (demo purposes)
CREATE POLICY "Allow public read access to students"
  ON students
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert to students"
  ON students
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read access to exam submissions"
  ON exam_submissions
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert to exam submissions"
  ON exam_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);