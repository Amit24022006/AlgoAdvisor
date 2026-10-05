import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { removeFavorite } from '../store/slices/favoritesSlice'
import { addToast } from '../store/slices/uiSlice'
import AlgorithmCard from '../components/ui/AlgorithmCard'
import CodeBlock from '../components/ui/CodeBlock'
import type { Algorithm } from '../store/slices/recommendationSlice'
import { Heart, X, Clock, Database, Tag, ArrowLeft } from 'lucide-react'

export default function FavoritesPage() {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(s => s.favorites)
  const [selected, setSelected] = useState<Algorithm | null>(null)

  const handleRemove = (id: string, name: string) => {
    dispatch(removeFavorite(id))
    dispatch(addToast({ type: 'info', message: `Removed "${name}" from favorites` }))
    if (selected?.id === id) setSelected(null)
  }

  if (selected) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Favorites
        </button>

        <div className="card space-y-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-extrabold" style={{ color: 'var(--color-text-primary)' }}>
                  {selected.name}
                </h2>
                <span className="badge" style={{ backgroundColor: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>
                  <Tag size={11} className="mr-1" /> {selected.category}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} style={{ color: '#3b82f6' }} />
                  Time: <strong style={{ color: 'var(--color-text-primary)' }}>{selected.timeComplexity}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Database size={14} style={{ color: '#8b5cf6' }} />
                  Space: <strong style={{ color: 'var(--color-text-primary)' }}>{selected.spaceComplexity}</strong>
                </span>
              </div>
            </div>
            <button
              onClick={() => handleRemove(selected.id, selected.name)}
              className="btn-secondary border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              <X size={15} /> Remove Favorite
            </button>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Explanation
            </h3>
            <p style={{ color: 'var(--color-text-primary)', lineHeight: '1.7' }}>{selected.explanation}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Java Implementation
            </h3>
            <CodeBlock
              code={selected.javaCode}
              language="java"
              filename={`${selected.name.replace(/\s+/g, '')}.java`}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
          <Heart size={28} style={{ color: '#ec4899' }} /> Saved Favorites
        </h1>
        <p className="mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          Your saved algorithms — click any card to view full details.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="card text-center py-20">
          <Heart size={48} className="mx-auto mb-4" style={{ color: 'var(--color-text-secondary)' }} />
          <p className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            No favorites yet
          </p>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            Save algorithms from recommendations to access them here.
          </p>
          <Link to="/recommend" className="btn-primary">
            Get Your First Recommendation
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {items.length} saved algorithm{items.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map(algo => (
              <div key={algo.id} className="relative">
                <AlgorithmCard
                  algorithm={algo}
                  onSelect={setSelected}
                  onFavorite={(a) => handleRemove(a.id, a.name)}
                  isFavorited={true}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
