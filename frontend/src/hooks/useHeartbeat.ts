import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { sendHeartbeat } from '../lib/tracking';

const INTERVAL_MS = 25000;

export function useHeartbeat() {
  const { session } = useAuth();

  useEffect(() => {
    const isLoggedIn = !!session;
    const tick = () => {
      if (document.visibilityState === 'visible') sendHeartbeat(isLoggedIn);
    };

    tick();
    const interval = window.setInterval(tick, INTERVAL_MS);

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') tick();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [session]);
}
