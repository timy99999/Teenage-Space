import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function SearchIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.2" y2="16.2" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5C4 4.67 4.67 4 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z" />
      <path d="M20 5.5c0-.83-.67-1.5-1.5-1.5H12v16h6.5a1.5 1.5 0 0 0 1.5-1.5v-13Z" />
    </svg>
  );
}

function NewsIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="14" rx="1.5" />
      <line x1="7" y1="9" x2="12" y2="9" />
      <line x1="7" y1="12.5" x2="17" y2="12.5" />
      <line x1="7" y1="15.5" x2="17" y2="15.5" />
      <line x1="14.5" y1="9" x2="17" y2="9" />
    </svg>
  );
}

function PublishIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="21" y1="3" x2="10.5" y2="13.5" />
      <path d="M21 3 14.5 21c-.15.4-.7.42-.9.03L10.5 13.5 3 10.4c-.4-.2-.38-.75.03-.9L21 3Z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { key: 'opps', label: 'Возможности', to: '/opportunities', match: (p: string) => p.startsWith('/opportunities'), Icon: SearchIcon },
  { key: 'edu', label: 'Образование', to: '/education/nct', match: (p: string) => p.startsWith('/education') || p.startsWith('/article'), Icon: BookIcon },
  { key: 'news', label: 'Новости', to: '/news', match: (p: string) => p === '/news', Icon: NewsIcon },
  { key: 'publish', label: 'Опубликовать', to: '/publish', match: (p: string) => p === '/publish', Icon: PublishIcon }
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, profile } = useAuth();
  const path = location.pathname;

  const accountActive = path === '/profile' || path === '/settings' || path === '/favorites' || path === '/vote';
  const avatarLetter = session ? (profile?.username ?? '?').slice(0, 1).toUpperCase() : '?';

  return (
    <nav className="ts-bottomnav">
      {NAV_ITEMS.map(({ key, label, to, match, Icon }) => {
        const active = match(path);
        return (
          <button
            key={key}
            className={`ts-bottomnav-btn${active ? ' active' : ''}`}
            aria-label={label}
            onClick={() => navigate(to)}
          >
            <Icon />
          </button>
        );
      })}
      <button
        className={`ts-bottomnav-btn account${accountActive ? ' active' : ''}`}
        aria-label="Аккаунт"
        onClick={() => navigate(session ? '/profile' : '/auth')}
      >
        <span className="ts-bottomnav-avatar">
          {profile?.avatarUrl ? <img src={profile.avatarUrl} alt={profile.username} /> : avatarLetter}
        </span>
      </button>
    </nav>
  );
}
