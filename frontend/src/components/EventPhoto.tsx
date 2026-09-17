interface EventPhotoProps {
  src: string | null;
  alt: string;
  /** Set for cards visible on first paint — skips lazy-loading and raises fetch
   *  priority so this LCP candidate isn't deprioritised behind off-screen images. */
  priority?: boolean;
}

export function EventPhoto({ src, alt, priority }: EventPhotoProps) {
  if (src) {
    return priority ? (
      <img src={src} alt={alt} loading="eager" fetchPriority="high" />
    ) : (
      <img src={src} alt={alt} loading="lazy" />
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
