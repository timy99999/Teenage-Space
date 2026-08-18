interface EventPhotoProps {
  src: string | null;
  alt: string;
}

export function EventPhoto({ src, alt }: EventPhotoProps) {
  if (src) return <img src={src} alt={alt} loading="lazy" />;
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
