import { useState } from 'react';
import { useUI } from '../contexts/UIContext';
import { api } from '../lib/api';
import type { MaterialItem } from '../types';

function bodyToText(body: string[]): string {
  return body.join('\n\n');
}

function textToBody(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

interface EditArticleModalProps {
  trackId: string;
  material?: MaterialItem;
  onClose: () => void;
  onSaved: (updated: MaterialItem) => void;
}

export function EditArticleModal({ trackId, material, onClose, onSaved }: EditArticleModalProps) {
  const { flash } = useUI();
  const [title, setTitle] = useState(material?.title ?? '');
  const [meta, setMeta] = useState(material?.meta ?? '');
  const [bodyText, setBodyText] = useState(material ? bodyToText(material.body) : '');
  const [saving, setSaving] = useState(false);

  async function save() {
    const body = textToBody(bodyText);
    if (!title.trim() || !meta.trim() || body.length === 0) {
      flash('Заполните название, метку и текст статьи');
      return;
    }
    setSaving(true);
    try {
      const updated = material
        ? await api.patch<MaterialItem>(`/admin/materials/${material.id}`, { title, meta, body })
        : await api.post<MaterialItem>('/admin/materials', { track: trackId, title, meta, body });
      flash(material ? 'Статья обновлена' : 'Статья добавлена');
      onSaved(updated);
      onClose();
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось сохранить');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="ts-modal-overlay" onClick={onClose}>
      <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ts-modal-close" onClick={onClose}>
          ←
        </button>
        <div style={{ padding: '20px 26px 30px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 className="ts-modal-title">{material ? 'Редактировать статью' : 'Новая статья'}</h2>
          <input className="ts-input" placeholder="Название статьи" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input
            className="ts-input"
            placeholder="Метка (например «разбор · 8 мин»)"
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
          />
          <textarea
            className="ts-textarea"
            rows={10}
            placeholder="Текст статьи. Разделяйте абзацы пустой строкой."
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
          />
          <button className="ts-btn-outline block" onClick={save} disabled={saving}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
