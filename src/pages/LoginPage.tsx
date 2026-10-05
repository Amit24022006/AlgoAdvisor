import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { setCredentials } from '../store/slices/authSlice'
import { addToast } from '../store/slices/uiSlice'
import { loginUser } from '../api/auth'
import { ErrorBanner } from '../components/ui/Toast'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { Eye, EyeOff, Brain, LogIn } from 'lucide-react'

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Valid email required'
    if (!password) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setServerError('')
    try {
      const res = await loginUser({ email, password })
      dispatch(setCredentials({ user: res.data.user, token: res.data.token }))
      dispatch(addToast({ type: 'success', message: `Welcome back, ${res.data.user.name}!` }))
      navigate('/dashboard')
    } catch (err: any) {
      setServerError(err.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Demo login (fills credentials for testing)
  const handleDemoLogin = () => {
    // Simulate login with mock data
    dispatch(setCredentials({
      user: { id: 'demo-1', name: 'Demo User', email: 'demo@algoadvisor.dev' },
      token: 'demo-jwt-token-' + Date.now(),
    }))
    dispatch(addToast({ type: 'success', message: 'Welcome to AlgoAdvisor Demo!' }))
    navigate('/dashboard')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Brain size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold">
              <span className="gradient-text">Algo</span>
              <span style={{ color: 'var(--color-text-primary)' }}>Advisor</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Welcome back</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            No account?{' '}
            <Link to="/register" className="text-blue-400 hover:underline font-medium">Sign up free</Link>
          </p>
        </div>

        <div className="card">
          {serverError && <ErrorBanner message={serverError} onDismiss={() => setServerError('')} className="mb-4" />}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: '' })) }}
                placeholder="john@example.com"
                className="input-field"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                  Password
                </label>
                <a href="#" className="text-xs text-blue-400 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(er => ({ ...er, password: '' })) }}
                  placeholder="Your password"
                  className="input-field"
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
              {loading ? <LoadingSpinner size={18} /> : <LogIn size={18} />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: 'var(--color-border)' }} />
            </div>
            <div className="relative flex justify-center text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              <span className="px-2" style={{ backgroundColor: 'var(--color-bg-card)' }}>or</span>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            className="btn-secondary w-full justify-center py-3"
          >
            🚀 Try Demo (No Login Needed)
          </button>
        </div>
      </div>
    </div>
  )
}
