import api from './axiosInstance'
import type { HistoryItem } from '../store/slices/historySlice'

export const getHistory = () =>
  api.get<HistoryItem[]>('/api/history')

export const saveToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) =>
  api.post<HistoryItem>('/api/history', item)

export const deleteHistoryItem = (id: string) =>
  api.delete(`/api/history/${id}`)
