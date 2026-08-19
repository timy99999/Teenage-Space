import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';
import { useSubmissions } from '../hooks/useSubmissions';
import { api } from '../lib/api';
import type { Profile } from '../types';

const STATUS_LABEL: Record<string, string> = {
  pending: 'На проверке',
  approved: 'Одобрено',
  rejected: 'Отклонено'
};

export function ProfilePage() {
  const navigate = useNavigate();
  const { session, profile, refreshProfile } = useAuth();
  const { theme, setTheme, flash } = useUI();
  const { submissions } = useSubmissions();

  if (!session) return <Navigate to="/auth" replace />;

  async function setThemeAndPersist(next: 'light' | 'dark') {
    setTheme(next);
    await api.patch<Profile>('/profile', { theme: next }).then(refreshProfile).catch(() => {});
  }

  async function toggleNotif() {
    if (!profile) return;
    await api.patch<Profile>('/profile', { notifOptIn: !profile.notifOptIn }).then(refreshProfile).catch(() => {});
  }

  const notifOn = !!profile?.notifOptIn;

  return (
    <div className="ts-page">
      <h1 className="ts-page-title">Профиль</h1>

      <div className="ts-account-links">
        <button className="ts-account-link" onClick={() => navigate('/favorites')}>
          <span>Избранное</span>
          <span className="arrow">→</span>
        </button>
        <button className="ts-account-link" onClick={() => navigate('/vote')}>
          <span>Голосование</span>
          <span className="arrow">→</span>
        </button>
        <button className="ts-account-link" onClick={() => navigate('/settings')}>
          <span>Настройки</span>
          <span className="arrow">→</span>
        </button>
      </div>

      <div className="ts-profile-head">
        <div className="ts-profile-avatar">{(profile?.username ?? '?').slice(0, 1).toUpperCase()}</div>
        <div className="ts-profile-info">
          <div className="ts-profile-name">{profile?.name ?? ''}</div>
          <div className="ts-profile-username">@{profile?.username ?? ''}</div>
          <div className="ts-profile-birth">Дата рождения: {profile?.birthDate ?? '—'}</div>
        </div>
        <div className="ts-profile-actions">
          <button className="ts-btn-ghost" onClick={() => flash('Изменение аватара появится в следующей версии')}>
            Изменить аватар
          </button>
          <button className="ts-btn-ghost" onClick={() => flash('Изменение имени появится в следующей версии')}>
            Изменить имя
          </button>
          <button className="ts-btn-ghost" onClick={() => flash('Username можно изменить через 7 дней')}>
            Изменить username
          </button>
        </div>
      </div>
      <div className="ts-hint">Username можно менять не чаще одного раза в 7 дней</div>

      <div className="ts-settings-block">
        <h2 className="ts-block-title">Настройки</h2>
        <div className="ts-settings-row">
          <span className="label">Тема</span>
          <div className="ts-theme-btns">
            <button className={`ts-theme-btn${theme === 'light' ? ' on' : ''}`} onClick={() => setThemeAndPersist('light')}>
              Светлая
            </button>
            <button className={`ts-theme-btn${theme === 'dark' ? ' on' : ''}`} onClick={() => setThemeAndPersist('dark')}>
              Тёмная
            </button>
          </div>
        </div>
        <div className="ts-settings-row">
          <span className="label">Разрешение на отправку уведомлений</span>
          <button className={`ts-switch${notifOn ? ' on' : ''}`} onClick={toggleNotif}>
            <span className="ts-switch-knob" />
          </button>
        </div>
        <div className="ts-settings-row">
          <span className="label">Политика конфиденциальности</span>
          <span className="open-link">открыть →</span>
        </div>
      </div>

      <div className="ts-requests-block">
        <h2 className="ts-block-title">Мои заявки</h2>
        {submissions.map((r) => (
          <div className="ts-request-row" key={r.id}>
            <span className="ts-request-title">{r.title}</span>
            <span className={`ts-badge ${r.status}`}>{STATUS_LABEL[r.status]}</span>
          </div>
        ))}
        {submissions.length === 0 && <div className="ts-center-note">Ничего нет</div>}
      </div>
    </div>
  );
}
