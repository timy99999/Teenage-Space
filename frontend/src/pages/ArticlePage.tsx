import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useArticle } from '../hooks/useEducation';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';
import { api } from '../lib/api';
import { EditArticleModal } from '../components/EditArticleModal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import type { MaterialItem } from '../types';

export function ArticlePage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { flash } = useUI();
  const fetched = useArticle(id);
  const [override, setOverride] = useState<MaterialItem | null>(null);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const article = override ?? fetched;

  if (!article) return null;

  async function confirmDelete() {
    try {
      await api.del(`/admin/materials/${article!.id}`);
      flash('Статья удалена');
      const from = searchParams.get('from');
      navigate(from ? `/education/${from}` : '/education');
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось удалить статью');
    }
    setDeleting(false);
  }

  return (
    <div className="ts-article-page">
      <div className="ts-article-inner">
        {isAdmin && (
          <div className="ts-article-admin-bar">
            <button className="ts-btn-outline small" onClick={() => setEditing(true)}>
              Редактировать
            </button>
            <button className="ts-btn-outline small danger" onClick={() => setDeleting(true)}>
              Удалить
            </button>
          </div>
        )}
        <div className="ts-article-kicker">{article.meta}</div>
        <h1 className="ts-article-title">{article.title}</h1>
        <div className="ts-article-body">
          {article.body.map((p, i) => (
            <p className="ts-article-p" key={i}>
              {p}
            </p>
          ))}
        </div>
      </div>

      {editing && (
        <EditArticleModal
          trackId={article.track}
          material={article}
          onClose={() => setEditing(false)}
          onSaved={setOverride}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Удалить статью?"
          message={`«${article.title}» будет удалена без возможности восстановления.`}
          confirmLabel="Удалить"
          danger
          onConfirm={confirmDelete}
          onCancel={() => setDeleting(false)}
        />
      )}
    </div>
  );
}
