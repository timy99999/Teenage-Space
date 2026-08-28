import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';
import { useAdminUser } from '../hooks/useAdminUser';
import { api } from '../lib/api';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { BanModal } from '../components/BanModal';
import { ADMIN_PERMS, type AdminPermKey, type BanDuration } from '../types';

const STATUS_LABEL: Record<string, string> = {
  pending: 'На проверке',
  approved: 'Опубликовано',
  rejected: 'Отклонено'
};

function banPeriodText(expiresAt: string | null): string {
  if (!expiresAt) return 'навсегда';
  return `до ${new Date(expiresAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}`;
}

export function UserAccountPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile, isSuperAdmin } = useAuth();
  const { flash } = useUI();
  const { user, loading, reload } = useAdminUser(id);
  const [confirmDemote, setConfirmDemote] = useState(false);
  const [banOpen, setBanOpen] = useState(false);

  if (profile && !isSuperAdmin) {
    return (
      <div className="ts-page">
        <h1 className="ts-page-title">Аккаунт</h1>
        <p className="ts-center-note">Доступ только для главного администратора.</p>
      </div>
    );
  }

  if (loading) return <div className="ts-page"><p className="ts-center-note">Загрузка...</p></div>;
  if (!user) return <div className="ts-page"><p className="ts-center-note">Пользователь не найден</p></div>;

  const isSelf = user.id === profile?.id;
  const canModerate = !isSelf && user.role !== 'super_admin';

  async function setRole(role: 'user' | 'admin') {
    setConfirmDemote(false);
    try {
      await api.post(`/admin/users/${user!.id}/role`, { role });
      flash(role === 'admin' ? 'Назначен администратором' : 'Права администратора сняты');
      reload();
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось изменить роль');
    }
  }

  async function togglePerm(key: AdminPermKey, next: boolean) {
    const perms = { ...user!.adminPerms, [key]: next };
    try {
      await api.patch(`/admin/users/${user!.id}/perms`, { perms });
      reload();
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось сохранить');
    }
  }

  async function unban() {
    try {
      await api.post(`/admin/users/${user!.id}/unban`);
      flash('Пользователь разбанен');
      reload();
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось разбанить');
    }
  }

  async function confirmBan(payload: { duration: BanDuration; reason: string }) {
    setBanOpen(false);
    try {
      await api.post(`/admin/users/${user!.id}/ban`, payload);
      flash('Пользователь забанен');
      reload();
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось забанить');
    }
  }

  return (
    <div className="ts-page">
      <div className="ts-profile-top">
        <button className="ts-logout-link" onClick={() => navigate('/users')}>
          ← К списку
        </button>
      </div>

      <section className="ts-account-section ts-account-card">
        <div className="ts-profile-head">
          <div className="ts-profile-avatar">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.username} />
            ) : (
              (user.username || '?').slice(0, 1).toUpperCase()
            )}
          </div>
          <div className="ts-profile-info">
            <div className="ts-profile-name-row">
              <div className="ts-profile-name">@{user.username}</div>
              {user.role !== 'user' && (
                <span className="ts-badge approved">{user.role === 'super_admin' ? 'Гл. админ' : 'Админ'}</span>
              )}
            </div>
            <div className="ts-profile-username">{user.email ?? ''}</div>
          </div>
        </div>

        <div className="ts-profile-details">
          <div>
            <span className="label">Фамилия:</span> {user.lastName || '—'}
          </div>
          <div>
            <span className="label">Имя:</span> {user.name || '—'}
          </div>
          <div>
            <span className="label">Дата рождения:</span> {user.birthDate ?? '—'}
          </div>
          <div>
            <span className="label">Регистрация:</span>{' '}
            {new Date(user.createdAt).toLocaleDateString('ru-RU')}
          </div>
        </div>

        {user.isBanned && (
          <div className="ts-ban-note">
            Забанен {banPeriodText(user.banExpiresAt)} — причина: {user.banReason?.trim() || 'не указана'}
          </div>
        )}
      </section>

      {canModerate && (
        <section className="ts-account-section">
          <h2 className="ts-account-section-title">Управление</h2>

          <div className="ts-settings-row">
            <span className="label">Роль</span>
            {user.role === 'user' ? (
              <button className="ts-btn-outline small" onClick={() => setRole('admin')}>
                Назначить администратором
              </button>
            ) : (
              <button className="ts-btn-outline small danger" onClick={() => setConfirmDemote(true)}>
                Забрать админку
              </button>
            )}
          </div>

          <div className="ts-settings-row">
            <span className="label">Бан</span>
            {user.isBanned ? (
              <button className="ts-btn-outline small" onClick={unban}>
                Разбанить
              </button>
            ) : (
              <button className="ts-btn-outline small danger" onClick={() => setBanOpen(true)}>
                Забанить
              </button>
            )}
          </div>
        </section>
      )}

      {user.role === 'admin' && (
        <section className="ts-account-section">
          <h2 className="ts-account-section-title">Функции</h2>
          <div className="desc" style={{ marginBottom: 10 }}>
            Что доступно администратору в панели. Выключенные разделы показывают «Нет доступа».
          </div>
          {ADMIN_PERMS.map((p) => {
            const on = user.adminPerms?.[p.key] === true;
            return (
              <div className="ts-settings-row" key={p.key}>
                <span className="label">{p.label}</span>
                <button className={`ts-switch${on ? ' on' : ''}`} onClick={() => togglePerm(p.key, !on)}>
                  <span className="ts-switch-knob" />
                </button>
              </div>
            );
          })}
        </section>
      )}

      <section className="ts-account-section">
        <h2 className="ts-account-section-title">Публикации</h2>
        {user.submissions.map((s) => (
          <div className="ts-request-row" key={s.id}>
            <span className="ts-request-title">{s.title}</span>
            <span className={`ts-badge ${s.status}`}>{STATUS_LABEL[s.status] ?? s.status}</span>
          </div>
        ))}
        {user.submissions.length === 0 && <div className="ts-center-note">Ничего нет</div>}
      </section>

      {confirmDemote && (
        <ConfirmDialog
          title="Забрать права администратора?"
          message={`@${user.username} снова станет обычным пользователем, все выданные функции сбросятся.`}
          confirmLabel="Забрать"
          danger
          onConfirm={() => setRole('user')}
          onCancel={() => setConfirmDemote(false)}
        />
      )}

      {banOpen && (
        <BanModal userLabel={`@${user.username}`} onConfirm={confirmBan} onCancel={() => setBanOpen(false)} />
      )}
    </div>
  );
}
