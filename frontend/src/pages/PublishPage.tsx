import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATS, THEMES, AGES } from '../data/constants';
import { Chip } from '../components/Chip';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';
import { useSubmissions } from '../hooks/useSubmissions';
import { api } from '../lib/api';
import type { Submission } from '../types';

const FORMATS = ['Личное', 'Командное'] as const;
const PRICES = [
  { k: 'free', l: 'Бесплатно' },
  { k: 'paid', l: 'Платно' }
] as const;
const LEVELS = [
  { k: 'local', l: 'Локальное' },
  { k: 'intl', l: 'Международное' }
] as const;

export function PublishPage() {
  const { session } = useAuth();
  const { flash } = useUI();
  const navigate = useNavigate();
  const { reload } = useSubmissions();

  const [cats, setCats] = useState<string[]>([]);
  const [themes, setThemes] = useState<string[]>([]);
  const [ages, setAges] = useState<string[]>([]);
  const [format, setFormat] = useState<string[]>([]);
  const [price, setPrice] = useState<'free' | 'paid' | null>(null);
  const [level, setLevel] = useState<'local' | 'intl' | null>(null);
  const [charity, setCharity] = useState(false);
  const [cost, setCost] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [audience, setAudience] = useState('');
  const [description, setDescription] = useState('');
  const [regUrl, setRegUrl] = useState('');
  const [extraLinkTitle, setExtraLinkTitle] = useState('');
  const [extraLinkUrl, setExtraLinkUrl] = useState('');
  const [instagram, setInstagram] = useState('');
  const [telegram, setTelegram] = useState('');
  const [published, setPublished] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleIn = (arr: string[], setArr: (v: string[]) => void, val: string) =>
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  async function submit() {
    if (!session) {
      flash('Войдите, чтобы опубликовать мероприятие');
      navigate('/auth');
      return;
    }
    if (!title.trim()) {
      flash('Укажите название мероприятия');
      return;
    }
    setSubmitting(true);
    try {
      await api.post<Submission>('/submissions', {
        title,
        categories: cats,
        themes,
        ages,
        format,
        price,
        cost: price === 'paid' ? cost : null,
        charity: price === 'paid' ? charity : false,
        level,
        eventDate: eventDate || null,
        deadlineDate: deadlineDate || null,
        address,
        audience,
        description,
        registrationUrl: regUrl || null,
        extraLinkTitle: extraLinkTitle || null,
        extraLinkUrl: extraLinkUrl || null,
        instagram: instagram || null,
        telegram: telegram || null,
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
            <div className="ts-field-group">
              <div>
                <div className="ts-field-label">Категория</div>
                <div className="ts-filter-chips">
                  {CATS.map((c) => (
                    <Chip key={c.key} label={c.label} active={cats.includes(c.key)} onClick={() => toggleIn(cats, setCats, c.key)} />
                  ))}
                </div>
              </div>
              <div>
                <div className="ts-field-label">Тема</div>
                <div className="ts-filter-chips">
                  {THEMES.map((c) => (
                    <Chip key={c.key} label={c.label} active={themes.includes(c.key)} onClick={() => toggleIn(themes, setThemes, c.key)} />
                  ))}
                </div>
              </div>
              <div>
                <div className="ts-field-label">Возраст</div>
                <div className="ts-filter-chips">
                  {AGES.map((a) => (
                    <Chip key={a} label={a} active={ages.includes(a)} onClick={() => toggleIn(ages, setAges, a)} />
                  ))}
                </div>
              </div>
              <div>
                <div className="ts-field-label">Участие</div>
                <div className="ts-filter-chips">
                  {FORMATS.map((f) => (
                    <Chip key={f} label={f} active={format.includes(f)} onClick={() => toggleIn(format, setFormat, f)} />
                  ))}
                </div>
              </div>
              <div>
                <div className="ts-field-label">Цена</div>
                <div className="ts-filter-chips">
                  {PRICES.map((p) => (
                    <Chip key={p.k} label={p.l} active={price === p.k} onClick={() => setPrice(p.k)} />
                  ))}
                </div>
                {price === 'paid' && (
                  <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                    <input
                      className="ts-input"
                      style={{ flex: 1, minWidth: 150 }}
                      placeholder="Стоимость, сом"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                    />
                    <Chip label="Благотворительное мероприятие" active={charity} onClick={() => setCharity((v) => !v)} />
                  </div>
                )}
                {price === 'paid' && charity && (
                  <div className="ts-hint" style={{ marginTop: 8 }}>
                    Администратор может запросить подтверждающие документы
                  </div>
                )}
              </div>
              <div>
                <div className="ts-field-label">Уровень мероприятия</div>
                <div className="ts-filter-chips">
                  {LEVELS.map((l) => (
                    <Chip key={l.k} label={l.l} active={level === l.k} onClick={() => setLevel(l.k)} />
                  ))}
                </div>
              </div>
              <div className="ts-date-row">
                <label className="ts-date-field">
                  Дата мероприятия
                  <input type="date" className="ts-input" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                </label>
                <label className="ts-date-field">
                  Дедлайн регистрации (необязательно)
                  <input type="date" className="ts-input" value={deadlineDate} onChange={(e) => setDeadlineDate(e.target.value)} />
                </label>
              </div>
            </div>
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
          <div className="ts-publish-photo">
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'grid',
                placeItems: 'center',
                fontFamily: "'Open Sans', sans-serif",
                fontSize: 12,
                color: 'var(--ts-fg)',
                opacity: 0.45
              }}
            >
              Фото 3:4
            </div>
          </div>
          <div className="ts-hint">Фото обязательно. Другой формат можно кадрировать под 3:4</div>
          <div className="ts-form-stack">
            <input className="ts-input" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input className="ts-input" placeholder="Адрес" value={address} onChange={(e) => setAddress(e.target.value)} />
            <input className="ts-input" placeholder="Для кого" value={audience} onChange={(e) => setAudience(e.target.value)} />
            <textarea
              className="ts-textarea"
              placeholder="Описание"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div style={{ marginTop: 6, fontFamily: "'Open Sans',sans-serif", fontSize: 16 }}>Дополнительные ссылки</div>
            <input
              className="ts-input"
              placeholder="Ссылка на регистрацию"
              value={regUrl}
              onChange={(e) => setRegUrl(e.target.value)}
            />
            <div className="ts-link-row">
              <input
                className="ts-input"
                placeholder="Название ссылки"
                value={extraLinkTitle}
                onChange={(e) => setExtraLinkTitle(e.target.value)}
              />
              <input className="ts-input" placeholder="URL" value={extraLinkUrl} onChange={(e) => setExtraLinkUrl(e.target.value)} />
            </div>
            <input className="ts-input" placeholder="Instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
            <input className="ts-input" placeholder="Telegram" value={telegram} onChange={(e) => setTelegram(e.target.value)} />
          </div>
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
