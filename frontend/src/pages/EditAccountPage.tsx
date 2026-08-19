import { useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';
import { api } from '../lib/api';
import { supabase } from '../lib/supabase';
import { ConfirmDialog } from '../components/ConfirmDialog';
import type { Profile } from '../types';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function cooldownHint(changedAt: string | null): string | null {
  if (!changedAt) return null;
  const next = new Date(changedAt).getTime() + WEEK_MS;
  if (Date.now() >= next) return null;
  return `Можно изменить с ${new Date(next).toLocaleDateString('ru-RU')}`;
}

export function EditAccountPage() {
  const navigate = useNavigate();
  const { session, profile, refreshProfile, signOut } = useAuth();
  const { flash } = useUI();
  const fileInput = useRef<HTMLInputElement>(null);

  const [lastName, setLastName] = useState(profile?.lastName ?? '');
  const [name, setName] = useState(profile?.name ?? '');
  const [birthDate, setBirthDate] = useState(profile?.birthDate ?? '');
  const [username, setUsername] = useState(profile?.username ?? '');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!session) return <Navigate to="/auth" replace />;

  const nameHint = cooldownHint(profile?.nameChangedAt ?? null);
  const usernameHint = cooldownHint(profile?.usernameChangedAt ?? null);

  async function onAvatarPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !session) return;
    if (!file.type.startsWith('image/')) {
      flash('Выберите файл изображения');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      flash('Файл слишком большой (макс. 5 МБ)');
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split('.').pop() ?? 'jpg';
      const path = `${session.user.id}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('avatars').getPublicUrl(path);
      await api.patch<Profile>('/profile', { avatarUrl: data.publicUrl });
      await refreshProfile();
      flash('Аватар обновлён');
    } catch (err) {
      flash(err instanceof Error ? err.message : 'Не удалось загрузить фото');
    } finally {
      setUploading(false);
    }
  }

  async function onSave() {
    setSaving(true);
    try {
      await api.patch<Profile>('/profile', { lastName, name, birthDate, username });
      await refreshProfile();
      flash('Изменения сохранены');
      navigate('/profile');
    } catch (err) {
      flash(err instanceof Error ? err.message : 'Не удалось сохранить изменения');
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    setConfirmDelete(false);
    try {
      await api.del('/profile');
      await signOut();
      navigate('/');
      flash('Аккаунт удалён');
    } catch (err) {
      flash(err instanceof Error ? err.message : 'Не удалось удалить аккаунт');
    }
  }

  return (
    <div className="ts-page">
      <div className="ts-edit-account-body">
        <h1 className="ts-page-title">Редактирование аккаунта</h1>

        <div className="ts-edit-avatar-row">
          <button className="ts-edit-avatar" onClick={() => fileInput.current?.click()} disabled={uploading}>
            {profile?.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.username} />
            ) : (
              <span>{(profile?.username ?? '?').slice(0, 1).toUpperCase()}</span>
            )}
            <span className="ts-edit-avatar-overlay">{uploading ? '...' : 'Изменить'}</span>
          </button>
          <input ref={fileInput} type="file" accept="image/*" hidden onChange={onAvatarPick} />
        </div>

        <div className="ts-form-stack" style={{ maxWidth: 420, width: '100%' }}>
          <label className="ts-field-label">Фамилия</label>
          <input className="ts-input" value={lastName} onChange={(e) => setLastName(e.target.value)} />

          <label className="ts-field-label">Имя</label>
          <input className="ts-input" value={name} onChange={(e) => setName(e.target.value)} disabled={!!nameHint} />
          {nameHint && <div className="ts-hint">{nameHint}</div>}

          <label className="ts-field-label">Дата рождения</label>
          <input className="ts-input" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />

          <label className="ts-field-label">Username</label>
          <input className="ts-input" value={username} onChange={(e) => setUsername(e.target.value)} disabled={!!usernameHint} />
          {usernameHint && <div className="ts-hint">{usernameHint}</div>}
          <div className="ts-hint">Имя и username можно менять не чаще одного раза в неделю</div>

          <label className="ts-field-label">Email</label>
          <input className="ts-input" value={profile?.email ?? ''} disabled />
        </div>

        <button className="ts-btn-outline" style={{ marginTop: 26 }} onClick={onSave} disabled={saving}>
          Сохранить
        </button>

        <div className="ts-danger-zone">
          <h2 className="ts-block-title">Удаление аккаунта</h2>
          <p className="ts-hint">Аккаунт и все данные будут удалены без возможности восстановления.</p>
          <button className="ts-btn-outline small danger" onClick={() => setConfirmDelete(true)}>
            Удалить аккаунт
          </button>
        </div>
      </div>

      {confirmDelete && (
        <ConfirmDialog
          title="Удалить аккаунт навсегда?"
          message="Это действие необратимо. Все данные аккаунта будут удалены без возможности восстановления."
          confirmLabel="Удалить навсегда"
          danger
          onConfirm={onDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </div>
  );
}
