import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../assets/logo-ts.png';
import { useEvents } from '../hooks/useEvents';
import { NAV_CATS, CATN, fmtDate } from '../data/constants';
import { EventPhoto } from '../components/EventPhoto';
import { ORBIT_ITEMS } from '../data/heroOrbit';
import { WANDER_FLOATERS, ORBIT_FLOATERS } from '../data/pageFloaters';
import { useReveal } from '../hooks/useReveal';
import { useFloaterRepulsion } from '../hooks/useFloaterRepulsion';

export function HomePage() {
  const navigate = useNavigate();
  const [, setParams] = useSearchParams();
  const { events } = useEvents({ scope: 'upcoming' });

  const openEvent = (id: string) => setParams({ event: id });

  const catsReveal = useReveal<HTMLElement>();
  const eventsReveal = useReveal<HTMLElement>();
  const ctaReveal = useReveal<HTMLElement>();
  const floaterRefs = useFloaterRepulsion();

  return (
    <div className="ts-home">
      <div className="ts-page-floaters" aria-hidden="true">
        {WANDER_FLOATERS.map((f) => (
          <div
            key={f.key}
            ref={floaterRefs(f.key).outer}
            className={`ts-floater ts-floater-v${f.variant}`}
            style={{
              top: f.top,
              left: f.left,
              width: f.size,
              height: f.size,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`
            }}
          >
            <div ref={floaterRefs(f.key).nudge} className="ts-floater-nudge">
              {f.icon}
            </div>
          </div>
        ))}
        {ORBIT_FLOATERS.map((f) => (
          <div
            key={f.key}
            ref={floaterRefs(f.key).outer}
            className={`ts-floater ts-floater-orbit${f.variant}`}
            style={{
              top: f.top,
              left: f.left,
              width: f.size,
              height: f.size,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`
            }}
          >
            <div ref={floaterRefs(f.key).nudge} className="ts-floater-nudge">
              {f.icon}
            </div>
          </div>
        ))}
      </div>

      <section className="ts-hero">
        <div className="ts-hero-glow" />
        <div className="ts-hero-brand">
          <img src={logo} alt="" className="ts-hero-brand-mark" />
          <span>Teenage Space</span>
        </div>

        <div className="ts-hero-stage">
          <div className="ts-hero-orbit">
            <div className="ts-orbit-ring">
              {ORBIT_ITEMS.map((item, i) => (
                <div
                  key={item.key}
                  className="ts-orbit-item"
                  style={
                    {
                      '--i': i,
                      '--n': ORBIT_ITEMS.length,
                      animationDelay: `${0.5 + i * 0.08}s`
                    } as React.CSSProperties
                  }
                >
                  <div className="ts-orbit-icon" title={item.label}>
                    {item.icon}
                  </div>
                </div>
              ))}
            </div>
            <div className="ts-hero-orb-wrap">
              <div className="ts-hero-orb">
                <div className="ts-hero-orb-ring" />
                <div className="ts-hero-orb-inner">
                  <img src={logo} alt="Teenage Space" />
                </div>
              </div>
            </div>
          </div>

          <p className="ts-hero-lead">
            Teenage Space — это пространство для активных подростков и молодёжи. Специально для вас наша команда
            собрала все самые лучшие ивенты Бишкека. Здесь вы можете найти всё от волонтёрства до международных
            конкурсов и собрать выдающееся портфолио!
          </p>
        </div>

        <button className="ts-btn-outline hero" onClick={() => navigate('/opportunities')}>
          Смотреть возможности
        </button>
      </section>

      <section
        ref={catsReveal.ref}
        className={`ts-section ts-reveal-section${catsReveal.visible ? ' is-visible' : ''}`}
      >
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

      <section
        ref={eventsReveal.ref}
        className={`ts-reveal-section${eventsReveal.visible ? ' is-visible' : ''}`}
        style={{ padding: '20px 44px 12px' }}
      >
        <div className="ts-section-head-row">
          <h2 className="ts-section-head" style={{ margin: 0 }}>
            Рекомендации
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

      <section
        ref={ctaReveal.ref}
        className={`ts-cta ts-reveal-cta${ctaReveal.visible ? ' is-visible' : ''}`}
      >
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
