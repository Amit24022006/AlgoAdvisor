import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const token = localStorage.getItem('algo_token')
const userStr = localStorage.getItem('algo_user')

const initialState: AuthState = {
  user: userStr ? JSON.parse(userStr) : null,
  token: token,
  isAuthenticated: !!token,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
      localStorage.setItem('algo_token', action.payload.token)
      localStorage.setItem('algo_user', JSON.stringify(action.payload.user))
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('algo_token')
      localStorage.removeItem('algo_user')
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        localStorage.setItem('algo_user', JSON.stringify(state.user))
      }
    },
  },
})

export const { setCredentials, logout, setAuthLoading, setAuthError, updateUser } = authSlice.actions
export default authSlice.reducer
