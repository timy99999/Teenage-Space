import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { useNews } from '../hooks/useNews';
import { useFavorites } from '../hooks/useFavorites';
import { useRatings } from '../hooks/useRatings';
import { CATS, THEMES, TITLES, plural } from '../data/constants';
import { EventCard } from '../components/EventCard';
import { NewsCard } from '../components/NewsCard';
import { Chip } from '../components/Chip';
import { CardSizeSlider } from '../components/CardSizeSlider';

export type GridMode = 'opps' | 'fav' | 'vote' | 'news';

export function GridPage({ mode }: { mode: GridMode }) {
  const { category } = useParams();
  const [, setParams] = useSearchParams();
  const [fThemes, setFThemes] = useState<string[]>([]);
  const [fCats, setFCats] = useState<string[]>([]);
  const [fPrice, setFPrice] = useState<'free' | 'paid' | null>(null);
  const [fLevel, setFLevel] = useState<'local' | 'intl' | null>(null);
  const [ageInput, setAgeInput] = useState('');
  const [ageApplied, setAgeApplied] = useState('');

  const isOpps = mode === 'opps';
  const isFav = mode === 'fav';
  const isVote = mode === 'vote';
  const isNews = mode === 'news';

  const scope = isVote ? 'past' : isFav ? 'all' : 'upcoming';

  const { events } = useEvents({
    scope,
    category: isOpps ? category : undefined,
    categories: isVote ? fCats : undefined,
    themes: fThemes,
    price: fPrice,
    level: fLevel,
    age: ageApplied
  });
  const { news } = useNews();
  const { favorites, toggle } = useFavorites();
  const { ratings, rate } = useRatings();

  const openEvent = (id: string) => setParams({ event: id });

  let count = 0;
  let isEmpty = false;
  if (isNews) {
    count = news.length;
  } else if (isFav) {
    const filtered = events.filter((e) => favorites.has(e.id));
    count = filtered.length;
  } else {
    count = events.length;
  }

  const favEvents = isFav ? events.filter((e) => favorites.has(e.id)) : events;
  isEmpty = isNews ? news.length === 0 : favEvents.length === 0;

  const subLabel = isOpps && category ? CATS.find((c) => c.key === category)?.label ?? '' : '';
  const pageTitle = isOpps ? TITLES.opps : TITLES[mode];

  return (
    <div className="ts-grid-page">
      <header className="ts-grid-header">
        <div className="ts-grid-title-wrap">
          <h1 className="ts-grid-title">{pageTitle}</h1>
          {subLabel && <div className="ts-grid-subtitle">{subLabel}</div>}
          <div className="ts-grid-count">
            {isNews ? plural(count, 'новость', 'новости', 'новостей') : plural(count, 'мероприятие', 'мероприятия', 'мероприятий')}
          </div>
        </div>
        <div style={{ flex: 1 }} />
        {(isOpps || isVote) && (
          <div className="ts-filters">
            <div className="ts-filter-group">
              <div className="ts-filter-label">Тема</div>
              <div className="ts-filter-chips">
                {THEMES.map((t) => (
                  <Chip
                    key={t.key}
                    label={t.label}
                    small
                    onGrey
                    active={fThemes.includes(t.key)}
                    onClick={() =>
                      setFThemes((prev) => (prev.includes(t.key) ? prev.filter((x) => x !== t.key) : [...prev, t.key]))
                    }
                  />
                ))}
              </div>
            </div>
            <div className="ts-filter-group">
              <div className="ts-filter-label">Возраст</div>
              <div className="ts-age-row">
                <input
                  className="ts-age-input"
                  value={ageInput}
                  onChange={(e) => setAgeInput(e.target.value.replace(/[^0-9-]/g, ''))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setAgeApplied(ageInput);
                  }}
                  placeholder="15 или 12-15"
                />
                <button className="ts-age-apply" onClick={() => setAgeApplied(ageInput)}>
                  ✓
                </button>
              </div>
              <div className="ts-age-hint">{ageApplied ? `фильтр: ${ageApplied}` : 'например 15 или 12-15'}</div>
            </div>
            <div className="ts-filter-group">
              <div className="ts-filter-label">Цена</div>
              <div className="ts-filter-chips col">
                {[
                  { k: 'paid' as const, l: 'Платно' },
                  { k: 'free' as const, l: 'Бесплатно' }
                ].map((p) => (
                  <Chip
                    key={p.k}
                    label={p.l}
                    small
                    onGrey
                    active={fPrice === p.k}
                    onClick={() => setFPrice((prev) => (prev === p.k ? null : p.k))}
                  />
                ))}
              </div>
            </div>
            <div className="ts-filter-group">
              <div className="ts-filter-label">Уровень</div>
              <div className="ts-filter-chips col">
                {[
                  { k: 'local' as const, l: 'Локальные' },
                  { k: 'intl' as const, l: 'Международные' }
                ].map((p) => (
                  <Chip
                    key={p.k}
                    label={p.l}
                    small
                    onGrey
                    active={fLevel === p.k}
                    onClick={() => setFLevel((prev) => (prev === p.k ? null : p.k))}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {isVote && (
        <div className="ts-cat-chip-row">
          {CATS.map((c) => (
            <Chip
              key={c.key}
              label={c.label}
              active={fCats.includes(c.key)}
              onClick={() => setFCats((prev) => (prev.includes(c.key) ? prev.filter((x) => x !== c.key) : [...prev, c.key]))}
            />
          ))}
        </div>
      )}

      {isEmpty && (
        <div className="ts-empty">
          <div>
            <div className="ts-empty-title">Ничего нет</div>
            <div className="ts-empty-hint">{isFav ? 'Отмечайте мероприятия звездой — они появятся здесь' : 'Попробуйте снять часть фильтров'}</div>
          </div>
        </div>
      )}

      {!isEmpty && isNews && (
        <div className="ts-card-grid">
          {news.map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
        </div>
      )}

      {!isEmpty && !isNews && (
        <div className="ts-card-grid">
          {favEvents.map((e) => (
            <EventCard
              key={e.id}
              event={e}
              onOpen={() => openEvent(e.id)}
              isVoteMode={isVote}
              favActive={favorites.has(e.id)}
              onToggleFav={() => toggle(e.id)}
              rating={ratings[e.id] ?? 0}
              onRate={(n) => rate(e.id, n)}
            />
          ))}
        </div>
      )}

      <CardSizeSlider />
    </div>
  );
}
