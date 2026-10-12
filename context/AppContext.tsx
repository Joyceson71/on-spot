'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Job, Application, UserProfile, NotificationItem } from '@/types';
import { INITIAL_SHIFTS, INITIAL_DEALER_POSTS } from '@/lib/initialData';

interface AdvancedFilters {
  categories: string[];
  dateFilter: string | null;
  duration: string | null;
  gender: string | null;
  location: { name: string; lat: number; lng: number } | null;
  distanceKm: number | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
}

interface AppContextType {
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
  updateProfile: (profile: Partial<UserProfile>) => void;
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
  applyForJob: (job: Job) => void;
  toggleBookmark: (jobId: string) => void;
  addNewJob: (newJob: Job) => void;
  login: () => void;
  logout: () => void;
  filteredJobs: Job[];
}

const defaultUserProfile: UserProfile = {
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

  // Hydrate from localStorage on client mount
  useEffect(() => {
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
  }, []);

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

  const applyForJob = (job: Job) => {
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

    // Increment slots filled
    setShifts((prev) =>
      prev.map((s) => (s.id === job.id ? { ...s, slotsFilled: s.slotsFilled + 1 } : s))
    );

    try {
      localStorage.setItem('onspot_applied_jobs', JSON.stringify(updatedApps));
    } catch {}

    closeModal('shift-modal');
    showToast(`✅ Successfully applied for "${job.title}"!`);
  };

  const toggleBookmark = (jobId: string) => {
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
  };

  const addNewJob = (newJob: Job) => {
    setShifts((prev) => [newJob, ...prev]);
    setDealerPosts((prev) => [newJob, ...prev]);
    showToast('✅ Work requirement posted successfully!');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem('onspot_profile', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast('Profile updated successfully!');
  };

  const login = () => {
    setIsAuthenticated(true);
    try {
      localStorage.setItem('onspot_auth', 'true');
    } catch {}
    closeModal('login-modal');
    showToast('Welcome back, ' + userProfile.name + '!');
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.setItem('onspot_auth', 'false');
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
