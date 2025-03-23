/*
  # Add venture projects table

  1. New Tables
    - `venture_projects`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `description` (text)
      - `location` (text)
      - `budget` (numeric)
      - `duration` (text)
      - `type` (text)
      - `impact` (jsonb)
      - `team` (jsonb)
      - `images` (text[])
      - `tags` (text[])
      - `status` (text)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS
    - Add policies for project management
*/

CREATE TABLE venture_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  budget numeric NOT NULL,
  duration text NOT NULL,
  type text NOT NULL CHECK (type IN ('startup', 'real_estate', 'infrastructure')),
  impact jsonb NOT NULL DEFAULT '{
    "environmental": "",
    "social": "",
    "innovation": ""
  }'::jsonb,
  team jsonb[] NOT NULL DEFAULT '[]'::jsonb[],
  images text[] NOT NULL DEFAULT '{}'::text[],
  tags text[] NOT NULL DEFAULT '{}'::text[],
  status text NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE venture_projects ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read all approved projects"
  ON venture_projects
  FOR SELECT
  TO authenticated
  USING (status = 'approved' OR auth.uid() = user_id);

CREATE POLICY "Users can create their own projects"
  ON venture_projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON venture_projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER update_venture_projects_updated_at
  BEFORE UPDATE ON venture_projects
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();