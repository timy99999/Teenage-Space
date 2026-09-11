// Preset chips ("⚡ …", ряд 2 тулбара каталога) — ярлыки на те же URL-параметры,
// что и панель фильтров. Пресет не хранит своего состояния: он "активен", когда его
// целевые параметры уже стоят в URL, клик — переключает их. `slug` — общий контракт
// с deep-link'ом "Спросить Барса" (`?start=ask_<slug>`) и картой slug→контекст бота —
// при правке списка синхронизировать там же (PR5).
export type PresetSlug = 'free' | 'online' | 'intl' | 'myclass';

export interface PresetContext {
  /** Возрастной диапазон, посчитанный из профиля (`ageFromBirthDate` + `ageRangeForPreset`),
   *  либо null, если определить нельзя (аноним / в профиле не указана дата рождения). */
  myClassAgeRange: string | null;
}

export interface Preset {
  slug: PresetSlug;
  label: string;
  /** URL-параметры, которые ставит пресет. Для `myclass` — null, пока в контексте нет
   *  возрастного диапазона; в этом случае вызывающий код показывает подсказку вместо применения. */
  params: (ctx: PresetContext) => Record<string, string> | null;
}

export const PRESETS: Preset[] = [
  { slug: 'free', label: 'Бесплатно', params: () => ({ price: 'free' }) },
  { slug: 'online', label: 'Онлайн', params: () => ({ mode: 'online' }) },
  { slug: 'intl', label: 'Международные', params: () => ({ level: 'intl' }) },
  {
    slug: 'myclass',
    label: 'Для моего класса',
    params: (ctx) => (ctx.myClassAgeRange ? { age: ctx.myClassAgeRange } : null)
  }
];

/** true, если все параметры пресета сейчас стоят в URL с теми же значениями. */
export function presetIsActive(preset: Preset, current: URLSearchParams, ctx: PresetContext): boolean {
  const target = preset.params(ctx);
  if (!target) return false;
  return Object.entries(target).every(([k, v]) => current.get(k) === v);
}
