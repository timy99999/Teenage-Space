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
import { CATS, NAV_CATS, THEMES, TITLES, RELATED_CATS, plural } from '../data/constants';
import { EventCard } from '../components/EventCard';
import { NewsCard } from '../components/NewsCard';
import { Chip } from '../components/Chip';
import { BoltIcon, CheckIcon } from '../components/PresetIcons';
import { CardSizeSlider } from '../components/CardSizeSlider';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { EditEventModal } from '../components/EditEventModal';
import { carryCatalogSearch } from '../lib/catalogNav';
import { ageFromBirthDate, ageRangeForPreset } from '../lib/ageFromBirthDate';
import { PRESETS, presetIsActive, type Preset, type PresetContext } from '../data/presets';
import type { EventItem } from '../types';

// Возраст-пресеты панели фильтров (b3) — заменяют текстовое поле кнопками-вилками;
// "Указать точно" раскрывает прежний числовой ввод как запасной вариант.
const AGE_PRESETS: { label: string; range: string }[] = [
  { label: '5–8 класс', range: '11-14' },
  { label: '9–11 класс', range: '15-17' },
  { label: 'Студент · 18+', range: '18-99' }
];

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
const URL_FILTER_KEYS = ['themes', 'cats', 'price', 'level', 'mode', 'age', 'q', 'sort'] as const;
// Subset persisted to localStorage — search text and sort are intentionally NOT
// remembered across fresh visits, only the actual filters.
const REMEMBERED_KEYS = ['themes', 'cats', 'price', 'level', 'mode', 'age'] as const;
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
  const { session, profile, isSuperAdmin, hasPerm } = useAuth();
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
  const modeParam = params.get('mode');
  const fMode: 'offline' | 'online' | 'hybrid' | null =
    modeParam === 'offline' || modeParam === 'online' || modeParam === 'hybrid' ? modeParam : null;
  const ageRaw = (params.get('age') ?? '').trim();
  // Validate like the other filters — a stale link with ?age=<junk> should be
  // ignored silently, not shown as an active-but-ineffective filter.
  const ageApplied = /^\d{1,3}(-\d{1,3})?$/.test(ageRaw) ? ageRaw : '';
  const sort: 'new' | 'deadline' = params.get('sort') === 'deadline' ? 'deadline' : 'new';
  const qApplied = isOpps ? (params.get('q') ?? '').trim() : '';

  // Local, uncommitted input state (mirrors the URL, resynced on back/forward).
  const [ageInput, setAgeInput] = useState(ageApplied);
  const [searchInput, setSearchInput] = useState(qApplied);
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  // "Указать точно" (b3) — manual age input is collapsed by default; forced open
  // when the applied age doesn't match any of the three class presets, so the
  // active value is never hidden behind a closed toggle.
  const [ageCustomOpen, setAgeCustomOpen] = useState(false);
  const ageMatchesPreset = AGE_PRESETS.some((a) => a.range === ageApplied);
  const showAgeCustom = ageCustomOpen || (!!ageApplied && !ageMatchesPreset);

  // "⚡ Для моего класса" без данных профиля (b2b) — какую подсказку показать.
  const [presetHint, setPresetHint] = useState<'anon' | 'nobirthdate' | null>(null);
  const presetHintRef = useRef<HTMLDivElement>(null);
  const presetChipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!presetHint) return;
    const onDocClick = (e: MouseEvent) => {
      if (presetHintRef.current && !presetHintRef.current.contains(e.target as Node)) setPresetHint(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPresetHint(null);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [presetHint]);

  // Focus into the hint on open, back onto the chip on close (a11y, b2b).
  const wasHintOpenRef = useRef(false);
  useEffect(() => {
    if (presetHint) {
      wasHintOpenRef.current = true;
      presetHintRef.current?.querySelector<HTMLButtonElement>('.ts-preset-hint-actions button')?.focus();
    } else if (wasHintOpenRef.current) {
      wasHintOpenRef.current = false;
      presetChipRef.current?.focus();
    }
  }, [presetHint]);

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
  const toggleMode = (k: 'offline' | 'online' | 'hybrid') => setSingle('mode', fMode === k ? null : k);
  const applyAge = () => setSingle('age', ageInput.trim() || null);
  const clickAgePreset = (range: string) => {
    setAgeCustomOpen(false);
    setSingle('age', ageApplied === range ? null : range);
  };

  // ---- preset chips (ряд 2 тулбара, b1/b2) ----
  const myClassAgeRange = ageRangeForPreset(ageFromBirthDate(profile?.birthDate));
  const presetCtx: PresetContext = { myClassAgeRange };
  const activePresets = PRESETS.filter((p) => presetIsActive(p, params, presetCtx));
  const activePresetSlugs = new Set(activePresets.map((p) => p.slug));

  const clickPreset = (preset: Preset) => {
    if (preset.slug === 'myclass' && !myClassAgeRange) {
      setPresetHint((h) => (h ? null : session ? 'nobirthdate' : 'anon'));
      return;
    }
    setPresetHint(null);
    const target = preset.params(presetCtx)!;
    const isActive = activePresetSlugs.has(preset.slug);
    patchParams((p) => {
      for (const [k, v] of Object.entries(target)) {
        if (isActive) p.delete(k);
        else p.set(k, v);
      }
    });
  };
  const removePreset = (preset: Preset) => {
    const target = preset.params(presetCtx);
    if (!target) return;
    patchParams((p) => {
      for (const k of Object.keys(target)) p.delete(k);
    });
  };

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

  // Canonical serialisation of the filters after validation.
  const normalizedFilters: Record<string, string | null> = {
    themes: fThemes.length ? fThemes.join(',') : null,
    cats: fCats.length ? fCats.join(',') : null,
    price: fPrice,
    level: fLevel,
    mode: fMode,
    age: ageApplied || null,
    sort: sort === 'deadline' ? 'deadline' : null
  };

  // Rewrite the URL with validated values so junk from a stale link
  // (?themes=foo,it, ?sort=xxx, ?age=abc) doesn't linger in the address bar or
  // get mirrored verbatim into localStorage.
  useEffect(() => {
    if (!(isOpps || isVote)) return;
    const needsFix = Object.entries(normalizedFilters).some(
      ([k, v]) => (v ?? null) !== (params.get(k) ?? null)
    );
    if (!needsFix) return;
    patchParams((p) => {
      for (const [k, v] of Object.entries(normalizedFilters)) {
        if (v) p.set(k, v);
        else p.delete(k);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, isOpps, isVote]);

  useEffect(() => {
    if (!isOpps) return;
    const obj: Record<string, string> = {};
    for (const k of REMEMBERED_KEYS) {
      const v = normalizedFilters[k];
      if (v) obj[k] = v;
    }
    try {
      if (Object.keys(obj).length) localStorage.setItem(FILTERS_LS_KEY, JSON.stringify(obj));
      else localStorage.removeItem(FILTERS_LS_KEY);
    } catch {
      /* localStorage unavailable — non-fatal */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, isOpps]);

  const { events: fetchedEvents, loading } = useEvents({
    scope,
    category: isOpps ? category : undefined,
    categories: isVote ? fCats : undefined,
    themes: fThemes,
    price: fPrice,
    level: fLevel,
    mode: fMode,
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
  // While a request is in flight, don't flash the "nothing here" state.
  const isEmpty = isNews ? news.length === 0 : !loading && favEvents.length === 0;

  const subLabel = isOpps && category ? CATS.find((c) => c.key === category)?.label ?? '' : '';
  const pageTitle = isOpps ? TITLES.opps : TITLES[mode];
  // Соседние категории для пустого состояния 5 (b4) — только когда открыта своя вкладка каталога.
  const relatedCats =
    isOpps && category ? (RELATED_CATS[category] ?? []).map((k) => CATS.find((c) => c.key === k)).filter((c): c is (typeof CATS)[number] => !!c) : [];

  const activeFilterCount =
    fThemes.length +
    fCats.length +
    (fPrice ? 1 : 0) +
    (fLevel ? 1 : 0) +
    (fMode ? 1 : 0) +
    (ageApplied ? 1 : 0) +
    (qApplied ? 1 : 0);
  const nonSearchFilterCount = activeFilterCount - (qApplied ? 1 : 0);
  const anyActive = activeFilterCount > 0 || sort !== 'new';

  const resetAll = () => {
    setAgeInput('');
    setAgeCustomOpen(false);
    setSearchInput('');
    setPresetHint(null);
    patchParams((p) => URL_FILTER_KEYS.forEach((k) => p.delete(k)));
  };
  const clearSearchOnly = () => {
    setSearchInput('');
    setSingle('q', null);
  };
  const resetFiltersKeepSearch = () => {
    setAgeInput('');
    setAgeCustomOpen(false);
    setPresetHint(null);
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
              <div className="ts-filter-chips col">
                {AGE_PRESETS.map((a) => (
                  <Chip key={a.range} label={a.label} small onGrey active={ageApplied === a.range} onClick={() => clickAgePreset(a.range)} />
                ))}
              </div>
              <button type="button" className="ts-age-custom-toggle" onClick={() => setAgeCustomOpen((v) => !v)}>
                {showAgeCustom ? 'Указать точно ▾' : 'Указать точно ▸'}
              </button>
              {showAgeCustom && (
                <div className="ts-age-row" style={{ marginTop: 8 }}>
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
              )}
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
            <div className="ts-filter-group">
              <div className="ts-filter-label">Формат</div>
              <div className="ts-filter-chips col">
                {[
                  { k: 'offline' as const, l: 'Очно' },
                  { k: 'online' as const, l: 'Онлайн' },
                  { k: 'hybrid' as const, l: 'Гибрид' }
                ].map((m) => (
                  <Chip key={m.k} label={m.l} small onGrey active={fMode === m.k} onClick={() => toggleMode(m.k)} />
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
            <button
              className={`ts-mobile-subtab${!category ? ' active' : ''}`}
              onClick={() => navigate({ pathname: '/opportunities', search: carryCatalogSearch(params.toString()) })}
            >
              Все
            </button>
            {NAV_CATS.map((c) => (
              <button
                key={c.key}
                className={`ts-mobile-subtab${category === c.key ? ' active' : ''}`}
                onClick={() =>
                  navigate({ pathname: `/opportunities/${c.key}`, search: carryCatalogSearch(params.toString()) })
                }
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
              maxLength={100}
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

      {isOpps && (
        <div className="ts-preset-row">
          {PRESETS.map((preset) => {
            const active = activePresetSlugs.has(preset.slug);
            const isMyClass = preset.slug === 'myclass';
            const chip = (
              <button
                key={preset.slug}
                ref={isMyClass ? presetChipRef : undefined}
                type="button"
                className={`ts-preset-chip${active ? ' active' : ''}`}
                onClick={() => clickPreset(preset)}
                aria-pressed={active}
                aria-haspopup={isMyClass ? 'dialog' : undefined}
                aria-expanded={isMyClass ? presetHint !== null : undefined}
              >
                {active ? <CheckIcon /> : <BoltIcon />}
                {preset.label}
              </button>
            );
            if (!isMyClass) return chip;
            return (
              <div key={preset.slug} className="ts-preset-chip-wrap" ref={presetHintRef}>
                {chip}
                {presetHint && (
                  <div className="ts-preset-hint" role="dialog">
                    <div>
                      {presetHint === 'anon'
                        ? 'Войдите и укажите класс — подставим автоматически.'
                        : 'Укажите дату рождения в профиле — подставим класс автоматически.'}
                    </div>
                    <div className="ts-preset-hint-actions">
                      <button
                        className="ts-btn-outline small"
                        onClick={() => {
                          setPresetHint(null);
                          navigate(presetHint === 'anon' ? '/auth' : '/profile');
                        }}
                      >
                        {presetHint === 'anon' ? 'Войти' : 'Открыть профиль'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
              <div className="ts-mobile-filter-chips">
                {AGE_PRESETS.map((a) => (
                  <Chip key={a.range} label={a.label} active={ageApplied === a.range} onClick={() => clickAgePreset(a.range)} />
                ))}
              </div>
              <button type="button" className="ts-age-custom-toggle" onClick={() => setAgeCustomOpen((v) => !v)}>
                {showAgeCustom ? 'Указать точно ▾' : 'Указать точно ▸'}
              </button>
              {showAgeCustom && (
                <div className="ts-mobile-filter-age-row" style={{ marginTop: 8 }}>
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
              )}
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

            <div className="ts-mobile-filter-group">
              <div className="ts-mobile-filter-group-label">Формат</div>
              <div className="ts-mobile-filter-chips">
                {[
                  { k: 'offline' as const, l: 'Очно' },
                  { k: 'online' as const, l: 'Онлайн' },
                  { k: 'hybrid' as const, l: 'Гибрид' }
                ].map((m) => (
                  <Chip key={m.k} label={m.l} active={fMode === m.k} onClick={() => toggleMode(m.k)} />
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
                <div className="ts-empty-title">Здесь пока пусто</div>
                <div className="ts-empty-hint">Нажимайте ★ на карточке — сохранённые мероприятия появятся тут.</div>
                <div className="ts-empty-actions">
                  <button className="ts-btn-outline small" onClick={() => navigate('/opportunities')}>
                    Смотреть возможности
                  </button>
                </div>
              </>
            ) : isOpps && qApplied ? (
              <>
                <div className="ts-empty-title">Ничего не нашли по запросу «{qApplied}»</div>
                <div className="ts-empty-hint">Проверьте опечатки или оставьте одно-два слова.</div>
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
            ) : isOpps && activePresets.length === 1 && nonSearchFilterCount === 1 && !qApplied ? (
              <>
                <div className="ts-empty-title">Под пресет «{activePresets[0].label}» пока ничего нет</div>
                <div className="ts-empty-actions">
                  <button className="ts-btn-outline small" onClick={() => removePreset(activePresets[0])}>
                    Убрать пресет
                  </button>
                </div>
              </>
            ) : anyActive ? (
              <>
                <div className="ts-empty-title">Ничего не подошло под фильтры</div>
                <div className="ts-empty-hint">Попробуйте снять возраст или цену — они сужают сильнее всего.</div>
                <div className="ts-empty-actions">
                  <button className="ts-btn-outline small" onClick={resetAll}>
                    Сбросить фильтры
                  </button>
                  {isOpps && category && (
                    <button
                      className="ts-btn-outline small"
                      onClick={() => navigate({ pathname: '/opportunities', search: carryCatalogSearch(params.toString()) })}
                    >
                      Показать во всех возможностях
                    </button>
                  )}
                </div>
              </>
            ) : isOpps && category ? (
              <>
                <div className="ts-empty-title">В разделе «{subLabel}» пока нет мероприятий</div>
                <div className="ts-empty-hint">Загляните позже — или посмотрите смежные разделы:</div>
                {relatedCats.length > 0 && (
                  <div className="ts-empty-cats">
                    {relatedCats.map((c) => (
                      <Chip key={c.key} label={c.label} small active={false} onClick={() => navigate(`/opportunities/${c.key}`)} />
                    ))}
                  </div>
                )}
                <div className="ts-empty-actions">
                  <button className="ts-btn-outline small" onClick={() => navigate('/opportunities')}>
                    Все возможности
                  </button>
                </div>
              </>
            ) : isOpps ? (
              <>
                <div className="ts-empty-title">Пока нет ни одного мероприятия</div>
                <div className="ts-empty-hint">Мы наполняем каталог — заходите чуть позже.</div>
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
        <div
          className="ts-card-grid"
          /* Dim + lock the grid while a request is in flight so a search never
             flashes the previous/unfiltered list as if it were the result. */
          style={loading ? { opacity: 0.45, pointerEvents: 'none', transition: 'opacity .15s' } : undefined}
        >
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
