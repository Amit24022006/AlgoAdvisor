import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { removeToast } from '../../store/slices/uiSlice'

const icons = {
  error: AlertCircle,
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
}

const colors = {
  error: { bg: 'rgba(239,68,68,0.1)', border: '#ef4444', text: '#ef4444' },
  success: { bg: 'rgba(34,197,94,0.1)', border: '#22c55e', text: '#22c55e' },
  info: { bg: 'rgba(59,130,246,0.1)', border: '#3b82f6', text: '#3b82f6' },
  warning: { bg: 'rgba(234,179,8,0.1)', border: '#eab308', text: '#eab308' },
}

function Toast({ id, type, message }: { id: string; type: 'success' | 'error' | 'info' | 'warning'; message: string }) {
  const dispatch = useAppDispatch()
  const Icon = icons[type]
  const col = colors[type]

  useEffect(() => {
    const t = setTimeout(() => dispatch(removeToast(id)), 4000)
    return () => clearTimeout(t)
  }, [id, dispatch])

  return (
    <div
      style={{ background: col.bg, border: `1px solid ${col.border}`, color: col.text }}
      className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg max-w-sm w-full backdrop-blur-sm animate-[slideIn_0.3s_ease]"
    >
      <Icon size={18} className="shrink-0" />
      <span className="text-sm font-medium flex-1">{message}</span>
      <button
        onClick={() => dispatch(removeToast(id))}
        className="shrink-0 hover:opacity-70 transition-opacity"
      >
        <X size={14} />
      </button>
    </div>
  )
}

export function ToastContainer() {
  const { toasts } = useAppSelector(s => s.ui)

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map(t => (
        <Toast key={t.id} {...t} />
      ))}
    </div>
  )
}

interface ErrorBannerProps {
  message: string
  onDismiss?: () => void
  className?: string
}

export function ErrorBanner({ message, onDismiss, className = '' }: ErrorBannerProps) {
  if (!message) return null
  return (
    <div
      style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', color: '#ef4444' }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl ${className}`}
      role="alert"
    >
      <AlertCircle size={18} className="shrink-0" />
      <span className="text-sm font-medium flex-1">{message}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="hover:opacity-70 transition-opacity">
          <X size={14} />
        </button>
      )}
    </div>
  )
}
