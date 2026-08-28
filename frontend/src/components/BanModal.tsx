import { useState } from 'react';
import type { BanDuration } from '../types';

const OPTIONS: { value: BanDuration; label: string }[] = [
  { value: 'day', label: 'На 1 день' },
  { value: 'week', label: 'На неделю' },
  { value: 'month', label: 'На месяц' },
  { value: 'forever', label: 'Навсегда' }
];

interface BanModalProps {
  userLabel: string;
  onConfirm: (payload: { duration: BanDuration; reason: string }) => void;
  onCancel: () => void;
}

export function BanModal({ userLabel, onConfirm, onCancel }: BanModalProps) {
  const [duration, setDuration] = useState<BanDuration>('week');
  const [reason, setReason] = useState('');

  return (
    <div className="ts-modal-overlay" onClick={onCancel}>
      <div className="ts-confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <h3 className="ts-confirm-title">Забанить {userLabel}</h3>

        <div className="ts-ban-options">
          {OPTIONS.map((o) => (
            <label key={o.value} className="ts-ban-option">
              <input
                type="radio"
                name="ban-duration"
                checked={duration === o.value}
                onChange={() => setDuration(o.value)}
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>

        <textarea
          className="ts-textarea"
          rows={3}
          placeholder="Указать причину"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{ marginTop: 14 }}
        />

        <div className="ts-confirm-actions">
          <button className="ts-btn-ghost" onClick={onCancel}>
            Отмена
          </button>
          <button className="ts-btn-outline small danger" onClick={() => onConfirm({ duration, reason })}>
            Забанить
          </button>
        </div>
      </div>
    </div>
  );
}
