import { useCallback, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';
import { useSubmissions } from '../hooks/useSubmissions';
import { api } from '../lib/api';
import { ConfirmDialog } from '../components/ConfirmDialog';
import type { Profile } from '../types';

/** Shape of GET/POST /api/profile/telegram-link — the deep link that hands this
 *  account over to the Telegram agent ("Барс"). */
interface TelegramLinkStatus {
  /** false until the bot is configured server-side — the row stays hidden then. */
  available: boolean;
  linked: boolean;
  telegramUsername?: string | null;
}

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
  const { session, profile, isAdmin, refreshProfile, signOut } = useAuth();
  const { theme, setTheme } = useUI();
  const { submissions } = useSubmissions();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [telegram, setTelegram] = useState<TelegramLinkStatus | null>(null);
  const [telegramBusy, setTelegramBusy] = useState(false);
  const [telegramError, setTelegramError] = useState('');

  if (!session) return <Navigate to="/auth" replace />;

  async function setThemeAndPersist(next: 'light' | 'dark') {
    setTheme(next);
    await api.patch<Profile>('/profile', { theme: next }).then(refreshProfile).catch(() => {});
  }

  async function toggleNotif() {
    if (!profile) return;
    await api.patch<Profile>('/profile', { notifOptIn: !profile.notifOptIn }).then(refreshProfile).catch(() => {});
  }

  const loadTelegram = useCallback(async () => {
    // A missing/misconfigured bot must not break the profile page, so failures here
    // just leave the row hidden.
    await api
      .get<TelegramLinkStatus>('/profile/telegram-link', { noCache: true })
      .then(setTelegram)
      .catch(() => setTelegram(null));
  }, []);

  useEffect(() => {
    if (session) void loadTelegram();
  }, [session, loadTelegram]);

  async function linkTelegram() {
    setTelegramBusy(true);
    setTelegramError('');
    try {
      const { deepLink } = await api.post<{ deepLink: string }>('/profile/telegram-link');
      // Opened rather than shown: on mobile this hands straight over to the Telegram app.
      window.open(deepLink, '_blank', 'noopener');
    } catch (err) {
      setTelegramError(err instanceof Error ? err.message : 'Не удалось создать ссылку');
    } finally {
      setTelegramBusy(false);
    }
  }

  async function unlinkTelegram() {
    setTelegramBusy(true);
    try {
      await api.del('/profile/telegram-link');
      await loadTelegram();
    } catch (err) {
      setTelegramError(err instanceof Error ? err.message : 'Не удалось отвязать');
    } finally {
      setTelegramBusy(false);
    }
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
        {telegram?.available && (
          <div className="ts-settings-row">
            <span className="label">
              Telegram-бот Барс
              {telegram.linked && telegram.telegramUsername ? ` (@${telegram.telegramUsername})` : ''}
            </span>
            <button
              className="open-link"
              disabled={telegramBusy}
              onClick={telegram.linked ? unlinkTelegram : linkTelegram}
            >
              {telegram.linked ? 'отвязать' : 'привязать →'}
            </button>
          </div>
        )}
        {telegramError && <div className="ts-center-note">{telegramError}</div>}
        <div className="ts-settings-row">
          <span className="label">Политика конфиденциальности</span>
          <button className="open-link" onClick={() => navigate('/privacy')}>
            открыть →
          </button>
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

      <div className="ts-account-links">
        <button className="ts-account-link" onClick={() => navigate('/favorites')}>
          <span>Избранное</span>
          <span className="arrow">→</span>
        </button>
        {/* временно скрыто: страница голосования
        <button className="ts-account-link" onClick={() => navigate('/vote')}>
          <span>Голосование</span>
          <span className="arrow">→</span>
        </button>
        */}
        {isAdmin && (
          <button className="ts-account-link" onClick={() => navigate('/admin')}>
            <span>Админ-панель</span>
            <span className="arrow">→</span>
          </button>
        )}
      </div>

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
