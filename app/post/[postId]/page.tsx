'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/MainLayout'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorMessage } from '@/components/ErrorMessage'
import { CommentCard } from '@/components/comment/CommentCard'
import { CommentForm } from '@/components/comment/CommentForm'
import { Post, postService } from '@/lib/services/post.service'
import { Comment, commentService } from '@/lib/services/comment.service'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/Button'

export default function PostDetailPage() {
  const router = useRouter()
  const params = useParams()
  const postId = Number(params.postId)
  const { isAuthenticated, checkAuth, user: currentUser } = useAuthStore()

  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCommentLoading, setIsCommentLoading] = useState(false)
  const [error, setError] = useState('')
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    const fetchPostData = async () => {
      setIsLoading(true)
      setError('')
      try {
        const postData = await postService.getPostById(postId)
        setPost(postData)
        setLiked(postData.is_liked || false)
        setLikesCount(postData.likes_count || 0)

        const commentsData = await commentService.getCommentsByPost(postId)
        setComments(commentsData)
      } catch (err: any) {
        setError('Failed to load post.')
        console.error('Error fetching post:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPostData()
  }, [postId, isAuthenticated, router])

  const handleLikePost = async () => {
    if (!post) return
    try {
      if (liked) {
        await postService.unlikePost(post.id)
      } else {
        await postService.likePost(post.id)
      }
      setLiked(!liked)
      setLikesCount(liked ? likesCount - 1 : likesCount + 1)
    } catch (err: any) {
      console.error('Error liking post:', err)
    }
  }

  const handleAddComment = async (content: string) => {
    if (!post) return
    setIsCommentLoading(true)
    try {
      const newComment = await commentService.createComment(post.id, { content })
      setComments([...comments, newComment])
    } catch (err: any) {
      console.error('Error adding comment:', err)
      throw err
    } finally {
      setIsCommentLoading(false)
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    if (!post) return
    try {
      await commentService.deleteComment(post.id, commentId)
      setComments(comments.filter((c) => c.id !== commentId))
    } catch (err: any) {
      console.error('Error deleting comment:', err)
      throw err
    }
  }

  const handleDeletePost = async () => {
    if (!post || !confirm('Delete this post?')) return
    try {
      await postService.deletePost(post.id)
      router.push('/')
    } catch (err: any) {
      console.error('Error deleting post:', err)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingSpinner />
      </MainLayout>
    )
  }

  if (error || !post) {
    return (
      <MainLayout>
        <ErrorMessage message={error || 'Post not found'} />
        <Link href="/" className="text-accent hover:underline">
          Back to feed
        </Link>
      </MainLayout>
    )
  }

  const isAuthor = currentUser?.id === post.author.id

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        {/* Post */}
        <article className="card p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {post.author.avatar && (
                <img
                  src={post.author.avatar}
                  alt={post.author.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <Link
                  href={`/profile/${post.author.id}`}
                  className="font-semibold text-primary hover:text-accent transition block"
                >
                  {post.author.username}
                </Link>
                <p className="text-sm text-secondary">
                  {new Date(post.created_at).toLocaleDateString()} at{' '}
                  {new Date(post.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            {isAuthor && (
              <button
                onClick={handleDeletePost}
                className="text-red-600 hover:text-red-700 font-medium transition"
              >
                Delete
              </button>
            )}
          </div>

          <h1 className="text-3xl font-bold text-primary mb-4">{post.title}</h1>

          <p className="text-primary text-lg leading-relaxed mb-6 whitespace-pre-wrap">
            {post.content}
          </p>

          <div className="flex items-center gap-8 pt-6 border-t border-border-color">
            <button
              onClick={handleLikePost}
              className={`flex items-center gap-2 transition ${
                liked ? 'text-red-500' : 'text-secondary hover:text-primary'
              }`}
            >
              <svg
                className="w-6 h-6"
                fill={liked ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="font-semibold">{likesCount}</span>
            </button>

            <div className="flex items-center gap-2 text-secondary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              <span className="font-semibold">{comments.length}</span>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">Comments</h2>

          <CommentForm onSubmit={handleAddComment} isLoading={isCommentLoading} />

          {comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-secondary">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onDelete={
                    currentUser?.id === comment.author.id ? handleDeleteComment : undefined
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
