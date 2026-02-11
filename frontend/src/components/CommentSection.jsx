import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { commentService } from '../services/api'
import './CommentSection.css'

const CommentSection = ({ postId, onClose }) => {
  const { user } = useAuth()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    try {
      setLoading(true)
      const response = await commentService.getComments(postId)
      setComments(response.data)
      setError('')
    } catch (err) {
      console.error('Error fetching comments:', err)
      setError('Failed to load comments')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!newComment.trim()) {
      setError('Comment cannot be empty')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const response = await commentService.createComment(postId, { body: newComment })
      setComments([response.data, ...comments])
      setNewComment('')
    } catch (err) {
      console.error('Error creating comment:', err)
      setError(err.response?.data?.body?.[0] || 'Failed to post comment')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return

    try {
      await commentService.deleteComment(postId, commentId)
      setComments(comments.filter(c => c.id !== commentId))
    } catch (err) {
      console.error('Error deleting comment:', err)
      setError('Failed to delete comment')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="comment-section">
      <div className="comment-input-area">
        <div className="comment-author">
          <div className="comment-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.username} />
            ) : (
              <span>{user.username.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <span className="comment-username">@{user.username}</span>
        </div>

        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            className="comment-textarea"
            placeholder="Reply to this post..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={submitting}
            maxLength={500}
          />

          <div className="comment-form-actions">
            <span className="character-count">{newComment.length}/500</span>
            {error && <span className="error-message">{error}</span>}
            <button
              type="submit"
              className="comment-submit-btn"
              disabled={submitting || !newComment.trim()}
            >
              {submitting ? 'Posting...' : 'Reply'}
            </button>
          </div>
        </form>
      </div>

      <div className="comments-list">
        {loading ? (
          <div className="comments-loading">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="comments-empty">No comments yet. Be the first to comment!</div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <div className="comment-item-header">
                <div className="comment-item-author">
                  <div className="comment-item-avatar">
                    {comment.author.avatar ? (
                      <img src={comment.author.avatar} alt={comment.author.username} />
                    ) : (
                      <span>{comment.author.username.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <p className="comment-item-name">{comment.author.name || comment.author.username}</p>
                    <p className="comment-item-handle">@{comment.author.username}</p>
                  </div>
                </div>

                <div className="comment-item-meta">
                  <span className="comment-item-date">{formatDate(comment.created)}</span>
                  {user && user.id === comment.author.id && (
                    <button
                      className="comment-delete-btn"
                      onClick={() => handleDeleteComment(comment.id)}
                      title="Delete comment"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <p className="comment-item-body">{comment.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CommentSection
