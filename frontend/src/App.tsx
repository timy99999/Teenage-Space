import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { BannedGate } from './components/BannedGate';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NetTroubleToast } from './components/NetTroubleToast';
import { Loader } from './components/Loader';
import { Toast } from './components/Toast';
import { EventModal } from './components/EventModal';
import { NewsModal } from './components/NewsModal';
import { PolicyGate } from './components/PolicyGate';
import { useIsMobile } from './hooks/useIsMobile';
import { useEducationTracks } from './hooks/useEducation';
import { useTrackPageView } from './hooks/useTrackPageView';
import { useHeartbeat } from './hooks/useHeartbeat';
import { useAuth } from './contexts/AuthContext';
import { HomePage } from './pages/HomePage';
import { GridPage } from './pages/GridPage';

const EducationPage = lazy(() => import('./pages/EducationPage').then((m) => ({ default: m.EducationPage })));
const ArticlePage = lazy(() => import('./pages/ArticlePage').then((m) => ({ default: m.ArticlePage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const EditAccountPage = lazy(() => import('./pages/EditAccountPage').then((m) => ({ default: m.EditAccountPage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));
const PublishPage = lazy(() => import('./pages/PublishPage').then((m) => ({ default: m.PublishPage })));
const AuthPage = lazy(() => import('./pages/AuthPage').then((m) => ({ default: m.AuthPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage').then((m) => ({ default: m.AnalyticsPage })));
const BarsPage = lazy(() => import('./pages/BarsPage').then((m) => ({ default: m.BarsPage })));
const UsersPage = lazy(() => import('./pages/UsersPage').then((m) => ({ default: m.UsersPage })));
const UserAccountPage = lazy(() => import('./pages/UserAccountPage').then((m) => ({ default: m.UserAccountPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));

function AppLayout() {
  const location = useLocation();
  const path = location.pathname;
  const noSidebar = path === '/publish' || path.startsWith('/article') || path === '/privacy';
  useTrackPageView();
  useHeartbeat();

  return (
    <div className="ts-shell">
      {!noSidebar && <Sidebar />}
      <main className="ts-main">
        {noSidebar && (
          <button className="ts-back-btn" onClick={() => window.history.back()}>
            ←
          </button>
        )}
        <ErrorBoundary label="page" resetKey={path}>
          <Outlet />
        </ErrorBoundary>
        {!(path === '/' || path === '/news') && <div className="ts-footer" />}
      </main>
      <ErrorBoundary label="event-modal" resetKey={path} fallback={() => null}>
        <EventModal />
      </ErrorBoundary>
      <ErrorBoundary label="news-modal" resetKey={path} fallback={() => null}>
        <NewsModal />
      </ErrorBoundary>
      <PolicyGate />
      <NetTroubleToast />
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

function EducationIndex() {
  const { tracks } = useEducationTracks();
  if (tracks.length === 0) return null;
  return <Navigate to={`/education/${tracks[0].id}`} replace />;
}

export default function App() {
  const { loading, banInfo } = useAuth();

  if (loading) return <Loader />;
  if (banInfo) return <BannedGate info={banInfo} />;

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/auth" element={<AuthShell />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomeGate />} />
          <Route path="news" element={<GridPage mode="news" />} />
          <Route path="opportunities" element={<GridPage mode="opps" />} />
          <Route path="opportunities/:category" element={<GridPage mode="opps" />} />
          <Route path="favorites" element={<GridPage mode="fav" />} />
          {/* временно скрыто: страница голосования — /vote уходит в редирект на "/" через catch-all
          <Route path="vote" element={<GridPage mode="vote" />} /> */}
          <Route path="education" element={<EducationIndex />} />
          <Route path="education/:trackId" element={<EducationPage />} />
          <Route path="article/:id" element={<ArticlePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/edit" element={<EditAccountPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="publish" element={<PublishPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="bars" element={<BarsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:id" element={<UserAccountPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
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
      <NetTroubleToast />
      <Toast />
    </div>
  );
}
