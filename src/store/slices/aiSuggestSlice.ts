import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ApproachStep {
  step: number
  text: string
}

export interface AISuggestion {
  algorithmName: string
  category: string
  reasoning: string
  steps: ApproachStep[]
  timeComplexity: string
  spaceComplexity: string
  codeSnippet?: string // only shown when user toggles "Show code"
  confidence: number
}

interface AISuggestState {
  result: AISuggestion | null
  loading: boolean
  error: string | null
  showCode: boolean
  questionText: string
}

const initialState: AISuggestState = {
  result: null,
  loading: false,
  error: null,
  showCode: false,
  questionText: '',
}

const aiSuggestSlice = createSlice({
  name: 'aiSuggest',
  initialState,
  reducers: {
    setAISuggestLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
      if (action.payload) state.error = null
    },
    setAISuggestResult: (state, action: PayloadAction<AISuggestion>) => {
      state.result = action.payload
      state.loading = false
      state.error = null
    },
    setAISuggestError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    setAISuggestQuestion: (state, action: PayloadAction<string>) => {
      state.questionText = action.payload
    },
    toggleShowCode: (state) => {
      state.showCode = !state.showCode
    },
    clearAISuggest: (state) => {
      state.result = null
      state.error = null
      state.showCode = false
      state.questionText = ''
    },
  },
})

export const {
  setAISuggestLoading,
  setAISuggestResult,
  setAISuggestError,
  setAISuggestQuestion,
  toggleShowCode,
  clearAISuggest,
} = aiSuggestSlice.actions

export default aiSuggestSlice.reducer
