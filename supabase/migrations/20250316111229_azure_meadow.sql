/*
  # Fix notification settings initialization

  1. Updates
    - Drop existing trigger and function
    - Create new function to handle notification settings initialization
    - Create new trigger to initialize settings for new users
    - Add ALL policy for public access to notification settings
*/

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created_notification_settings ON auth.users;
DROP FUNCTION IF EXISTS initialize_notification_settings();

-- Create function to initialize notification settings
CREATE OR REPLACE FUNCTION initialize_notification_settings()
RETURNS trigger AS $$
DECLARE
  default_settings jsonb := '{
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
  }'::jsonb;
BEGIN
  INSERT INTO user_notification_settings (user_id, settings)
  VALUES (NEW.id, default_settings)
  ON CONFLICT (user_id) DO UPDATE
  SET settings = default_settings
  WHERE user_notification_settings.settings IS NULL;
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created_notification_settings
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_notification_settings();

-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage their own notification settings" ON user_notification_settings;

-- Create new policy with public access
CREATE POLICY "Users can manage their own notification settings"
  ON user_notification_settings
  FOR ALL
  TO public
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Initialize settings for existing users
DO $$
DECLARE
  default_settings jsonb := '{
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
  }'::jsonb;
BEGIN
  INSERT INTO user_notification_settings (user_id, settings)
  SELECT id, default_settings
  FROM auth.users
  ON CONFLICT (user_id) DO UPDATE
  SET settings = default_settings
  WHERE user_notification_settings.settings IS NULL;
END $$;