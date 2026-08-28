import { useEffect } from 'react';
import { NET_TROUBLE_EVENT } from '../lib/api';
import { useUI } from '../contexts/UIContext';

/**
 * Turns the debounced "the API is unreachable / erroring" signal from the api layer into
 * a single toast, instead of a section silently rendering empty. Renders nothing itself.
 */
export function NetTroubleToast() {
  const { flash } = useUI();

  useEffect(() => {
    const handler = () => flash('Проблемы с соединением — показаны сохранённые данные');
    window.addEventListener(NET_TROUBLE_EVENT, handler);
    return () => window.removeEventListener(NET_TROUBLE_EVENT, handler);
  }, [flash]);

  return null;
}
