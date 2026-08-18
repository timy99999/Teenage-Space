import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface UIContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  cardSize: number;
  setCardSize: (n: number) => void;
  toast: string;
  flash: (text: string) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => (localStorage.getItem('ts-theme') as Theme) || 'light');
  const [cardSize, setCardSizeState] = useState<number>(() => Number(localStorage.getItem('ts-card-size')) || 300);
  const [toast, setToast] = useState('');
  const toastTimer = useRef<number>();

  useEffect(() => {
    document.documentElement.dataset.tsTheme = theme;
    localStorage.setItem('ts-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--ts-card', `${cardSize}px`);
    localStorage.setItem('ts-card-size', String(cardSize));
  }, [cardSize]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const setCardSize = useCallback((n: number) => setCardSizeState(n), []);

  const flash = useCallback((text: string) => {
    window.clearTimeout(toastTimer.current);
    setToast(text);
    toastTimer.current = window.setTimeout(() => setToast(''), 2600);
  }, []);

  return (
    <UIContext.Provider value={{ theme, setTheme, cardSize, setCardSize, toast, flash }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}
