/*
  # Enhance user profile with professional orientation

  1. New Fields
    - Add professional fields to profiles table:
      - `professional_role` (text): Main professional role
      - `industry_focus` (text[]): Areas of industry focus
      - `expertise_level` (text): Level of expertise
      - `interests` (text[]): Professional interests
      - `preferred_learning_style` (text): How the user prefers to learn
      - `communication_preferences` (jsonb): Preferred communication methods
      - `ai_preferences` (jsonb): AI interaction preferences

  2. Security
    - Maintain existing RLS policies
    - Add validation for new fields
*/

-- Add new columns to profiles table
ALTER TABLE profiles
ADD COLUMN professional_role text,
ADD COLUMN industry_focus text[],
ADD COLUMN expertise_level text,
ADD COLUMN interests text[],
ADD COLUMN preferred_learning_style text,
ADD COLUMN communication_preferences jsonb DEFAULT '{
  "language": "fr",
  "format": "detailed",
  "style": "professional",
  "notifications": {
    "email": true,
    "inApp": true,
    "desktop": false
  }
}'::jsonb,
ADD COLUMN ai_preferences jsonb DEFAULT '{
  "responseStyle": "concise",
  "technicalLevel": "intermediate",
  "includeExamples": true,
  "includeSources": true,
  "autoSuggestions": true,
  "preferredTopics": [],
  "excludedTopics": []
}'::jsonb;

-- Add constraints and validation
ALTER TABLE profiles
ADD CONSTRAINT valid_professional_role CHECK (
  professional_role IN (
    'architecte',
    'ingenieur',
    'maitre_oeuvre',
    'maitre_ouvrage',
    'entrepreneur',
    'artisan',
    'promoteur',
    'investisseur',
    'agent_immobilier',
    'expert_technique',
    'consultant',
    'other'
  )
),
ADD CONSTRAINT valid_expertise_level CHECK (
  expertise_level IN (
    'debutant',
    'intermediaire',
    'avance',
    'expert'
  )
),
ADD CONSTRAINT valid_learning_style CHECK (
  preferred_learning_style IN (
    'visuel',
    'auditif',
    'pratique',
    'theorique',
    'mixte'
  )
);

-- Create function to validate industry focus
CREATE OR REPLACE FUNCTION validate_industry_focus()
RETURNS trigger AS $$
DECLARE
  valid_industries text[] := ARRAY[
    'construction_residentielle',
    'construction_commerciale',
    'renovation',
    'infrastructure',
    'developpement_durable',
    'smart_building',
    'gestion_patrimoine',
    'investissement',
    'urbanisme',
    'architecture'
  ];
BEGIN
  IF NOT (SELECT bool_and(industry = ANY(valid_industries)) 
          FROM unnest(NEW.industry_focus) AS industry) THEN
    RAISE EXCEPTION 'Invalid industry focus value';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for industry focus validation
CREATE TRIGGER validate_industry_focus_trigger
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  WHEN (NEW.industry_focus IS NOT NULL)
  EXECUTE FUNCTION validate_industry_focus();

-- Create function to validate interests
CREATE OR REPLACE FUNCTION validate_interests()
RETURNS trigger AS $$
DECLARE
  valid_interests text[] := ARRAY[
    'innovation_technique',
    'developpement_durable',
    'efficacite_energetique',
    'materiaux_innovants',
    'smart_building',
    'bim',
    'gestion_projet',
    'reglementation',
    'finance',
    'management'
  ];
BEGIN
  IF NOT (SELECT bool_and(interest = ANY(valid_interests)) 
          FROM unnest(NEW.interests) AS interest) THEN
    RAISE EXCEPTION 'Invalid interest value';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for interests validation
CREATE TRIGGER validate_interests_trigger
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  WHEN (NEW.interests IS NOT NULL)
  EXECUTE FUNCTION validate_interests();

-- Update existing profiles with default values
UPDATE profiles
SET
  professional_role = 'other',
  industry_focus = ARRAY['construction_residentielle'],
  expertise_level = 'intermediaire',
  interests = ARRAY['innovation_technique'],
  preferred_learning_style = 'mixte'
WHERE professional_role IS NULL;