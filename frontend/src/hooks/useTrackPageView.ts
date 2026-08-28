import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { trackPageView } from '../lib/tracking';

const EXCLUDED_PREFIXES = ['/admin', '/analytics'];

export function useTrackPageView() {
  const { pathname } = useLocation();
  const { session } = useAuth();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    if (EXCLUDED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return;
    trackPageView(pathname, !!session);
  }, [pathname, session]);
}
