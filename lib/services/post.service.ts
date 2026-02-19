import apiClient from '@/lib/api-client'

export interface Post {
  id: number
  author: {
    id: number
    username: string
    avatar?: string
  }
  title: string
  content: string
  likes_count?: number
  comments_count?: number
  is_liked?: boolean
  created_at: string
  updated_at: string
}

export interface CreatePostRequest {
  title: string
  content: string
}

export interface UpdatePostRequest {
  title?: string
  content?: string
}

export const postService = {
  async getAllPosts(): Promise<Post[]> {
    const response = await apiClient.get<Post[]>('/post/')
    return response.data
  },

  async getPostById(id: number): Promise<Post> {
    const response = await apiClient.get<Post>(`/post/${id}/`)
    return response.data
  },

  async createPost(data: CreatePostRequest): Promise<Post> {
    const response = await apiClient.post<Post>('/post/', data)
    return response.data
  },

  async updatePost(id: number, data: UpdatePostRequest): Promise<Post> {
    const response = await apiClient.put<Post>(`/post/${id}/`, data)
    return response.data
  },

  async deletePost(id: number): Promise<void> {
    await apiClient.delete(`/post/${id}/`)
  },

  async likePost(id: number): Promise<void> {
    await apiClient.post(`/post/${id}/like/`)
  },

  async unlikePost(id: number): Promise<void> {
    await apiClient.post(`/post/${id}/remove_like/`)
  },
}
