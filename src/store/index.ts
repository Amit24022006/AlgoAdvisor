import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import recommendationReducer from './slices/recommendationSlice'
import historyReducer from './slices/historySlice'
import favoritesReducer from './slices/favoritesSlice'
import roadmapReducer from './slices/roadmapSlice'
import uiReducer from './slices/uiSlice'
import problemsReducer from './slices/problemsSlice'
import aiSuggestReducer from './slices/aiSuggestSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recommendation: recommendationReducer,
    history: historyReducer,
    favorites: favoritesReducer,
    roadmap: roadmapReducer,
    ui: uiReducer,
    problems: problemsReducer,
    aiSuggest: aiSuggestReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
