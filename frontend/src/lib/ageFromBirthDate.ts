// Переводит `birthDate` профиля (YYYY-MM-DD) в возрастную "классную" вилку для
// пресета "⚡ Для моего класса" (data/presets.ts). Возраст считается в TZ Бишкека —
// то же соглашение, что и в lib/deadline.ts.
const BISHKEK_UTC_OFFSET_MS = 6 * 60 * 60 * 1000;
const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})/;

function todayInBishkek(): { y: number; m: number; d: number } {
  const s = new Date(Date.now() + BISHKEK_UTC_OFFSET_MS).toISOString();
  const m = DATE_RE.exec(s)!;
  return { y: +m[1], m: +m[2], d: +m[3] };
}

/** Полных лет от `birthDate`, либо null — если дата не задана/не распознана. */
export function ageFromBirthDate(birthDate: string | null | undefined): number | null {
  if (!birthDate) return null;
  const m = DATE_RE.exec(birthDate);
  if (!m) return null;
  const by = +m[1];
  const bm = +m[2];
  const bd = +m[3];
  const today = todayInBishkek();
  let age = today.y - by;
  if (today.m < bm || (today.m === bm && today.d < bd)) age -= 1;
  return age >= 0 ? age : null;
}

/**
 * Возраст → одна из трёх вилок пресета: 5–8 класс (11–14), 9–11 класс (15–17),
 * студент/18+ (18–99, в БД age_max ≤ 99). Младше 11 лет всё равно попадает в
 * младшую вилку — вилки младше нет, а на пересечении интервалов на бэке это не
 * ломается, просто не даёт точного совпадения.
 */
export function ageRangeForPreset(age: number | null): string | null {
  if (age === null) return null;
  if (age <= 14) return '11-14';
  if (age <= 17) return '15-17';
  return '18-99';
}
