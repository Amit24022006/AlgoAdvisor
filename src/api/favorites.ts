import api from './axiosInstance'
import type { Algorithm } from '../store/slices/recommendationSlice'

export const getFavorites = () =>
  api.get<Algorithm[]>('/api/favorites')

export const addToFavorites = (algorithm: Algorithm) =>
  api.post<Algorithm>('/api/favorites', algorithm)

export const removeFromFavorites = (id: string) =>
  api.delete(`/api/favorites/${id}`)
