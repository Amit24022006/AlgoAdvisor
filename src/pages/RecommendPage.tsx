import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  setRecommendationLoading,
  setRecommendationResult,
  setRecommendationError,
  swapAlgorithm,
  type Algorithm,
} from '../store/slices/recommendationSlice'
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice'
import { addHistoryItem } from '../store/slices/historySlice'
import { addToast } from '../store/slices/uiSlice'
import { getRecommendation } from '../api/recommend'
import { MOCK_RECOMMENDATION } from '../utils/mockData'
import { ErrorBanner } from '../components/ui/Toast'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import CodeBlock from '../components/ui/CodeBlock'
import AlgorithmCard from '../components/ui/AlgorithmCard'
import AlgorithmFlow from '../components/visualization/AlgorithmFlow'
import AISuggestionPanel from '../components/ui/AISuggestionPanel'
import {
  ChevronDown, ChevronUp, Heart, Clock, Database,
  Lightbulb, Sparkles, RefreshCw
} from 'lucide-react'

function AdvancedSection({ values, onChange }: {
  values: { inputSize: string; timeLimit: string; constraints: string }
  onChange: (k: string, v: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
      >
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        Advanced Constraints (Optional)
      </button>
      {open && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl"
          style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              Input Size (e.g. 10^6)
            </label>
            <input
              className="input-field text-sm"
              placeholder="e.g. 1000000"
              value={values.inputSize}
              onChange={e => onChange('inputSize', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              Time Limit (e.g. 1s)
            </label>
            <input
              className="input-field text-sm"
              placeholder="e.g. 2s"
              value={values.timeLimit}
              onChange={e => onChange('timeLimit', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              Additional Notes
            </label>
            <input
              className="input-field text-sm"
              placeholder="e.g. no extra space"
              value={values.constraints}
              onChange={e => onChange('constraints', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default function RecommendPage() {
  const dispatch = useAppDispatch()
  const { current, loading, error } = useAppSelector(s => s.recommendation)
  const { items: favorites } = useAppSelector(s => s.favorites)

  const [problem, setProblem] = useState('')
  const [advanced, setAdvanced] = useState({ inputSize: '', timeLimit: '', constraints: '' })

  const isFav = (id: string) => favorites.some(f => f.id === id)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!problem.trim()) return
    dispatch(setRecommendationLoading(true))
    try {
      // Try real API, fallback to mock
      let result
      try {
        const res = await getRecommendation({
          problemDescription: problem,
          inputSize: advanced.inputSize,
          timeLimit: advanced.timeLimit,
          additionalConstraints: advanced.constraints,
        })
        result = res.data
      } catch {
        // Backend not connected – use mock
        await new Promise(r => setTimeout(r, 1800)) // simulate latency
        result = { ...MOCK_RECOMMENDATION, problemDescription: problem, timestamp: new Date().toISOString() }
      }

      dispatch(setRecommendationResult(result))

      // Auto-save to history
      dispatch(addHistoryItem({
        id: Date.now().toString(),
        problemDescription: problem,
        algorithmName: result.algorithm.name,
        category: result.algorithm.category,
        timeComplexity: result.algorithm.timeComplexity,
        spaceComplexity: result.algorithm.spaceComplexity,
        timestamp: result.timestamp,
        result,
      }))
      dispatch(addToast({ type: 'success', message: 'Recommendation ready! Auto-saved to history.' }))
    } catch (err: any) {
      dispatch(setRecommendationError(err.message || 'Something went wrong'))
    }
  }

  const handleFavorite = (algo: Algorithm) => {
    if (isFav(algo.id)) {
      dispatch(removeFavorite(algo.id))
      dispatch(addToast({ type: 'info', message: `Removed "${algo.name}" from favorites` }))
    } else {
      dispatch(addFavorite(algo))
      dispatch(addToast({ type: 'success', message: `Saved "${algo.name}" to favorites!` }))
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
          <Lightbulb size={28} style={{ color: '#3b82f6' }} /> Algorithm Recommender
        </h1>
        <p className="mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          Describe your problem in plain English and get the perfect algorithm.
        </p>
      </div>

      {/* Input Form */}
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
              Describe your problem *
            </label>
            <textarea
              value={problem}
              onChange={e => setProblem(e.target.value)}
              placeholder="e.g. I need to find a target value in a large sorted array as efficiently as possible..."
              rows={5}
              className="input-field resize-none"
              style={{ fontFamily: 'inherit' }}
              required
            />
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
              {problem.length} characters · Be as specific as possible for best results
            </p>
          </div>

          <AdvancedSection
            values={advanced}
            onChange={(k, v) => setAdvanced(a => ({ ...a, [k]: v }))}
          />

          <div className="flex gap-3">
            <button type="submit" disabled={loading || !problem.trim()} className="btn-primary py-3 px-6">
              {loading ? <LoadingSpinner size={18} /> : <Sparkles size={18} />}
              {loading ? 'Analyzing problem...' : 'Get Recommendation'}
            </button>
            {current && (
              <button
                type="button"
                onClick={() => { setProblem(''); }}
                className="btn-secondary py-3 px-4"
              >
                <RefreshCw size={16} /> New Problem
              </button>
            )}
          </div>
        </form>
      </div>

      {/* AI Suggestion Panel — quick approach hint before full recommendation */}
      <details className="group">
        <summary
          className="card cursor-pointer list-none flex items-center justify-between py-3 px-5"
          style={{ userSelect: 'none' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
              <Sparkles size={13} className="text-white" />
            </div>
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Quick AI Approach Hint
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}
            >
              no code by default
            </span>
          </div>
          <ChevronDown
            size={16}
            className="transition-transform group-open:rotate-180"
            style={{ color: 'var(--color-text-secondary)' }}
          />
        </summary>
        <div className="card mt-2">
          <AISuggestionPanel compact />
        </div>
      </details>

      {/* Loading state */}
      {loading && (
        <div className="card flex flex-col items-center py-16 gap-4">
          <div className="relative">
            <LoadingSpinner size={48} className="text-blue-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain size={18} className="text-blue-400 animate-pulse" />
            </div>
          </div>
          <p className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Analyzing your problem...
          </p>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Matching patterns, evaluating complexities, selecting best algorithm
          </p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <ErrorBanner message={error} />
      )}

      {/* Results */}
      {current && !loading && (
        <div className="space-y-6">
          {/* Confidence bar */}
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                Confidence Score
              </span>
              <span className="font-bold text-green-400">{current.confidence}%</span>
            </div>
            <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
              <div
                className="h-2 rounded-full gradient-bg transition-all duration-500"
                style={{ width: `${current.confidence}%` }}
              />
            </div>
          </div>

          {/* Main result */}
          <div className="card space-y-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-extrabold" style={{ color: 'var(--color-text-primary)' }}>
                    {current.algorithm.name}
                  </h2>
                  <span
                    className="badge"
                    style={{ backgroundColor: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}
                  >
                    {current.algorithm.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} style={{ color: '#3b82f6' }} />
                    Time: <strong style={{ color: 'var(--color-text-primary)' }}>{current.algorithm.timeComplexity}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Database size={14} style={{ color: '#8b5cf6' }} />
                    Space: <strong style={{ color: 'var(--color-text-primary)' }}>{current.algorithm.spaceComplexity}</strong>
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleFavorite(current.algorithm)}
                className={`btn-secondary px-4 py-2 ${isFav(current.algorithm.id) ? 'border-red-500 text-red-400' : ''}`}
              >
                <Heart
                  size={16}
                  style={{ fill: isFav(current.algorithm.id) ? '#ef4444' : 'none', color: isFav(current.algorithm.id) ? '#ef4444' : undefined }}
                />
                {isFav(current.algorithm.id) ? 'Saved' : 'Save to Favorites'}
              </button>
            </div>

            {/* Explanation */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                Explanation
              </h3>
              <p style={{ color: 'var(--color-text-primary)', lineHeight: '1.7' }}>
                {current.algorithm.explanation}
              </p>
            </div>

            {/* Code */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                Java Implementation
              </h3>
              <CodeBlock
                code={current.algorithm.javaCode}
                language="java"
                filename={`${current.algorithm.name.replace(/\s+/g, '')}.java`}
              />
            </div>

            {/* Flow visualization */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                Interactive Dry-Run
              </h3>
              <AlgorithmFlow algorithmName={current.algorithm.name} />
            </div>
          </div>

          {/* Alternatives */}
          {current.alternatives.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                Alternative Algorithms
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {current.alternatives.map(alt => (
                  <AlgorithmCard
                    key={alt.id}
                    algorithm={alt}
                    onFavorite={handleFavorite}
                    onSelect={(a) => dispatch(swapAlgorithm(a))}
                    isFavorited={isFav(alt.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Fix missing import
function Brain({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
      <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
      <path d="M6 18a4 4 0 0 1-1.967-.516"/>
      <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
    </svg>
  )
}
