import api from './axiosInstance'
import type { RecommendationResult } from '../store/slices/recommendationSlice'

export interface RecommendRequest {
  problemDescription: string
  inputSize?: string
  timeLimit?: string
  additionalConstraints?: string
}

export const getRecommendation = (data: RecommendRequest) =>
  api.post<RecommendationResult>('/api/recommend', data)
