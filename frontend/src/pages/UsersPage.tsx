import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAdmins } from '../hooks/useAdmins';
import { UsersManager } from '../components/UsersManager';

const TABS = [
  { key: 'users', label: 'Пользователи' },
  { key: 'admins', label: 'Администраторы' }
] as const;

type TabKey = (typeof TABS)[number]['key'];

export function UsersPage() {
  const { profile, isSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>('users');

  if (profile && !isSuperAdmin) {
    return (
      <div className="ts-page">
        <h1 className="ts-page-title">Пользователи</h1>
        <p className="ts-center-note">Доступ только для главного администратора.</p>
      </div>
    );
  }

  return (
    <div className="ts-page">
      <h1 className="ts-page-title">Пользователи</h1>
      <div className="ts-theme-btns ts-admin-tabs" style={{ marginTop: 18, marginBottom: 8 }}>
        {TABS.map((t) => (
          <button key={t.key} className={`ts-theme-btn${tab === t.key ? ' on' : ''}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'users' && (
        <UsersManager canManageRoles onOpenUser={(id) => navigate(`/users/${id}`)} />
      )}
      {tab === 'admins' && <AdminsTab onOpen={(id) => navigate(`/users/${id}`)} />}
    </div>
  );
}

function AdminsTab({ onOpen }: { onOpen: (id: string) => void }) {
  const { admins } = useAdmins();

  return (
    <section className="ts-account-section">
      {admins.map((a) => (
        <button className="ts-settings-row ts-user-row ts-user-main" key={a.id} onClick={() => onOpen(a.id)}>
          <span className="ts-user-avatar">
            {a.avatarUrl ? <img src={a.avatarUrl} alt={a.username} /> : (a.username || '?').slice(0, 1).toUpperCase()}
          </span>
          <span className="ts-user-name">
            {a.lastName} {a.name} <span style={{ opacity: 0.6 }}>@{a.username}</span>
          </span>
        </button>
      ))}
      {admins.length === 0 && <div className="ts-center-note">Администраторов нет</div>}
    </section>
  );
}
