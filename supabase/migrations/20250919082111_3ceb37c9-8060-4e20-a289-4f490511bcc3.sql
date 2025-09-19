-- Create profiles table for career advisor app
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  interests TEXT NOT NULL,
  background TEXT NOT NULL,
  ai_result JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for testing (allow read/write for everyone)
CREATE POLICY "Allow public read access to profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert access to profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update access to profiles" 
ON public.profiles 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();