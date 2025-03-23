/*
  # Fix notification settings initialization

  1. Changes
    - Drop existing trigger and function
    - Create new function with proper conflict handling
    - Recreate trigger with updated function
    - Add migration to fix existing data

  2. Security
    - Maintain existing RLS policies
    - Ensure data integrity during migration
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created_notification_settings ON auth.users;
DROP FUNCTION IF EXISTS initialize_notification_settings();

-- Create improved function to initialize notification settings
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
  -- Try to insert new settings, if exists do nothing
  INSERT INTO user_notification_settings (user_id, settings)
  VALUES (NEW.id, default_settings)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create new trigger
CREATE TRIGGER on_auth_user_created_notification_settings
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_notification_settings();

-- Fix existing data
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
  -- Insert settings for users who don't have them
  INSERT INTO user_notification_settings (user_id, settings)
  SELECT id, default_settings
  FROM auth.users u
  WHERE NOT EXISTS (
    SELECT 1 
    FROM user_notification_settings s 
    WHERE s.user_id = u.id
  );
END $$;