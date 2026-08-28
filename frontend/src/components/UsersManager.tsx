import { useEffect, useMemo, useRef, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { BanModal } from './BanModal';
import type { AdminUser, BanDuration } from '../types';

const ROLE_BADGE: Record<string, string> = {
  admin: 'Админ',
  super_admin: 'Гл. админ'
};

interface UsersManagerProps {
  canManageRoles?: boolean;
  onOpenUser?: (id: string) => void;
}

export function UsersManager({ canManageRoles = false, onOpenUser }: UsersManagerProps) {
  const { profile } = useAuth();
  const { flash } = useUI();
  const { users, reload } = useAdminUsers();
  const [query, setQuery] = useState('');
  const [banTarget, setBanTarget] = useState<AdminUser | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      [u.username, u.name, u.lastName, `${u.lastName} ${u.name}`].some((v) => v.toLowerCase().includes(q))
    );
  }, [users, query]);

  async function assignAdmin(u: AdminUser) {
    try {
      await api.post(`/admin/users/${u.id}/role`, { role: 'admin' });
      flash('Пользователь назначен администратором');
      reload();
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось назначить');
    }
  }

  async function unban(u: AdminUser) {
    try {
      await api.post(`/admin/users/${u.id}/unban`);
      flash('Пользователь разбанен');
      reload();
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось разбанить');
    }
  }

  async function confirmBan(payload: { duration: BanDuration; reason: string }) {
    if (!banTarget) return;
    const id = banTarget.id;
    setBanTarget(null);
    try {
      await api.post(`/admin/users/${id}/ban`, payload);
      flash('Пользователь забанен');
      reload();
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось забанить');
    }
  }

  return (
    <section className="ts-account-section">
      <input
        className="ts-input"
        placeholder="Поиск по нику или ФИО"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: 14 }}
      />

      {filtered.map((u) => {
        const isSelf = u.id === profile?.id;
        const canBan = !isSelf && u.role !== 'super_admin';
        return (
          <div className="ts-settings-row ts-user-row" key={u.id}>
            <button
              className="ts-user-main"
              onClick={() => onOpenUser?.(u.id)}
              disabled={!onOpenUser}
            >
              <span className="ts-user-avatar">
                {u.avatarUrl ? <img src={u.avatarUrl} alt={u.username} /> : (u.username || '?').slice(0, 1).toUpperCase()}
              </span>
              <span className="ts-user-name">
                {u.lastName} {u.name} <span style={{ opacity: 0.6 }}>@{u.username}</span>
                {ROLE_BADGE[u.role] && (
                  <span className="ts-badge approved" style={{ marginLeft: 8 }}>
                    {ROLE_BADGE[u.role]}
                  </span>
                )}
                {u.isBanned && (
                  <span className="ts-badge rejected" style={{ marginLeft: 8 }}>
                    Забанен
                  </span>
                )}
              </span>
            </button>

            <RowMenu
              items={[
                ...(canManageRoles && u.role === 'user'
                  ? [{ label: 'Назначить администратором', onClick: () => assignAdmin(u) }]
                  : []),
                ...(canBan
                  ? [
                      u.isBanned
                        ? { label: 'Разбанить', onClick: () => unban(u) }
                        : { label: 'Забанить', onClick: () => setBanTarget(u), danger: true }
                    ]
                  : [])
              ]}
            />
          </div>
        );
      })}
      {filtered.length === 0 && <div className="ts-center-note">Пользователей нет</div>}

      {banTarget && (
        <BanModal
          userLabel={`@${banTarget.username}`}
          onConfirm={confirmBan}
          onCancel={() => setBanTarget(null)}
        />
      )}
    </section>
  );
}

function RowMenu({ items }: { items: { label: string; onClick: () => void; danger?: boolean }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [open]);

  if (items.length === 0) return null;

  return (
    <div className="ts-card-menu" ref={ref}>
      <button
        className="ts-card-menu-btn"
        title="Действия"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        ⋮
      </button>
      {open && (
        <div className="ts-card-menu-dropdown">
          {items.map((it) => (
            <button
              key={it.label}
              className={it.danger ? 'danger' : undefined}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                it.onClick();
              }}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
