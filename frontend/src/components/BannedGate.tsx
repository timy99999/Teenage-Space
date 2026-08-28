import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { BanInfo } from '../types';

function periodText(expiresAt: string | null): string {
  if (!expiresAt) return 'навсегда';
  const d = new Date(expiresAt);
  return `до ${d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}`;
}

export function BannedGate({ info }: { info: BanInfo }) {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  async function onLogout() {
    await signOut();
    navigate('/auth');
  }

  return (
    <div className="ts-banned-gate">
      <div className="ts-banned-box">
        <h1 className="ts-banned-title">Аккаунт заблокирован</h1>
        <p className="ts-banned-text">
          Ваш аккаунт забанен <b>{periodText(info.banExpiresAt)}</b> по причине:{' '}
          <b>{info.banReason?.trim() || 'без указания причины'}</b>.
        </p>
        <button className="ts-btn-outline" onClick={onLogout}>
          Выйти
        </button>
      </div>
    </div>
  );
}
