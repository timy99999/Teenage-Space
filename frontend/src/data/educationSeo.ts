import { SITE_URL } from '../components/Seo';

export interface EducationTrackSeo {
  title: string;
  description: string;
}

/** SEO-переопределения для /education/:trackId — id совпадает со столбцом
 *  education_tracks.id. Базовые title/intro приходят из БД (короткие, без
 *  ключевых слов под конкретные запросы); здесь — то, что реально ищут. */
export const EDUCATION_TRACK_SEO: Record<string, EducationTrackSeo> = {
  nct: {
    title: 'Подготовка к НЦТ и ОРТ в Бишкеке — бесплатные материалы',
    description:
      'НЦТ и ОРТ 2026: бесплатные материалы, разборы заданий и расписание занятий для подготовки к тестированию ' +
      'школьников Бишкека и Кыргызстана.'
  },
  abroad: {
    title: 'Поступление за границу: гранты и стипендии для школьников',
    description:
      'Как поступить в университет за границей из Кыргызстана: сроки подачи документов, гранты и стипендии для ' +
      'школьников, пошаговые материалы для подготовки.'
  }
};

export const EDUCATION_INDEX_TITLE = 'Образование для подростков в Бишкеке';
export const EDUCATION_INDEX_DESCRIPTION =
  'Бесплатные материалы для подготовки к НЦТ/ОРТ и к поступлению за границу — разборы, планы подготовки и советы ' +
  'для школьников Бишкека.';

export function educationBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`
    }))
  };
}

export function educationCollectionJsonLd(opts: { name: string; description: string; path: string; itemNames?: string[] }) {
  const url = `${SITE_URL}${opts.path}`;
  const collection: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: opts.name,
    description: opts.description,
    url,
    inLanguage: 'ru',
    isPartOf: { '@type': 'WebSite', name: 'Teenage Space', url: `${SITE_URL}/` }
  };
  if (opts.itemNames?.length) {
    collection.hasPart = opts.itemNames.map((name) => ({ '@type': 'CreativeWork', name }));
  }
  return collection;
}
