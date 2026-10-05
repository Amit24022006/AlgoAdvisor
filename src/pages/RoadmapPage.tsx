import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setRoadmapCategories, toggleTopicCompleted } from '../store/slices/roadmapSlice'
import { MOCK_ROADMAP } from '../utils/mockData'
import { addToast } from '../store/slices/uiSlice'
import { Map, CheckCircle2, Circle, Lightbulb, TrendingUp } from 'lucide-react'

const difficultyColor = {
  beginner: { bg: 'rgba(34,197,94,0.1)', text: '#22c55e' },
  intermediate: { bg: 'rgba(234,179,8,0.1)', text: '#eab308' },
  advanced: { bg: 'rgba(239,68,68,0.1)', text: '#ef4444' },
}

export default function RoadmapPage() {
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector(s => s.roadmap)

  useEffect(() => {
    if (categories.length === 0) dispatch(setRoadmapCategories(MOCK_ROADMAP))
  }, [])

  const totalTopics = categories.reduce((sum, c) => sum + c.topics.length, 0)
  const completedTopics = categories.reduce((sum, c) => sum + c.topics.filter(t => t.completed).length, 0)
  const percent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0

  const suggestedTopics = categories.flatMap(c =>
    c.topics.filter(t => t.suggested && !t.completed)
  )

  const handleToggle = (categoryId: string, topicId: string, completed: boolean, name: string) => {
    dispatch(toggleTopicCompleted({ categoryId, topicId }))
    dispatch(addToast({
      type: completed ? 'info' : 'success',
      message: completed ? `Marked "${name}" as incomplete` : `Completed "${name}"! 🎉`,
    }))
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
          <Map size={28} style={{ color: '#f97316' }} /> Learning Roadmap
        </h1>
        <p className="mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          Track your progress across algorithm categories.
        </p>
      </div>

      {/* Overall progress */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} style={{ color: '#f97316' }} />
            <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Overall Progress</span>
          </div>
          <span className="text-2xl font-extrabold gradient-text">{percent}%</span>
        </div>
        <div className="h-3 rounded-full mb-2" style={{ backgroundColor: 'var(--color-border)' }}>
          <div
            className="h-3 rounded-full gradient-bg transition-all duration-700"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {completedTopics} of {totalTopics} topics completed
        </p>
      </div>

      {/* Suggested next topics */}
      {suggestedTopics.length > 0 && (
        <div className="card" style={{ border: '1px solid rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.04)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={18} style={{ color: '#3b82f6' }} />
            <h3 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Suggested Next Topics</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedTopics.map(t => (
              <span
                key={t.id}
                className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
                style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.2)' }}
              >
                ✨ {t.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-6">
        {categories.map(cat => {
          const catCompleted = cat.topics.filter(t => t.completed).length
          const catPercent = Math.round((catCompleted / cat.topics.length) * 100)

          return (
            <div key={cat.id} className="card">
              {/* Category header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <h3 className="font-bold" style={{ color: 'var(--color-text-primary)' }}>{cat.name}</h3>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      {catCompleted}/{cat.topics.length} completed
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
                    <div
                      className="h-2 rounded-full gradient-bg transition-all duration-500"
                      style={{ width: `${catPercent}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold gradient-text">{catPercent}%</span>
                </div>
              </div>

              {/* Topics checklist */}
              <div className="space-y-2">
                {cat.topics.map(topic => {
                  const diff = difficultyColor[topic.difficulty]
                  return (
                    <div
                      key={topic.id}
                      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-blue-500/5 transition-colors"
                      style={{ border: '1px solid var(--color-border)' }}
                      onClick={() => handleToggle(cat.id, topic.id, topic.completed, topic.name)}
                    >
                      {topic.completed ? (
                        <CheckCircle2 size={20} className="shrink-0" style={{ color: '#22c55e' }} />
                      ) : (
                        <Circle size={20} className="shrink-0" style={{ color: 'var(--color-text-secondary)' }} />
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="font-medium text-sm"
                            style={{
                              color: topic.completed ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
                              textDecoration: topic.completed ? 'line-through' : 'none',
                            }}
                          >
                            {topic.name}
                          </span>
                          {topic.suggested && !topic.completed && (
                            <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
                              Suggested
                            </span>
                          )}
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                          {topic.description}
                        </p>
                      </div>

                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
                        style={{ backgroundColor: diff.bg, color: diff.text }}
                      >
                        {topic.difficulty}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
