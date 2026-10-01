import { Heart, Clock, Database, Tag, ArrowRight } from 'lucide-react'
import type { Algorithm } from '../../store/slices/recommendationSlice'

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Sorting': { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6' },
  'Searching': { bg: 'rgba(34,197,94,0.15)', text: '#22c55e' },
  'Graph': { bg: 'rgba(168,85,247,0.15)', text: '#a855f7' },
  'Dynamic Programming': { bg: 'rgba(234,179,8,0.15)', text: '#eab308' },
  'Tree': { bg: 'rgba(249,115,22,0.15)', text: '#f97316' },
  'Greedy': { bg: 'rgba(236,72,153,0.15)', text: '#ec4899' },
  'Divide & Conquer': { bg: 'rgba(20,184,166,0.15)', text: '#14b8a6' },
  'Backtracking': { bg: 'rgba(239,68,68,0.15)', text: '#ef4444' },
  default: { bg: 'rgba(100,116,139,0.15)', text: '#64748b' },
}

interface AlgorithmCardProps {
  algorithm: Algorithm
  onFavorite?: (algo: Algorithm) => void
  onSelect?: (algo: Algorithm) => void
  isFavorited?: boolean
  isSelected?: boolean
  showFavorite?: boolean
  compact?: boolean
}

export default function AlgorithmCard({
  algorithm,
  onFavorite,
  onSelect,
  isFavorited = false,
  isSelected = false,
  showFavorite = true,
  compact = false,
}: AlgorithmCardProps) {
  const col = categoryColors[algorithm.category] || categoryColors.default

  return (
    <div
      className={`card cursor-pointer group relative ${isSelected ? 'border-blue-500 shadow-blue-500/20' : ''}`}
      style={isSelected ? { borderColor: '#3b82f6', boxShadow: '0 0 0 1px #3b82f650' } : {}}
      onClick={() => onSelect?.(algorithm)}
    >
      {/* Category badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <span
          className="badge text-xs"
          style={{ backgroundColor: col.bg, color: col.text }}
        >
          <Tag size={10} className="mr-1" />
          {algorithm.category}
        </span>
        {showFavorite && (
          <button
            onClick={e => { e.stopPropagation(); onFavorite?.(algorithm) }}
            className="shrink-0 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              size={15}
              className="transition-colors"
              style={{ color: isFavorited ? '#ef4444' : 'var(--color-text-secondary)', fill: isFavorited ? '#ef4444' : 'none' }}
            />
          </button>
        )}
      </div>

      {/* Name */}
      <h3 className="font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
        {algorithm.name}
      </h3>

      {/* Complexities */}
      {!compact && (
        <div className="flex items-center gap-3 mt-2 mb-3 text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>
          <span className="flex items-center gap-1">
            <Clock size={11} /> {algorithm.timeComplexity}
          </span>
          <span className="flex items-center gap-1">
            <Database size={11} /> {algorithm.spaceComplexity}
          </span>
        </div>
      )}

      {/* Tags */}
      {algorithm.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {algorithm.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-md font-mono"
              style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Hover arrow */}
      {onSelect && (
        <div
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: '#3b82f6' }}
        >
          <ArrowRight size={16} />
        </div>
      )}
    </div>
  )
}
