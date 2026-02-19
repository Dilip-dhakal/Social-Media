'use client'

import Link from 'next/link'
import { Comment } from '@/lib/services/comment.service'
import { useAuthStore } from '@/store/authStore'

interface CommentCardProps {
  comment: Comment
  onDelete?: (commentId: number) => Promise<void>
  onEdit?: (comment: Comment) => void
}

export const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  onDelete,
  onEdit,
}) => {
  const { user } = useAuthStore()
  const isAuthor = user?.id === comment.author.id

  const handleDelete = async () => {
    if (!onDelete || !confirm('Delete this comment?')) return
    try {
      await onDelete(comment.id)
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  return (
    <div className="p-4 bg-light-bg rounded-lg mb-3">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {comment.author.avatar && (
            <img
              src={comment.author.avatar}
              alt={comment.author.username}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <div>
            <Link
              href={`/profile/${comment.author.id}`}
              className="font-semibold text-primary hover:text-accent transition text-sm"
            >
              {comment.author.username}
            </Link>
            <p className="text-xs text-secondary">
              {new Date(comment.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {isAuthor && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit?.(comment)}
              className="text-secondary hover:text-primary text-xs transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 text-xs transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <p className="text-primary text-sm">{comment.content}</p>
    </div>
  )
}
