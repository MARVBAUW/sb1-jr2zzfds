-- Add trigger to automatically set trial period on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email,
    subscription_tier,
    trial_start_date,
    trial_end_date
  )
  VALUES (
    new.id,
    new.email,
    'free_trial',
    now(),
    now() + interval '15 days'
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create new trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();