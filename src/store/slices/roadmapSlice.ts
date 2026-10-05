import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface RoadmapTopic {
  id: string
  name: string
  category: string
  description: string
  completed: boolean
  suggested: boolean
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface RoadmapCategory {
  id: string
  name: string
  icon: string
  topics: RoadmapTopic[]
}

interface RoadmapState {
  categories: RoadmapCategory[]
  loading: boolean
  error: string | null
}

const initialState: RoadmapState = {
  categories: [],
  loading: false,
  error: null,
}

const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState,
  reducers: {
    setRoadmapLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setRoadmapCategories: (state, action: PayloadAction<RoadmapCategory[]>) => {
      state.categories = action.payload
      state.loading = false
      state.error = null
    },
    toggleTopicCompleted: (state, action: PayloadAction<{ categoryId: string; topicId: string }>) => {
      const cat = state.categories.find(c => c.id === action.payload.categoryId)
      if (cat) {
        const topic = cat.topics.find(t => t.id === action.payload.topicId)
        if (topic) topic.completed = !topic.completed
      }
    },
    setRoadmapError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const {
  setRoadmapLoading,
  setRoadmapCategories,
  toggleTopicCompleted,
  setRoadmapError,
} = roadmapSlice.actions
export default roadmapSlice.reducer
