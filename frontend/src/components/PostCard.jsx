import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { postService } from '../services/api'
import CommentSection from './CommentSection'
import './PostCard.css'

const PostCard = ({ post, onPostUpdated, onPostDeleted }) => {
  const { user } = useAuth()
  const [liked, setLiked] = useState(post.liked)
  const [likesCount, setLikesCount] = useState(post.likes_count)
  const [showComments, setShowComments] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLiking, setIsLiking] = useState(false)

  const isAuthor = user && user.id === post.author.id

  const handleLike = async () => {
    if (isLiking) return
    
    try {
      setIsLiking(true)
      if (liked) {
        await postService.unlikePost(post.id)
        setLiked(false)
        setLikesCount(likesCount - 1)
      } else {
        await postService.likePost(post.id)
        setLiked(true)
        setLikesCount(likesCount + 1)
      }
    } catch (err) {
      console.error('Error toggling like:', err)
    } finally {
      setIsLiking(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return

    try {
      setIsDeleting(true)
      await postService.deletePost(post.id)
      onPostDeleted(post.id)
    } catch (err) {
      console.error('Error deleting post:', err)
      alert('Failed to delete post')
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <article className="post-card">
      <div className="post-header">
        <Link to={`/profile/${post.author.id}`} className="post-author-link">
          <div className="post-avatar">
            {post.author.avatar ? (
              <img src={post.author.avatar} alt={post.author.username} />
            ) : (
              <span>{post.author.username.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="post-author-info">
            <p className="post-author-name">{post.author.name || post.author.username}</p>
            <p className="post-author-handle">@{post.author.username}</p>
          </div>
        </Link>

        <div className="post-meta">
          <span className="post-date">{formatDate(post.created)}</span>
          {isAuthor && (
            <button
              className="post-delete-btn"
              onClick={handleDelete}
              disabled={isDeleting}
              title="Delete post"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="post-content">
        <p className="post-body">{post.body}</p>
      </div>

      <div className="post-footer">
        <div className="post-stats">
          {likesCount > 0 && (
            <span className="post-stat">{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
          )}
        </div>

        <div className="post-actions">
          <button
            className={`post-action ${liked ? 'active' : ''}`}
            onClick={handleLike}
            disabled={isLiking}
            title={liked ? 'Unlike' : 'Like'}
          >
            <span className="action-icon">{liked ? '❤️' : '🤍'}</span>
            <span className="action-label">Like</span>
          </button>

          <button
            className="post-action"
            onClick={() => setShowComments(!showComments)}
            title="Comments"
          >
            <span className="action-icon">💬</span>
            <span className="action-label">Comment</span>
          </button>
        </div>
      </div>

      {showComments && (
        <CommentSection
          postId={post.id}
          onClose={() => setShowComments(false)}
        />
      )}
    </article>
  )
}

export default PostCard
