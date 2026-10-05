import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logout } from '../../store/slices/authSlice'
import { toggleTheme, toggleSidebar } from '../../store/slices/uiSlice'
import {
  Brain,
  Sun,
  Moon,
  LogOut,
  User,
  Menu,
  LayoutDashboard,
} from 'lucide-react'

export default function Navbar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, user } = useAppSelector(s => s.auth)
  const { theme } = useAppSelector(s => s.ui)

  const isProtected = ['/dashboard', '/recommend', '/history', '/favorites', '/roadmap', '/profile'].some(
    p => location.pathname.startsWith(p)
  )

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav
      style={{ backgroundColor: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}
      className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 h-16"
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        {isAuthenticated && isProtected && (
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg hover:bg-blue-500/10 text-[var(--color-text-secondary)] hover:text-blue-400 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
        )}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Brain size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg hidden sm:block">
            <span className="gradient-text">Algo</span>
            <span style={{ color: 'var(--color-text-primary)' }}>Advisor</span>
          </span>
        </Link>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-lg hover:bg-blue-500/10 text-[var(--color-text-secondary)] hover:text-blue-400 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
            >
              <User size={16} />
              <span className="hidden sm:block">{user?.name?.split(' ')[0]}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:block">Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-secondary text-sm py-2 px-4">
              Login
            </Link>
            <Link to="/register" className="btn-primary text-sm py-2 px-4">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
