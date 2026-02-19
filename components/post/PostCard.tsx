'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Post } from '@/lib/services/post.service'
import { useAuthStore } from '@/store/authStore'

interface PostCardProps {
  post: Post
  onLike?: (postId: number) => Promise<void>
  onDelete?: (postId: number) => Promise<void>
  onEdit?: (post: Post) => void
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onDelete,
  onEdit,
}) => {
  const { user } = useAuthStore()
  const [isLiking, setIsLiking] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [liked, setLiked] = useState(post.is_liked || false)
  const [likesCount, setLikesCount] = useState(post.likes_count || 0)

  const handleLike = async () => {
    if (!onLike) return
    setIsLiking(true)
    try {
      await onLike(post.id)
      setLiked(!liked)
      setLikesCount(liked ? likesCount - 1 : likesCount + 1)
    } catch (error) {
      console.error('Error liking post:', error)
    } finally {
      setIsLiking(false)
    }
  }

  const handleDelete = async () => {
    if (!onDelete || !confirm('Are you sure you want to delete this post?')) return
    setIsDeleting(true)
    try {
      await onDelete(post.id)
    } catch (error) {
      console.error('Error deleting post:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const isAuthor = user?.id === post.author.id

  return (
    <article className="card p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {post.author.avatar && (
            <img
              src={post.author.avatar}
              alt={post.author.username}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <Link
              href={`/profile/${post.author.id}`}
              className="font-semibold text-primary hover:text-accent transition"
            >
              {post.author.username}
            </Link>
            <p className="text-xs text-secondary">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {isAuthor && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit?.(post)}
              className="text-secondary hover:text-primary text-sm transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-700 text-sm transition disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <Link href={`/post/${post.id}`}>
        <h3 className="text-xl font-semibold text-primary hover:text-accent transition mb-2">
          {post.title}
        </h3>
      </Link>

      <p className="text-primary mb-4 leading-relaxed line-clamp-3">
        {post.content}
      </p>

      <div className="flex items-center gap-6 pt-4 border-t border-border-color">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center gap-2 transition ${
            liked ? 'text-red-500' : 'text-secondary hover:text-primary'
          } disabled:opacity-50`}
        >
          <svg className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-sm">{likesCount}</span>
        </button>

        <Link href={`/post/${post.id}`} className="flex items-center gap-2 text-secondary hover:text-primary transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <span className="text-sm">{post.comments_count || 0}</span>
        </Link>
      </div>
    </article>
  )
}
