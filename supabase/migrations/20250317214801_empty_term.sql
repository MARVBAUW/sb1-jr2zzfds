/*
  # Add venture profile field to profiles table if it doesn't exist

  1. Changes
    - Add venture_profile column to profiles table if not exists
    - Add check constraint for valid profile types
*/

DO $$ 
BEGIN
  -- Check if column exists before adding
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'venture_profile'
  ) THEN
    -- Add the column if it doesn't exist
    ALTER TABLE profiles
    ADD COLUMN venture_profile text;

    -- Add the constraint
    ALTER TABLE profiles
    ADD CONSTRAINT valid_venture_profile CHECK (
      venture_profile IN ('investor', 'creator')
    );
  END IF;
END $$;