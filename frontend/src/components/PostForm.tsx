import type { Dispatch, SetStateAction } from 'react';
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
}

export function PostSiteInfo({ value: form, onChange: setForm }: PostFormFieldsProps) {
  return (
    <div className="ts-field-group">
      <div>
        <div className="ts-field-label">Категория</div>
        <div className="ts-filter-chips">
          {CATS.map((c) => (
            <Chip
              key={c.key}
              label={c.label}
              active={form.category === c.key}
              onClick={() => setForm((v) => ({ ...v, category: c.key }))}
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
          <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <input
              className="ts-input"
              style={{ flex: 1, minWidth: 150 }}
              placeholder="Стоимость, сом"
              value={form.cost}
              onChange={(e) => setForm((v) => ({ ...v, cost: e.target.value }))}
            />
            <Chip label="Благотворительное мероприятие" active={form.charity} onClick={() => setForm((v) => ({ ...v, charity: !v.charity }))} />
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
      <div className="ts-date-row">
        <label className="ts-date-field">
          Дата мероприятия (необязательно)
          <input
            type="date"
            className="ts-input"
            value={form.eventDate}
            onChange={(e) => setForm((v) => ({ ...v, eventDate: e.target.value }))}
          />
        </label>
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
        <input className="ts-input" placeholder="Адрес" value={form.address} onChange={(e) => setForm((v) => ({ ...v, address: e.target.value }))} />
        <input
          className="ts-input"
          placeholder="Для кого"
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
    category: '',
    themes: [],
    ageMin: 0,
    ageMax: 0,
    format: '',
    price: null,
    cost: '',
    charity: false,
    level: null,
    eventDate: '',
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
    ageMin: form.ageMin === '' ? 0 : form.ageMin,
    ageMax: form.ageMax === '' ? 0 : form.ageMax
  };
}

/** Pre-fills the shared form when editing an already-published event. */
export function eventToPostForm(event: EventItem): PostFormValue {
  return {
    imageUrl: event.imageUrl,
    title: event.title,
    category: event.category,
    themes: event.themes,
    ageMin: event.ageMin,
    ageMax: event.ageMax,
    format: event.format,
    price: event.price,
    cost: event.cost ?? '',
    charity: false,
    level: event.level,
    eventDate: event.eventDate ?? '',
    deadlineDate: event.deadlineDate ?? '',
    address: event.place,
    audience: '',
    description: event.description,
    registrationUrl: event.registrationUrl ?? '',
    extraLinkTitle: '',
    extraLinkUrl: '',
    instagram: event.instagram ? 'instagram' : '',
    telegram: event.telegram ?? ''
  };
}
