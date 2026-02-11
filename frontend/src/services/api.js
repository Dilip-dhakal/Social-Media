import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refresh_token = localStorage.getItem('refresh_token')
        const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
          refresh: refresh_token
        })
        const { access } = response.data
        localStorage.setItem('access_token', access)
        api.defaults.headers.common['Authorization'] = `Bearer ${access}`
        return api(originalRequest)
      } catch (err) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export const authService = {
  register: (data) => api.post('/auth/register/', data),
  login: (email, password) => api.post('/auth/login/', { email, password }),
}

export const postService = {
  getPosts: () => api.get('/post/'),
  createPost: (data) => api.post('/post/', data),
  updatePost: (id, data) => api.put(`/post/${id}/`, data),
  deletePost: (id) => api.delete(`/post/${id}/`),
  likePost: (id) => api.post(`/post/${id}/like/`),
  unlikePost: (id) => api.post(`/post/${id}/remove_like/`),
}

export const commentService = {
  getComments: (postId) => api.get(`/post/${postId}/comment/`),
  createComment: (postId, data) => api.post(`/post/${postId}/comment/`, data),
  updateComment: (postId, commentId, data) => api.put(`/post/${postId}/comment/${commentId}/`, data),
  deleteComment: (postId, commentId) => api.delete(`/post/${postId}/comment/${commentId}/`),
}

export const userService = {
  getUsers: () => api.get('/user/'),
  getUser: (id) => api.get(`/user/${id}/`),
  updateUser: (id, data) => api.patch(`/user/${id}/`, data),
}

export default api
