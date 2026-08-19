import { useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { Loader } from './components/Loader';
import { Toast } from './components/Toast';
import { EventModal } from './components/EventModal';
import { useIsMobile } from './hooks/useIsMobile';
import { HomePage } from './pages/HomePage';
import { GridPage } from './pages/GridPage';
import { EducationPage } from './pages/EducationPage';
import { ArticlePage } from './pages/ArticlePage';
import { ProfilePage } from './pages/ProfilePage';
import { EditAccountPage } from './pages/EditAccountPage';
import { SettingsPage } from './pages/SettingsPage';
import { PublishPage } from './pages/PublishPage';
import { AuthPage } from './pages/AuthPage';

function AppLayout() {
  const location = useLocation();
  const path = location.pathname;
  const noSidebar = path === '/publish' || path.startsWith('/article');

  return (
    <div className="ts-shell">
      {!noSidebar && <Sidebar />}
      <main className="ts-main">
        {noSidebar && (
          <button className="ts-back-btn" onClick={() => window.history.back()}>
            ←
          </button>
        )}
        <Outlet />
        {!(path === '/' || path === '/news') && <div className="ts-footer" />}
      </main>
      <EventModal />
      <Toast />
      <BottomNav />
    </div>
  );
}

function HomeGate() {
  const isMobile = useIsMobile();
  if (isMobile) return <Navigate to="/opportunities" replace />;
  return <HomePage />;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loader />;

  return (
    <Routes>
      <Route path="/auth" element={<AuthShell />} />
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomeGate />} />
        <Route path="news" element={<GridPage mode="news" />} />
        <Route path="opportunities" element={<GridPage mode="opps" />} />
        <Route path="opportunities/:category" element={<GridPage mode="opps" />} />
        <Route path="favorites" element={<GridPage mode="fav" />} />
        <Route path="vote" element={<GridPage mode="vote" />} />
        <Route path="education/nct" element={<EducationPage track="edu-nct" />} />
        <Route path="education/abroad" element={<EducationPage track="edu-abroad" />} />
        <Route path="article/:id" element={<ArticlePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/edit" element={<EditAccountPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="publish" element={<PublishPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function AuthShell() {
  return (
    <div className="ts-shell">
      <main className="ts-main">
        <button className="ts-back-btn" onClick={() => window.history.back()}>
          ←
        </button>
        <AuthPage />
      </main>
      <Toast />
    </div>
  );
}
