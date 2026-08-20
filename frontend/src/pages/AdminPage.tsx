import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';
import { useAdminSubmissions } from '../hooks/useAdminSubmissions';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { useAdminAnalytics } from '../hooks/useAdminAnalytics';
import { useNews } from '../hooks/useNews';
import { api } from '../lib/api';
import { Chip } from '../components/Chip';
import { PostSiteInfo, PostCardInfo, emptyPostForm } from '../components/PostForm';
import { ImageUploadField } from '../components/ImageUploadField';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { TrashIcon } from '../components/TrashIcon';
import type { AdminSubmission, AdminUser, NewsItem, PostFormValue, SubmissionStatus } from '../types';

const TABS = [
  { key: 'moderation', label: 'Модерация' },
  { key: 'publish-event', label: 'Опубликовать в Возможности' },
  { key: 'publish-news', label: 'Опубликовать новость' },
  { key: 'users', label: 'Пользователи' },
  { key: 'analytics', label: 'Аналитика' }
] as const;

type TabKey = (typeof TABS)[number]['key'];

const STATUS_LABEL: Record<SubmissionStatus, string> = {
  pending: 'На проверке',
  approved: 'Опубликовано',
  rejected: 'Отклонено'
};

function buildFormFromSubmission(s: AdminSubmission): PostFormValue {
  return {
    imageUrl: s.imageUrl,
    title: s.title,
    category: s.category ?? '',
    themes: s.themes,
    ageMin: s.ageMin ?? 0,
    ageMax: s.ageMax ?? 0,
    format: s.format ?? '',
    price: s.price,
    cost: s.cost ?? '',
    charity: s.charity,
    level: s.level,
    eventDate: s.eventDate ?? '',
    deadlineDate: s.deadlineDate ?? '',
    address: s.address ?? '',
    audience: s.audience ?? '',
    description: s.description ?? '',
    registrationUrl: s.registrationUrl ?? '',
    extraLinkTitle: s.extraLinkTitle ?? '',
    extraLinkUrl: s.extraLinkUrl ?? '',
    instagram: s.instagram ?? '',
    telegram: s.telegram ?? ''
  };
}

export function AdminPage() {
  const { profile, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>('moderation');

  useEffect(() => {
    if (profile && !isAdmin) navigate('/');
  }, [profile, isAdmin, navigate]);

  if (profile && !isAdmin) return null;

  return (
    <div className="ts-page">
      <h1 className="ts-page-title">Админ-панель</h1>
      <div className="ts-theme-btns" style={{ marginTop: 18, marginBottom: 8, flexWrap: 'wrap' }}>
        {TABS.map((t) => (
          <button key={t.key} className={`ts-theme-btn${tab === t.key ? ' on' : ''}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'moderation' && <ModerationTab />}
      {tab === 'publish-event' && <PublishEventTab />}
      {tab === 'publish-news' && <PublishNewsTab />}
      {tab === 'users' && <UsersTab />}
      {tab === 'analytics' && <AnalyticsTab />}
    </div>
  );
}

function ModerationTab() {
  const { flash } = useUI();
  const [status, setStatus] = useState<SubmissionStatus>('pending');
  const { submissions, reload } = useAdminSubmissions(status);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="ts-account-section">
      <div className="ts-filter-chips" style={{ marginBottom: 10 }}>
        {(Object.keys(STATUS_LABEL) as SubmissionStatus[]).map((s) => (
          <Chip key={s} label={STATUS_LABEL[s]} active={status === s} onClick={() => setStatus(s)} />
        ))}
      </div>
      {submissions.map((s) => (
        <SubmissionRow
          key={s.id}
          submission={s}
          open={openId === s.id}
          onToggle={() => setOpenId(openId === s.id ? null : s.id)}
          onChanged={reload}
          flash={flash}
        />
      ))}
      {submissions.length === 0 && <div className="ts-center-note">Заявок нет</div>}
    </section>
  );
}

function SubmissionRow({
  submission: s,
  open,
  onToggle,
  onChanged,
  flash
}: {
  submission: AdminSubmission;
  open: boolean;
  onToggle: () => void;
  onChanged: () => void;
  flash: (text: string) => void;
}) {
  const [edit, setEdit] = useState({
    title: s.title,
    description: s.description ?? '',
    address: s.address ?? '',
    audience: s.audience ?? ''
  });
  const [form, setForm] = useState<PostFormValue>(() => buildFormFromSubmission(s));
  const [busy, setBusy] = useState(false);

  async function saveEdit() {
    setBusy(true);
    try {
      await api.patch(`/admin/submissions/${s.id}`, edit);
      flash('Исправления сохранены');
      onChanged();
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось сохранить');
    } finally {
      setBusy(false);
    }
  }

  async function publish() {
    if (!form.title.trim() || !form.category || !form.eventDate || !form.address) {
      flash('Заполните название, категорию, дату и адрес');
      return;
    }
    if (!form.imageUrl) {
      flash('Загрузите фото мероприятия');
      return;
    }
    setBusy(true);
    try {
      await api.post(`/admin/submissions/${s.id}/publish`, form);
      flash('Мероприятие опубликовано');
      onChanged();
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось опубликовать');
    } finally {
      setBusy(false);
    }
  }

  async function reject() {
    setBusy(true);
    try {
      await api.post(`/admin/submissions/${s.id}/reject`);
      flash('Заявка отклонена');
      onChanged();
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось отклонить');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="ts-request-row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%' }}>
        <span className="ts-request-title">{s.title}</span>
        <span className={`ts-badge ${s.status}`}>{STATUS_LABEL[s.status]}</span>
        <button className="ts-btn-outline small" onClick={onToggle}>
          {open ? 'Свернуть' : 'Открыть'}
        </button>
      </div>

      {open && (
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div>
            <div className="ts-field-label">Контакты автора (видно только админам)</div>
            <div className="desc">
              WhatsApp: {s.whatsapp || '—'} · Telegram: {s.telegram || '—'} · Instagram: {s.instagram || '—'}
            </div>
          </div>

          <div>
            <div className="ts-field-label">Исправить заявку</div>
            <div className="ts-form-stack">
              <input
                className="ts-input"
                placeholder="Название"
                value={edit.title}
                onChange={(e) => setEdit((v) => ({ ...v, title: e.target.value }))}
              />
              <input
                className="ts-input"
                placeholder="Адрес"
                value={edit.address}
                onChange={(e) => setEdit((v) => ({ ...v, address: e.target.value }))}
              />
              <input
                className="ts-input"
                placeholder="Для кого"
                value={edit.audience}
                onChange={(e) => setEdit((v) => ({ ...v, audience: e.target.value }))}
              />
              <textarea
                className="ts-textarea"
                rows={3}
                placeholder="Описание"
                value={edit.description}
                onChange={(e) => setEdit((v) => ({ ...v, description: e.target.value }))}
              />
              <button className="ts-btn-outline small" onClick={saveEdit} disabled={busy} style={{ alignSelf: 'flex-start' }}>
                Сохранить исправления
              </button>
            </div>
          </div>

          <div>
            <div className="ts-field-label">Оформить как мероприятие для публикации</div>
            <PostSiteInfo value={form} onChange={setForm} />
            <PostCardInfo value={form} onChange={setForm} />
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="ts-btn-outline" onClick={publish} disabled={busy}>
              Опубликовать
            </button>
            <button className="ts-btn-outline danger" onClick={reject} disabled={busy}>
              Отклонить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PublishEventTab() {
  const { flash } = useUI();
  const [form, setForm] = useState<PostFormValue>(emptyPostForm);
  const [published, setPublished] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (!form.title.trim()) {
      flash('Укажите название мероприятия');
      return;
    }
    if (!form.imageUrl) {
      flash('Загрузите фото мероприятия');
      return;
    }
    if (!form.category || !form.eventDate || !form.address) {
      flash('Заполните категорию, дату и адрес');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/admin/events', form);
      setPublished(true);
      setForm(emptyPostForm());
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось опубликовать');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="ts-publish-grid" style={{ marginTop: 20 }}>
      <div className="ts-publish-col">
        <section className="ts-card-panel">
          <h2>Информация для сайта</h2>
          <div className="desc">Определяет категорию, фильтры и расположение мероприятия</div>
          <PostSiteInfo value={form} onChange={setForm} />
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
            Мероприятие опубликовано в «Возможности».
          </div>
        )}
      </section>
    </div>
  );
}

function PublishNewsTab() {
  const { flash } = useUI();
  const { news, reload } = useNews();
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<NewsItem | null>(null);

  async function publish() {
    if (!title || !shortDesc || !eventDate) {
      flash('Заполните заголовок, текст и дату');
      return;
    }
    if (!imageUrl) {
      flash('Загрузите фото новости');
      return;
    }
    setBusy(true);
    try {
      await api.post('/admin/news', { title, shortDesc, eventDate, imageUrl });
      flash('Новость опубликована');
      setTitle('');
      setShortDesc('');
      setEventDate('');
      setImageUrl(null);
      reload();
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось опубликовать');
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    setDeleteTarget(null);
    try {
      await api.del(`/admin/news/${id}`);
      flash('Новость удалена');
      reload();
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось удалить новость');
    }
  }

  return (
    <section className="ts-card-panel" style={{ marginTop: 20, maxWidth: 520 }}>
      <h2>Новая новость</h2>
      <div className="desc">Фото и текст, без категорий и фильтров</div>
      <div className="ts-field-group">
        <ImageUploadField value={imageUrl} onChange={setImageUrl} />
        <input className="ts-input" placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="date" className="ts-input" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        <textarea
          className="ts-textarea"
          rows={4}
          placeholder="Текст новости"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
        />
      </div>
      <button className="ts-btn-outline block" style={{ marginTop: 22 }} onClick={publish} disabled={busy}>
        Опубликовать
      </button>

      <div style={{ marginTop: 30 }}>
        <div className="ts-field-label">Существующие новости</div>
        {news.map((n) => (
          <div className="ts-request-row" key={n.id}>
            <span className="ts-request-title">{n.title}</span>
            <button className="ts-icon-link danger" title="Удалить новость" onClick={() => setDeleteTarget(n)}>
              <TrashIcon />
            </button>
          </div>
        ))}
        {news.length === 0 && <div className="ts-center-note">Новостей нет</div>}
      </div>

      {deleteTarget && (
        <ConfirmDialog
          title="Удалить новость?"
          message={`«${deleteTarget.title}» будет удалена без возможности восстановления.`}
          confirmLabel="Удалить"
          danger
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </section>
  );
}

function UsersTab() {
  const { flash } = useUI();
  const { profile } = useAuth();
  const { users, reload } = useAdminUsers();

  async function toggleBan(u: AdminUser) {
    try {
      await api.post(`/admin/users/${u.id}/${u.isBanned ? 'unban' : 'ban'}`);
      flash(u.isBanned ? 'Пользователь разбанен' : 'Пользователь забанен');
      reload();
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось изменить статус');
    }
  }

  return (
    <section className="ts-account-section">
      {users.map((u) => (
        <div className="ts-settings-row" key={u.id}>
          <span className="label">
            {u.name} {u.lastName} <span style={{ opacity: 0.6 }}>@{u.username}</span>
            {u.role === 'admin' && (
              <span className="ts-badge approved" style={{ marginLeft: 8 }}>
                Админ
              </span>
            )}
          </span>
          <button
            className={`ts-switch${u.isBanned ? ' on' : ''}`}
            onClick={() => toggleBan(u)}
            disabled={u.id === profile?.id}
            title={u.id === profile?.id ? 'Нельзя забанить себя' : u.isBanned ? 'Разбанить' : 'Забанить'}
          >
            <span className="ts-switch-knob" />
          </button>
        </div>
      ))}
      {users.length === 0 && <div className="ts-center-note">Пользователей нет</div>}
    </section>
  );
}

function AnalyticsTab() {
  const { analytics } = useAdminAnalytics();
  if (!analytics) return <div className="ts-center-note">Загрузка...</div>;

  const cards = [
    { label: 'Пользователи', value: analytics.usersTotal },
    { label: 'Забанено', value: analytics.bannedTotal },
    { label: 'Мероприятия всего', value: analytics.eventsTotal },
    { label: 'Предстоящие', value: analytics.eventsUpcoming },
    { label: 'Прошедшие', value: analytics.eventsPast },
    { label: 'В избранном', value: analytics.favoritesTotal },
    { label: 'Оценок оставлено', value: analytics.ratingsTotal },
    { label: 'Средняя оценка', value: analytics.ratingsAvg !== null ? analytics.ratingsAvg.toFixed(1) : '—' },
    { label: 'Заявки: на проверке', value: analytics.submissions.pending },
    { label: 'Заявки: одобрено', value: analytics.submissions.approved },
    { label: 'Заявки: отклонено', value: analytics.submissions.rejected }
  ];

  return (
    <div className="ts-admin-stats">
      {cards.map((c) => (
        <div className="ts-card-panel ts-admin-stat" key={c.label}>
          <div className="ts-admin-stat-value">{c.value}</div>
          <div className="desc">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
