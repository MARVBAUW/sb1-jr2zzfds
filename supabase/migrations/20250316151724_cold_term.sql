/*
  # Add venture profile field to profiles table

  1. Changes
    - Add venture_profile column to profiles table
    - Add check constraint for valid profile types
*/

ALTER TABLE profiles
ADD COLUMN venture_profile text,
ADD CONSTRAINT valid_venture_profile CHECK (
  venture_profile IN ('investor', 'creator')
);