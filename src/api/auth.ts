import api from './axiosInstance'

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export const registerUser = (data: RegisterData) =>
  api.post('/api/auth/register', data)

export const loginUser = (data: LoginData) =>
  api.post<{ token: string; user: { id: string; name: string; email: string } }>('/api/auth/login', data)

export const updateProfile = (data: { name?: string; email?: string; password?: string }) =>
  api.put('/api/auth/profile', data)

export const getProfile = () =>
  api.get<{ id: string; name: string; email: string }>('/api/auth/profile')
