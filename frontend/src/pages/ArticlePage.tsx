import { useParams } from 'react-router-dom';
import { useArticle } from '../hooks/useEducation';

export function ArticlePage() {
  const { id } = useParams();
  const article = useArticle(id);

  if (!article) return null;

  return (
    <div className="ts-article-page">
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
