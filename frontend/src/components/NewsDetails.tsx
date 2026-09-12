import type { NewsItem } from '../types';
import { fmtDate } from '../data/constants';
import { EventPhoto } from './EventPhoto';
import { trackLinkClick } from '../lib/tracking';

interface NewsDetailsProps {
  item: NewsItem;
  loggedIn: boolean;
}

/** Shared between the in-app modal (NewsModal) and the standalone permalink
 *  page (NewsPage), so the two never drift out of sync. */
export function NewsDetails({ item, loggedIn }: NewsDetailsProps) {
  return (
    <div className="ts-modal-grid">
      <div className="ts-modal-img">
        <EventPhoto src={item.imageUrl} alt={item.title} />
      </div>
      <div className="ts-modal-body">
        <div className="ts-modal-cat">Новость</div>
        <h1 className="ts-modal-title">{item.title}</h1>
        <div className="ts-modal-field-label">{fmtDate(item.date)}</div>
        <p className="ts-modal-desc">{item.short}</p>
        {item.linkUrl && (
          <div className="ts-modal-actions">
            <a
              href={item.linkUrl}
              target="_blank"
              rel="noreferrer"
              className="ts-pill-link"
              onClick={() => trackLinkClick('news_link', loggedIn, { targetType: 'news', targetId: item.id })}
            >
              {item.linkTitle || 'Подробнее'}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
