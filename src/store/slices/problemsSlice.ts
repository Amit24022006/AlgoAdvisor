import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export type ProblemStatus = 'solved' | 'attempted' | 'unseen'

export interface ProblemExample {
  input: string
  output: string
  explanation?: string
}

export interface Problem {
  id: string
  number: number
  title: string
  difficulty: Difficulty
  categories: string[]
  tags: string[]
  acceptance: number // percentage
  description: string
  constraints: string[]
  examples: ProblemExample[]
  hints?: string[]
  relatedAlgorithm?: string // pre-fill for AlgoAdvisor
}

export interface ProblemUserState {
  status: ProblemStatus
  solvedAt?: string
  attemptedAt?: string
  notes?: string
}

interface ProblemsState {
  items: Problem[]
  userStates: Record<string, ProblemUserState>
  loading: boolean
  error: string | null
  // filters
  searchQuery: string
  difficultyFilter: Difficulty | 'All'
  categoryFilter: string
  tagFilter: string
  statusFilter: ProblemStatus | 'All'
  // selected
  selectedProblemId: string | null
}

const initialState: ProblemsState = {
  items: [],
  userStates: (() => {
    try { return JSON.parse(localStorage.getItem('algo_problem_states') || '{}') } catch { return {} }
  })(),
  loading: false,
  error: null,
  searchQuery: '',
  difficultyFilter: 'All',
  categoryFilter: 'All',
  tagFilter: 'All',
  statusFilter: 'All',
  selectedProblemId: null,
}

const problemsSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {
    setProblemsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setProblems: (state, action: PayloadAction<Problem[]>) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    setProblemsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    setProblemStatus: (
      state,
      action: PayloadAction<{ problemId: string; status: ProblemStatus }>
    ) => {
      const { problemId, status } = action.payload
      const now = new Date().toISOString()
      state.userStates[problemId] = {
        status,
        ...(status === 'solved' ? { solvedAt: now } : {}),
        ...(status === 'attempted' ? { attemptedAt: now } : {}),
      }
      localStorage.setItem('algo_problem_states', JSON.stringify(state.userStates))
    },
    setSelectedProblem: (state, action: PayloadAction<string | null>) => {
      state.selectedProblemId = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setDifficultyFilter: (state, action: PayloadAction<Difficulty | 'All'>) => {
      state.difficultyFilter = action.payload
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload
    },
    setTagFilter: (state, action: PayloadAction<string>) => {
      state.tagFilter = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<ProblemStatus | 'All'>) => {
      state.statusFilter = action.payload
    },
  },
})

export const {
  setProblemsLoading,
  setProblems,
  setProblemsError,
  setProblemStatus,
  setSelectedProblem,
  setSearchQuery,
  setDifficultyFilter,
  setCategoryFilter,
  setTagFilter,
  setStatusFilter,
} = problemsSlice.actions

export default problemsSlice.reducer
