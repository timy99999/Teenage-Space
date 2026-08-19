import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { category } = useParams();
  const [, setParams] = useSearchParams();
  const [fThemes, setFThemes] = useState<string[]>([]);
  const [fCats, setFCats] = useState<string[]>([]);
  const [fPrice, setFPrice] = useState<'free' | 'paid' | null>(null);
  const [fLevel, setFLevel] = useState<'local' | 'intl' | null>(null);
  const [ageInput, setAgeInput] = useState('');
  const [ageApplied, setAgeApplied] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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

  const activeFilterCount = fThemes.length + (fPrice ? 1 : 0) + (fLevel ? 1 : 0) + (ageApplied ? 1 : 0);
  const resetFilters = () => {
    setFThemes([]);
    setFPrice(null);
    setFLevel(null);
    setAgeInput('');
    setAgeApplied('');
  };

  return (
    <div className={`ts-grid-page${isOpps || isVote ? ' ts-grid-page-compact' : ''}`}>
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
              <div className="ts-filter-chips grid-2">
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

      <div className="ts-mobile-topbar">
        <header className="ts-mobile-pageheader">
          <div className="ts-mobile-pagetitle-wrap">
            <div className="ts-mobile-pagetitle">{pageTitle}</div>
            {subLabel && <div className="ts-mobile-pagesubtitle">{subLabel}</div>}
          </div>
          {(isOpps || isVote) && (
            <button className="ts-mobile-hamburger" aria-label="Фильтры" onClick={() => setMobileFiltersOpen(true)}>
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="0" y1="1" x2="20" y2="1" />
                <line x1="0" y1="8" x2="20" y2="8" />
                <line x1="0" y1="15" x2="20" y2="15" />
              </svg>
              {activeFilterCount > 0 && <span className="ts-mobile-hamburger-badge">{activeFilterCount}</span>}
            </button>
          )}
        </header>

        {isOpps && (
          <div className="ts-mobile-subtabs">
            <button className={`ts-mobile-subtab${!category ? ' active' : ''}`} onClick={() => navigate('/opportunities')}>
              Все
            </button>
            {CATS.map((c) => (
              <button
                key={c.key}
                className={`ts-mobile-subtab${category === c.key ? ' active' : ''}`}
                onClick={() => navigate(`/opportunities/${c.key}`)}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {(isOpps || isVote) && mobileFiltersOpen && (
        <div className="ts-mobile-filter-overlay" onClick={() => setMobileFiltersOpen(false)}>
          <div className="ts-mobile-filter-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="ts-mobile-filter-handle" />
            <div className="ts-mobile-filter-title">Фильтры</div>

            <div className="ts-mobile-filter-group">
              <div className="ts-mobile-filter-group-label">Тема</div>
              <div className="ts-mobile-filter-chips">
                {THEMES.map((t) => (
                  <Chip
                    key={t.key}
                    label={t.label}
                    active={fThemes.includes(t.key)}
                    onClick={() =>
                      setFThemes((prev) => (prev.includes(t.key) ? prev.filter((x) => x !== t.key) : [...prev, t.key]))
                    }
                  />
                ))}
              </div>
            </div>

            <div className="ts-mobile-filter-group">
              <div className="ts-mobile-filter-group-label">Возраст</div>
              <div className="ts-mobile-filter-age-row">
                <input
                  className="ts-mobile-age-input"
                  value={ageInput}
                  onChange={(e) => setAgeInput(e.target.value.replace(/[^0-9-]/g, ''))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setAgeApplied(ageInput);
                  }}
                  placeholder="15 или 12-15"
                />
                <button className="ts-mobile-age-apply" onClick={() => setAgeApplied(ageInput)}>
                  Применить
                </button>
              </div>
              <div className="ts-mobile-filter-hint">{ageApplied ? `фильтр: ${ageApplied}` : 'например 15 или 12-15'}</div>
            </div>

            <div className="ts-mobile-filter-group">
              <div className="ts-mobile-filter-group-label">Цена</div>
              <div className="ts-mobile-filter-chips">
                {[
                  { k: 'paid' as const, l: 'Платно' },
                  { k: 'free' as const, l: 'Бесплатно' }
                ].map((p) => (
                  <Chip
                    key={p.k}
                    label={p.l}
                    active={fPrice === p.k}
                    onClick={() => setFPrice((prev) => (prev === p.k ? null : p.k))}
                  />
                ))}
              </div>
            </div>

            <div className="ts-mobile-filter-group">
              <div className="ts-mobile-filter-group-label">Уровень</div>
              <div className="ts-mobile-filter-chips">
                {[
                  { k: 'local' as const, l: 'Локальные' },
                  { k: 'intl' as const, l: 'Международные' }
                ].map((p) => (
                  <Chip
                    key={p.k}
                    label={p.l}
                    active={fLevel === p.k}
                    onClick={() => setFLevel((prev) => (prev === p.k ? null : p.k))}
                  />
                ))}
              </div>
            </div>

            <div className="ts-mobile-filter-actions">
              <button className="ts-mobile-filter-reset" onClick={resetFilters}>
                Сбросить
              </button>
              <button className="ts-mobile-filter-apply" onClick={() => setMobileFiltersOpen(false)}>
                Показать
              </button>
            </div>
          </div>
        </div>
      )}

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
