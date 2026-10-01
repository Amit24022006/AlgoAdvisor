import { useState } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { setAISuggestQuestion, clearAISuggest } from '../../store/slices/aiSuggestSlice'
import type { Problem, ProblemStatus } from '../../store/slices/problemsSlice'
import AISuggestionPanel from '../ui/AISuggestionPanel'
import {
  ArrowLeft,
  CheckCircle2,
  MinusCircle,
  Circle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Tag,
  Cpu,
  AlertCircle,
  Sparkles,
} from 'lucide-react'

// ── Difficulty colours ─────────────────────────────────────────────────────
const diffStyle = {
  Easy:   { bg: 'rgba(34,197,94,0.12)',  text: '#22c55e' },
  Medium: { bg: 'rgba(234,179,8,0.12)',  text: '#eab308' },
  Hard:   { bg: 'rgba(239,68,68,0.12)',  text: '#ef4444' },
}

// ── Status cycle helper ────────────────────────────────────────────────────
const statusMeta: Record<ProblemStatus, { icon: React.ReactNode; label: string; next: ProblemStatus }> = {
  unseen: {
    icon: <Circle size={16} style={{ color: 'var(--color-text-secondary)' }} />,
    label: 'Mark as Attempted',
    next: 'attempted',
  },
  attempted: {
    icon: <MinusCircle size={16} style={{ color: '#eab308' }} />,
    label: 'Mark as Solved',
    next: 'solved',
  },
  solved: {
    icon: <CheckCircle2 size={16} style={{ color: '#22c55e' }} />,
    label: 'Mark as Unseen',
    next: 'unseen',
  },
}

// ── Inline code formatting for problem statements ──────────────────────────
function ProblemText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g)
  return (
    <span>
      {parts.map((p, i) =>
        p.startsWith('`') && p.endsWith('`') ? (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded text-sm font-mono"
            style={{
              backgroundColor: 'rgba(59,130,246,0.1)',
              color: '#60a5fa',
              border: '1px solid rgba(59,130,246,0.2)',
            }}
          >
            {p.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </span>
  )
}

// ── Example block ──────────────────────────────────────────────────────────
function ExampleBlock({
  example,
  idx,
}: {
  example: { input: string; output: string; explanation?: string }
  idx: number
}) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid var(--color-border)' }}
    >
      <div
        className="px-4 py-2 text-xs font-semibold"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderBottom: '1px solid var(--color-border)',
          color: 'var(--color-text-secondary)',
        }}
      >
        Example {idx + 1}
      </div>
      <div className="px-4 py-3 space-y-2">
        <div>
          <span className="text-xs font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Input: </span>
          <code className="text-sm font-mono" style={{ color: 'var(--color-text-primary)' }}>
            {example.input}
          </code>
        </div>
        <div>
          <span className="text-xs font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Output: </span>
          <code className="text-sm font-mono" style={{ color: '#22c55e' }}>
            {example.output}
          </code>
        </div>
        {example.explanation && (
          <div>
            <span className="text-xs font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Explanation: </span>
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {example.explanation}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
interface Props {
  problem: Problem
  status: ProblemStatus
  onBack: () => void
  onMark: (status: ProblemStatus) => void
}

export default function ProblemDetail({ problem, status, onBack, onMark }: Props) {
  const dispatch = useAppDispatch()
  const diff = diffStyle[problem.difficulty]
  const sm = statusMeta[status]

  const [hintsOpen, setHintsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'ai'>('description')

  // Pre-fills the AI panel with this problem's title + description snippet
  const aiPrefill = `${problem.title}\n\n${problem.relatedAlgorithm ?? problem.description.slice(0, 300)}`

  const handleAskAI = () => {
    dispatch(clearAISuggest())
    dispatch(setAISuggestQuestion(aiPrefill))
    setActiveTab('ai')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium hover:text-blue-400 transition-colors"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <ArrowLeft size={16} /> Back to Problems
      </button>

      {/* Problem header */}
      <div className="card">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span
                className="text-sm font-mono"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                #{problem.number}
              </span>
              <h1 className="text-2xl font-extrabold" style={{ color: 'var(--color-text-primary)' }}>
                {problem.title}
              </h1>
              <span
                className="badge font-bold"
                style={{ backgroundColor: diff.bg, color: diff.text }}
              >
                {problem.difficulty}
              </span>
            </div>

            {/* Category tags */}
            <div className="flex flex-wrap gap-2">
              {problem.categories.map(c => (
                <span
                  key={c}
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium"
                  style={{
                    backgroundColor: 'rgba(59,130,246,0.08)',
                    color: '#60a5fa',
                    border: '1px solid rgba(59,130,246,0.15)',
                  }}
                >
                  <Tag size={10} /> {c}
                </span>
              ))}
              {problem.tags.slice(0, 3).map(t => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded-lg font-mono"
                  style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {/* Status cycle */}
            <button
              onClick={() => onMark(sm.next)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              {sm.icon}
              {sm.label}
            </button>

            {/* Ask AI */}
            <button
              onClick={handleAskAI}
              className="btn-primary py-2 px-4 text-sm"
            >
              <Sparkles size={15} /> Ask AlgoAdvisor
            </button>
          </div>
        </div>

        {/* Acceptance */}
        <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
          <Cpu size={14} style={{ color: 'var(--color-text-secondary)' }} />
          <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            Acceptance Rate:
          </span>
          <div className="w-24 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
            <div
              className="h-1.5 rounded-full"
              style={{
                width: `${problem.acceptance}%`,
                backgroundColor:
                  problem.acceptance >= 60 ? '#22c55e'
                  : problem.acceptance >= 40 ? '#eab308' : '#ef4444',
              }}
            />
          </div>
          <span className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            {problem.acceptance}%
          </span>
        </div>
      </div>

      {/* Tab switcher */}
      <div
        className="flex gap-1 p-1 rounded-xl"
        style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
      >
        {[
          { key: 'description', label: '📋 Problem Statement' },
          { key: 'ai', label: '✨ Ask AlgoAdvisor' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
            style={
              activeTab === tab.key
                ? { background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', color: '#fff' }
                : { color: 'var(--color-text-secondary)' }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Description tab ── */}
      {activeTab === 'description' && (
        <div className="space-y-4">
          {/* Statement */}
          <div className="card">
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Problem Statement
            </h3>
            <div
              className="text-sm leading-7 whitespace-pre-line"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {problem.description.split('\n').map((line, i) => (
                <p key={i} className={line.trim() === '' ? 'my-2' : 'mb-1'}>
                  <ProblemText text={line} />
                </p>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div className="card space-y-4">
            <h3
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Examples
            </h3>
            {problem.examples.map((ex, i) => (
              <ExampleBlock key={i} example={ex} idx={i} />
            ))}
          </div>

          {/* Constraints */}
          <div className="card">
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Constraints
            </h3>
            <ul className="space-y-2">
              {problem.constraints.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-mono">
                  <AlertCircle size={14} className="mt-0.5 shrink-0" style={{ color: '#eab308' }} />
                  <span style={{ color: 'var(--color-text-primary)' }}>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hints (collapsible) */}
          {problem.hints && problem.hints.length > 0 && (
            <div className="card">
              <button
                onClick={() => setHintsOpen(h => !h)}
                className="flex items-center gap-2 w-full text-left"
              >
                <Lightbulb size={16} style={{ color: '#eab308' }} />
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  Hints ({problem.hints.length})
                </span>
                <span className="ml-auto" style={{ color: 'var(--color-text-secondary)' }}>
                  {hintsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>
              {hintsOpen && (
                <ol className="mt-3 space-y-2">
                  {problem.hints.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span
                        className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: 'rgba(234,179,8,0.15)', color: '#eab308' }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{h}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}

          {/* CTA to AI tab */}
          <div
            className="card flex items-center justify-between gap-4 flex-wrap"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(139,92,246,0.06) 100%)',
              border: '1px solid rgba(59,130,246,0.2)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                  Stuck? Ask AlgoAdvisor
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  Get a step-by-step approach without spoiling the solution
                </p>
              </div>
            </div>
            <button onClick={handleAskAI} className="btn-primary py-2 px-5 text-sm shrink-0">
              <Sparkles size={14} /> Get Approach Hint
            </button>
          </div>
        </div>
      )}

      {/* ── AI Suggestion tab ── */}
      {activeTab === 'ai' && (
        <div className="card">
          <AISuggestionPanel prefillText={aiPrefill} compact={false} />
        </div>
      )}
    </div>
  )
}
