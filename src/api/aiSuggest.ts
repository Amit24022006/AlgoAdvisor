import api from './axiosInstance'
import type { AISuggestion } from '../store/slices/aiSuggestSlice'

export const getAISuggestion = (questionText: string) =>
  api.post<AISuggestion>('/api/ai-suggest', { questionText })
