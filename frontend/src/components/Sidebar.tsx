import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEducationTracks } from '../hooks/useEducation';
import { NAV_CATS } from '../data/constants';

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { session, profile, isAdmin, isSuperAdmin } = useAuth();
  const { tracks } = useEducationTracks();

  const path = location.pathname;
  const isHome = path === '/';
  const isNews = path === '/news';
  const isFav = path === '/favorites';
  const isAdminPage = path === '/admin';
  const isAnalyticsPage = path === '/analytics';
  const isBarsPage = path === '/bars';
  const isUsersPage = path === '/users' || path.startsWith('/users/');
  const isOppsRoot = path.startsWith('/opportunities');
  const isEdu = path.startsWith('/education');
  const activeCategory = isOppsRoot ? params.category : undefined;

  const [oppsOpen, setOppsOpen] = useState(isOppsRoot);
  const [eduOpen, setEduOpen] = useState(isEdu);

  useEffect(() => {
    if (isOppsRoot) setOppsOpen(true);
    if (isEdu) setEduOpen(true);
  }, [isOppsRoot, isEdu]);

  const avatarLetter = session ? (profile?.username ?? '?').slice(0, 1).toUpperCase() : '?';
  const accountLabel = session ? profile?.username ?? '…' : 'Войти';

  return (
    <aside className="ts-sidebar">
      <button className="ts-account" onClick={() => navigate(session ? '/profile' : '/auth')}>
        <span className="ts-avatar">
          {profile?.avatarUrl ? <img src={profile.avatarUrl} alt={profile.username} /> : avatarLetter}
        </span>
        <span className="ts-account-label">{accountLabel}</span>
      </button>

      <nav className="ts-nav">
        <button className="ts-nav-item" onClick={() => navigate('/favorites')}>
          {isFav && <span className="ts-nav-dot" />}
          <span>Избранное</span>
        </button>
        {/* временно скрыто: страница голосования
        <button className="ts-nav-item" onClick={() => navigate('/vote')}>
          {isVote && <span className="ts-nav-dot" />}
          <span>Голосование</span>
        </button>
        */}
      </nav>

      <nav className="ts-nav">
        <button className="ts-nav-item big" onClick={() => navigate('/')}>
          {isHome && <span className="ts-nav-dot" />}
          <span>Главное</span>
        </button>
        <button className="ts-nav-item" onClick={() => navigate('/news')}>
          {isNews && <span className="ts-nav-dot" />}
          <span>Новости</span>
        </button>

        <button
          className="ts-nav-item ts-nav-parent"
          onClick={() => {
            setOppsOpen((v) => !v);
            navigate('/opportunities');
          }}
        >
          {isOppsRoot && <span className="ts-nav-dot" style={{ marginRight: 8 }} />}
          <span style={{ flex: 1 }}>Возможности</span>
          <span className={`arrow${oppsOpen ? ' open' : ''}`}>›</span>
        </button>
        {oppsOpen && (
          <div className="ts-nav-sub-wrap">
            {NAV_CATS.map((c) => (
              <button
                key={c.key}
                className={`ts-nav-sub${isOppsRoot && activeCategory === c.key ? ' active' : ''}`}
                onClick={() => navigate(`/opportunities/${c.key}`)}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        <button className="ts-nav-item ts-nav-parent" onClick={() => setEduOpen((v) => !v)}>
          <span style={{ flex: 1 }}>Образование</span>
          <span className={`arrow${eduOpen ? ' open' : ''}`}>›</span>
        </button>
        {eduOpen && (
          <div className="ts-nav-sub-wrap">
            {tracks.map((t) => (
              <button
                key={t.id}
                className={`ts-nav-sub${path === `/education/${t.id}` ? ' active' : ''}`}
                onClick={() => navigate(`/education/${t.id}`)}
              >
                {t.title}
              </button>
            ))}
          </div>
        )}
      </nav>

      <div className="ts-sidebar-spacer" />

      <nav className="ts-nav ts-sidebar-foot">
        {isSuperAdmin && (
          <button className="ts-nav-item" onClick={() => navigate('/users')}>
            {isUsersPage && <span className="ts-nav-dot" />}
            <span>Пользователи</span>
          </button>
        )}
        {isSuperAdmin && (
          <button className="ts-nav-item" onClick={() => navigate('/analytics')}>
            {isAnalyticsPage && <span className="ts-nav-dot" />}
            <span>Аналитика</span>
          </button>
        )}
        {isSuperAdmin && (
          <button className="ts-nav-item" onClick={() => navigate('/bars')}>
            {isBarsPage && <span className="ts-nav-dot" />}
            <span>Барс</span>
          </button>
        )}
        {isAdmin && (
          <button className="ts-nav-item" onClick={() => navigate('/admin')}>
            {isAdminPage && <span className="ts-nav-dot" />}
            <span>Админ</span>
          </button>
        )}
        <button className="ts-nav-item" onClick={() => navigate('/publish')}>
          Опубликовать
        </button>
        <button className="ts-nav-item" onClick={() => navigate('/settings')}>
          Настройки
        </button>
      </nav>
    </aside>
  );
}
