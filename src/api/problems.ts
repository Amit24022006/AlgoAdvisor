import api from './axiosInstance'
import type { Problem } from '../store/slices/problemsSlice'

export const getProblems = () =>
  api.get<Problem[]>('/api/problems')

export const getProblemById = (id: string) =>
  api.get<Problem>(`/api/problems/${id}`)
