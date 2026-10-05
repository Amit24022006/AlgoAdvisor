import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { Brain, Zap, BarChart2, Code2, ArrowRight, CheckCircle } from 'lucide-react'

const steps = [
  {
    num: 1,
    icon: '✏️',
    title: 'Describe',
    desc: 'Explain your problem in plain English. No jargon needed.',
  },
  {
    num: 2,
    icon: '🧠',
    title: 'Analyze',
    desc: 'Our AI analyzes complexity, constraints, and patterns.',
  },
  {
    num: 3,
    icon: '🎯',
    title: 'Recommend',
    desc: 'Get the best algorithm with code, complexity, and visualization.',
  },
]

const features = [
  { icon: <Brain size={22} />, title: 'Smart AI Matching', desc: 'Context-aware algorithm selection based on your exact problem.' },
  { icon: <Zap size={22} />, title: 'Instant Results', desc: 'Get recommendations in seconds with ready-to-use Java code.' },
  { icon: <BarChart2 size={22} />, title: 'Complexity Analysis', desc: 'Time & space complexity with Big-O notation explained clearly.' },
  { icon: <Code2 size={22} />, title: 'Interactive Visualization', desc: 'Watch algorithms run step-by-step in a live flow diagram.' },
]

export default function LandingPage() {
  const { isAuthenticated } = useAppSelector(s => s.auth)

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-32 text-center">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.15) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
            style={{ backgroundColor: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#60a5fa' }}>
            <Zap size={14} />
            AI-Powered Algorithm Recommendations
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="gradient-text">AlgoAdvisor</span>
            <br />
            <span style={{ color: 'var(--color-text-primary)' }}>
              Best Algorithm,
            </span>
            <br />
            <span style={{ color: 'var(--color-text-secondary)' }}>
              Every Problem.
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Stop Googling. Describe your coding problem, get the perfect algorithm with
            complexity analysis, ready-to-use Java code, and interactive visualization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={isAuthenticated ? '/recommend' : '/register'}
              className="btn-primary text-base py-3 px-8"
            >
              Get Started Free <ArrowRight size={18} />
            </Link>
            {!isAuthenticated && (
              <Link to="/login" className="btn-secondary text-base py-3 px-8">
                Sign In
              </Link>
            )}
          </div>

          {/* Social proof */}
          <div className="mt-8 flex items-center justify-center gap-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {['Binary Search', 'Dijkstra', 'DP', 'Quick Sort'].map(tag => (
              <span key={tag} className="flex items-center gap-1">
                <CheckCircle size={13} style={{ color: '#22c55e' }} /> {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
            How It Works
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Three simple steps from problem to solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* connector line */}
          <div
            className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5"
            style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', opacity: 0.3 }}
          />

          {steps.map(step => (
            <div key={step.num} className="card text-center relative">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
                style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
              >
                {step.icon}
              </div>
              <div
                className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
              >
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                {step.title}
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Everything You Need
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
              From recommendation to mastery.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="card group">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 gradient-bg text-white"
                >
                  {f.icon}
                </div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{f.title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4 gradient-text">
            Ready to Stop Guessing?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            Join developers who get instant, smart algorithm recommendations.
          </p>
          <Link
            to={isAuthenticated ? '/recommend' : '/register'}
            className="btn-primary text-lg py-4 px-10"
          >
            Start for Free <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
