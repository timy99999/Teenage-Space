import { useState, type Dispatch, type SetStateAction } from 'react';
import { Chip } from './Chip';
import { ImageUploadField } from './ImageUploadField';
import { CATS, THEMES } from '../data/constants';
import type { EventItem, PostFormValue } from '../types';

const FORMATS = ['Личное', 'Командное'];
const PRICES = [
  { k: 'free' as const, l: 'Бесплатно' },
  { k: 'paid' as const, l: 'Платно' }
];
const LEVELS = [
  { k: 'local' as const, l: 'Локальное' },
  { k: 'intl' as const, l: 'Международное' }
];

function parseAge(raw: string): number | '' {
  if (raw === '') return '';
  const n = Number(raw);
  if (Number.isNaN(n)) return '';
  return Math.min(99, Math.max(0, Math.trunc(n)));
}

export interface PostFormFieldsProps {
  value: PostFormValue;
  onChange: Dispatch<SetStateAction<PostFormValue>>;
  /** Admins may tag an event with several categories; the public form stays single-select. */
  multiCategory?: boolean;
}

export function PostSiteInfo({ value: form, onChange: setForm, multiCategory = false }: PostFormFieldsProps) {
  const [dateRange, setDateRange] = useState(() => !!form.eventDateEnd);
  const anyAge =
    form.ageMin !== '' && form.ageMax !== '' && Number(form.ageMin) === 0 && Number(form.ageMax) === 99;

  function toggleDateRange() {
    setDateRange((r) => {
      const next = !r;
      if (!next) setForm((v) => ({ ...v, eventDateEnd: '' }));
      return next;
    });
  }

  return (
    <div className="ts-field-group">
      <div>
        <div className="ts-field-label">{multiCategory ? 'Категории' : 'Категория'}</div>
        <div className="ts-filter-chips">
          {CATS.map((c) => (
            <Chip
              key={c.key}
              label={c.label}
              active={form.categories.includes(c.key)}
              onClick={() =>
                setForm((v) => ({
                  ...v,
                  categories: multiCategory
                    ? v.categories.includes(c.key)
                      ? v.categories.filter((x) => x !== c.key)
                      : [...v.categories, c.key]
                    : [c.key]
                }))
              }
            />
          ))}
        </div>
      </div>
      <div>
        <div className="ts-field-label">Тема</div>
        <div className="ts-filter-chips">
          {THEMES.map((c) => (
            <Chip
              key={c.key}
              label={c.label}
              active={form.themes.includes(c.key)}
              onClick={() =>
                setForm((v) => ({
                  ...v,
                  themes: v.themes.includes(c.key) ? v.themes.filter((x) => x !== c.key) : [...v.themes, c.key]
                }))
              }
            />
          ))}
        </div>
      </div>
      <div>
        <div className="ts-field-label">Возраст</div>
        <div className="ts-filter-chips" style={{ marginBottom: anyAge ? 0 : 12 }}>
          <Chip
            label="Любой"
            active={anyAge}
            onClick={() =>
              setForm((v) => (anyAge ? { ...v, ageMin: '', ageMax: '' } : { ...v, ageMin: 0, ageMax: 99 }))
            }
          />
        </div>
        {!anyAge && (
          <div className="ts-date-row">
            <label className="ts-date-field">
              Возраст от
              <input
                className="ts-input"
                type="number"
                min={0}
                max={99}
                value={form.ageMin}
                onChange={(e) => setForm((v) => ({ ...v, ageMin: parseAge(e.target.value) }))}
              />
            </label>
            <label className="ts-date-field">
              Возраст до
              <input
                className="ts-input"
                type="number"
                min={0}
                max={99}
                value={form.ageMax}
                onChange={(e) => setForm((v) => ({ ...v, ageMax: parseAge(e.target.value) }))}
              />
            </label>
          </div>
        )}
      </div>
      <div>
        <div className="ts-field-label">Участие</div>
        <div className="ts-filter-chips">
          {FORMATS.map((f) => (
            <Chip key={f} label={f} active={form.format === f} onClick={() => setForm((v) => ({ ...v, format: f }))} />
          ))}
        </div>
      </div>
      <div>
        <div className="ts-field-label">Цена</div>
        <div className="ts-filter-chips">
          {PRICES.map((p) => (
            <Chip key={p.k} label={p.l} active={form.price === p.k} onClick={() => setForm((v) => ({ ...v, price: p.k }))} />
          ))}
        </div>
        {form.price === 'paid' && (
          <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <input
                className="ts-input"
                style={{ flex: 1, minWidth: 150 }}
                placeholder="Стоимость, сом"
                value={form.cost}
                onChange={(e) => setForm((v) => ({ ...v, cost: e.target.value }))}
              />
              <Chip label="Благотворительное мероприятие" active={form.charity} onClick={() => setForm((v) => ({ ...v, charity: !v.charity }))} />
            </div>
            {form.charity && (
              <div className="ts-hint" style={{ marginTop: 10 }}>
                Понадобится подтверждение — администратор свяжется с вами, чтобы его получить.
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <div className="ts-field-label">Уровень мероприятия</div>
        <div className="ts-filter-chips">
          {LEVELS.map((l) => (
            <Chip key={l.k} label={l.l} active={form.level === l.k} onClick={() => setForm((v) => ({ ...v, level: l.k }))} />
          ))}
        </div>
      </div>
      <div>
        <div className="ts-date-row">
          <label className="ts-date-field">
            {dateRange ? 'Дата начала' : 'Дата мероприятия'} (необязательно)
            <input
              type="date"
              className="ts-input"
              value={form.eventDate}
              onChange={(e) => setForm((v) => ({ ...v, eventDate: e.target.value }))}
            />
          </label>
          {dateRange && (
            <label className="ts-date-field">
              Дата окончания
              <input
                type="date"
                className="ts-input"
                value={form.eventDateEnd}
                onChange={(e) => setForm((v) => ({ ...v, eventDateEnd: e.target.value }))}
              />
            </label>
          )}
          <label className="ts-date-field">
            Время (необязательно)
            <input
              type="time"
              className="ts-input"
              value={form.eventTime}
              onChange={(e) => setForm((v) => ({ ...v, eventTime: e.target.value }))}
            />
          </label>
        </div>
        <button type="button" className="ts-btn-outline small" style={{ marginTop: 10 }} onClick={toggleDateRange}>
          {dateRange ? 'Указать одну дату' : 'Указать две даты'}
        </button>
      </div>
      <div className="ts-date-row">
        <label className="ts-date-field">
          Дедлайн регистрации (необязательно)
          <input
            type="date"
            className="ts-input"
            value={form.deadlineDate}
            onChange={(e) => setForm((v) => ({ ...v, deadlineDate: e.target.value }))}
          />
        </label>
      </div>
    </div>
  );
}

export function PostCardInfo({ value: form, onChange: setForm }: PostFormFieldsProps) {
  return (
    <>
      <ImageUploadField value={form.imageUrl} onChange={(imageUrl) => setForm((v) => ({ ...v, imageUrl }))} />
      <div className="ts-hint">Фото обязательно. Другой формат можно кадрировать под 3:4</div>
      <div className="ts-form-stack">
        <input className="ts-input" placeholder="Название" value={form.title} onChange={(e) => setForm((v) => ({ ...v, title: e.target.value }))} />
        <input
          className="ts-input"
          placeholder="Адрес (необязательно)"
          value={form.address}
          onChange={(e) => setForm((v) => ({ ...v, address: e.target.value }))}
        />
        <input
          className="ts-input"
          placeholder="Для кого (необязательно)"
          value={form.audience}
          onChange={(e) => setForm((v) => ({ ...v, audience: e.target.value }))}
        />
        <textarea
          className="ts-textarea"
          placeholder="Описание"
          rows={4}
          value={form.description}
          onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))}
        />
        <div style={{ marginTop: 6, fontFamily: "'Open Sans',sans-serif", fontSize: 16 }}>Дополнительные ссылки</div>
        <input
          className="ts-input"
          placeholder="Ссылка на регистрацию"
          value={form.registrationUrl}
          onChange={(e) => setForm((v) => ({ ...v, registrationUrl: e.target.value }))}
        />
        <div className="ts-link-row">
          <input
            className="ts-input"
            placeholder="Название ссылки"
            value={form.extraLinkTitle}
            onChange={(e) => setForm((v) => ({ ...v, extraLinkTitle: e.target.value }))}
          />
          <input
            className="ts-input"
            placeholder="URL"
            value={form.extraLinkUrl}
            onChange={(e) => setForm((v) => ({ ...v, extraLinkUrl: e.target.value }))}
          />
        </div>
        <input
          className="ts-input"
          placeholder="Instagram"
          value={form.instagram}
          onChange={(e) => setForm((v) => ({ ...v, instagram: e.target.value }))}
        />
        <input
          className="ts-input"
          placeholder="Telegram"
          value={form.telegram}
          onChange={(e) => setForm((v) => ({ ...v, telegram: e.target.value }))}
        />
      </div>
    </>
  );
}

export function emptyPostForm(): PostFormValue {
  return {
    imageUrl: null,
    title: '',
    categories: [],
    themes: [],
    ageMin: 0,
    ageMax: 0,
    format: '',
    price: null,
    cost: '',
    charity: false,
    level: null,
    eventDate: '',
    eventDateEnd: '',
    eventTime: '',
    deadlineDate: '',
    address: '',
    audience: '',
    description: '',
    registrationUrl: '',
    extraLinkTitle: '',
    extraLinkUrl: '',
    instagram: '',
    telegram: ''
  };
}

/** Coerces the "empty while typing" age state to a number before sending to the API. */
export function postFormPayload(form: PostFormValue) {
  return {
    ...form,
    category: form.categories[0] ?? '',
    categories: form.categories,
    ageMin: form.ageMin === '' ? 0 : form.ageMin,
    ageMax: form.ageMax === '' ? 0 : form.ageMax,
    charity: form.price === 'paid' ? form.charity : false
  };
}

/** Pre-fills the shared form when editing an already-published event. */
export function eventToPostForm(event: EventItem): PostFormValue {
  return {
    imageUrl: event.imageUrl,
    title: event.title,
    categories: event.categories,
    themes: event.themes,
    ageMin: event.ageMin,
    ageMax: event.ageMax,
    format: event.format,
    price: event.price,
    cost: event.cost ?? '',
    charity: event.charity,
    level: event.level,
    eventDate: event.eventDate ?? '',
    eventDateEnd: event.eventDateEnd ?? '',
    eventTime: event.eventTime ?? '',
    deadlineDate: event.deadlineDate ?? '',
    address: event.place,
    audience: event.audience ?? '',
    description: event.description,
    registrationUrl: event.registrationUrl ?? '',
    extraLinkTitle: event.extraLinkTitle ?? '',
    extraLinkUrl: event.extraLinkUrl ?? '',
    instagram: event.instagram ?? '',
    telegram: event.telegram ?? ''
  };
}
