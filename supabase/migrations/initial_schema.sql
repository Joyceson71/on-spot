-- ============================================================================
-- ONSPOP DATABASE SCHEMA & RLS POLICIES (idempotent / safe to re-run)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. PROFILES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  city TEXT DEFAULT 'Chennai, Tamil Nadu',
  upi_id TEXT,
  role TEXT NOT NULL DEFAULT 'seeker' CHECK (role IN ('seeker', 'dealer', 'admin')),
  rating NUMERIC(2, 1) DEFAULT 5.0,
  avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ----------------------------------------------------------------------------
-- 2. JOBS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  category_display TEXT,
  title TEXT NOT NULL,
  dealer_name TEXT NOT NULL,
  dealer_rating NUMERIC(2, 1) DEFAULT 5.0,
  image_url TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
  pay TEXT NOT NULL,
  pay_type TEXT NOT NULL DEFAULT 'Per Shift',
  raw_pay INTEGER NOT NULL DEFAULT 800,
  venue_name TEXT,
  location TEXT NOT NULL,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  date TEXT NOT NULL,
  date_type TEXT DEFAULT 'upcoming',
  time TEXT NOT NULL,
  reporting_time TEXT,
  duration_hours NUMERIC(3, 1),
  slots_total INTEGER NOT NULL DEFAULT 1,
  slots_filled INTEGER NOT NULL DEFAULT 0,
  urgent BOOLEAN DEFAULT FALSE,
  instant_pay BOOLEAN DEFAULT FALSE,
  gender_req TEXT DEFAULT 'any',
  perks TEXT[] DEFAULT '{}',
  requirements TEXT,
  dress_code TEXT,
  description TEXT,
  phone TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Your live table already has start_at (NOT NULL), which this file didn't define.
-- These lines make a fresh database match it, and do nothing if the columns exist.
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS start_at TIMESTAMPTZ;
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS end_at TIMESTAMPTZ;

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Jobs are viewable by everyone" ON public.jobs;
CREATE POLICY "Jobs are viewable by everyone"
  ON public.jobs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Dealers can insert jobs" ON public.jobs;
CREATE POLICY "Dealers can insert jobs"
  ON public.jobs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Dealers can update their own jobs" ON public.jobs;
CREATE POLICY "Dealers can update their own jobs"
  ON public.jobs FOR UPDATE USING (auth.uid() = dealer_id);

DROP POLICY IF EXISTS "Dealers can delete their own jobs" ON public.jobs;
CREATE POLICY "Dealers can delete their own jobs"
  ON public.jobs FOR DELETE USING (auth.uid() = dealer_id);

-- ----------------------------------------------------------------------------
-- 3. APPLICATIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'Applied' CHECK (status IN ('Applied', 'Under Review', 'Accepted', 'Declined', 'Completed', 'Cancelled')),
  payment_id TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_id, user_id)
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own applications or dealers can view applicants for their jobs" ON public.applications;
CREATE POLICY "Users can view their own applications or dealers can view applicants for their jobs"
  ON public.applications FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM public.jobs WHERE jobs.id = applications.job_id AND jobs.dealer_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can apply for shifts" ON public.applications;
CREATE POLICY "Users can apply for shifts"
  ON public.applications FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users or dealers can update applications" ON public.applications;
CREATE POLICY "Users or dealers can update applications"
  ON public.applications FOR UPDATE
  USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM public.jobs WHERE jobs.id = applications.job_id AND jobs.dealer_id = auth.uid())
  );

-- ----------------------------------------------------------------------------
-- 4. SAVED JOBS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own saved jobs" ON public.saved_jobs;
CREATE POLICY "Users can view their own saved jobs"
  ON public.saved_jobs FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can save jobs" ON public.saved_jobs;
CREATE POLICY "Users can save jobs"
  ON public.saved_jobs FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their saved jobs" ON public.saved_jobs;
CREATE POLICY "Users can delete their saved jobs"
  ON public.saved_jobs FOR DELETE USING (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- 5. MESSAGES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id TEXT NOT NULL,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view messages they sent or received" ON public.messages;
CREATE POLICY "Users can view messages they sent or received"
  ON public.messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

DROP POLICY IF EXISTS "Users can send messages" ON public.messages;
CREATE POLICY "Users can send messages"
  ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS "Receivers can update message read status" ON public.messages;
CREATE POLICY "Receivers can update message read status"
  ON public.messages FOR UPDATE USING (auth.uid() = receiver_id);

-- ----------------------------------------------------------------------------
-- 6. NOTIFICATIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'job_alert',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their notifications" ON public.notifications;
CREATE POLICY "Users can update their notifications"
  ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- 7. AUTH TRIGGER: AUTO-CREATE PROFILE ON SIGNUP
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'seeker')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 8. REALTIME (only adds tables not already in the publication)
-- ----------------------------------------------------------------------------
DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['jobs', 'messages', 'applications', 'notifications']
  LOOP
    IF NOT EXISTS (
      SELECT 1 FROM pg_publication_tables
      WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = t
    ) THEN
      EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I', t);
    END IF;
  END LOOP;
END $$;