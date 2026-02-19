import apiClient from '@/lib/api-client'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  access: string
  refresh: string
  user?: {
    id: number
    username: string
    email: string
  }
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login/', data)
    return response.data
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register/', data)
    return response.data
  },

  async refresh(refreshToken: string): Promise<{ access: string }> {
    const response = await apiClient.post<{ access: string }>('/auth/refresh/', {
      refresh: refreshToken,
    })
    return response.data
  },

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  },

  getStoredTokens() {
    return {
      access: localStorage.getItem('access_token'),
      refresh: localStorage.getItem('refresh_token'),
    }
  },

  storeTokens(access: string, refresh: string) {
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
  },
}
