import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setSearchQuery, setCategoryFilter } from '../store/slices/historySlice'
import { setRecommendationResult } from '../store/slices/recommendationSlice'
import { History, Search, Filter, ChevronRight, Clock, Database } from 'lucide-react'

export default function HistoryPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { items, searchQuery, categoryFilter } = useAppSelector(s => s.history)

  const categories = useMemo(() =>
    ['all', ...Array.from(new Set(items.map(i => i.category)))],
    [items]
  )

  const filtered = useMemo(() => items.filter(item => {
    const matchSearch = !searchQuery ||
      item.problemDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.algorithmName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCat = categoryFilter === 'all' || item.category === categoryFilter
    return matchSearch && matchCat
  }), [items, searchQuery, categoryFilter])

  const handleRowClick = (item: typeof items[0]) => {
    if (item.result) {
      dispatch(setRecommendationResult(item.result))
      navigate('/recommend')
    }
  }

  const formatDate = (ts: string) => new Date(ts).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
          <History size={28} style={{ color: '#10b981' }} /> Problem History
        </h1>
        <p className="mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          All your past problem analyses — click any row to re-open.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }} />
          <input
            type="text"
            placeholder="Search problems or algorithms..."
            value={searchQuery}
            onChange={e => dispatch(setSearchQuery(e.target.value))}
            className="input-field pl-9"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }} />
          <select
            value={categoryFilter}
            onChange={e => dispatch(setCategoryFilter(e.target.value))}
            className="input-field pl-9 pr-8 appearance-none min-w-[160px]"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Count */}
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        Showing {filtered.length} of {items.length} results
      </p>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="card text-center py-16">
          <History size={40} className="mx-auto mb-3" style={{ color: 'var(--color-text-secondary)' }} />
          <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>No history found</p>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            {items.length === 0 ? 'Start recommending algorithms to build your history.' : 'Try adjusting your search or filter.'}
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
                  {['Problem Description', 'Algorithm', 'Category', 'Time', 'Space', 'Date', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--color-text-secondary)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, idx) => (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item)}
                    className="cursor-pointer hover:bg-blue-500/5 transition-colors"
                    style={{ borderBottom: idx < filtered.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                  >
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
                        {item.problemDescription}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold whitespace-nowrap" style={{ color: '#3b82f6' }}>
                      {item.algorithmName}
                    </td>
                    <td className="px-4 py-3">
                      <span className="badge text-xs" style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>
                      <Clock size={11} className="inline mr-1" />{item.timeComplexity}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>
                      <Database size={11} className="inline mr-1" />{item.spaceComplexity}
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>
                      {formatDate(item.timestamp)}
                    </td>
                    <td className="px-4 py-3">
                      {item.result && <ChevronRight size={16} style={{ color: '#3b82f6' }} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {filtered.map(item => (
              <div
                key={item.id}
                className="p-4 hover:bg-blue-500/5 transition-colors cursor-pointer"
                onClick={() => handleRowClick(item)}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {item.problemDescription}
                  </p>
                  {item.result && <ChevronRight size={16} className="shrink-0 mt-0.5" style={{ color: '#3b82f6' }} />}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-semibold text-sm" style={{ color: '#3b82f6' }}>{item.algorithmName}</span>
                  <span className="badge text-xs" style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                  <span>{item.timeComplexity}</span>
                  <span>{item.spaceComplexity}</span>
                  <span>{formatDate(item.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
