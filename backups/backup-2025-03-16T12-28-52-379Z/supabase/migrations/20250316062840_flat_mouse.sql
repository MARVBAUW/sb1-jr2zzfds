/*
  # Add subscription management tables and update profiles

  1. Updates
    - Add subscription fields to profiles table
    - Add subscription_features table
    - Add subscription_tiers table
    - Add user_features table

  2. Security
    - Enable RLS on new tables
    - Add policies for feature access
*/

-- Add subscription fields to profiles
ALTER TABLE profiles 
ADD COLUMN subscription_tier text DEFAULT 'free_trial',
ADD COLUMN trial_start_date timestamptz DEFAULT now(),
ADD COLUMN trial_end_date timestamptz DEFAULT (now() + interval '15 days');

-- Create subscription features table
CREATE TABLE subscription_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  starter boolean DEFAULT false,
  business boolean DEFAULT false,
  premium boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create subscription tiers table
CREATE TABLE subscription_tiers (
  id text PRIMARY KEY,
  name text NOT NULL,
  price decimal NOT NULL,
  description text NOT NULL,
  max_users integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user features table
CREATE TABLE user_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  feature_id uuid REFERENCES subscription_features(id) ON DELETE CASCADE,
  enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, feature_id)
);

-- Enable RLS
ALTER TABLE subscription_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_features ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read subscription features"
  ON subscription_features
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read subscription tiers"
  ON subscription_tiers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read their own features"
  ON user_features
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert initial subscription tiers
INSERT INTO subscription_tiers (id, name, price, description, max_users) VALUES
  ('starter', 'Starter', 49, 'Pour les petites équipes et les projets simples', 3),
  ('business', 'Business', 79, 'Pour les équipes en croissance', 5),
  ('premium', 'Premium', 120, 'Pour les grandes équipes et projets complexes', 8);

-- Insert initial features
INSERT INTO subscription_features (name, description, starter, business, premium) VALUES
  ('Gestion de projet basique', 'Fonctionnalités essentielles de gestion de projet', true, true, true),
  ('Tableau de bord personnalisé', 'Tableaux de bord avec KPIs personnalisables', true, true, true),
  ('Support par email', 'Support technique par email', true, true, true),
  ('Stockage 10GB', 'Stockage de documents limité à 10GB', true, true, true),
  ('API Access (100 req/jour)', 'Accès API limité', true, true, true),
  ('Gestion de projet avancée', 'Fonctionnalités avancées de gestion de projet', false, true, true),
  ('Rapports personnalisés', 'Création de rapports sur mesure', false, true, true),
  ('Stockage 50GB', 'Stockage de documents étendu', false, true, true),
  ('API Access (1000 req/jour)', 'Accès API étendu', false, true, true),
  ('Support prioritaire', 'Support technique prioritaire', false, true, true),
  ('Formation en ligne', 'Accès aux formations en ligne', false, true, true),
  ('Stockage illimité', 'Stockage de documents illimité', false, false, true),
  ('API Access illimité', 'Accès API illimité', false, false, true),
  ('Support dédié', 'Support technique dédié', false, false, true),
  ('Formation sur site', 'Sessions de formation sur site', false, false, true),
  ('Personnalisation avancée', 'Options de personnalisation étendues', false, false, true);

-- Function to check if feature is available for user
CREATE OR REPLACE FUNCTION is_feature_available(
  user_id uuid,
  feature_name text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_tier text;
  is_trial boolean;
  trial_valid boolean;
BEGIN
  -- Get user's subscription info
  SELECT 
    subscription_tier,
    subscription_tier = 'free_trial',
    CASE 
      WHEN subscription_tier = 'free_trial' AND trial_end_date > now() 
      THEN true 
      ELSE false 
    END
  INTO user_tier, is_trial, trial_valid
  FROM profiles
  WHERE id = user_id;

  -- If user is on trial and trial is valid, they have access to all features
  IF is_trial AND trial_valid THEN
    RETURN true;
  END IF;

  -- Check feature availability based on subscription tier
  RETURN EXISTS (
    SELECT 1 
    FROM subscription_features f
    WHERE f.name = feature_name
    AND CASE 
      WHEN user_tier = 'starter' THEN f.starter
      WHEN user_tier = 'business' THEN f.business
      WHEN user_tier = 'premium' THEN f.premium
      ELSE false
    END
  );
END;
$$;

-- Function to handle trial expiration
CREATE OR REPLACE FUNCTION handle_trial_expiration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- If trial has expired, update subscription tier to null
  IF NEW.trial_end_date < now() AND NEW.subscription_tier = 'free_trial' THEN
    NEW.subscription_tier := null;
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger for trial expiration
CREATE TRIGGER check_trial_expiration
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_trial_expiration();