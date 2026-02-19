'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MainLayout } from '@/components/layout/MainLayout'
import { PostCard } from '@/components/post/PostCard'
import { PostForm } from '@/components/post/PostForm'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorMessage } from '@/components/ErrorMessage'
import { postService, Post } from '@/lib/services/post.service'
import { useAuthStore } from '@/store/authStore'

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated, checkAuth } = useAuthStore()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    const fetchPosts = async () => {
      setIsLoading(true)
      setError('')
      try {
        const data = await postService.getAllPosts()
        setPosts(data)
      } catch (err: any) {
        setError('Failed to load posts. Please try again later.')
        console.error('Error fetching posts:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [isAuthenticated, router])

  const handleCreatePost = async (data: { title: string; content: string }) => {
    try {
      const newPost = await postService.createPost(data)
      setPosts([newPost, ...posts])
      setShowForm(false)
      setEditingPost(null)
    } catch (err: any) {
      console.error('Error creating post:', err)
      throw err
    }
  }

  const handleUpdatePost = async (data: { title: string; content: string }) => {
    if (!editingPost) return
    try {
      const updated = await postService.updatePost(editingPost.id, data)
      setPosts(posts.map((p) => (p.id === updated.id ? updated : p)))
      setShowForm(false)
      setEditingPost(null)
    } catch (err: any) {
      console.error('Error updating post:', err)
      throw err
    }
  }

  const handleDeletePost = async (postId: number) => {
    try {
      await postService.deletePost(postId)
      setPosts(posts.filter((p) => p.id !== postId))
    } catch (err: any) {
      console.error('Error deleting post:', err)
      throw err
    }
  }

  const handleLikePost = async (postId: number) => {
    try {
      const post = posts.find((p) => p.id === postId)
      if (!post) return

      if (post.is_liked) {
        await postService.unlikePost(postId)
      } else {
        await postService.likePost(postId)
      }

      const updated = await postService.getPostById(postId)
      setPosts(posts.map((p) => (p.id === postId ? updated : p)))
    } catch (err: any) {
      console.error('Error liking post:', err)
      throw err
    }
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setShowForm(true)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Your Feed</h1>
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditingPost(null)
            }}
            className="btn btn-primary"
          >
            {showForm ? 'Cancel' : 'New Post'}
          </button>
        </div>

        {showForm && (
          <PostForm
            initialPost={editingPost || undefined}
            onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
            onCancel={() => {
              setShowForm(false)
              setEditingPost(null)
            }}
          />
        )}

        {error && <ErrorMessage message={error} />}

        {isLoading ? (
          <LoadingSpinner />
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">No posts yet. Be the first to post!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLikePost}
                onDelete={handleDeletePost}
                onEdit={handleEditPost}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
