import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CATS, EDU_TRACKS } from '../data/constants';

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { session, profile } = useAuth();

  const path = location.pathname;
  const isHome = path === '/';
  const isNews = path === '/news';
  const isFav = path === '/favorites';
  const isVote = path === '/vote';
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
        <button className="ts-nav-item" onClick={() => navigate('/vote')}>
          {isVote && <span className="ts-nav-dot" />}
          <span>Голосование</span>
        </button>
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
            {CATS.map((c) => (
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
            {EDU_TRACKS.map((t) => (
              <button
                key={t.key}
                className={`ts-nav-sub${path === `/education/${t.key.replace('edu-', '')}` ? ' active' : ''}`}
                onClick={() => navigate(`/education/${t.key.replace('edu-', '')}`)}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <div className="ts-sidebar-spacer" />

      <nav className="ts-nav ts-sidebar-foot">
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
