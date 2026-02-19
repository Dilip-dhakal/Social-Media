import apiClient from '@/lib/api-client'

export interface User {
  id: number
  username: string
  email: string
  bio?: string
  avatar?: string
  created_at?: string
  updated_at?: string
}

export interface UpdateUserRequest {
  username?: string
  email?: string
  bio?: string
  avatar?: string
}

export const userService = {
  async getAllUsers(): Promise<User[]> {
    const response = await apiClient.get<User[]>('/user/')
    return response.data
  },

  async getUserById(id: number): Promise<User> {
    const response = await apiClient.get<User>(`/user/${id}/`)
    return response.data
  },

  async updateUser(id: number, data: UpdateUserRequest): Promise<User> {
    const response = await apiClient.patch<User>(`/user/${id}/`, data)
    return response.data
  },

  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>('/auth/user/')
    return response.data
  },
}
