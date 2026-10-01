import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Algorithm } from './recommendationSlice'

interface FavoritesState {
  items: Algorithm[]
  loading: boolean
  error: string | null
}

const initialState: FavoritesState = {
  items: [],
  loading: false,
  error: null,
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavoritesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setFavoritesItems: (state, action: PayloadAction<Algorithm[]>) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    addFavorite: (state, action: PayloadAction<Algorithm>) => {
      if (!state.items.find(i => i.id === action.payload.id)) {
        state.items.push(action.payload)
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    setFavoritesError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const {
  setFavoritesLoading,
  setFavoritesItems,
  addFavorite,
  removeFavorite,
  setFavoritesError,
} = favoritesSlice.actions
export default favoritesSlice.reducer
