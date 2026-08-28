import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { api } from '../lib/api';
import type { AdminPermKey, BanInfo, Profile } from '../types';

interface AuthContextValue {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  banInfo: BanInfo | null;
  hasPerm: (key: AdminPermKey) => boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function isActiveBan(info: BanInfo | null): boolean {
  if (!info?.isBanned) return false;
  if (!info.banExpiresAt) return true;
  return new Date(info.banExpiresAt).getTime() > Date.now();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [banInfo, setBanInfo] = useState<BanInfo | null>(null);

  async function checkBanStatus() {
    try {
      const info = await api.get<BanInfo>('/auth/ban-status');
      setBanInfo(isActiveBan(info) ? info : null);
      return isActiveBan(info);
    } catch {
      setBanInfo(null);
      return false;
    }
  }

  async function refreshProfile() {
    if (!session) {
      setProfile(null);
      setBanInfo(null);
      return;
    }
    try {
      const p = await api.get<Profile>('/profile');
      setProfile(p);
      setBanInfo(null);
    } catch (e) {
      setProfile(null);
      if (e instanceof Error && e.message.includes('заблокирован')) {
        await checkBanStatus();
      }
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    refreshProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  async function signOut() {
    await supabase.auth.signOut();
    setProfile(null);
    setBanInfo(null);
  }

  const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin';
  const isSuperAdmin = profile?.role === 'super_admin';

  function hasPerm(key: AdminPermKey): boolean {
    if (profile?.role === 'super_admin') return true;
    return profile?.adminPerms?.[key] === true;
  }

  return (
    <AuthContext.Provider
      value={{ session, profile, loading, isAdmin, isSuperAdmin, banInfo, hasPerm, refreshProfile, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
