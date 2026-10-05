import api from './axiosInstance'
import type { RoadmapCategory } from '../store/slices/roadmapSlice'

export const getRoadmap = () =>
  api.get<RoadmapCategory[]>('/api/roadmap')

export const markTopicComplete = (categoryId: string, topicId: string, completed: boolean) =>
  api.patch(`/api/roadmap/${categoryId}/topics/${topicId}`, { completed })
