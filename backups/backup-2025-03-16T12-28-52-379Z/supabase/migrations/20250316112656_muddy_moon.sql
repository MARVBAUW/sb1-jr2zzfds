/*
  # Fix notification settings and unique constraint issues

  1. Changes
    - Remove any duplicate notification settings entries
    - Ensure single entry per user
    - Update initialization function to use upsert
    - Add proper error handling
*/

-- First, remove any duplicate entries keeping only the most recent one
DELETE FROM user_notification_settings a USING (
  SELECT user_id, MAX(created_at) as max_date
  FROM user_notification_settings
  GROUP BY user_id
  HAVING COUNT(*) > 1
) b
WHERE a.user_id = b.user_id 
AND a.created_at < b.max_date;

-- Drop existing trigger
DROP TRIGGER IF EXISTS on_auth_user_created_notification_settings ON auth.users;

-- Modify the initialization function to use upsert
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
  -- Use upsert to handle both new and existing users
  INSERT INTO user_notification_settings (user_id, settings)
  VALUES (NEW.id, default_settings)
  ON CONFLICT (user_id) 
  DO UPDATE SET settings = EXCLUDED.settings
  WHERE user_notification_settings.settings IS NULL;
  
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log error and continue
  RAISE WARNING 'Error in initialize_notification_settings: %', SQLERRM;
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created_notification_settings
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_notification_settings();

-- Update existing settings to ensure they have all required fields
UPDATE user_notification_settings
SET settings = settings || '{
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
}'::jsonb
WHERE settings IS NULL OR settings = '{}'::jsonb;