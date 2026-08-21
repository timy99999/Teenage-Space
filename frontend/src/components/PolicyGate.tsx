import { useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import type { Profile } from '../types';

export function PolicyGate() {
  const { session, profile, loading, refreshProfile, signOut } = useAuth();
  const [checked, setChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (loading || !session || !profile || profile.policyAcceptedAt) return null;

  async function onAccept() {
    if (!checked) return;
    setError('');
    setBusy(true);
    try {
      await api.patch<Profile>('/profile', { policyAccepted: true });
      await refreshProfile();
    } catch {
      setError('Не удалось сохранить согласие, попробуйте ещё раз');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="ts-modal-overlay">
      <div className="ts-modal ts-gate-box">
        <div className="ts-gate-title">Политика конфиденциальности</div>
        <div className="ts-gate-text">
          Мы обновили условия обработки персональных данных. Чтобы продолжить пользоваться Teenage Space, подтвердите,
          что вы ознакомились с Политикой конфиденциальности и принимаете её условия.
        </div>
        <div className="ts-consent-row">
          <input id="policy-gate-check" type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <label htmlFor="policy-gate-check">
            Я принимаю{' '}
            <a href="/privacy" target="_blank" rel="noreferrer">
              Политику конфиденциальности
            </a>{' '}
            Teenage Space
          </label>
        </div>
        {error && <div className="ts-auth-error">{error}</div>}
        <div className="ts-gate-actions">
          <button
            className="ts-btn-plain-outline"
            style={{ border: '1.5px solid var(--ts-violet)', color: 'var(--ts-blue)' }}
            onClick={onAccept}
            disabled={!checked || busy}
          >
            Продолжить
          </button>
          <button className="ts-auth-switch" onClick={signOut}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}
