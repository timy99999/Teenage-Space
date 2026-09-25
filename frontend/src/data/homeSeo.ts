import { SITE_URL } from '../components/Seo';

/**
 * Один источник SEO-тегов для "/". Их рендерит и HomePage (десктоп), и мобильная
 * ветка HomeGate (каталог прямо на корне) — иначе главная описывалась бы по-разному
 * в зависимости от того, каким краулером Google на неё пришёл, а индексирует он
 * mobile-first.
 */
export const HOME_TITLE = 'Teenage Space';

export const HOME_DESCRIPTION =
  'Teenage Space — каталог мероприятий для подростков и молодёжи Бишкека: конкурсы, олимпиады, ' +
  'волонтёрство, стажировки и гранты. Новости, образовательные материалы и бесплатная публикация ' +
  'своих событий.';

export const HOME_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Teenage Space',
    url: `${SITE_URL}/`,
    inLanguage: 'ru',
    description: HOME_DESCRIPTION,
    // Каталог держит поисковый запрос в ?q= — см. URL_FILTER_KEYS в GridPage.
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/opportunities?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Teenage Space',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/favicon.png`,
    areaServed: { '@type': 'City', name: 'Бишкек' }
  }
];
