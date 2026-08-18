import { useUI } from '../contexts/UIContext';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
import type { Profile } from '../types';

export function SettingsPage() {
  const { theme, setTheme } = useUI();
  const { session, profile, refreshProfile } = useAuth();

  async function setThemeAndPersist(next: 'light' | 'dark') {
    setTheme(next);
    if (session) await api.patch<Profile>('/profile', { theme: next }).then(refreshProfile).catch(() => {});
  }

  async function toggleNotif() {
    if (!session || !profile) return;
    await api.patch<Profile>('/profile', { notifOptIn: !profile.notifOptIn }).then(refreshProfile).catch(() => {});
  }

  const notifOn = !!profile?.notifOptIn;

  return (
    <div className="ts-page">
      <h1 className="ts-page-title">Настройки</h1>
      <div className="ts-settings-block">
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
        <div className="ts-settings-row">
          <span className="label">Правила платформы</span>
          <span className="open-link">открыть →</span>
        </div>
      </div>
    </div>
  );
}
