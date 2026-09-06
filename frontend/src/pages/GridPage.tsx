import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useNews } from '../hooks/useNews';
import { useFavorites } from '../hooks/useFavorites';
import { useRatings } from '../hooks/useRatings';
import { useCardViewCounts, cardViewKey } from '../hooks/useTraffic';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';
import { api } from '../lib/api';
import { CATS, NAV_CATS, THEMES, TITLES, plural } from '../data/constants';
import { EventCard } from '../components/EventCard';
import { NewsCard } from '../components/NewsCard';
import { Chip } from '../components/Chip';
import { CardSizeSlider } from '../components/CardSizeSlider';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { EditEventModal } from '../components/EditEventModal';
import type { EventItem } from '../types';

type ConfirmKind = 'archive' | 'voting' | 'delete';

const CONFIRM_COPY: Record<ConfirmKind, { title: string; message: (title: string) => string; confirmLabel: string; endpoint: (id: string) => string; method: 'del' | 'post'; success: string }> = {
  archive: {
    title: 'Перенести в архив?',
    message: (title) => `«${title}» будет скрыт с сайта и перенесён в архив.`,
    confirmLabel: 'В архив',
    endpoint: (id) => `/admin/events/${id}/archive`,
    method: 'post',
    success: 'Перенесено в архив'
  },
  voting: {
    title: 'Перенести в голосование?',
    message: (title) => `«${title}» пропадёт из «Возможности» и появится в «Голосование».`,
    confirmLabel: 'В голосование',
    endpoint: (id) => `/admin/events/${id}/move-to-voting`,
    method: 'post',
    success: 'Перенесено в голосование'
  },
  delete: {
    title: 'Удалить пост?',
    message: (title) => `«${title}» будет удалён без возможности восстановления.`,
    confirmLabel: 'Удалить',
    endpoint: (id) => `/admin/events/${id}`,
    method: 'del',
    success: 'Пост удалён'
  }
};

export type GridMode = 'opps' | 'fav' | 'vote' | 'news';

const THEME_KEYS = THEMES.map((t) => t.key);
const CAT_KEYS = NAV_CATS.map((c) => c.key);
// Filter params that live in the URL (and, for the catalog, in localStorage).
const URL_FILTER_KEYS = ['themes', 'cats', 'price', 'level', 'age', 'q', 'sort'] as const;
// Subset persisted to localStorage — search text and sort are intentionally NOT
// remembered across fresh visits, only the actual filters.
const REMEMBERED_KEYS = ['themes', 'cats', 'price', 'level', 'age'] as const;
const FILTERS_LS_KEY = 'ts-opps-filters-v1';

export function GridPage({ mode }: { mode: GridMode }) {
  const navigate = useNavigate();
  const { category } = useParams();
  const [params, setParams] = useSearchParams();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());
  const [editedEvents, setEditedEvents] = useState<Record<string, EventItem>>({});
  const [confirmTarget, setConfirmTarget] = useState<{ event: EventItem; kind: ConfirmKind } | null>(null);
  const [editTarget, setEditTarget] = useState<EventItem | null>(null);
  const { isSuperAdmin, hasPerm } = useAuth();
  const canEditCards = hasPerm('card_edit');
  const { flash } = useUI();
  const cardViewCounts = useCardViewCounts();

  const isOpps = mode === 'opps';
  const isFav = mode === 'fav';
  const isVote = mode === 'vote';
  const isNews = mode === 'news';

  const scope = isVote ? 'past' : isFav ? 'all' : 'upcoming';

  // ---- filter state, derived straight from the URL (single source of truth) ----
  const readList = (key: string, allowed: string[]) =>
    (params.get(key)?.split(',') ?? []).map((s) => s.trim()).filter((v) => allowed.includes(v));

  const fThemes = readList('themes', THEME_KEYS);
  const fCats = readList('cats', CAT_KEYS);
  const priceParam = params.get('price');
  const fPrice: 'free' | 'paid' | null = priceParam === 'free' || priceParam === 'paid' ? priceParam : null;
  const levelParam = params.get('level');
  const fLevel: 'local' | 'intl' | null = levelParam === 'local' || levelParam === 'intl' ? levelParam : null;
  const ageApplied = (params.get('age') ?? '').trim();
  const sort: 'new' | 'deadline' = params.get('sort') === 'deadline' ? 'deadline' : 'new';
  const qApplied = isOpps ? (params.get('q') ?? '').trim() : '';

  // Local, uncommitted input state (mirrors the URL, resynced on back/forward).
  const [ageInput, setAgeInput] = useState(ageApplied);
  const [searchInput, setSearchInput] = useState(qApplied);
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  useEffect(() => {
    if (ageApplied !== ageInput.trim()) setAgeInput(ageApplied);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ageApplied]);

  useEffect(() => {
    if (qApplied !== searchInput.trim()) setSearchInput(qApplied);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qApplied]);

  const patchParams = (mut: (p: URLSearchParams) => void, replace = true) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        mut(next);
        return next;
      },
      { replace }
    );
  };

  const setSingle = (key: string, value: string | null) =>
    patchParams((p) => {
      if (value) p.set(key, value);
      else p.delete(key);
    });

  const toggleInList = (key: string, allowed: string[], value: string) =>
    patchParams((p) => {
      const cur = (p.get(key)?.split(',') ?? []).filter((v) => allowed.includes(v));
      const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
      if (next.length) p.set(key, next.join(','));
      else p.delete(key);
    });

  const toggleTheme = (k: string) => toggleInList('themes', THEME_KEYS, k);
  const toggleCat = (k: string) => toggleInList('cats', CAT_KEYS, k);
  const togglePrice = (k: 'free' | 'paid') => setSingle('price', fPrice === k ? null : k);
  const toggleLevel = (k: 'local' | 'intl') => setSingle('level', fLevel === k ? null : k);
  const applyAge = () => setSingle('age', ageInput.trim() || null);

  // Push the debounced search term into the URL (catalog only).
  useEffect(() => {
    if (!isOpps) return;
    const next = debouncedSearch.trim();
    if ((params.get('q') ?? '').trim() === next) return;
    patchParams((p) => {
      if (next) p.set('q', next);
      else p.delete('q');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, isOpps]);

  // localStorage: restore filters on a fresh visit that has no filter params,
  // and keep the store in sync afterwards. URL params always win.
  const hydratedRef = useRef(false);
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    if (!isOpps) return;
    if (URL_FILTER_KEYS.some((k) => params.has(k))) return;
    let saved: Record<string, unknown> | null = null;
    try {
      saved = JSON.parse(localStorage.getItem(FILTERS_LS_KEY) || 'null');
    } catch {
      saved = null;
    }
    if (!saved || typeof saved !== 'object') return;
    patchParams((p) => {
      for (const k of REMEMBERED_KEYS) {
        const v = saved![k];
        if (typeof v === 'string' && v) p.set(k, v);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isOpps) return;
    const obj: Record<string, string> = {};
    for (const k of REMEMBERED_KEYS) {
      const v = params.get(k);
      if (v) obj[k] = v;
    }
    try {
      if (Object.keys(obj).length) localStorage.setItem(FILTERS_LS_KEY, JSON.stringify(obj));
      else localStorage.removeItem(FILTERS_LS_KEY);
    } catch {
      /* localStorage unavailable — non-fatal */
    }
  }, [params, isOpps]);

  const { events: fetchedEvents } = useEvents({
    scope,
    category: isOpps ? category : undefined,
    categories: isVote ? fCats : undefined,
    themes: fThemes,
    price: fPrice,
    level: fLevel,
    age: ageApplied,
    q: isOpps ? qApplied : undefined,
    sort: isOpps ? sort : undefined
  });
  const events = fetchedEvents.filter((e) => !removedIds.has(e.id)).map((e) => editedEvents[e.id] ?? e);
  const { news } = useNews();
  const { favorites, toggle } = useFavorites();
  const { ratings, rate } = useRatings();

  // Preserve the current filter query when opening a card (push, so Back closes the modal).
  const openEvent = (id: string) =>
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('event', id);
      return next;
    });

  async function runConfirmedAction() {
    if (!confirmTarget) return;
    const { event, kind } = confirmTarget;
    const copy = CONFIRM_COPY[kind];
    setConfirmTarget(null);
    try {
      if (copy.method === 'del') await api.del(copy.endpoint(event.id));
      else await api.post(copy.endpoint(event.id));
      setRemovedIds((prev) => new Set(prev).add(event.id));
      flash(copy.success);
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Не удалось выполнить действие');
    }
  }

  let count = 0;
  if (isNews) {
    count = news.length;
  } else if (isFav) {
    count = events.filter((e) => favorites.has(e.id)).length;
  } else {
    count = events.length;
  }

  const favEvents = isFav ? events.filter((e) => favorites.has(e.id)) : events;
  const isEmpty = isNews ? news.length === 0 : favEvents.length === 0;

  const subLabel = isOpps && category ? CATS.find((c) => c.key === category)?.label ?? '' : '';
  const pageTitle = isOpps ? TITLES.opps : TITLES[mode];

  const activeFilterCount =
    fThemes.length + fCats.length + (fPrice ? 1 : 0) + (fLevel ? 1 : 0) + (ageApplied ? 1 : 0) + (qApplied ? 1 : 0);
  const nonSearchFilterCount = activeFilterCount - (qApplied ? 1 : 0);
  const anyActive = activeFilterCount > 0 || sort !== 'new';

  const resetAll = () => {
    setAgeInput('');
    setSearchInput('');
    patchParams((p) => URL_FILTER_KEYS.forEach((k) => p.delete(k)));
  };
  const clearSearchOnly = () => {
    setSearchInput('');
    setSingle('q', null);
  };
  const resetFiltersKeepSearch = () => {
    setAgeInput('');
    patchParams((p) => REMEMBERED_KEYS.forEach((k) => p.delete(k)));
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
                  <Chip key={t.key} label={t.label} small onGrey active={fThemes.includes(t.key)} onClick={() => toggleTheme(t.key)} />
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
                    if (e.key === 'Enter') applyAge();
                  }}
                  placeholder="15 или 12-15"
                />
                <button className="ts-age-apply" onClick={applyAge}>
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
                  <Chip key={p.k} label={p.l} small onGrey active={fPrice === p.k} onClick={() => togglePrice(p.k)} />
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
                  <Chip key={p.k} label={p.l} small onGrey active={fLevel === p.k} onClick={() => toggleLevel(p.k)} />
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
            {NAV_CATS.map((c) => (
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

      {isOpps && (
        <div className="ts-catalog-toolbar">
          <div className="ts-search">
            <svg className="ts-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="ts-search-input"
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
              }}
              placeholder="Поиск по названию и описанию"
              aria-label="Поиск по возможностям"
            />
            {searchInput && (
              <button className="ts-search-clear" aria-label="Очистить поиск" onClick={() => setSearchInput('')}>
                ×
              </button>
            )}
          </div>
          <div className="ts-sort-seg" role="group" aria-label="Сортировка">
            <button className={`ts-sort-seg-btn${sort === 'new' ? ' active' : ''}`} onClick={() => setSingle('sort', null)}>
              Сначала новые
            </button>
            <button className={`ts-sort-seg-btn${sort === 'deadline' ? ' active' : ''}`} onClick={() => setSingle('sort', 'deadline')}>
              Скоро дедлайн
            </button>
          </div>
          {anyActive && (
            <button className="ts-reset-all" onClick={resetAll}>
              Сбросить всё
            </button>
          )}
        </div>
      )}

      {(isOpps || isVote) && mobileFiltersOpen && (
        <div className="ts-mobile-filter-overlay" onClick={() => setMobileFiltersOpen(false)}>
          <div className="ts-mobile-filter-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="ts-mobile-filter-handle" />
            <div className="ts-mobile-filter-title">Фильтры</div>

            <div className="ts-mobile-filter-group">
              <div className="ts-mobile-filter-group-label">Тема</div>
              <div className="ts-mobile-filter-chips">
                {THEMES.map((t) => (
                  <Chip key={t.key} label={t.label} active={fThemes.includes(t.key)} onClick={() => toggleTheme(t.key)} />
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
                    if (e.key === 'Enter') applyAge();
                  }}
                  placeholder="15 или 12-15"
                />
                <button className="ts-mobile-age-apply" onClick={applyAge}>
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
                  <Chip key={p.k} label={p.l} active={fPrice === p.k} onClick={() => togglePrice(p.k)} />
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
                  <Chip key={p.k} label={p.l} active={fLevel === p.k} onClick={() => toggleLevel(p.k)} />
                ))}
              </div>
            </div>

            <div className="ts-mobile-filter-actions">
              <button className="ts-mobile-filter-reset" onClick={resetAll}>
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
          {NAV_CATS.map((c) => (
            <Chip key={c.key} label={c.label} active={fCats.includes(c.key)} onClick={() => toggleCat(c.key)} />
          ))}
        </div>
      )}

      {isEmpty && (
        <div className="ts-empty">
          <div>
            {isFav ? (
              <>
                <div className="ts-empty-title">Ничего нет</div>
                <div className="ts-empty-hint">Отмечайте мероприятия звездой — они появятся здесь</div>
              </>
            ) : qApplied ? (
              <>
                <div className="ts-empty-title">Ничего не нашли по запросу «{qApplied}»</div>
                <div className="ts-empty-actions">
                  <button className="ts-btn-outline small" onClick={clearSearchOnly}>
                    Очистить поиск
                  </button>
                  {nonSearchFilterCount > 0 && (
                    <button className="ts-btn-outline small" onClick={resetFiltersKeepSearch}>
                      Сбросить фильтры
                    </button>
                  )}
                </div>
              </>
            ) : anyActive ? (
              <>
                <div className="ts-empty-title">Ничего не подошло под фильтры</div>
                <div className="ts-empty-actions">
                  <button className="ts-btn-outline small" onClick={resetAll}>
                    Сбросить фильтры
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="ts-empty-title">Ничего нет</div>
                <div className="ts-empty-hint">Здесь пока пусто — загляните позже</div>
              </>
            )}
          </div>
        </div>
      )}

      {!isEmpty && isNews && (
        <div className="ts-card-grid">
          {news.map((n) => (
            <NewsCard key={n.id} item={n} viewCount={isSuperAdmin ? cardViewCounts[cardViewKey('news', n.id)] : undefined} />
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
              viewCount={isSuperAdmin ? cardViewCounts[cardViewKey('event', e.id)] : undefined}
              admin={
                canEditCards
                  ? {
                      onEdit: () => setEditTarget(e),
                      onArchive: () => setConfirmTarget({ event: e, kind: 'archive' }),
                      onMoveToVoting: () => setConfirmTarget({ event: e, kind: 'voting' }),
                      onDelete: () => setConfirmTarget({ event: e, kind: 'delete' })
                    }
                  : undefined
              }
            />
          ))}
        </div>
      )}

      {confirmTarget && (
        <ConfirmDialog
          title={CONFIRM_COPY[confirmTarget.kind].title}
          message={CONFIRM_COPY[confirmTarget.kind].message(confirmTarget.event.title)}
          confirmLabel={CONFIRM_COPY[confirmTarget.kind].confirmLabel}
          danger={confirmTarget.kind === 'delete'}
          onConfirm={runConfirmedAction}
          onCancel={() => setConfirmTarget(null)}
        />
      )}

      {editTarget && (
        <EditEventModal
          event={editTarget}
          onClose={() => setEditTarget(null)}
          onSaved={(updated) => setEditedEvents((prev) => ({ ...prev, [updated.id]: updated }))}
        />
      )}

      <CardSizeSlider />
    </div>
  );
}
