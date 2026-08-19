interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ title, message, confirmLabel, cancelLabel, danger, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="ts-modal-overlay" onClick={onCancel}>
      <div className="ts-confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <h3 className="ts-confirm-title">{title}</h3>
        <p className="ts-confirm-message">{message}</p>
        <div className="ts-confirm-actions">
          <button className="ts-btn-ghost" onClick={onCancel}>
            {cancelLabel ?? 'Отмена'}
          </button>
          <button className={`ts-btn-outline small${danger ? ' danger' : ''}`} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
