/** Формат всех слотов под фото на сайте: .ts-card-img-wrap, .ts-modal-img,
 *  .ts-home-card-img, .ts-publish-photo — все 3:4 с серой подложкой (--ts-ph). */
export const PHOTO_ASPECT = 3 / 4;

/** Сколько кадра допустимо срезать при вписывании в 3:4. За этой границей обрезка
 *  начинает уносить смысл (у афиши 16:9 от неё осталась бы центральная четверть),
 *  поэтому такие фото показываем целиком, с серыми полями по бокам. */
const MAX_CROP = 0.25;

/** Вертикальные фото вплоть до 9:16 и всё до квадрата включительно — обрезаем. */
export const COVER_MIN_RATIO = PHOTO_ASPECT * (1 - MAX_CROP);
export const COVER_MAX_RATIO = PHOTO_ASPECT / (1 - MAX_CROP);

export type PhotoFit = 'cover' | 'contain';

/**
 * 'cover' — фото заполняет слот, лишнее обрезается (потеря не больше MAX_CROP).
 * 'contain' — фото целиком, незанятое место остаётся серым фоном слота.
 * До загрузки размеры неизвестны: по умолчанию 'cover', как было раньше.
 */
export function photoFit(naturalWidth: number, naturalHeight: number): PhotoFit {
  if (!naturalWidth || !naturalHeight) return 'cover';
  const ratio = naturalWidth / naturalHeight;
  return ratio >= COVER_MIN_RATIO && ratio <= COVER_MAX_RATIO ? 'cover' : 'contain';
}
