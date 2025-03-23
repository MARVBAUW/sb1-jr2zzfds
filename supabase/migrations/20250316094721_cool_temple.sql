/*
  # Add user features table and policies

  1. New Tables
    - `user_features`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `feature_id` (text)
      - `enabled` (boolean)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `user_features` table
    - Add policies for users to manage their own features
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can read their own features" ON user_features;
  DROP POLICY IF EXISTS "Users can update their own features" ON user_features;
  DROP POLICY IF EXISTS "Users can insert their own features" ON user_features;
  DROP TRIGGER IF EXISTS on_auth_user_created_features ON auth.users;
  DROP FUNCTION IF EXISTS initialize_user_features();
EXCEPTION
  WHEN undefined_table THEN NULL;
  WHEN undefined_object THEN NULL;
END $$;

-- Create user features table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  feature_id text NOT NULL,
  enabled boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, feature_id)
);

-- Enable RLS
ALTER TABLE user_features ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Users can read their own features"
  ON user_features
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own features"
  ON user_features
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert their own features"
  ON user_features
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create function to initialize user features
CREATE OR REPLACE FUNCTION initialize_user_features()
RETURNS trigger AS $$
BEGIN
  -- Insert default disabled features for new user
  INSERT INTO user_features (user_id, feature_id, enabled)
  VALUES
    (NEW.id, 'module_maitre_oeuvre', false),
    (NEW.id, 'module_maitre_ouvrage', false),
    (NEW.id, 'module_entreprise', false),
    (NEW.id, 'module_particuliers', false),
    (NEW.id, 'module_agents', false);
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created_features
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_user_features();