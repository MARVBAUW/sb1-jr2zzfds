/*
  # Add module-specific tables for project data

  1. New Tables
    - `moe_projects` (Maître d'œuvre projects)
    - `moa_projects` (Maître d'ouvrage projects)
    - `entreprise_projects` (Entreprise projects)
    - `particuliers_projects` (Particuliers projects)
    - `agents_projects` (Agents projects)

  2. Security
    - Enable RLS on all tables
    - Add policies for project management
*/

-- Maître d'œuvre projects
CREATE TABLE moe_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  budget numeric NOT NULL,
  duration text NOT NULL,
  status text NOT NULL CHECK (status IN ('draft', 'active', 'completed', 'cancelled')),
  type text NOT NULL CHECK (type IN ('construction', 'renovation', 'infrastructure')),
  client_info jsonb NOT NULL DEFAULT '{}'::jsonb,
  team_members jsonb NOT NULL DEFAULT '[]'::jsonb,
  documents text[] NOT NULL DEFAULT ARRAY[]::text[],
  planning jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Maître d'ouvrage projects
CREATE TABLE moa_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  investment_amount numeric NOT NULL,
  roi_target numeric NOT NULL,
  status text NOT NULL CHECK (status IN ('prospection', 'acquisition', 'development', 'operation')),
  type text NOT NULL CHECK (type IN ('residential', 'commercial', 'mixed_use')),
  financial_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  stakeholders jsonb NOT NULL DEFAULT '[]'::jsonb,
  documents text[] NOT NULL DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Entreprise projects
CREATE TABLE entreprise_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  order_number text NOT NULL,
  amount numeric NOT NULL,
  status text NOT NULL CHECK (status IN ('draft', 'pending', 'confirmed', 'delivered')),
  type text NOT NULL CHECK (type IN ('product', 'service', 'material')),
  client_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  delivery_info jsonb NOT NULL DEFAULT '{}'::jsonb,
  documents text[] NOT NULL DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Particuliers projects
CREATE TABLE particuliers_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  purchase_price numeric NOT NULL,
  rental_income numeric,
  status text NOT NULL CHECK (status IN ('owned', 'rented', 'for_sale', 'for_rent')),
  type text NOT NULL CHECK (type IN ('apartment', 'house', 'land', 'commercial')),
  property_details jsonb NOT NULL DEFAULT '{}'::jsonb,
  tenant_info jsonb NOT NULL DEFAULT '{}'::jsonb,
  documents text[] NOT NULL DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Agents projects
CREATE TABLE agents_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  price numeric NOT NULL,
  commission numeric NOT NULL,
  status text NOT NULL CHECK (status IN ('draft', 'active', 'under_offer', 'sold')),
  type text NOT NULL CHECK (type IN ('sale', 'rental')),
  property_details jsonb NOT NULL DEFAULT '{}'::jsonb,
  client_info jsonb NOT NULL DEFAULT '{}'::jsonb,
  documents text[] NOT NULL DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE moe_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE moa_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE entreprise_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE particuliers_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents_projects ENABLE ROW LEVEL SECURITY;

-- Create policies for each table
DO $$ 
DECLARE
  table_name text;
BEGIN
  FOR table_name IN 
    SELECT unnest(ARRAY[
      'moe_projects',
      'moa_projects',
      'entreprise_projects',
      'particuliers_projects',
      'agents_projects'
    ])
  LOOP
    -- Users can read their own projects
    EXECUTE format(
      'CREATE POLICY "Users can read own projects" ON %I
       FOR SELECT
       TO authenticated
       USING (auth.uid() = user_id)',
      table_name
    );

    -- Users can create their own projects
    EXECUTE format(
      'CREATE POLICY "Users can create own projects" ON %I
       FOR INSERT
       TO authenticated
       WITH CHECK (auth.uid() = user_id)',
      table_name
    );

    -- Users can update their own projects
    EXECUTE format(
      'CREATE POLICY "Users can update own projects" ON %I
       FOR UPDATE
       TO authenticated
       USING (auth.uid() = user_id)
       WITH CHECK (auth.uid() = user_id)',
      table_name
    );

    -- Users can delete their own projects
    EXECUTE format(
      'CREATE POLICY "Users can delete own projects" ON %I
       FOR DELETE
       TO authenticated
       USING (auth.uid() = user_id)',
      table_name
    );
  END LOOP;
END $$;

-- Create updated_at triggers for all tables
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DO $$ 
DECLARE
  table_name text;
BEGIN
  FOR table_name IN 
    SELECT unnest(ARRAY[
      'moe_projects',
      'moa_projects',
      'entreprise_projects',
      'particuliers_projects',
      'agents_projects'
    ])
  LOOP
    EXECUTE format(
      'CREATE TRIGGER update_%I_updated_at
       BEFORE UPDATE ON %I
       FOR EACH ROW
       EXECUTE FUNCTION update_updated_at_column()',
      table_name,
      table_name
    );
  END LOOP;
END $$;