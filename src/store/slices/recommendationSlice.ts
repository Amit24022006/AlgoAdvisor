import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Algorithm {
  id: string
  name: string
  category: string
  timeComplexity: string
  spaceComplexity: string
  explanation: string
  javaCode: string
  tags: string[]
}

export interface RecommendationResult {
  algorithm: Algorithm
  alternatives: Algorithm[]
  confidence: number
  problemDescription: string
  timestamp: string
}

interface RecommendationState {
  current: RecommendationResult | null
  loading: boolean
  error: string | null
}

const initialState: RecommendationState = {
  current: null,
  loading: false,
  error: null,
}

const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState,
  reducers: {
    setRecommendationLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
      if (action.payload) state.error = null
    },
    setRecommendationResult: (state, action: PayloadAction<RecommendationResult>) => {
      state.current = action.payload
      state.loading = false
      state.error = null
    },
    setRecommendationError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    swapAlgorithm: (state, action: PayloadAction<Algorithm>) => {
      if (state.current) {
        const oldMain = state.current.algorithm
        const newAlts = state.current.alternatives.map(a =>
          a.id === action.payload.id ? oldMain : a
        )
        state.current.algorithm = action.payload
        state.current.alternatives = newAlts
      }
    },
    clearRecommendation: (state) => {
      state.current = null
      state.error = null
    },
  },
})

export const {
  setRecommendationLoading,
  setRecommendationResult,
  setRecommendationError,
  swapAlgorithm,
  clearRecommendation,
} = recommendationSlice.actions
export default recommendationSlice.reducer
