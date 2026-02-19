import apiClient from '@/lib/api-client'

export interface Comment {
  id: number
  author: {
    id: number
    username: string
    avatar?: string
  }
  post: number
  content: string
  created_at: string
  updated_at: string
}

export interface CreateCommentRequest {
  content: string
}

export interface UpdateCommentRequest {
  content: string
}

export const commentService = {
  async getCommentsByPost(postId: number): Promise<Comment[]> {
    const response = await apiClient.get<Comment[]>(`/post/${postId}/comment/`)
    return response.data
  },

  async getCommentById(postId: number, commentId: number): Promise<Comment> {
    const response = await apiClient.get<Comment>(`/post/${postId}/comment/${commentId}/`)
    return response.data
  },

  async createComment(postId: number, data: CreateCommentRequest): Promise<Comment> {
    const response = await apiClient.post<Comment>(`/post/${postId}/comment/`, data)
    return response.data
  },

  async updateComment(postId: number, commentId: number, data: UpdateCommentRequest): Promise<Comment> {
    const response = await apiClient.put<Comment>(`/post/${postId}/comment/${commentId}/`, data)
    return response.data
  },

  async deleteComment(postId: number, commentId: number): Promise<void> {
    await apiClient.delete(`/post/${postId}/comment/${commentId}/`)
  },
}
