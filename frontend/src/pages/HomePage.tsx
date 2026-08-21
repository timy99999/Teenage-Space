import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../assets/logo-ts.png';
import { useEvents } from '../hooks/useEvents';
import { NAV_CATS, CATN, fmtDate } from '../data/constants';
import { EventPhoto } from '../components/EventPhoto';

export function HomePage() {
  const navigate = useNavigate();
  const [, setParams] = useSearchParams();
  const { events } = useEvents({ scope: 'upcoming' });

  const openEvent = (id: string) => setParams({ event: id });

  return (
    <div>
      <section className="ts-hero">
        <div className="ts-hero-glow" />
        <div className="ts-hero-intro">
          <h1 className="ts-hero-title">Teenage Space</h1>
          <p className="ts-hero-lead">
            Teenage Space — это пространство для активных подростков и молодёжи. Специально для вас наша команда
            собрала все самые лучшие ивенты Бишкека. Здесь вы можете найти всё от волонтёрства до международных
            конкурсов и собрать выдающееся портфолио!
          </p>
        </div>
        <div className="ts-hero-orb">
          <div className="ts-hero-orb-ring" />
          <div className="ts-hero-orb-inner">
            <img src={logo} alt="Teenage Space" />
          </div>
        </div>
        <button className="ts-btn-outline hero" onClick={() => navigate('/opportunities')}>
          Смотреть возможности
        </button>
      </section>

      <section className="ts-section">
        <h2 className="ts-section-head">Что здесь можно найти</h2>
        <div className="ts-tile-grid">
          {NAV_CATS.map((c) => (
            <button key={c.key} className="ts-tile" onClick={() => navigate(`/opportunities/${c.key}`)}>
              <div className="ts-tile-title">{c.label}</div>
              <div className="ts-tile-sub">
                {events.filter((e) => e.category === c.key).length} — {CATN[c.key]}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section style={{ padding: '20px 44px 12px' }}>
        <div className="ts-section-head-row">
          <h2 className="ts-section-head" style={{ margin: 0 }}>
            Актуально сейчас
          </h2>
          <button className="ts-link" onClick={() => navigate('/opportunities')}>
            все →
          </button>
        </div>
        <div className="ts-home-grid">
          {events.slice(0, 4).map((e) => (
            <button key={e.id} className="ts-home-card" onClick={() => openEvent(e.id)}>
              <div className="ts-home-card-img">
                <EventPhoto src={e.imageUrl} alt={e.title} />
              </div>
              <div className="ts-home-card-body">
                <div className="ts-home-card-title">{e.title}</div>
                <div className="ts-home-card-date">{fmtDate(e.eventDate)}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="ts-cta">
        <div>
          <div className="ts-cta-title">Есть своё мероприятие?</div>
          <div className="ts-cta-sub">Отправьте заявку — мы проверим и опубликуем</div>
        </div>
        <button className="ts-btn-outline" onClick={() => navigate('/publish')}>
          Опубликовать
        </button>
      </section>
      <div style={{ height: 64 }} />
    </div>
  );
}
