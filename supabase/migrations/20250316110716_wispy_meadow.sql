/*
  # Create notification settings table

  1. New Tables
    - `user_notification_settings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `settings` (jsonb)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)

  2. Security
    - Enable RLS
    - Add policies for users to manage their own settings
*/

CREATE TABLE user_notification_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  settings jsonb NOT NULL DEFAULT '{
    "marketplace": {
      "newListings": true,
      "priceChanges": true,
      "orderUpdates": true
    },
    "venture": {
      "newProjects": true,
      "investmentUpdates": true,
      "milestones": true
    },
    "chantier": {
      "progress": true,
      "issues": true,
      "meetings": true,
      "documents": true
    },
    "popup": {
      "ai": true,
      "venture": true,
      "balance": true,
      "customPrompts": []
    }
  }'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE user_notification_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own notification settings"
  ON user_notification_settings
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_notification_settings_updated_at
  BEFORE UPDATE ON user_notification_settings
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create function to initialize notification settings
CREATE OR REPLACE FUNCTION initialize_notification_settings()
RETURNS trigger AS $$
BEGIN
  INSERT INTO user_notification_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created_notification_settings
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_notification_settings();