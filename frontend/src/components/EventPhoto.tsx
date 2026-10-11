import { useState } from 'react';
import { photoFit, type PhotoFit } from '../lib/photoFit';

interface EventPhotoProps {
  src: string | null;
  alt: string;
  /** Set for cards visible on first paint — skips lazy-loading and raises fetch
   *  priority so this LCP candidate isn't deprioritised behind off-screen images. */
  priority?: boolean;
}

/** Единственная точка, через которую на сайт попадают фото постов (карточки,
 *  главная, модалка, новости), поэтому правило кадрирования живёт здесь. */
export function EventPhoto({ src, alt, priority }: EventPhotoProps) {
  // Слот всегда 3:4. Фото близкого формата обрезаем по слоту, а горизонтальное
  // или сильно вытянутое показываем целиком — пустоту закрывает серый фон слота.
  // См. photoFit: там же граница, после которой обрезка перестаёт быть безобидной.
  const [fit, setFit] = useState<PhotoFit>('cover');

  if (src) {
    // Через ref, а не только onLoad: у фото из кеша load успевает пройти до
    // навешивания обработчика, и тогда остался бы дефолтный 'cover'.
    const measure = (img: HTMLImageElement | null) => {
      if (img?.complete) setFit(photoFit(img.naturalWidth, img.naturalHeight));
    };
    return (
      <img
        src={src}
        alt={alt}
        ref={measure}
        onLoad={(e) => measure(e.currentTarget)}
        style={{ objectFit: fit }}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
      />
    );
  }
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center',
        fontFamily: "'Open Sans', sans-serif",
        fontSize: 12,
        color: 'var(--ts-fg)',
        opacity: 0.45
      }}
    >
      Фото 3:4
    </div>
  );
}
