import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import CreatePostModal from './CreatePostModal'
import './Sidebar.css'

const Sidebar = ({ onPostCreated }) => {
  const { user } = useAuth()
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handlePostCreated = () => {
    setShowCreateModal(false)
    onPostCreated()
  }

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-content">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Create</h3>
            <button
              className="sidebar-button"
              onClick={() => setShowCreateModal(true)}
            >
              <span className="sidebar-icon">✏️</span>
              New Post
            </button>
          </div>

          {user && (
            <div className="sidebar-section">
              <h3 className="sidebar-title">Profile</h3>
              <div className="sidebar-user-info">
                <div className="sidebar-avatar">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.username} />
                  ) : (
                    <span>{user.username.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div className="sidebar-user-details">
                  <p className="sidebar-user-name">{user.name || user.username}</p>
                  <p className="sidebar-user-handle">@{user.username}</p>
                </div>
              </div>
              {user.bio && <p className="sidebar-bio">{user.bio}</p>}
            </div>
          )}
        </div>
      </aside>

      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          onPostCreated={handlePostCreated}
        />
      )}
    </>
  )
}

export default Sidebar
