import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { addToast } from '../store/slices/uiSlice'
import { registerUser } from '../api/auth'
import { ErrorBanner } from '../components/ui/Toast'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { Eye, EyeOff, Brain, UserPlus } from 'lucide-react'

export default function RegisterPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setServerError('')
    try {
      await registerUser({ name: form.name, email: form.email, password: form.password })
      dispatch(addToast({ type: 'success', message: 'Account created! Please sign in.' }))
      navigate('/login')
    } catch (err: any) {
      setServerError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const field = (key: keyof typeof form, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
        {label}
      </label>
      <div className="relative">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={form[key]}
          onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: '' })) }}
          placeholder={placeholder}
          className="input-field"
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-error` : undefined}
        />
        {(type === 'password') && (
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {errors[key] && (
        <p id={`${key}-error`} className="text-red-400 text-xs mt-1">{errors[key]}</p>
      )}
    </div>
  )

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
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Create your account</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline font-medium">Sign in</Link>
          </p>
        </div>

        <div className="card">
          {serverError && <ErrorBanner message={serverError} onDismiss={() => setServerError('')} className="mb-4" />}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {field('name', 'Full Name', 'text', 'John Doe')}
            {field('email', 'Email Address', 'email', 'john@example.com')}
            {field('password', 'Password', 'password', 'At least 8 characters')}
            {field('confirmPassword', 'Confirm Password', 'password', 'Repeat your password')}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 mt-2">
              {loading ? <LoadingSpinner size={18} /> : <UserPlus size={18} />}
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-xs mt-4 text-center" style={{ color: 'var(--color-text-secondary)' }}>
            By registering, you agree to our{' '}
            <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>
          </p>
        </div>
      </div>
    </div>
  )
}
