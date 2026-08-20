import { useState } from 'react';
import { PostSiteInfo, PostCardInfo, eventToPostForm, postFormPayload } from './PostForm';
import { useUI } from '../contexts/UIContext';
import { api } from '../lib/api';
import type { EventItem, PostFormValue } from '../types';

interface EditEventModalProps {
  event: EventItem;
  onClose: () => void;
  onSaved: (updated: EventItem) => void;
}

export function EditEventModal({ event, onClose, onSaved }: EditEventModalProps) {
  const { flash } = useUI();
  const [form, setForm] = useState<PostFormValue>(() => eventToPostForm(event));
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!form.title.trim() || !form.category) {
      flash('Заполните название и категорию');
      return;
    }
    if (!form.imageUrl) {
      flash('Загрузите фото мероприятия');
      return;
    }
    setSaving(true);
    try {
      const updated = await api.patch<EventItem>(`/admin/events/${event.id}`, postFormPayload(form));
      flash('Мероприятие обновлено');
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
        <div style={{ padding: '20px 26px 30px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h2 className="ts-modal-title">Редактировать мероприятие</h2>
          <section>
            <div className="ts-field-label">Информация для сайта</div>
            <PostSiteInfo value={form} onChange={setForm} />
          </section>
          <section>
            <div className="ts-field-label">Информация для карточки</div>
            <PostCardInfo value={form} onChange={setForm} />
          </section>
          <button className="ts-btn-outline block" onClick={save} disabled={saving}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
