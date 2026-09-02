import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostSiteInfo, PostCardInfo, emptyPostForm } from '../components/PostForm';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';
import { useSubmissions } from '../hooks/useSubmissions';
import { api } from '../lib/api';
import type { PostFormValue, Submission } from '../types';

export function PublishPage() {
  const { session } = useAuth();
  const { flash } = useUI();
  const navigate = useNavigate();
  const { reload } = useSubmissions();

  const [form, setForm] = useState<PostFormValue>(emptyPostForm);
  const [whatsapp, setWhatsapp] = useState('');
  const [published, setPublished] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (!session) {
      flash('Войдите, чтобы опубликовать мероприятие');
      navigate('/auth');
      return;
    }
    if (!form.title.trim()) {
      flash('Укажите название мероприятия');
      return;
    }
    if (!form.imageUrl) {
      flash('Загрузите фото мероприятия');
      return;
    }
    setSubmitting(true);
    try {
      await api.post<Submission>('/submissions', {
        title: form.title,
        imageUrl: form.imageUrl,
        category: form.category || null,
        themes: form.themes,
        ageMin: form.ageMin === '' ? null : form.ageMin,
        ageMax: form.ageMax === '' ? null : form.ageMax,
        format: form.format || null,
        price: form.price,
        cost: form.price === 'paid' ? form.cost || null : null,
        charity: form.price === 'paid' ? form.charity : false,
        level: form.level,
        eventDate: form.eventDate || null,
        eventDateEnd: form.eventDateEnd || null,
        eventTime: form.eventTime || null,
        deadlineDate: form.deadlineDate || null,
        address: form.address,
        audience: form.audience,
        description: form.description,
        registrationUrl: form.registrationUrl || null,
        extraLinkTitle: form.extraLinkTitle || null,
        extraLinkUrl: form.extraLinkUrl || null,
        instagram: form.instagram || null,
        telegram: form.telegram || null,
        whatsapp: whatsapp || null
      });
      setPublished(true);
      reload();
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось отправить заявку');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="ts-page">
      <h1 className="ts-page-title ts-publish-title">Публикация поста</h1>
      <div className="ts-publish-grid">
        <div className="ts-publish-col">
          <section className="ts-card-panel">
            <h2>Информация для сайта</h2>
            <div className="desc">Определяет категорию, фильтры и расположение мероприятия</div>
            <PostSiteInfo value={form} onChange={setForm} />
          </section>

          <section className="ts-card-panel">
            <h2>Информация для администраторов</h2>
            <p className="desc" style={{ lineHeight: 1.6 }}>
              Нам нужен ваш номер WhatsApp, чтобы связаться с вами по поводу публикации мероприятия. Эти данные видят
              только администраторы.
            </p>
            <input
              className="ts-input"
              style={{ marginTop: 14 }}
              placeholder="Номер WhatsApp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </section>
        </div>

        <section className="ts-card-panel">
          <h2>Информация для карточки</h2>
          <PostCardInfo value={form} onChange={setForm} />
          <button className="ts-btn-outline block" style={{ marginTop: 22 }} onClick={submit} disabled={submitting}>
            Опубликовать
          </button>
          {published && (
            <div className="ts-published-note">
              Ваша заявка отправлена на проверку. Администраторы проверят её и свяжутся с вами в ближайшее время.
              <div className="ts-badge" style={{ marginTop: 10, display: 'inline-block' }}>
                Статус: На проверке
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
