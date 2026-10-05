import axios from 'axios'
import { store } from '../store'
import { logout } from '../store/slices/authSlice'
import { addToast } from '../store/slices/uiSlice'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

// Request interceptor: attach JWT
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: handle 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout())
      store.dispatch(addToast({ type: 'error', message: 'Session expired. Please log in again.' }))
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
