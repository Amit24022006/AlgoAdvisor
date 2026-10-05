import { Brain, Code2, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)' }}
      className="px-6 py-8"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
            <Brain size={14} className="text-white" />
          </div>
          <span className="font-semibold text-sm">
            <span className="gradient-text">Algo</span>
            <span style={{ color: 'var(--color-text-primary)' }}>Advisor</span>
          </span>
          <span className="text-xs ml-2" style={{ color: 'var(--color-text-secondary)' }}>
            © 2025 All rights reserved
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/recommend" className="hover:text-blue-400 transition-colors">Recommend</Link>
          <Link to="/roadmap" className="hover:text-blue-400 transition-colors">Roadmap</Link>
          <a href="#" className="hover:text-blue-400 transition-colors"><Code2 size={16} /></a>
          <a href="#" className="hover:text-blue-400 transition-colors"><Star size={16} /></a>
        </div>
      </div>
    </footer>
  )
}
