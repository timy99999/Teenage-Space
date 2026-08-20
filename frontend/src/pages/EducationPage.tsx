import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEducation } from '../hooks/useEducation';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';
import { api } from '../lib/api';
import { EditArticleModal } from '../components/EditArticleModal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import type { MaterialItem } from '../types';

export function EducationPage() {
  const navigate = useNavigate();
  const { trackId } = useParams<{ trackId: string }>();
  const { title, intro, items, reload } = useEducation(trackId ?? '');
  const { isAdmin } = useAuth();
  const { flash } = useUI();
  const [editTarget, setEditTarget] = useState<MaterialItem | 'new' | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MaterialItem | null>(null);

  async function confirmDelete() {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    setDeleteTarget(null);
    try {
      await api.del(`/admin/materials/${id}`);
      flash('Статья удалена');
      reload();
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось удалить статью');
    }
  }

  return (
    <div className="ts-edu-page">
      <h1 className="ts-edu-title">{title}</h1>
      <div className="ts-edu-intro">{intro}</div>
      <div className="ts-material-list">
        {items.map((m, i) => (
          <div className="ts-material-row" key={m.id}>
            <button className="ts-material-row-link" onClick={() => navigate(`/article/${m.id}?from=${trackId}`)}>
              <span className="ts-material-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="ts-material-title">{m.title}</span>
              <span className="ts-material-meta">{m.meta}</span>
              <span className="ts-material-arrow">→</span>
            </button>
            {isAdmin && (
              <div className="ts-material-row-admin">
                <button className="ts-btn-outline small" onClick={() => setEditTarget(m)}>
                  Редактировать
                </button>
                <button className="ts-btn-outline small danger" onClick={() => setDeleteTarget(m)}>
                  Удалить
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isAdmin && (
        <button className="ts-btn-outline small" style={{ marginTop: 16 }} onClick={() => setEditTarget('new')}>
          Добавить статью
        </button>
      )}

      {editTarget && trackId && (
        <EditArticleModal
          trackId={trackId}
          material={editTarget === 'new' ? undefined : editTarget}
          onClose={() => setEditTarget(null)}
          onSaved={reload}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Удалить статью?"
          message={`«${deleteTarget.title}» будет удалена без возможности восстановления.`}
          confirmLabel="Удалить"
          danger
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
