import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export interface PublisherInfo {
  username: string | null;
  email: string | null;
}

export interface PublishInfo {
  publishedBy: PublisherInfo | null;
  publishedAt: string;
  /** Events only — who applied and when, for a card that came from a submission. */
  submission?: { submittedBy: PublisherInfo | null; submittedAt: string } | null;
}

const PATH: Record<'event' | 'news', string> = { event: 'events', news: 'news' };

/** Who published a card and when — super admin only (see SuperAdminGuard on the
 *  backend route). Skips the request entirely for anyone else. */
export function usePublishInfo(kind: 'event' | 'news', id: string): PublishInfo | null {
  const { isSuperAdmin } = useAuth();
  const [info, setInfo] = useState<PublishInfo | null>(null);

  useEffect(() => {
    if (!isSuperAdmin) {
      setInfo(null);
      return;
    }
    let cancelled = false;
    api
      .get<PublishInfo>(`/admin/${PATH[kind]}/${id}/publish-info`)
      .then((data) => {
        if (!cancelled) setInfo(data);
      })
      .catch(() => {
        if (!cancelled) setInfo(null);
      });
    return () => {
      cancelled = true;
    };
  }, [kind, id, isSuperAdmin]);

  return isSuperAdmin ? info : null;
}
