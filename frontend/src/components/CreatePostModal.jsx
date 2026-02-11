import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { postService } from '../services/api'
import './CreatePostModal.css'

const CreatePostModal = ({ onClose, onPostCreated }) => {
  const { user } = useAuth()
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!body.trim()) {
      setError('Post cannot be empty')
      return
    }

    setLoading(true)
    setError('')

    try {
      await postService.createPost({ body })
      onPostCreated()
    } catch (err) {
      setError(err.response?.data?.body?.[0] || 'Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Create a Post</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="create-post-author">
            <div className="create-post-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} />
              ) : (
                <span>{user.username.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="create-post-info">
              <p className="create-post-name">{user.name || user.username}</p>
              <p className="create-post-handle">@{user.username}</p>
            </div>
          </div>

          <textarea
            className="create-post-textarea"
            placeholder="What's happening?!"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={loading}
            maxLength={1000}
            required
          />

          <div className="create-post-footer">
            <span className="character-count">{body.length}/1000</span>
            {error && <span className="error-message">{error}</span>}
          </div>

          <div className="create-post-actions">
            <button
              type="button"
              className="modal-button cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modal-button submit"
              disabled={loading || !body.trim()}
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePostModal
