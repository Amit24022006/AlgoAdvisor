import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import {
  LayoutDashboard,
  Lightbulb,
  History,
  Heart,
  Map,
  User,
  ChevronLeft,
  BookOpen,
} from 'lucide-react'
import { useAppDispatch } from '../../store/hooks'
import { toggleSidebar } from '../../store/slices/uiSlice'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/recommend', icon: Lightbulb,       label: 'Recommend' },
  { to: '/problems',  icon: BookOpen,        label: 'Problems' },
  { to: '/history',   icon: History,         label: 'History' },
  { to: '/favorites', icon: Heart,           label: 'Favorites' },
  { to: '/roadmap',   icon: Map,             label: 'Roadmap' },
  { to: '/profile',   icon: User,            label: 'Profile' },
]

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const { sidebarOpen } = useAppSelector(s => s.ui)

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      <aside
        style={{ backgroundColor: 'var(--color-bg-secondary)', borderRight: '1px solid var(--color-border)' }}
        className={`
          fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] z-40
          flex flex-col transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-60' : 'w-0 md:w-16 overflow-hidden'}
        `}
      >
        <div className="flex flex-col gap-1 p-3 overflow-y-auto flex-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={18} className="shrink-0" />
              {sidebarOpen && <span className="truncate">{label}</span>}
            </NavLink>
          ))}
        </div>

        {/* Collapse button */}
        <div className="p-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="sidebar-item w-full justify-center md:justify-start"
            title="Collapse sidebar"
          >
            <ChevronLeft
              size={18}
              className={`transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`}
            />
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
