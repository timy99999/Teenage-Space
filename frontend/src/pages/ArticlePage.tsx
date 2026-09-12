import { useParams } from 'react-router-dom';
import { useArticle } from '../hooks/useEducation';
import { Seo } from '../components/Seo';

export function ArticlePage() {
  const { id } = useParams();
  const article = useArticle(id);

  if (!article) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    articleSection: article.meta
  };

  return (
    <div className="ts-article-page">
      <Seo
        title={article.title}
        description={article.body[0]}
        path={`/article/${article.id}`}
        type="article"
        jsonLd={jsonLd}
      />
      <div className="ts-article-inner">
        <div className="ts-article-kicker">{article.meta}</div>
        <h1 className="ts-article-title">{article.title}</h1>
        <div className="ts-article-body">
          {article.body.map((p, i) => (
            <p className="ts-article-p" key={i}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
