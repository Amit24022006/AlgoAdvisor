import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface HistoryItem {
  id: string
  problemDescription: string
  algorithmName: string
  category: string
  timeComplexity: string
  spaceComplexity: string
  timestamp: string
  result: any
}

interface HistoryState {
  items: HistoryItem[]
  loading: boolean
  error: string | null
  searchQuery: string
  categoryFilter: string
}

const initialState: HistoryState = {
  items: [],
  loading: false,
  error: null,
  searchQuery: '',
  categoryFilter: 'all',
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistoryLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setHistoryItems: (state, action: PayloadAction<HistoryItem[]>) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    addHistoryItem: (state, action: PayloadAction<HistoryItem>) => {
      state.items.unshift(action.payload)
    },
    setHistoryError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload
    },
  },
})

export const {
  setHistoryLoading,
  setHistoryItems,
  addHistoryItem,
  setHistoryError,
  setSearchQuery,
  setCategoryFilter,
} = historySlice.actions
export default historySlice.reducer
