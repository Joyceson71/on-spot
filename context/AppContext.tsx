'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode, useCallback } from 'react';
import { Job, Application, UserProfile } from '@/types';
import { INITIAL_SHIFTS, INITIAL_DEALER_POSTS } from '@/lib/initialData';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';

export interface AdvancedFilters {
  categories: string[];
  dateFilter: string | null;
  duration: string | null;
  gender: string | null;
  location: { name: string; lat: number; lng: number } | null;
  distanceKm: number | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
}

export interface AppContextType {
  userRole: 'seeker' | 'dealer';
  setUserRole: (role: 'seeker' | 'dealer') => void;
  shifts: Job[];
  dealerPosts: Job[];
  appliedJobs: Application[];
  appliedJobIds: Set<string>;
  bookmarkedJobIds: Set<string>;
  completedJobs: Job[];
  activeCategory: string;
  activeFilterChips: Set<string>;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  userProfile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  isAuthenticated: boolean;
  activeSection: 'home' | 'other' | 'saved';
  openSection: (section: 'home' | 'other' | 'saved') => void;
  activeModalShift: Job | null;
  activeModal: string | null;
  openModals: Set<string>;
  isModalOpen: (modalId: string) => boolean;
  openModal: (modalId: string, shift?: Job | null) => void;
  closeModal: (modalId?: string) => void;
  closeAllModals: () => void;
  isProfileDrawerOpen: boolean;
  openProfileDrawer: () => void;
  closeProfileDrawer: () => void;
  isSettingsDrawerOpen: boolean;
  openSettingsDrawer: () => void;
  closeSettingsDrawer: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  advancedFilters: AdvancedFilters;
  setAdvancedFilters: React.Dispatch<React.SetStateAction<AdvancedFilters>>;
  resetFilters: () => void;
  selectCategory: (cat: string) => void;
  toggleFilterChip: (chip: string) => void;
  setGenderFilter: (val: string) => void;
  applyForJob: (job: Job) => Promise<void>;
  toggleBookmark: (jobId: string) => Promise<void>;
  addNewJob: (newJob: Job) => Promise<void>;
  login: (email?: string, password?: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  filteredJobs: Job[];
}

export const defaultUserProfile: UserProfile = {
  id: 'user_default',
  name: 'Franklin Stanly',
  phone: '+91 98402 88192',
  email: 'franklin@example.com',
  city: 'Chennai, Tamil Nadu',
  upiId: 'franklin@okaxis',
  role: 'seeker',
  rating: 4.9,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
};

const defaultAdvancedFilters: AdvancedFilters = {
  categories: [],
  dateFilter: null,
  duration: null,
  gender: null,
  location: null,
  distanceKm: null,
  salaryMin: null,
  salaryMax: null,
};

const isUUID = (str?: string | null): boolean =>
  Boolean(str && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str));

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<'seeker' | 'dealer'>('seeker');
  const [shifts, setShifts] = useState<Job[]>(INITIAL_SHIFTS);
  const [dealerPosts, setDealerPosts] = useState<Job[]>(INITIAL_DEALER_POSTS);
  const [appliedJobs, setAppliedJobs] = useState<Application[]>([]);
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());
  const [bookmarkedJobIds, setBookmarkedJobIds] = useState<Set<string>>(new Set());
  const [completedJobs, setCompletedJobs] = useState<Job[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeFilterChips, setActiveFilterChips] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<'home' | 'other' | 'saved'>('home');
  const [activeModalShift, setActiveModalShift] = useState<Job | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [openModals, setOpenModals] = useState<Set<string>>(new Set());
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState<boolean>(false);
  const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>(defaultAdvancedFilters);

  // Map Supabase Job Row to Frontend Job Type
  const mapDbRowToJob = useCallback((row: any): Job => ({
    id: row.id,
    category: row.category,
    categoryDisplay: row.category_display || row.category,
    title: row.title,
    dealerName: row.dealer_name,
    dealerRating: Number(row.dealer_rating) || 5.0,
    image: row.image_url || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    pay: row.pay,
    payType: row.pay_type || 'Per Shift',
    rawPay: Number(row.raw_pay) || 800,
    loc: row.location,
    lat: row.lat || undefined,
    lng: row.lng || undefined,
    date: row.date,
    dateType: row.date_type || 'upcoming',
    time: row.time,
    durationHours: row.duration_hours ? Number(row.duration_hours) : undefined,
    slotsTotal: Number(row.slots_total) || 1,
    slotsFilled: Number(row.slots_filled) || 0,
    urgent: Boolean(row.urgent),
    instantPay: Boolean(row.instant_pay),
    genderReq: row.gender_req || 'any',
    perks: Array.isArray(row.perks) ? row.perks : [],
    requirements: row.requirements || '',
    dressCode: row.dress_code || '',
    description: row.description || '',
    phone: row.phone || '',
  }), []);

  // Database synchronization helpers
  const syncUserProfile = useCallback(async (userId: string, email?: string) => {
    if (!isSupabaseConfigured() || !isUUID(userId)) return;
    const supabase = getSupabaseBrowserClient();
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profile) {
        const updated: UserProfile = {
          id: profile.id,
          name: profile.name || email?.split('@')[0] || 'User',
          phone: profile.phone || '',
          email: profile.email || email || '',
          city: profile.city || 'Chennai, Tamil Nadu',
          upiId: profile.upi_id || '',
          role: profile.role === 'dealer' ? 'dealer' : 'seeker',
          rating: Number(profile.rating) || 5.0,
          avatarUrl: profile.avatar_url || defaultUserProfile.avatarUrl,
        };
        setUserProfile(updated);
        setUserRole(updated.role === 'dealer' ? 'dealer' : 'seeker');
        try {
          localStorage.setItem('onspot_profile', JSON.stringify(updated));
        } catch {}
      } else {
        // Upsert default profile row if trigger was delayed
        const defaultName = email ? email.split('@')[0] : 'User';
        const { data: inserted } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            name: defaultName,
            email: email || '',
            role: 'seeker',
            rating: 5.0,
          })
          .select()
          .single();

        if (inserted) {
          const updated: UserProfile = {
            id: inserted.id,
            name: inserted.name,
            phone: inserted.phone || '',
            email: inserted.email || email || '',
            city: inserted.city || 'Chennai, Tamil Nadu',
            upiId: inserted.upi_id || '',
            role: inserted.role === 'dealer' ? 'dealer' : 'seeker',
            rating: Number(inserted.rating) || 5.0,
            avatarUrl: inserted.avatar_url || defaultUserProfile.avatarUrl,
          };
          setUserProfile(updated);
          setUserRole(updated.role === 'dealer' ? 'dealer' : 'seeker');
          try {
            localStorage.setItem('onspot_profile', JSON.stringify(updated));
          } catch {}
        }
      }
    } catch (e) {
      console.warn('Sync profile error:', e);
    }
  }, []);

  const syncUserApplications = useCallback(async (userId: string) => {
    if (!isSupabaseConfigured() || !isUUID(userId)) return;
    const supabase = getSupabaseBrowserClient();
    try {
      const { data: apps, error } = await supabase
        .from('applications')
        .select('*, jobs(*)')
        .eq('user_id', userId)
        .order('applied_at', { ascending: false });

      if (!error && apps && apps.length > 0) {
        const mapped: Application[] = apps.map((a: any) => ({
          id: a.id,
          jobId: a.job_id,
          userId: a.user_id,
          userName: userProfile.name,
          userPhone: userProfile.phone,
          status: a.status || 'Applied',
          appliedAt: a.applied_at,
          job: a.jobs ? mapDbRowToJob(a.jobs) : undefined,
        }));
        setAppliedJobs(mapped);
        setAppliedJobIds(new Set(mapped.map((m) => m.jobId)));
        try {
          localStorage.setItem('onspot_applied_jobs', JSON.stringify(mapped));
        } catch {}
      }
    } catch (e) {
      console.warn('Sync applications error:', e);
    }
  }, [mapDbRowToJob, userProfile.name, userProfile.phone]);

  const syncUserBookmarks = useCallback(async (userId: string) => {
    if (!isSupabaseConfigured() || !isUUID(userId)) return;
    const supabase = getSupabaseBrowserClient();
    try {
      const { data: saved, error } = await supabase
        .from('saved_jobs')
        .select('job_id')
        .eq('user_id', userId);

      if (!error && saved) {
        const ids = new Set(saved.map((s: any) => s.job_id));
        setBookmarkedJobIds(ids);
        try {
          localStorage.setItem('onspot_bookmarks', JSON.stringify(Array.from(ids)));
        } catch {}
      }
    } catch (e) {
      console.warn('Sync bookmarks error:', e);
    }
  }, []);

  const syncDealerPosts = useCallback(async (userId: string) => {
    if (!isSupabaseConfigured() || !isUUID(userId)) return;
    const supabase = getSupabaseBrowserClient();
    try {
      const { data: posts, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('dealer_id', userId)
        .order('created_at', { ascending: false });

      if (!error && posts && posts.length > 0) {
        setDealerPosts(posts.map(mapDbRowToJob));
      }
    } catch (e) {
      console.warn('Sync dealer posts error:', e);
    }
  }, [mapDbRowToJob]);

  // Hydrate from localStorage & Supabase
  useEffect(() => {
    // 1. Initial Local Storage Hydration
    try {
      const savedApplied = localStorage.getItem('onspot_applied_jobs');
      if (savedApplied) {
        const parsed = JSON.parse(savedApplied);
        setAppliedJobs(parsed);
        setAppliedJobIds(new Set(parsed.map((a: Application) => a.jobId)));
      }
      const savedCompleted = localStorage.getItem('onspot_completed_jobs');
      if (savedCompleted) {
        setCompletedJobs(JSON.parse(savedCompleted));
      }
      const savedBookmarks = localStorage.getItem('onspot_bookmarks');
      if (savedBookmarks) {
        setBookmarkedJobIds(new Set(JSON.parse(savedBookmarks)));
      }
      const savedProfile = localStorage.getItem('onspot_profile');
      if (savedProfile) {
        setUserProfile((prev) => ({ ...prev, ...JSON.parse(savedProfile) }));
      }
      const savedAuth = localStorage.getItem('onspot_auth');
      if (savedAuth !== null) {
        setIsAuthenticated(savedAuth === 'true');
      }
      const savedTheme = localStorage.getItem('onspot-theme') as 'dark' | 'light';
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (e) {
      console.warn('Storage sync error:', e);
    }

    // 2. Supabase Integration
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseBrowserClient();

      // Fetch live jobs from Supabase
      supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data: jobsData, error }) => {
          if (!error && jobsData && jobsData.length > 0) {
            const mapped = jobsData.map(mapDbRowToJob);
            setShifts(mapped);
            setDealerPosts(mapped);
          }
        });

      // Realtime subscription for jobs
      const jobsChannel = supabase
        .channel('public:jobs')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'jobs' },
          (payload) => {
            if (payload.eventType === 'INSERT') {
              const newJob = mapDbRowToJob(payload.new);
              setShifts((prev) => [newJob, ...prev.filter((j) => j.id !== newJob.id)]);
              setDealerPosts((prev) => [newJob, ...prev.filter((j) => j.id !== newJob.id)]);
            } else if (payload.eventType === 'UPDATE') {
              const updatedJob = mapDbRowToJob(payload.new);
              setShifts((prev) => prev.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
              setDealerPosts((prev) => prev.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
            } else if (payload.eventType === 'DELETE') {
              setShifts((prev) => prev.filter((j) => j.id !== payload.old.id));
              setDealerPosts((prev) => prev.filter((j) => j.id !== payload.old.id));
            }
          }
        )
        .subscribe();

      // Check active auth session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setIsAuthenticated(true);
          syncUserProfile(session.user.id, session.user.email);
          syncUserApplications(session.user.id);
          syncUserBookmarks(session.user.id);
          syncDealerPosts(session.user.id);
        }
      });

      // Listen to auth state changes
      const {
        data: { subscription: authSubscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        const isAuth = Boolean(session?.user);
        setIsAuthenticated(isAuth);
        try {
          localStorage.setItem('onspot_auth', isAuth ? 'true' : 'false');
        } catch {}

        if (session?.user) {
          syncUserProfile(session.user.id, session.user.email);
          syncUserApplications(session.user.id);
          syncUserBookmarks(session.user.id);
          syncDealerPosts(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUserProfile(defaultUserProfile);
          setAppliedJobs([]);
          setAppliedJobIds(new Set());
          setBookmarkedJobIds(new Set());
        }
      });

      return () => {
        supabase.removeChannel(jobsChannel);
        authSubscription.unsubscribe();
      };
    }
  }, [mapDbRowToJob, syncDealerPosts, syncUserApplications, syncUserBookmarks, syncUserProfile]);

  const setTheme = (t: 'dark' | 'light') => {
    setThemeState(t);
    if (typeof document !== 'undefined') {
      if (t === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
    try {
      localStorage.setItem('onspot-theme', t);
    } catch {}
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const openSection = (sec: 'home' | 'other' | 'saved') => {
    setActiveSection(sec);
  };

  const isModalOpen = (modalId: string) => {
    return openModals.has(modalId) || activeModal === modalId;
  };

  const openModal = (modalId: string, shift?: Job | null) => {
    if (shift) setActiveModalShift(shift);
    setActiveModal(modalId);
    setOpenModals((prev) => {
      const next = new Set(prev);
      next.add(modalId);
      return next;
    });
  };

  const closeModal = (modalId?: string) => {
    if (!modalId) {
      setActiveModal(null);
      setOpenModals(new Set());
    } else {
      setOpenModals((prev) => {
        const next = new Set(prev);
        next.delete(modalId);
        return next;
      });
      if (activeModal === modalId) {
        setActiveModal(null);
      }
    }
  };

  const closeAllModals = () => {
    setActiveModal(null);
    setOpenModals(new Set());
    setIsProfileDrawerOpen(false);
    setIsSettingsDrawerOpen(false);
  };

  const openProfileDrawer = () => setIsProfileDrawerOpen(true);
  const closeProfileDrawer = () => setIsProfileDrawerOpen(false);

  const openSettingsDrawer = () => setIsSettingsDrawerOpen(true);
  const closeSettingsDrawer = () => setIsSettingsDrawerOpen(false);

  const selectCategory = (cat: string) => {
    setActiveCategory(cat);
  };

  const toggleFilterChip = (chip: string) => {
    setActiveFilterChips((prev) => {
      const next = new Set(prev);
      if (next.has(chip)) {
        next.delete(chip);
      } else {
        next.add(chip);
      }
      return next;
    });
  };

  const setGenderFilter = (val: string) => {
    setActiveFilterChips((prev) => {
      const next = new Set(prev);
      next.delete('boys');
      next.delete('girls');
      if (val === 'boys') next.add('boys');
      else if (val === 'girls') next.add('girls');
      return next;
    });
  };

  const resetFilters = () => {
    setActiveCategory('All');
    setActiveFilterChips(new Set());
    setSearchQuery('');
    setSortBy('recommended');
    setAdvancedFilters(defaultAdvancedFilters);
    setActiveSection('home');
  };

  const applyForJob = async (job: Job) => {
    if (appliedJobIds.has(job.id)) {
      showToast('⚠️ You have already applied for this shift!');
      return;
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      userId: userProfile.id,
      userName: userProfile.name,
      userPhone: userProfile.phone,
      status: 'Applied',
      appliedAt: new Date().toISOString(),
      job: job,
    };

    const updatedApps = [newApp, ...appliedJobs];
    const updatedIds = new Set(appliedJobIds);
    updatedIds.add(job.id);
    setAppliedJobs(updatedApps);
    setAppliedJobIds(updatedIds);

    // Increment slots locally
    setShifts((prev) =>
      prev.map((s) => (s.id === job.id ? { ...s, slotsFilled: s.slotsFilled + 1 } : s))
    );

    try {
      localStorage.setItem('onspot_applied_jobs', JSON.stringify(updatedApps));
    } catch {}

    // Cloud database mutation via API route
    if (isSupabaseConfigured()) {
      try {
        await fetch('/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            job_id: job.id,
            user_id: userProfile.id,
          }),
        });
      } catch (err) {
        console.warn('Application sync error:', err);
      }
    }

    closeModal('shift-modal');
    showToast(`✅ Successfully applied for "${job.title}"!`);
  };

  const toggleBookmark = async (jobId: string) => {
    const isBookmarked = bookmarkedJobIds.has(jobId);
    setBookmarkedJobIds((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
        showToast('Bookmark removed');
      } else {
        next.add(jobId);
        showToast('Shift saved to bookmarks!');
      }
      try {
        localStorage.setItem('onspot_bookmarks', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });

    if (isSupabaseConfigured() && isUUID(jobId) && isUUID(userProfile.id)) {
      try {
        const supabase = getSupabaseBrowserClient();
        if (isBookmarked) {
          await supabase
            .from('saved_jobs')
            .delete()
            .match({ user_id: userProfile.id, job_id: jobId });
        } else {
          await supabase.from('saved_jobs').insert({
            user_id: userProfile.id,
            job_id: jobId,
          });
        }
      } catch (err) {
        console.warn('Supabase bookmark sync error:', err);
      }
    }
  };

  const addNewJob = async (newJob: Job) => {
    // Local optimistic update
    setShifts((prev) => [newJob, ...prev]);
    setDealerPosts((prev) => [newJob, ...prev]);
    showToast('✅ Work requirement posted successfully!');

    if (isSupabaseConfigured()) {
      try {
        const res = await fetch('/api/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: newJob.title,
            category: newJob.category,
            category_display: newJob.categoryDisplay,
            dealer_name: newJob.dealerName,
            dealer_rating: newJob.dealerRating,
            pay: newJob.pay,
            pay_type: newJob.payType,
            raw_pay: newJob.rawPay,
            location: newJob.loc,
            date: newJob.date,
            date_type: newJob.dateType,
            time: newJob.time,
            slots_total: newJob.slotsTotal,
            urgent: newJob.urgent,
            instant_pay: newJob.instantPay,
            gender_req: newJob.genderReq,
            perks: newJob.perks || [],
            requirements: newJob.requirements,
            dress_code: newJob.dressCode,
            description: newJob.description,
            phone: newJob.phone,
            dealer_id: isUUID(userProfile.id) ? userProfile.id : undefined,
          }),
        });

        if (res.ok) {
          const created = await res.json();
          if (created?.id) {
            const mapped = mapDbRowToJob(created);
            // Replace optimistic job ID with generated database UUID
            setShifts((prev) => prev.map((j) => (j.id === newJob.id ? mapped : j)));
            setDealerPosts((prev) => prev.map((j) => (j.id === newJob.id ? mapped : j)));
          }
        }
      } catch (err) {
        console.warn('Supabase job post sync error:', err);
      }
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem('onspot_profile', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast('Profile updated successfully!');

    if (isSupabaseConfigured() && isUUID(userProfile.id)) {
      try {
        const supabase = getSupabaseBrowserClient();
        await supabase
          .from('profiles')
          .update({
            name: data.name,
            phone: data.phone,
            city: data.city,
            upi_id: data.upiId,
            avatar_url: data.avatarUrl,
          })
          .eq('id', userProfile.id);
      } catch (err) {
        console.warn('Supabase profile update sync error:', err);
      }
    }
  };

  const login = async (email?: string, password?: string) => {
    if (isSupabaseConfigured() && email && password) {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.toLowerCase().includes('email not confirmed')) {
            showToast('⚠️ Email not confirmed. Please check your inbox.');
          } else {
            showToast(`⚠️ Login failed: ${error.message}`);
          }
          return;
        }

        if (data.user) {
          setIsAuthenticated(true);
          await syncUserProfile(data.user.id, data.user.email);
          await syncUserApplications(data.user.id);
          await syncUserBookmarks(data.user.id);
          await syncDealerPosts(data.user.id);
          showToast(`Welcome back, ${data.user.email?.split('@')[0] || userProfile.name}!`);
          closeModal('login-modal');
          return;
        }
      } catch (err: any) {
        console.warn('Supabase login error:', err);
      }
    }

    setIsAuthenticated(true);
    try {
      localStorage.setItem('onspot_auth', 'true');
    } catch {}
    closeModal('login-modal');
    showToast(`Welcome back, ${userProfile.name}!`);
  };

  const signup = async (email: string, password: string, name?: string) => {
    if (isSupabaseConfigured() && email && password) {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name || email.split('@')[0],
            },
          },
        });

        if (error) {
          showToast(`⚠️ Signup error: ${error.message}`);
          return;
        }

        if (data.user) {
          setIsAuthenticated(true);
          await syncUserProfile(data.user.id, data.user.email);
          showToast(`🎉 Account created! Welcome, ${name || email.split('@')[0]}!`);
          closeModal('login-modal');
          return;
        }
      } catch (err: any) {
        showToast(`⚠️ Signup error: ${err?.message || 'Failed'}`);
      }
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseBrowserClient();
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase signOut error:', err);
      }
    }

    setIsAuthenticated(false);
    setUserProfile(defaultUserProfile);
    setAppliedJobs([]);
    setAppliedJobIds(new Set());
    setBookmarkedJobIds(new Set());

    try {
      localStorage.setItem('onspot_auth', 'false');
      localStorage.removeItem('onspot_profile');
      localStorage.removeItem('onspot_applied_jobs');
      localStorage.removeItem('onspot_bookmarks');
    } catch {}

    closeProfileDrawer();
    showToast('Logged out successfully.');
  };

  // Filtered dataset
  const filteredJobs = useMemo(() => {
    const dataset = userRole === 'seeker' ? shifts : dealerPosts;

    let result = activeCategory === 'All'
      ? dataset
      : dataset.filter((item) => item.category === activeCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((item) => {
        const target = `${item.title} ${item.loc} ${item.category} ${item.dealerName} ${(item.perks || []).join(' ')}`.toLowerCase();
        return target.includes(q);
      });
    }

    if (activeFilterChips.size > 0) {
      if (activeFilterChips.has('today')) {
        result = result.filter((item) => item.dateType === 'today');
      }
      if (activeFilterChips.has('highpay')) {
        result = result.filter((item) => (item.rawPay || 0) >= 800);
      }
      if (activeFilterChips.has('instant')) {
        result = result.filter((item) => item.instantPay === true);
      }
      if (activeFilterChips.has('urgent')) {
        result = result.filter((item) => item.urgent === true);
      }
      if (activeFilterChips.has('meals')) {
        result = result.filter((item) =>
          (item.perks || []).some(
            (p) =>
              p.toLowerCase().includes('dinner') ||
              p.toLowerCase().includes('lunch') ||
              p.toLowerCase().includes('food') ||
              p.toLowerCase().includes('snack') ||
              p.toLowerCase().includes('breakfast')
          )
        );
      }
      if (activeFilterChips.has('boys')) {
        result = result.filter((item) => {
          if (!item.genderReq) return false;
          const val = item.genderReq.toLowerCase().trim();
          return ['boys', 'boys only', 'male only', 'boy', 'male', 'men'].includes(val);
        });
      }
      if (activeFilterChips.has('girls')) {
        result = result.filter((item) => {
          if (!item.genderReq) return false;
          const val = item.genderReq.toLowerCase().trim();
          return ['girls', 'girls only', 'female only', 'girl', 'female', 'women'].includes(val);
        });
      }
    }

    const af = advancedFilters;
    if (af.categories && af.categories.length > 0) {
      result = result.filter((item) => af.categories.includes(item.category));
    }
    if (af.dateFilter) {
      result = result.filter((item) => item.dateType === af.dateFilter);
    }
    if (af.duration) {
      result = result.filter((item) => {
        const h = item.durationHours;
        if (h == null) return true;
        if (af.duration === 'short') return h < 4;
        if (af.duration === 'medium') return h >= 4 && h <= 6;
        if (af.duration === 'long') return h > 6;
        return true;
      });
    }
    if (af.gender && af.gender !== 'any') {
      result = result.filter((item) => {
        if (!item.genderReq) return false;
        const val = item.genderReq.toLowerCase().trim();
        if (af.gender === 'boys') {
          return ['boys', 'boys only', 'male only', 'boy', 'male', 'men'].includes(val);
        }
        if (af.gender === 'girls') {
          return ['girls', 'girls only', 'female only', 'girl', 'female', 'women'].includes(val);
        }
        return false;
      });
    }

    // Sort
    const sorted = [...result];
    if (sortBy === 'pay_desc') {
      sorted.sort((a, b) => (b.rawPay || 0) - (a.rawPay || 0));
    } else if (sortBy === 'slots_open') {
      sorted.sort((a, b) => (b.slotsTotal - b.slotsFilled) - (a.slotsTotal - a.slotsFilled));
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.dealerRating - a.dealerRating);
    }

    return sorted;
  }, [userRole, shifts, dealerPosts, activeCategory, searchQuery, activeFilterChips, advancedFilters, sortBy]);

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        shifts,
        dealerPosts,
        appliedJobs,
        appliedJobIds,
        bookmarkedJobIds,
        completedJobs,
        activeCategory,
        activeFilterChips,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        userProfile,
        updateProfile,
        isAuthenticated,
        activeSection,
        openSection,
        activeModalShift,
        activeModal,
        openModals,
        isModalOpen,
        openModal,
        closeModal,
        closeAllModals,
        isProfileDrawerOpen,
        openProfileDrawer,
        closeProfileDrawer,
        isSettingsDrawerOpen,
        openSettingsDrawer,
        closeSettingsDrawer,
        toastMessage,
        showToast,
        theme,
        setTheme,
        advancedFilters,
        setAdvancedFilters,
        resetFilters,
        selectCategory,
        toggleFilterChip,
        setGenderFilter,
        applyForJob,
        toggleBookmark,
        addNewJob,
        login,
        signup,
        logout,
        filteredJobs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
