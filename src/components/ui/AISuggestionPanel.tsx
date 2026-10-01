import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  setAISuggestLoading,
  setAISuggestResult,
  setAISuggestError,
  setAISuggestQuestion,
  toggleShowCode,
  clearAISuggest,
} from '../../store/slices/aiSuggestSlice'
import { getAISuggestion } from '../../api/aiSuggest'
import { getMockAISuggestion } from '../../utils/mockProblems'
import { ErrorBanner } from './Toast'
import LoadingSpinner from './LoadingSpinner'
import CodeBlock from './CodeBlock'
import {
  Sparkles,
  Clock,
  Database,
  Tag,
  Eye,
  EyeOff,
  RotateCcw,
  Lightbulb,
  CheckCircle,
  Code2,
} from 'lucide-react'

interface AISuggestionPanelProps {
  /** Pre-fill the question textarea (e.g. from a problem page) */
  prefillText?: string
  /** Compact mode — used when embedded inside another page */
  compact?: boolean
}

export default function AISuggestionPanel({ prefillText, compact = false }: AISuggestionPanelProps) {
  const dispatch = useAppDispatch()
  const { result, loading, error, showCode, questionText } = useAppSelector(s => s.aiSuggest)

  // Sync prefill once on mount / when it changes
  const [localText, setLocalText] = useState(prefillText ?? questionText)

  const handleAsk = async () => {
    const trimmed = localText.trim()
    if (!trimmed) return
    dispatch(setAISuggestQuestion(trimmed))
    dispatch(setAISuggestLoading(true))

    try {
      // Try real API first; fall back to keyword-matched mock
      let suggestion
      try {
        const res = await getAISuggestion(trimmed)
        suggestion = res.data
      } catch {
        await new Promise(r => setTimeout(r, 1400))
        suggestion = getMockAISuggestion(trimmed)
      }
      dispatch(setAISuggestResult(suggestion))
    } catch (err: any) {
      dispatch(setAISuggestError(err.message || 'AI suggestion failed'))
    }
  }

  const handleClear = () => {
    setLocalText('')
    dispatch(clearAISuggest())
  }

  const confidenceColor = (c: number) =>
    c >= 90 ? '#22c55e' : c >= 75 ? '#eab308' : '#f97316'

  return (
    <div className="space-y-4">
      {/* Header */}
      {!compact && (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
              AI Suggestion Panel
            </h3>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              Get an approach strategy — no code unless you ask
            </p>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="space-y-3">
        <textarea
          value={localText}
          onChange={e => setLocalText(e.target.value)}
          placeholder="Paste or type your problem here… e.g. 'Find two numbers in an array that sum to a target'"
          rows={compact ? 3 : 5}
          className="input-field resize-none font-mono text-sm"
          disabled={loading}
        />

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleAsk}
            disabled={loading || !localText.trim()}
            className="btn-primary py-2 px-5"
          >
            {loading
              ? <><LoadingSpinner size={15} /> Thinking...</>
              : <><Sparkles size={15} /> Ask AI</>}
          </button>

          {(result || localText) && (
            <button onClick={handleClear} className="btn-secondary py-2 px-4 text-sm">
              <RotateCcw size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Error */}
      {error && <ErrorBanner message={error} />}

      {/* Loading shimmer */}
      {loading && (
        <div className="space-y-3">
          {[80, 60, 95, 70].map((w, i) => (
            <div key={i} className="skeleton h-4 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--color-border)' }}
        >
          {/* Top bar: algorithm name + confidence */}
          <div
            className="px-5 py-4 flex items-center justify-between gap-4 flex-wrap"
            style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.08) 100%)', borderBottom: '1px solid var(--color-border)' }}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Lightbulb size={16} style={{ color: '#3b82f6' }} />
                <h4 className="font-extrabold text-lg" style={{ color: 'var(--color-text-primary)' }}>
                  {result.algorithmName}
                </h4>
                <span
                  className="badge text-xs"
                  style={{ backgroundColor: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}
                >
                  <Tag size={10} className="mr-1" />
                  {result.category}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                <span className="flex items-center gap-1">
                  <Clock size={11} style={{ color: '#3b82f6' }} />
                  Time: <strong style={{ color: 'var(--color-text-primary)' }}>{result.timeComplexity}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Database size={11} style={{ color: '#8b5cf6' }} />
                  Space: <strong style={{ color: 'var(--color-text-primary)' }}>{result.spaceComplexity}</strong>
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div
                className="text-2xl font-extrabold"
                style={{ color: confidenceColor(result.confidence) }}
              >
                {result.confidence}%
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>confidence</div>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 space-y-5">
            {/* Reasoning */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Why This Approach
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: 'var(--color-text-primary)',
                  background: 'rgba(59,130,246,0.04)',
                  border: '1px solid rgba(59,130,246,0.12)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                }}
              >
                {result.reasoning}
              </p>
            </div>

            {/* Step-by-step */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Step-by-Step Approach
              </p>
              <ol className="space-y-2">
                {result.steps.map(s => (
                  <li key={s.step} className="flex items-start gap-3">
                    <span
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                      style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
                    >
                      {s.step}
                    </span>
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {s.text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* "Show code" toggle */}
            {result.codeSnippet && (
              <div>
                <button
                  onClick={() => dispatch(toggleShowCode())}
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all"
                  style={{
                    border: '1px solid var(--color-border)',
                    color: showCode ? '#3b82f6' : 'var(--color-text-secondary)',
                    backgroundColor: showCode ? 'rgba(59,130,246,0.07)' : 'transparent',
                  }}
                >
                  {showCode ? <EyeOff size={15} /> : <Eye size={15} />}
                  {showCode ? 'Hide implementation' : 'Show me the code anyway'}
                  <Code2 size={14} className="ml-auto opacity-60" />
                </button>

                {showCode && (
                  <div className="mt-3">
                    <p
                      className="text-xs mb-2 flex items-center gap-1"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      <CheckCircle size={12} style={{ color: '#22c55e' }} />
                      Implementation — study this only after you've understood the approach above
                    </p>
                    <CodeBlock
                      code={result.codeSnippet}
                      language="java"
                      filename="Solution.java"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
