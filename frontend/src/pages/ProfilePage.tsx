import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';
import { useSubmissions } from '../hooks/useSubmissions';
import { api } from '../lib/api';
import { ConfirmDialog } from '../components/ConfirmDialog';
import type { Profile } from '../types';

const STATUS_LABEL: Record<string, string> = {
  pending: 'На проверке',
  approved: 'Одобрено',
  rejected: 'Отклонено'
};

function PencilIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

export function ProfilePage() {
  const navigate = useNavigate();
  const { session, profile, refreshProfile, signOut } = useAuth();
  const { theme, setTheme } = useUI();
  const { submissions } = useSubmissions();
  const [confirmLogout, setConfirmLogout] = useState(false);

  if (!session) return <Navigate to="/auth" replace />;

  async function setThemeAndPersist(next: 'light' | 'dark') {
    setTheme(next);
    await api.patch<Profile>('/profile', { theme: next }).then(refreshProfile).catch(() => {});
  }

  async function toggleNotif() {
    if (!profile) return;
    await api.patch<Profile>('/profile', { notifOptIn: !profile.notifOptIn }).then(refreshProfile).catch(() => {});
  }

  async function onLogout() {
    setConfirmLogout(false);
    await signOut();
    navigate('/auth');
  }

  const notifOn = !!profile?.notifOptIn;

  return (
    <div className="ts-page">
      <div className="ts-profile-top">
        <div className="ts-account-links">
          <button className="ts-account-link" onClick={() => navigate('/favorites')}>
            <span>Избранное</span>
            <span className="arrow">→</span>
          </button>
          <button className="ts-account-link" onClick={() => navigate('/vote')}>
            <span>Голосование</span>
            <span className="arrow">→</span>
          </button>
        </div>
        <button className="ts-logout-link" onClick={() => setConfirmLogout(true)}>
          Выйти из аккаунта
        </button>
      </div>

      <section className="ts-account-section ts-account-card">
        <div className="ts-profile-head">
          <div className="ts-profile-avatar">
            {profile?.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.username} />
            ) : (
              (profile?.username ?? '?').slice(0, 1).toUpperCase()
            )}
          </div>
          <div className="ts-profile-info">
            <div className="ts-profile-name-row">
              <div className="ts-profile-name">{profile?.username ?? ''}</div>
              <button className="ts-edit-pencil" aria-label="Редактировать аккаунт" onClick={() => navigate('/profile/edit')}>
                <PencilIcon />
              </button>
            </div>
            <div className="ts-profile-username">{profile?.email ?? ''}</div>
          </div>
        </div>

        <div className="ts-profile-details-row">
          <div className="ts-profile-details">
            <div>
              <span className="label">Фамилия:</span> {profile?.lastName || '—'}
            </div>
            <div>
              <span className="label">Имя:</span> {profile?.name || '—'}
            </div>
            <div>
              <span className="label">Дата Рождения:</span> {profile?.birthDate ?? '—'}
            </div>
          </div>
          <div className="ts-profile-quicklinks">
            <button onClick={() => document.getElementById('settings-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Настройки
            </button>
            <button onClick={() => document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' })}>
              Публикации
            </button>
          </div>
        </div>
      </section>

      <section className="ts-account-section" id="settings-section">
        <h2 className="ts-account-section-title">Настройки</h2>
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
      </section>

      <section className="ts-account-section" id="publications">
        <h2 className="ts-account-section-title">Публикации</h2>
        {submissions.map((r) => (
          <div className="ts-request-row" key={r.id}>
            <span className="ts-request-title">{r.title}</span>
            <span className={`ts-badge ${r.status}`}>{STATUS_LABEL[r.status]}</span>
          </div>
        ))}
        {submissions.length === 0 && <div className="ts-center-note">Ничего нет</div>}
      </section>

      {confirmLogout && (
        <ConfirmDialog
          title="Выйти из аккаунта?"
          message="Вы сможете снова войти в любое время."
          confirmLabel="Выйти"
          onConfirm={onLogout}
          onCancel={() => setConfirmLogout(false)}
        />
      )}
    </div>
  );
}
