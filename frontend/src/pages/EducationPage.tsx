import { useNavigate } from 'react-router-dom';
import { useEducation } from '../hooks/useEducation';
import { TITLES } from '../data/constants';

export function EducationPage({ track }: { track: 'edu-nct' | 'edu-abroad' }) {
  const navigate = useNavigate();
  const { intro, items } = useEducation(track);
  const routeSlug = track.replace('edu-', '');

  return (
    <div className="ts-edu-page">
      <h1 className="ts-edu-title">{TITLES[track]}</h1>
      <div className="ts-edu-intro">{intro}</div>
      <div className="ts-material-list">
        {items.map((m, i) => (
          <button key={m.id} className="ts-material-row" onClick={() => navigate(`/article/${m.id}?from=${routeSlug}`)}>
            <span className="ts-material-n">{String(i + 1).padStart(2, '0')}</span>
            <span className="ts-material-title">{m.title}</span>
            <span className="ts-material-meta">{m.meta}</span>
            <span className="ts-material-arrow">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
