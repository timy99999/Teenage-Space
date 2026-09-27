import { useUI } from '../contexts/UIContext';
import { ShareIcon } from './ShareIcon';

interface ShareButtonProps {
  url: string;
  title: string;
  className?: string;
}

/** Opens the OS share sheet (copy link / send to an app) via the Web Share API,
 *  falling back to copying the link to the clipboard on browsers that lack it. */
export function ShareButton({ url, title, className = '' }: ShareButtonProps) {
  const { flash } = useUI();

  const onShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // Пользователь закрыл системный шит поделиться — ничего не делаем.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      flash('Ссылка скопирована');
    } catch {
      flash('Не удалось скопировать ссылку');
    }
  };

  return (
    <button
      type="button"
      className={`ts-fav-btn big ts-share-btn ${className}`.trim()}
      onClick={onShare}
      title="Поделиться"
      aria-label="Поделиться"
    >
      <ShareIcon />
    </button>
  );
}
