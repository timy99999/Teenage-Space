import type { Dispatch, SetStateAction } from 'react';
import { Chip } from './Chip';
import { ImageUploadField } from './ImageUploadField';
import { CATS } from '../data/constants';
import type { CreateEventInput } from '../types';

const FORMATS = ['Личное', 'Командное'];
const PRICES = [
  { k: 'free' as const, l: 'Бесплатно' },
  { k: 'paid' as const, l: 'Платно' }
];
const LEVELS = [
  { k: 'local' as const, l: 'Локальное' },
  { k: 'intl' as const, l: 'Международное' }
];

interface EventFormProps {
  value: CreateEventInput;
  onChange: Dispatch<SetStateAction<CreateEventInput>>;
}

export function EventForm({ value: form, onChange: setForm }: EventFormProps) {
  return (
    <div className="ts-field-group">
      <ImageUploadField value={form.imageUrl} onChange={(imageUrl) => setForm((v) => ({ ...v, imageUrl }))} />
      <input
        className="ts-input"
        placeholder="Название"
        value={form.title}
        onChange={(e) => setForm((v) => ({ ...v, title: e.target.value }))}
      />
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
      </div>
      <div>
        <div className="ts-field-label">Уровень</div>
        <div className="ts-filter-chips">
          {LEVELS.map((l) => (
            <Chip key={l.k} label={l.l} active={form.level === l.k} onClick={() => setForm((v) => ({ ...v, level: l.k }))} />
          ))}
        </div>
      </div>
      <div className="ts-date-row">
        <label className="ts-date-field">
          Возраст от
          <input
            className="ts-input"
            type="number"
            value={form.ageMin}
            onChange={(e) => setForm((v) => ({ ...v, ageMin: Number(e.target.value) }))}
          />
        </label>
        <label className="ts-date-field">
          Возраст до
          <input
            className="ts-input"
            type="number"
            value={form.ageMax}
            onChange={(e) => setForm((v) => ({ ...v, ageMax: Number(e.target.value) }))}
          />
        </label>
        <label className="ts-date-field">
          Подпись возраста
          <input className="ts-input" value={form.ageLabel} onChange={(e) => setForm((v) => ({ ...v, ageLabel: e.target.value }))} />
        </label>
      </div>
      <div className="ts-date-row">
        <label className="ts-date-field">
          Дата мероприятия
          <input
            type="date"
            className="ts-input"
            value={form.eventDate}
            onChange={(e) => setForm((v) => ({ ...v, eventDate: e.target.value }))}
          />
        </label>
        <label className="ts-date-field">
          Дедлайн регистрации
          <input
            type="date"
            className="ts-input"
            value={form.deadlineDate ?? ''}
            onChange={(e) => setForm((v) => ({ ...v, deadlineDate: e.target.value || null }))}
          />
        </label>
      </div>
      <input
        className="ts-input"
        placeholder="Место проведения"
        value={form.place}
        onChange={(e) => setForm((v) => ({ ...v, place: e.target.value }))}
      />
      <input
        className="ts-input"
        placeholder="Краткое описание для карточки"
        value={form.shortDesc}
        onChange={(e) => setForm((v) => ({ ...v, shortDesc: e.target.value }))}
      />
      <textarea
        className="ts-textarea"
        rows={4}
        placeholder="Полное описание"
        value={form.description}
        onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))}
      />
      <input
        className="ts-input"
        placeholder="Ссылка на регистрацию"
        value={form.registrationUrl ?? ''}
        onChange={(e) => setForm((v) => ({ ...v, registrationUrl: e.target.value || null }))}
      />
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Open Sans', sans-serif", fontSize: 14 }}>
        <input type="checkbox" checked={form.instagram} onChange={(e) => setForm((v) => ({ ...v, instagram: e.target.checked }))} />
        Анонс был в Instagram
      </label>
    </div>
  );
}
