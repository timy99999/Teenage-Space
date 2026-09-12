import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';

export function NotFoundPage() {
  return (
    <div className="ts-article-page">
      <Seo title="Страница не найдена" path="/404" noindex />
      <div className="ts-article-inner">
        <h1 className="ts-article-title">Страница не найдена</h1>
        <p className="ts-article-p">Такой страницы нет — возможно, ссылка устарела.</p>
        <p className="ts-article-p">
          <Link to="/opportunities">Перейти в каталог</Link>
        </p>
      </div>
    </div>
  );
}
