import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setHistoryItems } from '../store/slices/historySlice'
import { setFavoritesItems } from '../store/slices/favoritesSlice'
import { MOCK_HISTORY, MOCK_RECOMMENDATION } from '../utils/mockData'
import {
  Lightbulb, History, Heart, Map, TrendingUp, BookOpen, Star, Zap
} from 'lucide-react'

const quickLinks = [
  {
    to: '/recommend',
    icon: <Lightbulb size={24} />,
    title: 'New Recommendation',
    desc: 'Describe a problem and get the best algorithm instantly',
    gradient: 'from-blue-500 to-violet-500',
    color: '#3b82f6',
  },
  {
    to: '/problems',
    icon: <BookOpen size={24} />,
    title: 'Practice Problems',
    desc: '30 curated problems with AI approach hints',
    gradient: 'from-violet-500 to-purple-500',
    color: '#8b5cf6',
  },
  {
    to: '/history',
    icon: <History size={24} />,
    title: 'View History',
    desc: 'Browse all your past problem analyses',
    gradient: 'from-emerald-500 to-teal-500',
    color: '#10b981',
  },
  {
    to: '/favorites',
    icon: <Heart size={24} />,
    title: 'My Favorites',
    desc: 'Quick access to saved algorithms',
    gradient: 'from-pink-500 to-rose-500',
    color: '#ec4899',
  },
  {
    to: '/roadmap',
    icon: <Map size={24} />,
    title: 'Learning Roadmap',
    desc: 'Track progress across algorithm categories',
    gradient: 'from-orange-500 to-amber-500',
    color: '#f97316',
  },
]

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(s => s.auth)
  const { items: history } = useAppSelector(s => s.history)
  const { items: favorites } = useAppSelector(s => s.favorites)
  const { userStates } = useAppSelector(s => s.problems)

  // Load mock data on mount (replace with real API calls when backend ready)
  useEffect(() => {
    if (history.length === 0) dispatch(setHistoryItems(MOCK_HISTORY))
    if (favorites.length === 0) dispatch(setFavoritesItems([MOCK_RECOMMENDATION.algorithm]))
  }, [])

  const totalProblems = history.length
  const totalFavorites = favorites.length
  const solvedProblems = Object.values(userStates).filter(s => s.status === 'solved').length

  const stats = [
    { icon: <TrendingUp size={20} />, label: 'Problems Solved', value: totalProblems, color: '#3b82f6' },
    { icon: <Star size={20} />,      label: 'Favorites Saved',  value: totalFavorites,  color: '#ec4899' },
    { icon: <BookOpen size={20} />,  label: 'Practice Solved',  value: solvedProblems,  color: '#10b981' },
  ]

  const firstName = user?.name?.split(' ')[0] || 'Developer'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">👋</span>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            {greeting}, <span className="gradient-text">{firstName}!</span>
          </h1>
        </div>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Ready to solve some problems? Your AlgoAdvisor dashboard is here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="card flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
            >
              {stat.icon}
            </div>
            <div>
              <div className="text-3xl font-extrabold" style={{ color: 'var(--color-text-primary)' }}>
                {stat.value}
              </div>
              <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
          <Zap size={18} style={{ color: '#3b82f6' }} /> Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {quickLinks.map(link => (
            <Link key={link.to} to={link.to} className="card group hover:no-underline">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white bg-gradient-to-br ${link.gradient} shadow-lg`}
              >
                {link.icon}
              </div>
              <h3 className="font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                {link.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
            <History size={18} style={{ color: '#3b82f6' }} /> Recent Activity
          </h2>
          <Link to="/history" className="text-sm text-blue-400 hover:underline">View all →</Link>
        </div>
        <div className="card overflow-hidden p-0">
          <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {history.slice(0, 4).map(item => (
              <div key={item.id} className="flex items-center gap-4 px-5 py-4 hover:bg-blue-500/5 transition-colors cursor-pointer">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-sm"
                  style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                >
                  🧠
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
                    {item.problemDescription}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    → {item.algorithmName}
                  </p>
                </div>
                <div className="text-xs shrink-0" style={{ color: 'var(--color-text-secondary)' }}>
                  {new Date(item.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
