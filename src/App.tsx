import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppSelector } from './store/hooks'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { ToastContainer } from './components/ui/Toast'
import ProtectedRoute from './routes/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import RecommendPage from './pages/RecommendPage'
import HistoryPage from './pages/HistoryPage'
import FavoritesPage from './pages/FavoritesPage'
import RoadmapPage from './pages/RoadmapPage'
import ProfilePage from './pages/ProfilePage'
import ProblemsPage from './pages/ProblemsPage'

export default function App() {
  const { theme } = useAppSelector(s => s.ui)

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }
  }, [theme])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-primary)' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/recommend" element={<RecommendPage />} />
            <Route path="/problems" element={<ProblemsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
              <div className="text-7xl font-extrabold gradient-text mb-4">404</div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Page not found</h2>
              <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                The page you're looking for doesn't exist.
              </p>
              <a href="/" className="btn-primary">← Go Home</a>
            </div>
          } />
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  )
}
