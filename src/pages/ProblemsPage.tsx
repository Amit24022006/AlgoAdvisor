import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  setProblems,
  setSelectedProblem,
  setProblemStatus,
  setSearchQuery,
  setDifficultyFilter,
  setCategoryFilter,
  setTagFilter,
  setStatusFilter,
  type Difficulty,
  type ProblemStatus,
} from '../store/slices/problemsSlice'
import { clearAISuggest } from '../store/slices/aiSuggestSlice'
import { addToast } from '../store/slices/uiSlice'
import { MOCK_PROBLEMS } from '../utils/mockProblems'
import { ErrorBanner } from '../components/ui/Toast'
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  MinusCircle,
  ChevronRight,
  Trophy,
  Target,
  BarChart2,
} from 'lucide-react'
import ProblemDetail from '../components/problems/ProblemDetail'

// ── Difficulty pill ────────────────────────────────────────────────────────
const diffStyle: Record<Difficulty, { bg: string; text: string }> = {
  Easy:   { bg: 'rgba(34,197,94,0.12)',   text: '#22c55e' },
  Medium: { bg: 'rgba(234,179,8,0.12)',   text: '#eab308' },
  Hard:   { bg: 'rgba(239,68,68,0.12)',   text: '#ef4444' },
}

function DiffBadge({ d }: { d: Difficulty }) {
  const s = diffStyle[d]
  return (
    <span
      className="badge text-xs font-bold"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {d}
    </span>
  )
}

// ── Status icon ────────────────────────────────────────────────────────────
function StatusIcon({ status }: { status: ProblemStatus }) {
  if (status === 'solved')
    return <CheckCircle2 size={16} style={{ color: '#22c55e' }} />
  if (status === 'attempted')
    return <MinusCircle size={16} style={{ color: '#eab308' }} />
  return <Circle size={16} style={{ color: 'var(--color-border)' }} />
}

// ── Quick stats bar ────────────────────────────────────────────────────────
function StatsBar({
  total,
  solved,
  attempted,
}: {
  total: number
  solved: number
  attempted: number
}) {
  const pct = Math.round((solved / Math.max(total, 1)) * 100)
  return (
    <div className="card flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', flexShrink: 0 }}
        >
          <Trophy size={20} className="text-white" />
        </div>
        <div>
          <p className="text-2xl font-extrabold gradient-text">{solved} / {total}</p>
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Solved</p>
        </div>
      </div>

      <div className="flex-1 min-w-0 w-full sm:w-auto">
        <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
          <span>Progress</span>
          <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{pct}%</span>
        </div>
        <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
          <div
            className="h-2 rounded-full gradient-bg transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm shrink-0">
        {[
          { label: 'Easy',    count: MOCK_PROBLEMS.filter(p => p.difficulty === 'Easy').length,   color: '#22c55e' },
          { label: 'Medium',  count: MOCK_PROBLEMS.filter(p => p.difficulty === 'Medium').length, color: '#eab308' },
          { label: 'Hard',    count: MOCK_PROBLEMS.filter(p => p.difficulty === 'Hard').length,   color: '#ef4444' },
        ].map(({ label, count, color }) => (
          <div key={label} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
            <span className="font-bold" style={{ color }}>{count}</span>
          </div>
        ))}
        <div className="flex items-center gap-1 pl-2" style={{ borderLeft: '1px solid var(--color-border)' }}>
          <Target size={14} style={{ color: '#eab308' }} />
          <span className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
            {attempted} attempted
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function ProblemsPage() {
  const dispatch = useAppDispatch()
  const {
    items,
    userStates,
    error,
    selectedProblemId,
    searchQuery,
    difficultyFilter,
    categoryFilter,
    tagFilter,
    statusFilter,
  } = useAppSelector(s => s.problems)

  // Load problems once
  useEffect(() => {
    if (items.length === 0) dispatch(setProblems(MOCK_PROBLEMS))
  }, [])

  // All unique categories and tags
  const allCategories = useMemo(() =>
    ['All', ...Array.from(new Set(items.flatMap(p => p.categories))).sort()],
    [items]
  )
  const allTags = useMemo(() =>
    ['All', ...Array.from(new Set(items.flatMap(p => p.tags))).sort()],
    [items]
  )

  // Filtered list
  const filtered = useMemo(() => items.filter(p => {
    const q = searchQuery.toLowerCase()
    const matchSearch = !q ||
      p.title.toLowerCase().includes(q) ||
      p.categories.some(c => c.toLowerCase().includes(q)) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    const matchDiff = difficultyFilter === 'All' || p.difficulty === difficultyFilter
    const matchCat  = categoryFilter === 'All'  || p.categories.includes(categoryFilter)
    const matchTag  = tagFilter === 'All'       || p.tags.includes(tagFilter)
    const state = userStates[p.id]?.status ?? 'unseen'
    const matchStatus = statusFilter === 'All'  || state === statusFilter
    return matchSearch && matchDiff && matchCat && matchTag && matchStatus
  }), [items, userStates, searchQuery, difficultyFilter, categoryFilter, tagFilter, statusFilter])

  // Stats
  const solved   = Object.values(userStates).filter(s => s.status === 'solved').length
  const attempted = Object.values(userStates).filter(s => s.status === 'attempted').length

  // Open a problem
  const openProblem = (id: string) => {
    dispatch(clearAISuggest())
    dispatch(setSelectedProblem(id))
  }

  // Mark status
  const handleMark = (problemId: string, status: ProblemStatus, e: React.MouseEvent) => {
    e.stopPropagation()
    const current = userStates[problemId]?.status ?? 'unseen'
    const next: ProblemStatus = current === status ? 'unseen' : status
    dispatch(setProblemStatus({ problemId, status: next }))
    dispatch(addToast({
      type: next === 'solved' ? 'success' : next === 'attempted' ? 'info' : 'info',
      message: next === 'unseen'
        ? 'Marked as unseen'
        : next === 'solved'
        ? '✅ Marked as Solved!'
        : '🟡 Marked as Attempted',
    }))
  }

  // If a problem is selected, show detail view
  const selectedProblem = items.find(p => p.id === selectedProblemId)
  if (selectedProblem) {
    return (
      <ProblemDetail
        problem={selectedProblem}
        status={userStates[selectedProblem.id]?.status ?? 'unseen'}
        onBack={() => dispatch(setSelectedProblem(null))}
        onMark={(status) => {
          dispatch(setProblemStatus({ problemId: selectedProblem.id, status }))
          dispatch(addToast({
            type: status === 'solved' ? 'success' : 'info',
            message: status === 'solved' ? '✅ Marked as Solved!' : '🟡 Marked as Attempted',
          }))
        }}
      />
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
          <BookOpen size={28} style={{ color: '#8b5cf6' }} />
          Practice Problems
        </h1>
        <p className="mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          {items.length} curated problems · Click any to view details and get an AI suggestion
        </p>
      </div>

      {/* Stats */}
      <StatsBar total={items.length} solved={solved} attempted={attempted} />

      {/* Filters */}
      <div className="flex flex-col gap-3">
        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--color-text-secondary)' }}
          />
          <input
            type="text"
            placeholder="Search by title, category, or tag…"
            value={searchQuery}
            onChange={e => dispatch(setSearchQuery(e.target.value))}
            className="input-field pl-9"
          />
        </div>

        {/* Filter row */}
        <div className="flex flex-wrap gap-2">
          {/* Difficulty */}
          {(['All', 'Easy', 'Medium', 'Hard'] as const).map(d => (
            <button
              key={d}
              onClick={() => dispatch(setDifficultyFilter(d))}
              className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-all"
              style={
                difficultyFilter === d
                  ? {
                      background: d === 'All' ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)' : diffStyle[d as Difficulty]?.bg,
                      color: d === 'All' ? '#fff' : diffStyle[d as Difficulty]?.text,
                      border: `1px solid ${d === 'All' ? 'transparent' : diffStyle[d as Difficulty]?.text + '50'}`,
                    }
                  : { border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', backgroundColor: 'transparent' }
              }
            >
              {d}
            </button>
          ))}

          <div className="w-px" style={{ backgroundColor: 'var(--color-border)' }} />

          {/* Status */}
          {(['All', 'solved', 'attempted', 'unseen'] as const).map(s => (
            <button
              key={s}
              onClick={() => dispatch(setStatusFilter(s))}
              className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all capitalize"
              style={
                statusFilter === s
                  ? { background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }
                  : { border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', backgroundColor: 'transparent' }
              }
            >
              {s}
            </button>
          ))}

          <div className="w-px hidden sm:block" style={{ backgroundColor: 'var(--color-border)' }} />

          {/* Category dropdown */}
          <div className="relative">
            <Filter size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }} />
            <select
              value={categoryFilter}
              onChange={e => dispatch(setCategoryFilter(e.target.value))}
              className="input-field text-xs pl-7 py-1.5 appearance-none min-w-[140px]"
            >
              {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Tag dropdown */}
          <div className="relative">
            <Filter size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }} />
            <select
              value={tagFilter}
              onChange={e => dispatch(setTagFilter(e.target.value))}
              className="input-field text-xs pl-7 py-1.5 appearance-none min-w-[130px]"
            >
              {allTags.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          Showing {filtered.length} of {items.length} problems
        </p>
      </div>

      {/* Problem list */}
      {error && <ErrorBanner message={error} />}

      {filtered.length === 0 ? (
        <div className="card text-center py-16">
          <BarChart2 size={40} className="mx-auto mb-3" style={{ color: 'var(--color-text-secondary)' }} />
          <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>No problems found</p>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Try adjusting your filters or search query.
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          {/* Desktop table header */}
          <div
            className="hidden md:grid grid-cols-[40px_50px_1fr_110px_180px_120px_40px] gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wider"
            style={{
              color: 'var(--color-text-secondary)',
              backgroundColor: 'var(--color-bg-secondary)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <span>Status</span>
            <span>#</span>
            <span>Title</span>
            <span>Difficulty</span>
            <span>Categories</span>
            <span>Acceptance</span>
            <span />
          </div>

          {/* Rows */}
          <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {filtered.map(problem => {
              const state = userStates[problem.id]?.status ?? 'unseen'
              return (
                <div
                  key={problem.id}
                  onClick={() => openProblem(problem.id)}
                  className="group cursor-pointer hover:bg-blue-500/5 transition-colors"
                >
                  {/* Desktop row */}
                  <div className="hidden md:grid grid-cols-[40px_50px_1fr_110px_180px_120px_40px] gap-4 items-center px-5 py-4">
                    {/* Status */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={e => handleMark(problem.id, state === 'solved' ? 'unseen' : 'solved', e)}
                        title="Toggle solved"
                        className="hover:scale-110 transition-transform"
                      >
                        <StatusIcon status={state} />
                      </button>
                    </div>

                    {/* Number */}
                    <span className="text-sm font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                      {problem.number}
                    </span>

                    {/* Title */}
                    <div>
                      <span
                        className="text-sm font-semibold group-hover:text-blue-400 transition-colors"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {problem.title}
                      </span>
                    </div>

                    {/* Difficulty */}
                    <DiffBadge d={problem.difficulty} />

                    {/* Categories */}
                    <div className="flex flex-wrap gap-1">
                      {problem.categories.slice(0, 2).map(c => (
                        <span
                          key={c}
                          className="text-xs px-2 py-0.5 rounded-md font-mono"
                          style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}
                        >
                          {c}
                        </span>
                      ))}
                      {problem.categories.length > 2 && (
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                          +{problem.categories.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Acceptance */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
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
                      <span className="text-xs font-mono w-10 text-right" style={{ color: 'var(--color-text-secondary)' }}>
                        {problem.acceptance}%
                      </span>
                    </div>

                    {/* Arrow */}
                    <ChevronRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#3b82f6' }}
                    />
                  </div>

                  {/* Mobile card row */}
                  <div className="md:hidden flex items-start gap-3 px-4 py-4">
                    <button
                      onClick={e => handleMark(problem.id, state === 'solved' ? 'unseen' : 'solved', e)}
                      className="mt-0.5 shrink-0"
                    >
                      <StatusIcon status={state} />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs font-mono mr-2" style={{ color: 'var(--color-text-secondary)' }}>
                            #{problem.number}
                          </span>
                          <span
                            className="text-sm font-semibold"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            {problem.title}
                          </span>
                        </div>
                        <DiffBadge d={problem.difficulty} />
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {problem.categories.slice(0, 3).map(c => (
                          <span
                            key={c}
                            className="text-xs px-1.5 py-0.5 rounded font-mono"
                            style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}
                          >
                            {c}
                          </span>
                        ))}
                        <span className="text-xs ml-auto" style={{ color: 'var(--color-text-secondary)' }}>
                          {problem.acceptance}% acc.
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={15} className="shrink-0 mt-1" style={{ color: '#3b82f6' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
