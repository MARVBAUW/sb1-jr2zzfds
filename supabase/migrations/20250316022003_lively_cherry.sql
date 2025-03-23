/*
  # Create articles table for regulatory watch

  1. New Tables
    - `articles`
      - `id` (uuid, primary key)
      - `title` (text, unique)
      - `description` (text)
      - `date` (timestamp with time zone)
      - `category` (text)
      - `importance` (text)
      - `icon` (text)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `articles` table
    - Add policies for authenticated users to read articles
*/

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text UNIQUE NOT NULL,
  description text NOT NULL,
  date timestamptz NOT NULL,
  category text NOT NULL,
  importance text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read articles"
  ON articles
  FOR SELECT
  TO authenticated
  USING (true);