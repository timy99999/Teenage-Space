import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { UIProvider } from './contexts/UIContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles/theme.css';
import './styles/app.css';
import './styles/mobile.css';

function FatalFallback() {
  return (
    <div className="ts-banned-gate">
      <div className="ts-banned-box">
        <h1 className="ts-banned-title">Что-то пошло не так</h1>
        <p className="ts-banned-text">
          Приложение не запустилось. Обновите страницу — обычно это помогает.
        </p>
        <button className="ts-btn-outline" onClick={() => window.location.reload()}>
          Обновить
        </button>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary label="root" fallback={() => <FatalFallback />}>
      <BrowserRouter>
        <UIProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </UIProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
