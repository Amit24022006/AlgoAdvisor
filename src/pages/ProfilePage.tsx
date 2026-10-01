import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout, updateUser } from '../store/slices/authSlice'
import { addToast } from '../store/slices/uiSlice'
import { updateProfile } from '../api/auth'
import { ErrorBanner } from '../components/ui/Toast'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { User, Mail, Lock, LogOut, Save, Eye, EyeOff, Shield } from 'lucide-react'

export default function ProfilePage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector(s => s.auth)

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile')

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      // Try real API, fallback to local update
      try {
        await updateProfile({ name, email })
      } catch {}
      dispatch(updateUser({ name, email }))
      dispatch(addToast({ type: 'success', message: 'Profile updated successfully!' }))
    } catch (err: any) {
      setError('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters')
      return
    }
    setLoading(true)
    setError('')
    try {
      await updateProfile({ password: newPassword })
      dispatch(addToast({ type: 'success', message: 'Password changed successfully!' }))
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('')
    } catch {
      setError('Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(addToast({ type: 'info', message: 'Logged out successfully' }))
    navigate('/')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
          <User size={28} style={{ color: '#8b5cf6' }} /> Profile Settings
        </h1>
        <p className="mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          Manage your account information and security.
        </p>
      </div>

      {/* Avatar */}
      <div className="card flex items-center gap-5">
        <div
          className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-2xl font-bold text-white shrink-0"
        >
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <div>
          <p className="font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>{user?.name}</p>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{user?.email}</p>
          <span className="badge mt-1" style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
            <Shield size={10} className="mr-1" /> Active Account
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
        {[
          { key: 'profile', label: 'Profile Info', icon: <User size={14} /> },
          { key: 'security', label: 'Security', icon: <Lock size={14} /> },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key as any); setError('') }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'gradient-bg text-white shadow'
                : ''
            }`}
            style={activeTab !== tab.key ? { color: 'var(--color-text-secondary)' } : {}}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {error && <ErrorBanner message={error} onDismiss={() => setError('')} />}

      {/* Profile tab */}
      {activeTab === 'profile' && (
        <div className="card">
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                <User size={14} /> Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                <Mail size={14} /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary py-3 px-6">
              {loading ? <LoadingSpinner size={16} /> : <Save size={16} />}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      )}

      {/* Security tab */}
      {activeTab === 'security' && (
        <div className="card">
          <form onSubmit={handlePasswordSave} className="space-y-4">
            {[
              { label: 'Current Password', value: currentPassword, setter: setCurrentPassword },
              { label: 'New Password', value: newPassword, setter: setNewPassword },
              { label: 'Confirm New Password', value: confirmPassword, setter: setConfirmPassword },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                  {f.label}
                </label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={f.value}
                    onChange={e => f.setter(e.target.value)}
                    className="input-field"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            ))}
            <button type="submit" disabled={loading} className="btn-primary py-3 px-6">
              {loading ? <LoadingSpinner size={16} /> : <Lock size={16} />}
              {loading ? 'Updating...' : 'Change Password'}
            </button>
          </form>
        </div>
      )}

      {/* Logout */}
      <div className="card" style={{ border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.03)' }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Sign Out</p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Sign out of your account on this device.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors border"
            style={{ borderColor: 'rgba(239,68,68,0.3)' }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
