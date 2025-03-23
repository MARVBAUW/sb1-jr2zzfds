/*
  # Fix feature toggle functionality

  1. Changes
    - Drop existing user_features table and related objects
    - Recreate user_features table with correct data types
    - Add new policies and triggers
    - Initialize default features for existing users

  2. Security
    - Enable RLS
    - Add policies for feature management
*/

-- Drop existing objects
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can read their own features" ON user_features;
  DROP POLICY IF EXISTS "Users can update their own features" ON user_features;
  DROP POLICY IF EXISTS "Users can insert their own features" ON user_features;
  DROP TRIGGER IF EXISTS on_auth_user_created_features ON auth.users;
  DROP FUNCTION IF EXISTS initialize_user_features();
  DROP TABLE IF EXISTS user_features;
EXCEPTION
  WHEN undefined_table THEN NULL;
  WHEN undefined_object THEN NULL;
END $$;

-- Create user features table
CREATE TABLE user_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  feature_name text NOT NULL,
  enabled boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, feature_name)
);

-- Enable RLS
ALTER TABLE user_features ENABLE ROW LEVEL SECURITY;

-- Create policies
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
  INSERT INTO user_features (user_id, feature_name, enabled)
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

-- Initialize features for existing users
DO $$
DECLARE
  user_record RECORD;
BEGIN
  FOR user_record IN SELECT id FROM auth.users LOOP
    INSERT INTO user_features (user_id, feature_name, enabled)
    VALUES
      (user_record.id, 'module_maitre_oeuvre', false),
      (user_record.id, 'module_maitre_ouvrage', false),
      (user_record.id, 'module_entreprise', false),
      (user_record.id, 'module_particuliers', false),
      (user_record.id, 'module_agents', false)
    ON CONFLICT (user_id, feature_name) DO NOTHING;
  END LOOP;
END $$;