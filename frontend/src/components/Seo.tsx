import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Teenage Space';
const SITE_URL = 'https://teenagespace.com';
const DEFAULT_DESCRIPTION =
  'Teenage Space — каталог мероприятий, новостей и образовательных материалов для подростков Бишкека.';

interface SeoProps {
  title: string;
  description?: string;
  /** Path starting with "/", e.g. "/opportunities/event/e1". Used for canonical + og:url. */
  path: string;
  image?: string;
  type?: 'website' | 'article';
  /** Hide from search results — used for pages like 404 that shouldn't be indexed. */
  noindex?: boolean;
  /** JSON-LD structured data object(s) to embed as <script type="application/ld+json">. */
  jsonLd?: object | object[];
}

export function Seo({ title, description = DEFAULT_DESCRIPTION, path, image, type = 'website', noindex, jsonLd }: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title === SITE_NAME ? title : `${title} — ${SITE_NAME}`;
  const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
      {jsonLdList.map((item, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
