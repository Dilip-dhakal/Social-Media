import { create } from 'zustand'
import { authService } from '@/lib/services/auth.service'

export interface User {
  id: number
  username: string
  email: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  checkAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authService.login({ email, password })
      authService.storeTokens(response.access, response.refresh)
      set({
        isAuthenticated: true,
        user: response.user || null,
        isLoading: false,
      })
    } catch (error: any) {
      set({
        error: error.response?.data?.detail || 'Login failed',
        isLoading: false,
      })
      throw error
    }
  },

  register: async (username: string, email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authService.register({ username, email, password })
      authService.storeTokens(response.access, response.refresh)
      set({
        isAuthenticated: true,
        user: response.user || null,
        isLoading: false,
      })
    } catch (error: any) {
      set({
        error: error.response?.data?.detail || 'Registration failed',
        isLoading: false,
      })
      throw error
    }
  },

  logout: () => {
    authService.logout()
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    })
  },

  setUser: (user: User | null) => {
    set({ user })
  },

  checkAuth: () => {
    const tokens = authService.getStoredTokens()
    set({
      isAuthenticated: !!tokens.access,
    })
  },
}))
